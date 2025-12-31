// ========================================
// MAP GENERATION
// ========================================

// Node types determine lesson content
export const NODE_TYPES = {
    START: { lesson: 'vocabulary', icon: '🏛️', name: 'Capital' },
    VOCABULARY: { lesson: 'vocabulary', icon: '📚', name: 'Village' },
    GREETINGS: { lesson: 'greetings', icon: '👋', name: 'Trading Post' },
    PRONOUNS: { lesson: 'pronouns', icon: '👤', name: 'Sacred Grove' },
    POSSESSION: { lesson: 'possession', icon: '🏠', name: 'Fortress' },
    NEGATION: { lesson: 'negation', icon: '🚫', name: 'Watchtower' },
    VERBS: { lesson: 'intransitive_verbs', icon: '🚶', name: 'Training Ground' },
    NUMBERS: { lesson: 'numbers', icon: '🔢', name: 'Counting House' },
    EXISTENTIAL: { lesson: 'existential', icon: '✨', name: 'Temple' },
    QUESTIONS: { lesson: 'questions', icon: '❓', name: 'Council Hall' },
    COMMANDS: { lesson: 'commands', icon: '👆', name: 'War Camp' },
    ADJECTIVES: { lesson: 'adjectives', icon: '🎨', name: 'Artisan Quarter' },
    SPANISH_FORT: { lesson: 'vocabulary', icon: '🏰', name: 'Spanish Fort' },
};

