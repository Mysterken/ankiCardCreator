interface KanaVocabulary extends Subject {
    context_sentences: ContextSentence[];
    meaning_mnemonic: string;
    parts_of_speech: string[];
    pronunciation_audios: PronunciationAudio[];
}