(function() {
'use strict';
// --- ИСПРАВЛЕННЫЙ МАССИВ shipsData: Корабли в нужном порядке ---
const shipsData = [
['small-cargo', 5000, 0, 10, 5000, 'SC'], // Малый транспорт
['large-cargo', 7500, 0, 50, 25000, 'LC'], // Большой транспорт
['light-fighter', 12500, 0, 20, 50, 'LF'], // Лёгкий истребитель
['heavy-fighter', 10000, 1, 75, 100, 'HF'], // Тяжёлый истребитель
['pathfinder', 12000, 2, 300, 10000, 'PA'], // Первопроходец
['cruiser', 15000, 1, 300, 800, 'CR'], // Крейсер
['battleship', 10000, 2, 500, 1500, 'BS'], // Линкор
['battlecruiser', 10000, 2, 250, 750, 'BC'], // Линейный крейсер
['colony-ship', 2500, 1, 1000, 7500, 'CS'], // Колонизатор
['recycler', 2000, 0, 300, 20000, 'RC'], // Переработчик
['esp-probe', 100000000, 0, 1, 0, 'EP'], // Шпионский зонд
['bomber', 4000, 1, 700, 500, 'BM'], // Бомбардировщик
['destroyer', 5000, 2, 1000, 2000, 'DR'], // Уничтожитель
['death-star', 100, 2, 1, 1000000, 'DS'], // Звезда смерти
['reaper', 7000, 2, 1100, 10000, 'RE'] // Жнец
];
// --- ИСПРАВЛЕННЫЙ МАППИНГ: Сопоставление внутреннего ключа корабля с именем файла изображения ---
const shipImageMap = {
'small-cargo': 'maly_transport.png',
'large-cargo': 'bolshoy_transport.png',
'light-fighter': 'legkiy_istrebitel.png',
'heavy-fighter': 'tyazhely_istrebitel.png',
'pathfinder': 'pathfinder.png',
'cruiser': 'linkor.png',
'battleship': 'kreiser.png',
'battlecruiser': 'battlecruiser.png',
'colony-ship': 'colony_ship.png',
'recycler': 'recycler.png',
'esp-probe': 'espionage_probe.png',
'bomber': 'bombardirovshik.png',
'destroyer': 'unichtozhitel.png',
'death-star': 'death_star.png',
'reaper': 'reaper.png'
};
// --- ИСПRAВЛЕННЫЙ МАППИНГ: Сопоставление внутреннего ключа корабля с локализованным названием ---
const shipNameMap = {
'small-cargo': 'Малый транспорт',
'large-cargo': 'Большой транспорт',
'light-fighter': 'Лёгкий истребитель',
'heavy-fighter': 'Тяжёлый истребитель',
'pathfinder': 'Первопроходец',
'cruiser': 'Крейсер',
'battleship': 'Линкор',
'battlecruiser': 'Линейный крейсер',
'colony-ship': 'Колонизатор',
'recycler': 'Переработчик',
'esp-probe': 'Шпионский зонд',
'bomber': 'Бомбардировщик',
'destroyer': 'Уничтожитель',
'death-star': 'Звезда смерти',
'reaper': 'Жнец'
};
// --- ИСПРАВЛЕННЫЙ МАССИВ shipProperties: Соответствует новому порядку shipsData ---
const shipProperties = [
["SC", 16e3], ["LC", 3e4], ["LF", 4e3], ["HF", 1e4], ["PA", 23e3],
["CR", 27e3], ["BS", 6e4], ["BC", 7e4], ["CS", 3e4], ["RC", 16e3],
["EP", 1e3], ["BM", 75e3], ["DR", 11e4], ["DS", 9e6], ["RE", 14e4]
];
// --- ИСПРАВЛЕННЫЙ МАППИНГ fleetCodeMapping: Соответствует новому порядку ---
const fleetCodeMapping = {
"SC": "202", "LC": "203", "LF": "204", "HF": "205", "PA": "219",
"CR": "206", "BS": "207", "BC": "215", "CS": "208", "RC": "209",
"EP": "210", "BM": "211", "DR": "213", "DS": "214", "RE": "218"
};
let LOCA_YES = "Yes";
let LOCA_NO = "No";
let LOCA_TAB_BUILDINGS = "Buildings";
let LOCA_TAB_EXPEDITIONS = "Expeditions";
const options = {
prm: {
universeSpeed: 1,
highTop: 40000,
playerClass: 0,
hyperTechLevel: 0,
percentRes: 0,
percentShips: 0,
classBonusCollector: 0,
classBonusDiscoverer: 0,
darkMatterDiscoveryBonus: 0,
resourceDiscoveryBooster: 0,
fleet: '{}',
lfShipsBonuses: Array(15).fill(0)
},
load: function () {
try {
const saved = localStorage.getItem('options_expeditions');
if (saved) {
const data = JSON.parse(saved);
Object.assign(this.prm, data);
if (!Array.isArray(this.prm.lfShipsBonuses) || this.prm.lfShipsBonuses.length !== 15) {
this.prm.lfShipsBonuses = Array(15).fill(0);
}
}
} catch (e) {
console.error("Error loading expedition options:", e);
}
},
save: function () {
try {
localStorage.setItem('options_expeditions', JSON.stringify(this.prm));
} catch (e) {
console.error("Error saving expedition options:", e);
}
}
};
function numToOGame(n) {
if (n == null || isNaN(n)) return '0';
n = Math.floor(Math.abs(n));
return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function parseInput(input) {
if (!input?.value) return 0;
const clean = input.value.replace(/[^0-9]/g, '');
return clean ? parseInt(clean, 10) : 0;
}
function validateAndFormatInput(input) {
const num = parseInput(input);
input.value = num > 0 ? numToOGame(num) : '';
}
function getCargoCapacity(abbrev) {
let base = 0;
if (abbrev) {
const idx = shipsData.findIndex(s => s[5] === abbrev);
if (idx === -1) return 0;
base = shipsData[idx][4] * (1 + 0.05 * options.prm.hyperTechLevel);
if (options.prm.playerClass === 1 && idx < 2) {
base += Math.floor(shipsData[idx][4] * 0.25 * (1 + options.prm.classBonusCollector / 100));
}
base += Math.floor(shipsData[idx][4] * (options.prm.lfShipsBonuses[idx] || 0) / 100);
return Math.floor(base);
}
let capacity = 0;
shipsData.forEach((ship, i) => {
const count = parseInput(document.getElementById(`num${ship[5]}`));
if (count > 0) {
let inc = count * ship[4] * (1 + 0.05 * options.prm.hyperTechLevel);
if (options.prm.playerClass === 1 && i < 2) {
inc += Math.floor(count * ship[4] * 0.25 * (1 + options.prm.classBonusCollector / 100));
}
if (options.prm.playerClass === 2 && (i === 7 || i === 14)) {
inc += count * ship[4] * 0.2;
}
inc += Math.floor(count * ship[4] * (options.prm.lfShipsBonuses[i] || 0) / 100);
capacity += inc;
}
});
return Math.floor(capacity);
}
function createFleetJSON() {
const json = {};
for (const [abbr, code] of Object.entries(fleetCodeMapping)) {
const input = document.getElementById(`num${abbr}`);
json[code] = input ? parseInput(input) : 0;
}
return json;
}
function populateFleetFromJSON(json = {}) {
const rev = Object.fromEntries(Object.entries(fleetCodeMapping).map(([a, c]) => [c, a]));
for (const [code, val] of Object.entries(json)) {
const abbr = rev[code];
if (abbr) {
const input = document.getElementById(`num${abbr}`);
if (input) input.value = val > 0 ? numToOGame(val) : '';
}
}
}
function clearFleet() {
shipsData.forEach(ship => {
const input = document.getElementById(`num${ship[5]}`);
if (input) input.value = '';
});
compute();
}
function compute() {
options.prm.playerClass = parseInt(document.getElementById('player-class')?.value) || 0;
options.prm.universeSpeed = parseInt(document.getElementById('universe-speed')?.value) || 1;
options.prm.hyperTechLevel = parseInput(document.getElementById('tech_hyper-level'));
options.prm.percentRes = parseInput(document.getElementById('percent-resources'));
options.prm.percentShips = parseInput(document.getElementById('percent-ships'));
options.prm.classBonusCollector = parseInput(document.getElementById('class-bonus-collector'));
options.prm.classBonusDiscoverer = parseInput(document.getElementById('class-bonus-discoverer'));
options.prm.darkMatterDiscoveryBonus = parseInput(document.getElementById('dark-matter-discovery-bonus'));
options.prm.resourceDiscoveryBooster = parseInt(document.getElementById('resource-discovery-booster')?.value) || 0;
const bonusInputs = document.querySelectorAll('#lf-ships-bonuses input');
bonusInputs.forEach((inp, i) => {
if (i < 15) options.prm.lfShipsBonuses[i] = parseFloat(inp.value) || 0;
});
options.prm.fleet = JSON.stringify(createFleetJSON());
const hasPathfinder = parseInput(document.getElementById('numPA')) > 0;
const totalCapacity = getCargoCapacity();
const tbody = document.getElementById('expeditionsFleetBody');
if (!tbody) return;
for (let d = 0; d < shipProperties.length; d++) {
const el = document.getElementById(`can${shipProperties[d][0]}`);
if (el) {
el.textContent = LOCA_NO;
el.className = '';
}
}
let g = 0;
let foundShips = false;
for (let d = 0; d < shipProperties.length; d++) {
const count = parseInput(document.getElementById(`num${shipProperties[d][0]}`));
if (d > 2 && count > 0) {
foundShips = true;
for (let j = 3; j <= d; j++) {
const el = document.getElementById(`can${shipProperties[j][0]}`);
if (el) {
el.textContent = LOCA_YES;
el.className = 'bolder-label';
}
}
if (d < shipProperties.length - 1) {
const nextEl = document.getElementById(`can${shipProperties[d+1][0]}`);
if (nextEl) {
nextEl.textContent = LOCA_YES;
nextEl.className = 'bolder-label';
}
g = Math.max(g, shipProperties[d+1][1]);
} else {
g = Math.max(g, shipProperties[d][1]);
}
}
}
const highTop = parseInt(document.getElementById('highTop')?.value) || 40000;
options.prm.highTop = highTop;
const factor = hasPathfinder
? (options.prm.playerClass === 0 ? 3 * options.prm.universeSpeed : 2)
: (options.prm.playerClass === 0 ? 1.5 * options.prm.universeSpeed : 1);
let maxPoints = Math.floor(factor * highTop);
const discovererBonus = options.prm.playerClass === 0 ? (1 + options.prm.classBonusDiscoverer / 100) : 1;
maxPoints = Math.floor(maxPoints * (1 + options.prm.percentRes / 100) * discovererBonus);
const singleLCCap = getCargoCapacity('LC');
const minLC = singleLCCap > 0 ? Math.ceil(maxPoints / singleLCCap) : 0;
const dict = window.getLangDict ? window.getLangDict(localStorage.getItem('og_calc_lang_v2') || 'ru') : {};
const maxPointsLabel = dict.expeditionsMaxPointsLabel || 'Resource find (max):';
const minLCUnit = dict.expeditionsMaxPointsLCUnit || 'LC';
document.getElementById('max_points').textContent = `${maxPointsLabel}: ${numToOGame(maxPoints)} (${minLC} ${minLCUnit})`;
const baseRes = Math.max(1000 * factor * highTop, 200000);
const resFactor = (1 + options.prm.percentRes / 100) * discovererBonus * (1 + options.prm.resourceDiscoveryBooster / 100);
const maxRes = Math.floor(baseRes * 0.001 * resFactor);
const metal = totalCapacity > 0 ? Math.min(maxRes, totalCapacity) : 0;
const crystal = totalCapacity > 0 ? Math.min(Math.floor(maxRes / 2), totalCapacity) : 0;
const deut = totalCapacity > 0 ? Math.min(Math.floor(maxRes / 3), totalCapacity) : 0;
const storageEl = document.getElementById('storageCapacity');
if (storageEl) {
storageEl.textContent = numToOGame(totalCapacity);
storageEl.style.fontStyle = maxRes > totalCapacity ? 'italic' : 'normal';
}
document.getElementById('maxFindMet').textContent = numToOGame(metal);
document.getElementById('maxFindCry').textContent = numToOGame(crystal);
document.getElementById('maxFindDeu').textContent = numToOGame(deut);
const c = foundShips ? Math.max(10000, factor * highTop) : 0;
for (let d = 3; d < shipProperties.length; d++) {
const canEl = document.getElementById(`can${shipProperties[d][0]}`);
const findEl = document.getElementById(`find${shipProperties[d][0]}`);
if (canEl && findEl) {
const can = canEl.textContent === LOCA_YES;
const maxShips = can ? Math.floor(c / shipProperties[d][1] * (1 + options.prm.percentShips / 100)) : 0;
findEl.textContent = numToOGame(maxShips);
findEl.className = maxShips > 0 ? 'bolder-label' : '';
}
}
const darkMatter = Math.floor(1800 * (1 + options.prm.darkMatterDiscoveryBonus / 100));
document.getElementById('darkMatterFind').textContent = numToOGame(darkMatter);
options.save();
}
function initBonusesPanel() {
const container = document.getElementById('lf-ships-bonuses');
if (!container) return;
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || "Yes";
LOCA_NO = dict.expeditionsNo || "No";
container.innerHTML = `
<tr>
<th data-i18n="ship">${dict.shipType || 'Ship Type'}</th>
<th data-i18n="bonus">${dict.bonus || 'Bonus (%)'}</th>
</tr>
`;
shipsData.forEach((ship, i) => {
const row = document.createElement('tr');
row.className = i % 2 === 0 ? 'odd' : 'even';
const nameCell = document.createElement('td');
nameCell.style.textAlign = 'left';
nameCell.style.padding = '2px 4px';
nameCell.style.display = 'flex';
nameCell.style.alignItems = 'center';
nameCell.style.gap = '8px';
// Изображение корабля
const shipKey = ship[0]; // Используем ключ из shipsData
const img = document.createElement('img');
img.src = `images/ships/${shipImageMap[shipKey]}`;
img.alt = shipNameMap[shipKey];
img.className = 'icon';
img.width = 20;
img.height = 20;
img.loading = 'lazy';
img.style.borderRadius = '4px';
img.style.verticalAlign = 'middle';
img.addEventListener('error', () => {
if (!img._fallback) {
const fb = document.createElement('span');
fb.className = 'icon-fallback';
fb.textContent = shipNameMap[shipKey].charAt(0);
fb.style.marginRight = '6px';
fb.style.display = 'inline-block';
fb.style.width = '20px';
fb.style.height = '20px';
fb.style.lineHeight = '20px';
fb.style.textAlign = 'center';
img.style.display = 'none';
img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
img._fallback = true;
}
});
// Локализованное название
const localized = shipNameMap[shipKey];
nameCell.appendChild(img);
nameCell.appendChild(document.createTextNode(localized));
const bonusCell = document.createElement('td');
bonusCell.style.textAlign = 'center';
bonusCell.style.padding = '2px 4px';
const input = document.createElement('input');
input.type = 'text';
input.inputMode = 'numeric';
input.value = (options.prm.lfShipsBonuses && options.prm.lfShipsBonuses[i]) || 0;
input.dataset.index = i;
input.className = 'lf-bonus-input quantity-input';
input.addEventListener('input', (e) => {
e.target.value = e.target.value.replace(/[^0-9.]/g, '');
});
input.addEventListener('blur', function () {
const index = parseInt(this.dataset.index);
if (!isNaN(index) && index >= 0 && index < 15) {
const value = parseFloat(this.value) || 0;
if (!options.prm.lfShipsBonuses) options.prm.lfShipsBonuses = Array(15).fill(0);
options.prm.lfShipsBonuses[index] = value;
options.save();
compute();
}
});
bonusCell.appendChild(input);
row.append(nameCell, bonusCell);
container.appendChild(row);
});
}
function initExpeditionsTable() {
const tbody = document.getElementById('expeditionsFleetBody');
if (!tbody) return;
tbody.innerHTML = '';
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || "Yes";
LOCA_NO = dict.expeditionsNo || "No";
shipsData.forEach((ship, i) => {
const tr = document.createElement('tr');
tr.className = i % 2 === 0 ? 'odd' : 'even';
const nameCell = document.createElement('td');
nameCell.className = 'first-column';
nameCell.style.display = 'flex';
nameCell.style.alignItems = 'center';
nameCell.style.gap = '8px';
// Изображение корабля
const shipKey = ship[0]; // Используем ключ из shipsData
const img = document.createElement('img');
img.src = `images/ships/${shipImageMap[shipKey]}`;
img.alt = shipNameMap[shipKey];
img.className = 'icon';
img.width = 28;
img.height = 28;
img.loading = 'lazy';
img.style.borderRadius = '4px';
img.style.verticalAlign = 'middle';
img.addEventListener('error', () => {
if (!img._fallback) {
const fb = document.createElement('span');
fb.className = 'icon-fallback';
fb.textContent = shipNameMap[shipKey].charAt(0);
fb.style.marginRight = '6px';
fb.style.display = 'inline-block';
fb.style.width = '28px';
fb.style.height = '28px';
fb.style.lineHeight = '28px';
fb.style.textAlign = 'center';
img.style.display = 'none';
img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
img._fallback = true;
}
});
// Локализованное название
const localized = shipNameMap[shipKey];
nameCell.appendChild(img);
nameCell.appendChild(document.createTextNode(localized));
const qtyCell = document.createElement('td');
qtyCell.style.textAlign = 'center';
qtyCell.className = 'quantity-cell';
const input = document.createElement('input');
input.id = `num${ship[5]}`;
input.type = 'text';
input.inputMode = 'numeric';
input.placeholder = '0';
input.className = 'quantity-input';
qtyCell.appendChild(input);
const canCell = document.createElement('td');
canCell.style.textAlign = 'center';
const canSpan = document.createElement('span');
canSpan.id = `can${ship[5]}`;
canSpan.textContent = LOCA_NO;
canCell.appendChild(canSpan);
const maxCell = document.createElement('td');
maxCell.style.textAlign = 'center';
const maxSpan = document.createElement('span');
maxSpan.id = `find${ship[5]}`;
maxSpan.textContent = '0';
maxCell.appendChild(maxSpan);
tr.append(nameCell, qtyCell, canCell, maxCell);
tbody.appendChild(tr);
input.addEventListener('input', function() {
this.value = this.value.replace(/[^0-9]/g, '');
});
input.addEventListener('blur', function() {
validateAndFormatInput(this);
compute();
});
});
const capRow = document.createElement('tr');
capRow.className = 'storage-row';
capRow.innerHTML = `
<td colspan="2" class="first-column">${dict.expeditionsCargoCapacity || 'Storage Capacity:'}</td>
<td colspan="2" style="text-align:right;"><span id="storageCapacity">0</span></td>
`;
tbody.appendChild(capRow);
const resRow = document.createElement('tr');
resRow.className = 'resources-row';
resRow.innerHTML = `
<td colspan="2" class="first-column">${dict.expeditionsMaxResourcesLabel || 'Resource find (max):'}</td>
<td style="text-align:right;">${dict.metal || 'Metal'}<br>${dict.crystal || 'Crystal'}<br>${dict.deut || 'Deuterium'}</td>
<td style="text-align:right;">
<span id="maxFindMet">0</span><br>
<span id="maxFindCry">0</span><br>
<span id="maxFindDeu">0</span>
</td>
`;
tbody.appendChild(resRow);
const dmRow = document.createElement('tr');
dmRow.className = 'dark-matter-row';
dmRow.innerHTML = `
<td colspan="2" class="first-column">${dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):'}</td>
<td colspan="2" style="text-align:right;"><span id="darkMatterFind">0</span></td>
`;
tbody.appendChild(dmRow);
}
function initAccordion() {
const header = document.querySelector('#lf-bonuses-accordion .ui-accordion-header');
const content = document.getElementById('accordion-lf-prm');
if (!header || !content) return;
const newHeader = header.cloneNode(true);
header.parentNode.replaceChild(newHeader, header);
newHeader.addEventListener('click', function (e) {
e.preventDefault();
e.stopPropagation();
const isVisible = content.style.display === 'block';
content.style.display = isVisible ? 'none' : 'block';
const icon = this.querySelector('.ui-icon');
if (icon) {
icon.className = `ui-icon ui-icon-triangle-1-${isVisible ? 'e' : 's'}`;
}
localStorage.setItem('og_expeditions_accordion_expanded', JSON.stringify(!isVisible));
});
const isExpanded = JSON.parse(localStorage.getItem('og_expeditions_accordion_expanded') || 'false');
content.style.display = isExpanded ? 'block' : 'none';
const icon = newHeader.querySelector('.ui-icon');
if (icon) {
icon.className = `ui-icon ui-icon-triangle-1-${isExpanded ? 's' : 'e'}`;
}
}
function bindEvents() {
['player-class', 'universe-speed', 'highTop', 'resource-discovery-booster'].forEach(id => {
const el = document.getElementById(id);
if (el) {
el.removeEventListener('change', compute);
el.addEventListener('change', compute);
}
});
['tech_hyper-level', 'percent-resources', 'percent-ships', 'class-bonus-collector',
'class-bonus-discoverer', 'dark-matter-discovery-bonus'].forEach(id => {
const el = document.getElementById(id);
if (!el) return;
el.removeEventListener('input', sanitizeInput);
el.addEventListener('input', sanitizeInput);
el.removeEventListener('blur', compute);
el.addEventListener('blur', compute);
});
function sanitizeInput() {
this.value = this.value.replace(/[^0-9]/g, '');
}
const clearBtn = document.getElementById('clearFleet');
if (clearBtn) {
clearBtn.removeEventListener('click', clearFleet);
clearBtn.addEventListener('click', clearFleet);
}
}
function initMainTableDrag() {
const handle = document.getElementById('dragHandle');
const wrapper = document.getElementById('tableWrapper');
if (!handle || !wrapper) return;
let isDragging = false, startX, startY, startWrapperX = 0, startWrapperY = 0;
function getCurrentPosition() {
const style = getComputedStyle(wrapper);
const transform = style.transform;
if (transform && transform !== 'none') {
const matrix = new DOMMatrix(transform);
return { x: matrix.e, y: matrix.f };
}
return { x: parseFloat(style.left) || 0, y: parseFloat(style.top) || 0 };
}
handle.addEventListener('pointerdown', (e) => {
isDragging = true;
startX = e.clientX; startY = e.clientY;
const pos = getCurrentPosition();
startWrapperX = pos.x; startWrapperY = pos.y;
handle.style.cursor = 'grabbing';
wrapper.style.zIndex = '2000';
try { handle.setPointerCapture(e.pointerId); } catch{}
});
document.addEventListener('pointermove', (e) => {
if (!isDragging) return;
const dx = e.clientX - startX, dy = e.clientY - startY;
wrapper.style.transform = `translate(${Math.round(startWrapperX + dx)}px, ${Math.round(startWrapperY + dy)}px)`;
wrapper.style.position = 'absolute';
['left','top','right','bottom'].forEach(p => wrapper.style[p] = 'auto');
});
const stop = () => {
if (!isDragging) return;
isDragging = false;
handle.style.cursor = 'grab';
wrapper.style.zIndex = '1000';
try { handle.releasePointerCapture(event?.pointerId); } catch{}
const rect = wrapper.getBoundingClientRect();
const posX = Math.round(rect.left);
const posY = Math.round(rect.top);
try {
localStorage.setItem('og_calc_main_table_pos', JSON.stringify({ left: posX, top: posY }));
} catch {}
};
document.addEventListener('pointerup', stop);
document.addEventListener('pointercancel', stop);
try {
const pos = JSON.parse(localStorage.getItem('og_calc_main_table_pos') || '{}');
if (pos.left != null && pos.top != null) {
wrapper.style.transform = `translate(${Math.round(pos.left)}px, ${Math.round(pos.top)}px)`;
wrapper.style.position = 'absolute';
['left','top','right','bottom'].forEach(p => wrapper.style[p] = 'auto');
}
} catch (e) {
console.error("Error loading main table position:", e);
}
}
function initExpeditionsTableDrag() {
const handle = document.getElementById('dragHandleExpeditions');
const wrapper = document.getElementById('expeditionsWrapper');
if (!handle || !wrapper) return;
let isDragging = false, startX, startY, startWrapperX = 0, startWrapperY = 0;
function getCurrentPosition() {
const style = getComputedStyle(wrapper);
const transform = style.transform;
if (transform && transform !== 'none') {
const matrix = new DOMMatrix(transform);
return { x: matrix.e, y: matrix.f };
}
return { x: parseFloat(style.left) || 0, y: parseFloat(style.top) || 0 };
}
handle.addEventListener('pointerdown', (e) => {
isDragging = true;
startX = e.clientX; startY = e.clientY;
const pos = getCurrentPosition();
startWrapperX = pos.x; startWrapperY = pos.y;
handle.style.cursor = 'grabbing';
wrapper.style.zIndex = '2000';
try { handle.setPointerCapture(e.pointerId); } catch{}
});
document.addEventListener('pointermove', (e) => {
if (!isDragging) return;
const dx = e.clientX - startX, dy = e.clientY - startY;
wrapper.style.transform = `translate(${Math.round(startWrapperX + dx)}px, ${Math.round(startWrapperY + dy)}px)`;
wrapper.style.position = 'absolute';
['left','top','right','bottom'].forEach(p => wrapper.style[p] = 'auto');
});
const stop = () => {
if (!isDragging) return;
isDragging = false;
handle.style.cursor = 'grab';
wrapper.style.zIndex = '1000';
try { handle.releasePointerCapture(event?.pointerId); } catch{}
const rect = wrapper.getBoundingClientRect();
const posX = Math.round(rect.left);
const posY = Math.round(rect.top);
try {
localStorage.setItem('og_calc_expeditions_pos', JSON.stringify({ left: posX, top: posY }));
} catch {}
};
document.addEventListener('pointerup', stop);
document.addEventListener('pointercancel', stop);
try {
const pos = JSON.parse(localStorage.getItem('og_calc_expeditions_pos') || '{}');
if (pos.left != null && pos.top != null) {
wrapper.style.transform = `translate(${Math.round(pos.left)}px, ${Math.round(pos.top)}px)`;
wrapper.style.position = 'absolute';
['left','top','right','bottom'].forEach(p => wrapper.style[p] = 'auto');
}
} catch (e) {
console.error("Error loading expedition position:", e);
}
}
function updateExpeditionsLang() {
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || "Yes";
LOCA_NO = dict.expeditionsNo || "No";
LOCA_TAB_BUILDINGS = dict.tabBuildings || "Buildings";
LOCA_TAB_EXPEDITIONS = dict.tabExpeditions || "Expeditions";
document.querySelector('#lf-bonuses-accordion .ui-accordion-header a span').textContent =
dict.expeditionsShipBonuses || 'Ships stats bonuses (%)';
document.querySelector('#settings-panel .settings-title').textContent =
dict.expeditionsSettingsTitle || 'OGame Expeditions Calculator';
document.querySelector('#max_points_label').textContent = dict.expeditionsMaxPointsLabel || 'Resource find (max):';
document.querySelector('label[for="player-class"]').textContent = dict.expeditionsPlayerClass || 'Class:';
document.querySelector('label[for="universe-speed"]').textContent = dict.expeditionsUniverseSpeed || 'Speed factor:';
document.querySelector('label[for="tech_hyper-level"]').textContent = dict.expeditionsHyperTech || 'Level of Hyperspace Technology:';
document.querySelector('label[for="percent-resources"]').textContent = dict.expeditionsResourceBonus || 'Expedition Resource Bonus:';
document.querySelector('label[for="percent-ships"]').textContent = dict.expeditionsShipBonus || 'Expedition Ship Bonus:';
document.querySelector('label[for="class-bonus-collector"]').textContent = dict.expeditionsCollectorBonus || '"Collector" class bonus:';
document.querySelector('label[for="class-bonus-discoverer"]').textContent = dict.expeditionsDiscovererBonus || '"Discoverer" class bonus:';
document.querySelector('label[for="dark-matter-discovery-bonus"]').textContent = dict.expeditionsDarkMatterBonus || 'Dark Matter discovery bonus:';
document.querySelector('label[for="resource-discovery-booster"]').textContent = dict.expeditionsResourceBooster || 'Resources discovery booster:';
const highTopSelect = document.getElementById('highTop');
if (highTopSelect) {
for (let i = 0; i < highTopSelect.options.length; i++) {
const key = `expeditionsHighTop${i + 1}`;
if (dict[key]) highTopSelect.options[i].textContent = dict[key];
}
}
const playerClassSelect = document.getElementById('player-class');
if (playerClassSelect) {
playerClassSelect.options[0].textContent = dict.expeditionsClassDiscoverer || 'Discoverer';
playerClassSelect.options[1].textContent = dict.expeditionsClassCollector || 'Collector';
playerClassSelect.options[2].textContent = dict.expeditionsClassGeneral || 'Other';
}
const universeSpeedSelect = document.getElementById('universe-speed');
if (universeSpeedSelect) {
universeSpeedSelect.style.width = '65px';
universeSpeedSelect.style.fontSize = '11px';
universeSpeedSelect.style.padding = '1px 4px 1px 6px';
universeSpeedSelect.style.height = '20px';
}
const resourceBoosterSelect = document.getElementById('resource-discovery-booster');
if (resourceBoosterSelect) {
resourceBoosterSelect.style.width = '65px';
resourceBoosterSelect.style.fontSize = '11px';
resourceBoosterSelect.style.padding = '1px 4px 1px 6px';
resourceBoosterSelect.style.height = '20px';
}
initExpeditionsTable();
try {
populateFleetFromJSON(JSON.parse(options.prm.fleet));
} catch (e) {
console.error("Error populating fleet from JSON:", e);
}
initBonusesPanel();
setTimeout(() => {
const headers = document.querySelectorAll('#data-table th');
if (headers.length > 0) headers[0].textContent = dict.shipType || 'Ship Type:';
if (headers.length > 1) headers[1].textContent = dict.qty || 'Number:';
if (headers.length > 2) headers[2].innerHTML = dict.canBeFound || 'Can a ship of this<br>type be found?';
if (headers.length > 3) headers[3].innerHTML = dict.maxCanBeFound || 'Discoverable number<br>of ships (max):';
const resourceRow = document.querySelector('.resources-row .first-column');
if (resourceRow) resourceRow.textContent = dict.expeditionsMaxResourcesLabel || 'Resource find (max):';
const darkMatterRow = document.querySelector('.dark-matter-row .first-column');
if (darkMatterRow) darkMatterRow.textContent = dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):';
setTimeout(initAccordion, 50);
}, 100);
compute();
}
window.initExpeditions = function () {
if (window.expeditionsInitialized) return;
options.load();
initExpeditionsTable();
try {
populateFleetFromJSON(JSON.parse(options.prm.fleet));
} catch (e) {
console.error("Error populating fleet from JSON:", e);
}
initBonusesPanel();
initAccordion();
initExpeditionsTableDrag();
bindEvents();
compute();
window.expeditionsInitialized = true;
document.removeEventListener('languageChanged', updateExpeditionsLang);
document.addEventListener('languageChanged', updateExpeditionsLang);
updateExpeditionsLang();
initMainTableDrag();
};
window.updateExpeditionsLang = updateExpeditionsLang;
document.addEventListener('DOMContentLoaded', function () {
initMainTableDrag();
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.addEventListener('click', function () {
if (this.dataset.view === 'expeditions') {
setTimeout(() => {
if (!window.expeditionsInitialized) {
window.initExpeditions();
} else {
initAccordion();
}
}, 100);
}
});
});
document.querySelectorAll('.tab-btn').forEach(btn => {
btn.addEventListener('click', function () {
setTimeout(initAccordion, 100);
});
});
});
})(); // <-- Завершение IIFE