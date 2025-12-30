// ========================================
// INTERNATIONALIZATION (i18n)
// English and Spanish translations
// ========================================

// Types
export type Language = 'en' | 'es';

export type TranslationKey = 
    // Title screen
    | 'subtitle' | 'tagline' | 'startGame' | 'continueGame' | 'sourceCode'
    // Difficulty selection
    | 'selectDifficulty' | 'soldier' | 'soldierDesc' | 'warrior' | 'warriorDesc' | 'hero' | 'heroDesc'
    // Map screen
    | 'army' | 'morale' | 'mastery' | 'turn' | 'year'
    | 'kicheTerritory' | 'spanishControlled' | 'underAttack' | 'unexplored' | 'yourArmy'
    // Territory panel
    | 'underKicheControl' | 'spanishControlledStatus' | 'underAttackStatus'
    | 'enemyStrength' | 'soldiers' | 'marchHere' | 'attack' | 'defend' | 'train'
    | 'cannotReach' | 'cannotReachPath' | 'requirementsNeeded' | 'complete' | 'at' | 'level' | 'completed'
    // Attack alert
    | 'spanishAttack' | 'spanishAttacking' | 'peopleNeedHelp' | 'rushDefend' | 'continueForward'
    // Tutorial screen
    | 'learning' | 'previous' | 'next' | 'beginQuiz' | 'culturalContext' | 'conjugation' | 'example'
    // Battle screen
    | 'kicheWarriors' | 'spanishForces' | 'warriors' | 'round'
    | 'typeAnswer' | 'typeKicheWord' | 'submitAnswer' | 'nextChallenge' | 'seeResults'
    // Feedback
    | 'correctBattle' | 'incorrectBattle' | 'correctTrain' | 'incorrectTrain' | 'correctAnswerWas'
    // Lesson questions
    | 'selectIconFor' | 'selectMeaningOf' | 'selectKicheFor' | 'whatDoesMean'
    | 'translateToKiche' | 'translateToEnglish' | 'typeWordYouLearned'
    | 'howWouldYou' | 'respondInKiche' | 'someoneAsksYou' | 'culturalNote'
    // Results
    | 'victory' | 'hardFoughtVictory' | 'stalemate' | 'defeat' | 'trainingComplete'
    | 'questionsCorrect' | 'territoryStatus' | 'armyChange' | 'wordsLearned' | 'continueCampaign'
    | 'captured' | 'defended' | 'contested' | 'lost' | 'failed' | 'na'
    // Game over
    | 'victoryTitle' | 'defeatTitle' | 'victoryMessage' | 'defeatMessage'
    | 'turnsSurvived' | 'wordsMastered' | 'battlesWon' | 'tryAgain'
    // Battle messages
    | 'liberated' | 'masteryInspires' | 'pushedBack' | 'enemiesWeakened'
    | 'soldiersRemain' | 'neitherGains' | 'struggleContinues' | 'attackFails' | 'studiedLesson'
    // Misc
    | 'battleFor' | 'defenseOf' | 'attackOn' | 'trainingAt';

export type Translations = Record<TranslationKey, string>;

export type AllTranslations = Record<Language, Translations>;

// ========================================
// TRANSLATIONS DATA
// ========================================

