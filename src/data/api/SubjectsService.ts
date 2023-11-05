import {filter} from "lodash-es";
import DOMPurify from "isomorphic-dompurify";

export default class SubjectsService {

    private wanikaniUrl: string = '/data/wanikani_subjects.json';
    private subjects: object[];

    constructor() {
        this.subjects = [];
    }

    addSubject(subject) {
        this.subjects.push(subject);
    }

    getSubjects() {
        return this.subjects;
    }

    clearSubjects() {
        this.subjects = [];
    }

    async callApiWanikani(vocabulary) {
        const response: Promise = await fetch(this.wanikaniUrl);

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

    getMeaningPrimary(subject) {
        return subject.meanings.find(meaning => meaning.primary).meaning;
    }

    getMeanings(subject) {
        return subject.meanings.filter(meaning => !meaning.primary).map(meaning => meaning.meaning);
    }

    getReadings(subject) {
        return subject.readings.filter(reading => reading.primary).map(reading => reading.reading);
    }

    hasMeaningHint(subject) {
        return subject.meaning_hint !== undefined;
    }

    hasReadingHint(subject) {
        return subject.reading_hint !== undefined;
    }

    hasReading(subject) {
        return subject.readings !== undefined;
    }

    getMeaningMnemonic(subject) {
        return this.replaceTags(subject.meaning_mnemonic);
    }

    getReadingMnemonic(subject) {
        return this.replaceTags(subject.reading_mnemonic);
    }

    getMeaningHint(subject) {
        return this.replaceTags(subject.meaning_hint);
    }

    getReadingHint(subject) {
        return this.replaceTags(subject.reading_hint);
    }

    protected replaceTags(text) {
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