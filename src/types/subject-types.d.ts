interface Subject {
    auxiliary_meanings: AuxiliaryMeaning[];
    characters: string;
    created_at: Date;
    document_url: string;
    hidden_at: Date | null;
    lesson_position: number;
    level: number;
    meaning_mnemonic: string;
    meanings: Meaning[];
    slug: string;
    spaced_repetition_system_id: number;
}

interface Meaning {
    meaning: string;
    primary: boolean;
    accepted_answer: boolean;
}

interface AuxiliaryMeaning {
    meaning: string;
    type: 'whitelist' | 'blacklist';
}

type SubjectType = 'radical' | 'kanji' | 'vocabulary' | 'kana_vocabulary';