const TRANSLATIONS: AllTranslations = {
    en: {
        // Title screen
        subtitle: "Defender of the K'iche' Kingdom",
        tagline: "Learn K'iche'. Defend Your People. Change History.",
        startGame: "Begin Campaign",
        continueGame: "Continue Campaign",
        sourceCode: "Source Code",
        
        // Difficulty selection
        selectDifficulty: "Select Difficulty",
        soldier: "Soldier",
        soldierDesc: "Core essentials - perfect for beginners",
        warrior: "Warrior",
        warriorDesc: "More vocabulary and grammar",
        hero: "Hero",
        heroDesc: "Full cultural immersion - become a true hero!",
        
        // Map screen
        army: "Army:",
        morale: "Morale:",
        mastery: "K'iche' Mastery:",
        turn: "Turn",
        year: "Year",
        kicheTerritory: "K'iche' Territory",
        spanishControlled: "Spanish Controlled",
        underAttack: "Under Attack",
        unexplored: "Unexplored",
        yourArmy: "Your Army",
        
        // Territory panel
        underKicheControl: "Under K'iche' Control",
        spanishControlledStatus: "Spanish Controlled",
        underAttackStatus: "Under Attack!",
        enemyStrength: "Enemy strength",
        soldiers: "soldiers",
        marchHere: "March Here",
        attack: "Attack!",
        defend: "Defend!",
        train: "Train (Study)",
        cannotReach: "Your army cannot reach this location directly.",
        cannotReachPath: "You need to travel through other territories to reach here.",
        requirementsNeeded: "Requirements needed",
        complete: "Complete",
        at: "at",
        level: "level",
        completed: "Completed",
        
        // Attack alert
        spanishAttack: "Spanish Attack!",
        spanishAttacking: "The Spanish are attacking",
        peopleNeedHelp: "Your people need your help!",
        rushDefend: "Rush to Defend",
        continueForward: "Continue Forward",
        
        // Tutorial screen
        learning: "Learning",
        previous: "Previous",
        next: "Next",
        beginQuiz: "Begin Quiz!",
        culturalContext: "Cultural Context",
        conjugation: "Conjugation",
        example: "Example",
        
        // Battle screen
        kicheWarriors: "K'iche' Warriors",
        spanishForces: "Spanish Forces",
        warriors: "warriors",
        round: "Round",
        typeAnswer: "Type your answer...",
        typeKicheWord: "Type the K'iche' word...",
        submitAnswer: "Submit Answer",
        nextChallenge: "Next Challenge",
        seeResults: "See Results",
        
        // Feedback
        correctBattle: "Correct! Your warriors attack with renewed strength!",
        incorrectBattle: "Incorrect. The Spanish press their advantage!",
        correctTrain: "Correct! Your knowledge grows stronger!",
        incorrectTrain: "Not quite. Keep studying!",
        correctAnswerWas: "The correct answer was:",
        
        // Lesson questions
        selectIconFor: "Select the icon for:",
        selectMeaningOf: "Select the meaning of:",
        selectKicheFor: "Select the K'iche' word for:",
        whatDoesMean: "What does this mean?",
        translateToKiche: "Translate to K'iche':",
        translateToEnglish: "Translate to English:",
        typeWordYouLearned: "Type the K'iche' word you learned:",
        howWouldYou: "How would you:",
        respondInKiche: "Respond in K'iche':",
        someoneAsksYou: "Someone asks you:",
        culturalNote: "Cultural note:",
        
        // Results
        victory: "Victory!",
        hardFoughtVictory: "Hard-Fought Victory",
        stalemate: "Stalemate",
        defeat: "Defeat",
        trainingComplete: "Training Complete",
        questionsCorrect: "Questions Correct:",
        territoryStatus: "Territory Status:",
        armyChange: "Army Change:",
        wordsLearned: "Words Learned:",
        continueCampaign: "Continue Campaign",
        captured: "Captured",
        defended: "Defended",
        contested: "Contested",
        lost: "Lost",
        failed: "Failed",
        na: "N/A",
        
        // Game over
        victoryTitle: "VICTORY!",
        defeatTitle: "The Kingdom Falls",
        victoryMessage: "Through your mastery of K'iche' and brilliant tactics, you have driven the Spanish from the highlands! The K'iche' kingdom survives, and your language endures for generations to come. Tecun Uman's legacy lives on!",
        defeatMessage: "Though the Spanish have conquered the highlands, the K'iche' language and culture survive in the hearts of the people. Continue learning K'iche' to honor the memory of Tecun Uman and his warriors.",
        turnsSurvived: "Turns Survived",
        wordsMastered: "K'iche' Words Mastered",
        battlesWon: "Battles Won",
        tryAgain: "Try Again",
        
        // Battle messages
        liberated: "is liberated!",
        masteryInspires: "Your mastery of K'iche' inspires your warriors!",
        pushedBack: "Spanish Pushed Back",
        enemiesWeakened: "You've weakened the Spanish forces at",
        soldiersRemain: "soldiers remain.",
        neitherGains: "Neither side gains ground at",
        struggleContinues: "The struggle continues.",
        attackFails: "The attack fails. Your warriors must retreat.",
        studiedLesson: "Your warriors have studied",
        
        // Misc
        battleFor: "Battle for",
        defenseOf: "Defense of",
        attackOn: "Attack on",
        trainingAt: "Training at",
    },
    
    es: {
        // Title screen
        subtitle: "Defensor del Reino K'iche'",
        tagline: "Aprende K'iche'. Defiende a tu Pueblo. Cambia la Historia.",
        startGame: "Iniciar Campaña",
        continueGame: "Continuar Campaña",
        sourceCode: "Código Fuente",
        
        // Difficulty selection
        selectDifficulty: "Selecciona Dificultad",
        soldier: "Soldado",
        soldierDesc: "Lo esencial - perfecto para principiantes",
        warrior: "Guerrero",
        warriorDesc: "Más vocabulario y gramática",
        hero: "Héroe",
        heroDesc: "Inmersión cultural completa - ¡conviértete en héroe!",
        
        // Map screen
        army: "Ejército:",
        morale: "Moral:",
        mastery: "Dominio del K'iche':",
        turn: "Turno",
        year: "Año",
        kicheTerritory: "Territorio K'iche'",
        spanishControlled: "Control Español",
        underAttack: "Bajo Ataque",
        unexplored: "Sin Explorar",
        yourArmy: "Tu Ejército",
        
        // Territory panel
        underKicheControl: "Bajo Control K'iche'",
        cannotReachPath: "Necesitas viajar por otros territorios para llegar aquí.",
        requirementsNeeded: "Requisitos necesarios",
        complete: "Completa",
        at: "en nivel",
        level: "nivel",
        completed: "Completado",
        spanishControlledStatus: "Controlado por Españoles",
        underAttackStatus: "¡Bajo Ataque!",
        enemyStrength: "Fuerza enemiga",
        soldiers: "soldados",
        marchHere: "Marchar Aquí",
        attack: "¡Atacar!",
        defend: "¡Defender!",
        train: "Entrenar (Estudiar)",
        cannotReach: "Tu ejército no puede llegar directamente a esta ubicación.",
        
        // Attack alert
        spanishAttack: "¡Ataque Español!",
        spanishAttacking: "Los españoles están atacando",
        peopleNeedHelp: "¡Tu pueblo necesita tu ayuda!",
        rushDefend: "Correr a Defender",
        continueForward: "Continuar Adelante",
        
        // Tutorial screen
        learning: "Aprendiendo",
        previous: "Anterior",
        next: "Siguiente",
        beginQuiz: "¡Comenzar Quiz!",
        culturalContext: "Contexto Cultural",
        conjugation: "Conjugación",
        example: "Ejemplo",
        
        // Battle screen
        kicheWarriors: "Guerreros K'iche'",
        spanishForces: "Fuerzas Españolas",
        warriors: "guerreros",
        round: "Ronda",
        typeAnswer: "Escribe tu respuesta...",
        typeKicheWord: "Escribe la palabra K'iche'...",
        submitAnswer: "Enviar Respuesta",
        nextChallenge: "Siguiente Desafío",
        seeResults: "Ver Resultados",
        
        // Feedback
        correctBattle: "¡Correcto! ¡Tus guerreros atacan con fuerza renovada!",
        incorrectBattle: "Incorrecto. ¡Los españoles aprovechan la ventaja!",
        correctTrain: "¡Correcto! ¡Tu conocimiento crece!",
        incorrectTrain: "No del todo. ¡Sigue estudiando!",
        correctAnswerWas: "La respuesta correcta era:",
        
        // Lesson questions
        selectIconFor: "Selecciona el ícono para:",
        selectMeaningOf: "Selecciona el significado de:",
        selectKicheFor: "Selecciona la palabra K'iche' para:",
        whatDoesMean: "¿Qué significa esto?",
        translateToKiche: "Traduce al K'iche':",
        translateToEnglish: "Traduce al español:",
        typeWordYouLearned: "Escribe la palabra K'iche' que aprendiste:",
        howWouldYou: "¿Cómo harías para:",
        respondInKiche: "Responde en K'iche':",
        someoneAsksYou: "Alguien te pregunta:",
        culturalNote: "Nota cultural:",
        
        // Results
        victory: "¡Victoria!",
        hardFoughtVictory: "Victoria Difícil",
        stalemate: "Empate",
        defeat: "Derrota",
        trainingComplete: "Entrenamiento Completo",
        questionsCorrect: "Preguntas Correctas:",
        territoryStatus: "Estado del Territorio:",
        armyChange: "Cambio de Ejército:",
        wordsLearned: "Palabras Aprendidas:",
        continueCampaign: "Continuar Campaña",
        captured: "Capturado",
        defended: "Defendido",
        contested: "Disputado",
        lost: "Perdido",
        failed: "Fallido",
        na: "N/A",
        
        // Game over
        victoryTitle: "¡VICTORIA!",
        defeatTitle: "El Reino Cae",
        victoryMessage: "¡A través de tu dominio del K'iche' y tácticas brillantes, has expulsado a los españoles de las tierras altas! El reino K'iche' sobrevive, y tu idioma perdura por generaciones. ¡El legado de Tecun Uman vive!",
        defeatMessage: "Aunque los españoles han conquistado las tierras altas, el idioma y la cultura K'iche' sobreviven en los corazones del pueblo. Continúa aprendiendo K'iche' para honrar la memoria de Tecun Uman y sus guerreros.",
        turnsSurvived: "Turnos Sobrevividos",
        wordsMastered: "Palabras K'iche' Dominadas",
        battlesWon: "Batallas Ganadas",
        tryAgain: "Intentar de Nuevo",
        
        // Battle messages
        liberated: "¡está liberado!",
        masteryInspires: "¡Tu dominio del K'iche' inspira a tus guerreros!",
        pushedBack: "Españoles Rechazados",
        enemiesWeakened: "Has debilitado a las fuerzas españolas en",
        soldiersRemain: "soldados quedan.",
        neitherGains: "Ningún lado gana terreno en",
        struggleContinues: "La lucha continúa.",
        attackFails: "El ataque falla. Tus guerreros deben retirarse.",
        studiedLesson: "Tus guerreros han estudiado",
        
        // Misc
        battleFor: "Batalla por",
        defenseOf: "Defensa de",
        attackOn: "Ataque a",
        trainingAt: "Entrenamiento en",
    }
};

