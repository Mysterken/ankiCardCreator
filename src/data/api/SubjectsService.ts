import DOMPurify from "isomorphic-dompurify";

export default class SubjectsService {

    private wanikaniUrl: string = '/data/wanikani_subjects.json';
    private ankiCardCreatorDbVersion: number = 1;
    private subjects: object[];

    constructor() {
        this.subjects = [];
    }

    addSubject(subject: object) {
        this.subjects.push(subject);
    }

    getSubjects() {
        return this.subjects;
    }

    clearSubjects() {
        this.subjects = [];
    }

    async upgradeDatabase(
        event: Event,
        url: string,
        name: string,
        version: number,
        indexes: {
            name: string,
            key: string,
            options: { unique: boolean }
        }[]
    ) {
        return new Promise(async (resolve, reject) => {

            const db = event.target.result;

            if (db.objectStoreNames.contains(name)) {
                db.deleteObjectStore(name);
            }

            const createdStore = db.createObjectStore(name, {keyPath: 'id'});

            for (const index of indexes) {
                createdStore.createIndex(index.name, index.key, index.options);
            }

            const response = await fetch(
                import.meta.env.PROD ?
                    '/ankiCardCreator' + url :
                    url
            );

            if (!response.ok) reject('Failed to fetch JSON file from server');

            const jsonData = await response.json();

            const transaction = db.transaction([name], "readwrite");
            const objectStore = transaction.objectStore(name);

            let id = 1;
            for (const subject of jsonData.subjects) {
                subject.id = id++;
                objectStore.add(subject);
            }

            transaction.oncomplete = () => {
                resolve();
            };
        });
    }

    async setSubjects(
        event: Event,
        name: string,
        index: string,
        vocabulary: string
    ) {
        return new Promise(async (resolve, reject) => {

            const db = event.target.result;

            const transaction = db.transaction([name], "readonly");
            const objectStore = transaction.objectStore(name);
            const searchIndex = objectStore.index(index);

            const getRequest = searchIndex.getAll(vocabulary);
            getRequest.onsuccess = () => {
                for (const subject of getRequest.result) {
                    subject.data.type = subject.object;
                    this.addSubject(subject.data);
                }

                if (this.getSubjects().length === 0) {
                    reject('No subjects found');
                }

                resolve();
            };

            getRequest.onerror = () => {
                reject('Failed to fetch data from database');
            };
        });
    };

    async callApi(
        vocabulary: string,
        url: string,
        name: string,
        version: number,
        indexes: {
            name: string,
            key: string,
            options: { unique: boolean }
        }[],
        indexSearch: string
    ) {

        const DBOpenRequest = await window.indexedDB.open("ankiCardCreator", this.ankiCardCreatorDbVersion);

        return new Promise((resolve, reject) => {

            let updateNeeded = false;

            DBOpenRequest.onupgradeneeded = async (event: IDBVersionChangeEvent) => {
                updateNeeded = true;

                await this.upgradeDatabase(event, url, name, version, indexes);
                await this.setSubjects(event, name, indexSearch, vocabulary)
                    .catch(error => {
                        reject(error);
                    });

                resolve();
            }

            DBOpenRequest.onerror = function () {
                reject('Error loading database.');
            };

            DBOpenRequest.onsuccess = async (event) => {
                if (updateNeeded) return;

                await this.setSubjects(event, name, indexSearch, vocabulary)
                    .catch(error => {
                        reject(error);
                    });

                resolve();
            };
        });
    }

    async callApiWanikani(vocabulary: string) {
        try {
            await this.callApi(
                vocabulary,
                this.wanikaniUrl,
                'wanikani',
                1,
                [{name: 'characters_idx', key: 'data.characters', options: {unique: false}}],
                'characters_idx'
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    getMeaningPrimary(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return subject.meanings.find(meaning => meaning.primary).meaning;
    }

    getMeanings(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return subject.meanings.filter(meaning => !meaning.primary).map(meaning => meaning.meaning);
    }

    getReadings(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return subject.readings.filter(reading => reading.primary).map(reading => reading.reading);
    }

    hasMeaningHint(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return subject.meaning_hint !== undefined;
    }

    hasReadingHint(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return subject.reading_hint !== undefined;
    }

    hasReading(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return subject.readings !== undefined;
    }

    getMeaningMnemonic(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return this.replaceTags(subject.meaning_mnemonic);
    }

    getReadingMnemonic(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return this.replaceTags(subject.reading_mnemonic);
    }

    getMeaningHint(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return this.replaceTags(subject.meaning_hint);
    }

    getReadingHint(subject: KanaVocabulary | Kanji | Radical | Vocabulary) {
        return this.replaceTags(subject.reading_hint);
    }

    protected replaceTags(text: string) {
        if (!text) return '';
        return DOMPurify.sanitize(
            text
                .replace(/<radical>(.*?)<\/radical>/g, '<span style="color: #0083c5;">$1</span>')
                .replace(/<kanji>(.*?)<\/kanji>/g, '<span style="color: #c50083;">$1</span>')
                .replace(/<ja>(.*?)<\/ja>/g, '<span style="color:#0c8d16;">$1</span>')
                .replace(/<vocabulary>(.*?)<\/vocabulary>/g, '<span style="color:#8500c7;">$1</span>')
        )
    }

}