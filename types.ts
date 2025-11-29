export enum ContentType {
  STORY = 'Story',
  POEM = 'Poem'
}

export enum WritingStyle {
  CALM = 'Calm',
  DRAMATIC = 'Dramatic',
  HUMOROUS = 'Humorous',
  ROMANTIC = 'Romantic',
  DARK = 'Dark/Gothic',
  INSPIRATIONAL = 'Inspirational',
  POETIC = 'Poetic',
  WHIMSICAL = 'Whimsical',
  CYBERPUNK = 'Cyberpunk'
}

export interface AnalysisResult {
  detectedObjects: string[];
  mood: string;
  title: string;
  content: string;
}

export interface GenerationOptions {
  contentType: ContentType;
  style: WritingStyle;
}