// Spanish-speaking country codes
const SPANISH_COUNTRIES: readonly string[] = [
    'es', 'mx', 'ar', 'co', 'pe', 've', 'cl', 'ec', 'gt', 'cu',
    'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'pr', 'gq',
];

// ========================================
// STATE & FUNCTIONS
// ========================================

let currentLanguage: Language = 'en';

/** Detect user's preferred language from browser settings or localStorage */
function detectLanguage(): Language {
    // Check saved preference first
    const saved = localStorage.getItem('tecunuman_language');
    if (saved === 'en' || saved === 'es') {
        return saved;
    }
    
    // Check browser language
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    const langCode = browserLang.toLowerCase();
    
    // If browser language starts with 'es', use Spanish
    if (langCode.startsWith('es')) {
        return 'es';
    }
    
    // Check if user is likely from a Spanish-speaking country
    const parts = langCode.split('-');
    if (parts.length > 1) {
        const country = parts[1].toLowerCase();
        if (SPANISH_COUNTRIES.includes(country)) {
            return 'es';
        }
    }
    
    return 'en';
}

/** Set language and update all UI elements */
export function setLanguage(lang: Language): void {
    if (lang !== 'en' && lang !== 'es') {
        lang = 'en';
    }
    
    currentLanguage = lang;
    localStorage.setItem('tecunuman_language', lang);
    
    // Update language button states
    document.getElementById('lang-en')?.classList.toggle('active', lang === 'en');
    document.getElementById('lang-es')?.classList.toggle('active', lang === 'es');
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n') as TranslationKey;
        if (TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder') as TranslationKey;
        if (TRANSLATIONS[lang][key]) {
            (el as HTMLInputElement).placeholder = TRANSLATIONS[lang][key];
        }
    });
}

/** Get a translation by key */
export function t(key: TranslationKey | string): string {
    return TRANSLATIONS[currentLanguage][key as TranslationKey] 
        || TRANSLATIONS['en'][key as TranslationKey] 
        || key;
}

/** Get current language */
export function getLanguage(): Language {
    return currentLanguage;
}

/** Initialize i18n system */
export function initI18n(): void {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    
    // Language switcher event listeners
    document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-es')?.addEventListener('click', () => setLanguage('es'));
}

// ========================================
// GLOBAL EXPORTS (for compatibility with existing JS)
// ========================================

// Expose to window for other scripts that haven't been migrated yet
(window as any).t = t;
(window as any).setLanguage = setLanguage;
(window as any).currentLanguage = () => currentLanguage;
(window as any).getCurrentLanguage = getLanguage;
(window as any).getLanguage = getLanguage;
(window as any).initI18n = initI18n;

