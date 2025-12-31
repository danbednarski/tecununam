/**
 * Type imports and global declarations for the game
 */

// ========================================
// TYPE IMPORTS
// ========================================
import type {
    DifficultyLevel,
    Language,
    Lesson,
    LessonContent,
    Question,
    VocabularyItem,
    MapNode,
    BattleState,
} from '../types/index';

// Re-export for convenience
export type {
    DifficultyLevel,
    Language,
    Lesson,
    LessonContent,
    Question,
    VocabularyItem,
    MapNode,
    BattleState,
} from '../types/index';

// ========================================
// GLOBAL TYPE DECLARATIONS
// (These globals are set by main.ts before game loads)
// ========================================
declare global {
    const t: (key: string) => string;
    const initI18n: () => void;
    const LESSONS: Record<string, Lesson>;
    const getDifficulty: () => DifficultyLevel;
    const setDifficulty: (difficulty: DifficultyLevel) => void;
    const generateLessonQuestions: (lessonId: string, count: number, learnedWords: VocabularyItem[]) => Question[];
    const checkLessonAnswer: (userAnswer: string, question: Question) => boolean;
    const getCurrentLanguage: () => Language;
    const CULTURAL_VOCABULARY: LessonContent;
    const VOCABULARY_ANIMALS: LessonContent;
    const VOCABULARY_WARFARE: LessonContent;
    const VOCABULARY_PLACES: LessonContent;
    const VOCABULARY_SPIRITUAL: LessonContent;
    const VOCABULARY_ADVANCED: LessonContent;
    const GREETINGS_CONTENT: LessonContent;
    const NUMBERS_CONTENT: LessonContent;
    const PRONOUNS_CONTENT: LessonContent;
    const POSSESSION_CONTENT: LessonContent;
    const NEGATION_CONTENT: LessonContent;
    const VERBS_CONTENT: LessonContent;
    const ADJECTIVES_CONTENT: LessonContent;
    const COMMANDS_CONTENT: LessonContent;
    const EXISTENTIAL_CONTENT: LessonContent;
    const QUESTIONS_CONTENT: LessonContent;
}

export {};
