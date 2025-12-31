/**
 * Exported types for use throughout the application
 * Re-exports types from game.d.ts for importing in modules
 */

export type DifficultyLevel = 'soldier' | 'warrior' | 'hero';
export type NodeStatus = 'kiche' | 'spanish' | 'contested' | 'unexplored';
export type BattleType = 'attack' | 'defend' | 'train';
export type Language = 'en' | 'es';

export interface NodeRequirement {
  nodeId: string;
  difficulty: DifficultyLevel;
}

export interface MapNode {
  id: string;
  x: number;
  y: number;
  name: string;
  description: string;
  lessonType: string;
  status: NodeStatus;
  spanishStrength?: number;
  requires?: NodeRequirement[];
  region?: string;
  revealed?: boolean;
  isCapital?: boolean;
  completed?: {
    soldier?: boolean;
    warrior?: boolean;
    hero?: boolean;
  };
}

export interface BattleState {
  node: MapNode;
  type: BattleType;
  difficulty: DifficultyLevel;
  questionCount: number;
  startingArmy: number;
  startingEnemyStrength: number;
  enemyStrength: number;
}

export interface VocabularyItem {
  kiche: string;
  english: string;
  spanish?: string;
  icon?: string;
  culture?: string;
  difficulty?: DifficultyLevel;
  example?: string;
  conjugation?: string;
}

export interface LessonContent {
  core: VocabularyItem[];
  warrior: VocabularyItem[];
  hero: VocabularyItem[];
}

export interface Question {
  type: string;
  instruction: string;
  prompt: string;
  promptEs?: string;
  promptHint?: string;
  correctAnswer: string;
  choices?: string[];
  culture?: string;
  lessonId: string;
  word: VocabularyItem;
  isTypingQuestion?: boolean;
  acceptableAnswers?: string[];
  isIconTextQuestion?: boolean;
  wasCorrect?: boolean;
}

export interface Lesson {
  id: string;
  name: string;
  kicheName: string;
  spanishName: string;
  description: string;
  icon: string;
}

export interface Translations {
  [key: string]: string;
}
