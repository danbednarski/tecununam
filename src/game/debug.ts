// ========================================
// DEBUG MODE
// Enable with ?debug=true in URL
// ========================================

export const DEBUG = {
    enabled: new URLSearchParams(window.location.search).get('debug') === 'true',

    log(...args: any[]) {
        if (this.enabled) {
            console.log('[TecunUman DEBUG]', ...args);
        }
    },

    warn(...args: any[]) {
        if (this.enabled) {
            console.warn('[TecunUman DEBUG]', ...args);
        }
    },

    error(...args: any[]) {
        // Always log errors
        console.error('[TecunUman ERROR]', ...args);
    },

    // Log game state
    logState() {
        if (this.enabled) {
            console.group('[TecunUman DEBUG] Game State');
            console.log('Army:', (window as any).GameState.army);
            console.log('Morale:', (window as any).GameState.morale);
            console.log('Mastery:', (window as any).GameState.mastery);
            console.log('Turn:', (window as any).GameState.turn);
            console.log('Army Position:', (window as any).GameState.armyPosition);
            console.log('Words Learned:', (window as any).GameState.wordsLearned.size);
            console.log('Battles Won/Lost:', (window as any).GameState.battlesWon, '/', (window as any).GameState.battlesLost);
            console.log('Completed Lessons:', (window as any).GameState.completedLessons);
            console.log('Current Battle:', (window as any).GameState.currentBattle);
            console.groupEnd();
        }
    },

    // Log node info
    logNode(node: any) {
        if (this.enabled && node) {
            console.group('[TecunUman DEBUG] Node:', node.name);
            console.log('ID:', node.id);
            console.log('Status:', node.status);
            console.log('Lesson Type:', node.lessonType);
            console.log('Spanish Strength:', node.spanishStrength);
            console.log('Requirements:', node.requires);
            console.log('Revealed:', node.revealed);
            console.groupEnd();
        }
    },

    // Helper functions for console use
    addArmy(amount = 500) {
        if (!this.enabled) return;
        const GameState = (window as any).GameState;
        const updateStats = (window as any).updateStats;
        GameState.army += amount;
        if (typeof updateStats === 'function') updateStats();
        this.log('Added', amount, 'army. Total:', GameState.army);
    },

    setMorale(value = 100) {
        if (!this.enabled) return;
        const GameState = (window as any).GameState;
        const updateStats = (window as any).updateStats;
        GameState.morale = Math.min(100, Math.max(0, value));
        if (typeof updateStats === 'function') updateStats();
        this.log('Morale set to:', GameState.morale);
    },

    teleport(nodeId: string) {
        if (!this.enabled) return;
        const GameState = (window as any).GameState;
        const revealAdjacentNodes = (window as any).revealAdjacentNodes;
        const renderMap = (window as any).renderMap;
        const centerCameraOnNode = (window as any).centerCameraOnNode;

        const node = GameState.nodes.find((n: any) => n.id === nodeId);
        if (node) {
            GameState.armyPosition = nodeId;
            GameState.revealedNodes.add(nodeId);
            if (typeof revealAdjacentNodes === 'function') revealAdjacentNodes(nodeId);
            if (typeof renderMap === 'function') renderMap();
            if (typeof centerCameraOnNode === 'function') centerCameraOnNode(node, true);
            this.log('Teleported to:', node.name);
        } else {
            this.warn('Node not found:', nodeId);
            this.log('Available nodes:', GameState.nodes.map((n: any) => n.id).join(', '));
        }
    },

    captureNode(nodeId: string) {
        if (!this.enabled) return;
        const GameState = (window as any).GameState;
        const revealAdjacentNodes = (window as any).revealAdjacentNodes;
        const renderMap = (window as any).renderMap;

        const node = GameState.nodes.find((n: any) => n.id === nodeId);
        if (node) {
            node.status = 'kiche';
            node.spanishStrength = 0;
            GameState.revealedNodes.add(nodeId);
            if (typeof revealAdjacentNodes === 'function') revealAdjacentNodes(nodeId);
            if (typeof renderMap === 'function') renderMap();
            this.log('Captured:', node.name);
        } else {
            this.warn('Node not found:', nodeId);
        }
    },

    completeLesson(nodeId: string, difficulty: 'soldier' | 'warrior' | 'hero' = 'hero') {
        if (!this.enabled) return;
        const GameState = (window as any).GameState;

        if (!GameState.completedLessons[nodeId]) {
            GameState.completedLessons[nodeId] = {};
        }
        GameState.completedLessons[nodeId][difficulty] = true;
        // Also complete lower difficulties
        if (difficulty === 'hero') {
            GameState.completedLessons[nodeId]['warrior'] = true;
            GameState.completedLessons[nodeId]['soldier'] = true;
        } else if (difficulty === 'warrior') {
            GameState.completedLessons[nodeId]['soldier'] = true;
        }
        this.log('Completed lesson at', nodeId, 'difficulty:', difficulty);
    },

    listNodes() {
        if (!this.enabled) return;
        const GameState = (window as any).GameState;
        console.table(GameState.nodes.map((n: any) => ({
            id: n.id,
            name: n.name,
            status: n.status,
            spanishStrength: n.spanishStrength,
            lessonType: n.lessonType,
            revealed: GameState.revealedNodes.has(n.id)
        })));
    }
};

// Initialize debug mode features
export function initDebugMode() {
    if (!DEBUG.enabled) return;

    console.log('%c[TecunUman] DEBUG MODE ENABLED', 'background: #ff6b35; color: white; padding: 4px 8px; font-weight: bold;');
    console.log('Debug features:');
    console.log('  - All nodes accessible (requirements bypassed)');
    console.log('  - All nodes revealed on map');
    console.log('  - Extra logging enabled');
    console.log('  - DEBUG object available in console');
    console.log('  - Press D to dump game state');
    console.log('  - Press S on tutorial screen to skip to quiz');
    console.log('  - Press W to auto-win current battle');

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.target as any).matches('input, textarea')) return;

        switch(e.key.toLowerCase()) {
            case 'd':
                // Dump game state
                DEBUG.logState();
                break;
            case 's':
                // Skip tutorial
                if (document.getElementById('tutorial-screen')?.classList.contains('active')) {
                    DEBUG.log('Skipping tutorial...');
                    const startQuizFromTutorial = (window as any).startQuizFromTutorial;
                    if (typeof startQuizFromTutorial === 'function') {
                        startQuizFromTutorial();
                    }
                }
                break;
            case 'w':
                // Auto-win battle (answer all remaining questions correctly)
                const GameState = (window as any).GameState;
                const endBattle = (window as any).endBattle;
                if (document.getElementById('battle-screen')?.classList.contains('active') && GameState.currentBattle) {
                    DEBUG.log('Auto-winning battle...');
                    const remaining = GameState.currentQuestions.length - GameState.currentQuestionIndex;
                    GameState.correctAnswers = GameState.currentQuestions.length;
                    GameState.currentQuestionIndex = GameState.currentQuestions.length;
                    // Reduce enemy to 0
                    GameState.currentBattle.enemyStrength = 0;
                    endBattle();
                }
                break;
        }
    });

    // Add debug indicator to page and expose to window
    document.addEventListener('DOMContentLoaded', () => {
        const indicator = document.createElement('div');
        indicator.id = 'debug-indicator';
        indicator.innerHTML = '🔧 DEBUG MODE';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff6b35;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            font-weight: bold;
            z-index: 99999;
            pointer-events: none;
        `;
        document.body.appendChild(indicator);

        // Expose DEBUG and GameState to window for console access
        (window as any).DEBUG = DEBUG;
    });
}
