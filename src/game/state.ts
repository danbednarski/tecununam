// ========================================
// GAME STATE
// ========================================

export const GameState: any = {
    // Player resources
    army: 1000,
    morale: 100,
    mastery: 0,
    wordsLearned: new Set(),
    battlesWon: 0,
    battlesLost: 0,

    // Campaign progress
    turn: 1,
    year: 1524,
    month: 2,

    // Army position
    armyPosition: null, // Current node ID

    // Current battle
    currentBattle: null,
    currentQuestions: [],
    currentQuestionIndex: 0,
    correctAnswers: 0,

    // Map state
    nodes: [],
    edges: [],
    revealedNodes: new Set(),

    // Completed lessons per node: { nodeId: { soldier: true, warrior: false, hero: false } }
    completedLessons: {},

    // Camera/viewport
    camera: { x: 0, y: 0 },
    isDragging: false,
    lastMouse: { x: 0, y: 0 },

    // Selected node
    selectedNode: null,

    // Spanish attack event
    activeAttack: null,
};

// Expose GameState to window for debug access
(window as any).GameState = GameState;
