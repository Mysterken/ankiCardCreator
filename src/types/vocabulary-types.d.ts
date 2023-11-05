interface Vocabulary extends Subject {
    component_subject_ids: number[];
    context_sentences: ContextSentence[];
    meaning_mnemonic: string;
    parts_of_speech: string[];
    pronunciation_audios: PronunciationAudio[];
    readings: VocabularyReading[];
    reading_mnemonic: string;
}

interface VocabularyReading {
    accepted_answer: boolean;
    primary: boolean;
    reading: string;
}