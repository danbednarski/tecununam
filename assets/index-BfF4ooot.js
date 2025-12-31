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
function t$2(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS["en"][key] || key;
}
function getLanguage$1() {
  return currentLanguage;
}
function initI18n$1() {
  var _a, _b;
  const detectedLang = detectLanguage();
  setLanguage(detectedLang);
  (_a = document.getElementById("lang-en")) == null ? void 0 : _a.addEventListener("click", () => setLanguage("en"));
  (_b = document.getElementById("lang-es")) == null ? void 0 : _b.addEventListener("click", () => setLanguage("es"));
}
window.t = t$2;
window.setLanguage = setLanguage;
window.currentLanguage = () => currentLanguage;
window.getCurrentLanguage = getLanguage$1;
window.getLanguage = getLanguage$1;
window.initI18n = initI18n$1;
const DIFFICULTY = {
  SOLDIER: "soldier",
  WARRIOR: "warrior",
  HERO: "hero"
};
const QUESTION_TYPE = {
  MULTIPLE_CHOICE: "multiple_choice",
  ICON_SELECT: "icon_select",
  ICON_TEXT_SELECT: "icon_text_select",
  TRANSLATE_TO_KICHE: "translate_to_kiche",
  TRANSLATE_FROM_KICHE: "translate_from_kiche",
  RECALL_TYPE: "recall_type",
  PHRASE_SELECT: "phrase_select",
  CONVERSATION_RESPOND: "conversation_respond"
};
const CULTURAL_VOCABULARY$1 = {
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
const VOCABULARY_ANIMALS$1 = {
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
const VOCABULARY_WARFARE$1 = {
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
const VOCABULARY_PLACES$1 = {
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
const VOCABULARY_SPIRITUAL$1 = {
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
const VOCABULARY_ADVANCED$1 = {
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
const GREETINGS_CONTENT$1 = {
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
const NUMBERS_CONTENT$1 = {
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
const PRONOUNS_CONTENT$1 = {
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
const POSSESSION_CONTENT$1 = {
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
const NEGATION_CONTENT$1 = {
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
const VERBS_CONTENT$1 = {
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
const COMMANDS_CONTENT$1 = {
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
const EXISTENTIAL_CONTENT$1 = {
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
const QUESTIONS_CONTENT$1 = {
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
const ADJECTIVES_CONTENT$1 = {
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
function setDifficulty$1(level) {
  if (Object.values(DIFFICULTY).includes(level)) {
    currentDifficulty = level;
    localStorage.setItem("tecunuman_difficulty", level);
  }
}
function getDifficulty$1() {
  const saved = localStorage.getItem("tecunuman_difficulty");
  if (saved && Object.values(DIFFICULTY).includes(saved)) {
    currentDifficulty = saved;
  }
  return currentDifficulty;
}
function t$1(key) {
  return typeof window.t === "function" ? window.t(key) : key;
}
function getLanguage() {
  return typeof window.getCurrentLanguage === "function" ? window.getCurrentLanguage() : "en";
}
function getContentForDifficulty(contentObj) {
  const difficulty = getDifficulty$1();
  let items = [...contentObj.core];
  if (difficulty === DIFFICULTY.WARRIOR || difficulty === DIFFICULTY.HERO) {
    items = items.concat(contentObj.warrior || []);
  }
  if (difficulty === DIFFICULTY.HERO) {
    items = items.concat(contentObj.hero || []);
  }
  return items;
}
function generateLessonQuestions$1(lessonId, count = 5, learnedWords = []) {
  let contentSource;
  switch (lessonId) {
    case "vocabulary":
      contentSource = CULTURAL_VOCABULARY$1;
      break;
    case "vocabulary_animals":
      contentSource = VOCABULARY_ANIMALS$1;
      break;
    case "vocabulary_warfare":
      contentSource = VOCABULARY_WARFARE$1;
      break;
    case "vocabulary_places":
      contentSource = VOCABULARY_PLACES$1;
      break;
    case "vocabulary_spiritual":
      contentSource = VOCABULARY_SPIRITUAL$1;
      break;
    case "vocabulary_advanced":
      contentSource = VOCABULARY_ADVANCED$1;
      break;
    case "greetings":
      contentSource = GREETINGS_CONTENT$1;
      break;
    case "numbers":
      contentSource = NUMBERS_CONTENT$1;
      break;
    case "pronouns":
      contentSource = PRONOUNS_CONTENT$1;
      break;
    case "possession":
      contentSource = POSSESSION_CONTENT$1;
      break;
    case "negation":
      contentSource = NEGATION_CONTENT$1;
      break;
    case "intransitive_verbs":
      contentSource = VERBS_CONTENT$1;
      break;
    case "adjectives":
      contentSource = ADJECTIVES_CONTENT$1;
      break;
    case "commands":
      contentSource = COMMANDS_CONTENT$1;
      break;
    case "existential":
      contentSource = EXISTENTIAL_CONTENT$1;
      break;
    case "questions":
      contentSource = QUESTIONS_CONTENT$1;
      break;
    default:
      contentSource = CULTURAL_VOCABULARY$1;
  }
  const items = getContentForDifficulty(contentSource);
  const questions = [];
  const difficulty = getDifficulty$1();
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
      instruction: t$1("howWouldYou"),
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
        instruction: t$1("respondInKiche"),
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
    instruction: t$1("typeWordYouLearned"),
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
      question.instruction = t$1("selectIconFor");
      question.prompt = item.kiche;
      question.correctAnswer = item.icon || "";
      const otherIcons = allItems.filter((i) => i.icon !== item.icon && i.icon).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.icon);
      question.choices = [item.icon, ...otherIcons].sort(() => Math.random() - 0.5);
      question.isIconQuestion = true;
      break;
    case QUESTION_TYPE.ICON_TEXT_SELECT:
      question.instruction = t$1("selectMeaningOf");
      question.prompt = item.kiche;
      question.correctAnswer = `${item.icon} ${item.english}`;
      const otherIconText = allItems.filter((i) => i.kiche !== item.kiche && i.icon).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => `${i.icon} ${i.english}`);
      question.choices = [question.correctAnswer, ...otherIconText].sort(() => Math.random() - 0.5);
      question.isIconTextQuestion = true;
      break;
    case QUESTION_TYPE.MULTIPLE_CHOICE:
      const toKiche = Math.random() > 0.5;
      if (toKiche) {
        question.instruction = t$1("selectKicheFor");
        question.prompt = item.icon ? `${item.icon} ${item.english}` : item.english;
        question.correctAnswer = item.kiche;
        const wrongKiche = allItems.filter((i) => i.kiche !== item.kiche).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.kiche);
        question.choices = [item.kiche, ...wrongKiche].sort(() => Math.random() - 0.5);
      } else {
        question.instruction = t$1("whatDoesMean");
        question.prompt = item.kiche;
        question.correctAnswer = item.icon ? `${item.icon} ${item.english}` : item.english;
        const wrongEnglish = allItems.filter((i) => i.english !== item.english).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.icon ? `${i.icon} ${i.english}` : i.english);
        question.choices = [question.correctAnswer, ...wrongEnglish].sort(() => Math.random() - 0.5);
      }
      break;
    case QUESTION_TYPE.TRANSLATE_TO_KICHE:
      question.instruction = t$1("translateToKiche");
      question.prompt = item.icon ? `${item.icon} ${item.english}` : item.english;
      question.correctAnswer = item.kiche;
      question.acceptableAnswers = [item.kiche.toLowerCase()];
      question.isTypingQuestion = true;
      break;
    case QUESTION_TYPE.TRANSLATE_FROM_KICHE:
      question.instruction = t$1("translateToEnglish");
      question.prompt = item.kiche;
      question.correctAnswer = item.english;
      question.acceptableAnswers = [item.english.toLowerCase(), (_a = item.spanish) == null ? void 0 : _a.toLowerCase()].filter(Boolean);
      question.isTypingQuestion = true;
      break;
    case QUESTION_TYPE.RECALL_TYPE:
      question.instruction = t$1("typeWordYouLearned");
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
function checkLessonAnswer$1(userAnswer, question) {
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
const LESSONS$1 = {
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
const DEBUG = {
  enabled: new URLSearchParams(window.location.search).get("debug") === "true",
  log(...args) {
    if (this.enabled) {
      console.log("[TecunUman DEBUG]", ...args);
    }
  },
  warn(...args) {
    if (this.enabled) {
      console.warn("[TecunUman DEBUG]", ...args);
    }
  },
  error(...args) {
    console.error("[TecunUman ERROR]", ...args);
  },
  // Log game state
  logState() {
    if (this.enabled) {
      console.group("[TecunUman DEBUG] Game State");
      console.log("Army:", GameState.army);
      console.log("Morale:", GameState.morale);
      console.log("Mastery:", GameState.mastery);
      console.log("Turn:", GameState.turn);
      console.log("Army Position:", GameState.armyPosition);
      console.log("Words Learned:", GameState.wordsLearned.size);
      console.log("Battles Won/Lost:", GameState.battlesWon, "/", GameState.battlesLost);
      console.log("Completed Lessons:", GameState.completedLessons);
      console.log("Current Battle:", GameState.currentBattle);
      console.groupEnd();
    }
  },
  // Log node info
  logNode(node) {
    if (this.enabled && node) {
      console.group("[TecunUman DEBUG] Node:", node.name);
      console.log("ID:", node.id);
      console.log("Status:", node.status);
      console.log("Lesson Type:", node.lessonType);
      console.log("Spanish Strength:", node.spanishStrength);
      console.log("Requirements:", node.requires);
      console.log("Revealed:", node.revealed);
      console.groupEnd();
    }
  },
  // Helper functions for console use
  addArmy(amount = 500) {
    if (!this.enabled) return;
    GameState.army += amount;
    if (typeof updateStats === "function") updateStats();
    this.log("Added", amount, "army. Total:", GameState.army);
  },
  setMorale(value = 100) {
    if (!this.enabled) return;
    GameState.morale = Math.min(100, Math.max(0, value));
    if (typeof updateStats === "function") updateStats();
    this.log("Morale set to:", GameState.morale);
  },
  teleport(nodeId) {
    if (!this.enabled) return;
    const node = GameState.nodes.find((n) => n.id === nodeId);
    if (node) {
      GameState.armyPosition = nodeId;
      GameState.revealedNodes.add(nodeId);
      if (typeof revealAdjacentNodes === "function") revealAdjacentNodes(nodeId);
      if (typeof renderMap === "function") renderMap();
      if (typeof centerCameraOnNode === "function") centerCameraOnNode(node, true);
      this.log("Teleported to:", node.name);
    } else {
      this.warn("Node not found:", nodeId);
      this.log("Available nodes:", GameState.nodes.map((n) => n.id).join(", "));
    }
  },
  captureNode(nodeId) {
    if (!this.enabled) return;
    const node = GameState.nodes.find((n) => n.id === nodeId);
    if (node) {
      node.status = "kiche";
      node.spanishStrength = 0;
      GameState.revealedNodes.add(nodeId);
      if (typeof revealAdjacentNodes === "function") revealAdjacentNodes(nodeId);
      if (typeof renderMap === "function") renderMap();
      this.log("Captured:", node.name);
    } else {
      this.warn("Node not found:", nodeId);
    }
  },
  completeLesson(nodeId, difficulty = "hero") {
    if (!this.enabled) return;
    if (!GameState.completedLessons[nodeId]) {
      GameState.completedLessons[nodeId] = {};
    }
    GameState.completedLessons[nodeId][difficulty] = true;
    if (difficulty === "hero") {
      GameState.completedLessons[nodeId]["warrior"] = true;
      GameState.completedLessons[nodeId]["soldier"] = true;
    } else if (difficulty === "warrior") {
      GameState.completedLessons[nodeId]["soldier"] = true;
    }
    this.log("Completed lesson at", nodeId, "difficulty:", difficulty);
  },
  listNodes() {
    if (!this.enabled) return;
    console.table(GameState.nodes.map((n) => ({
      id: n.id,
      name: n.name,
      status: n.status,
      spanishStrength: n.spanishStrength,
      lessonType: n.lessonType,
      revealed: GameState.revealedNodes.has(n.id)
    })));
  }
};
if (DEBUG.enabled) {
  console.log("%c[TecunUman] DEBUG MODE ENABLED", "background: #ff6b35; color: white; padding: 4px 8px; font-weight: bold;");
  console.log("Debug features:");
  console.log("  - All nodes accessible (requirements bypassed)");
  console.log("  - All nodes revealed on map");
  console.log("  - Extra logging enabled");
  console.log("  - DEBUG object available in console");
  console.log("  - Press D to dump game state");
  console.log("  - Press S on tutorial screen to skip to quiz");
  console.log("  - Press W to auto-win current battle");
  document.addEventListener("keydown", (e) => {
    var _a, _b;
    if (e.target.matches("input, textarea")) return;
    switch (e.key.toLowerCase()) {
      case "d":
        DEBUG.logState();
        break;
      case "s":
        if ((_a = document.getElementById("tutorial-screen")) == null ? void 0 : _a.classList.contains("active")) {
          DEBUG.log("Skipping tutorial...");
          if (typeof startQuizFromTutorial === "function") {
            startQuizFromTutorial();
          }
        }
        break;
      case "w":
        if (((_b = document.getElementById("battle-screen")) == null ? void 0 : _b.classList.contains("active")) && GameState.currentBattle) {
          DEBUG.log("Auto-winning battle...");
          GameState.currentQuestions.length - GameState.currentQuestionIndex;
          GameState.correctAnswers = GameState.currentQuestions.length;
          GameState.currentQuestionIndex = GameState.currentQuestions.length;
          GameState.currentBattle.enemyStrength = 0;
          endBattle();
        }
        break;
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const indicator = document.createElement("div");
    indicator.id = "debug-indicator";
    indicator.innerHTML = "🔧 DEBUG MODE";
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
    window.DEBUG = DEBUG;
    window.GameState = GameState;
  });
}
const GameState = {
  // Player resources
  army: 1e3,
  morale: 100,
  mastery: 0,
  wordsLearned: /* @__PURE__ */ new Set(),
  battlesWon: 0,
  battlesLost: 0,
  // Campaign progress
  turn: 1,
  year: 1524,
  month: 2,
  // Army position
  armyPosition: null,
  // Current node ID
  // Current battle
  currentBattle: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  // Map state
  nodes: [],
  edges: [],
  revealedNodes: /* @__PURE__ */ new Set(),
  // Completed lessons per node: { nodeId: { soldier: true, warrior: false, hero: false } }
  completedLessons: {},
  // Camera/viewport
  camera: { x: 0, y: 0 },
  isDragging: false,
  lastMouse: { x: 0, y: 0 },
  // Selected node
  selectedNode: null,
  // Spanish attack event
  activeAttack: null
};
const NODE_TYPES = {
  START: { lesson: "vocabulary", icon: "🏛️", name: "Capital" },
  VOCABULARY: { lesson: "vocabulary", icon: "📚", name: "Village" },
  GREETINGS: { lesson: "greetings", icon: "👋", name: "Trading Post" },
  PRONOUNS: { lesson: "pronouns", icon: "👤", name: "Sacred Grove" },
  POSSESSION: { lesson: "possession", icon: "🏠", name: "Fortress" },
  NEGATION: { lesson: "negation", icon: "🚫", name: "Watchtower" },
  VERBS: { lesson: "intransitive_verbs", icon: "🚶", name: "Training Ground" },
  NUMBERS: { lesson: "numbers", icon: "🔢", name: "Counting House" },
  EXISTENTIAL: { lesson: "existential", icon: "✨", name: "Temple" },
  QUESTIONS: { lesson: "questions", icon: "❓", name: "Council Hall" },
  COMMANDS: { lesson: "commands", icon: "👆", name: "War Camp" },
  ADJECTIVES: { lesson: "adjectives", icon: "🎨", name: "Artisan Quarter" },
  SPANISH_FORT: { lesson: "vocabulary", icon: "🏰", name: "Spanish Fort" }
};
function generateMap() {
  const nodes = [];
  const edges = [];
  function createNode(config) {
    const nodeType = Object.keys(NODE_TYPES).find(
      (key) => NODE_TYPES[key].lesson === config.lessonType && key !== "START" && key !== "SPANISH_FORT"
    ) || "VOCABULARY";
    return {
      id: config.id,
      x: config.x,
      y: config.y,
      type: config.isSpanish ? "SPANISH_FORT" : config.isCapital ? "START" : nodeType,
      name: config.name,
      description: config.description,
      status: config.status || "kiche",
      isCapital: config.isCapital || false,
      revealed: config.revealed || false,
      spanishStrength: config.spanishStrength || 0,
      lessonType: config.lessonType,
      requires: config.requires || [],
      // Array of {nodeId, difficulty} requirements
      region: config.region || "highlands",
      isFinalBoss: config.isFinalBoss || false
    };
  }
  nodes.push(createNode({
    id: "qumarkaj",
    x: 1e3,
    y: 900,
    name: "Q'umarkaj",
    description: "The sacred capital of the K'iche' Kingdom, seat of the Ajpop. Your journey begins here in the heart of Iximulew (Guatemala).",
    lessonType: "vocabulary",
    status: "kiche",
    isCapital: true,
    revealed: true,
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "chichi",
    x: 1100,
    y: 1100,
    name: "Chichicastenango",
    description: "The sacred market town, home to the Popol Vuh manuscript. Learn greetings used in the famous market.",
    lessonType: "greetings",
    status: "kiche",
    revealed: true,
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "sacapulas",
    x: 1050,
    y: 650,
    name: "Sacapulas",
    description: "Ancient salt-trading town along the Río Negro. Learn to count and trade.",
    lessonType: "numbers",
    status: "kiche",
    revealed: true,
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "totonicapan",
    x: 700,
    y: 850,
    name: "Totonicapán",
    description: "Highland city of artisans. Learn adjectives to describe their beautiful crafts.",
    lessonType: "adjectives",
    status: "kiche",
    requires: [{ nodeId: "qumarkaj", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "xelaju",
    x: 400,
    y: 900,
    name: "Xelaju",
    description: "The great city of Quetzaltenango. Master commands to lead the warriors here.",
    lessonType: "commands",
    status: "contested",
    spanishStrength: 250,
    requires: [{ nodeId: "totonicapan", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "zunil",
    x: 350,
    y: 1100,
    name: "Zunil",
    description: "Village of sacred hot springs. Learn about existence and being.",
    lessonType: "existential",
    status: "kiche",
    requires: [{ nodeId: "xelaju", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "huehue",
    x: 250,
    y: 600,
    name: "Huehuetenango",
    description: "The Mam Maya stronghold. Learn the vocabulary of war and resistance.",
    lessonType: "vocabulary_warfare",
    status: "contested",
    spanishStrength: 200,
    requires: [{ nodeId: "xelaju", difficulty: "warrior" }],
    region: "mam"
  }));
  nodes.push(createNode({
    id: "zaculeu",
    x: 200,
    y: 500,
    name: "Zaculeu",
    description: "The ancient Mam capital. Learn the geography and places of the highlands.",
    lessonType: "vocabulary_places",
    status: "spanish",
    spanishStrength: 350,
    requires: [{ nodeId: "huehue", difficulty: "soldier" }],
    region: "mam"
  }));
  nodes.push(createNode({
    id: "nebaj",
    x: 1200,
    y: 450,
    name: "Nebaj",
    description: "Heart of the Ixil Maya territory. Learn pronouns and forms of address.",
    lessonType: "pronouns",
    status: "kiche",
    requires: [{ nodeId: "sacapulas", difficulty: "soldier" }],
    region: "ixil"
  }));
  nodes.push(createNode({
    id: "chajul",
    x: 1400,
    y: 400,
    name: "Chajul",
    description: "Remote Ixil village. Master negation to defend against Spanish lies.",
    lessonType: "negation",
    status: "kiche",
    requires: [{ nodeId: "nebaj", difficulty: "soldier" }],
    region: "ixil"
  }));
  nodes.push(createNode({
    id: "cotzal",
    x: 1350,
    y: 550,
    name: "San Juan Cotzal",
    description: "Complete the Ixil triangle. Learn verbs of movement and action.",
    lessonType: "intransitive_verbs",
    status: "kiche",
    requires: [{ nodeId: "nebaj", difficulty: "soldier" }],
    region: "ixil"
  }));
  nodes.push(createNode({
    id: "uspantan",
    x: 1550,
    y: 500,
    name: "Uspantán",
    description: "Gateway to the Verapaz region. Birthplace of Rigoberta Menchú.",
    lessonType: "questions",
    status: "contested",
    spanishStrength: 180,
    requires: [{ nodeId: "chajul", difficulty: "soldier" }, { nodeId: "cotzal", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "solola",
    x: 900,
    y: 1200,
    name: "Sololá",
    description: "Gateway to Lake Atitlán. Spanish forces are advancing from the south! Learn about possession and ownership to rally the defenders.",
    lessonType: "possession",
    status: "contested",
    spanishStrength: 150,
    revealed: true,
    // Visible from start - shows the Spanish threat
    requires: [{ nodeId: "chichi", difficulty: "soldier" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "panajachel",
    x: 850,
    y: 1400,
    name: "Panajachel",
    description: "Beautiful shores of Lake Atitlán, the navel of the world. Learn the animals of the lake.",
    lessonType: "vocabulary_animals",
    status: "kiche",
    requires: [{ nodeId: "solola", difficulty: "soldier" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "santiago",
    x: 700,
    y: 1500,
    name: "Santiago Atitlán",
    description: "Home of Maximón. The Tz'utujil Maya allies await.",
    lessonType: "existential",
    status: "kiche",
    requires: [{ nodeId: "panajachel", difficulty: "soldier" }],
    region: "tzutujil"
  }));
  nodes.push(createNode({
    id: "joyabaj",
    x: 1300,
    y: 900,
    name: "Joyabaj",
    description: "Eastern K'iche' town known for its dances. Practice greetings.",
    lessonType: "greetings",
    status: "kiche",
    requires: [{ nodeId: "qumarkaj", difficulty: "soldier" }],
    region: "quiche"
  }));
  nodes.push(createNode({
    id: "rabinal",
    x: 1550,
    y: 850,
    name: "Rabinal",
    description: "Home of the Rabinal Achí dance-drama. The Achi Maya join your cause.",
    lessonType: "commands",
    status: "contested",
    spanishStrength: 200,
    requires: [{ nodeId: "joyabaj", difficulty: "warrior" }],
    region: "achi"
  }));
  nodes.push(createNode({
    id: "salama",
    x: 1700,
    y: 750,
    name: "Salamá",
    description: "Capital of Baja Verapaz. Spanish missionaries are active here.",
    lessonType: "negation",
    status: "spanish",
    spanishStrength: 280,
    requires: [{ nodeId: "rabinal", difficulty: "soldier" }],
    region: "verapaz"
  }));
  nodes.push(createNode({
    id: "coban",
    x: 1900,
    y: 600,
    name: "Cobán",
    description: "Heart of Q'eqchi' territory. Learn sacred and spiritual vocabulary.",
    lessonType: "vocabulary_spiritual",
    status: "spanish",
    spanishStrength: 320,
    requires: [{ nodeId: "salama", difficulty: "soldier" }, { nodeId: "uspantan", difficulty: "soldier" }],
    region: "verapaz"
  }));
  nodes.push(createNode({
    id: "tecpan",
    x: 1200,
    y: 1300,
    name: "Tecpán Guatemala",
    description: "Near the ancient Kaqchikel capital of Iximche.",
    lessonType: "pronouns",
    status: "contested",
    spanishStrength: 220,
    requires: [{ nodeId: "solola", difficulty: "soldier" }, { nodeId: "chichi", difficulty: "warrior" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "chimaltenango",
    x: 1400,
    y: 1400,
    name: "Chimaltenango",
    description: "Gateway to the central valley. Spanish forces are strong here.",
    lessonType: "intransitive_verbs",
    status: "spanish",
    spanishStrength: 300,
    requires: [{ nodeId: "tecpan", difficulty: "warrior" }],
    region: "kaqchikel"
  }));
  nodes.push(createNode({
    id: "antigua",
    x: 1500,
    y: 1550,
    name: "Antigua Guatemala",
    description: "The Spanish colonial capital. A major battle awaits.",
    lessonType: "questions",
    status: "spanish",
    spanishStrength: 400,
    requires: [{ nodeId: "chimaltenango", difficulty: "warrior" }],
    region: "central"
  }));
  nodes.push(createNode({
    id: "mazatenango",
    x: 500,
    y: 1400,
    name: "Mazatenango",
    description: "Gateway to the Pacific coast. Rich cacao-growing region.",
    lessonType: "numbers",
    status: "contested",
    spanishStrength: 180,
    requires: [{ nodeId: "zunil", difficulty: "soldier" }, { nodeId: "santiago", difficulty: "soldier" }],
    region: "coast"
  }));
  nodes.push(createNode({
    id: "retalhuleu",
    x: 350,
    y: 1550,
    name: "Retalhuleu",
    description: "Pacific coastal town. The Spanish import goods through here.",
    lessonType: "adjectives",
    status: "spanish",
    spanishStrength: 250,
    requires: [{ nodeId: "mazatenango", difficulty: "warrior" }],
    region: "coast"
  }));
  nodes.push(createNode({
    id: "iximche",
    x: 1300,
    y: 1500,
    name: "Iximche",
    description: "The ancient Kaqchikel capital. Master advanced concepts and history.",
    lessonType: "vocabulary_advanced",
    status: "spanish",
    spanishStrength: 500,
    isSpanish: true,
    requires: [
      { nodeId: "tecpan", difficulty: "hero" },
      { nodeId: "antigua", difficulty: "warrior" }
    ],
    region: "kaqchikel",
    isFinalBoss: true
  }));
  const connections = [
    // From Q'umarkaj (center hub)
    ["qumarkaj", "chichi"],
    ["qumarkaj", "sacapulas"],
    ["qumarkaj", "totonicapan"],
    ["qumarkaj", "joyabaj"],
    // Western route
    ["totonicapan", "xelaju"],
    ["xelaju", "zunil"],
    ["xelaju", "huehue"],
    ["huehue", "zaculeu"],
    // Northern route (Ixil)
    ["sacapulas", "nebaj"],
    ["nebaj", "chajul"],
    ["nebaj", "cotzal"],
    ["chajul", "uspantan"],
    ["cotzal", "uspantan"],
    // Southern route (Lake Atitlán)
    ["chichi", "solola"],
    ["solola", "panajachel"],
    ["panajachel", "santiago"],
    // Eastern route
    ["joyabaj", "rabinal"],
    ["rabinal", "salama"],
    ["salama", "coban"],
    ["uspantan", "coban"],
    // Southeast route
    ["solola", "tecpan"],
    ["chichi", "tecpan"],
    ["tecpan", "chimaltenango"],
    ["chimaltenango", "antigua"],
    ["tecpan", "iximche"],
    ["antigua", "iximche"],
    // Pacific coast
    ["zunil", "mazatenango"],
    ["santiago", "mazatenango"],
    ["mazatenango", "retalhuleu"],
    // Cross-connections (loop backs)
    ["totonicapan", "sacapulas"],
    // Mountain route
    ["zunil", "santiago"],
    // Lake western shore
    ["rabinal", "uspantan"],
    // Northern traverse
    ["joyabaj", "cotzal"]
    // Eastern-northern link
  ];
  for (const [from, to] of connections) {
    edges.push({ from, to });
  }
  return { nodes, edges };
}
let canvas, ctx;
function initCanvas() {
  canvas = document.getElementById("campaign-map");
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  const container = document.getElementById("map-container");
  container.addEventListener("mousedown", handleMouseDown);
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseup", handleMouseUp);
  container.addEventListener("mouseleave", handleMouseUp);
  container.addEventListener("wheel", handleWheel);
  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);
  container.addEventListener("touchend", handleTouchEnd);
}
function resizeCanvas() {
  const container = document.getElementById("map-container");
  if (container.clientWidth > 0 && container.clientHeight > 0) {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    renderMap();
  }
}
function handleMouseDown(e) {
  if (e.target.closest(".territory-panel") || e.target.closest(".attack-alert")) return;
  GameState.isDragging = true;
  GameState.lastMouse = { x: e.clientX, y: e.clientY };
}
function handleMouseMove(e) {
  if (!GameState.isDragging) return;
  const dx = e.clientX - GameState.lastMouse.x;
  const dy = e.clientY - GameState.lastMouse.y;
  GameState.camera.x -= dx;
  GameState.camera.y -= dy;
  GameState.lastMouse = { x: e.clientX, y: e.clientY };
  renderMap();
}
function handleMouseUp() {
  GameState.isDragging = false;
}
function handleWheel(e) {
  e.preventDefault();
  GameState.camera.x += e.deltaX;
  GameState.camera.y += e.deltaY;
  renderMap();
}
let touchStart = null;
function handleTouchStart(e) {
  if (e.touches.length === 1) {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}
function handleTouchMove(e) {
  if (!touchStart || e.touches.length !== 1) return;
  e.preventDefault();
  const dx = e.touches[0].clientX - touchStart.x;
  const dy = e.touches[0].clientY - touchStart.y;
  GameState.camera.x -= dx;
  GameState.camera.y -= dy;
  touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  renderMap();
}
function handleTouchEnd() {
  touchStart = null;
}
function renderMap() {
  if (!ctx) return;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1a3d2e");
  gradient.addColorStop(0.5, "#0f2a1f");
  gradient.addColorStop(1, "#0a1f15");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawTerrain();
  drawEdges();
  drawNodes();
  updateArmyMarker();
}
function drawTerrain() {
  ctx.fillStyle = "rgba(34, 139, 34, 0.15)";
  for (let i = 0; i < 50; i++) {
    const x = i * 197 % 2500 - GameState.camera.x;
    const y = i * 131 % 2e3 - GameState.camera.y;
    ctx.beginPath();
    ctx.arc(x, y, 40 + i % 30, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(26, 77, 62, 0.25)";
  for (let i = 0; i < 80; i++) {
    const x = i * 157 % 2500 - GameState.camera.x;
    const y = i * 103 % 2e3 - GameState.camera.y;
    ctx.beginPath();
    ctx.arc(x, y, 25 + i % 20, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(212, 168, 67, 0.03)";
  ctx.lineWidth = 1;
  const tileSize = 100;
  const offsetX = GameState.camera.x % tileSize;
  const offsetY = GameState.camera.y % tileSize;
  for (let x = -offsetX; x < canvas.width + tileSize; x += tileSize) {
    for (let y = -offsetY; y < canvas.height + tileSize; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, y + tileSize / 2);
      ctx.lineTo(x + tileSize / 4, y + tileSize / 2);
      ctx.lineTo(x + tileSize / 4, y + tileSize / 4);
      ctx.lineTo(x + tileSize / 2, y + tileSize / 4);
      ctx.lineTo(x + tileSize / 2, y);
      ctx.stroke();
    }
  }
  ctx.fillStyle = "rgba(10, 31, 21, 0.4)";
  ctx.beginPath();
  const mountainY = 50 - GameState.camera.y * 0.1;
  ctx.moveTo(0, mountainY + 200);
  for (let x = 0; x < canvas.width + 100; x += 80) {
    const peakHeight = 50 + Math.sin(x * 0.02) * 30 + Math.cos(x * 0.01) * 40;
    ctx.lineTo(x, mountainY + peakHeight);
  }
  ctx.lineTo(canvas.width, mountainY + 200);
  ctx.closePath();
  ctx.fill();
}
function drawMayanTile(x, y, size, fillColor, strokeColor, isCapital) {
  const halfSize = size / 2;
  const step = size * 0.15;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  if (isCapital) {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  } else {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  }
  ctx.closePath();
  ctx.translate(3, 4);
  ctx.fill();
  ctx.translate(-3, -4);
  ctx.beginPath();
  if (isCapital) {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  } else {
    ctx.moveTo(x - halfSize + step, y - halfSize);
    ctx.lineTo(x + halfSize - step, y - halfSize);
    ctx.lineTo(x + halfSize, y - halfSize + step);
    ctx.lineTo(x + halfSize, y + halfSize - step);
    ctx.lineTo(x + halfSize - step, y + halfSize);
    ctx.lineTo(x - halfSize + step, y + halfSize);
    ctx.lineTo(x - halfSize, y + halfSize - step);
    ctx.lineTo(x - halfSize, y - halfSize + step);
  }
  ctx.closePath();
  const gradient = ctx.createLinearGradient(x - halfSize, y - halfSize, x + halfSize, y + halfSize);
  gradient.addColorStop(0, lightenColor(fillColor, 20));
  gradient.addColorStop(0.5, fillColor);
  gradient.addColorStop(1, darkenColor(fillColor, 20));
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = isCapital ? 4 : 3;
  ctx.stroke();
  if (isCapital) {
    const innerStep = step * 0.7;
    const innerHalf = halfSize * 0.75;
    ctx.beginPath();
    ctx.moveTo(x - innerHalf + innerStep, y - innerHalf);
    ctx.lineTo(x + innerHalf - innerStep, y - innerHalf);
    ctx.lineTo(x + innerHalf, y - innerHalf + innerStep);
    ctx.lineTo(x + innerHalf, y + innerHalf - innerStep);
    ctx.lineTo(x + innerHalf - innerStep, y + innerHalf);
    ctx.lineTo(x - innerHalf + innerStep, y + innerHalf);
    ctx.lineTo(x - innerHalf, y + innerHalf - innerStep);
    ctx.lineTo(x - innerHalf, y - innerHalf + innerStep);
    ctx.closePath();
    ctx.strokeStyle = "rgba(212, 168, 67, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x - halfSize + step + 2, y - halfSize + 2);
  ctx.lineTo(x + halfSize - step - 2, y - halfSize + 2);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 255) + amt);
  const B = Math.min(255, (num & 255) + amt);
  return `rgb(${R},${G},${B})`;
}
function darkenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, (num >> 8 & 255) - amt);
  const B = Math.max(0, (num & 255) - amt);
  return `rgb(${R},${G},${B})`;
}
function drawEdges() {
  for (const edge of GameState.edges) {
    const fromNode = GameState.nodes.find((n) => n.id === edge.from);
    const toNode = GameState.nodes.find((n) => n.id === edge.to);
    if (!fromNode || !toNode) continue;
    const fromRevealed = GameState.revealedNodes.has(fromNode.id);
    const toRevealed = GameState.revealedNodes.has(toNode.id);
    if (!fromRevealed && !toRevealed) continue;
    const x1 = fromNode.x - GameState.camera.x;
    const y1 = fromNode.y - GameState.camera.y;
    const x2 = toNode.x - GameState.camera.x;
    const y2 = toNode.y - GameState.camera.y;
    ctx.beginPath();
    ctx.moveTo(x1 + 2, y1 + 2);
    ctx.lineTo(x2 + 2, y2 + 2);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    if (!toRevealed) {
      ctx.strokeStyle = "rgba(100, 80, 60, 0.4)";
      ctx.setLineDash([15, 10]);
      ctx.lineWidth = 4;
    } else {
      ctx.strokeStyle = "rgba(139, 115, 85, 0.7)";
      ctx.setLineDash([]);
      ctx.lineWidth = 4;
    }
    ctx.stroke();
    ctx.setLineDash([]);
    if (toRevealed && fromRevealed) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.floor(dist / 30);
      ctx.fillStyle = "rgba(212, 168, 67, 0.3)";
      for (let i = 1; i < steps; i++) {
        const t2 = i / steps;
        const px = x1 + dx * t2;
        const py = y1 + dy * t2;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
function drawNodes() {
  for (const node of GameState.nodes) {
    const isRevealed = GameState.revealedNodes.has(node.id);
    const x = node.x - GameState.camera.x;
    const y = node.y - GameState.camera.y;
    if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) continue;
    const size = node.isCapital ? 50 : 36;
    const halfSize = size / 2;
    if (!isRevealed) {
      drawMayanTile(x, y, size, "#2a2a4a", "#3a3a5a", false);
      ctx.fillStyle = "#555";
      ctx.font = "bold 22px Cinzel";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", x, y);
      continue;
    }
    let fillColor, strokeColor;
    switch (node.status) {
      case "kiche":
        fillColor = "#1a4d3e";
        strokeColor = "#3fa878";
        break;
      case "spanish":
        fillColor = "#6a1a1a";
        strokeColor = "#c41e3a";
        break;
      case "contested":
        fillColor = "#5a3a1a";
        strokeColor = "#d4a843";
        break;
    }
    if (node.id === GameState.armyPosition) {
      const glowSize = size + 20;
      const gradient = ctx.createRadialGradient(x, y, size / 2, x, y, glowSize);
      gradient.addColorStop(0, "rgba(63, 168, 120, 0.5)");
      gradient.addColorStop(0.5, "rgba(63, 168, 120, 0.2)");
      gradient.addColorStop(1, "rgba(63, 168, 120, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
    }
    drawMayanTile(x, y, size, fillColor, strokeColor, node.isCapital);
    const typeInfo = NODE_TYPES[node.type];
    ctx.font = node.isCapital ? "26px Arial" : "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(typeInfo.icon, x + 1, y + 2);
    ctx.fillStyle = "#fff";
    ctx.fillText(typeInfo.icon, x, y);
    if (node.status === "contested") {
      ctx.font = "16px Arial";
      ctx.fillStyle = "rgba(212, 168, 67, 0.8)";
      ctx.fillText("⚔️", x + halfSize - 3, y - halfSize + 3);
    }
    ctx.fillStyle = "#f4e4bc";
    ctx.font = "bold 11px Cinzel";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.fillText(node.name, x, y + halfSize + 15);
    ctx.shadowBlur = 0;
    node._screenX = x;
    node._screenY = y;
    node._radius = halfSize;
  }
}
function updateArmyMarker() {
  const armyMarker = document.getElementById("army-marker");
  const currentNode = GameState.nodes.find((n) => n.id === GameState.armyPosition);
  if (!currentNode) {
    armyMarker.style.display = "none";
    return;
  }
  const x = currentNode.x - GameState.camera.x;
  const y = currentNode.y - GameState.camera.y;
  armyMarker.style.display = "block";
  armyMarker.style.left = `${x}px`;
  armyMarker.style.top = `${y - 25}px`;
}
function handleMapClick(e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  for (const node of GameState.nodes) {
    if (!GameState.revealedNodes.has(node.id)) continue;
    const dx = clickX - node._screenX;
    const dy = clickY - node._screenY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= node._radius + 10) {
      selectNode(node);
      return;
    }
  }
  deselectNode();
}
function selectNode(node) {
  GameState.selectedNode = node;
  const panel = document.getElementById("territory-info");
  panel.classList.remove("hidden");
  document.getElementById("territory-name").textContent = node.name;
  document.getElementById("territory-desc").textContent = node.description;
  const statusDiv = document.getElementById("territory-status");
  let statusHTML = "";
  switch (node.status) {
    case "kiche":
      statusHTML = `<span style="color: #2d7d5f;">✓ ${t("underKicheControl")}</span>`;
      break;
    case "spanish":
      statusHTML = `<span style="color: #c41e3a;">✗ ${t("spanishControlledStatus")}</span>
                <br>${t("enemyStrength")}: ${node.spanishStrength} ${t("soldiers")}`;
      break;
    case "contested":
      statusHTML = `<span style="color: #c45c3b;">⚔️ ${t("underAttackStatus")}</span>
                <br>${t("enemyStrength")}: ${node.spanishStrength} ${t("soldiers")}`;
      break;
  }
  statusDiv.innerHTML = statusHTML;
  const lessonInfo = document.getElementById("lesson-info");
  const lesson = LESSONS[node.lessonType];
  if (lesson) {
    lessonInfo.innerHTML = `
            <div class="lesson-type">
                <span>${lesson.icon || "📚"}</span>
                <span>${lesson.englishName}</span>
            </div>
            <div class="lesson-desc">${lesson.description}</div>
        `;
    lessonInfo.style.display = "block";
  } else {
    lessonInfo.style.display = "none";
  }
  const completedDiv = document.createElement("div");
  completedDiv.className = "completed-difficulties";
  const completions = GameState.completedLessons[node.id];
  if (completions) {
    const completedText = [];
    if (completions.soldier) completedText.push("🪖");
    if (completions.warrior) completedText.push("⚔️");
    if (completions.hero) completedText.push("🦸");
    if (completedText.length > 0) {
      completedDiv.innerHTML = `<span style="color: #3fa878; font-size: 0.85rem;">${t("completed")}: ${completedText.join(" ")}</span>`;
    }
  }
  const actionsDiv = document.getElementById("territory-actions");
  actionsDiv.innerHTML = "";
  if (completedDiv.innerHTML) {
    actionsDiv.appendChild(completedDiv);
  }
  const reqCheck = checkNodeRequirements(node);
  const isCurrentPosition = node.id === GameState.armyPosition;
  if (isCurrentPosition) {
    if (node.status === "contested" || node.status === "spanish") {
      showDifficultySelector(actionsDiv, node, node.status === "contested" ? "defend" : "attack");
    } else {
      showDifficultySelector(actionsDiv, node, "train");
    }
  } else if (!reqCheck.met) {
    const reqDiv = document.createElement("div");
    reqDiv.className = "requirements-info";
    reqDiv.innerHTML = `
            <p style="color: #c45c3b; margin-bottom: 0.5rem;">🔒 ${t("requirementsNeeded")}:</p>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem;">
                ${reqCheck.missing.map((req) => `
                    <li style="color: #888; margin-bottom: 0.3rem;">
                        • ${t("complete")} <strong>${req.nodeName}</strong> 
                        ${t("at")} <span style="color: #d4a843;">${t(req.difficulty)}</span> ${t("level")}
                    </li>
                `).join("")}
            </ul>
        `;
    actionsDiv.appendChild(reqDiv);
  } else {
    const canReach = canReachNode(node);
    if (canReach) {
      if (node.status === "spanish" || node.status === "contested") {
        showDifficultySelector(actionsDiv, node, node.status === "contested" ? "defend" : "attack");
      } else {
        const moveBtn = document.createElement("button");
        moveBtn.className = "stone-button small";
        moveBtn.textContent = t("marchHere");
        moveBtn.onclick = () => moveToNode(node);
        actionsDiv.appendChild(moveBtn);
      }
    } else {
      const infoText = document.createElement("p");
      infoText.style.color = "#888";
      infoText.style.fontSize = "0.9rem";
      infoText.textContent = t("cannotReachPath");
      actionsDiv.appendChild(infoText);
    }
  }
}
function showDifficultySelector(container, node, battleType) {
  const selectorDiv = document.createElement("div");
  selectorDiv.className = "panel-difficulty-selector";
  const label = document.createElement("p");
  label.className = "panel-diff-label";
  label.textContent = t("selectDifficulty");
  selectorDiv.appendChild(label);
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "panel-diff-buttons";
  const difficulties = [
    { id: "soldier", icon: "🪖", name: t("soldier"), desc: t("soldierDesc") },
    { id: "warrior", icon: "⚔️", name: t("warrior"), desc: t("warriorDesc") },
    { id: "hero", icon: "🦸", name: t("hero"), desc: t("heroDesc") }
  ];
  difficulties.forEach((diff) => {
    const btn = document.createElement("button");
    btn.className = "panel-diff-btn";
    btn.innerHTML = `
            <span class="diff-icon">${diff.icon}</span>
            <span class="diff-name">${diff.name}</span>
        `;
    btn.title = diff.desc;
    btn.onclick = () => {
      setDifficulty(diff.id);
      if (battleType === "train") {
        startBattle(node, "train");
      } else {
        moveAndBattle(node);
      }
    };
    buttonsDiv.appendChild(btn);
  });
  selectorDiv.appendChild(buttonsDiv);
  container.appendChild(selectorDiv);
  const actionLabel = document.createElement("p");
  actionLabel.className = "panel-action-label";
  if (battleType === "train") {
    actionLabel.innerHTML = `<span style="color: var(--jade-light);">📚 ${t("train")}</span>`;
  } else if (battleType === "defend") {
    actionLabel.innerHTML = `<span style="color: var(--terracotta);">🛡️ ${t("defend")}</span>`;
  } else {
    actionLabel.innerHTML = `<span style="color: var(--terracotta);">⚔️ ${t("attack")}</span>`;
  }
  container.insertBefore(actionLabel, selectorDiv);
}
function deselectNode() {
  GameState.selectedNode = null;
  document.getElementById("territory-info").classList.add("hidden");
}
function checkNodeRequirements(node) {
  if (DEBUG.enabled) {
    DEBUG.log("Requirements bypassed for node:", node.name);
    return { met: true, missing: [] };
  }
  if (!node.requires || node.requires.length === 0) {
    return { met: true, missing: [] };
  }
  const missing = [];
  for (const req of node.requires) {
    const reqNodeId = req.nodeId;
    const reqDifficulty = req.difficulty || "soldier";
    const completions = GameState.completedLessons[reqNodeId];
    const difficultyLevels = ["soldier", "warrior", "hero"];
    const reqLevel = difficultyLevels.indexOf(reqDifficulty);
    let requirementMet = false;
    if (completions) {
      for (let i = reqLevel; i < difficultyLevels.length; i++) {
        if (completions[difficultyLevels[i]]) {
          requirementMet = true;
          break;
        }
      }
    }
    if (!requirementMet) {
      const reqNode = GameState.nodes.find((n) => n.id === reqNodeId);
      missing.push({
        nodeId: reqNodeId,
        nodeName: reqNode ? reqNode.name : reqNodeId,
        difficulty: reqDifficulty
      });
    }
  }
  return { met: missing.length === 0, missing };
}
function canReachNode(targetNode) {
  const currentPos = GameState.armyPosition;
  const adjacentIds = GameState.edges.filter((e) => e.from === currentPos || e.to === currentPos).map((e) => e.from === currentPos ? e.to : e.from);
  if (adjacentIds.includes(targetNode.id)) {
    return true;
  }
  const visited = /* @__PURE__ */ new Set([currentPos]);
  const queue = [currentPos];
  while (queue.length > 0) {
    const nodeId = queue.shift();
    const neighbors = GameState.edges.filter((e) => e.from === nodeId || e.to === nodeId).map((e) => e.from === nodeId ? e.to : e.from);
    for (const neighborId of neighbors) {
      if (visited.has(neighborId)) continue;
      visited.add(neighborId);
      if (neighborId === targetNode.id) return true;
      const neighbor = GameState.nodes.find((n) => n.id === neighborId);
      if (neighbor && neighbor.status === "kiche" && GameState.revealedNodes.has(neighborId)) {
        queue.push(neighborId);
      }
    }
  }
  return false;
}
function moveToNode(targetNode) {
  GameState.armyPosition = targetNode.id;
  revealAdjacentNodes(targetNode.id);
  centerCameraOnNode(targetNode);
  deselectNode();
  renderMap();
  updateArmyMarker();
  advanceTurn();
}
function moveAndBattle(targetNode) {
  GameState.armyPosition = targetNode.id;
  revealAdjacentNodes(targetNode.id);
  centerCameraOnNode(targetNode);
  renderMap();
  updateArmyMarker();
  startBattle(targetNode, targetNode.status === "contested" ? "defend" : "attack");
}
function revealAdjacentNodes(nodeId) {
  GameState.revealedNodes.add(nodeId);
  const adjacentIds = GameState.edges.filter((e) => e.from === nodeId || e.to === nodeId).map((e) => e.from === nodeId ? e.to : e.from);
  for (const adjId of adjacentIds) {
    GameState.revealedNodes.add(adjId);
  }
}
function centerCameraOnNode(node, animate = true) {
  const container = document.getElementById("map-container");
  const targetX = node.x - container.clientWidth / 2;
  const targetY = node.y - container.clientHeight / 2;
  if (!animate) {
    GameState.camera.x = targetX;
    GameState.camera.y = targetY;
    renderMap();
    return;
  }
  const startX = GameState.camera.x;
  const startY = GameState.camera.y;
  const duration = 500;
  const startTime = performance.now();
  function animateCamera(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    GameState.camera.x = startX + (targetX - startX) * easeProgress;
    GameState.camera.y = startY + (targetY - startY) * easeProgress;
    renderMap();
    if (progress < 1) {
      requestAnimationFrame(animateCamera);
    }
  }
  requestAnimationFrame(animateCamera);
}
let tutorialState = {
  items: [],
  currentIndex: 0,
  node: null,
  battleType: null
};
function getTutorialContent(lessonId) {
  const difficulty = getDifficulty();
  let items = [];
  const contentMap = {
    "vocabulary": typeof CULTURAL_VOCABULARY !== "undefined" ? CULTURAL_VOCABULARY : null,
    "vocabulary_animals": typeof VOCABULARY_ANIMALS !== "undefined" ? VOCABULARY_ANIMALS : null,
    "vocabulary_warfare": typeof VOCABULARY_WARFARE !== "undefined" ? VOCABULARY_WARFARE : null,
    "vocabulary_places": typeof VOCABULARY_PLACES !== "undefined" ? VOCABULARY_PLACES : null,
    "vocabulary_spiritual": typeof VOCABULARY_SPIRITUAL !== "undefined" ? VOCABULARY_SPIRITUAL : null,
    "vocabulary_advanced": typeof VOCABULARY_ADVANCED !== "undefined" ? VOCABULARY_ADVANCED : null,
    "greetings": typeof GREETINGS_CONTENT !== "undefined" ? GREETINGS_CONTENT : null,
    "numbers": typeof NUMBERS_CONTENT !== "undefined" ? NUMBERS_CONTENT : null,
    "pronouns": typeof PRONOUNS_CONTENT !== "undefined" ? PRONOUNS_CONTENT : null,
    "possession": typeof POSSESSION_CONTENT !== "undefined" ? POSSESSION_CONTENT : null,
    "negation": typeof NEGATION_CONTENT !== "undefined" ? NEGATION_CONTENT : null,
    "intransitive_verbs": typeof VERBS_CONTENT !== "undefined" ? VERBS_CONTENT : null,
    "adjectives": typeof ADJECTIVES_CONTENT !== "undefined" ? ADJECTIVES_CONTENT : null,
    "commands": typeof COMMANDS_CONTENT !== "undefined" ? COMMANDS_CONTENT : null,
    "existential": typeof EXISTENTIAL_CONTENT !== "undefined" ? EXISTENTIAL_CONTENT : null,
    "questions": typeof QUESTIONS_CONTENT !== "undefined" ? QUESTIONS_CONTENT : null
  };
  const contentSource = contentMap[lessonId] || contentMap["vocabulary"];
  if (!contentSource) {
    console.warn("No content source found for lesson:", lessonId);
    return [];
  }
  items = [...contentSource.core || []];
  if (difficulty === "warrior" || difficulty === "hero") {
    items = items.concat(contentSource.warrior || []);
  }
  if (difficulty === "hero") {
    items = items.concat(contentSource.hero || []);
  }
  return items;
}
function showTutorial(node, battleType) {
  const lessonId = node.lessonType || "vocabulary";
  const lesson = LESSONS[lessonId];
  tutorialState.items = getTutorialContent(lessonId);
  tutorialState.currentIndex = 0;
  tutorialState.node = node;
  tutorialState.battleType = battleType;
  if (DEBUG.enabled) {
    DEBUG.log("Tutorial started for:", node.name, "- Press S to skip");
  }
  document.getElementById("tutorial-icon").textContent = (lesson == null ? void 0 : lesson.icon) || "📚";
  document.getElementById("tutorial-title").textContent = `${t("learning")}: ${(lesson == null ? void 0 : lesson.englishName) || "Vocabulary"}`;
  document.getElementById("tutorial-location").textContent = node.name;
  document.getElementById("tutorial-total").textContent = tutorialState.items.length;
  renderTutorialCard();
  updateTutorialNavigation();
  showScreen("tutorial");
}
function renderTutorialCard() {
  const container = document.getElementById("tutorial-content");
  const item = tutorialState.items[tutorialState.currentIndex];
  if (!item) {
    container.innerHTML = "<p>No content available for this lesson.</p>";
    return;
  }
  const cultureHtml = item.culture ? `
        <div class="tutorial-culture">
            <div class="tutorial-culture-label">🌿 ${t("culturalContext")}</div>
            <p>${item.culture}</p>
        </div>
    ` : "";
  let extraHtml = "";
  if (item.conjugation) {
    extraHtml += `
            <div class="tutorial-extra-item">
                <span class="tutorial-extra-label">${t("conjugation")}: </span>
                <span class="tutorial-extra-value">${item.conjugation}</span>
            </div>
        `;
  }
  if (item.example) {
    extraHtml += `
            <div class="tutorial-extra-item">
                <span class="tutorial-extra-label">${t("example")}: </span>
                <span class="tutorial-extra-value">${item.example}</span>
            </div>
        `;
  }
  container.innerHTML = `
        <div class="tutorial-card">
            <div class="tutorial-card-header">
                <div class="tutorial-word-icon">${item.icon || "📝"}</div>
                <div class="tutorial-word-main">
                    <h3 class="tutorial-kiche">${item.kiche}</h3>
                    <p class="tutorial-english">${item.english}</p>
                    <p class="tutorial-spanish">${item.spanish || ""}</p>
                </div>
            </div>
            <div class="tutorial-card-body">
                ${cultureHtml}
                ${extraHtml ? `<div class="tutorial-extra">${extraHtml}</div>` : ""}
            </div>
        </div>
    `;
  document.getElementById("tutorial-current").textContent = tutorialState.currentIndex + 1;
}
function updateTutorialNavigation() {
  const prevBtn = document.getElementById("tutorial-prev");
  const nextBtn = document.getElementById("tutorial-next");
  const startBtn = document.getElementById("start-quiz");
  prevBtn.disabled = tutorialState.currentIndex === 0;
  const isLastCard = tutorialState.currentIndex >= tutorialState.items.length - 1;
  if (isLastCard) {
    nextBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
  }
}
function tutorialNext() {
  if (tutorialState.currentIndex < tutorialState.items.length - 1) {
    tutorialState.currentIndex++;
    renderTutorialCard();
    updateTutorialNavigation();
  }
}
function tutorialPrev() {
  if (tutorialState.currentIndex > 0) {
    tutorialState.currentIndex--;
    renderTutorialCard();
    updateTutorialNavigation();
  }
}
function startQuizFromTutorial() {
  startBattleQuiz(tutorialState.node, tutorialState.battleType);
}
function startBattle(node, type) {
  DEBUG.log("Starting battle:", { node: node.name, type });
  DEBUG.logNode(node);
  showTutorial(node, type);
}
function startBattleQuiz(node, type) {
  const currentDifficulty2 = typeof getDifficulty === "function" ? getDifficulty() : "soldier";
  const questionCounts = { soldier: 5, warrior: 10, hero: 15 };
  const questionCount = questionCounts[currentDifficulty2] || 5;
  DEBUG.log("Starting battle quiz:", {
    node: node.name,
    type,
    difficulty: currentDifficulty2,
    questionCount,
    enemyStrength: node.spanishStrength
  });
  GameState.currentBattle = {
    node,
    type,
    // 'attack', 'defend', or 'train'
    difficulty: currentDifficulty2,
    // Store the difficulty for this battle
    questionCount,
    // Store question count for this battle
    startingArmy: GameState.army,
    enemyStrength: node.spanishStrength || 0,
    startingEnemyStrength: node.spanishStrength || 0
  };
  const lessonId = node.lessonType || "vocabulary";
  const learnedWordsList = Array.from(GameState.wordsLearned).map((w) => ({ kiche: w }));
  GameState.currentQuestions = generateLessonQuestions(lessonId, questionCount, learnedWordsList);
  GameState.currentQuestionIndex = 0;
  GameState.correctAnswers = 0;
  const title = type === "train" ? `${t("trainingAt")} ${node.name}` : type === "defend" ? `${t("defenseOf")} ${node.name}` : `${t("attackOn")} ${node.name}`;
  document.getElementById("battle-title").textContent = title;
  const lesson = LESSONS[lessonId];
  if (lesson) {
    document.getElementById("lesson-badge").innerHTML = `
            <span class="lesson-icon">${lesson.icon || "📚"}</span>
            <span class="lesson-name">${lesson.englishName}</span>
        `;
  }
  const dotsContainer = document.getElementById("progress-dots");
  dotsContainer.innerHTML = "";
  for (let i = 0; i < questionCount; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dotsContainer.appendChild(dot);
  }
  document.querySelector(".round-counter").innerHTML = `<span data-i18n="round">${t("round")}</span> <span id="round-number">1</span>/${questionCount}`;
  updateBattleUI();
  showQuestion();
  showScreen("battle");
}
function updateBattleUI() {
  const battle = GameState.currentBattle;
  document.getElementById("kiche-troops").textContent = String(GameState.army);
  document.getElementById("spanish-troops").textContent = battle.enemyStrength;
  const kichePercent = GameState.army / battle.startingArmy * 100;
  const spanishPercent = battle.startingEnemyStrength > 0 ? battle.enemyStrength / battle.startingEnemyStrength * 100 : 100;
  document.getElementById("kiche-health-fill").style.width = `${Math.max(0, kichePercent)}%`;
  document.getElementById("spanish-health-fill").style.width = `${Math.max(0, spanishPercent)}%`;
  document.getElementById("round-number").textContent = String(GameState.currentQuestionIndex + 1);
  const dots = document.querySelectorAll("#progress-dots .dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("correct", "incorrect", "current");
    if (i < GameState.currentQuestionIndex) {
      dot.classList.add(GameState.currentQuestions[i].wasCorrect ? "correct" : "incorrect");
    } else if (i === GameState.currentQuestionIndex) {
      dot.classList.add("current");
    }
  });
  const kicheWarriors = document.getElementById("kiche-warriors");
  const spanishForces = document.getElementById("spanish-forces");
  const kicheCount = Math.min(5, Math.ceil(GameState.army / 200));
  const spanishCount = Math.min(5, Math.ceil(battle.enemyStrength / 100));
  kicheWarriors.textContent = "🏹".repeat(kicheCount);
  spanishForces.textContent = battle.type === "train" ? "📚📚📚" : "⚔️".repeat(Math.max(1, spanishCount));
}
function showQuestion() {
  const question = GameState.currentQuestions[GameState.currentQuestionIndex];
  const instructionEl = document.getElementById("lesson-instruction");
  const promptEl = document.getElementById("word-to-translate");
  instructionEl.textContent = question.instruction || "";
  if (question.type === "conversation_respond") {
    promptEl.innerHTML = `<span class="kiche-prompt">${question.prompt}</span>
            <span class="prompt-translation">(${question.promptTranslation})</span>`;
  } else if (question.type === "phrase_select") {
    const lang = typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "en";
    promptEl.textContent = lang === "es" && question.promptEs ? question.promptEs : question.prompt;
  } else if (question.type === "recall_type" && question.promptHint) {
    promptEl.innerHTML = `<span class="recall-icon">${question.prompt}</span>
            <span class="recall-hint">${question.promptHint}</span>`;
  } else {
    promptEl.textContent = question.prompt;
  }
  const textInput = document.getElementById("answer-input");
  const choicesContainer = document.getElementById("choices-container");
  const feedback = document.getElementById("feedback");
  feedback.classList.add("hidden");
  feedback.classList.remove("correct", "incorrect");
  const isTypingQuestion = question.isTypingQuestion || question.type === "translate_to_kiche" || question.type === "translate_from_kiche" || question.type === "recall_type";
  const isMultipleChoice = !isTypingQuestion && (question.type === "multiple_choice" || question.type === "icon_select" || question.type === "icon_text_select" || question.type === "phrase_select" || question.type === "conversation_respond" || question.choices);
  const isIconQuestion = question.isIconQuestion || question.type === "icon_select";
  const isIconTextQuestion = question.isIconTextQuestion || question.type === "icon_text_select";
  const isPhraseQuestion = question.type === "phrase_select" || question.type === "conversation_respond";
  if (isMultipleChoice) {
    textInput.classList.add("hidden");
    choicesContainer.classList.remove("hidden");
    choicesContainer.classList.toggle("icon-choices", isIconQuestion);
    choicesContainer.classList.toggle("icon-text-choices", isIconTextQuestion);
    choicesContainer.classList.toggle("phrase-choices", isPhraseQuestion);
    const buttons = choicesContainer.querySelectorAll(".choice-btn");
    buttons.forEach((btn, i) => {
      if (question.choices && question.choices[i]) {
        btn.textContent = question.choices[i];
        btn.style.display = "";
        btn.classList.toggle("phrase-btn", isPhraseQuestion);
      } else {
        btn.style.display = "none";
      }
      btn.classList.remove("correct", "incorrect");
      btn.disabled = false;
      btn.onclick = () => selectChoice(btn, question.choices[i]);
    });
  } else {
    textInput.classList.remove("hidden");
    choicesContainer.classList.add("hidden");
    choicesContainer.classList.remove("icon-choices", "icon-text-choices", "phrase-choices");
    textInput.value = "";
    textInput.placeholder = question.type === "recall_type" ? t("typeKicheWord") || "Type the K'iche' word..." : t("typeAnswer") || "Type your answer...";
    textInput.focus();
  }
  const submitBtn = document.getElementById("submit-answer");
  if (isMultipleChoice) {
    submitBtn.classList.add("hidden");
  } else {
    submitBtn.classList.remove("hidden");
  }
  document.getElementById("next-question").classList.add("hidden");
}
function selectChoice(button, answer) {
  const question = GameState.currentQuestions[GameState.currentQuestionIndex];
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === question.correctAnswer) {
      btn.classList.add("correct");
    }
  });
  const isCorrect = answer === question.correctAnswer;
  question.wasCorrect = isCorrect;
  if (isCorrect) {
    GameState.correctAnswers++;
    if (question.word && question.word.kiche) {
      GameState.wordsLearned.add(question.word.kiche.toLowerCase());
    }
  } else {
    button.classList.add("incorrect");
  }
  showFeedback(isCorrect, question);
}
function submitAnswer() {
  const question = GameState.currentQuestions[GameState.currentQuestionIndex];
  if (question.type === "multiple_choice") {
    return;
  }
  const userAnswer = document.getElementById("answer-input").value;
  if (!userAnswer.trim()) return;
  const isCorrect = checkLessonAnswer(userAnswer, question);
  question.wasCorrect = isCorrect;
  if (isCorrect) {
    GameState.correctAnswers++;
    if (question.word && question.word.kiche) {
      GameState.wordsLearned.add(question.word.kiche.toLowerCase());
    }
  }
  showFeedback(isCorrect, question);
}
function showFeedback(isCorrect, question) {
  var _a;
  const feedback = document.getElementById("feedback");
  feedback.classList.remove("hidden", "correct", "incorrect");
  feedback.classList.add(isCorrect ? "correct" : "incorrect");
  const battle = GameState.currentBattle;
  let feedbackMessage;
  if (battle.type === "train") {
    feedbackMessage = isCorrect ? `✓ ${t("correctTrain")}` : `✗ ${t("incorrectTrain")}`;
  } else {
    feedbackMessage = isCorrect ? `✓ ${t("correctBattle")}` : `✗ ${t("incorrectBattle")}`;
  }
  document.getElementById("feedback-text").textContent = feedbackMessage;
  const correctAnswerEl = document.getElementById("correct-answer");
  if (isCorrect) {
    if (question.type === "conversation_respond" && question.responseTranslation) {
      correctAnswerEl.innerHTML = `<span class="response-meaning">"${question.correctAnswer}" = "${question.responseTranslation}"</span>`;
    } else {
      correctAnswerEl.textContent = "";
    }
  } else {
    if (question.type === "conversation_respond" && question.responseTranslation) {
      correctAnswerEl.innerHTML = `${t("correctAnswerWas")} <strong>${question.correctAnswer}</strong><br><span class="response-meaning">(${question.responseTranslation})</span>`;
    } else {
      correctAnswerEl.textContent = `${t("correctAnswerWas")} ${question.correctAnswer}`;
    }
  }
  const explanationEl = document.getElementById("feedback-explanation");
  if (question.culture) {
    explanationEl.innerHTML = `<div class="cultural-note"><span class="cultural-note-label">${t("culturalNote")}</span>${question.culture}</div>`;
  } else if (question.explanation) {
    explanationEl.textContent = question.explanation;
  } else {
    explanationEl.textContent = "";
  }
  if (battle.type !== "train") {
    if (isCorrect) {
      const damagePercent = 0.25;
      const damage = Math.max(10, Math.floor(battle.enemyStrength * damagePercent));
      battle.enemyStrength = Math.max(0, battle.enemyStrength - damage);
      DEBUG.log(`Dealt ${damage} damage to enemies. Remaining: ${battle.enemyStrength}`);
    } else {
      GameState.army = Math.max(100, GameState.army - Math.floor(GameState.army * 0.08));
    }
  }
  updateBattleUI();
  document.getElementById("submit-answer").classList.add("hidden");
  document.getElementById("next-question").classList.remove("hidden");
  const totalQuestions = ((_a = GameState.currentBattle) == null ? void 0 : _a.questionCount) || GameState.currentQuestions.length;
  const isLastQuestion = GameState.currentQuestionIndex >= totalQuestions - 1;
  document.getElementById("next-question").textContent = isLastQuestion ? "See Results" : "Next Challenge";
}
function nextQuestion() {
  GameState.currentQuestionIndex++;
  if (GameState.currentQuestionIndex >= GameState.currentQuestions.length) {
    endBattle();
  } else {
    showQuestion();
  }
}
function endBattle() {
  var _a;
  const battle = GameState.currentBattle;
  const node = battle.node;
  const totalQuestions = battle.questionCount || GameState.currentQuestions.length || 5;
  const correctRatio = GameState.correctAnswers / totalQuestions;
  const difficulty = battle.difficulty || "soldier";
  DEBUG.log("Battle ended:", {
    node: node.name,
    type: battle.type,
    difficulty,
    correctAnswers: GameState.correctAnswers,
    totalQuestions,
    correctRatio: (correctRatio * 100).toFixed(1) + "%",
    remainingEnemies: battle.enemyStrength,
    startingEnemies: battle.startingEnemyStrength
  });
  let result = {
    title: "",
    message: "",
    icon: "",
    territoryChange: "",
    armyChange: 0
  };
  if (correctRatio >= 0.6) {
    if (!GameState.completedLessons[node.id]) {
      GameState.completedLessons[node.id] = {};
    }
    GameState.completedLessons[node.id][difficulty] = true;
  }
  if (battle.type === "train") {
    result.title = t("trainingComplete");
    result.icon = "📚";
    result.message = `${t("studiedLesson")} ${((_a = LESSONS[node.lessonType]) == null ? void 0 : _a.englishName) || "K'iche'"}.`;
    if (correctRatio >= 0.6) {
      result.message += ` (${t(difficulty)} ${t("level")} ✓)`;
    }
    result.territoryChange = t("na");
    result.armyChange = Math.floor(correctRatio * 30);
    GameState.army += result.armyChange;
    GameState.morale = Math.min(100, GameState.morale + Math.floor(correctRatio * 5));
  } else if (correctRatio >= 0.8) {
    result.title = t("victory");
    result.icon = "🏆";
    GameState.battlesWon++;
    node.status = "kiche";
    node.spanishStrength = 0;
    result.message = `${t("masteryInspires")} ${node.name} ${t("liberated")}`;
    result.territoryChange = t("captured");
    result.armyChange = 50;
    GameState.army += result.armyChange;
    GameState.morale = Math.min(100, GameState.morale + 10);
  } else if (correctRatio >= 0.6) {
    result.icon = "⚔️";
    GameState.battlesWon++;
    const remainingEnemies = battle.enemyStrength;
    if (remainingEnemies <= 0 || remainingEnemies < battle.startingEnemyStrength * 0.2) {
      result.title = t("hardFoughtVictory");
      node.status = "kiche";
      node.spanishStrength = 0;
      result.message = `${node.name} ${t("liberated")}`;
      result.territoryChange = t("captured");
    } else {
      result.title = t("pushedBack");
      node.status = "contested";
      node.spanishStrength = remainingEnemies;
      result.message = `${t("enemiesWeakened")} ${node.name}. ${remainingEnemies} ${t("soldiersRemain")}`;
      result.territoryChange = t("contested");
    }
    result.armyChange = -30;
    GameState.army = Math.max(100, GameState.army + result.armyChange);
  } else if (correctRatio >= 0.4) {
    result.title = t("stalemate");
    result.icon = "🛡️";
    node.status = "contested";
    node.spanishStrength = Math.max(battle.enemyStrength, Math.floor(battle.startingEnemyStrength * 0.3));
    result.message = `${t("neitherGains")} ${node.name}. ${t("struggleContinues")}`;
    result.territoryChange = t("contested");
    result.armyChange = -60;
    GameState.army = Math.max(100, GameState.army + result.armyChange);
    GameState.morale = Math.max(20, GameState.morale - 5);
  } else {
    result.title = t("defeat");
    result.icon = "💀";
    GameState.battlesLost++;
    node.status = "spanish";
    node.spanishStrength = Math.max(battle.enemyStrength, Math.floor(battle.startingEnemyStrength * 0.6));
    result.message = `${t("attackFails")} ${node.name}.`;
    result.territoryChange = t("lost");
    result.armyChange = -100;
    GameState.army = Math.max(100, GameState.army + result.armyChange);
    GameState.morale = Math.max(10, GameState.morale - 15);
    retreatToSafeNode();
  }
  GameState.mastery = Math.min(100, Math.floor(GameState.wordsLearned.size / 80 * 100));
  const titleEl = document.getElementById("result-title");
  titleEl.textContent = result.title;
  titleEl.className = correctRatio >= 0.6 ? "victory" : correctRatio >= 0.4 ? "draw" : "defeat";
  document.getElementById("result-icon").textContent = result.icon;
  document.getElementById("result-message").textContent = result.message;
  document.getElementById("correct-count").textContent = `${GameState.correctAnswers}/${totalQuestions}`;
  document.getElementById("territory-result").textContent = result.territoryChange;
  document.getElementById("army-change").textContent = String(result.armyChange >= 0 ? `+${result.armyChange}` : result.armyChange);
  document.getElementById("words-learned").textContent = String(GameState.wordsLearned.size);
  autoSave();
  showScreen("result");
}
function retreatToSafeNode() {
  const currentPos = GameState.armyPosition;
  const adjacentIds = GameState.edges.filter((e) => e.from === currentPos || e.to === currentPos).map((e) => e.from === currentPos ? e.to : e.from);
  for (const adjId of adjacentIds) {
    const node = GameState.nodes.find((n) => n.id === adjId);
    if (node && node.status === "kiche") {
      GameState.armyPosition = adjId;
      return;
    }
  }
  GameState.armyPosition = "qumarkaj";
}
function advanceTurn() {
  GameState.turn++;
  GameState.month++;
  if (GameState.month > 12) {
    GameState.month = 1;
    GameState.year++;
  }
  spanishTurn();
  if (checkGameOver()) return;
  autoSave();
  updateStats();
  renderMap();
}
function spanishTurn() {
  const spanishNodes = GameState.nodes.filter((n) => n.status === "spanish");
  if (spanishNodes.length > 0) {
    const vulnerableNodes = GameState.nodes.filter((n) => {
      if (n.status !== "kiche" || n.isCapital) return false;
      if (!GameState.revealedNodes.has(n.id)) return false;
      const adjacentIds = GameState.edges.filter((e) => e.from === n.id || e.to === n.id).map((e) => e.from === n.id ? e.to : e.from);
      return adjacentIds.some((adjId) => {
        const adjNode = GameState.nodes.find((nd) => nd.id === adjId);
        return adjNode && adjNode.status === "spanish";
      });
    });
    if (vulnerableNodes.length > 0 && Math.random() < 0.15) {
      const targetNode = vulnerableNodes[Math.floor(Math.random() * vulnerableNodes.length)];
      targetNode.status = "contested";
      targetNode.spanishStrength = 100 + Math.floor(Math.random() * 100);
      showAttackAlert(targetNode);
    }
  }
  GameState.nodes.filter((n) => n.status === "contested").forEach((n) => {
    const adjacentIds = GameState.edges.filter((e) => e.from === n.id || e.to === n.id).map((e) => e.from === n.id ? e.to : e.from);
    const hasSpanishSupply = adjacentIds.some((adjId) => {
      const adjNode = GameState.nodes.find((nd) => nd.id === adjId);
      return adjNode && adjNode.status === "spanish";
    });
    if (hasSpanishSupply) {
      n.spanishStrength = Math.min(300, n.spanishStrength + 10);
    }
  });
  GameState.nodes.filter((n) => n.status === "spanish").forEach((n) => {
    n.spanishStrength = Math.min(350, (n.spanishStrength || 200) + 5);
  });
}
function showAttackAlert(node) {
  GameState.activeAttack = node;
  const alert = document.getElementById("attack-alert");
  alert.classList.remove("hidden");
  document.getElementById("alert-message").textContent = `${t("spanishAttacking")} ${node.name}! ${t("peopleNeedHelp")}`;
  document.getElementById("btn-rush-defend").onclick = () => {
    alert.classList.add("hidden");
    GameState.armyPosition = node.id;
    revealAdjacentNodes(node.id);
    renderMap();
    updateArmyMarker();
    startBattle(node, "defend");
  };
  document.getElementById("btn-ignore-attack").onclick = () => {
    alert.classList.add("hidden");
    node.status = "spanish";
    node.spanishStrength = 250;
    GameState.morale = Math.max(10, GameState.morale - 10);
    renderMap();
  };
}
function continueCampaign() {
  advanceTurn();
  if (checkGameOver()) return;
  deselectNode();
  updateStats();
  renderMap();
  showScreen("map");
}
function checkGameOver() {
  const capital = GameState.nodes.find((n) => n.isCapital);
  const finalBoss = GameState.nodes.find((n) => n.id === "antigua");
  if (finalBoss && finalBoss.status === "kiche") {
    showGameOver(true);
    return true;
  }
  if (capital && capital.status !== "kiche") {
    showGameOver(false);
    return true;
  }
  if (GameState.army <= 0) {
    showGameOver(false);
    return true;
  }
  return false;
}
function showGameOver(victory) {
  const titleEl = document.getElementById("gameover-title");
  const messageEl = document.getElementById("gameover-message");
  if (victory) {
    titleEl.textContent = t("victoryTitle");
    titleEl.className = "victory";
    messageEl.textContent = t("victoryMessage");
  } else {
    titleEl.textContent = t("defeatTitle");
    titleEl.className = "defeat";
    messageEl.textContent = t("defeatMessage");
  }
  deleteSave();
  document.getElementById("final-turns").textContent = String(GameState.turn);
  document.getElementById("final-words").textContent = String(GameState.wordsLearned.size);
  document.getElementById("final-battles").textContent = String(GameState.battlesWon);
  showScreen("gameover");
}
function showScreen(screenName) {
  const screens = {
    title: document.getElementById("title-screen"),
    map: document.getElementById("map-screen"),
    tutorial: document.getElementById("tutorial-screen"),
    battle: document.getElementById("battle-screen"),
    result: document.getElementById("result-screen"),
    gameover: document.getElementById("gameover-screen")
  };
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
  if (screenName === "map") {
    requestAnimationFrame(() => {
      resizeCanvas();
    });
  }
}
function updateStats() {
  document.getElementById("army-count").textContent = String(GameState.army);
  document.getElementById("morale").textContent = `${GameState.morale}%`;
  document.getElementById("mastery").textContent = `${GameState.mastery}%`;
  document.getElementById("turn-number").textContent = String(GameState.turn);
  document.getElementById("year").textContent = String(GameState.year);
}
function startGame() {
  DEBUG.log("startGame called");
  GameState.army = 1e3;
  GameState.morale = 100;
  GameState.mastery = 0;
  GameState.wordsLearned = /* @__PURE__ */ new Set();
  GameState.battlesWon = 0;
  GameState.battlesLost = 0;
  GameState.turn = 1;
  GameState.year = 1524;
  GameState.month = 2;
  GameState.camera = { x: 0, y: 0 };
  GameState.selectedNode = null;
  GameState.activeAttack = null;
  GameState.completedLessons = {};
  const { nodes, edges } = generateMap();
  GameState.nodes = nodes;
  GameState.edges = edges;
  if (DEBUG.enabled) {
    GameState.revealedNodes = new Set(nodes.map((n) => n.id));
    DEBUG.log("All nodes revealed:", GameState.revealedNodes.size, "nodes");
  } else {
    GameState.revealedNodes = /* @__PURE__ */ new Set(["qumarkaj"]);
    revealAdjacentNodes("qumarkaj");
  }
  GameState.armyPosition = "qumarkaj";
  autoSave();
  showScreen("map");
  const startNode = nodes.find((n) => n.id === "qumarkaj");
  updateStats();
  if (startNode) {
    requestAnimationFrame(() => {
      resizeCanvas();
      centerCameraOnNode(startNode, false);
    });
  } else {
    renderMap();
  }
}
function restartGame() {
  checkForSavedGame();
  showScreen("title");
}
function setupEventListeners() {
  const startBtn = document.getElementById("start-game");
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }
  document.getElementById("campaign-map").addEventListener("click", handleMapClick);
  document.getElementById("close-panel").addEventListener("click", deselectNode);
  document.getElementById("submit-answer").addEventListener("click", submitAnswer);
  document.getElementById("next-question").addEventListener("click", nextQuestion);
  document.getElementById("answer-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitAnswer();
  });
  document.getElementById("tutorial-prev").addEventListener("click", tutorialPrev);
  document.getElementById("tutorial-next").addEventListener("click", tutorialNext);
  document.getElementById("start-quiz").addEventListener("click", startQuizFromTutorial);
  document.getElementById("continue-campaign").addEventListener("click", continueCampaign);
  document.getElementById("restart-game").addEventListener("click", restartGame);
  document.getElementById("save-quit").addEventListener("click", saveAndQuit);
  document.getElementById("continue-game").addEventListener("click", loadGame);
}
const SAVE_KEY = "tecunuman_save";
function autoSave() {
  try {
    saveGame();
    DEBUG.log("Game auto-saved");
  } catch (e) {
    DEBUG.log("Auto-save failed:", e);
  }
}
function saveGame() {
  const saveData = {
    // Player resources
    army: GameState.army,
    morale: GameState.morale,
    mastery: GameState.mastery,
    wordsLearned: Array.from(GameState.wordsLearned),
    battlesWon: GameState.battlesWon,
    battlesLost: GameState.battlesLost,
    // Campaign progress
    turn: GameState.turn,
    year: GameState.year,
    month: GameState.month,
    // Army position
    armyPosition: GameState.armyPosition,
    // Map state - save node statuses
    nodeStatuses: GameState.nodes.map((n) => ({
      id: n.id,
      status: n.status,
      spanishStrength: n.spanishStrength
    })),
    // Revealed nodes
    revealedNodes: Array.from(GameState.revealedNodes),
    // Completed lessons
    completedLessons: GameState.completedLessons,
    // Camera position
    camera: GameState.camera,
    // Save timestamp
    savedAt: Date.now()
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.error("Failed to save game:", e);
    return false;
  }
}
function loadGame() {
  try {
    const saveDataStr = localStorage.getItem(SAVE_KEY);
    if (!saveDataStr) return false;
    const saveData = JSON.parse(saveDataStr);
    const { nodes, edges } = generateMap();
    GameState.nodes = nodes;
    GameState.edges = edges;
    GameState.army = saveData.army;
    GameState.morale = saveData.morale;
    GameState.mastery = saveData.mastery;
    GameState.wordsLearned = new Set(saveData.wordsLearned);
    GameState.battlesWon = saveData.battlesWon;
    GameState.battlesLost = saveData.battlesLost;
    GameState.turn = saveData.turn;
    GameState.year = saveData.year;
    GameState.month = saveData.month;
    GameState.armyPosition = saveData.armyPosition;
    if (saveData.nodeStatuses) {
      for (const savedNode of saveData.nodeStatuses) {
        const node = GameState.nodes.find((n) => n.id === savedNode.id);
        if (node) {
          node.status = savedNode.status;
          node.spanishStrength = savedNode.spanishStrength;
        }
      }
    }
    GameState.revealedNodes = new Set(saveData.revealedNodes);
    GameState.completedLessons = saveData.completedLessons || {};
    if (saveData.camera) {
      GameState.camera = saveData.camera;
    }
    GameState.selectedNode = null;
    GameState.activeAttack = null;
    GameState.currentBattle = null;
    updateStats();
    showScreen("map");
    requestAnimationFrame(() => {
      resizeCanvas();
    });
    return true;
  } catch (e) {
    console.error("Failed to load game:", e);
    return false;
  }
}
function hasSavedGame() {
  try {
    const saveData = localStorage.getItem(SAVE_KEY);
    return saveData !== null;
  } catch (e) {
    return false;
  }
}
function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.error("Failed to delete save:", e);
  }
}
function saveAndQuit() {
  if (saveGame()) {
    showScreen("title");
    checkForSavedGame();
  }
}
function checkForSavedGame() {
  const continueBtn = document.getElementById("continue-game");
  const hasSave = hasSavedGame();
  DEBUG.log("Checking for saved game:", hasSave);
  if (hasSave) {
    continueBtn.classList.remove("hidden");
  } else {
    continueBtn.classList.add("hidden");
  }
}
function initializeGame() {
  initI18n();
  initCanvas();
  setupEventListeners();
  checkForSavedGame();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}
window.LESSONS = LESSONS$1;
window.setDifficulty = setDifficulty$1;
window.getDifficulty = getDifficulty$1;
window.generateLessonQuestions = generateLessonQuestions$1;
window.checkLessonAnswer = checkLessonAnswer$1;
window.CULTURAL_VOCABULARY = CULTURAL_VOCABULARY$1;
window.VOCABULARY_ANIMALS = VOCABULARY_ANIMALS$1;
window.VOCABULARY_WARFARE = VOCABULARY_WARFARE$1;
window.VOCABULARY_PLACES = VOCABULARY_PLACES$1;
window.VOCABULARY_SPIRITUAL = VOCABULARY_SPIRITUAL$1;
window.VOCABULARY_ADVANCED = VOCABULARY_ADVANCED$1;
window.NEGATION_CONTENT = NEGATION_CONTENT$1;
window.GREETINGS_CONTENT = GREETINGS_CONTENT$1;
window.NUMBERS_CONTENT = NUMBERS_CONTENT$1;
window.PRONOUNS_CONTENT = PRONOUNS_CONTENT$1;
window.POSSESSION_CONTENT = POSSESSION_CONTENT$1;
window.VERBS_CONTENT = VERBS_CONTENT$1;
window.COMMANDS_CONTENT = COMMANDS_CONTENT$1;
window.EXISTENTIAL_CONTENT = EXISTENTIAL_CONTENT$1;
window.QUESTIONS_CONTENT = QUESTIONS_CONTENT$1;
window.ADJECTIVES_CONTENT = ADJECTIVES_CONTENT$1;
