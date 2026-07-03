(function () {
'use strict';
// ==================== DATA ====================
const SHIPS_DATA = [
['small-cargo',    5000, 0, 10, 5000,    'SC'],
['large-cargo',    7500, 0, 50, 25000,   'LC'],
['light-fighter', 12500, 0, 20, 50,      'LF'],
['heavy-fighter', 10000, 1, 75, 100,     'HF'],
['pathfinder',    12000, 2, 300, 10000,  'PA'],
['cruiser',       15000, 1, 300, 800,    'CR'],
['battleship',    10000, 2, 500, 1500,   'BS'],
['battlecruiser', 10000, 2, 250, 750,    'BC'],
['colony-ship',    2500, 1, 1000, 7500,  'CS'],
['recycler',       2000, 0, 300, 20000,  'RC'],
['esp-probe', 100000000, 0, 1, 0,        'EP'],
['bomber',         4000, 1, 700, 500,    'BM'],
['destroyer',      5000, 2, 1000, 2000,  'DR'],
['death-star',      100, 2, 1, 1000000,  'DS'],
['reaper',         7000, 2, 1100, 10000, 'RE']
];
const SHIP_IMAGE_MAP = {
'small-cargo':'maly_transport.png','large-cargo':'bolshoy_transport.png',
'light-fighter':'legkiy_istrebitel.png','heavy-fighter':'tyazhely_istrebitel.png',
'pathfinder':'pathfinder.png','cruiser':'kreiser.png','battleship':'linkor.png',
'battlecruiser':'battlecruiser.png','colony-ship':'colony_ship.png',
'recycler':'recycler.png','esp-probe':'espionage_probe.png',
'bomber':'bombardirovshik.png','destroyer':'unichtozhitel.png',
'death-star':'death_star.png','reaper':'reaper.png'
};
// [abbrev, resourceWeight]
const SHIP_PROPERTIES = [
['RC',16000],['CS',30000],['DS',9000000],['EP',1000],['SC',4000],
['LF',4000],['LC',12000],['HF',10000],['CR',27000],['PA',23000],
['BS',60000],['BC',70000],['BM',75000],['DR',110000],['RE',140000]
];
const FLEET_CODE_MAP = {
SC:'202',LC:'203',LF:'204',HF:'205',PA:'219',CR:'206',BS:'207',
BC:'215',CS:'208',RC:'209',EP:'210',BM:'211',DR:'213',DS:'214',RE:'218'
};
const HIGH_TOP_VALUES = [40000,500000,1200000,1800000,2400000,3000000,3600000,4200000,5000000];
// ==================== STATE ====================
const options = {
prm: {
universeSpeed: 1, highTop: 40000, playerClass: 0, hyperTechLevel: 0,
percentRes: 0, percentShips: 0, classBonusCollector: 0,
classBonusDiscoverer: 0, darkMatterDiscoveryBonus: 0,
resourceDiscoveryBooster: 0, fleet: '{}',
lfShipsBonuses: Array(15).fill(0)
},
load() {
try {
const saved = localStorage.getItem('options_expeditions');
if (!saved) return;
const data = JSON.parse(saved);
Object.assign(this.prm, data);
if (!Array.isArray(this.prm.lfShipsBonuses) || this.prm.lfShipsBonuses.length !== 15) {
this.prm.lfShipsBonuses = Array(15).fill(0);
}
} catch (e) { /* ignore */ }
},
save() {
try { localStorage.setItem('options_expeditions', JSON.stringify(this.prm)); }
catch (e) { /* ignore */ }
}
};
let LOCA_YES = 'Yes';
let LOCA_NO = 'No';
// ==================== UTILS ====================
const numToOGame = (n) => {
if (n == null || isNaN(n)) return '0';
return Math.floor(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const parseInput = (input) => {
if (!input?.value) return 0;
const clean = input.value.replace(/[^0-9]/g, '');
return clean ? parseInt(clean, 10) : 0;
};
const validateAndFormatInput = (input) => {
const num = parseInput(input);
input.value = num > 0 ? numToOGame(num) : '';
};
const getShipName = (shipKey) => {
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
const key = `ship_${shipKey.replace(/-/g, '_')}`;
return dict[key] || shipKey.replace(/-/g, ' ');
};
const createShipIcon = (src, alt, size = 20) => {
const img = document.createElement('img');
img.src = src;
img.alt = alt;
img.className = 'icon';
img.width = size;
img.height = size;
img.loading = 'lazy';
img.style.cssText = `border-radius:4px;vertical-align:middle;width:${size}px;height:${size}px;`;
img.addEventListener('error', function handler() {
if (this._fallback) return;
img.removeEventListener('error', handler);
const fb = document.createElement('span');
fb.className = 'icon-fallback';
fb.textContent = alt.charAt(0);
fb.style.cssText = `margin-right:6px;display:inline-block;width:${size}px;height:${size}px;line-height:${size}px;text-align:center;`;
img.style.display = 'none';
img.parentNode?.insertBefore(fb, img.nextSibling);
img._fallback = true;
}, { once: true });
return img;
};
// ==================== CARGO CAPACITY ====================
const cargoCache = { key: null, single: new Map(), total: 0 };
function getCargoCapacity(abbrev) {
const paramsKey = `${options.prm.hyperTechLevel}_${options.prm.playerClass}_${options.prm.classBonusCollector}_${options.prm.lfShipsBonuses.join(',')}_${options.prm.fleet}`;
if (cargoCache.key !== paramsKey) {
cargoCache.key = paramsKey;
cargoCache.single.clear();
cargoCache.total = 0;
}
if (abbrev) {
if (cargoCache.single.has(abbrev)) return cargoCache.single.get(abbrev);
const idx = SHIPS_DATA.findIndex(s => s[5] === abbrev);
if (idx === -1) return 0;
let cap = SHIPS_DATA[idx][4] * (1 + 0.05 * options.prm.hyperTechLevel);
if (options.prm.playerClass === 1 && idx < 2) {
cap += SHIPS_DATA[idx][4] * 0.25 * (1 + options.prm.classBonusCollector / 100);
}
cap += SHIPS_DATA[idx][4] * (options.prm.lfShipsBonuses[idx] || 0) / 100;
cap = Math.floor(cap);
cargoCache.single.set(abbrev, cap);
return cap;
}
if (cargoCache.total) return cargoCache.total;
let total = 0;
SHIPS_DATA.forEach((ship, i) => {
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
total += inc;
}
});
cargoCache.total = Math.floor(total);
return cargoCache.total;
}
// ==================== FLEET JSON ====================
const createFleetJSON = () => {
const json = {};
for (const [abbr, code] of Object.entries(FLEET_CODE_MAP)) {
const input = document.getElementById(`num${abbr}`);
json[code] = input ? parseInput(input) : 0;
}
return json;
};
const populateFleetFromJSON = (json = {}) => {
const rev = Object.fromEntries(Object.entries(FLEET_CODE_MAP).map(([a, c]) => [c, a]));
for (const [code, val] of Object.entries(json)) {
const abbr = rev[code];
if (!abbr) continue;
const input = document.getElementById(`num${abbr}`);
if (input) input.value = val > 0 ? numToOGame(val) : '';
}
};
// ==================== RESTORE / CLEAR ====================
const restoreExpeditionSettings = () => {
const p = options.prm;
const setVal = (id, val) => {
const el = document.getElementById(id);
if (el && val !== undefined && val !== null) el.value = val;
};
setVal('player-class', p.playerClass);
setVal('universe-speed', p.universeSpeed);
setVal('highTop', p.highTop);
setVal('resource-discovery-booster', p.resourceDiscoveryBooster);
setVal('tech_hyper-level', p.hyperTechLevel > 0 ? numToOGame(p.hyperTechLevel) : '');
setVal('percent-resources', p.percentRes > 0 ? numToOGame(p.percentRes) : '');
setVal('percent-ships', p.percentShips > 0 ? numToOGame(p.percentShips) : '');
setVal('class-bonus-collector', p.classBonusCollector > 0 ? numToOGame(p.classBonusCollector) : '');
setVal('class-bonus-discoverer', p.classBonusDiscoverer > 0 ? numToOGame(p.classBonusDiscoverer) : '');
setVal('dark-matter-discovery-bonus', p.darkMatterDiscoveryBonus > 0 ? numToOGame(p.darkMatterDiscoveryBonus) : '');
document.querySelectorAll('#lf-ships-bonuses input').forEach((inp, i) => {
if (i < 15 && p.lfShipsBonuses[i] > 0) inp.value = p.lfShipsBonuses[i];
});
};
const clearFleet = () => {
SHIPS_DATA.forEach(ship => {
const input = document.getElementById(`num${ship[5]}`);
if (input) input.value = '';
});
cargoCache.key = null;
compute();
};
// ==================== COMPUTE ====================
let computeTimeout = null;
const computeDebounced = () => {
if (computeTimeout) clearTimeout(computeTimeout);
computeTimeout = setTimeout(compute, 100);
};
const elCache = {};
const el = (id) => elCache[id] || (elCache[id] = document.getElementById(id));
function compute() {
const p = options.prm;
p.playerClass = parseInt(el('player-class')?.value) || 0;
p.universeSpeed = parseInt(el('universe-speed')?.value) || 1;
p.hyperTechLevel = parseInput(el('tech_hyper-level'));
p.percentRes = parseInput(el('percent-resources'));
p.percentShips = parseInput(el('percent-ships'));
p.classBonusCollector = parseInput(el('class-bonus-collector'));
p.classBonusDiscoverer = parseInput(el('class-bonus-discoverer'));
p.darkMatterDiscoveryBonus = parseInput(el('dark-matter-discovery-bonus'));
p.resourceDiscoveryBooster = parseInt(el('resource-discovery-booster')?.value) || 0;
document.querySelectorAll('#lf-ships-bonuses input').forEach((inp, i) => {
if (i < 15) p.lfShipsBonuses[i] = parseFloat(inp.value) || 0;
});
try { p.fleet = JSON.stringify(createFleetJSON()); } catch (e) { /* ignore */ }
const hasPathfinder = parseInput(el('numPA')) > 0;
const totalCapacity = getCargoCapacity();
const tbody = el('expeditionsFleetBody');
if (!tbody) return;
SHIP_PROPERTIES.forEach(prop => {
const canEl = el(`can${prop[0]}`);
if (canEl) { canEl.textContent = LOCA_NO; canEl.className = 'can-be-found-no'; }
});
let g = 0;
let foundShips = false;
for (let d = 0; d < SHIP_PROPERTIES.length; d++) {
const count = parseInput(el(`num${SHIP_PROPERTIES[d][0]}`));
if (d > 2 && count > 0) {
foundShips = true;
for (let j = 3; j <= d; j++) {
const canEl = el(`can${SHIP_PROPERTIES[j][0]}`);
if (canEl) { canEl.textContent = LOCA_YES; canEl.className = 'bolder-label can-be-found-yes'; }
}
if (d < SHIP_PROPERTIES.length - 1) {
const nextEl = el(`can${SHIP_PROPERTIES[d + 1][0]}`);
if (nextEl) { nextEl.textContent = LOCA_YES; nextEl.className = 'bolder-label can-be-found-yes'; }
g = Math.max(g, SHIP_PROPERTIES[d + 1][1]);
} else {
g = Math.max(g, SHIP_PROPERTIES[d][1]);
}
}
}
const idx = el('highTop')?.selectedIndex || 0;
const highTop = HIGH_TOP_VALUES[idx] || 40000;
p.highTop = highTop;
const factor = hasPathfinder
? (p.playerClass === 0 ? 3 * p.universeSpeed : 2 * p.universeSpeed)
: (p.playerClass === 0 ? 1.5 * p.universeSpeed : p.universeSpeed);
const discovererBonus = p.playerClass === 0 ? (1 + p.classBonusDiscoverer / 100) : 1;
let maxPoints = Math.floor(factor * highTop * (1 + p.percentRes / 100) * discovererBonus);
const singleLCCap = getCargoCapacity('LC');
const minLC = singleLCCap > 0 ? Math.ceil(maxPoints / singleLCCap) : 0;
const dict = window.getLangDict ? window.getLangDict(localStorage.getItem('og_calc_lang_v2') || 'ru') : {};
const maxPointsLabel = dict.expeditionsMaxPointsLabel || 'Resource find (max):';
const minLCUnit = dict.expeditionsMaxPointsLCUnit || 'LC';
const maxPointsEl = el('max_points');
if (maxPointsEl) maxPointsEl.textContent = `${maxPointsLabel}: ${numToOGame(maxPoints)} (${minLC} ${minLCUnit})`;
const b = factor * highTop;
const c = foundShips ? Math.max(10000, Math.min(totalCapacity, Math.floor(b))) : 0;
let dVal = Math.max(b, 200);
const resFactor = (1 + p.percentRes / 100) * discovererBonus * (1 + p.resourceDiscoveryBooster / 100);
dVal = Math.floor(dVal * resFactor);
const metal = totalCapacity > 0 ? Math.min(dVal, totalCapacity) : 0;
const crystal = totalCapacity > 0 ? Math.min(dVal / 2, totalCapacity) : 0;
const deut = totalCapacity > 0 ? Math.min(dVal / 3, totalCapacity) : 0;
const storageEl = el('storageCapacity');
if (storageEl) {
storageEl.textContent = numToOGame(totalCapacity);
storageEl.style.fontStyle = dVal > totalCapacity ? 'italic' : 'normal';
}
const maxFindMetEl = el('maxFindMet');
const maxFindCryEl = el('maxFindCry');
const maxFindDeuEl = el('maxFindDeu');
if (maxFindMetEl) maxFindMetEl.textContent = numToOGame(metal);
if (maxFindCryEl) maxFindCryEl.textContent = numToOGame(crystal);
if (maxFindDeuEl) maxFindDeuEl.textContent = numToOGame(deut);
for (let d = 3; d < SHIP_PROPERTIES.length; d++) {
const canEl = el(`can${SHIP_PROPERTIES[d][0]}`);
const findEl = el(`find${SHIP_PROPERTIES[d][0]}`);
if (canEl && findEl) {
const can = canEl.textContent === LOCA_YES;
const maxShips = can ? Math.floor(c / SHIP_PROPERTIES[d][1] * (1 + p.percentShips / 100)) : 0;
findEl.textContent = numToOGame(maxShips);
findEl.className = maxShips > 0 ? 'bolder-label can-be-found-yes' : '';
}
}
const darkMatterRaw = 1800 * (1 + p.darkMatterDiscoveryBonus / 100);
const darkMatter = Math.min(2000000, Math.floor(darkMatterRaw));
const darkMatterFindEl = el('darkMatterFind');
if (darkMatterFindEl) darkMatterFindEl.textContent = numToOGame(darkMatter);
options.save();
cargoCache.key = null;
}
// ==================== INIT BONUSES PANEL ====================
function initBonusesPanel() {
const container = el('lf-ships-bonuses');
if (!container) return;
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
container.innerHTML =
`<table><thead><tr>` +
`<th style="text-align:left;padding:2px 4px;">${dict.shipType || 'Ship Type'}</th>` +
`<th style="text-align:center;padding:2px 4px;">${dict.expeditionsShipBonus || 'Bonus (%)'}</th>` +
`</tr></thead><tbody></tbody></table>`;
const tbody = container.querySelector('tbody');
const frag = document.createDocumentFragment();
SHIPS_DATA.forEach((ship, i) => {
const row = document.createElement('tr');
row.className = i % 2 === 0 ? 'odd' : 'even';
const nameCell = document.createElement('td');
nameCell.style.cssText = 'text-align:left;padding:2px 4px;display:flex;align-items:center;gap:8px;';
const img = createShipIcon(`images/ships/${SHIP_IMAGE_MAP[ship[0]]}`, getShipName(ship[0]), 20);
nameCell.appendChild(img);
nameCell.appendChild(document.createTextNode(getShipName(ship[0])));
const bonusCell = document.createElement('td');
bonusCell.style.cssText = 'text-align:center;padding:2px 4px;';
const input = document.createElement('input');
input.type = 'text';
input.inputMode = 'numeric';
input.value = (options.prm.lfShipsBonuses && options.prm.lfShipsBonuses[i]) || 0;
input.dataset.index = i;
input.className = 'lf-bonus-input quantity-input';
input.addEventListener('input', e => {
e.target.value = e.target.value.replace(/[^0-9.]/g, '');
computeDebounced();
});
input.addEventListener('blur', function () {
const index = parseInt(this.dataset.index);
if (isNaN(index) || index < 0 || index >= 15) return;
const value = parseFloat(this.value) || 0;
if (!options.prm.lfShipsBonuses) options.prm.lfShipsBonuses = Array(15).fill(0);
options.prm.lfShipsBonuses[index] = value;
options.save();
computeDebounced();
});
bonusCell.appendChild(input);
row.append(nameCell, bonusCell);
frag.appendChild(row);
});
tbody.appendChild(frag);
}
// ==================== INIT EXPEDITIONS TABLE ====================
let tableInitAttempts = 0;
function initExpeditionsTable() {
const tbody = el('expeditionsFleetBody');
if (!tbody) {
if (++tableInitAttempts < 20) setTimeout(initExpeditionsTable, 100);
return;
}
tableInitAttempts = 0;
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || 'Yes';
LOCA_NO = dict.expeditionsNo || 'No';
if (tbody.children.length === 0) {
const frag = document.createDocumentFragment();
SHIPS_DATA.forEach((ship, i) => {
const tr = document.createElement('tr');
tr.className = i % 2 === 0 ? 'odd' : 'even';
const nameCell = document.createElement('td');
nameCell.className = 'first-column';
nameCell.style.cssText = 'display:flex;align-items:center;gap:8px;';
const img = createShipIcon(`images/ships/${SHIP_IMAGE_MAP[ship[0]]}`, getShipName(ship[0]), 28);
nameCell.appendChild(img);
nameCell.appendChild(document.createTextNode(getShipName(ship[0])));
const qtyCell = document.createElement('td');
qtyCell.style.cssText = 'text-align:center;';
qtyCell.className = 'quantity-cell';
const input = document.createElement('input');
input.id = `num${ship[5]}`;
input.type = 'text';
input.inputMode = 'numeric';
input.placeholder = '0';
input.className = 'quantity-input';
input.addEventListener('input', function () {
this.value = this.value.replace(/[^0-9]/g, '');
computeDebounced();
});
input.addEventListener('blur', function () {
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
const capRow = document.createElement('tr');
capRow.className = 'storage-row';
capRow.innerHTML =
`<td colspan="2">${dict.expeditionsCargoCapacity || 'Storage Capacity:'}</td>` +
`<td colspan="2" style="text-align:right;"><span id="storageCapacity">0</span></td>`;
tbody.appendChild(capRow);
const resRow = document.createElement('tr');
resRow.className = 'resources-row';
resRow.innerHTML =
`<td colspan="2">${dict.expeditionsMaxResourcesLabel || 'Resource find (max):'}</td>` +
`<td style="text-align:right;">${dict.metal || 'Metal'}<br>${dict.crystal || 'Crystal'}<br>${dict.deut || 'Deuterium'}</td>` +
`<td style="text-align:right;"><span id="maxFindMet">0</span><br><span id="maxFindCry">0</span><br><span id="maxFindDeu">0</span></td>`;
tbody.appendChild(resRow);
const dmRow = document.createElement('tr');
dmRow.className = 'dark-matter-row';
dmRow.innerHTML =
`<td colspan="2">${dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):'}</td>` +
`<td colspan="2" style="text-align:right;"><span id="darkMatterFind">0</span></td>`;
tbody.appendChild(dmRow);
}
populateFleetFromJSON(JSON.parse(options.prm.fleet || '{}'));
restoreExpeditionSettings();
compute();
}
// ==================== ACCORDION ====================
let accordionBound = false;
function initAccordion() {
const header = document.querySelector('#lf-bonuses-accordion .ui-accordion-header');
const content = el('accordion-lf-prm');
if (!header || !content) return;
if (accordionBound) return;
accordionBound = true;
const newHeader = header.cloneNode(true);
header.parentNode.replaceChild(newHeader, header);
newHeader.addEventListener('click', function (e) {
e.preventDefault();
e.stopPropagation();
const isVisible = content.style.display === 'block';
content.style.display = isVisible ? 'none' : 'block';
const icon = this.querySelector('.ui-icon');
if (icon) icon.className = `ui-icon ui-icon-triangle-1-${isVisible ? 'e' : 's'}`;
localStorage.setItem('og_expeditions_accordion_expanded', JSON.stringify(!isVisible));
});
const isExpanded = JSON.parse(localStorage.getItem('og_expeditions_accordion_expanded') || 'false');
content.style.display = isExpanded ? 'block' : 'none';
const icon = newHeader.querySelector('.ui-icon');
if (icon) icon.className = `ui-icon ui-icon-triangle-1-${isExpanded ? 's' : 'e'}`;
}
// ==================== EVENTS ====================
function bindEvents() {
['player-class', 'universe-speed', 'highTop', 'resource-discovery-booster'].forEach(id => {
const element = el(id);
if (element) element.onchange = computeDebounced;
});
['tech_hyper-level', 'percent-resources', 'percent-ships', 'class-bonus-collector',
'class-bonus-discoverer', 'dark-matter-discovery-bonus'].forEach(id => {
const element = el(id);
if (!element) return;
const sanitize = function () { this.value = this.value.replace(/[^0-9]/g, ''); };
element.oninput = sanitize;
element.onblur = computeDebounced;
});
const clearBtn = el('clearFleet');
if (clearBtn) clearBtn.onclick = clearFleet;
}
// ==================== LANGUAGE UPDATE ====================
function updateExpeditionsLang() {
const lang = localStorage.getItem('og_calc_lang_v2') || 'ru';
const dict = window.getLangDict ? window.getLangDict(lang) : {};
LOCA_YES = dict.expeditionsYes || 'Yes';
LOCA_NO = dict.expeditionsNo || 'No';
const accordionHeaderSpan = document.querySelector('#lf-bonuses-accordion .ui-accordion-header a span');
if (accordionHeaderSpan) accordionHeaderSpan.textContent = dict.expeditionsShipBonuses || 'Ships stats bonuses (%)';
const settingsTitle = document.querySelector('#settings-panel .settings-title');
if (settingsTitle) settingsTitle.textContent = dict.expeditionsSettingsTitle || 'OGame Expeditions Calculator';
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
if (label && dict[key]) label.textContent = dict[key];
}
const highTopSelect = el('highTop');
if (highTopSelect) {
for (let i = 0; i < highTopSelect.options.length; i++) {
const key = `expeditionsHighTop${i + 1}`;
if (dict[key]) highTopSelect.options[i].textContent = dict[key];
}
}
const playerClassSelect = el('player-class');
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
document.querySelectorAll('#expeditionsFleetBody .first-column').forEach((cell, i) => {
if (SHIPS_DATA[i]) {
const shipKey = SHIPS_DATA[i][0];
cell.childNodes.forEach(node => { if (node.nodeType === 3) node.textContent = ''; });
cell.appendChild(document.createTextNode(getShipName(shipKey)));
const img = cell.querySelector('img');
if (img) img.alt = getShipName(shipKey);
}
});
initBonusesPanel();
setTimeout(() => {
const resourceRow = document.querySelector('.resources-row td:first-child');
if (resourceRow) resourceRow.textContent = dict.expeditionsMaxResourcesLabel || 'Resource find (max):';
const darkMatterRow = document.querySelector('.dark-matter-row td:first-child');
if (darkMatterRow) darkMatterRow.textContent = dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):';
}, 100);
compute();
}
// ==================== INIT ====================
let isExpeditionsInit = false;
function initExpeditionUI() {
if (isExpeditionsInit) {
updateExpeditionsLang();
return;
}
isExpeditionsInit = true;
options.load();
initExpeditionsTable();
initBonusesPanel();
initAccordion();
bindEvents();
compute();
document.removeEventListener('languageChanged', updateExpeditionsLang);
document.addEventListener('languageChanged', updateExpeditionsLang);
updateExpeditionsLang();
}
// ==================== EXPORTS ====================
window.initExpeditionUI = initExpeditionUI;
window.updateExpeditionsLang = updateExpeditionsLang;
window.clearFleet = clearFleet;
window.compute = compute;
// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
const savedView = localStorage.getItem('og_calc_active_view') || 'costs';
if (savedView === 'expeditions') setTimeout(initExpeditionUI, 150);
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.addEventListener('click', function () {
if (this.dataset.view === 'expeditions') setTimeout(initExpeditionUI, 100);
});
});
});
})();