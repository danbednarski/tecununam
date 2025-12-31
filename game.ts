// ========================================
// TECUN UMAN - Campaign Strategy Game
// Expanded with army movement, branching paths,
// fog of war, and grammar lessons
// Guatemala-based geographic map
// ========================================

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
} from './src/types/index';

// ========================================
// MODULE IMPORTS
// ========================================
import { DEBUG, initDebugMode } from './src/game/debug';
import { GameState } from './src/game/state';
import { NODE_TYPES, generateMap, generateNodeDescription } from './src/game/map/generator';


// ========================================
// TYPE DECLARATIONS FOR GLOBALS
// (Set by main.ts before this script loads)
// ========================================
declare const t: (key: string) => string;
declare const initI18n: () => void;
declare const LESSONS: Record<string, Lesson>;
declare const getDifficulty: () => DifficultyLevel;
declare const setDifficulty: (difficulty: DifficultyLevel) => void;
declare const generateLessonQuestions: (lessonId: string, count: number, learnedWords: VocabularyItem[]) => Question[];
declare const checkLessonAnswer: (userAnswer: string, question: Question) => boolean;
declare const getCurrentLanguage: () => Language;
declare const CULTURAL_VOCABULARY: LessonContent;
declare const VOCABULARY_ANIMALS: LessonContent;
declare const VOCABULARY_WARFARE: LessonContent;
declare const VOCABULARY_PLACES: LessonContent;
declare const VOCABULARY_SPIRITUAL: LessonContent;
declare const VOCABULARY_ADVANCED: LessonContent;
declare const GREETINGS_CONTENT: LessonContent;
declare const NUMBERS_CONTENT: LessonContent;
declare const PRONOUNS_CONTENT: LessonContent;
declare const POSSESSION_CONTENT: LessonContent;
declare const NEGATION_CONTENT: LessonContent;
declare const VERBS_CONTENT: LessonContent;
declare const ADJECTIVES_CONTENT: LessonContent;
declare const COMMANDS_CONTENT: LessonContent;
declare const EXISTENTIAL_CONTENT: LessonContent;
declare const QUESTIONS_CONTENT: LessonContent;

// ========================================
// CANVAS RENDERING
// ========================================

let canvas, ctx;
const TILE_SIZE = 1;

function initCanvas() {
    canvas = document.getElementById('campaign-map');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse/touch events for panning
    const container = document.getElementById('map-container');
    
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('wheel', handleWheel);
    
    // Touch events
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
}

function resizeCanvas() {
    const container = document.getElementById('map-container');
    // Only resize if container has dimensions (is visible)
    if (container.clientWidth > 0 && container.clientHeight > 0) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        renderMap();
    }
}

function handleMouseDown(e) {
    if (e.target.closest('.territory-panel') || e.target.closest('.attack-alert')) return;
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
    
    // Clear canvas with jungle/highland gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a3d2e');
    gradient.addColorStop(0.5, '#0f2a1f');
    gradient.addColorStop(1, '#0a1f15');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw terrain texture
    drawTerrain();
    
    // Draw edges (paths between nodes)
    drawEdges();
    
    // Draw nodes
    drawNodes();
    
    // Update army marker position
    updateArmyMarker();
}

