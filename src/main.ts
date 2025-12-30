/**
 * Main entry point for the Tecun Uman game
 * 
 * This file orchestrates loading of all modules.
 * During the migration, it imports TypeScript modules and ensures
 * they're available before the legacy JS files run.
 */

// Import TypeScript modules (these will be compiled by Vite)
import { initI18n } from './i18n';

// The i18n module exposes its functions to window automatically,
// so the other JS files can use them.

// Wait for DOM to be ready, then initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize i18n first (language detection, UI updates)
    initI18n();
    
    // The other initialization (difficulty, game) is handled by the legacy JS files
    // which are still loaded via <script> tags in index.html
});

