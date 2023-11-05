import {filter} from "lodash-es";

export default class SubjectsService {

    private wanikaniUrl: string = '/data/wanikani_subjects.json';
    private subjects: string[];

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

}