(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const TRANSLATIONS = {
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
    trainingAt: "Training at"
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
    trainingAt: "Entrenamiento en"
  }
};
const SPANISH_COUNTRIES = [
  "es",
  "mx",
  "ar",
  "co",
  "pe",
  "ve",
  "cl",
  "ec",
  "gt",
  "cu",
  "bo",
  "do",
  "hn",
  "py",
  "sv",
  "ni",
  "cr",
  "pa",
  "uy",
  "pr",
  "gq"
];
let currentLanguage = "en";
function detectLanguage() {
  const saved = localStorage.getItem("tecunuman_language");
  if (saved === "en" || saved === "es") {
    return saved;
  }
  const browserLang = navigator.language || navigator.userLanguage || "en";
  const langCode = browserLang.toLowerCase();
  if (langCode.startsWith("es")) {
    return "es";
  }
  const parts = langCode.split("-");
  if (parts.length > 1) {
    const country = parts[1].toLowerCase();
    if (SPANISH_COUNTRIES.includes(country)) {
      return "es";
    }
  }
  return "en";
}
function setLanguage(lang) {
  var _a, _b;
  if (lang !== "en" && lang !== "es") {
    lang = "en";
  }
  currentLanguage = lang;
  localStorage.setItem("tecunuman_language", lang);
  (_a = document.getElementById("lang-en")) == null ? void 0 : _a.classList.toggle("active", lang === "en");
  (_b = document.getElementById("lang-es")) == null ? void 0 : _b.classList.toggle("active", lang === "es");
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (TRANSLATIONS[lang][key]) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });
}
function t$1(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS["en"][key] || key;
}
function getLanguage$1() {
  return currentLanguage;
}
function initI18n() {
  var _a, _b;
  const detectedLang = detectLanguage();
  setLanguage(detectedLang);
  (_a = document.getElementById("lang-en")) == null ? void 0 : _a.addEventListener("click", () => setLanguage("en"));
  (_b = document.getElementById("lang-es")) == null ? void 0 : _b.addEventListener("click", () => setLanguage("es"));
}
window.t = t$1;
window.setLanguage = setLanguage;
window.currentLanguage = () => currentLanguage;
window.getCurrentLanguage = getLanguage$1;
window.getLanguage = getLanguage$1;
window.initI18n = initI18n;
const QUESTION_TYPES = {
  TRANSLATE_TO_KICHE: "translate_to_kiche",
  TRANSLATE_FROM_KICHE: "translate_from_kiche",
  MULTIPLE_CHOICE: "multiple_choice",
  LISTEN_AND_TYPE: "listen_and_type"
  // For future audio implementation
};
const VOCABULARY = {
  // Level 1: Basic Greetings and Common Words
  beginner: [
    { kiche: "ja", spanish: "casa", english: "house", audio: null },
    { kiche: "ja'", spanish: "agua", english: "water", audio: null },
    { kiche: "q'ij", spanish: "sol/día", english: "sun/day", audio: null },
    { kiche: "ik'", spanish: "luna/mes", english: "moon/month", audio: null },
    { kiche: "ulew", spanish: "tierra", english: "earth", audio: null },
    { kiche: "che'", spanish: "árbol", english: "tree", audio: null },
    { kiche: "ab'aj", spanish: "piedra", english: "stone", audio: null },
    { kiche: "q'aq'", spanish: "fuego", english: "fire", audio: null },
    { kiche: "kaq'iq'", spanish: "viento", english: "wind", audio: null },
    { kiche: "jab'", spanish: "lluvia", english: "rain", audio: null },
    { kiche: "saq", spanish: "blanco", english: "white", audio: null },
    { kiche: "q'eq", spanish: "negro", english: "black", audio: null },
    { kiche: "kaq", spanish: "rojo", english: "red", audio: null },
    { kiche: "rax", spanish: "verde/azul", english: "green/blue", audio: null },
    { kiche: "q'an", spanish: "amarillo", english: "yellow", audio: null },
    { kiche: "winaq", spanish: "persona", english: "person", audio: null },
    { kiche: "achi", spanish: "hombre", english: "man", audio: null },
    { kiche: "ixoq", spanish: "mujer", english: "woman", audio: null },
    { kiche: "ak'al", spanish: "niño", english: "child", audio: null },
    { kiche: "tat", spanish: "padre", english: "father", audio: null },
    { kiche: "nan", spanish: "madre", english: "mother", audio: null },
    { kiche: "wa", spanish: "tortilla/comida", english: "tortilla/food", audio: null },
    { kiche: "tz'i'", spanish: "perro", english: "dog", audio: null },
    { kiche: "mis", spanish: "gato", english: "cat", audio: null },
    { kiche: "kar", spanish: "pescado", english: "fish", audio: null }
  ],
  // Level 2: Numbers and Basic Phrases
  elementary: [
    { kiche: "jun", spanish: "uno", english: "one", audio: null },
    { kiche: "ka'ib'", spanish: "dos", english: "two", audio: null },
    { kiche: "oxib'", spanish: "tres", english: "three", audio: null },
    { kiche: "kajib'", spanish: "cuatro", english: "four", audio: null },
    { kiche: "job'", spanish: "cinco", english: "five", audio: null },
    { kiche: "waqib'", spanish: "seis", english: "six", audio: null },
    { kiche: "wuqub'", spanish: "siete", english: "seven", audio: null },
    { kiche: "wajxaqib'", spanish: "ocho", english: "eight", audio: null },
    { kiche: "b'elejeb'", spanish: "nueve", english: "nine", audio: null },
    { kiche: "lajuj", spanish: "diez", english: "ten", audio: null },
    { kiche: "junlajuj", spanish: "once", english: "eleven", audio: null },
    { kiche: "kab'lajuj", spanish: "doce", english: "twelve", audio: null },
    { kiche: "oxlajuj", spanish: "trece", english: "thirteen", audio: null },
    { kiche: "jwinaq", spanish: "veinte", english: "twenty", audio: null },
    { kiche: "saq'arik", spanish: "amanecer", english: "dawn", audio: null },
    { kiche: "nik'aj q'ij", spanish: "mediodía", english: "noon", audio: null },
    { kiche: "q'equmal", spanish: "oscuridad", english: "darkness", audio: null },
    { kiche: "aq'ab'", spanish: "noche", english: "night", audio: null },
    { kiche: "utz", spanish: "bueno", english: "good", audio: null },
    { kiche: "itzel", spanish: "malo", english: "bad", audio: null },
    { kiche: "nim", spanish: "grande", english: "big", audio: null },
    { kiche: "ch'utin", spanish: "pequeño", english: "small", audio: null },
    { kiche: "nimalaj", spanish: "muy grande", english: "very big", audio: null },
    { kiche: "k'o", spanish: "hay/existe", english: "there is", audio: null },
    { kiche: "majun", spanish: "nada/nadie", english: "nothing/nobody", audio: null }
  ],
  // Level 3: Greetings and Social Phrases
  intermediate: [
    { kiche: "Saqarik", spanish: "Buenos días", english: "Good morning", audio: null },
    { kiche: "Xq'ij", spanish: "Buenas tardes", english: "Good afternoon", audio: null },
    { kiche: "Xokaq'ab'", spanish: "Buenas noches", english: "Good evening", audio: null },
    { kiche: "La utz awach?", spanish: "¿Cómo estás?", english: "How are you?", audio: null },
    { kiche: "Utz matyox", spanish: "Bien, gracias", english: "Good, thank you", audio: null },
    { kiche: "Matyox", spanish: "Gracias", english: "Thank you", audio: null },
    { kiche: "Je'", spanish: "Sí", english: "Yes", audio: null },
    { kiche: "Mani", spanish: "No", english: "No", audio: null },
    { kiche: "Jas ub'i' la?", spanish: "¿Cómo se llama?", english: "What is your name?", audio: null },
    { kiche: "Nub'i'...", spanish: "Mi nombre es...", english: "My name is...", audio: null },
    { kiche: "Kinb'e", spanish: "Me voy", english: "I'm leaving", audio: null },
    { kiche: "Chib'an che", spanish: "Adiós", english: "Goodbye", audio: null },
    { kiche: "K'a chi k'a", spanish: "Hasta luego", english: "See you later", audio: null },
    { kiche: "B'a'n", spanish: "Por favor", english: "Please", audio: null },
    { kiche: "Sachb'al mak", spanish: "Perdón", english: "Excuse me/Sorry", audio: null },
    { kiche: "Qas", spanish: "verdad", english: "truth", audio: null },
    { kiche: "Tzij", spanish: "palabra", english: "word", audio: null },
    { kiche: "Ch'ab'al", spanish: "idioma/lengua", english: "language", audio: null },
    { kiche: "K'iche' ch'ab'al", spanish: "idioma K'iche'", english: "K'iche' language", audio: null },
    { kiche: "Kinwetamaj", spanish: "Estoy aprendiendo", english: "I am learning", audio: null }
  ],
  // Level 4: War and Battle Terms (thematically appropriate!)
  advanced: [
    { kiche: "ch'eken", spanish: "guerra", english: "war", audio: null },
    { kiche: "achi'il", spanish: "guerrero", english: "warrior", audio: null },
    { kiche: "b'alam", spanish: "jaguar", english: "jaguar", audio: null },
    { kiche: "k'uk'", spanish: "quetzal", english: "quetzal", audio: null },
    { kiche: "ajaw", spanish: "señor/rey", english: "lord/king", audio: null },
    { kiche: "amaq'", spanish: "nación/pueblo", english: "nation/people", audio: null },
    { kiche: "tinamit", spanish: "ciudad", english: "city", audio: null },
    { kiche: "jul", spanish: "cueva", english: "cave", audio: null },
    { kiche: "juyub'", spanish: "montaña", english: "mountain", audio: null },
    { kiche: "siwan", spanish: "barranco", english: "ravine", audio: null },
    { kiche: "chak'ab'", spanish: "hacha", english: "axe", audio: null },
    { kiche: "tz'alam", spanish: "escudo", english: "shield", audio: null },
    { kiche: "ch'ich'", spanish: "metal/espada", english: "metal/sword", audio: null },
    { kiche: "k'uxb'al", spanish: "flecha", english: "arrow", audio: null },
    { kiche: "jun'ik", spanish: "unirse", english: "to unite", audio: null },
    { kiche: "ch'akoj", spanish: "batalla", english: "battle", audio: null },
    { kiche: "ch'eken ya'oj", spanish: "atacar", english: "to attack", audio: null },
    { kiche: "kolob'al", spanish: "defender", english: "to defend", audio: null },
    { kiche: "ch'akanik", spanish: "victoria", english: "victory", audio: null },
    { kiche: "sachoj", spanish: "derrota", english: "defeat", audio: null },
    { kiche: "k'aslemal", spanish: "vida", english: "life", audio: null },
    { kiche: "kaminaq", spanish: "muerte", english: "death", audio: null },
    { kiche: "uk'u'x", spanish: "corazón/centro", english: "heart/center", audio: null },
    { kiche: "no'jib'al", spanish: "sabiduría", english: "wisdom", audio: null },
    { kiche: "k'axk'olil", spanish: "sufrimiento", english: "suffering", audio: null }
  ],
  // Level 5: Spiritual and Cultural Terms
  expert: [
    { kiche: "K'ab'awil", spanish: "dios/deidad", english: "god/deity", audio: null },
    { kiche: "Uk'u'x Kaj", spanish: "Corazón del Cielo", english: "Heart of Sky", audio: null },
    { kiche: "Uk'u'x Ulew", spanish: "Corazón de la Tierra", english: "Heart of Earth", audio: null },
    { kiche: "Xib'alb'a", spanish: "inframundo", english: "underworld", audio: null },
    { kiche: "Pop Wuj", spanish: "Popol Vuh", english: "Popol Vuh", audio: null },
    { kiche: "ajq'ij", spanish: "sacerdote maya", english: "Mayan priest", audio: null },
    { kiche: "cholq'ij", spanish: "calendario sagrado", english: "sacred calendar", audio: null },
    { kiche: "nawal", spanish: "espíritu/nagual", english: "spirit/nagual", audio: null },
    { kiche: "ch'umilal", spanish: "destino/estrella", english: "destiny/star", audio: null },
    { kiche: "tz'aqat", spanish: "completo/sagrado", english: "complete/sacred", audio: null },
    { kiche: "k'amal b'e", spanish: "guía/líder", english: "guide/leader", audio: null },
    { kiche: "Q'umarkaj", spanish: "capital K'iche'", english: "K'iche' capital", audio: null },
    { kiche: "ixim", spanish: "maíz", english: "corn/maize", audio: null },
    { kiche: "pixab'", spanish: "consejo/mandamiento", english: "counsel/commandment", audio: null },
    { kiche: "sib'alaj", spanish: "mucho", english: "much/very", audio: null },
    { kiche: "ronojel", spanish: "todo", english: "all/everything", audio: null },
    { kiche: "nuk'aslemal", spanish: "mi vida", english: "my life", audio: null },
    { kiche: "qati't qamam", spanish: "nuestros abuelos", english: "our ancestors", audio: null },
    { kiche: "ojer tzij", spanish: "historia antigua", english: "ancient story", audio: null },
    { kiche: "saqil k'aslemal", spanish: "vida en paz", english: "life in peace", audio: null }
  ]
};
const LEVEL_ORDER = ["beginner", "elementary", "intermediate", "advanced", "expert"];
function getVocabularyByLevel(level) {
  const maxLevel = Math.min(level, LEVEL_ORDER.length - 1);
  let vocab = [];
  for (let i = 0; i <= maxLevel; i++) {
    vocab = vocab.concat(VOCABULARY[LEVEL_ORDER[i]]);
  }
  return vocab;
}
function getRandomVocab(vocab, count) {
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
function generateWrongAnswers(correctWord, vocab, count = 3, field = "kiche") {
  const others = vocab.filter((w) => w[field] !== correctWord[field]);
  const shuffled = others.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((w) => w[field]);
}
function createQuestion(word, type, vocab) {
  const question = {
    word,
    type,
    correctAnswer: "",
    prompt: "",
    instruction: "",
    choices: null
  };
  switch (type) {
    case QUESTION_TYPES.TRANSLATE_TO_KICHE:
      question.prompt = word.english;
      question.correctAnswer = word.kiche;
      question.instruction = "Translate to K'iche':";
      break;
    case QUESTION_TYPES.TRANSLATE_FROM_KICHE:
      question.prompt = word.kiche;
      question.correctAnswer = word.english;
      question.instruction = "Translate to English:";
      break;
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      const toKiche = Math.random() > 0.5;
      if (toKiche) {
        question.prompt = word.english;
        question.correctAnswer = word.kiche;
        question.instruction = "Select the K'iche' translation:";
        const wrongAnswers = generateWrongAnswers(word, vocab, 3, "kiche");
        question.choices = [word.kiche, ...wrongAnswers].sort(() => Math.random() - 0.5);
      } else {
        question.prompt = word.kiche;
        question.correctAnswer = word.english;
        question.instruction = "Select the English translation:";
        const wrongAnswers = generateWrongAnswers(word, vocab, 3, "english");
        question.choices = [word.english, ...wrongAnswers].sort(() => Math.random() - 0.5);
      }
      break;
  }
  return question;
}
function generateBattleQuestions(level, count = 5) {
  const vocab = getVocabularyByLevel(level);
  const selectedWords = getRandomVocab(vocab, count);
  return selectedWords.map((word) => {
    let type;
    if (level === 0 || Math.random() < 0.5) {
      type = QUESTION_TYPES.MULTIPLE_CHOICE;
    } else {
      type = Math.random() < 0.5 ? QUESTION_TYPES.TRANSLATE_TO_KICHE : QUESTION_TYPES.TRANSLATE_FROM_KICHE;
    }
    return createQuestion(word, type, vocab);
  });
}
function checkAnswer(userAnswer, correctAnswer) {
  const normalizedUser = userAnswer.toLowerCase().trim();
  const normalizedCorrect = correctAnswer.toLowerCase().trim();
  if (normalizedUser === normalizedCorrect) return true;
  const simplifyKiche = (str) => str.replace(/'/g, "'").replace(/'/g, "'").replace(/'/g, "").replace(/b'/g, "b").replace(/k'/g, "k").replace(/q'/g, "q").replace(/tz'/g, "tz").replace(/ch'/g, "ch");
  if (simplifyKiche(normalizedUser) === simplifyKiche(normalizedCorrect)) {
    return true;
  }
  return false;
}
window.VOCABULARY = VOCABULARY;
window.QUESTION_TYPES = QUESTION_TYPES;
window.getVocabularyByLevel = getVocabularyByLevel;
window.generateBattleQuestions = generateBattleQuestions;
window.checkAnswer = checkAnswer;
const DIFFICULTY = {
  SOLDIER: "soldier",
  WARRIOR: "warrior",
  HERO: "hero"
};
const LESSON_TYPES = {
  VOCABULARY: "vocabulary",
  VOCABULARY_ANIMALS: "vocabulary_animals",
  VOCABULARY_WARFARE: "vocabulary_warfare",
  VOCABULARY_PLACES: "vocabulary_places",
  VOCABULARY_SPIRITUAL: "vocabulary_spiritual",
  VOCABULARY_ADVANCED: "vocabulary_advanced",
  PRONOUNS: "pronouns",
  GREETINGS: "greetings",
  POSSESSION: "possession",
  NEGATION: "negation",
  INTRANSITIVE_VERBS: "intransitive_verbs",
  TRANSITIVE_VERBS: "transitive_verbs",
  NUMBERS: "numbers",
  PLURALS: "plurals",
  QUESTIONS: "questions",
  COMMANDS: "commands",
  ADJECTIVES: "adjectives"
};
const QUESTION_TYPE = {
  MULTIPLE_CHOICE: "multiple_choice",
  ICON_SELECT: "icon_select",
  ICON_TEXT_SELECT: "icon_text_select",
  TRANSLATE_TO_KICHE: "translate_to_kiche",
  TRANSLATE_FROM_KICHE: "translate_from_kiche",
  FILL_BLANK: "fill_blank",
  RECALL_TYPE: "recall_type",
  PHRASE_SELECT: "phrase_select",
  CONVERSATION_RESPOND: "conversation_respond",
  AUDIO_SELECT: "audio_select"
};
const CULTURAL_VOCABULARY = {
  core: [
    { kiche: "ja'", english: "water", spanish: "agua", icon: "💧", culture: "In the Popol Vuh, the world began as an endless sea. Ja' is one of the most sacred elements.", difficulty: "soldier" },
    { kiche: "q'aq'", english: "fire", spanish: "fuego", icon: "🔥", culture: "Fire was a gift from Tohil, the K'iche' patron deity, to the ancestors at Tulan.", difficulty: "soldier" },
    { kiche: "ulew", english: "earth/land", spanish: "tierra", icon: "🌍", culture: "Guatemala's K'iche' name is 'Iximulew' - 'Land of Corn'. Ulew is sacred.", difficulty: "soldier" },
    { kiche: "ixim", english: "corn/maize", spanish: "maíz", icon: "🌽", culture: "In the Popol Vuh, humans were created from corn. Ixim is the flesh of the Maya people.", difficulty: "soldier" },
    { kiche: "q'ij", english: "sun/day", spanish: "sol/día", icon: "☀️", culture: "Jun Ajpu became the sun in the Popol Vuh. Q'ij also means 'day' - time follows the sun.", difficulty: "soldier" },
    { kiche: "ik'", english: "moon/month", spanish: "luna/mes", icon: "🌙", culture: "Xb'alanke became the moon. The Maya calendar tracks lunar cycles precisely.", difficulty: "soldier" },
    { kiche: "che'", english: "tree/wood", spanish: "árbol/madera", icon: "🌳", culture: "The ceiba tree (inup) is the sacred world tree connecting earth, sky, and underworld.", difficulty: "soldier" },
    { kiche: "ja", english: "house", spanish: "casa", icon: "🏠", culture: "Traditional K'iche' homes face east to greet the rising sun.", difficulty: "soldier" },
    { kiche: "wa", english: "tortilla/food", spanish: "tortilla/comida", icon: "🫓", culture: "Wa is sustenance itself. 'Kinwa'ik' (I eat) shares this root. Food is sacred.", difficulty: "soldier" },
    { kiche: "winaq", english: "person/people", spanish: "persona/gente", icon: "👤", culture: "Winaq also means 'twenty' - the complete human (10 fingers + 10 toes).", difficulty: "soldier" },
    { kiche: "ajaw", english: "lord/god", spanish: "señor/dios", icon: "👑", culture: "The Ajaw were divine rulers. 'Uk'u'x Kaj, Uk'u'x Ulew' (Heart of Sky, Heart of Earth) is the supreme Ajaw.", difficulty: "soldier" },
    { kiche: "b'alam", english: "jaguar", spanish: "jaguar", icon: "🐆", culture: "B'alam Kitze', B'alam Aq'ab' - the first K'iche' ancestors had jaguar names.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "kaq", english: "red", spanish: "rojo", icon: "🔴", culture: "Kaq iq' means 'red chile'. In Q'eqchi' Maya, this dish is called Kak'ik - a sacred turkey soup.", difficulty: "warrior" },
    { kiche: "q'eq", english: "black", spanish: "negro", icon: "⚫", culture: "Q'eq represents the night, the underworld Xib'alb'a, and the west.", difficulty: "warrior" },
    { kiche: "saq", english: "white", spanish: "blanco", icon: "⚪", culture: "Saq represents dawn, purity, and the north. Saqarik means 'it dawns/good morning'.", difficulty: "warrior" },
    { kiche: "rax", english: "green/blue", spanish: "verde/azul", icon: "🟢", culture: "K'iche' uses one word for green and blue - the color of jade and the sky.", difficulty: "warrior" },
    { kiche: "q'an", english: "yellow", spanish: "amarillo", icon: "🟡", culture: "Q'an represents the south and ripe corn. Q'anil is a day sign meaning 'seed'.", difficulty: "warrior" },
    { kiche: "juyub'", english: "mountain", spanish: "montaña", icon: "🏔️", culture: "Mountains are living beings in Maya thought. Many are named Juyub' + a quality.", difficulty: "warrior" },
    { kiche: "k'uk'", english: "quetzal", spanish: "quetzal", icon: "🦜", culture: "The quetzal's feathers adorned K'iche' royalty. Tecun Uman wore a quetzal headdress.", difficulty: "warrior" },
    { kiche: "tz'i'", english: "dog", spanish: "perro", icon: "🐕", culture: "Tz'i' is also a day sign. Dogs guided souls to Xib'alb'a in Maya belief.", difficulty: "warrior" },
    { kiche: "ab'aj", english: "stone", spanish: "piedra", icon: "🪨", culture: "The Maya built their pyramids from ab'aj. Stone altars are still used in ceremonies.", difficulty: "warrior" },
    { kiche: "kej", english: "deer/horse", spanish: "venado/caballo", icon: "🦌", culture: "Kej originally meant deer. After Spanish arrival, it also came to mean horse.", difficulty: "warrior" },
    { kiche: "achi", english: "man", spanish: "hombre", icon: "👨", culture: "The Rabinal Achi is a famous K'iche' drama about a captured warrior.", difficulty: "warrior" },
    { kiche: "ixoq", english: "woman", spanish: "mujer", icon: "👩", culture: "Ixoq shares the 'ix' prefix with Ixchel, the Maya moon goddess.", difficulty: "warrior" },
    { kiche: "ak'al", english: "child", spanish: "niño", icon: "👶", culture: "Children are treasured. An ak'al's first words are celebrated in Maya families.", difficulty: "warrior" },
    { kiche: "tat", english: "father", spanish: "padre", icon: "👨‍👦", culture: "Tat is used as an honorific for elder men, like 'tat Wel' (Mr. Manuel).", difficulty: "warrior" },
    { kiche: "nan", english: "mother", spanish: "madre", icon: "👩‍👦", culture: "Nan is used respectfully for women. Nan Mariy (Mrs. María) shows respect.", difficulty: "warrior" },
    { kiche: "ch'umil", english: "star", spanish: "estrella", icon: "⭐", culture: "The Hero Twins became the sun and moon; other ancestors became ch'umil (stars).", difficulty: "warrior" },
    { kiche: "kotz'i'j", english: "flower", spanish: "flor", icon: "🌸", culture: "Kotz'i'j also means 'candle' and 'Maya ceremony' - flowers honor the ancestors.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "kaminaq", english: "death/the dead", spanish: "muerte/los muertos", icon: "💀", culture: "Kaminaq are honored ancestors. Jun Kame and Wuqub' Kame ruled Xib'alb'a.", difficulty: "hero" },
    { kiche: "sutz'", english: "cloud", spanish: "nube", icon: "☁️", culture: "Clouds carry the rain (jab'). The Maya observed clouds to predict weather.", difficulty: "hero" },
    { kiche: "kaq'iq'", english: "wind", spanish: "viento", icon: "💨", culture: "Juraqan (hurricane) was a wind deity. Kaq'iq' carries prayers to the sky.", difficulty: "hero" },
    { kiche: "jab'", english: "rain", spanish: "lluvia", icon: "🌧️", culture: "Chaak (the rain deity) was honored with ceremonies to bring jab' for crops.", difficulty: "hero" },
    { kiche: "tinamit", english: "town/city", spanish: "pueblo/ciudad", icon: "🏘️", culture: "Q'umarkaj was the great tinamit of the K'iche' before the Spanish invasion.", difficulty: "hero" },
    { kiche: "b'e", english: "road/path", spanish: "camino", icon: "🛤️", culture: "The Maya built sacbeob (white roads) connecting cities. B'e also means destiny.", difficulty: "hero" },
    { kiche: "pom", english: "incense/copal", spanish: "incienso/copal", icon: "🪔", culture: "Pom (copal resin) is burned in all Maya ceremonies. Its smoke carries prayers.", difficulty: "hero" },
    { kiche: "uk'u'x", english: "heart/center", spanish: "corazón/centro", icon: "❤️", culture: "'Uk'u'x Kaj, Uk'u'x Ulew' - Heart of Sky, Heart of Earth - the supreme deity.", difficulty: "hero" },
    { kiche: "nawal", english: "spirit/nagual", spanish: "espíritu/nagual", icon: "👻", culture: "Each person has a nawal - an animal spirit companion from their birth day sign.", difficulty: "hero" },
    { kiche: "ajq'ij", english: "daykeeper/priest", spanish: "sacerdote maya", icon: "🧙", culture: "Ajq'ijab' keep the sacred 260-day calendar and perform ceremonies.", difficulty: "hero" },
    { kiche: "cholq'ij", english: "sacred calendar", spanish: "calendario sagrado", icon: "📅", culture: "The 260-day cholq'ij determines one's nawal and destiny. Still used today.", difficulty: "hero" },
    { kiche: "k'aslemal", english: "life", spanish: "vida", icon: "🌱", culture: "K'aslemal encompasses all living things. 'Saqil k'aslemal' means 'life in peace'.", difficulty: "hero" },
    { kiche: "pixab'", english: "counsel/advice", spanish: "consejo", icon: "📜", culture: "Pixab' are sacred teachings passed down from ancestors. The Popol Vuh contains many.", difficulty: "hero" },
    { kiche: "ub'i'", english: "name", spanish: "nombre", icon: "🏷️", culture: "A person's ub'i' connects them to ancestors. Many are named for their birth day.", difficulty: "hero" },
    { kiche: "kem", english: "weaving", spanish: "tejido", icon: "🧶", culture: "Weaving is sacred feminine knowledge. Each town has distinct patterns.", difficulty: "hero" },
    { kiche: "po't", english: "huipil (blouse)", spanish: "huipil", icon: "👚", culture: "The po't's designs tell the wearer's town, status, and cosmological beliefs.", difficulty: "hero" },
    { kiche: "uq", english: "corte (skirt)", spanish: "corte/falda", icon: "👗", culture: "The uq wraps around like the cosmos wraps around the earth.", difficulty: "hero" },
    { kiche: "kakaw", english: "cacao", spanish: "cacao", icon: "🍫", culture: "Kakaw was currency and a sacred drink. Only nobles drank chocolate.", difficulty: "hero" },
    { kiche: "kinaq'", english: "beans", spanish: "frijoles", icon: "🫘", culture: "Kinaq' and ixim (corn) together make a complete protein - Maya wisdom.", difficulty: "hero" },
    { kiche: "ik", english: "chile", spanish: "chile", icon: "🌶️", culture: "Ik adds heat to every meal. Kaq ik' (red chile) is essential in K'iche' cooking.", difficulty: "hero" }
  ]
};
const VOCABULARY_ANIMALS = {
  core: [
    { kiche: "tz'i'", english: "dog", spanish: "perro", icon: "🐕", culture: "Tz'i' is also a day sign. Dogs guided souls to Xib'alb'a in Maya belief.", difficulty: "soldier" },
    { kiche: "mis", english: "cat", spanish: "gato", icon: "🐈", culture: "Cats arrived with the Spanish. The K'iche' word comes from Spanish 'miso'.", difficulty: "soldier" },
    { kiche: "kar", english: "fish", spanish: "pescado", icon: "🐟", culture: "Lake Atitlán is famous for its fish. Kar is essential vocabulary here.", difficulty: "soldier" },
    { kiche: "tz'ikin", english: "bird", spanish: "pájaro", icon: "🐦", culture: "Tz'ikin is a day sign meaning 'bird' - associated with luck and fortune.", difficulty: "soldier" },
    { kiche: "kumatz", english: "snake", spanish: "serpiente", icon: "🐍", culture: "Kukulkan/Q'uq'umatz, the feathered serpent, is a central Maya deity.", difficulty: "soldier" },
    { kiche: "kej", english: "deer", spanish: "venado", icon: "🦌", culture: "Kej is both a day sign and means 'deer'. After the conquest, it also means 'horse'.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "b'alam", english: "jaguar", spanish: "jaguar", icon: "🐆", culture: "B'alam Kitze', B'alam Aq'ab' - the first K'iche' ancestors had jaguar names.", difficulty: "warrior" },
    { kiche: "k'uk'", english: "quetzal", spanish: "quetzal", icon: "🦜", culture: "The sacred quetzal's feathers adorned K'iche' royalty. Tecun Uman wore a quetzal headdress.", difficulty: "warrior" },
    { kiche: "imul", english: "rabbit", spanish: "conejo", icon: "🐇", culture: "In Maya stories, a rabbit helped the Hero Twins trick the Lords of Xib'alb'a.", difficulty: "warrior" },
    { kiche: "xik'", english: "wing/fly", spanish: "ala/volar", icon: "🪽", culture: "Used for flying creatures. The quetzal's wings (uxik' k'uk') were most precious.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "koj", english: "puma/lion", spanish: "puma/león", icon: "🦁", culture: "Mountain lions still roam the Guatemalan highlands.", difficulty: "hero" },
    { kiche: "sotz'", english: "bat", spanish: "murciélago", icon: "🦇", culture: "Sotz' is a day sign. Camazotz, the bat god, ruled in Xib'alb'a.", difficulty: "hero" }
  ]
};
const VOCABULARY_WARFARE = {
  core: [
    { kiche: "ch'akoj", english: "battle", spanish: "batalla", icon: "⚔️", culture: "The K'iche' were fierce warriors who defended their lands for centuries.", difficulty: "soldier" },
    { kiche: "ch'eken", english: "war", spanish: "guerra", icon: "🛡️", culture: "Ch'eken ya'oj means 'to make war'. The K'iche' resisted Spanish conquest bravely.", difficulty: "soldier" },
    { kiche: "achi'il", english: "warrior", spanish: "guerrero", icon: "🏹", culture: "Achi'il comes from 'achi' (man). Warriors were essential to K'iche' society.", difficulty: "soldier" },
    { kiche: "tz'alam", english: "shield", spanish: "escudo", icon: "🛡️", culture: "K'iche' warriors used round shields made of wood and leather.", difficulty: "soldier" },
    { kiche: "k'uxb'al", english: "arrow", spanish: "flecha", icon: "🏹", culture: "Before metal weapons, arrows were the K'iche's most powerful weapon.", difficulty: "soldier" },
    { kiche: "chak'ab'", english: "axe", spanish: "hacha", icon: "🪓", culture: "Obsidian axes were both tools and weapons for the ancient Maya.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "ch'akanik", english: "victory", spanish: "victoria", icon: "🏆", culture: "Ch'akanik brought glory to the warrior's lineage.", difficulty: "warrior" },
    { kiche: "sachoj", english: "defeat", spanish: "derrota", icon: "💔", culture: "Sachoj also means 'to be lost'. Defeat meant losing one's way.", difficulty: "warrior" },
    { kiche: "kolob'al", english: "to defend", spanish: "defender", icon: "🏰", culture: "Kolob'al - to protect one's people and land.", difficulty: "warrior" },
    { kiche: "kamisaj", english: "to kill", spanish: "matar", icon: "💀", culture: "In war, warriors had to be prepared for this harsh reality.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "q'at tzij", english: "victory speech", spanish: "discurso de victoria", icon: "🎺", culture: "Warriors gave formal speeches after battle victories.", difficulty: "hero" },
    { kiche: "jun'ik", english: "to unite", spanish: "unirse", icon: "🤝", culture: "Tecun Uman tried to unite all Maya peoples against the Spanish.", difficulty: "hero" }
  ]
};
const VOCABULARY_PLACES = {
  core: [
    { kiche: "juyub'", english: "mountain", spanish: "montaña", icon: "🏔️", culture: "Mountains are living beings in Maya thought. Many are sacred sites.", difficulty: "soldier" },
    { kiche: "siwan", english: "ravine/canyon", spanish: "barranco", icon: "🏞️", culture: "The highlands are full of deep ravines carved by ancient rivers.", difficulty: "soldier" },
    { kiche: "b'e", english: "road/path", spanish: "camino", icon: "🛤️", culture: "The Maya built extensive road networks connecting their cities.", difficulty: "soldier" },
    { kiche: "tinamit", english: "city/town", spanish: "ciudad/pueblo", icon: "🏘️", culture: "Tinamit refers to a fortified city. Q'umarkaj was the greatest tinamit.", difficulty: "soldier" },
    { kiche: "jul", english: "cave", spanish: "cueva", icon: "🕳️", culture: "Caves were entrances to Xib'alb'a. Many are still sacred sites.", difficulty: "soldier" },
    { kiche: "cho", english: "lake", spanish: "lago", icon: "🏞️", culture: "Lake Atitlán is called 'the navel of the world' by the Maya.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "ya'", english: "river", spanish: "río", icon: "🌊", culture: "Rivers were highways of the ancient Maya world.", difficulty: "warrior" },
    { kiche: "k'isis", english: "forest", spanish: "bosque", icon: "🌲", culture: "The cloud forests of the highlands shelter the sacred quetzal.", difficulty: "warrior" },
    { kiche: "tulan", english: "legendary city", spanish: "ciudad legendaria", icon: "🏛️", culture: "Tulan was the mythical place where K'iche' ancestors received fire.", difficulty: "warrior" },
    { kiche: "k'ichela'", english: "K'iche' land", spanish: "tierra K'iche'", icon: "🗺️", culture: "The ancestral homeland of the K'iche' people in the highlands.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "pek", english: "cave shrine", spanish: "cueva sagrada", icon: "⛩️", culture: "Special caves used for ceremonies and offerings.", difficulty: "hero" },
    { kiche: "jolomaj", english: "skull shrine", spanish: "altar de cráneos", icon: "💀", culture: "Sacred places where ancestral remains were honored.", difficulty: "hero" }
  ]
};
const VOCABULARY_SPIRITUAL = {
  core: [
    { kiche: "K'ab'awil", english: "god/deity", spanish: "dios/deidad", icon: "✨", culture: "K'ab'awil refers to divine beings. Tohil was the K'iche' patron deity.", difficulty: "soldier" },
    { kiche: "ajq'ij", english: "daykeeper/priest", spanish: "sacerdote maya", icon: "🧙", culture: "Ajq'ij are keepers of the sacred calendar and perform ceremonies.", difficulty: "soldier" },
    { kiche: "nawal", english: "spirit/nagual", spanish: "espíritu/nagual", icon: "👻", culture: "Every person has a nawal - an animal spirit companion.", difficulty: "soldier" },
    { kiche: "cholq'ij", english: "sacred calendar", spanish: "calendario sagrado", icon: "📅", culture: "The 260-day sacred calendar guides ceremonies and life decisions.", difficulty: "soldier" },
    { kiche: "loq'olaj", english: "sacred/holy", spanish: "sagrado/santo", icon: "🙏", culture: "Loq'olaj describes anything connected to the divine.", difficulty: "soldier" },
    { kiche: "pixab'", english: "counsel/commandment", spanish: "consejo/mandamiento", icon: "📜", culture: "The pixab' are the teachings passed down from ancestors.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "Xib'alb'a", english: "underworld", spanish: "inframundo", icon: "🌑", culture: "Xib'alb'a means 'Place of Fear'. The Hero Twins defeated its lords.", difficulty: "warrior" },
    { kiche: "Pop Wuj", english: "Popol Vuh", spanish: "Popol Vuh", icon: "📖", culture: "The sacred book of the K'iche', telling of creation and heroes.", difficulty: "warrior" },
    { kiche: "uk'u'x", english: "heart/essence", spanish: "corazón/esencia", icon: "❤️", culture: "Uk'u'x Kaj, Uk'u'x Ulew - Heart of Sky, Heart of Earth - the creator.", difficulty: "warrior" },
    { kiche: "ch'umilal", english: "destiny/star", spanish: "destino/estrella", icon: "⭐", culture: "Each person's destiny is written in the stars and calendar.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "tz'aqat", english: "complete/sacred", spanish: "completo/sagrado", icon: "🔮", culture: "To be tz'aqat is to be spiritually complete.", difficulty: "hero" },
    { kiche: "ojer tzij", english: "ancient words", spanish: "palabras antiguas", icon: "📿", culture: "The sacred oral traditions passed down for millennia.", difficulty: "hero" }
  ]
};
const VOCABULARY_ADVANCED = {
  core: [
    { kiche: "amaq'", english: "nation/people", spanish: "nación/pueblo", icon: "🏛️", culture: "The K'iche' amaq' was one of the most powerful in Mesoamerica.", difficulty: "soldier" },
    { kiche: "ajpop", english: "king/ruler", spanish: "rey/gobernante", icon: "👑", culture: "The Ajpop was the supreme ruler of the K'iche' nation.", difficulty: "soldier" },
    { kiche: "k'amal b'e", english: "guide/leader", spanish: "guía/líder", icon: "🧭", culture: "K'amal b'e literally means 'one who shows the road'.", difficulty: "soldier" },
    { kiche: "k'aslemal", english: "life", spanish: "vida", icon: "🌱", culture: "K'aslemal encompasses all of existence, not just biological life.", difficulty: "soldier" },
    { kiche: "kaminaq", english: "death/the dead", spanish: "muerte/los muertos", icon: "💀", culture: "Death is not an end but a transition to another realm.", difficulty: "soldier" },
    { kiche: "no'jib'al", english: "wisdom", spanish: "sabiduría", icon: "🦉", culture: "No'jib'al comes from no'j (thought) - deep, earned wisdom.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "qati't qamam", english: "our ancestors", spanish: "nuestros abuelos", icon: "👴", culture: "Literally 'our grandmothers our grandfathers' - all who came before.", difficulty: "warrior" },
    { kiche: "saqil k'aslemal", english: "life in peace", spanish: "vida en paz", icon: "🕊️", culture: "The ultimate goal - living in harmony and peace.", difficulty: "warrior" },
    { kiche: "k'axk'olil", english: "suffering", spanish: "sufrimiento", icon: "😢", culture: "The conquest brought immense k'axk'olil to the K'iche' people.", difficulty: "warrior" },
    { kiche: "q'ij saq", english: "holy day/holiday", spanish: "día sagrado", icon: "🎉", culture: "Important days in the sacred calendar for ceremonies.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "Iximulew", english: "Guatemala (Land of Corn)", spanish: "Guatemala (Tierra del Maíz)", icon: "🌽", culture: "The K'iche' name for Guatemala means 'Land of Corn'.", difficulty: "hero" },
    { kiche: "ronojel", english: "everything/all", spanish: "todo", icon: "🌍", culture: "Ronojel encompasses the totality of existence.", difficulty: "hero" }
  ]
};
const GREETINGS_CONTENT = {
  core: [
    { kiche: "Saqarik", english: "Good morning", spanish: "Buenos días", icon: "🌅", culture: "From 'saq' (white/dawn) + 'arik' (it becomes). The dawn is sacred - a new beginning.", difficulty: "soldier" },
    { kiche: "Xb'e q'ij", english: "Good afternoon", spanish: "Buenas tardes", icon: "🌤️", culture: "Literally 'the sun went' - acknowledging the sun's journey across the sky.", difficulty: "soldier" },
    { kiche: "Xok aq'ab'", english: "Good evening", spanish: "Buenas noches", icon: "🌙", culture: "Literally 'night entered'. Evening is time for family and rest.", difficulty: "soldier" },
    { kiche: "La utz awach?", english: "How are you?", spanish: "¿Cómo estás?", icon: "😊", culture: "Utz = good, awach = your face/self. Asking about wellbeing is essential courtesy.", difficulty: "soldier" },
    { kiche: "Utz maltyox", english: "Fine, thank you", spanish: "Bien, gracias", icon: "👍", culture: "Maltyox comes from Spanish 'Dios te lo pague' - adapted into K'iche'.", difficulty: "soldier" },
    { kiche: "Maltyox", english: "Thank you", spanish: "Gracias", icon: "🙏", culture: "Gratitude is central to K'iche' culture. Always thank those who help you.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "La utz wach la?", english: "How are you? (formal)", spanish: "¿Cómo está usted?", icon: "🎩", culture: "The 'la' suffix shows respect - used for elders, in-laws, and authorities.", difficulty: "warrior" },
    { kiche: "Jas ab'i'?", english: "What is your name?", spanish: "¿Cómo te llamas?", icon: "🏷️", culture: "Names are sacred. Traditionally, names came from the day of birth.", difficulty: "warrior" },
    { kiche: "___ le nub'i'", english: "My name is ___", spanish: "Mi nombre es ___", icon: "📛", culture: "Nub'i' = my name. Sharing your name creates a bond.", difficulty: "warrior" },
    { kiche: "Jeb'a'", english: "Goodbye", spanish: "Adiós", icon: "👋", culture: "A warm farewell. K'iche' culture values proper greetings and farewells.", difficulty: "warrior" },
    { kiche: "K'a chi k'a", english: "See you later", spanish: "Hasta luego", icon: "🔜", culture: "Implies you will meet again. Relationships are ongoing in K'iche' culture.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "Sachb'al mak", english: "Excuse me / Sorry", spanish: "Perdón / Disculpe", icon: "😅", culture: "Literally 'loss of sin/fault'. Acknowledging mistakes restores harmony.", difficulty: "hero" },
    { kiche: "B'a'n", english: "Please", spanish: "Por favor", icon: "🙏", culture: "Politeness is highly valued. B'a'n softens requests.", difficulty: "hero" },
    { kiche: "Maj kab'ij la", english: "You're welcome (formal)", spanish: "De nada (formal)", icon: "😌", culture: "Literally 'say nothing of it'. Humility in receiving thanks.", difficulty: "hero" },
    { kiche: "Kinb'e chik", english: "I'm leaving now", spanish: "Ya me voy", icon: "🚶", culture: "It's polite to announce departure rather than just leaving.", difficulty: "hero" },
    { kiche: "Utz apetik", english: "Welcome (to one arriving)", spanish: "Bienvenido", icon: "🤗", culture: "Literally 'good your-coming'. Welcoming guests is sacred duty.", difficulty: "hero" }
  ]
};
const CONVERSATION_EXCHANGES = {
  phraseSelect: [
    { situation: "Ask someone their name", situationEs: "Pregunta el nombre de alguien", icon: "🏷️", correctPhrase: "Jas ab'i'?", wrongPhrases: ["La utz awach?", "Jas kab'ij?", "At at?"], culture: "Names are sacred in K'iche' culture. B'i' means name.", difficulty: "soldier" },
    { situation: "Say good morning", situationEs: "Di buenos días", icon: "🌅", correctPhrase: "Saqarik", wrongPhrases: ["Xok aq'ab'", "Xb'e q'ij", "Maltyox"], culture: "Saqarik comes from 'saq' (white/light). Dawn is sacred.", difficulty: "soldier" },
    { situation: "Ask how someone is doing", situationEs: "Pregunta cómo está alguien", icon: "😊", correctPhrase: "La utz awach?", wrongPhrases: ["Jas ab'i'?", "Jas ri?", "La at?"], culture: "Utz means good, awach is 'your face' - asking about wellbeing.", difficulty: "soldier" },
    { situation: "Say thank you", situationEs: "Di gracias", icon: "🙏", correctPhrase: "Maltyox", wrongPhrases: ["Utz", "Jeb'a'", "B'a'n"], culture: "Maltyox evolved from Spanish 'Dios te lo pague'.", difficulty: "soldier" },
    { situation: "Say goodbye", situationEs: "Despídete", icon: "👋", correctPhrase: "Jeb'a'", wrongPhrases: ["Saqarik", "Maltyox", "La utz?"], culture: "Proper farewells are important for maintaining relationships.", difficulty: "warrior" },
    { situation: "Say 'see you later'", situationEs: "Di 'hasta luego'", icon: "🔜", correctPhrase: "K'a chi k'a", wrongPhrases: ["Jeb'a'", "Kinb'e chik", "Saqarik"], culture: "Implies an ongoing relationship - you will meet again.", difficulty: "warrior" },
    { situation: "Say 'I'm fine, thank you'", situationEs: "Di 'estoy bien, gracias'", icon: "👍", correctPhrase: "Utz maltyox", wrongPhrases: ["La utz?", "Maltyox utz", "Jeb'a'"], culture: "The standard response when asked how you are.", difficulty: "warrior" },
    { situation: "Apologize / say excuse me", situationEs: "Pide disculpas", icon: "😅", correctPhrase: "Sachb'al mak", wrongPhrases: ["Maltyox", "B'a'n", "Utz"], culture: "Literally 'loss of fault'. Acknowledging mistakes restores harmony.", difficulty: "hero" }
  ],
  kicheResponses: [
    { prompt: "La utz awach?", promptTranslation: "How are you?", icon: "💬", correctResponse: "Utz maltyox", wrongResponses: ["Maltyox", "Jeb'a'", "Saqarik"], responseTranslation: "Fine, thank you", culture: "This is the most common exchange. Practice until it's automatic!", difficulty: "warrior" },
    { prompt: "Saqarik!", promptTranslation: "Good morning!", icon: "🌅", correctResponse: "Saqarik", wrongResponses: ["Xok aq'ab'", "Maltyox", "Utz"], responseTranslation: "Good morning (back)", culture: "Mirror greetings back - it's polite to return the same greeting.", difficulty: "warrior" },
    { prompt: "Jas ab'i'?", promptTranslation: "What is your name?", icon: "🏷️", correctResponse: "___ le nub'i'", wrongResponses: ["Utz maltyox", "At at", "Maltyox"], responseTranslation: "___ is my name", culture: "Nub'i' = my name. Fill in your own name where the blank is.", difficulty: "warrior" },
    { prompt: "Jeb'a'!", promptTranslation: "Goodbye!", icon: "👋", correctResponse: "K'a chi k'a", wrongResponses: ["Saqarik", "Maltyox", "Utz"], responseTranslation: "See you later", culture: "A warm response that implies you'll meet again.", difficulty: "hero" },
    { prompt: "Maltyox chawe", promptTranslation: "Thank you (to you)", icon: "🙏", correctResponse: "Maj kab'ij", wrongResponses: ["Maltyox", "Utz", "Jeb'a'"], responseTranslation: "You're welcome", culture: "Literally 'say nothing of it'. Humble way to receive thanks.", difficulty: "hero" }
  ]
};
const NUMBERS_CONTENT = {
  core: [
    { kiche: "jun", english: "1 / one", spanish: "uno", icon: "1️⃣", culture: "Jun also means 'a/an'. Jun Ajpu (One Blowgunner) was a Hero Twin.", difficulty: "soldier" },
    { kiche: "keb'", english: "2 / two", spanish: "dos", icon: "2️⃣", culture: "The Hero Twins (Keb' Ajpu) represent duality - a core Maya concept.", difficulty: "soldier" },
    { kiche: "oxib'", english: "3 / three", spanish: "tres", icon: "3️⃣", culture: "Three stones form the traditional hearth (k'otz'ij) - the heart of the home.", difficulty: "soldier" },
    { kiche: "kajib'", english: "4 / four", spanish: "cuatro", icon: "4️⃣", culture: "Four directions, four colors, four first ancestors. The world has four corners.", difficulty: "soldier" },
    { kiche: "jo'ob'", english: "5 / five", spanish: "cinco", icon: "5️⃣", culture: "Five is one hand (q'ab'). The Maya counted in base 20 (hands + feet).", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "waqib'", english: "6 / six", spanish: "seis", icon: "6️⃣", culture: "Waqib' B'atz' is the K'iche' New Year ceremony.", difficulty: "warrior" },
    { kiche: "wuqub'", english: "7 / seven", spanish: "siete", icon: "7️⃣", culture: "Wuqub' Kame (Seven Death) was a Lord of Xib'alb'a.", difficulty: "warrior" },
    { kiche: "wajxaqib'", english: "8 / eight", spanish: "ocho", icon: "8️⃣", culture: "Eight is considered a powerful number in divination.", difficulty: "warrior" },
    { kiche: "b'elejeb'", english: "9 / nine", spanish: "nueve", icon: "9️⃣", culture: "Nine levels of the underworld (Xib'alb'a) in Maya cosmology.", difficulty: "warrior" },
    { kiche: "lajuj", english: "10 / ten", spanish: "diez", icon: "🔟", culture: "Ten = two hands. Lajuj Noj is a powerful day for wisdom.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "julajuj", english: "11", spanish: "once", icon: "1️⃣1️⃣", culture: "Eleven continues the count toward jwinaq (20).", difficulty: "hero" },
    { kiche: "kab'lajuj", english: "12", spanish: "doce", icon: "1️⃣2️⃣", culture: "Twelve months in the solar calendar (Haab').", difficulty: "hero" },
    { kiche: "oxlajuj", english: "13", spanish: "trece", icon: "1️⃣3️⃣", culture: "Thirteen levels of heaven. 13 × 20 = 260 days of the cholq'ij.", difficulty: "hero" },
    { kiche: "jwinaq", english: "20 / twenty", spanish: "veinte", icon: "2️⃣0️⃣", culture: "Jwinaq (one person) = 20 (fingers + toes). Base of Maya math!", difficulty: "hero" },
    { kiche: "k'al", english: "20 (for counting)", spanish: "veinte (contando)", icon: "✌️0️⃣", culture: "K'al is used when counting objects. Jun k'al = 20 things.", difficulty: "hero" }
  ]
};
const PRONOUNS_CONTENT = {
  core: [
    { kiche: "in", english: "I", spanish: "yo", icon: "🙋", culture: "The self. In K'iche' thought, the 'I' is connected to community.", difficulty: "soldier" },
    { kiche: "at", english: "you (informal)", spanish: "tú", icon: "🫵", culture: "Used with friends, family, and children. Shows familiarity.", difficulty: "soldier" },
    { kiche: "are", english: "he/she/it", spanish: "él/ella", icon: "👤", culture: "K'iche' doesn't distinguish gender - are covers he, she, and it!", difficulty: "soldier" },
    { kiche: "oj", english: "we", spanish: "nosotros", icon: "👥", culture: "Community (oj) is central to K'iche' identity. We before I.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "ix", english: "you all", spanish: "ustedes", icon: "👥", culture: "Used to address a group informally.", difficulty: "warrior" },
    { kiche: "are'", english: "they", spanish: "ellos/ellas", icon: "👥👥", culture: "The plural of are. Also gender-neutral.", difficulty: "warrior" },
    { kiche: "lal", english: "you (formal)", spanish: "usted", icon: "🎩", culture: "Shows respect. Used for elders, authorities, in-laws.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "alaq", english: "you all (formal)", spanish: "ustedes (formal)", icon: "🎩👥", culture: "Formal plural - for addressing respected groups.", difficulty: "hero" },
    { kiche: "ri in", english: "as for me", spanish: "en cuanto a mí", icon: "☝️", culture: "Topic marker - emphasizes the speaker.", difficulty: "hero" },
    { kiche: "ri at", english: "as for you", spanish: "en cuanto a ti", icon: "👆", culture: "Topic marker - emphasizes the listener.", difficulty: "hero" }
  ]
};
const POSSESSION_CONTENT = {
  core: [
    { kiche: "nu-", english: "my (before consonant)", spanish: "mi", icon: "1️⃣👤", culture: "Nuwuj = my book. Possession prefixes attach to the noun.", difficulty: "soldier", example: "nuwuj = my book" },
    { kiche: "w-", english: "my (before vowel)", spanish: "mi", icon: "1️⃣👤", culture: "Wachi'il = my friend. 'W' before vowels.", difficulty: "soldier", example: "wachi'il = my friend" },
    { kiche: "a-/aw-", english: "your", spanish: "tu", icon: "2️⃣👤", culture: "Awuj = your book. Awachi'il = your friend.", difficulty: "soldier", example: "awuj = your book" },
    { kiche: "u-/r-", english: "his/her/its", spanish: "su", icon: "3️⃣👤", culture: "Uwuj = his/her book. Rachi'il = his/her friend.", difficulty: "soldier", example: "uwuj = his/her book" }
  ],
  warrior: [
    { kiche: "qa-/q-", english: "our", spanish: "nuestro", icon: "👥❤️", culture: "Qawuj = our book. Community ownership is valued.", difficulty: "warrior", example: "qatinamit = our town" },
    { kiche: "i-/iw-", english: "your (plural)", spanish: "su (ustedes)", icon: "👥📖", culture: "Iwuj = your (all) book.", difficulty: "warrior", example: "iwuj = your (all) book" },
    { kiche: "ki-/k-", english: "their", spanish: "su (ellos)", icon: "👥👥❤️", culture: "Kiwuj = their book. Kachi'il = their friend.", difficulty: "warrior", example: "kiwuj = their book" }
  ],
  hero: [
    { kiche: "-il", english: "inherent possession", spanish: "posesión inherente", icon: "🔗", culture: "Nub'aqil = my body (inherent). Nub'aq = bones I own (not mine).", difficulty: "hero", example: "nub'aqil = my body" },
    { kiche: "wochoch", english: "my home", spanish: "mi hogar", icon: "🏡", culture: "Ja = house, but -ochoch = home (possessed). Irregular form.", difficulty: "hero", example: "rochoch = his/her home" }
  ]
};
const NEGATION_CONTENT = {
  core: [
    { kiche: "mani", english: "no", spanish: "no", icon: "🙅", culture: "Used to answer 'no' to questions. Simple and direct.", difficulty: "soldier", example: "Mani = No" },
    { kiche: "je'", english: "yes", spanish: "sí", icon: "👍", culture: "Used to answer 'yes' to questions. Affirm with je'!", difficulty: "soldier", example: "Je' = Yes" },
    { kiche: "na kinwar taj", english: "I don't sleep", spanish: "no duermo", icon: "🌙", culture: "Na...taj wraps around the verb. Na + verb + taj = not.", difficulty: "soldier", example: "war = sleep → na kinwar taj = I don't sleep" },
    { kiche: "na kimb'e taj", english: "I don't go", spanish: "no voy", icon: "🚷", culture: "Negating 'b'e' (to go). The two-part negation surrounds the conjugated verb.", difficulty: "soldier", example: "b'e = go → na kimb'e taj = I don't go" }
  ],
  warrior: [
    { kiche: "na weta'm taj", english: "I don't know", spanish: "no sé", icon: "❓", culture: "Very common phrase. Eta'm = to know.", difficulty: "warrior", example: "weta'm = I know → na weta'm taj = I don't know" },
    { kiche: "na k'o taj", english: "there isn't", spanish: "no hay", icon: "🚫", culture: "Negated existential. K'o = there is.", difficulty: "warrior", example: "K'o = there is → na k'o taj = there isn't" },
    { kiche: "na kinwa' taj", english: "I don't eat", spanish: "no como", icon: "🍽️", culture: "Negating wa' (to eat). Common for dietary restrictions.", difficulty: "warrior", example: "wa' = eat → na kinwa' taj = I don't eat" },
    { kiche: "na kinpetik taj", english: "I don't come", spanish: "no vengo", icon: "↩️", culture: "Negating pet (to come).", difficulty: "warrior", example: "pet = come → na kinpetik taj = I don't come" },
    { kiche: "na kinch'aw taj", english: "I don't speak", spanish: "no hablo", icon: "🤐", culture: "Negating ch'aw (to speak). Na kinch'aw taj K'iche' = I don't speak K'iche'.", difficulty: "warrior", example: "ch'aw = speak → na kinch'aw taj = I don't speak" }
  ],
  hero: [
    { kiche: "majun", english: "nothing/nobody", spanish: "nada/nadie", icon: "⭕", culture: "Stronger than mani. Majun k'o = absolutely nothing.", difficulty: "hero", example: "Majun k'o = There is absolutely nothing" },
    { kiche: "matb'e", english: "don't go!", spanish: "¡no vayas!", icon: "✋", culture: "Mat- is the negative command prefix. Matb'e! = Don't go!", difficulty: "hero", example: "Jab'e! = Go! → Matb'e! = Don't go!" },
    { kiche: "matwa'", english: "don't eat!", spanish: "¡no comas!", icon: "🚯", culture: "Negative command for eating. Used for warnings.", difficulty: "hero", example: "Chatwa'! = Eat! → Matwa'! = Don't eat!" },
    { kiche: "na katb'e taj", english: "you don't go", spanish: "no vas", icon: "🚶‍♂️", culture: "Second person negation. Kat- = you.", difficulty: "hero", example: "katb'e = you go → na katb'e taj = you don't go" },
    { kiche: "na kab'e taj", english: "he/she doesn't go", spanish: "él/ella no va", icon: "🧍", culture: "Third person negation. Ka- = he/she.", difficulty: "hero", example: "kab'e = he/she goes → na kab'e taj = he/she doesn't go" }
  ]
};
const NEGATION_QUESTIONS = {
  yesNo: [
    { question: "Kawatik?", questionEn: "Are you sleeping?", questionEs: "¿Estás durmiendo?", correctAnswer: "mani", correctAnswerAlt: "je'", difficulty: "soldier" },
    { question: "K'o awa?", questionEn: "Is there food?", questionEs: "¿Hay comida?", correctAnswer: "mani", correctAnswerAlt: "je'", difficulty: "soldier" },
    { question: "Katb'e pa tinamit?", questionEn: "Are you going to the town?", questionEs: "¿Vas al pueblo?", correctAnswer: "mani", correctAnswerAlt: "je'", difficulty: "soldier" },
    { question: "Aweta'm K'iche'?", questionEn: "Do you know K'iche'?", questionEs: "¿Sabes K'iche'?", correctAnswer: "je'", correctAnswerAlt: "mani", difficulty: "warrior" },
    { question: "Katwa'ik?", questionEn: "Are you eating?", questionEs: "¿Estás comiendo?", correctAnswer: "mani", correctAnswerAlt: "je'", difficulty: "warrior" },
    { question: "K'o ja'?", questionEn: "Is there water?", questionEs: "¿Hay agua?", correctAnswer: "je'", correctAnswerAlt: "mani", difficulty: "warrior" }
  ],
  sentencePairs: [
    { affirmative: "kimb'e", affirmativeEn: "I go", negative: "na kimb'e taj", negativeEn: "I don't go", verb: "b'e", difficulty: "soldier" },
    { affirmative: "kinwarik", affirmativeEn: "I sleep", negative: "na kinwar taj", negativeEn: "I don't sleep", verb: "war", difficulty: "soldier" },
    { affirmative: "kinwa'ik", affirmativeEn: "I eat", negative: "na kinwa' taj", negativeEn: "I don't eat", verb: "wa'", difficulty: "warrior" },
    { affirmative: "kinpetik", affirmativeEn: "I come", negative: "na kinpetik taj", negativeEn: "I don't come", verb: "pet", difficulty: "warrior" },
    { affirmative: "k'o", affirmativeEn: "there is", negative: "na k'o taj", negativeEn: "there isn't", verb: "k'o", difficulty: "warrior" },
    { affirmative: "weta'm", affirmativeEn: "I know", negative: "na weta'm taj", negativeEn: "I don't know", verb: "eta'm", difficulty: "warrior" },
    { affirmative: "kinch'awik", affirmativeEn: "I speak", negative: "na kinch'aw taj", negativeEn: "I don't speak", verb: "ch'aw", difficulty: "hero" },
    { affirmative: "katb'e", affirmativeEn: "you go", negative: "na katb'e taj", negativeEn: "you don't go", verb: "b'e", difficulty: "hero" }
  ]
};
const VERBS_CONTENT = {
  core: [
    { kiche: "b'e", english: "to go", spanish: "ir", icon: "🚶", culture: "Kimb'e = I go. B'e also means 'road' and 'destiny'.", difficulty: "soldier", conjugation: "kimb'e, katb'e, kab'e" },
    { kiche: "war", english: "to sleep", spanish: "dormir", icon: "😴", culture: "Kinwarik = I sleep. Rest is sacred - dreams carry messages.", difficulty: "soldier", conjugation: "kinwarik, katwarik, kawarik" },
    { kiche: "wa'", english: "to eat", spanish: "comer", icon: "🍽️", culture: "Kinwa'ik = I eat. Shares root with 'wa' (tortilla/food).", difficulty: "soldier", conjugation: "kinwa'ik, katwa'ik, kawa'ik" }
  ],
  warrior: [
    { kiche: "pet", english: "to come", spanish: "venir", icon: "🔙", culture: "Kimpetik = I come. 'Kimpe pa...' = 'I'm from...'", difficulty: "warrior", conjugation: "kimpetik, katpetik, kapetik" },
    { kiche: "b'in", english: "to walk", spanish: "caminar", icon: "🦶", culture: "Kimb'inik = I walk. Walking meditation is part of ceremony.", difficulty: "warrior", conjugation: "kimb'inik, katb'inik, kab'inik" },
    { kiche: "ch'aw", english: "to speak", spanish: "hablar", icon: "🗣️", culture: "Kinch'awik = I speak. Ch'ab'al = language.", difficulty: "warrior", conjugation: "kinch'awik, katch'awik, kach'awik" }
  ],
  hero: [
    { kiche: "wa'lij", english: "to get up", spanish: "levantarse", icon: "🛏️", culture: "Kinwa'lijik = I get up. The morning rising greets the sun.", difficulty: "hero", conjugation: "kinwa'lijik" },
    { kiche: "opan", english: "to arrive (there)", spanish: "llegar (allá)", icon: "📍", culture: "Kinopan = I arrive (at a place I'm not at now).", difficulty: "hero", conjugation: "kinopan, katopan, kopan" },
    { kiche: "ul", english: "to arrive (here)", spanish: "llegar (aquí)", icon: "🏠", culture: "Kinul = I arrive (here, where I am). Different from opan!", difficulty: "hero", conjugation: "kinul, katul, kul" },
    { kiche: "etz'an", english: "to play", spanish: "jugar", icon: "⚽", culture: "The Maya ball game (pitz) was sacred. Winners were honored.", difficulty: "hero", conjugation: "kinetz'anik" }
  ]
};
const COMMANDS_CONTENT = {
  core: [
    { kiche: "Jab'e!", english: "Go!", spanish: "¡Ve!", icon: "👉", culture: "Imperative of b'e (to go). Direct command to one person.", difficulty: "soldier" },
    { kiche: "Chawila!", english: "Look!", spanish: "¡Mira!", icon: "👀", culture: "From 'ila' (to see). Draw attention to something.", difficulty: "soldier" },
    { kiche: "Chab'ana!", english: "Do it!", spanish: "¡Hazlo!", icon: "💪", culture: "B'an = to do/make. Used for action commands.", difficulty: "soldier" },
    { kiche: "Chatija!", english: "Eat!", spanish: "¡Come!", icon: "🍽️", culture: "From tij (to eat). Common at mealtimes.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "Chak'ama'!", english: "Bring it!", spanish: "¡Tráelo!", icon: "🤲", culture: "K'am = to receive/bring. Requesting an object.", difficulty: "warrior" },
    { kiche: "Chatzijoj!", english: "Tell/say it!", spanish: "¡Cuéntalo!", icon: "🗣️", culture: "Tzijoj = to tell/narrate. Request for a story.", difficulty: "warrior" },
    { kiche: "Chach'awa!", english: "Speak!", spanish: "¡Habla!", icon: "💬", culture: "Ch'aw = to speak. Invitation to share.", difficulty: "warrior" },
    { kiche: "Chaweta'maj!", english: "Learn it!", spanish: "¡Aprende!", icon: "📚", culture: "Eta'maj = to learn/know. Encouragement to study.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "Ixpetik!", english: "Come! (plural)", spanish: "¡Vengan!", icon: "👥", culture: "Plural command - calling a group.", difficulty: "hero" },
    { kiche: "Chayuj rij!", english: "Help him/her!", spanish: "¡Ayúdale!", icon: "🤝", culture: "Yuj = to help. Communal assistance is sacred.", difficulty: "hero" },
    { kiche: "Matb'e!", english: "Don't go!", spanish: "¡No vayas!", icon: "🛑", culture: "Negative command with mat-. Warning or prohibition.", difficulty: "hero" },
    { kiche: "Chak'oje' pa k'u'x!", english: "Have heart/courage!", spanish: "¡Ten valor!", icon: "❤️‍🔥", culture: "K'u'x = heart/center. Encouragement before battle.", difficulty: "hero" }
  ]
};
const EXISTENTIAL_CONTENT = {
  core: [
    { kiche: "k'o", english: "there is / to have", spanish: "hay / tener", icon: "✨", culture: "K'o ja = there is a house. K'o wachin = I have a face (I exist).", difficulty: "soldier" },
    { kiche: "k'o la", english: "there is (respectful)", spanish: "hay (respetuoso)", icon: "🎩", culture: "Adding 'la' shows respect to the listener.", difficulty: "soldier" },
    { kiche: "majun k'o", english: "there is nothing", spanish: "no hay nada", icon: "🕳️", culture: "Majun intensifies negation. Complete absence.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "k'o nu-", english: "I have...", spanish: "tengo...", icon: "🙋", culture: "K'o nuchaak = I have work. Possession through existence.", difficulty: "warrior" },
    { kiche: "k'o a-", english: "you have...", spanish: "tienes...", icon: "👆", culture: "K'o awinaq = you have people (family).", difficulty: "warrior" },
    { kiche: "k'o r-", english: "he/she has...", spanish: "él/ella tiene...", icon: "👤", culture: "K'o ruchak = he/she has work.", difficulty: "warrior" },
    { kiche: "man k'o taj", english: "there is not", spanish: "no hay", icon: "❌", culture: "Standard negation of existence.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "k'o qa-", english: "we have...", spanish: "tenemos...", icon: "👥", culture: "K'o qatijob'al = we have our school.", difficulty: "hero" },
    { kiche: "k'o ki-", english: "they have...", spanish: "ellos tienen...", icon: "👪", culture: "K'o kija = they have their house.", difficulty: "hero" },
    { kiche: "k'o nuk'u'x", english: "I feel / my heart says", spanish: "siento / mi corazón dice", icon: "💓", culture: "Emotions come from the heart. K'o nuk'u'x chi... = I feel that...", difficulty: "hero" }
  ]
};
const QUESTIONS_CONTENT = {
  core: [
    { kiche: "jas?", english: "what?", spanish: "¿qué?", icon: "❓", culture: "Jas ri? = What is that? Most common question word.", difficulty: "soldier" },
    { kiche: "jachin?", english: "who?", spanish: "¿quién?", icon: "👤", culture: "Jachin rat? = Who are you? Asking identity.", difficulty: "soldier" },
    { kiche: "jawije'?", english: "where?", spanish: "¿dónde?", icon: "📍", culture: "Jawije' k'o ri ja? = Where is the house?", difficulty: "soldier" },
    { kiche: "jampa?", english: "when?", spanish: "¿cuándo?", icon: "📅", culture: "Jampa katb'e? = When do you go?", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "jas ruma?", english: "why?", spanish: "¿por qué?", icon: "🤔", culture: "Literally 'what because'. Jas ruma katb'e? = Why do you go?", difficulty: "warrior" },
    { kiche: "jas ub'anik?", english: "how?", spanish: "¿cómo?", icon: "🔧", culture: "Literally 'what its doing'. Jas ub'anik? = How is it done?", difficulty: "warrior" },
    { kiche: "jarupe'?", english: "how many?", spanish: "¿cuántos?", icon: "🔢", culture: "Jarupe' winaq? = How many people?", difficulty: "warrior" },
    { kiche: "la...?", english: "is it...? (yes/no)", spanish: "¿es...?", icon: "⚖️", culture: "La utz? = Is it good? Yes/no question marker.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "achike?", english: "which one?", spanish: "¿cuál?", icon: "👈", culture: "Achike ja? = Which house? Selection questions.", difficulty: "hero" },
    { kiche: "jas uwach?", english: "what kind?", spanish: "¿qué tipo?", icon: "🏷️", culture: "Literally 'what its face'. Asking about nature/type.", difficulty: "hero" },
    { kiche: "la k'o...?", english: "is there...?", spanish: "¿hay...?", icon: "🔍", culture: "La k'o ja'? = Is there water? Existence question.", difficulty: "hero" },
    { kiche: "pa jas?", english: "in what? / about what?", spanish: "¿en qué?", icon: "📦", culture: "Pa jas kach'awik? = What are you talking about?", difficulty: "hero" }
  ]
};
const ADJECTIVES_CONTENT = {
  core: [
    { kiche: "nim", english: "big/large", spanish: "grande", icon: "🐘", culture: "Nim ja = big house. 'Nim' also means important or great.", difficulty: "soldier" },
    { kiche: "ch'uti'n", english: "small/little", spanish: "pequeño", icon: "🐜", culture: "Ch'uti'n tz'i' = little dog. Endearing diminutive.", difficulty: "soldier" },
    { kiche: "utz", english: "good", spanish: "bueno", icon: "👍", culture: "Utz is fundamental - used in greetings: 'La utz awach?'", difficulty: "soldier" },
    { kiche: "itzel", english: "bad/evil", spanish: "malo", icon: "👎", culture: "Itzel winaq = bad person. Used for moral and quality judgments.", difficulty: "soldier" },
    { kiche: "saq", english: "white/light", spanish: "blanco/claro", icon: "⬜", culture: "Saq also means dawn, clarity, truth. Saqarik = it becomes light.", difficulty: "soldier" },
    { kiche: "q'eq", english: "black/dark", spanish: "negro/oscuro", icon: "⬛", culture: "Q'eq aq'ab' = dark night. Q'eq symbolizes mystery and depth.", difficulty: "soldier" }
  ],
  warrior: [
    { kiche: "kaq", english: "red", spanish: "rojo", icon: "🔴", culture: "Kaq is the color of blood, life force, and the east where sun rises.", difficulty: "warrior" },
    { kiche: "q'an", english: "yellow/ripe", spanish: "amarillo/maduro", icon: "🟡", culture: "Q'an ixim = ripe corn. Yellow represents maturity and south.", difficulty: "warrior" },
    { kiche: "rax", english: "green/blue", spanish: "verde/azul", icon: "🟢", culture: "Rax covers green and blue - the colors of sky and growing things.", difficulty: "warrior" },
    { kiche: "nimalaj", english: "very big/great", spanish: "muy grande", icon: "🏔️", culture: "Intensifier form: nimalaj winaq = great person/leader.", difficulty: "warrior" },
    { kiche: "ko'oj", english: "hard/difficult", spanish: "duro/difícil", icon: "🪨", culture: "Ko'oj ab'aj = hard stone. Also used for challenging tasks.", difficulty: "warrior" },
    { kiche: "yab'", english: "sick/ill", spanish: "enfermo", icon: "🤒", culture: "Kin yab'ik = I am sick. Health and balance are central to Maya life.", difficulty: "warrior" },
    { kiche: "tyox", english: "holy/sacred", spanish: "sagrado", icon: "✨", culture: "From Spanish 'Dios'. Tyoxil = holiness, sacredness.", difficulty: "warrior" }
  ],
  hero: [
    { kiche: "jotol", english: "tall/high", spanish: "alto", icon: "📏", culture: "Jotol che' = tall tree. Height represents reaching toward the divine.", difficulty: "hero" },
    { kiche: "tzuy", english: "seated/short", spanish: "sentado/bajo", icon: "🪑", culture: "Describes something low or in a seated position.", difficulty: "hero" },
    { kiche: "q'ayis", english: "bitter", spanish: "amargo", icon: "🍋", culture: "Q'ayis kakaw = bitter cacao. Traditional chocolate was unsweetened.", difficulty: "hero" },
    { kiche: "ki'", english: "sweet/delicious", spanish: "dulce/rico", icon: "🍯", culture: "Ki' ri wa = the food is delicious. Ki' also means pleasant.", difficulty: "hero" },
    { kiche: "chom", english: "fat/thick", spanish: "gordo/grueso", icon: "🐷", culture: "Chom describes abundance and prosperity.", difficulty: "hero" },
    { kiche: "qas", english: "thin/skinny", spanish: "delgado/flaco", icon: "🦴", culture: "Qas winaq = thin person. Opposite of chom.", difficulty: "hero" },
    { kiche: "k'ak'a", english: "new", spanish: "nuevo", icon: "🆕", culture: "K'ak'a jab' = new year. K'ak'a taq tzij = new words (vocabulary).", difficulty: "hero" },
    { kiche: "ojer", english: "old/ancient", spanish: "viejo/antiguo", icon: "🏛️", culture: "Ojer taq tzij = ancient words. Ojer Maya = ancient Maya.", difficulty: "hero" }
  ]
};
let currentDifficulty = DIFFICULTY.WARRIOR;
function setDifficulty(level) {
  if (Object.values(DIFFICULTY).includes(level)) {
    currentDifficulty = level;
    localStorage.setItem("tecunuman_difficulty", level);
  }
}
function getDifficulty() {
  const saved = localStorage.getItem("tecunuman_difficulty");
  if (saved && Object.values(DIFFICULTY).includes(saved)) {
    currentDifficulty = saved;
  }
  return currentDifficulty;
}
function t(key) {
  return typeof window.t === "function" ? window.t(key) : key;
}
function getLanguage() {
  return typeof window.getCurrentLanguage === "function" ? window.getCurrentLanguage() : "en";
}
function getContentForDifficulty(contentObj) {
  const difficulty = getDifficulty();
  let items = [...contentObj.core];
  if (difficulty === DIFFICULTY.WARRIOR || difficulty === DIFFICULTY.HERO) {
    items = items.concat(contentObj.warrior || []);
  }
  if (difficulty === DIFFICULTY.HERO) {
    items = items.concat(contentObj.hero || []);
  }
  return items;
}
function generateLessonQuestions(lessonId, count = 5, learnedWords = []) {
  let contentSource;
  switch (lessonId) {
    case "vocabulary":
      contentSource = CULTURAL_VOCABULARY;
      break;
    case "vocabulary_animals":
      contentSource = VOCABULARY_ANIMALS;
      break;
    case "vocabulary_warfare":
      contentSource = VOCABULARY_WARFARE;
      break;
    case "vocabulary_places":
      contentSource = VOCABULARY_PLACES;
      break;
    case "vocabulary_spiritual":
      contentSource = VOCABULARY_SPIRITUAL;
      break;
    case "vocabulary_advanced":
      contentSource = VOCABULARY_ADVANCED;
      break;
    case "greetings":
      contentSource = GREETINGS_CONTENT;
      break;
    case "numbers":
      contentSource = NUMBERS_CONTENT;
      break;
    case "pronouns":
      contentSource = PRONOUNS_CONTENT;
      break;
    case "possession":
      contentSource = POSSESSION_CONTENT;
      break;
    case "negation":
      contentSource = NEGATION_CONTENT;
      break;
    case "intransitive_verbs":
      contentSource = VERBS_CONTENT;
      break;
    case "adjectives":
      contentSource = ADJECTIVES_CONTENT;
      break;
    case "commands":
      contentSource = COMMANDS_CONTENT;
      break;
    case "existential":
      contentSource = EXISTENTIAL_CONTENT;
      break;
    case "questions":
      contentSource = QUESTIONS_CONTENT;
      break;
    default:
      contentSource = CULTURAL_VOCABULARY;
  }
  const items = getContentForDifficulty(contentSource);
  const questions = [];
  const difficulty = getDifficulty();
  if (lessonId === "greetings") {
    const phraseQuestions = generateConversationQuestions(count, difficulty);
    const numConversation = Math.min(Math.ceil(count / 2), phraseQuestions.length);
    questions.push(...phraseQuestions.slice(0, numConversation));
  }
  if (lessonId === "negation") {
    const negationQuestions = generateNegationQuestions(count, difficulty);
    const numNegation = Math.min(Math.ceil(count * 0.6), negationQuestions.length);
    questions.push(...negationQuestions.slice(0, numNegation));
  }
  const recallItems = items.filter(
    (item) => learnedWords.some((lw) => lw.kiche === item.kiche)
  );
  if (recallItems.length > 0 && difficulty !== DIFFICULTY.SOLDIER) {
    const numRecall = Math.min(Math.ceil(count / 4), recallItems.length);
    const recallSelected = recallItems.sort(() => Math.random() - 0.5).slice(0, numRecall);
    recallSelected.forEach((item) => {
      questions.push(createRecallQuestion(item, items, lessonId));
    });
  }
  const remainingCount = count - questions.length;
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, remainingCount);
  selected.forEach((item, index) => {
    const hasIcon = item.icon && item.icon.length > 0;
    let questionTypes;
    if (difficulty === DIFFICULTY.SOLDIER) {
      questionTypes = hasIcon ? [QUESTION_TYPE.ICON_TEXT_SELECT, QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.MULTIPLE_CHOICE] : [QUESTION_TYPE.MULTIPLE_CHOICE];
    } else if (difficulty === DIFFICULTY.WARRIOR) {
      questionTypes = hasIcon ? [QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.ICON_TEXT_SELECT, QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.TRANSLATE_TO_KICHE] : [QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.TRANSLATE_TO_KICHE];
    } else {
      questionTypes = hasIcon ? [QUESTION_TYPE.ICON_SELECT, QUESTION_TYPE.TRANSLATE_TO_KICHE, QUESTION_TYPE.RECALL_TYPE, QUESTION_TYPE.MULTIPLE_CHOICE] : [QUESTION_TYPE.TRANSLATE_TO_KICHE, QUESTION_TYPE.TRANSLATE_FROM_KICHE, QUESTION_TYPE.MULTIPLE_CHOICE];
    }
    const type = questionTypes[index % questionTypes.length];
    questions.push(createCulturalQuestion(item, type, items, lessonId));
  });
  return questions.sort(() => Math.random() - 0.5);
}
function generateConversationQuestions(count, difficulty) {
  const questions = [];
  const phraseSelect = CONVERSATION_EXCHANGES.phraseSelect.filter((p) => {
    if (difficulty === DIFFICULTY.SOLDIER) return p.difficulty === "soldier";
    if (difficulty === DIFFICULTY.WARRIOR) return p.difficulty === "soldier" || p.difficulty === "warrior";
    return true;
  });
  const kicheResponses = CONVERSATION_EXCHANGES.kicheResponses.filter((p) => {
    if (difficulty === DIFFICULTY.SOLDIER) return false;
    if (difficulty === DIFFICULTY.WARRIOR) return p.difficulty === "warrior";
    return true;
  });
  const selectedPhrases = phraseSelect.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 2));
  selectedPhrases.forEach((phrase) => {
    questions.push({
      type: QUESTION_TYPE.PHRASE_SELECT,
      instruction: t("howWouldYou"),
      prompt: phrase.icon + " " + phrase.situation,
      promptEs: phrase.icon + " " + phrase.situationEs,
      correctAnswer: phrase.correctPhrase,
      choices: [phrase.correctPhrase, ...phrase.wrongPhrases].sort(() => Math.random() - 0.5),
      culture: phrase.culture,
      lessonId: "greetings",
      word: { kiche: phrase.correctPhrase, english: phrase.situation, culture: phrase.culture }
    });
  });
  if (kicheResponses.length > 0) {
    const selectedResponses = kicheResponses.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
    selectedResponses.forEach((conv) => {
      questions.push({
        type: QUESTION_TYPE.CONVERSATION_RESPOND,
        instruction: t("respondInKiche"),
        prompt: conv.prompt,
        promptTranslation: conv.promptTranslation,
        icon: conv.icon,
        correctAnswer: conv.correctResponse,
        choices: [conv.correctResponse, ...conv.wrongResponses].sort(() => Math.random() - 0.5),
        responseTranslation: conv.responseTranslation,
        culture: conv.culture,
        lessonId: "greetings",
        word: { kiche: conv.correctResponse, english: conv.responseTranslation, culture: conv.culture }
      });
    });
  }
  return questions;
}
function generateNegationQuestions(count, difficulty) {
  const questions = [];
  const lang = getLanguage();
  const yesNoQuestions = NEGATION_QUESTIONS.yesNo.filter((q) => {
    if (difficulty === DIFFICULTY.SOLDIER) return q.difficulty === "soldier";
    if (difficulty === DIFFICULTY.WARRIOR) return q.difficulty === "soldier" || q.difficulty === "warrior";
    return true;
  });
  const sentencePairs = NEGATION_QUESTIONS.sentencePairs.filter((q) => {
    if (difficulty === DIFFICULTY.SOLDIER) return q.difficulty === "soldier";
    if (difficulty === DIFFICULTY.WARRIOR) return q.difficulty === "soldier" || q.difficulty === "warrior";
    return true;
  });
  const selectedYesNo = yesNoQuestions.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
  selectedYesNo.forEach((q) => {
    const askForNo = Math.random() > 0.5;
    questions.push({
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      instruction: lang === "es" ? askForNo ? '¿Cómo dices "no" a esta pregunta?' : '¿Cómo dices "sí" a esta pregunta?' : askForNo ? 'How do you say "no" to this question?' : 'How do you say "yes" to this question?',
      prompt: q.question,
      promptHint: lang === "es" ? q.questionEs : q.questionEn,
      correctAnswer: askForNo ? "mani" : "je'",
      choices: ["mani", "je'", "na...taj", "majun"].sort(() => Math.random() - 0.5),
      culture: askForNo ? 'Mani is used to answer "no" to yes/no questions.' : `Je' is used to answer "yes" to yes/no questions.`,
      lessonId: "negation",
      word: { kiche: askForNo ? "mani" : "je'", english: askForNo ? "no" : "yes" }
    });
  });
  const selectedPairs = sentencePairs.sort(() => Math.random() - 0.5).slice(0, Math.ceil(count / 3));
  selectedPairs.forEach((pair) => {
    const toNegative = Math.random() > 0.3;
    if (toNegative) {
      questions.push({
        type: QUESTION_TYPE.MULTIPLE_CHOICE,
        instruction: lang === "es" ? `¿Cómo niegas "${pair.affirmativeEn}"?` : `How do you negate "${pair.affirmativeEn}"?`,
        prompt: `${pair.affirmative} → ???`,
        promptHint: `${pair.affirmativeEn} → ${pair.negativeEn}`,
        correctAnswer: pair.negative,
        choices: generateNegationChoices(pair.negative, sentencePairs),
        culture: `Na...taj wraps around the verb: ${pair.affirmative} → ${pair.negative}`,
        lessonId: "negation",
        word: { kiche: pair.negative, english: pair.negativeEn }
      });
    } else {
      questions.push({
        type: QUESTION_TYPE.MULTIPLE_CHOICE,
        instruction: lang === "es" ? "¿Qué significa esta oración?" : "What does this sentence mean?",
        prompt: pair.negative,
        correctAnswer: pair.negativeEn,
        choices: [
          pair.negativeEn,
          pair.affirmativeEn,
          sentencePairs[(sentencePairs.indexOf(pair) + 1) % sentencePairs.length].negativeEn,
          sentencePairs[(sentencePairs.indexOf(pair) + 2) % sentencePairs.length].affirmativeEn
        ].sort(() => Math.random() - 0.5),
        culture: `${pair.negative} = ${pair.negativeEn}`,
        lessonId: "negation",
        word: { kiche: pair.negative, english: pair.negativeEn }
      });
    }
  });
  if (difficulty !== DIFFICULTY.SOLDIER) {
    const negativeCommands = [
      { positive: "Jab'e!", positiveEn: "Go!", negative: "Matb'e!", negativeEn: "Don't go!" },
      { positive: "Chatwa'!", positiveEn: "Eat!", negative: "Matwa'!", negativeEn: "Don't eat!" },
      { positive: "Chach'awa!", positiveEn: "Speak!", negative: "Match'awa!", negativeEn: "Don't speak!" }
    ];
    const selectedCommands = negativeCommands.sort(() => Math.random() - 0.5).slice(0, 1);
    selectedCommands.forEach((cmd) => {
      questions.push({
        type: QUESTION_TYPE.MULTIPLE_CHOICE,
        instruction: lang === "es" ? `Si "${cmd.positiveEn}" es "${cmd.positive}", ¿cómo dices "${cmd.negativeEn}"?` : `If "${cmd.positiveEn}" is "${cmd.positive}", how do you say "${cmd.negativeEn}"?`,
        prompt: `${cmd.positive} → ???`,
        correctAnswer: cmd.negative,
        choices: [
          cmd.negative,
          cmd.positive,
          negativeCommands[(negativeCommands.indexOf(cmd) + 1) % negativeCommands.length].negative,
          "Mani " + cmd.positive.toLowerCase()
        ].sort(() => Math.random() - 0.5),
        culture: `Positive commands use Ja-/Cha-, negative commands use Mat-. ${cmd.positive} → ${cmd.negative}`,
        lessonId: "negation",
        word: { kiche: cmd.negative, english: cmd.negativeEn }
      });
    });
  }
  return questions;
}
function generateNegationChoices(correct, sentencePairs) {
  const choices = [correct];
  const others = sentencePairs.filter((p) => p.negative !== correct).map((p) => p.negative).sort(() => Math.random() - 0.5).slice(0, 2);
  choices.push(...others);
  const affirmative = sentencePairs.find((p) => p.negative === correct);
  if (affirmative) {
    choices.push(affirmative.affirmative);
  } else {
    choices.push("mani");
  }
  return choices.sort(() => Math.random() - 0.5);
}
function createRecallQuestion(item, allItems, lessonId) {
  return {
    type: QUESTION_TYPE.RECALL_TYPE,
    instruction: t("typeWordYouLearned"),
    prompt: item.icon || `[${item.english}]`,
    promptHint: item.english,
    correctAnswer: item.kiche,
    acceptableAnswers: [item.kiche.toLowerCase()],
    culture: item.culture,
    lessonId,
    word: item,
    isTypingQuestion: true
  };
}
function createCulturalQuestion(item, type, allItems, lessonId) {
  var _a;
  const question = {
    word: item,
    type,
    lessonId,
    culture: item.culture,
    correctAnswer: "",
    prompt: "",
    instruction: ""
  };
  switch (type) {
    case QUESTION_TYPE.ICON_SELECT:
      question.instruction = t("selectIconFor");
      question.prompt = item.kiche;
      question.correctAnswer = item.icon || "";
      const otherIcons = allItems.filter((i) => i.icon !== item.icon && i.icon).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.icon);
      question.choices = [item.icon, ...otherIcons].sort(() => Math.random() - 0.5);
      question.isIconQuestion = true;
      break;
    case QUESTION_TYPE.ICON_TEXT_SELECT:
      question.instruction = t("selectMeaningOf");
      question.prompt = item.kiche;
      question.correctAnswer = `${item.icon} ${item.english}`;
      const otherIconText = allItems.filter((i) => i.kiche !== item.kiche && i.icon).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => `${i.icon} ${i.english}`);
      question.choices = [question.correctAnswer, ...otherIconText].sort(() => Math.random() - 0.5);
      question.isIconTextQuestion = true;
      break;
    case QUESTION_TYPE.MULTIPLE_CHOICE:
      const toKiche = Math.random() > 0.5;
      if (toKiche) {
        question.instruction = t("selectKicheFor");
        question.prompt = item.icon ? `${item.icon} ${item.english}` : item.english;
        question.correctAnswer = item.kiche;
        const wrongKiche = allItems.filter((i) => i.kiche !== item.kiche).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.kiche);
        question.choices = [item.kiche, ...wrongKiche].sort(() => Math.random() - 0.5);
      } else {
        question.instruction = t("whatDoesMean");
        question.prompt = item.kiche;
        question.correctAnswer = item.icon ? `${item.icon} ${item.english}` : item.english;
        const wrongEnglish = allItems.filter((i) => i.english !== item.english).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.icon ? `${i.icon} ${i.english}` : i.english);
        question.choices = [question.correctAnswer, ...wrongEnglish].sort(() => Math.random() - 0.5);
      }
      break;
    case QUESTION_TYPE.TRANSLATE_TO_KICHE:
      question.instruction = t("translateToKiche");
      question.prompt = item.icon ? `${item.icon} ${item.english}` : item.english;
      question.correctAnswer = item.kiche;
      question.acceptableAnswers = [item.kiche.toLowerCase()];
      question.isTypingQuestion = true;
      break;
    case QUESTION_TYPE.TRANSLATE_FROM_KICHE:
      question.instruction = t("translateToEnglish");
      question.prompt = item.kiche;
      question.correctAnswer = item.english;
      question.acceptableAnswers = [item.english.toLowerCase(), (_a = item.spanish) == null ? void 0 : _a.toLowerCase()].filter(Boolean);
      question.isTypingQuestion = true;
      break;
    case QUESTION_TYPE.RECALL_TYPE:
      question.instruction = t("typeWordYouLearned");
      question.prompt = item.icon || `[${item.english}]`;
      question.promptHint = item.english;
      question.correctAnswer = item.kiche;
      question.acceptableAnswers = [item.kiche.toLowerCase()];
      question.isTypingQuestion = true;
      question.isRecallQuestion = true;
      break;
  }
  return question;
}
function checkLessonAnswer(userAnswer, question) {
  const normalizedUser = userAnswer.toLowerCase().trim();
  const normalizedCorrect = question.correctAnswer.toLowerCase().trim();
  if (normalizedUser === normalizedCorrect) return true;
  if (question.acceptableAnswers) {
    for (const acceptable of question.acceptableAnswers) {
      if (normalizedUser === acceptable.toLowerCase().trim()) {
        return true;
      }
    }
  }
  const simplify = (str) => str.replace(/'/g, "'").replace(/'/g, "'").replace(/'/g, "").replace(/'/g, "");
  if (simplify(normalizedUser) === simplify(normalizedCorrect)) {
    return true;
  }
  return false;
}
const LESSONS = {
  vocabulary: {
    id: "vocabulary",
    name: "K'ak'a taq tzij",
    englishName: "Basic Vocabulary",
    spanishName: "Vocabulario Básico",
    description: "Learn essential words: elements, nature, and sacred concepts",
    icon: "📚"
  },
  vocabulary_animals: {
    id: "vocabulary_animals",
    name: "Taq awaj",
    englishName: "Animals & Nature",
    spanishName: "Animales y Naturaleza",
    description: "Learn the animals of Lake Atitlán and the highlands",
    icon: "🦜"
  },
  vocabulary_warfare: {
    id: "vocabulary_warfare",
    name: "Ch'akoj tzij",
    englishName: "War & Resistance",
    spanishName: "Guerra y Resistencia",
    description: "Learn the vocabulary of battle and defense",
    icon: "⚔️"
  },
  vocabulary_places: {
    id: "vocabulary_places",
    name: "K'olib'al",
    englishName: "Places & Geography",
    spanishName: "Lugares y Geografía",
    description: "Learn words for mountains, rivers, and sacred places",
    icon: "🏔️"
  },
  vocabulary_spiritual: {
    id: "vocabulary_spiritual",
    name: "Loq'olaj tzij",
    englishName: "Sacred & Spiritual",
    spanishName: "Sagrado y Espiritual",
    description: "Learn spiritual concepts and sacred vocabulary",
    icon: "✨"
  },
  vocabulary_advanced: {
    id: "vocabulary_advanced",
    name: "Nim taq tzij",
    englishName: "Advanced Concepts",
    spanishName: "Conceptos Avanzados",
    description: "Master complex words about history, philosophy, and culture",
    icon: "🏛️"
  },
  greetings: {
    id: "greetings",
    name: "Rutzil wachaj",
    englishName: "Greetings",
    spanishName: "Saludos",
    description: "Traditional K'iche' greetings and courtesy",
    icon: "👋"
  },
  pronouns: {
    id: "pronouns",
    name: "Taq b'i'aj",
    englishName: "Pronouns",
    spanishName: "Pronombres",
    description: "Personal pronouns - I, you, we, they",
    icon: "👤"
  },
  possession: {
    id: "possession",
    name: "Possessive Markers",
    englishName: "Possession",
    spanishName: "Posesión",
    description: "How to say my, your, our in K'iche'",
    icon: "🏠"
  },
  negation: {
    id: "negation",
    name: "Na...taj",
    englishName: "Negation",
    spanishName: "Negación",
    description: 'Learn to say "no" and negate verbs',
    icon: "🚫"
  },
  intransitive_verbs: {
    id: "intransitive_verbs",
    name: "Kemchi'",
    englishName: "Verbs",
    spanishName: "Verbos",
    description: "Action words - go, eat, sleep, speak",
    icon: "🚶"
  },
  numbers: {
    id: "numbers",
    name: "Rajilab'al",
    englishName: "Numbers",
    spanishName: "Números",
    description: "Count in the Maya vigesimal system",
    icon: "🔢"
  },
  existential: {
    id: "existential",
    name: "K'o",
    englishName: "Existence",
    spanishName: "Existencia",
    description: 'Express "there is" and "to have"',
    icon: "✨"
  },
  questions: {
    id: "questions",
    name: "K'otoj chi'aj",
    englishName: "Questions",
    spanishName: "Preguntas",
    description: "Ask yes/no and information questions",
    icon: "❓"
  },
  commands: {
    id: "commands",
    name: "Pixab'",
    englishName: "Commands",
    spanishName: "Mandatos",
    description: "Give orders and requests",
    icon: "👆"
  },
  adjectives: {
    id: "adjectives",
    name: "B'anowinaq",
    englishName: "Adjectives",
    spanishName: "Adjetivos",
    description: "Describe things - big, small, good, bad",
    icon: "🎨"
  }
};
window.LESSON_TYPES = LESSON_TYPES;
window.LESSONS = LESSONS;
window.DIFFICULTY = DIFFICULTY;
window.QUESTION_TYPE = QUESTION_TYPE;
window.setDifficulty = setDifficulty;
window.getDifficulty = getDifficulty;
window.generateLessonQuestions = generateLessonQuestions;
window.checkLessonAnswer = checkLessonAnswer;
window.CULTURAL_VOCABULARY = CULTURAL_VOCABULARY;
window.VOCABULARY_ANIMALS = VOCABULARY_ANIMALS;
window.VOCABULARY_WARFARE = VOCABULARY_WARFARE;
window.VOCABULARY_PLACES = VOCABULARY_PLACES;
window.VOCABULARY_SPIRITUAL = VOCABULARY_SPIRITUAL;
window.VOCABULARY_ADVANCED = VOCABULARY_ADVANCED;
window.NEGATION_CONTENT = NEGATION_CONTENT;
window.NEGATION_QUESTIONS = NEGATION_QUESTIONS;
window.GREETINGS_CONTENT = GREETINGS_CONTENT;
window.NUMBERS_CONTENT = NUMBERS_CONTENT;
window.PRONOUNS_CONTENT = PRONOUNS_CONTENT;
window.POSSESSION_CONTENT = POSSESSION_CONTENT;
window.VERBS_CONTENT = VERBS_CONTENT;
window.COMMANDS_CONTENT = COMMANDS_CONTENT;
window.EXISTENTIAL_CONTENT = EXISTENTIAL_CONTENT;
window.QUESTIONS_CONTENT = QUESTIONS_CONTENT;
window.ADJECTIVES_CONTENT = ADJECTIVES_CONTENT;
window.CONVERSATION_EXCHANGES = CONVERSATION_EXCHANGES;
const loadGameScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/game.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load game.js"));
    document.head.appendChild(script);
  });
};
loadGameScript().catch((error) => {
  console.error("Failed to load game:", error);
});
