interface Kanji extends Subject {
    amalgamation_subject_ids: number[];
    component_subject_ids: number[];
    meaning_hint: string | null;
    reading_hint: string | null;
    reading_mnemonic: string;
    readings: KanjiReading[];
    visually_similar_subject_ids: number[];
}

interface KanjiReading {
    reading: string;
    primary: boolean;
    accepted_answer: boolean;
    type: 'kunyomi' | 'nanori' | 'onyomi';
}