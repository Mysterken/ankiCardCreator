interface CharacterImage {
    url: string;
    content_type: 'image/svg+xml';
    metadata: CharacterImageMetadata;
}

interface CharacterImageMetadata {
    inline_styles: boolean;
}

interface ContextSentence {
    en: string;
    ja: string;
}

interface PronunciationAudio {
    url: string;
    content_type: 'audio/mpeg' | 'audio/ogg';
    metadata: PronunciationAudioMetadata;
}

interface PronunciationAudioMetadata {
    gender: string;
    source_id: number;
    pronunciation: string;
    voice_actor_id: number;
    voice_actor_name: string;
    voice_description: string;
}