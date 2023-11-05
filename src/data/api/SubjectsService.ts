import {filter} from "lodash-es";
import DOMPurify from "isomorphic-dompurify";

export default class SubjectsService {

    private wanikaniUrl: string = '/data/wanikani_subjects.json';
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

    async callApiWanikani(vocabulary: string) {

        const response = await fetch(
            import.meta.env.PROD ?
                '/ankiCardCreator' + this.wanikaniUrl :
                this.wanikaniUrl
        );

        if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
        }

        const jsonData = await response.json();
        const subjects = filter(jsonData.subjects, {data: {characters: vocabulary}})

        if (subjects.length === 0) {
            throw new Error('No subjects found');
        }

        for (const subject of subjects) {
            subject.data.type = subject.object;
            this.addSubject(subject.data)
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