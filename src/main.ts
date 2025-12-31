/**
 * Main entry point for the Tecun Uman game
 * 
 * This file orchestrates loading of all modules.
 * All TypeScript modules expose their exports to window for game.js compatibility.
 * 
 * Loading order:
 * 1. This module executes and sets up all globals on window
 * 2. game.js is dynamically loaded after globals are ready
 * 3. DOMContentLoaded fires, initializing i18n and game
 */

// Import TypeScript modules (these will be compiled by Vite)
import './i18n';  // Exposes t, initI18n, getCurrentLanguage to window
import * as LessonsModule from './lessons';

// Expose lessons module functions to window for game.ts compatibility
(window as any).LESSONS = LessonsModule.LESSONS;
(window as any).setDifficulty = LessonsModule.setDifficulty;
(window as any).getDifficulty = LessonsModule.getDifficulty;
(window as any).generateLessonQuestions = LessonsModule.generateLessonQuestions;
(window as any).checkLessonAnswer = LessonsModule.checkLessonAnswer;

// Export vocabulary content for tutorial rendering
(window as any).CULTURAL_VOCABULARY = LessonsModule.CULTURAL_VOCABULARY;
(window as any).VOCABULARY_ANIMALS = LessonsModule.VOCABULARY_ANIMALS;
(window as any).VOCABULARY_WARFARE = LessonsModule.VOCABULARY_WARFARE;
(window as any).VOCABULARY_PLACES = LessonsModule.VOCABULARY_PLACES;
(window as any).VOCABULARY_SPIRITUAL = LessonsModule.VOCABULARY_SPIRITUAL;
(window as any).VOCABULARY_ADVANCED = LessonsModule.VOCABULARY_ADVANCED;
(window as any).NEGATION_CONTENT = LessonsModule.NEGATION_CONTENT;
(window as any).GREETINGS_CONTENT = LessonsModule.GREETINGS_CONTENT;
(window as any).NUMBERS_CONTENT = LessonsModule.NUMBERS_CONTENT;
(window as any).PRONOUNS_CONTENT = LessonsModule.PRONOUNS_CONTENT;
(window as any).POSSESSION_CONTENT = LessonsModule.POSSESSION_CONTENT;
(window as any).VERBS_CONTENT = LessonsModule.VERBS_CONTENT;
(window as any).COMMANDS_CONTENT = LessonsModule.COMMANDS_CONTENT;
(window as any).EXISTENTIAL_CONTENT = LessonsModule.EXISTENTIAL_CONTENT;
(window as any).QUESTIONS_CONTENT = LessonsModule.QUESTIONS_CONTENT;
(window as any).ADJECTIVES_CONTENT = LessonsModule.ADJECTIVES_CONTENT;

// Import game.ts - Vite will handle bundling in both dev and prod modes
// The game module executes immediately and handles its own initialization
import '../game';

