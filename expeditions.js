(function() {
'use strict';
const shipsData = [
['small-cargo', 5000, 0, 10, 5000, 'SC'],
['large-cargo', 7500, 0, 50, 25000, 'LC'],
['light-fighter', 12500, 0, 20, 50, 'LF'],
['heavy-fighter', 10000, 1, 75, 100, 'HF'],
['pathfinder', 12000, 2, 300, 10000, 'PA'],
['cruiser', 15000, 1, 300, 800, 'CR'],
['battleship', 10000, 2, 500, 1500, 'BS'],
['battlecruiser', 10000, 2, 250, 750, 'BC'],
['colony-ship', 2500, 1, 1000, 7500, 'CS'],
['recycler', 2000, 0, 300, 20000, 'RC'],
['esp-probe', 100000000, 0, 1, 0, 'EP'],
['bomber', 4000, 1, 700, 500, 'BM'],
['destroyer', 5000, 2, 1000, 2000, 'DR'],
['death-star', 100, 2, 1, 1000000, 'DS'],
['reaper', 7000, 2, 1100, 10000, 'RE']
];
const shipImageMap = {
'small-cargo': 'maly_transport.png',
'large-cargo': 'bolshoy_transport.png',
'light-fighter': 'legkiy_istrebitel.png',
'heavy-fighter': 'tyazhely_istrebitel.png',
'pathfinder': 'pathfinder.png',
'cruiser': 'kreiser.png',
'battleship': 'linkor.png',
'battlecruiser': 'battlecruiser.png',
'colony-ship': 'colony_ship.png',
'recycler': 'recycler.png',
'esp-probe': 'espionage_probe.png',
'bomber': 'bombardirovshik.png',
'destroyer': 'unichtozhitel.png',
'death-star': 'death_star.png',
'reaper': 'reaper.png'
};
const shipProperties = [
['RC', 16e3],
['CS', 3e4],
['DS', 9e6],
['EP', 1e3],
['SC', 4e3],
['LF', 4e3],
['LC', 12e3],
['HF', 1e4],
['CR', 27e3],
['PA', 23e3],
['BS', 6e4],
['BC', 7e4],
['BM', 75e3],
['DR', 11e4],
['RE', 14e4]
];
const fleetCodeMapping = {
'SC': '202', 'LC': '203', 'LF': '204', 'HF': '205', 'PA': '219',
'CR': '206', 'BS': '207', 'BC': '215', 'CS': '208', 'RC': '209',
'EP': '210', 'BM': '211', 'DR': '213', 'DS': '214', 'RE': '218'
};
let LOCA_YES = 'Yes';
let LOCA_NO = 'No';
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
load() {
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
console.error('Error loading expedition options:', e);
}
},
save() {
try {
localStorage.setItem('options_expeditions', JSON.stringify(this.prm));
} catch (e) {
console.error('Error saving expedition options:', e);
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
function getShipName(shipKey) {
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
const key = `ship_${shipKey.replace(/-/g, '_')}`;
return dict[key] || shipKey.replace(/-/g, ' ');
}
const cargoCapacityCache = new Map();
let lastCargoCapacityParams = null;
function getCargoCapacity(abbrev) {
const cacheKey = abbrev ? `single_${abbrev}` : 'total';
const params = {
hyperTechLevel: options.prm.hyperTechLevel,
playerClass: options.prm.playerClass,
classBonusCollector: options.prm.classBonusCollector,
lfShipsBonuses: options.prm.lfShipsBonuses.join(',')
};
const paramsString = JSON.stringify(params);
if (lastCargoCapacityParams === paramsString && cargoCapacityCache.has(cacheKey)) {
return cargoCapacityCache.get(cacheKey);
}
let capacity = 0;
if (abbrev) {
const idx = shipsData.findIndex(s => s[5] === abbrev);
if (idx === -1) return 0;
capacity = shipsData[idx][4] * (1 + 0.05 * options.prm.hyperTechLevel);
if (options.prm.playerClass === 1 && idx < 2) {
capacity += shipsData[idx][4] * 0.25 * (1 + options.prm.classBonusCollector / 100);
}
capacity += shipsData[idx][4] * (options.prm.lfShipsBonuses[idx] || 0) / 100;
capacity = Math.floor(capacity);
} else {
shipsData.forEach((ship, i) => {
const input = document.getElementById(`num${ship[5]}`);
const count = input ? parseInput(input) : 0;
if (count > 0) {
let inc = count * ship[4] * (1 + 0.05 * options.prm.hyperTechLevel);
if (options.prm.playerClass === 1 && i < 2) {
inc += count * ship[4] * 0.25 * (1 + options.prm.classBonusCollector / 100);
}
if (options.prm.playerClass === 2 && (i === 7 || i === 14)) {
inc += count * ship[4] * 0.2;
}
inc += count * ship[4] * (options.prm.lfShipsBonuses[i] || 0) / 100;
capacity += inc;
}
});
capacity = Math.floor(capacity);
}
cargoCapacityCache.set(cacheKey, capacity);
lastCargoCapacityParams = paramsString;
return capacity;
}
function clearCargoCapacityCache() {
cargoCapacityCache.clear();
lastCargoCapacityParams = null;
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
clearCargoCapacityCache();
compute();
}
let computeTimeout = null;
function computeDebounced() {
if (computeTimeout) clearTimeout(computeTimeout);
computeTimeout = setTimeout(compute, 100);
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
el.className = 'can-be-found-no';
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
el.className = 'bolder-label can-be-found-yes';
}
}
if (d < shipProperties.length - 1) {
const nextEl = document.getElementById(`can${shipProperties[d+1][0]}`);
if (nextEl) {
nextEl.textContent = LOCA_YES;
nextEl.className = 'bolder-label can-be-found-yes';
}
g = Math.max(g, shipProperties[d+1][1]);
} else {
g = Math.max(g, shipProperties[d][1]);
}
}
}
const highTopSelect = document.getElementById('highTop');
const idx = highTopSelect?.selectedIndex || 0;
const highTopValues = [40000, 500000, 1200000, 1800000, 2400000, 3000000, 3600000, 4200000, 5000000];
const highTop = highTopValues[idx] || 40000;
options.prm.highTop = highTop;
const factor = hasPathfinder
? (options.prm.playerClass === 0 ? 3 * options.prm.universeSpeed : 2 * options.prm.universeSpeed)
: (options.prm.playerClass === 0 ? 1.5 * options.prm.universeSpeed : options.prm.universeSpeed);
let maxPoints = Math.floor(factor * highTop);
const discovererBonus = options.prm.playerClass === 0 ? (1 + options.prm.classBonusDiscoverer / 100) : 1;
maxPoints = Math.floor(maxPoints * (1 + options.prm.percentRes / 100) * discovererBonus);
const singleLCCap = getCargoCapacity('LC');
const minLC = singleLCCap > 0 ? Math.ceil(maxPoints / singleLCCap) : 0;
const dict = window.getLangDict ? window.getLangDict(localStorage.getItem('og_calc_lang_v2') || 'ru') : {};
const maxPointsLabel = dict.expeditionsMaxPointsLabel || 'Resource find (max):';
const minLCUnit = dict.expeditionsMaxPointsLCUnit || 'LC';
const maxPointsEl = document.getElementById('max_points');
if (maxPointsEl) {
maxPointsEl.textContent = `${maxPointsLabel}: ${numToOGame(maxPoints)} (${minLC} ${minLCUnit})`;
}
let b = factor * highTop;
const c = foundShips ? Math.max(10000, Math.min(totalCapacity, Math.floor(b))) : 0;
let d_val = Math.max(1000 * b, 200000);
d_val *= 0.001;
const resFactor = (1 + options.prm.percentRes / 100) * discovererBonus * (1 + options.prm.resourceDiscoveryBooster / 100);
d_val = Math.floor(d_val * resFactor);
const metal = totalCapacity > 0 ? Math.min(d_val, totalCapacity) : 0;
const crystal = totalCapacity > 0 ? Math.min(d_val / 2, totalCapacity) : 0;
const deut = totalCapacity > 0 ? Math.min(d_val / 3, totalCapacity) : 0;
const storageEl = document.getElementById('storageCapacity');
if (storageEl) {
storageEl.textContent = numToOGame(totalCapacity);
storageEl.style.fontStyle = d_val > totalCapacity ? 'italic' : 'normal';
}
const maxFindMet = document.getElementById('maxFindMet');
const maxFindCry = document.getElementById('maxFindCry');
const maxFindDeu = document.getElementById('maxFindDeu');
if (maxFindMet) maxFindMet.textContent = numToOGame(metal);
if (maxFindCry) maxFindCry.textContent = numToOGame(crystal);
if (maxFindDeu) maxFindDeu.textContent = numToOGame(deut);
for (let d = 3; d < shipProperties.length; d++) {
const canEl = document.getElementById(`can${shipProperties[d][0]}`);
const findEl = document.getElementById(`find${shipProperties[d][0]}`);
if (canEl && findEl) {
const can = canEl.textContent === LOCA_YES;
const maxShips = can ? Math.floor(c / shipProperties[d][1] * (1 + options.prm.percentShips / 100)) : 0;
findEl.textContent = numToOGame(maxShips);
findEl.className = maxShips > 0 ? 'bolder-label can-be-found-yes' : '';
}
}
const darkMatterRaw = 1800 * (1 + options.prm.darkMatterDiscoveryBonus / 100);
const darkMatter = Math.min(2000000, Math.floor(darkMatterRaw));
const darkMatterFind = document.getElementById('darkMatterFind');
if (darkMatterFind) {
darkMatterFind.textContent = numToOGame(darkMatter);
}
options.save();
clearCargoCapacityCache();
}
function initBonusesPanel() {
const container = document.getElementById('lf-ships-bonuses');
if (!container) return;
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
container.innerHTML = `<table><thead><tr><th style="text-align:left; padding:2px 4px;">${dict.shipType || 'Ship Type'}</th><th style="text-align:center; padding:2px 4px;">${dict.expeditionsShipBonus || 'Bonus (%)'}</th></tr></thead><tbody></tbody></table>`;
const tbody = container.querySelector('tbody');
const frag = document.createDocumentFragment();
shipsData.forEach((ship, i) => {
const row = document.createElement('tr');
row.className = i % 2 === 0 ? 'odd' : 'even';
const nameCell = document.createElement('td');
nameCell.style.cssText = 'text-align:left; padding:2px 4px; display:flex; align-items:center; gap:8px;';
const shipKey = ship[0];
const img = document.createElement('img');
img.src = `images/ships/${shipImageMap[shipKey]}`;
img.alt = getShipName(shipKey);
img.className = 'icon';
img.width = 20;
img.height = 20;
img.loading = 'lazy';
img.style.cssText = 'border-radius:4px; vertical-align:middle;';
img.addEventListener('error', function() {
if (!this._fallback) {
const fb = document.createElement('span');
fb.className = 'icon-fallback';
fb.textContent = getShipName(shipKey).charAt(0);
fb.style.cssText = 'margin-right:6px; display:inline-block; width:20px; height:20px; line-height:20px; text-align:center;';
this.style.display = 'none';
this.parentNode?.insertBefore(fb, this.nextSibling);
this._fallback = true;
}
});
nameCell.appendChild(img);
nameCell.appendChild(document.createTextNode(getShipName(shipKey)));
const bonusCell = document.createElement('td');
bonusCell.style.cssText = 'text-align:center; padding:2px 4px;';
const input = document.createElement('input');
input.type = 'text';
input.inputMode = 'numeric';
input.value = (options.prm.lfShipsBonuses && options.prm.lfShipsBonuses[i]) || 0;
input.dataset.index = i;
input.className = 'lf-bonus-input quantity-input';
input.addEventListener('input', e => {
e.target.value = e.target.value.replace(/[^0-9.]/g, '');
});
input.addEventListener('blur', function() {
const index = parseInt(this.dataset.index);
if (!isNaN(index) && index >= 0 && index < 15) {
const value = parseFloat(this.value) || 0;
if (!options.prm.lfShipsBonuses) options.prm.lfShipsBonuses = Array(15).fill(0);
options.prm.lfShipsBonuses[index] = value;
options.save();
computeDebounced();
}
});
bonusCell.appendChild(input);
row.append(nameCell, bonusCell);
frag.appendChild(row);
});
tbody.appendChild(frag);
}
function initExpeditionsTable() {
const tbody = document.getElementById('expeditionsFleetBody');
if (!tbody) {
setTimeout(initExpeditionsTable, 100);
return;
}
tbody.innerHTML = '';
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || 'Yes';
LOCA_NO = dict.expeditionsNo || 'No';
const frag = document.createDocumentFragment();
shipsData.forEach((ship, i) => {
const tr = document.createElement('tr');
tr.className = i % 2 === 0 ? 'odd' : 'even';
const nameCell = document.createElement('td');
nameCell.className = 'first-column';
nameCell.style.cssText = 'display:flex; align-items:center; gap:8px;';
const shipKey = ship[0];
const img = document.createElement('img');
img.src = `images/ships/${shipImageMap[shipKey]}`;
img.alt = getShipName(shipKey);
img.className = 'icon';
img.width = 28;
img.height = 28;
img.loading = 'lazy';
img.style.cssText = 'border-radius:4px; vertical-align:middle;';
img.addEventListener('error', function() {
if (!this._fallback) {
const fb = document.createElement('span');
fb.className = 'icon-fallback';
fb.textContent = getShipName(shipKey).charAt(0);
fb.style.cssText = 'margin-right:6px; display:inline-block; width:28px; height:28px; line-height:28px; text-align:center;';
this.style.display = 'none';
this.parentNode?.insertBefore(fb, this.nextSibling);
this._fallback = true;
}
});
nameCell.appendChild(img);
nameCell.appendChild(document.createTextNode(getShipName(shipKey)));
const qtyCell = document.createElement('td');
qtyCell.style.cssText = 'text-align:center;';
qtyCell.className = 'quantity-cell';
const input = document.createElement('input');
input.id = `num${ship[5]}`;
input.type = 'text';
input.inputMode = 'numeric';
input.placeholder = '0';
input.className = 'quantity-input';
input.addEventListener('input', function() {
this.value = this.value.replace(/[^0-9]/g, '');
});
input.addEventListener('blur', function() {
validateAndFormatInput(this);
computeDebounced();
});
qtyCell.appendChild(input);
const canCell = document.createElement('td');
canCell.style.cssText = 'text-align:center;';
const canSpan = document.createElement('span');
canSpan.id = `can${ship[5]}`;
canSpan.textContent = LOCA_NO;
canSpan.className = 'can-be-found-no';
canCell.appendChild(canSpan);
const maxCell = document.createElement('td');
maxCell.style.cssText = 'text-align:center;';
const maxSpan = document.createElement('span');
maxSpan.id = `find${ship[5]}`;
maxSpan.textContent = '0';
maxCell.appendChild(maxSpan);
tr.append(nameCell, qtyCell, canCell, maxCell);
frag.appendChild(tr);
});
tbody.appendChild(frag);
const langDict = window.getLangDict ? window.getLangDict(localStorage.getItem('og_calc_lang_v2') || 'ru') : {};
const capRow = document.createElement('tr');
capRow.className = 'storage-row';
capRow.innerHTML = `<td colspan="2">${langDict.expeditionsCargoCapacity || 'Storage Capacity:'}</td><td colspan="2" style="text-align:right;"><span id="storageCapacity">0</span></td>`;
tbody.appendChild(capRow);
const resRow = document.createElement('tr');
resRow.className = 'resources-row';
resRow.innerHTML = `<td colspan="2">${langDict.expeditionsMaxResourcesLabel || 'Resource find (max):'}</td><td style="text-align:right;">${langDict.metal || 'Metal'}<br>${langDict.crystal || 'Crystal'}<br>${langDict.deut || 'Deuterium'}</td><td style="text-align:right;"><span id="maxFindMet">0</span><br><span id="maxFindCry">0</span><br><span id="maxFindDeu">0</span></td>`;
tbody.appendChild(resRow);
const dmRow = document.createElement('tr');
dmRow.className = 'dark-matter-row';
dmRow.innerHTML = `<td colspan="2">${langDict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):'}</td><td colspan="2" style="text-align:right;"><span id="darkMatterFind">0</span></td>`;
tbody.appendChild(dmRow);
}
function initAccordion() {
const header = document.querySelector('#lf-bonuses-accordion .ui-accordion-header');
const content = document.getElementById('accordion-lf-prm');
if (!header || !content) {
setTimeout(initAccordion, 100);
return;
}
const newHeader = header.cloneNode(true);
header.parentNode.replaceChild(newHeader, header);
newHeader.addEventListener('click', function(e) {
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
el.removeEventListener('change', computeDebounced);
el.addEventListener('change', computeDebounced);
}
});
['tech_hyper-level', 'percent-resources', 'percent-ships', 'class-bonus-collector',
'class-bonus-discoverer', 'dark-matter-discovery-bonus'
].forEach(id => {
const el = document.getElementById(id);
if (!el) return;
el.removeEventListener('input', sanitizeInput);
el.addEventListener('input', sanitizeInput);
el.removeEventListener('blur', computeDebounced);
el.addEventListener('blur', computeDebounced);
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
function initDragHandler(wrapperId, handleId, storageKey) {
const handle = document.getElementById(handleId);
const wrapper = document.getElementById(wrapperId);
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
startX = e.clientX;
startY = e.clientY;
const pos = getCurrentPosition();
startWrapperX = pos.x;
startWrapperY = pos.y;
handle.style.cursor = 'grabbing';
wrapper.style.zIndex = '2000';
try { handle.setPointerCapture(e.pointerId); } catch {}
});
document.addEventListener('pointermove', (e) => {
if (!isDragging) return;
const dx = e.clientX - startX;
const dy = e.clientY - startY;
wrapper.style.transform = `translate(${Math.round(startWrapperX + dx)}px, ${Math.round(startWrapperY + dy)}px)`;
wrapper.style.position = 'absolute';
['left', 'top', 'right', 'bottom'].forEach(p => wrapper.style[p] = 'auto');
});
const stop = () => {
if (!isDragging) return;
isDragging = false;
handle.style.cursor = 'grab';
wrapper.style.zIndex = '1000';
try { handle.releasePointerCapture(event?.pointerId); } catch {}
const rect = wrapper.getBoundingClientRect();
const posX = Math.round(rect.left);
const posY = Math.round(rect.top);
try {
localStorage.setItem(storageKey, JSON.stringify({ left: posX, top: posY }));
} catch {}
};
document.addEventListener('pointerup', stop);
document.addEventListener('pointercancel', stop);
try {
const pos = JSON.parse(localStorage.getItem(storageKey) || '{}');
if (pos.left != null && pos.top != null) {
wrapper.style.transform = `translate(${Math.round(pos.left)}px, ${Math.round(pos.top)}px)`;
wrapper.style.position = 'absolute';
['left', 'top', 'right', 'bottom'].forEach(p => wrapper.style[p] = 'auto');
}
} catch (e) {
console.error('Error loading position:', e);
}
}
function updateExpeditionsLang() {
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || 'Yes';
LOCA_NO = dict.expeditionsNo || 'No';
const accordionHeaderSpan = document.querySelector('#lf-bonuses-accordion .ui-accordion-header a span');
if (accordionHeaderSpan) {
accordionHeaderSpan.textContent = dict.expeditionsShipBonuses || 'Ships stats bonuses (%)';
}
const settingsTitle = document.querySelector('#settings-panel .settings-title');
if (settingsTitle) {
settingsTitle.textContent = dict.expeditionsSettingsTitle || 'OGame Expeditions Calculator';
}
const labelMap = {
'player-class': 'expeditionsPlayerClass',
'universe-speed': 'expeditionsUniverseSpeed',
'tech_hyper-level': 'expeditionsHyperTech',
'percent-resources': 'expeditionsResourceBonus',
'percent-ships': 'expeditionsShipBonus',
'class-bonus-collector': 'expeditionsCollectorBonus',
'class-bonus-discoverer': 'expeditionsDiscovererBonus',
'dark-matter-discovery-bonus': 'expeditionsDarkMatterBonus',
'resource-discovery-booster': 'expeditionsResourceBooster'
};
for (const [id, key] of Object.entries(labelMap)) {
const label = document.querySelector(`label[for="${id}"]`);
if (label && dict[key]) {
label.textContent = dict[key];
}
}
const highTopSelect = document.getElementById('highTop');
if (highTopSelect) {
for (let i = 0; i < highTopSelect.options.length; i++) {
const key = `expeditionsHighTop${i + 1}`;
if (dict[key]) highTopSelect.options[i].textContent = dict[key];
}
}
const playerClassSelect = document.getElementById('player-class');
if (playerClassSelect) {
if (dict.expeditionsClassDiscoverer) playerClassSelect.options[0].textContent = dict.expeditionsClassDiscoverer;
if (dict.expeditionsClassCollector) playerClassSelect.options[1].textContent = dict.expeditionsClassCollector;
if (dict.expeditionsClassGeneral) playerClassSelect.options[2].textContent = dict.expeditionsClassGeneral;
}
const headers = document.querySelectorAll('#data-table th');
if (headers.length > 0) {
if (dict.shipType) headers[0].textContent = dict.shipType;
if (dict.qty) headers[1].textContent = dict.qty;
if (dict.canBeFound) headers[2].innerHTML = dict.canBeFound;
if (dict.maxCanBeFound) headers[3].innerHTML = dict.maxCanBeFound;
}
initExpeditionsTable();
initBonusesPanel();
populateFleetFromJSON(JSON.parse(options.prm.fleet || '{}'));
setTimeout(() => {
const resourceRow = document.querySelector('.resources-row td:first-child');
if (resourceRow) resourceRow.textContent = dict.expeditionsMaxResourcesLabel || 'Resource find (max):';
const darkMatterRow = document.querySelector('.dark-matter-row td:first-child');
if (darkMatterRow) darkMatterRow.textContent = dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):';
setTimeout(initAccordion, 50);
}, 100);
compute();
}
function initExpeditionUI() {
options.load();
initExpeditionsTable();
try {
populateFleetFromJSON(JSON.parse(options.prm.fleet || '{}'));
} catch (e) {
console.error('Error populating fleet:', e);
}
initBonusesPanel();
initAccordion();
initDragHandler('expeditionsWrapper', 'dragHandleExpeditions', 'og_calc_expeditions_pos');
bindEvents();
compute();
document.removeEventListener('languageChanged', updateExpeditionsLang);
document.addEventListener('languageChanged', updateExpeditionsLang);
updateExpeditionsLang();
}
window.initExpeditionUI = initExpeditionUI;
window.updateExpeditionsLang = updateExpeditionsLang;
document.addEventListener('DOMContentLoaded', function() {
const savedView = localStorage.getItem('og_calc_active_view') || 'costs';
if (savedView === 'expeditions') {
setTimeout(initExpeditionUI, 150);
}
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.addEventListener('click', function() {
if (this.dataset.view === 'expeditions') {
setTimeout(initExpeditionUI, 100);
}
});
});
document.querySelectorAll('.tab-btn').forEach(btn => {
btn.addEventListener('click', function() {
setTimeout(initAccordion, 100);
});
});
});
})();