// Generate Guatemala-based map with geographic accuracy
// The K'iche' heartland is in the western highlands
// Map coordinates roughly: x = west-east, y = north-south
export function generateMap() {
    const nodes = [];
    const edges = [];

    // Map dimensions - covers Guatemala's western highlands
    const MAP_WIDTH = 2400;
    const MAP_HEIGHT = 2000;

    // Geographic reference points (scaled to our map)
    // Guatemala's K'iche' region is roughly 14.5°N to 15.5°N, 90°W to 92°W
    // We'll center Q'umarkaj (Santa Cruz del Quiché) and expand from there

    // Helper to create nodes with requirements
    function createNode(config: any) {
        const nodeType = Object.keys(NODE_TYPES).find(
            key => (NODE_TYPES as any)[key].lesson === config.lessonType && key !== 'START' && key !== 'SPANISH_FORT'
        ) || 'VOCABULARY';

        return {
            id: config.id,
            x: config.x,
            y: config.y,
            type: config.isSpanish ? 'SPANISH_FORT' : (config.isCapital ? 'START' : nodeType),
            name: config.name,
            description: config.description,
            status: config.status || 'kiche',
            isCapital: config.isCapital || false,
            revealed: config.revealed || false,
            spanishStrength: config.spanishStrength || 0,
            lessonType: config.lessonType,
            requires: config.requires || [], // Array of {nodeId, difficulty} requirements
            region: config.region || 'highlands',
            isFinalBoss: config.isFinalBoss || false,
        };
    }

    // ========================================
    // K'ICHE' HEARTLAND (Center of map)
    // ========================================

    // Q'umarkaj - The Capital (Santa Cruz del Quiché area)
    nodes.push(createNode({
        id: 'qumarkaj',
        x: 1000, y: 900,
        name: "Q'umarkaj",
        description: "The sacred capital of the K'iche' Kingdom, seat of the Ajpop. Your journey begins here in the heart of Iximulew (Guatemala).",
        lessonType: 'vocabulary',
        status: 'kiche',
        isCapital: true,
        revealed: true,
        region: 'quiche',
    }));

    // Chichicastenango - South of Q'umarkaj
    nodes.push(createNode({
        id: 'chichi',
        x: 1100, y: 1100,
        name: "Chichicastenango",
        description: "The sacred market town, home to the Popol Vuh manuscript. Learn greetings used in the famous market.",
        lessonType: 'greetings',
        status: 'kiche',
        revealed: true,
        region: 'quiche',
    }));

    // Sacapulas - North of Q'umarkaj (salt trade route)
    nodes.push(createNode({
        id: 'sacapulas',
        x: 1050, y: 650,
        name: "Sacapulas",
        description: "Ancient salt-trading town along the Río Negro. Learn to count and trade.",
        lessonType: 'numbers',
        status: 'kiche',
        revealed: true,
        region: 'quiche',
    }));

    // ========================================
    // WESTERN ROUTE - Toward Xelaju (Quetzaltenango)
    // ========================================

    // Totonicapán - West of Q'umarkaj
    nodes.push(createNode({
        id: 'totonicapan',
        x: 700, y: 850,
        name: "Totonicapán",
        description: "Highland city of artisans. Learn adjectives to describe their beautiful crafts.",
        lessonType: 'adjectives',
        status: 'kiche',
        requires: [{nodeId: 'qumarkaj', difficulty: 'soldier'}],
        region: 'quiche',
    }));

    // Quetzaltenango (Xelaju) - Major western city
    nodes.push(createNode({
        id: 'xelaju',
        x: 400, y: 900,
        name: "Xelaju",
        description: "The great city of Quetzaltenango. Master commands to lead the warriors here.",
        lessonType: 'commands',
        status: 'contested',
        spanishStrength: 250,
        requires: [{nodeId: 'totonicapan', difficulty: 'soldier'}],
        region: 'quiche',
    }));

    // Zunil - Southwest of Xelaju (hot springs)
    nodes.push(createNode({
        id: 'zunil',
        x: 350, y: 1100,
        name: "Zunil",
        description: "Village of sacred hot springs. Learn about existence and being.",
        lessonType: 'existential',
        status: 'kiche',
        requires: [{nodeId: 'xelaju', difficulty: 'soldier'}],
        region: 'quiche',
    }));

    // Huehuetenango - Far northwest
    nodes.push(createNode({
        id: 'huehue',
        x: 250, y: 600,
        name: "Huehuetenango",
        description: "The Mam Maya stronghold. Learn the vocabulary of war and resistance.",
        lessonType: 'vocabulary_warfare',
        status: 'contested',
        spanishStrength: 200,
        requires: [{nodeId: 'xelaju', difficulty: 'warrior'}],
        region: 'mam',
    }));

    // Zaculeu - Ancient Mam capital
    nodes.push(createNode({
        id: 'zaculeu',
        x: 200, y: 500,
        name: "Zaculeu",
        description: "The ancient Mam capital. Learn the geography and places of the highlands.",
        lessonType: 'vocabulary_places',
        status: 'spanish',
        spanishStrength: 350,
        requires: [{nodeId: 'huehue', difficulty: 'soldier'}],
        region: 'mam',
    }));

    // ========================================
    // NORTHERN ROUTE - Ixil Triangle
    // ========================================

    // Nebaj - Northern highlands (Ixil)
    nodes.push(createNode({
        id: 'nebaj',
        x: 1200, y: 450,
        name: "Nebaj",
        description: "Heart of the Ixil Maya territory. Learn pronouns and forms of address.",
        lessonType: 'pronouns',
        status: 'kiche',
        requires: [{nodeId: 'sacapulas', difficulty: 'soldier'}],
        region: 'ixil',
    }));

    // Chajul - East of Nebaj
    nodes.push(createNode({
        id: 'chajul',
        x: 1400, y: 400,
        name: "Chajul",
        description: "Remote Ixil village. Master negation to defend against Spanish lies.",
        lessonType: 'negation',
        status: 'kiche',
        requires: [{nodeId: 'nebaj', difficulty: 'soldier'}],
        region: 'ixil',
    }));

    // Cotzal - Southeast of Nebaj
    nodes.push(createNode({
        id: 'cotzal',
        x: 1350, y: 550,
        name: "San Juan Cotzal",
        description: "Complete the Ixil triangle. Learn verbs of movement and action.",
        lessonType: 'intransitive_verbs',
        status: 'kiche',
        requires: [{nodeId: 'nebaj', difficulty: 'soldier'}],
        region: 'ixil',
    }));

    // Uspantán - East, toward Verapaz
    nodes.push(createNode({
        id: 'uspantan',
        x: 1550, y: 500,
        name: "Uspantán",
        description: "Gateway to the Verapaz region. Birthplace of Rigoberta Menchú.",
        lessonType: 'questions',
        status: 'contested',
        spanishStrength: 180,
        requires: [{nodeId: 'chajul', difficulty: 'soldier'}, {nodeId: 'cotzal', difficulty: 'soldier'}],
        region: 'quiche',
    }));

    // ========================================
    // SOUTHERN ROUTE - Lake Atitlán
    // ========================================

    // Sololá - South toward Lake Atitlán (contested - Spanish advancing!)
    nodes.push(createNode({
        id: 'solola',
        x: 900, y: 1200,
        name: "Sololá",
        description: "Gateway to Lake Atitlán. Spanish forces are advancing from the south! Learn about possession and ownership to rally the defenders.",
        lessonType: 'possession',
        status: 'contested',
        spanishStrength: 150,
        revealed: true, // Visible from start - shows the Spanish threat
        requires: [{nodeId: 'chichi', difficulty: 'soldier'}],
        region: 'kaqchikel',
    }));

    // Panajachel - Lake Atitlán shore
    nodes.push(createNode({
        id: 'panajachel',
        x: 850, y: 1400,
        name: "Panajachel",
        description: "Beautiful shores of Lake Atitlán, the navel of the world. Learn the animals of the lake.",
        lessonType: 'vocabulary_animals',
        status: 'kiche',
        requires: [{nodeId: 'solola', difficulty: 'soldier'}],
        region: 'kaqchikel',
    }));

    // Santiago Atitlán - Across the lake
    nodes.push(createNode({
        id: 'santiago',
        x: 700, y: 1500,
        name: "Santiago Atitlán",
        description: "Home of Maximón. The Tz'utujil Maya allies await.",
        lessonType: 'existential',
        status: 'kiche',
        requires: [{nodeId: 'panajachel', difficulty: 'soldier'}],
        region: 'tzutujil',
    }));

    // ========================================
    // EASTERN ROUTE - Toward Cobán and Verapaz
    // ========================================

    // Joyabaj - East of Q'umarkaj
    nodes.push(createNode({
        id: 'joyabaj',
        x: 1300, y: 900,
        name: "Joyabaj",
        description: "Eastern K'iche' town known for its dances. Practice greetings.",
        lessonType: 'greetings',
        status: 'kiche',
        requires: [{nodeId: 'qumarkaj', difficulty: 'soldier'}],
        region: 'quiche',
    }));

    // Rabinal - Further east (Achi Maya)
    nodes.push(createNode({
        id: 'rabinal',
        x: 1550, y: 850,
        name: "Rabinal",
        description: "Home of the Rabinal Achí dance-drama. The Achi Maya join your cause.",
        lessonType: 'commands',
        status: 'contested',
        spanishStrength: 200,
        requires: [{nodeId: 'joyabaj', difficulty: 'warrior'}],
        region: 'achi',
    }));

    // Salamá - Toward Baja Verapaz
    nodes.push(createNode({
        id: 'salama',
        x: 1700, y: 750,
        name: "Salamá",
        description: "Capital of Baja Verapaz. Spanish missionaries are active here.",
        lessonType: 'negation',
        status: 'spanish',
        spanishStrength: 280,
        requires: [{nodeId: 'rabinal', difficulty: 'soldier'}],
        region: 'verapaz',
    }));

    // Cobán - Alta Verapaz (Q'eqchi' territory)
    nodes.push(createNode({
        id: 'coban',
        x: 1900, y: 600,
        name: "Cobán",
        description: "Heart of Q'eqchi' territory. Learn sacred and spiritual vocabulary.",
        lessonType: 'vocabulary_spiritual',
        status: 'spanish',
        spanishStrength: 320,
        requires: [{nodeId: 'salama', difficulty: 'soldier'}, {nodeId: 'uspantan', difficulty: 'soldier'}],
        region: 'verapaz',
    }));

    // ========================================
    // SOUTHEAST - Toward the Capital
    // ========================================

    // Tecpán - Southeast, Kaqchikel territory
    nodes.push(createNode({
        id: 'tecpan',
        x: 1200, y: 1300,
        name: "Tecpán Guatemala",
        description: "Near the ancient Kaqchikel capital of Iximche.",
        lessonType: 'pronouns',
        status: 'contested',
        spanishStrength: 220,
        requires: [{nodeId: 'solola', difficulty: 'soldier'}, {nodeId: 'chichi', difficulty: 'warrior'}],
        region: 'kaqchikel',
    }));

    // Chimaltenango - Further southeast
    nodes.push(createNode({
        id: 'chimaltenango',
        x: 1400, y: 1400,
        name: "Chimaltenango",
        description: "Gateway to the central valley. Spanish forces are strong here.",
        lessonType: 'intransitive_verbs',
        status: 'spanish',
        spanishStrength: 300,
        requires: [{nodeId: 'tecpan', difficulty: 'warrior'}],
        region: 'kaqchikel',
    }));

    // Antigua Guatemala - Major Spanish stronghold
    nodes.push(createNode({
        id: 'antigua',
        x: 1500, y: 1550,
        name: "Antigua Guatemala",
        description: "The Spanish colonial capital. A major battle awaits.",
        lessonType: 'questions',
        status: 'spanish',
        spanishStrength: 400,
        requires: [{nodeId: 'chimaltenango', difficulty: 'warrior'}],
        region: 'central',
    }));

    // ========================================
    // PACIFIC COAST - Southern expansion
    // ========================================

    // Mazatenango - Pacific lowlands
    nodes.push(createNode({
        id: 'mazatenango',
        x: 500, y: 1400,
        name: "Mazatenango",
        description: "Gateway to the Pacific coast. Rich cacao-growing region.",
        lessonType: 'numbers',
        status: 'contested',
        spanishStrength: 180,
        requires: [{nodeId: 'zunil', difficulty: 'soldier'}, {nodeId: 'santiago', difficulty: 'soldier'}],
        region: 'coast',
    }));

    // Retalhuleu - Further south
    nodes.push(createNode({
        id: 'retalhuleu',
        x: 350, y: 1550,
        name: "Retalhuleu",
        description: "Pacific coastal town. The Spanish import goods through here.",
        lessonType: 'adjectives',
        status: 'spanish',
        spanishStrength: 250,
        requires: [{nodeId: 'mazatenango', difficulty: 'warrior'}],
        region: 'coast',
    }));

    // ========================================
    // FINAL OBJECTIVES - Multiple paths converge
    // ========================================

    // Iximche - The Kaqchikel capital (Spanish HQ)
    nodes.push(createNode({
        id: 'iximche',
        x: 1300, y: 1500,
        name: "Iximche",
        description: "The ancient Kaqchikel capital. Master advanced concepts and history.",
        lessonType: 'vocabulary_advanced',
        status: 'spanish',
        spanishStrength: 500,
        isSpanish: true,
        requires: [
            {nodeId: 'tecpan', difficulty: 'hero'},
            {nodeId: 'antigua', difficulty: 'warrior'},
        ],
        region: 'kaqchikel',
        isFinalBoss: true,
    }));

    // ========================================
    // CREATE EDGES (connections between nodes)
    // ========================================

    // Edges are created based on geographic proximity and requirements
    const connections = [
        // From Q'umarkaj (center hub)
        ['qumarkaj', 'chichi'],
        ['qumarkaj', 'sacapulas'],
        ['qumarkaj', 'totonicapan'],
        ['qumarkaj', 'joyabaj'],

        // Western route
        ['totonicapan', 'xelaju'],
        ['xelaju', 'zunil'],
        ['xelaju', 'huehue'],
        ['huehue', 'zaculeu'],

        // Northern route (Ixil)
        ['sacapulas', 'nebaj'],
        ['nebaj', 'chajul'],
        ['nebaj', 'cotzal'],
        ['chajul', 'uspantan'],
        ['cotzal', 'uspantan'],

        // Southern route (Lake Atitlán)
        ['chichi', 'solola'],
        ['solola', 'panajachel'],
        ['panajachel', 'santiago'],

        // Eastern route
        ['joyabaj', 'rabinal'],
        ['rabinal', 'salama'],
        ['salama', 'coban'],
        ['uspantan', 'coban'],

        // Southeast route
        ['solola', 'tecpan'],
        ['chichi', 'tecpan'],
        ['tecpan', 'chimaltenango'],
        ['chimaltenango', 'antigua'],
        ['tecpan', 'iximche'],
        ['antigua', 'iximche'],

        // Pacific coast
        ['zunil', 'mazatenango'],
        ['santiago', 'mazatenango'],
        ['mazatenango', 'retalhuleu'],

        // Cross-connections (loop backs)
        ['totonicapan', 'sacapulas'], // Mountain route
        ['zunil', 'santiago'], // Lake western shore
        ['rabinal', 'uspantan'], // Northern traverse
        ['joyabaj', 'cotzal'], // Eastern-northern link
    ];

    for (const [from, to] of connections) {
        edges.push({ from, to });
    }

    return { nodes, edges };
}

export function generateNodeDescription(nodeType: string, lessonType: string) {
    const descriptions: Record<string, string> = {
        greetings: "A bustling trading post where merchants exchange formal greetings.",
        pronouns: "A sacred grove where elders teach the proper forms of address.",
        possession: "A mountain fortress protecting valuable treasures.",
        negation: "A watchtower where scouts learn to report what they don't see.",
        intransitive_verbs: "Training grounds where warriors practice their movements.",
        numbers: "The counting house where tribute is calculated.",
        existential: "An ancient temple dedicated to existence and being.",
        questions: "The council hall where important questions are decided.",
        commands: "A war camp where orders must be given clearly.",
        adjectives: "The artisan quarter known for beautiful craftsmanship.",
        vocabulary: "A village where everyday K'iche' is spoken.",
    };
    return descriptions[lessonType] || "A strategic location in the highlands.";
}