function drawTerrain() {
    // Draw Mayan-styled terrain with jungle canopy patches and highland textures
    
    // Jungle canopy patches
    ctx.fillStyle = 'rgba(34, 139, 34, 0.15)';
    for (let i = 0; i < 50; i++) {
        const x = (i * 197) % 2500 - GameState.camera.x;
        const y = (i * 131) % 2000 - GameState.camera.y;
        ctx.beginPath();
        ctx.arc(x, y, 40 + (i % 30), 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Highland terrain patches (darker jade)
    ctx.fillStyle = 'rgba(26, 77, 62, 0.25)';
    for (let i = 0; i < 80; i++) {
        const x = (i * 157) % 2500 - GameState.camera.x;
        const y = (i * 103) % 2000 - GameState.camera.y;
        ctx.beginPath();
        ctx.arc(x, y, 25 + (i % 20), 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Decorative stepped pyramid pattern tiles (faint)
    ctx.strokeStyle = 'rgba(212, 168, 67, 0.03)';
    ctx.lineWidth = 1;
    const tileSize = 100;
    const offsetX = GameState.camera.x % tileSize;
    const offsetY = GameState.camera.y % tileSize;
    
    for (let x = -offsetX; x < canvas.width + tileSize; x += tileSize) {
        for (let y = -offsetY; y < canvas.height + tileSize; y += tileSize) {
            // Draw stepped pattern
            ctx.beginPath();
            ctx.moveTo(x, y + tileSize/2);
            ctx.lineTo(x + tileSize/4, y + tileSize/2);
            ctx.lineTo(x + tileSize/4, y + tileSize/4);
            ctx.lineTo(x + tileSize/2, y + tileSize/4);
            ctx.lineTo(x + tileSize/2, y);
            ctx.stroke();
        }
    }
    
    // Mountain silhouettes in background
    ctx.fillStyle = 'rgba(10, 31, 21, 0.4)';
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

// Draw a Mayan-styled stepped tile/temple shape
function drawMayanTile(x, y, size, fillColor, strokeColor, isCapital) {
    const halfSize = size / 2;
    const step = size * 0.15;
    
    ctx.save();
    
    // Draw shadow
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    if (isCapital) {
        // Capital: stepped pyramid shape
        ctx.moveTo(x - halfSize + step, y - halfSize);
        ctx.lineTo(x + halfSize - step, y - halfSize);
        ctx.lineTo(x + halfSize, y - halfSize + step);
        ctx.lineTo(x + halfSize, y + halfSize - step);
        ctx.lineTo(x + halfSize - step, y + halfSize);
        ctx.lineTo(x - halfSize + step, y + halfSize);
        ctx.lineTo(x - halfSize, y + halfSize - step);
        ctx.lineTo(x - halfSize, y - halfSize + step);
    } else {
        // Regular: octagonal stone
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
    
    // Draw main shape
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
    
    // Create gradient fill for depth
    const gradient = ctx.createLinearGradient(x - halfSize, y - halfSize, x + halfSize, y + halfSize);
    gradient.addColorStop(0, lightenColor(fillColor, 20));
    gradient.addColorStop(0.5, fillColor);
    gradient.addColorStop(1, darkenColor(fillColor, 20));
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isCapital ? 4 : 3;
    ctx.stroke();
    
    // Draw inner decorative border for capitals
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
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Top highlight
    ctx.beginPath();
    ctx.moveTo(x - halfSize + step + 2, y - halfSize + 2);
    ctx.lineTo(x + halfSize - step - 2, y - halfSize + 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();
}

// Color helper functions
function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R},${G},${B})`;
}

function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return `rgb(${R},${G},${B})`;
}

function drawEdges() {
    for (const edge of GameState.edges) {
        const fromNode = GameState.nodes.find(n => n.id === edge.from);
        const toNode = GameState.nodes.find(n => n.id === edge.to);
        
        if (!fromNode || !toNode) continue;
        
        // Only draw if both nodes are revealed
        const fromRevealed = GameState.revealedNodes.has(fromNode.id);
        const toRevealed = GameState.revealedNodes.has(toNode.id);
        
        if (!fromRevealed && !toRevealed) continue;
        
        const x1 = fromNode.x - GameState.camera.x;
        const y1 = fromNode.y - GameState.camera.y;
        const x2 = toNode.x - GameState.camera.x;
        const y2 = toNode.y - GameState.camera.y;
        
        // Draw path shadow first
        ctx.beginPath();
        ctx.moveTo(x1 + 2, y1 + 2);
        ctx.lineTo(x2 + 2, y2 + 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // Draw main path - stone road style
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        
        if (!toRevealed) {
            // Path to unrevealed - mysterious
            ctx.strokeStyle = 'rgba(100, 80, 60, 0.4)';
            ctx.setLineDash([15, 10]);
            ctx.lineWidth = 4;
        } else {
            // Revealed path - stone road
            ctx.strokeStyle = 'rgba(139, 115, 85, 0.7)';
            ctx.setLineDash([]);
            ctx.lineWidth = 4;
        }
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw path decorations (small stones) for revealed paths
        if (toRevealed && fromRevealed) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const steps = Math.floor(dist / 30);
            
            ctx.fillStyle = 'rgba(212, 168, 67, 0.3)';
            for (let i = 1; i < steps; i++) {
                const t = i / steps;
                const px = x1 + dx * t;
                const py = y1 + dy * t;
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
        
        // Skip if off-screen
        if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) continue;
        
        // Draw node based on status - Mayan temple/tile style
        const size = node.isCapital ? 50 : 36;
        const halfSize = size / 2;
        
        if (!isRevealed) {
            // Fog of war - draw mysterious stone
            drawMayanTile(x, y, size, '#2a2a4a', '#3a3a5a', false);
            
            // Question mark glyph
            ctx.fillStyle = '#555';
            ctx.font = 'bold 22px Cinzel';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', x, y);
            continue;
        }
        
        // Determine colors based on status - richer Mayan palette
        let fillColor, strokeColor, glowColor;
        switch (node.status) {
            case 'kiche':
                fillColor = '#1a4d3e';
                strokeColor = '#3fa878';
                glowColor = 'rgba(63, 168, 120, 0.4)';
                break;
            case 'spanish':
                fillColor = '#6a1a1a';
                strokeColor = '#c41e3a';
                glowColor = 'rgba(196, 30, 58, 0.4)';
                break;
            case 'contested':
                fillColor = '#5a3a1a';
                strokeColor = '#d4a843';
                glowColor = 'rgba(212, 168, 67, 0.4)';
                break;
        }
        
        // Draw outer glow for current position
        if (node.id === GameState.armyPosition) {
            // Pulsing glow effect
            const glowSize = size + 20;
            const gradient = ctx.createRadialGradient(x, y, size/2, x, y, glowSize);
            gradient.addColorStop(0, 'rgba(63, 168, 120, 0.5)');
            gradient.addColorStop(0.5, 'rgba(63, 168, 120, 0.2)');
            gradient.addColorStop(1, 'rgba(63, 168, 120, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
        }
        
        // Draw Mayan-styled node (stepped temple shape)
        drawMayanTile(x, y, size, fillColor, strokeColor, node.isCapital);
        
        // Draw icon with shadow
        const typeInfo = NODE_TYPES[node.type];
        ctx.font = node.isCapital ? '26px Arial' : '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText(typeInfo.icon, x + 1, y + 2);
        // Icon
        ctx.fillStyle = '#fff';
        ctx.fillText(typeInfo.icon, x, y);
        
        // Draw contested indicator with glow
        if (node.status === 'contested') {
            ctx.font = '16px Arial';
            ctx.fillStyle = 'rgba(212, 168, 67, 0.8)';
            ctx.fillText('⚔️', x + halfSize - 3, y - halfSize + 3);
        }
        
        // Draw node name with better styling
        ctx.fillStyle = '#f4e4bc';
        ctx.font = 'bold 11px Cinzel';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(node.name, x, y + halfSize + 15);
        ctx.shadowBlur = 0;
        
        // Make clickable area
        node._screenX = x;
        node._screenY = y;
        node._radius = halfSize;
    }
}

function updateArmyMarker() {
    const armyMarker = document.getElementById('army-marker');
    const currentNode = GameState.nodes.find(n => n.id === GameState.armyPosition);
    
    if (!currentNode) {
        armyMarker.style.display = 'none';
        return;
    }
    
    const x = currentNode.x - GameState.camera.x;
    const y = currentNode.y - GameState.camera.y;
    
    armyMarker.style.display = 'block';
    armyMarker.style.left = `${x}px`;
    armyMarker.style.top = `${y - 25}px`;
}

// Handle canvas clicks
function handleMapClick(e) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Find clicked node
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
    
    // Clicked empty space - deselect
    deselectNode();
}

// ========================================
// NODE SELECTION & MOVEMENT
// ========================================

function selectNode(node) {
    GameState.selectedNode = node;
    
    const panel = document.getElementById('territory-info');
    panel.classList.remove('hidden');
    
    document.getElementById('territory-name').textContent = node.name;
    document.getElementById('territory-desc').textContent = node.description;
    
    // Status display
    const statusDiv = document.getElementById('territory-status');
    let statusHTML = '';
    switch (node.status) {
        case 'kiche':
            statusHTML = `<span style="color: #2d7d5f;">✓ ${t('underKicheControl')}</span>`;
            break;
        case 'spanish':
            statusHTML = `<span style="color: #c41e3a;">✗ ${t('spanishControlledStatus')}</span>
                <br>${t('enemyStrength')}: ${node.spanishStrength} ${t('soldiers')}`;
            break;
        case 'contested':
            statusHTML = `<span style="color: #c45c3b;">⚔️ ${t('underAttackStatus')}</span>
                <br>${t('enemyStrength')}: ${node.spanishStrength} ${t('soldiers')}`;
            break;
    }
    statusDiv.innerHTML = statusHTML;
    
    // Lesson info
    const lessonInfo = document.getElementById('lesson-info');
    const lesson = LESSONS[node.lessonType];
    if (lesson) {
        lessonInfo.innerHTML = `
            <div class="lesson-type">
                <span>${lesson.icon || '📚'}</span>
                <span>${lesson.name}</span>
            </div>
            <div class="lesson-desc">${lesson.description}</div>
        `;
        lessonInfo.style.display = 'block';
    } else {
        lessonInfo.style.display = 'none';
    }
    
    // Show completed difficulties for this node
    const completedDiv = document.createElement('div');
    completedDiv.className = 'completed-difficulties';
    const completions = GameState.completedLessons[node.id];
    if (completions) {
        const completedText = [];
        if (completions.soldier) completedText.push('🪖');
        if (completions.warrior) completedText.push('⚔️');
        if (completions.hero) completedText.push('🦸');
        if (completedText.length > 0) {
            completedDiv.innerHTML = `<span style="color: #3fa878; font-size: 0.85rem;">${t('completed')}: ${completedText.join(' ')}</span>`;
        }
    }
    
    // Action buttons
    const actionsDiv = document.getElementById('territory-actions');
    actionsDiv.innerHTML = '';
    
    // Add completed info if any
    if (completedDiv.innerHTML) {
        actionsDiv.appendChild(completedDiv);
    }
    
    // Check requirements
    const reqCheck = checkNodeRequirements(node);
    const isCurrentPosition = node.id === GameState.armyPosition;
    
    if (isCurrentPosition) {
        // At this location - if contested/spanish, we need to fight; otherwise train
        if (node.status === 'contested' || node.status === 'spanish') {
            // Need to fight enemies here!
            showDifficultySelector(actionsDiv, node, node.status === 'contested' ? 'defend' : 'attack');
        } else {
            // Safe K'iche' territory - can train
            showDifficultySelector(actionsDiv, node, 'train');
        }
    } else if (!reqCheck.met) {
        // Requirements not met - show what's needed
        const reqDiv = document.createElement('div');
        reqDiv.className = 'requirements-info';
        reqDiv.innerHTML = `
            <p style="color: #c45c3b; margin-bottom: 0.5rem;">🔒 ${t('requirementsNeeded')}:</p>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem;">
                ${reqCheck.missing.map(req => `
                    <li style="color: #888; margin-bottom: 0.3rem;">
                        • ${t('complete')} <strong>${req.nodeName}</strong> 
                        ${t('at')} <span style="color: #d4a843;">${t(req.difficulty)}</span> ${t('level')}
                    </li>
                `).join('')}
            </ul>
        `;
        actionsDiv.appendChild(reqDiv);
    } else {
        // Requirements met - can we reach it?
        const canReach = canReachNode(node);
        
        if (canReach) {
            if (node.status === 'spanish' || node.status === 'contested') {
                // Attack/defend - show difficulty selector
                showDifficultySelector(actionsDiv, node, node.status === 'contested' ? 'defend' : 'attack');
            } else {
                // Just move (no battle needed)
                const moveBtn = document.createElement('button');
                moveBtn.className = 'stone-button small';
                moveBtn.textContent = t('marchHere');
                moveBtn.onclick = () => moveToNode(node);
                actionsDiv.appendChild(moveBtn);
            }
        } else {
            // Can't reach - need to travel through other nodes
            const infoText = document.createElement('p');
            infoText.style.color = '#888';
            infoText.style.fontSize = '0.9rem';
            infoText.textContent = t('cannotReachPath');
            actionsDiv.appendChild(infoText);
        }
    }
}

// Show difficulty selector for battles/training
function showDifficultySelector(container, node, battleType) {
    // Create difficulty selector
    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'panel-difficulty-selector';
    
    const label = document.createElement('p');
    label.className = 'panel-diff-label';
    label.textContent = t('selectDifficulty');
    selectorDiv.appendChild(label);
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'panel-diff-buttons';
    
    const difficulties = [
        { id: 'soldier', icon: '🪖', name: t('soldier'), desc: t('soldierDesc') },
        { id: 'warrior', icon: '⚔️', name: t('warrior'), desc: t('warriorDesc') },
        { id: 'hero', icon: '🦸', name: t('hero'), desc: t('heroDesc') },
    ];
    
    difficulties.forEach(diff => {
        const btn = document.createElement('button');
        btn.className = 'panel-diff-btn';
        btn.innerHTML = `
            <span class="diff-icon">${diff.icon}</span>
            <span class="diff-name">${diff.name}</span>
        `;
        btn.title = diff.desc;
        btn.onclick = () => {
            setDifficulty(diff.id as DifficultyLevel);
            if (battleType === 'train') {
                startBattle(node, 'train');
            } else {
                moveAndBattle(node);
            }
        };
        buttonsDiv.appendChild(btn);
    });
    
    selectorDiv.appendChild(buttonsDiv);
    container.appendChild(selectorDiv);
    
    // Add action label based on battle type
    const actionLabel = document.createElement('p');
    actionLabel.className = 'panel-action-label';
    if (battleType === 'train') {
        actionLabel.innerHTML = `<span style="color: var(--jade-light);">📚 ${t('train')}</span>`;
    } else if (battleType === 'defend') {
        actionLabel.innerHTML = `<span style="color: var(--terracotta);">🛡️ ${t('defend')}</span>`;
    } else {
        actionLabel.innerHTML = `<span style="color: var(--terracotta);">⚔️ ${t('attack')}</span>`;
    }
    container.insertBefore(actionLabel, selectorDiv);
}

function deselectNode() {
    GameState.selectedNode = null;
    document.getElementById('territory-info').classList.add('hidden');
}

// Check if node requirements are met
function checkNodeRequirements(node) {
    // Debug mode bypasses all requirements
    if (DEBUG.enabled) {
        DEBUG.log('Requirements bypassed for node:', node.name);
        return { met: true, missing: [] };
    }
    
    if (!node.requires || node.requires.length === 0) {
        return { met: true, missing: [] };
    }
    
    const missing = [];
    
    for (const req of node.requires) {
        const reqNodeId = req.nodeId;
        const reqDifficulty = req.difficulty || 'soldier';
        
        // Check if we've completed the required lesson at the required difficulty
        const completions = GameState.completedLessons[reqNodeId];
        
        // Difficulty hierarchy: soldier < warrior < hero
        const difficultyLevels = ['soldier', 'warrior', 'hero'];
        const reqLevel = difficultyLevels.indexOf(reqDifficulty);
        
        let requirementMet = false;
        if (completions) {
            // Check if any equal or higher difficulty is completed
            for (let i = reqLevel; i < difficultyLevels.length; i++) {
                if (completions[difficultyLevels[i]]) {
                    requirementMet = true;
                    break;
                }
            }
        }
        
        if (!requirementMet) {
            const reqNode = GameState.nodes.find(n => n.id === reqNodeId);
            missing.push({
                nodeId: reqNodeId,
                nodeName: reqNode ? reqNode.name : reqNodeId,
                difficulty: reqDifficulty,
            });
        }
    }
    
    return { met: missing.length === 0, missing };
}

// Check if we can physically reach a node (path exists through friendly territory)
function canReachNode(targetNode) {
    const currentPos = GameState.armyPosition;
    
    // Find all adjacent nodes
    const adjacentIds = GameState.edges
        .filter(e => e.from === currentPos || e.to === currentPos)
        .map(e => e.from === currentPos ? e.to : e.from);
    
    // Can move to adjacent revealed nodes
    if (adjacentIds.includes(targetNode.id)) {
        return true;
    }
    
    // Can also move through multiple K'iche' nodes
    // BFS to find path through friendly territory
    const visited = new Set([currentPos]);
    const queue = [currentPos];
    
    while (queue.length > 0) {
        const nodeId = queue.shift();
        
        const neighbors = GameState.edges
            .filter(e => e.from === nodeId || e.to === nodeId)
            .map(e => e.from === nodeId ? e.to : e.from);
        
        for (const neighborId of neighbors) {
            if (visited.has(neighborId)) continue;
            visited.add(neighborId);
            
            if (neighborId === targetNode.id) return true;
            
            const neighbor = GameState.nodes.find(n => n.id === neighborId);
            if (neighbor && neighbor.status === 'kiche' && GameState.revealedNodes.has(neighborId)) {
                queue.push(neighborId);
            }
        }
    }
    
    return false;
}

function canMoveToNode(targetNode) {
    // Check if requirements are met
    const reqCheck = checkNodeRequirements(targetNode);
    if (!reqCheck.met) {
        return false;
    }
    
    // Check if we can physically reach it
    return canReachNode(targetNode);
}

function moveToNode(targetNode) {
    GameState.armyPosition = targetNode.id;
    
    // Reveal adjacent nodes
    revealAdjacentNodes(targetNode.id);
    
    // Center camera on new position
    centerCameraOnNode(targetNode);
    
    // Update display
    deselectNode();
    renderMap();
    updateArmyMarker();
    
    // Advance turn
    advanceTurn();
}

function moveAndBattle(targetNode) {
    // Move to node and start battle
    GameState.armyPosition = targetNode.id;
    revealAdjacentNodes(targetNode.id);
    
    // Center camera on new position
    centerCameraOnNode(targetNode);
    
    renderMap();
    updateArmyMarker();
    
    // Start the battle
    startBattle(targetNode, targetNode.status === 'contested' ? 'defend' : 'attack');
}

function revealAdjacentNodes(nodeId) {
    GameState.revealedNodes.add(nodeId);
    
    const adjacentIds = GameState.edges
        .filter(e => e.from === nodeId || e.to === nodeId)
        .map(e => e.from === nodeId ? e.to : e.from);
    
    for (const adjId of adjacentIds) {
        GameState.revealedNodes.add(adjId);
    }
}

// Smoothly center the camera on a node
function centerCameraOnNode(node, animate = true) {
    const container = document.getElementById('map-container');
    const targetX = node.x - container.clientWidth / 2;
    const targetY = node.y - container.clientHeight / 2;
    
    if (!animate) {
        GameState.camera.x = targetX;
        GameState.camera.y = targetY;
        renderMap();
        return;
    }
    
    // Animate camera movement
    const startX = GameState.camera.x;
    const startY = GameState.camera.y;
    const duration = 500; // ms
    const startTime = performance.now();
    
    function animateCamera(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
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

// ========================================
// TUTORIAL SYSTEM
// ========================================

// Store tutorial state
let tutorialState = {
    items: [],
    currentIndex: 0,
    node: null,
    battleType: null,
};

function getTutorialContent(lessonId) {
    // Get content based on difficulty
    const difficulty = getDifficulty();
    let items = [];
    
    // Map lessonId to content source
    const contentMap = {
        'vocabulary': typeof CULTURAL_VOCABULARY !== 'undefined' ? CULTURAL_VOCABULARY : null,
        'vocabulary_animals': typeof VOCABULARY_ANIMALS !== 'undefined' ? VOCABULARY_ANIMALS : null,
        'vocabulary_warfare': typeof VOCABULARY_WARFARE !== 'undefined' ? VOCABULARY_WARFARE : null,
        'vocabulary_places': typeof VOCABULARY_PLACES !== 'undefined' ? VOCABULARY_PLACES : null,
        'vocabulary_spiritual': typeof VOCABULARY_SPIRITUAL !== 'undefined' ? VOCABULARY_SPIRITUAL : null,
        'vocabulary_advanced': typeof VOCABULARY_ADVANCED !== 'undefined' ? VOCABULARY_ADVANCED : null,
        'greetings': typeof GREETINGS_CONTENT !== 'undefined' ? GREETINGS_CONTENT : null,
        'numbers': typeof NUMBERS_CONTENT !== 'undefined' ? NUMBERS_CONTENT : null,
        'pronouns': typeof PRONOUNS_CONTENT !== 'undefined' ? PRONOUNS_CONTENT : null,
        'possession': typeof POSSESSION_CONTENT !== 'undefined' ? POSSESSION_CONTENT : null,
        'negation': typeof NEGATION_CONTENT !== 'undefined' ? NEGATION_CONTENT : null,
        'intransitive_verbs': typeof VERBS_CONTENT !== 'undefined' ? VERBS_CONTENT : null,
        'adjectives': typeof ADJECTIVES_CONTENT !== 'undefined' ? ADJECTIVES_CONTENT : null,
        'commands': typeof COMMANDS_CONTENT !== 'undefined' ? COMMANDS_CONTENT : null,
        'existential': typeof EXISTENTIAL_CONTENT !== 'undefined' ? EXISTENTIAL_CONTENT : null,
        'questions': typeof QUESTIONS_CONTENT !== 'undefined' ? QUESTIONS_CONTENT : null,
    };
    
    const contentSource = contentMap[lessonId] || contentMap['vocabulary'];
    
    if (!contentSource) {
        console.warn('No content source found for lesson:', lessonId);
        return [];
    }
    
    // Get items based on difficulty
    items = [...(contentSource.core || [])];
    
    if (difficulty === 'warrior' || difficulty === 'hero') {
        items = items.concat(contentSource.warrior || []);
    }
    
    if (difficulty === 'hero') {
        items = items.concat(contentSource.hero || []);
    }
    
    return items;
}

function showTutorial(node, battleType) {
    const lessonId = node.lessonType || 'vocabulary';
    const lesson = LESSONS[lessonId];
    
    tutorialState.items = getTutorialContent(lessonId);
    tutorialState.currentIndex = 0;
    tutorialState.node = node;
    tutorialState.battleType = battleType;
    
    // Debug mode: Option to skip tutorials (hold Shift while clicking to skip)
    // Or press 'S' key on tutorial screen to skip
    if (DEBUG.enabled) {
        DEBUG.log('Tutorial started for:', node.name, '- Press S to skip');
    }
    
    // Update header
    document.getElementById('tutorial-icon').textContent = lesson?.icon || '📚';
    document.getElementById('tutorial-title').textContent = `${t('learning')}: ${lesson?.name || 'Vocabulary'}`;
    document.getElementById('tutorial-location').textContent = node.name;
    
    // Update progress
    document.getElementById('tutorial-total').textContent = String(tutorialState.items.length);
    
    // Render first item
    renderTutorialCard();
    updateTutorialNavigation();
    
    showScreen('tutorial');
}

function renderTutorialCard() {
    const container = document.getElementById('tutorial-content');
    const item = tutorialState.items[tutorialState.currentIndex];
    
    if (!item) {
        container.innerHTML = '<p>No content available for this lesson.</p>';
        return;
    }
    
    const cultureHtml = item.culture ? `
        <div class="tutorial-culture">
            <div class="tutorial-culture-label">🌿 ${t('culturalContext')}</div>
            <p>${item.culture}</p>
        </div>
    ` : '';
    
    // Extra info (conjugation, etc.)
    let extraHtml = '';
    if (item.conjugation) {
        extraHtml += `
            <div class="tutorial-extra-item">
                <span class="tutorial-extra-label">${t('conjugation')}: </span>
                <span class="tutorial-extra-value">${item.conjugation}</span>
            </div>
        `;
    }
    if (item.example) {
        extraHtml += `
            <div class="tutorial-extra-item">
                <span class="tutorial-extra-label">${t('example')}: </span>
                <span class="tutorial-extra-value">${item.example}</span>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="tutorial-card">
            <div class="tutorial-card-header">
                <div class="tutorial-word-icon">${item.icon || '📝'}</div>
                <div class="tutorial-word-main">
                    <h3 class="tutorial-kiche">${item.kiche}</h3>
                    <p class="tutorial-english">${item.english}</p>
                    <p class="tutorial-spanish">${item.spanish || ''}</p>
                </div>
            </div>
            <div class="tutorial-card-body">
                ${cultureHtml}
                ${extraHtml ? `<div class="tutorial-extra">${extraHtml}</div>` : ''}
            </div>
        </div>
    `;
    
    // Update progress
    document.getElementById('tutorial-current').textContent = String(tutorialState.currentIndex + 1);
}

function updateTutorialNavigation() {
    const prevBtn = document.getElementById('tutorial-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('tutorial-next');
    const startBtn = document.getElementById('start-quiz');
    
    prevBtn.disabled = tutorialState.currentIndex === 0;
    
    const isLastCard = tutorialState.currentIndex >= tutorialState.items.length - 1;
    
    if (isLastCard) {
        nextBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        startBtn.classList.add('hidden');
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
    // Now start the actual battle/quiz
    startBattleQuiz(tutorialState.node, tutorialState.battleType);
}

// ========================================
// BATTLE SYSTEM
// ========================================

function startBattle(node, type) {
    DEBUG.log('Starting battle:', { node: node.name, type });
    DEBUG.logNode(node);
    // First show the tutorial, then start the quiz
    showTutorial(node, type);
}

function startBattleQuiz(node, type) {
    // Capture the current difficulty level for this battle
    const currentDifficulty = typeof getDifficulty === 'function' ? getDifficulty() : 'soldier';
    
    // Question count based on difficulty: soldier=5, warrior=10, hero=15
    const questionCounts = { soldier: 5, warrior: 10, hero: 15 };
    const questionCount = questionCounts[currentDifficulty] || 5;
    
    DEBUG.log('Starting battle quiz:', { 
        node: node.name, 
        type, 
        difficulty: currentDifficulty, 
        questionCount,
        enemyStrength: node.spanishStrength 
    });
    
    GameState.currentBattle = {
        node: node,
        type: type, // 'attack', 'defend', or 'train'
        difficulty: currentDifficulty, // Store the difficulty for this battle
        questionCount: questionCount, // Store question count for this battle
        startingArmy: GameState.army,
        enemyStrength: node.spanishStrength || 0,
        startingEnemyStrength: node.spanishStrength || 0,
    };
    
    // Generate questions from the appropriate lesson
    const lessonId = node.lessonType || 'vocabulary';
    // Pass learned words for recall questions
    const learnedWordsList = Array.from(GameState.wordsLearned).map(w => ({ kiche: w }));
    GameState.currentQuestions = generateLessonQuestions(lessonId, questionCount, learnedWordsList as VocabularyItem[]);
    GameState.currentQuestionIndex = 0;
    GameState.correctAnswers = 0;
    
    // Setup battle UI
    const title = type === 'train' 
        ? `${t('trainingAt')} ${node.name}` 
        : type === 'defend' 
            ? `${t('defenseOf')} ${node.name}` 
            : `${t('attackOn')} ${node.name}`;
    
    document.getElementById('battle-title').textContent = title;
    
    // Update lesson badge
    const lesson = LESSONS[lessonId];
    if (lesson) {
        document.getElementById('lesson-badge').innerHTML = `
            <span class="lesson-icon">${lesson.icon || '📚'}</span>
            <span class="lesson-name">${lesson.name}</span>
        `;
    }
    
    // Dynamically create progress dots based on question count
    const dotsContainer = document.getElementById('progress-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < questionCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
    }
    
    // Update round counter format (e.g., "1/10" instead of "1/5")
    document.querySelector('.round-counter').innerHTML = 
        `<span data-i18n="round">${t('round')}</span> <span id="round-number">1</span>/${questionCount}`;
    
    updateBattleUI();
    showQuestion();
    showScreen('battle');
}

function updateBattleUI() {
    const battle = GameState.currentBattle;
    
    // Update troop displays
    document.getElementById('kiche-troops').textContent = String(GameState.army);
    document.getElementById('spanish-troops').textContent = battle.enemyStrength;
    
    // Update health bars
    const kichePercent = (GameState.army / battle.startingArmy) * 100;
    const spanishPercent = battle.startingEnemyStrength > 0 
        ? (battle.enemyStrength / battle.startingEnemyStrength) * 100 
        : 100;
    
    document.getElementById('kiche-health-fill').style.width = `${Math.max(0, kichePercent)}%`;
    document.getElementById('spanish-health-fill').style.width = `${Math.max(0, spanishPercent)}%`;
    
    // Update round counter
    document.getElementById('round-number').textContent = String(GameState.currentQuestionIndex + 1);
    
    // Update progress dots
    const dots = document.querySelectorAll('#progress-dots .dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('correct', 'incorrect', 'current');
        if (i < GameState.currentQuestionIndex) {
            dot.classList.add(GameState.currentQuestions[i].wasCorrect ? 'correct' : 'incorrect');
        } else if (i === GameState.currentQuestionIndex) {
            dot.classList.add('current');
        }
    });
    
    // Visual army representation
    const kicheWarriors = document.getElementById('kiche-warriors');
    const spanishForces = document.getElementById('spanish-forces');
    
    const kicheCount = Math.min(5, Math.ceil(GameState.army / 200));
    const spanishCount = Math.min(5, Math.ceil(battle.enemyStrength / 100));
    
    kicheWarriors.textContent = '🏹'.repeat(kicheCount);
    spanishForces.textContent = battle.type === 'train' ? '📚📚📚' : '⚔️'.repeat(Math.max(1, spanishCount));
}

function showQuestion() {
    const question = GameState.currentQuestions[GameState.currentQuestionIndex];
    
    const instructionEl = document.getElementById('lesson-instruction');
    const promptEl = document.getElementById('word-to-translate');
    
    instructionEl.textContent = question.instruction || '';
    
    // Handle different prompt formats
    if (question.type === 'conversation_respond') {
        // Show K'iche' prompt with translation hint
        promptEl.innerHTML = `<span class="kiche-prompt">${question.prompt}</span>
            <span class="prompt-translation">(${question.promptTranslation})</span>`;
    } else if (question.type === 'phrase_select') {
        // Use localized prompt if available
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
        promptEl.textContent = lang === 'es' && question.promptEs ? question.promptEs : question.prompt;
    } else if (question.type === 'recall_type' && question.promptHint) {
        // Show icon large with hint below
        promptEl.innerHTML = `<span class="recall-icon">${question.prompt}</span>
            <span class="recall-hint">${question.promptHint}</span>`;
    } else {
        promptEl.textContent = question.prompt;
    }
    
    const textInput = document.getElementById('answer-input') as HTMLInputElement;
    const choicesContainer = document.getElementById('choices-container');
    const feedback = document.getElementById('feedback');
    
    // Hide feedback
    feedback.classList.add('hidden');
    feedback.classList.remove('correct', 'incorrect');
    
    // Determine question mode
    const isTypingQuestion = question.isTypingQuestion || 
                            question.type === 'translate_to_kiche' || 
                            question.type === 'translate_from_kiche' ||
                            question.type === 'recall_type';
    
    const isMultipleChoice = !isTypingQuestion && (
                            question.type === 'multiple_choice' || 
                            question.type === 'icon_select' ||
                            question.type === 'icon_text_select' ||
                            question.type === 'phrase_select' ||
                            question.type === 'conversation_respond' ||
                            question.choices);
    
    const isIconQuestion = question.isIconQuestion || question.type === 'icon_select';
    const isIconTextQuestion = question.isIconTextQuestion || question.type === 'icon_text_select';
    const isPhraseQuestion = question.type === 'phrase_select' || question.type === 'conversation_respond';
    
    // Show/hide appropriate input
    if (isMultipleChoice) {
        textInput.classList.add('hidden');
        choicesContainer.classList.remove('hidden');
        
        // Toggle styling modes
        choicesContainer.classList.toggle('icon-choices', isIconQuestion);
        choicesContainer.classList.toggle('icon-text-choices', isIconTextQuestion);
        choicesContainer.classList.toggle('phrase-choices', isPhraseQuestion);
        
        const buttons = choicesContainer.querySelectorAll('.choice-btn');
        buttons.forEach((btn: Element, i) => {
            if (question.choices && question.choices[i]) {
                btn.textContent = question.choices[i];
                (btn as HTMLButtonElement).style.display = '';
                // Add special class for phrase buttons
                btn.classList.toggle('phrase-btn', isPhraseQuestion);
            } else {
                (btn as HTMLButtonElement).style.display = 'none';
            }
            btn.classList.remove('correct', 'incorrect');
            (btn as HTMLButtonElement).disabled = false;
            (btn as HTMLButtonElement).onclick = () => selectChoice(btn, question.choices[i]);
        });
    } else {
        textInput.classList.remove('hidden');
        choicesContainer.classList.add('hidden');
        choicesContainer.classList.remove('icon-choices', 'icon-text-choices', 'phrase-choices');
        textInput.value = '';
        textInput.placeholder = question.type === 'recall_type' 
            ? t('typeKicheWord') || "Type the K'iche' word..."
            : t('typeAnswer') || "Type your answer...";
        textInput.focus();
    }
    
    // Show submit for typing questions, hide for multiple choice (auto-submit on click)
    const submitBtn = document.getElementById('submit-answer') as HTMLButtonElement;
    if (isMultipleChoice) {
        submitBtn.classList.add('hidden');
    } else {
        submitBtn.classList.remove('hidden');
    }
    document.getElementById('next-question').classList.add('hidden');
}

function selectChoice(button, answer) {
    const question = GameState.currentQuestions[GameState.currentQuestionIndex];
    
    // Disable all buttons
    document.querySelectorAll('.choice-btn').forEach((btn: Element) => {
        (btn as HTMLButtonElement).disabled = true;
        if (btn.textContent === question.correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    const isCorrect = answer === question.correctAnswer;
    question.wasCorrect = isCorrect;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        // Track learned K'iche' words
        if (question.word && question.word.kiche) {
            GameState.wordsLearned.add(question.word.kiche.toLowerCase());
        }
    } else {
        button.classList.add('incorrect');
    }
    
    showFeedback(isCorrect, question);
}

function submitAnswer() {
    const question = GameState.currentQuestions[GameState.currentQuestionIndex];
    
    if (question.type === 'multiple_choice') {
        return; // Handled by selectChoice
    }
    
    const userAnswer = (document.getElementById('answer-input') as HTMLInputElement).value;
    if (!userAnswer.trim()) return;
    
    const isCorrect = checkLessonAnswer(userAnswer, question);
    question.wasCorrect = isCorrect;
    
    if (isCorrect) {
        GameState.correctAnswers++;
        // Track learned K'iche' words
        if (question.word && question.word.kiche) {
            GameState.wordsLearned.add(question.word.kiche.toLowerCase());
        }
    }
    
    showFeedback(isCorrect, question);
}

function showFeedback(isCorrect, question) {
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    const battle = GameState.currentBattle;
    let feedbackMessage;
    
    if (battle.type === 'train') {
        feedbackMessage = isCorrect 
            ? `✓ ${t('correctTrain')}`
            : `✗ ${t('incorrectTrain')}`;
    } else {
        feedbackMessage = isCorrect 
            ? `✓ ${t('correctBattle')}`
            : `✗ ${t('incorrectBattle')}`;
    }
    
    document.getElementById('feedback-text').textContent = feedbackMessage;
    
    // Show correct answer with context for conversation questions
    const correctAnswerEl = document.getElementById('correct-answer');
    if (isCorrect) {
        // For conversation questions, reinforce what they said
        if (question.type === 'conversation_respond' && question.responseTranslation) {
            correctAnswerEl.innerHTML = `<span class="response-meaning">"${question.correctAnswer}" = "${question.responseTranslation}"</span>`;
        } else {
            correctAnswerEl.textContent = '';
        }
    } else {
        // Show what the correct answer was
        if (question.type === 'conversation_respond' && question.responseTranslation) {
            correctAnswerEl.innerHTML = `${t('correctAnswerWas')} <strong>${question.correctAnswer}</strong><br><span class="response-meaning">(${question.responseTranslation})</span>`;
        } else {
            correctAnswerEl.textContent = `${t('correctAnswerWas')} ${question.correctAnswer}`;
        }
    }
    
    // Show cultural context if available
    const explanationEl = document.getElementById('feedback-explanation');
    if (question.culture) {
        explanationEl.innerHTML = `<div class="cultural-note"><span class="cultural-note-label">${t('culturalNote')}</span>${question.culture}</div>`;
    } else if (question.explanation) {
        explanationEl.textContent = question.explanation;
    } else {
        explanationEl.textContent = '';
    }
    
    // Update battle effects (only for actual battles)
    if (battle.type !== 'train') {
        if (isCorrect) {
            // Damage to Spanish - deal percentage of CURRENT enemy strength
            // This ensures consistent damage even when enemies are weakened
            // With 5 questions at 60% needed to win, deal ~25% per correct answer
            const damagePercent = 0.25;
            const damage = Math.max(10, Math.floor(battle.enemyStrength * damagePercent));
            battle.enemyStrength = Math.max(0, battle.enemyStrength - damage);
            DEBUG.log(`Dealt ${damage} damage to enemies. Remaining: ${battle.enemyStrength}`);
        } else {
            // Damage to K'iche'
            GameState.army = Math.max(100, GameState.army - Math.floor(GameState.army * 0.08));
        }
    }
    
    updateBattleUI();
    
    // Show next button
    document.getElementById('submit-answer').classList.add('hidden');
    document.getElementById('next-question').classList.remove('hidden');
    const totalQuestions = GameState.currentBattle?.questionCount || GameState.currentQuestions.length;
    const isLastQuestion = GameState.currentQuestionIndex >= totalQuestions - 1;
    document.getElementById('next-question').textContent = 
        isLastQuestion ? 'See Results' : 'Next Challenge';
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
    const battle = GameState.currentBattle;
    const node = battle.node;
    const totalQuestions = battle.questionCount || GameState.currentQuestions.length || 5;
    const correctRatio = GameState.correctAnswers / totalQuestions;
    const difficulty = battle.difficulty || 'soldier';
    
    DEBUG.log('Battle ended:', {
        node: node.name,
        type: battle.type,
        difficulty,
        correctAnswers: GameState.correctAnswers,
        totalQuestions,
        correctRatio: (correctRatio * 100).toFixed(1) + '%',
        remainingEnemies: battle.enemyStrength,
        startingEnemies: battle.startingEnemyStrength
    });
    
    let result = {
        title: '',
        message: '',
        icon: '',
        territoryChange: '',
        armyChange: 0,
    };
    
    // Record lesson completion if player did well enough (60%+)
    if (correctRatio >= 0.6) {
        if (!GameState.completedLessons[node.id]) {
            GameState.completedLessons[node.id] = {};
        }
        GameState.completedLessons[node.id][difficulty] = true;
    }
    
    if (battle.type === 'train') {
        // Training - always beneficial, but only marks as complete at 60%+
        result.title = t('trainingComplete');
        result.icon = '📚';
        result.message = `${t('studiedLesson')} ${LESSONS[node.lessonType]?.name || 'K\'iche\''}.`;
        if (correctRatio >= 0.6) {
            result.message += ` (${t(difficulty)} ${t('level')} ✓)`;
        }
        result.territoryChange = t('na');
        result.armyChange = Math.floor(correctRatio * 30);
        GameState.army += result.armyChange;
        GameState.morale = Math.min(100, GameState.morale + Math.floor(correctRatio * 5));
    } else if (correctRatio >= 0.8) {
        // Decisive victory - territory fully captured
        result.title = t('victory');
        result.icon = '🏆';
        GameState.battlesWon++;
        
        node.status = 'kiche';
        node.spanishStrength = 0;
        result.message = `${t('masteryInspires')} ${node.name} ${t('liberated')}`;
        result.territoryChange = t('captured');
        result.armyChange = 50;
        GameState.army += result.armyChange;
        GameState.morale = Math.min(100, GameState.morale + 10);
        
    } else if (correctRatio >= 0.6) {
        // Partial victory - use actual remaining enemy strength
        result.icon = '⚔️';
        GameState.battlesWon++;
        
        // Use the actual reduced enemy strength from battle
        const remainingEnemies = battle.enemyStrength;
        
        if (remainingEnemies <= 0 || remainingEnemies < battle.startingEnemyStrength * 0.2) {
            // Enemies nearly wiped out - territory captured
            result.title = t('hardFoughtVictory');
            node.status = 'kiche';
            node.spanishStrength = 0;
            result.message = `${node.name} ${t('liberated')}`;
            result.territoryChange = t('captured');
        } else {
            // Significant enemies remain - territory still contested, but weakened
            result.title = t('pushedBack');
            node.status = 'contested';
            node.spanishStrength = remainingEnemies; // Keep actual remaining enemies
            result.message = `${t('enemiesWeakened')} ${node.name}. ${remainingEnemies} ${t('soldiersRemain')}`;
            result.territoryChange = t('contested');
        }
        result.armyChange = -30;
        GameState.army = Math.max(100, GameState.army + result.armyChange);
        
    } else if (correctRatio >= 0.4) {
        // Stalemate - use actual remaining enemy strength  
        result.title = t('stalemate');
        result.icon = '🛡️';
        
        // Keep actual remaining enemy strength
        node.status = 'contested';
        node.spanishStrength = Math.max(battle.enemyStrength, Math.floor(battle.startingEnemyStrength * 0.3));
        result.message = `${t('neitherGains')} ${node.name}. ${t('struggleContinues')}`;
        result.territoryChange = t('contested');
        result.armyChange = -60;
        GameState.army = Math.max(100, GameState.army + result.armyChange);
        GameState.morale = Math.max(20, GameState.morale - 5);
        
    } else {
        // Defeat - enemies recover somewhat
        result.title = t('defeat');
        result.icon = '💀';
        GameState.battlesLost++;
        
        node.status = 'spanish';
        // Enemies recover to at least 60% of starting strength after victory
        node.spanishStrength = Math.max(battle.enemyStrength, Math.floor(battle.startingEnemyStrength * 0.6));
        result.message = `${t('attackFails')} ${node.name}.`;
        result.territoryChange = t('lost');
        result.armyChange = -100;
        GameState.army = Math.max(100, GameState.army + result.armyChange);
        GameState.morale = Math.max(10, GameState.morale - 15);
        
        // Move army back to a safe node
        retreatToSafeNode();
    }
    
    // Update mastery
    GameState.mastery = Math.min(100, Math.floor((GameState.wordsLearned.size / 80) * 100));
    
    // Display results
    const titleEl = document.getElementById('result-title');
    titleEl.textContent = result.title;
    titleEl.className = correctRatio >= 0.6 ? 'victory' : correctRatio >= 0.4 ? 'draw' : 'defeat';
    
    document.getElementById('result-icon').textContent = result.icon;
    document.getElementById('result-message').textContent = result.message;
    document.getElementById('correct-count').textContent = `${GameState.correctAnswers}/${totalQuestions}`;
    document.getElementById('territory-result').textContent = result.territoryChange;
    document.getElementById('army-change').textContent = String(result.armyChange >= 0 ? `+${result.armyChange}` : result.armyChange);
    document.getElementById('words-learned').textContent = String(GameState.wordsLearned.size);
    
    // Auto-save after battle completion
    autoSave();
    
    showScreen('result');
}

function retreatToSafeNode() {
    // Find nearest K'iche' controlled node
    const currentPos = GameState.armyPosition;
    const adjacentIds = GameState.edges
        .filter(e => e.from === currentPos || e.to === currentPos)
        .map(e => e.from === currentPos ? e.to : e.from);
    
    for (const adjId of adjacentIds) {
        const node = GameState.nodes.find(n => n.id === adjId);
        if (node && node.status === 'kiche') {
            GameState.armyPosition = adjId;
            return;
        }
    }
    
    // If no adjacent safe node, go to capital (Q'umarkaj)
    GameState.armyPosition = 'qumarkaj';
}

// ========================================
// TURN MANAGEMENT
// ========================================

function advanceTurn() {
    GameState.turn++;
    GameState.month++;
    if (GameState.month > 12) {
        GameState.month = 1;
        GameState.year++;
    }
    
    // Spanish actions
    spanishTurn();
    
    // Check win/loss
    if (checkGameOver()) return;
    
    // Auto-save after each turn
    autoSave();
    
    updateStats();
    renderMap();
}

function spanishTurn() {
    // Small chance of Spanish attack on a K'iche' territory
    // Only attack if there are Spanish-controlled territories nearby
    const spanishNodes = GameState.nodes.filter(n => n.status === 'spanish');
    
    if (spanishNodes.length > 0) {
        // Find K'iche' territories adjacent to Spanish territories
        const vulnerableNodes = GameState.nodes.filter(n => {
            if (n.status !== 'kiche' || n.isCapital) return false;
            if (!GameState.revealedNodes.has(n.id)) return false;
            
            // Check if adjacent to a Spanish territory
            const adjacentIds = GameState.edges
                .filter(e => e.from === n.id || e.to === n.id)
                .map(e => e.from === n.id ? e.to : e.from);
            
            return adjacentIds.some(adjId => {
                const adjNode = GameState.nodes.find(nd => nd.id === adjId);
                return adjNode && adjNode.status === 'spanish';
            });
        });
        
        // 15% chance of attack on a vulnerable territory
        if (vulnerableNodes.length > 0 && Math.random() < 0.15) {
            const targetNode = vulnerableNodes[Math.floor(Math.random() * vulnerableNodes.length)];
            targetNode.status = 'contested';
            targetNode.spanishStrength = 100 + Math.floor(Math.random() * 100);
            
            // Show attack alert
            showAttackAlert(targetNode);
        }
    }
    
    // Reinforce contested territories (slower rate)
    GameState.nodes.filter(n => n.status === 'contested').forEach(n => {
        // Only reinforce if adjacent to Spanish territory
        const adjacentIds = GameState.edges
            .filter(e => e.from === n.id || e.to === n.id)
            .map(e => e.from === n.id ? e.to : e.from);
        
        const hasSpanishSupply = adjacentIds.some(adjId => {
            const adjNode = GameState.nodes.find(nd => nd.id === adjId);
            return adjNode && adjNode.status === 'spanish';
        });
        
        if (hasSpanishSupply) {
            // Slow reinforcement from supply lines
            n.spanishStrength = Math.min(300, n.spanishStrength + 10);
        }
        // If no Spanish supply, no reinforcement - they're cut off!
    });
    
    // Spanish territories without K'iche' pressure slowly build up
    GameState.nodes.filter(n => n.status === 'spanish').forEach(n => {
        n.spanishStrength = Math.min(350, (n.spanishStrength || 200) + 5);
    });
}

function showAttackAlert(node) {
    GameState.activeAttack = node;
    
    const alert = document.getElementById('attack-alert');
    alert.classList.remove('hidden');
    
    document.getElementById('alert-message').textContent = 
        `${t('spanishAttacking')} ${node.name}! ${t('peopleNeedHelp')}`;
    
    document.getElementById('btn-rush-defend').onclick = () => {
        alert.classList.add('hidden');
        GameState.armyPosition = node.id;
        revealAdjacentNodes(node.id);
        renderMap();
        updateArmyMarker();
        startBattle(node, 'defend');
    };
    
    document.getElementById('btn-ignore-attack').onclick = () => {
        alert.classList.add('hidden');
        // Territory falls to Spanish if ignored
        node.status = 'spanish';
        node.spanishStrength = 250;
        GameState.morale = Math.max(10, GameState.morale - 10);
        renderMap();
    };
}

function continueCampaign() {
    advanceTurn();
    
    // Check game over
    if (checkGameOver()) return;
    
    deselectNode();
    updateStats();
    renderMap();
    showScreen('map');
}

function checkGameOver() {
    const capital = GameState.nodes.find(n => n.isCapital);
    const finalBoss = GameState.nodes.find(n => n.id === 'antigua'); // Antigua is the Spanish capital
    
    // Victory - Spanish capital captured
    if (finalBoss && finalBoss.status === 'kiche') {
        showGameOver(true);
        return true;
    }
    
    // Defeat - our capital (Q'umarkaj) falls
    if (capital && capital.status !== 'kiche') {
        showGameOver(false);
        return true;
    }
    
    // Army destroyed
    if (GameState.army <= 0) {
        showGameOver(false);
        return true;
    }
    
    return false;
}

function showGameOver(victory) {
    const titleEl = document.getElementById('gameover-title');
    const messageEl = document.getElementById('gameover-message');
    
    if (victory) {
        titleEl.textContent = t('victoryTitle');
        titleEl.className = 'victory';
        messageEl.textContent = t('victoryMessage');
    } else {
        titleEl.textContent = t('defeatTitle');
        titleEl.className = 'defeat';
        messageEl.textContent = t('defeatMessage');
    }
    
    // Delete save on game over
    deleteSave();
    
    document.getElementById('final-turns').textContent = String(GameState.turn);
    document.getElementById('final-words').textContent = String(GameState.wordsLearned.size);
    document.getElementById('final-battles').textContent = String(GameState.battlesWon);
    
    showScreen('gameover');
}

// ========================================
// UI HELPERS
// ========================================

function showScreen(screenName) {
    const screens = {
        title: document.getElementById('title-screen'),
        map: document.getElementById('map-screen'),
        tutorial: document.getElementById('tutorial-screen'),
        battle: document.getElementById('battle-screen'),
        result: document.getElementById('result-screen'),
        gameover: document.getElementById('gameover-screen'),
    };
    
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    
    // When showing map screen, ensure canvas is properly sized
    if (screenName === 'map') {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
            resizeCanvas();
        });
    }
}

function updateStats() {
    document.getElementById('army-count').textContent = String(GameState.army);
    document.getElementById('morale').textContent = `${GameState.morale}%`;
    document.getElementById('mastery').textContent = `${GameState.mastery}%`;
    document.getElementById('turn-number').textContent = String(GameState.turn);
    document.getElementById('year').textContent = String(GameState.year);
}

// ========================================
// GAME INITIALIZATION
// ========================================

function startGame() {
    DEBUG.log('startGame called');
    // Reset state
    GameState.army = 1000;
    GameState.morale = 100;
    GameState.mastery = 0;
    GameState.wordsLearned = new Set();
    GameState.battlesWon = 0;
    GameState.battlesLost = 0;
    GameState.turn = 1;
    GameState.year = 1524;
    GameState.month = 2;
    GameState.camera = { x: 0, y: 0 };
    GameState.selectedNode = null;
    GameState.activeAttack = null;
    GameState.completedLessons = {};
    
    // Generate map
    const { nodes, edges } = generateMap();
    GameState.nodes = nodes;
    GameState.edges = edges;
    
    // Reveal starting area (Q'umarkaj is the capital)
    // In debug mode, reveal ALL nodes
    if (DEBUG.enabled) {
        GameState.revealedNodes = new Set(nodes.map(n => n.id));
        DEBUG.log('All nodes revealed:', GameState.revealedNodes.size, 'nodes');
    } else {
        GameState.revealedNodes = new Set(['qumarkaj']);
        revealAdjacentNodes('qumarkaj');
    }
    
    // Position army at Q'umarkaj
    GameState.armyPosition = 'qumarkaj';
    
    // Auto-save new game immediately
    autoSave();
    
    // Show map screen first so container has dimensions
    showScreen('map');
    
    // Center camera on start (after screen is visible)
    const startNode = nodes.find(n => n.id === 'qumarkaj');
    updateStats();
    if (startNode) {
        requestAnimationFrame(() => {
            resizeCanvas();
            centerCameraOnNode(startNode, false); // No animation on start
        });
    } else {
        renderMap();
    }
}

function restartGame() {
    checkForSavedGame();
    showScreen('title');
}

function setupEventListeners() {
    // Title screen
    const startBtn = document.getElementById('start-game');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    // Difficulty is now selected per-battle in the territory panel
    
    // Map interactions
    document.getElementById('campaign-map').addEventListener('click', handleMapClick);
    document.getElementById('close-panel').addEventListener('click', deselectNode);
    
    // Battle screen
    document.getElementById('submit-answer').addEventListener('click', submitAnswer);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('answer-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitAnswer();
    });
    
    // Tutorial screen
    document.getElementById('tutorial-prev').addEventListener('click', tutorialPrev);
    document.getElementById('tutorial-next').addEventListener('click', tutorialNext);
    document.getElementById('start-quiz').addEventListener('click', startQuizFromTutorial);
    
    // Result screen
    document.getElementById('continue-campaign').addEventListener('click', continueCampaign);
    
    // Game over screen
    document.getElementById('restart-game').addEventListener('click', restartGame);
    
    // Save & quit button
    document.getElementById('save-quit').addEventListener('click', saveAndQuit);
    
    // Continue game button
    document.getElementById('continue-game').addEventListener('click', loadGame);
}

// ========================================
// SAVE/LOAD SYSTEM
// ========================================

const SAVE_KEY = 'tecunuman_save';

// Auto-save silently (no UI feedback)
function autoSave() {
    try {
        saveGame();
        DEBUG.log('Game auto-saved');
    } catch (e) {
        DEBUG.log('Auto-save failed:', e);
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
        nodeStatuses: GameState.nodes.map(n => ({
            id: n.id,
            status: n.status,
            spanishStrength: n.spanishStrength,
        })),
        
        // Revealed nodes
        revealedNodes: Array.from(GameState.revealedNodes),
        
        // Completed lessons
        completedLessons: GameState.completedLessons,
        
        // Camera position
        camera: GameState.camera,
        
        // Save timestamp
        savedAt: Date.now(),
    };
    
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        return true;
    } catch (e) {
        console.error('Failed to save game:', e);
        return false;
    }
}

function loadGame() {
    try {
        const saveDataStr = localStorage.getItem(SAVE_KEY);
        if (!saveDataStr) return false;
        
        const saveData = JSON.parse(saveDataStr);
        
        // Generate map first (to get same structure)
        const { nodes, edges } = generateMap();
        GameState.nodes = nodes;
        GameState.edges = edges;
        
        // Restore player resources
        GameState.army = saveData.army;
        GameState.morale = saveData.morale;
        GameState.mastery = saveData.mastery;
        GameState.wordsLearned = new Set(saveData.wordsLearned);
        GameState.battlesWon = saveData.battlesWon;
        GameState.battlesLost = saveData.battlesLost;
        
        // Restore campaign progress
        GameState.turn = saveData.turn;
        GameState.year = saveData.year;
        GameState.month = saveData.month;
        
        // Restore army position
        GameState.armyPosition = saveData.armyPosition;
        
        // Restore node statuses
        if (saveData.nodeStatuses) {
            for (const savedNode of saveData.nodeStatuses) {
                const node = GameState.nodes.find(n => n.id === savedNode.id);
                if (node) {
                    node.status = savedNode.status;
                    node.spanishStrength = savedNode.spanishStrength;
                }
            }
        }
        
        // Restore revealed nodes
        GameState.revealedNodes = new Set(saveData.revealedNodes);
        
        // Restore completed lessons
        GameState.completedLessons = saveData.completedLessons || {};
        
        // Restore camera
        if (saveData.camera) {
            GameState.camera = saveData.camera;
        }
        
        // Clear current state
        GameState.selectedNode = null;
        GameState.activeAttack = null;
        GameState.currentBattle = null;
        
        // Show map
        updateStats();
        showScreen('map');
        
        // Render after screen is visible
        requestAnimationFrame(() => {
            resizeCanvas();
        });
        
        return true;
    } catch (e) {
        console.error('Failed to load game:', e);
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
        console.error('Failed to delete save:', e);
    }
}

function saveAndQuit() {
    if (saveGame()) {
        showScreen('title');
        checkForSavedGame();
    }
}

function checkForSavedGame() {
    const continueBtn = document.getElementById('continue-game');
    const hasSave = hasSavedGame();
    DEBUG.log('Checking for saved game:', hasSave);
    if (hasSave) {
        continueBtn.classList.remove('hidden');
    } else {
        continueBtn.classList.add('hidden');
    }
}

// ========================================
// WINDOW EXPOSURE FOR DEBUG
// ========================================
// Expose functions to window for debug module access
(window as any).updateStats = updateStats;
(window as any).endBattle = endBattle;
(window as any).revealAdjacentNodes = revealAdjacentNodes;
(window as any).renderMap = renderMap;
(window as any).centerCameraOnNode = centerCameraOnNode;
(window as any).startQuizFromTutorial = startQuizFromTutorial;

// ========================================
// INITIALIZATION
// ========================================

// Initialize - handles both fresh page load and dynamic script loading
function initializeGame() {
    // Initialize i18n first
    initI18n();

    // Initialize debug mode
    initDebugMode();

    // Initialize canvas
    initCanvas();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for saved game
    checkForSavedGame();
}

// If DOM is already loaded (e.g., script was dynamically inserted), init immediately
// Otherwise, wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    // DOM is already ready, init immediately
    initializeGame();
}
