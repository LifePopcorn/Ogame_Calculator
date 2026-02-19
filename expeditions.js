// ============================================
// OGame Калькулятор - Оптимизированный expeditions.js
// Версия: 1.08.0 (Исправленная)
// ============================================
(function() {
'use strict';

// ============================================
// КОНФИГУРАЦИЯ
// ============================================
const CONFIG = Object.freeze({
    STORAGE_KEY: 'options_expeditions',
    ACCORDION_KEY: 'og_expeditions_accordion_expanded',
    POSITION_KEY: 'og_calc_expeditions_pos',
    LANG_KEY: 'og_calc_lang_v2',
    VIEW_KEY: 'og_calc_active_view',
    MAX_DARK_MATTER: 2000000,
    LF_BONUSES_COUNT: 15,
    DEBOUNCE_DELAY: 120
});

const HIGH_TOP_VALUES = Object.freeze([
    40000, 500000, 1200000, 1800000, 2400000,
    3000000, 3600000, 4200000, 5000000
]);

// ============================================
// ДАННЫЕ КОРАБЛЕЙ
// ============================================
const SHIPS_DATA = Object.freeze([
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
]);

const SHIP_IMAGES = Object.freeze({
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
});

const SHIP_PROPERTIES = Object.freeze([
    ['RC', 16e3], ['CS', 3e4], ['DS', 9e6], ['EP', 1e3],
    ['SC', 4e3], ['LF', 4e3], ['LC', 12e3], ['HF', 1e4],
    ['CR', 27e3], ['PA', 23e3], ['BS', 6e4], ['BC', 7e4],
    ['BM', 75e3], ['DR', 11e4], ['RE', 14e4]
]);

const FLEET_CODE_MAPPING = Object.freeze({
    'SC': '202', 'LC': '203', 'LF': '204', 'HF': '205', 'PA': '219',
    'CR': '206', 'BS': '207', 'BC': '215', 'CS': '208', 'RC': '209',
    'EP': '210', 'BM': '211', 'DR': '213', 'DS': '214', 'RE': '218'
});

// ============================================
// СОСТОЯНИЕ
// ============================================
let state = {
    options: {
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
        lfShipsBonuses: Array(CONFIG.LF_BONUSES_COUNT).fill(0)
    },
    loca: { yes: 'Yes', no: 'No' },
    initialized: false
};

// ============================================
// УТИЛИТЫ (используем из languages.js если доступны)
// ============================================
const debounce = (fn, wait = CONFIG.DEBOUNCE_DELAY) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), wait);
    };
};

const numToOGame = (n) => {
    if (n == null || isNaN(n)) return '0';
    return Math.floor(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseInput = (input) => {
    if (!input?.value) return 0;
    const clean = input.value.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
};

const getLangDict = () => {
    const lang = localStorage.getItem(CONFIG.LANG_KEY) || 'ru';
    return window.getLangDict ? window.getLangDict(lang) : {};
};

const getShipName = (shipKey) => {
    const dict = getLangDict();
    const key = `ship_${shipKey.replace(/-/g, '_')}`;
    return dict[key] || shipKey.replace(/-/g, ' ');
};

const saveToStorage = () => {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.options));
    } catch (e) {
        console.error('Error saving expedition options:', e);
    }
};

const loadFromStorage = () => {
    try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(state.options, data);
            if (!Array.isArray(state.options.lfShipsBonuses) ||
                state.options.lfShipsBonuses.length !== CONFIG.LF_BONUSES_COUNT) {
                state.options.lfShipsBonuses = Array(CONFIG.LF_BONUSES_COUNT).fill(0);
            }
        }
    } catch (e) {
        console.error('Error loading expedition options:', e);
    }
};

// ============================================
// СОЗДАНИЕ ЭЛЕМЕНТОВ С ИКОНКАМИ
// ============================================
const createShipCell = (shipKey, iconSize = 20) => {
    const cell = document.createElement('td');
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.gap = '8px';
    
    const img = document.createElement('img');
    img.src = `images/ships/${SHIP_IMAGES[shipKey]}`;
    img.alt = getShipName(shipKey);
    img.className = 'icon';
    img.width = iconSize;
    img.height = iconSize;
    img.loading = 'lazy';
    img.style.borderRadius = '4px';

    img.addEventListener('error', () => {
        if (!img._fallback) {
            const fb = document.createElement('span');
            fb.className = 'icon-fallback';
            fb.textContent = getShipName(shipKey).charAt(0);
            fb.style.cssText = `display:inline-block;width:${iconSize}px;height:${iconSize}px;line-height:${iconSize}px;text-align:center;margin-right:6px;`;
            img.style.display = 'none';
            img.parentNode?.insertBefore(fb, img.nextSibling);
            img._fallback = true;
        }
    });

    cell.appendChild(img);
    cell.appendChild(document.createTextNode(getShipName(shipKey)));
    return cell;
};

// ============================================
// РАСЧЁТЫ
// ============================================
const getCargoCapacity = (abbrev = null) => {
    const { hyperTechLevel, playerClass, classBonusCollector, lfShipsBonuses } = state.options;
    
    if (abbrev) {
        const idx = SHIPS_DATA.findIndex(s => s[5] === abbrev);
        if (idx === -1) return 0;
        let base = SHIPS_DATA[idx][4] * (1 + 0.05 * hyperTechLevel);
        if (playerClass === 1 && idx < 2) {
            base += SHIPS_DATA[idx][4] * 0.25 * (1 + classBonusCollector / 100);
        }
        base += SHIPS_DATA[idx][4] * (lfShipsBonuses[idx] || 0) / 100;
        return Math.floor(base);
    }

    let capacity = 0;
    SHIPS_DATA.forEach((ship, i) => {
        const count = parseInput(document.getElementById(`num${ship[5]}`));
        if (count > 0) {
            let inc = count * ship[4] * (1 + 0.05 * hyperTechLevel);
            if (playerClass === 1 && i < 2) {
                inc += count * ship[4] * 0.25 * (1 + classBonusCollector / 100);
            }
            if (playerClass === 2 && (i === 7 || i === 14)) {
                inc += count * ship[4] * 0.2;
            }
            inc += count * ship[4] * (lfShipsBonuses[i] || 0) / 100;
            capacity += inc;
        }
    });
    return Math.floor(capacity);
};

const createFleetJSON = () => {
    const json = {};
    for (const [abbr, code] of Object.entries(FLEET_CODE_MAPPING)) {
        const input = document.getElementById(`num${abbr}`);
        json[code] = input ? parseInput(input) : 0;
    }
    return json;
};

const populateFleetFromJSON = (json = {}) => {
    const rev = Object.fromEntries(
        Object.entries(FLEET_CODE_MAPPING).map(([a, c]) => [c, a])
    );
    for (const [code, val] of Object.entries(json)) {
        const abbr = rev[code];
        if (abbr) {
            const input = document.getElementById(`num${abbr}`);
            if (input) input.value = val > 0 ? numToOGame(val) : '';
        }
    }
};

const compute = debounce(() => {
    const ids = ['player-class', 'universe-speed', 'tech_hyper-level',
        'percent-resources', 'percent-ships', 'class-bonus-collector',
        'class-bonus-discoverer', 'dark-matter-discovery-bonus',
        'resource-discovery-booster'];
    
    const mapping = {
        'player-class': 'playerClass',
        'universe-speed': 'universeSpeed',
        'tech_hyper-level': 'hyperTechLevel',
        'percent-resources': 'percentRes',
        'percent-ships': 'percentShips',
        'class-bonus-collector': 'classBonusCollector',
        'class-bonus-discoverer': 'classBonusDiscoverer',
        'dark-matter-discovery-bonus': 'darkMatterDiscoveryBonus',
        'resource-discovery-booster': 'resourceDiscoveryBooster'
    };

    ids.forEach(id => {
        const el = document.getElementById(id);
        const key = mapping[id];
        if (el && key) {
            state.options[key] = id.includes('boost') || id.includes('class')
                ? parseInt(el?.value) || 0
                : parseInput(el);
        }
    });

    const bonusInputs = document.querySelectorAll('#lf-ships-bonuses input');
    bonusInputs.forEach((inp, i) => {
        if (i < CONFIG.LF_BONUSES_COUNT) {
            state.options.lfShipsBonuses[i] = parseFloat(inp.value) || 0;
        }
    });

    state.options.fleet = JSON.stringify(createFleetJSON());

    const hasPathfinder = parseInput(document.getElementById('numPA')) > 0;
    const totalCapacity = getCargoCapacity();
    const tbody = document.getElementById('expeditionsFleetBody');
    if (!tbody) return;

    SHIP_PROPERTIES.forEach((prop) => {
        const el = document.getElementById(`can${prop[0]}`);
        if (el) {
            el.textContent = state.loca.no;
            el.className = '';
        }
    });

    let g = 0;
    let foundShips = false;

    SHIP_PROPERTIES.forEach((prop, d) => {
        const count = parseInput(document.getElementById(`num${prop[0]}`));
        if (d > 2 && count > 0) {
            foundShips = true;
            for (let j = 3; j <= d; j++) {
                const el = document.getElementById(`can${SHIP_PROPERTIES[j][0]}`);
                if (el) {
                    el.textContent = state.loca.yes;
                    el.className = 'bolder-label';
                }
            }
            if (d < SHIP_PROPERTIES.length - 1) {
                const nextEl = document.getElementById(`can${SHIP_PROPERTIES[d+1][0]}`);
                if (nextEl) {
                    nextEl.textContent = state.loca.yes;
                    nextEl.className = 'bolder-label';
                }
                g = Math.max(g, SHIP_PROPERTIES[d+1][1]);
            } else {
                g = Math.max(g, prop[1]);
            }
        }
    });

    const highTopSelect = document.getElementById('highTop');
    const highTop = HIGH_TOP_VALUES[highTopSelect?.selectedIndex] || 40000;
    state.options.highTop = highTop;

    const factor = hasPathfinder
        ? (state.options.playerClass === 0 ? 3 * state.options.universeSpeed : 2 * state.options.universeSpeed)
        : (state.options.playerClass === 0 ? 1.5 * state.options.universeSpeed : state.options.universeSpeed);

    let maxPoints = Math.floor(factor * highTop);
    const discovererBonus = state.options.playerClass === 0
        ? (1 + state.options.classBonusDiscoverer / 100)
        : 1;
    maxPoints = Math.floor(maxPoints * (1 + state.options.percentRes / 100) * discovererBonus);

    const singleLCCap = getCargoCapacity('LC');
    const minLC = singleLCCap > 0 ? Math.ceil(maxPoints / singleLCCap) : 0;

    const dict = getLangDict();
    document.getElementById('max_points').textContent =
        `${dict.expeditionsMaxPointsLabel || 'Resource find (max):'}: ${numToOGame(maxPoints)} (${minLC} LC)`;

    let b = factor * highTop;
    const c = foundShips ? Math.max(10000, Math.min(totalCapacity, Math.floor(b))) : 0;
    let d_val = Math.max(1000 * b, 200000) * 0.001;
    const resFactor = (1 + state.options.percentRes / 100) * discovererBonus *
                      (1 + state.options.resourceDiscoveryBooster / 100);
    d_val = Math.floor(d_val * resFactor);

    const metal = totalCapacity > 0 ? Math.min(d_val, totalCapacity) : 0;
    const crystal = totalCapacity > 0 ? Math.min(d_val / 2, totalCapacity) : 0;
    const deut = totalCapacity > 0 ? Math.min(d_val / 3, totalCapacity) : 0;

    const storageEl = document.getElementById('storageCapacity');
    if (storageEl) {
        storageEl.textContent = numToOGame(totalCapacity);
        storageEl.style.fontStyle = d_val > totalCapacity ? 'italic' : 'normal';
    }

    ['maxFindMet', 'maxFindCry', 'maxFindDeu'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.textContent = numToOGame([metal, crystal, deut][i]);
    });

    for (let d = 3; d < SHIP_PROPERTIES.length; d++) {
        const canEl = document.getElementById(`can${SHIP_PROPERTIES[d][0]}`);
        const findEl = document.getElementById(`find${SHIP_PROPERTIES[d][0]}`);
        if (canEl && findEl) {
            const can = canEl.textContent === state.loca.yes;
            const maxShips = can ? Math.floor(c / SHIP_PROPERTIES[d][1] * (1 + state.options.percentShips / 100)) : 0;
            findEl.textContent = numToOGame(maxShips);
            findEl.className = maxShips > 0 ? 'bolder-label' : '';
        }
    }

    const darkMatter = Math.min(CONFIG.MAX_DARK_MATTER,
        Math.floor(1800 * (1 + state.options.darkMatterDiscoveryBonus / 100)));
    document.getElementById('darkMatterFind').textContent = numToOGame(darkMatter);

    saveToStorage();
}, CONFIG.DEBOUNCE_DELAY);

// ============================================
// ИНИЦИАЛИЗАЦИЯ ТАБЛИЦ
// ============================================
const initBonusesPanel = () => {
    const container = document.getElementById('lf-ships-bonuses');
    if (!container) return;
    
    const dict = getLangDict();
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th style="text-align:left;padding:2px 4px;">${dict.shipType || 'Ship Type'}</th>
                    <th style="text-align:center;padding:2px 4px;">${dict.expeditionsShipBonus || 'Bonus (%)'}</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    const tbody = container.querySelector('tbody');
    SHIPS_DATA.forEach((ship, i) => {
        const row = document.createElement('tr');
        row.className = i % 2 === 0 ? 'odd' : 'even';
        
        const nameCell = createShipCell(ship[0], 20);
        nameCell.style.padding = '2px 4px';
        
        const bonusCell = document.createElement('td');
        bonusCell.style.textAlign = 'center';
        bonusCell.style.padding = '2px 4px';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.inputMode = 'numeric';
        input.value = state.options.lfShipsBonuses[i] || 0;
        input.dataset.index = i;
        input.className = 'lf-bonus-input quantity-input';
        
        const updateBonus = debounce(() => {
            const idx = parseInt(input.dataset.index);
            if (!isNaN(idx) && idx >= 0 && idx < CONFIG.LF_BONUSES_COUNT) {
                state.options.lfShipsBonuses[idx] = parseFloat(input.value) || 0;
                saveToStorage();
                compute();
            }
        }, CONFIG.DEBOUNCE_DELAY);
        
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
        });
        input.addEventListener('blur', updateBonus);
        
        bonusCell.appendChild(input);
        row.append(nameCell, bonusCell);
        tbody.appendChild(row);
    });
};

const initExpeditionsTable = () => {
    const tbody = document.getElementById('expeditionsFleetBody');
    if (!tbody) {
        setTimeout(initExpeditionsTable, 100);
        return;
    }
    tbody.innerHTML = '';
    
    const dict = getLangDict();
    state.loca.yes = dict.expeditionsYes || 'Yes';
    state.loca.no = dict.expeditionsNo || 'No';

    SHIPS_DATA.forEach((ship, i) => {
        const tr = document.createElement('tr');
        tr.className = i % 2 === 0 ? 'odd' : 'even';
        
        const nameCell = createShipCell(ship[0], 28);
        nameCell.className = 'first-column';
        
        const qtyCell = document.createElement('td');
        qtyCell.style.textAlign = 'center';
        qtyCell.className = 'quantity-cell';
        
        const input = document.createElement('input');
        input.id = `num${ship[5]}`;
        input.type = 'text';
        input.inputMode = 'numeric';
        input.placeholder = '0';
        input.className = 'quantity-input';
        
        const updateFleet = debounce(() => {
            validateAndFormatInput(input);
            compute();
        }, CONFIG.DEBOUNCE_DELAY);
        
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
        input.addEventListener('blur', updateFleet);
        
        qtyCell.appendChild(input);
        
        const canCell = document.createElement('td');
        canCell.style.textAlign = 'center';
        const canSpan = document.createElement('span');
        canSpan.id = `can${ship[5]}`;
        canSpan.textContent = state.loca.no;
        canCell.appendChild(canSpan);
        
        const maxCell = document.createElement('td');
        maxCell.style.textAlign = 'center';
        const maxSpan = document.createElement('span');
        maxSpan.id = `find${ship[5]}`;
        maxSpan.textContent = '0';
        maxCell.appendChild(maxSpan);
        
        tr.append(nameCell, qtyCell, canCell, maxCell);
        tbody.appendChild(tr);
    });

    const langDict = getLangDict();

    const capRow = document.createElement('tr');
    capRow.className = 'storage-row';
    capRow.innerHTML = `
        <td colspan="2">${langDict.expeditionsCargoCapacity || 'Storage Capacity:'}</td>
        <td colspan="2" style="text-align:right;">
            <span id="storageCapacity">0</span>
        </td>
    `;
    tbody.appendChild(capRow);

    const resRow = document.createElement('tr');
    resRow.className = 'resources-row';
    resRow.innerHTML = `
        <td colspan="2">${langDict.expeditionsMaxResourcesLabel || 'Resource find (max):'}</td>
        <td style="text-align:right;">
            ${langDict.metal || 'Metal'}<br>
            ${langDict.crystal || 'Crystal'}<br>
            ${langDict.deut || 'Deuterium'}
        </td>
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
        <td colspan="2">${langDict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):'}</td>
        <td colspan="2" style="text-align:right;">
            <span id="darkMatterFind">0</span>
        </td>
    `;
    tbody.appendChild(dmRow);
};

const validateAndFormatInput = (input) => {
    const num = parseInput(input);
    input.value = num > 0 ? numToOGame(num) : '';
};

// ============================================
// АККОРДЕОН
// ============================================
const initAccordion = () => {
    const header = document.querySelector('#lf-bonuses-accordion .ui-accordion-header');
    const content = document.getElementById('accordion-lf-prm');
    if (!header || !content) {
        setTimeout(initAccordion, 100);
        return;
    }
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);

    newHeader.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isVisible = content.style.display === 'block';
        content.style.display = isVisible ? 'none' : 'block';
        const icon = newHeader.querySelector('.ui-icon');
        if (icon) {
            icon.className = `ui-icon ui-icon-triangle-1-${isVisible ? 'e' : 's'}`;
        }
        localStorage.setItem(CONFIG.ACCORDION_KEY, JSON.stringify(!isVisible));
    });

    const isExpanded = JSON.parse(localStorage.getItem(CONFIG.ACCORDION_KEY) || 'false');
    content.style.display = isExpanded ? 'block' : 'none';
    const icon = newHeader.querySelector('.ui-icon');
    if (icon) {
        icon.className = `ui-icon ui-icon-triangle-1-${isExpanded ? 's' : 'e'}`;
    }
};

// ============================================
// СОБЫТИЯ
// ============================================
const bindEvents = () => {
    const changeIds = ['player-class', 'universe-speed', 'highTop', 'resource-discovery-booster'];
    const inputIds = ['tech_hyper-level', 'percent-resources', 'percent-ships',
        'class-bonus-collector', 'class-bonus-discoverer', 'dark-matter-discovery-bonus'];
    
    changeIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.removeEventListener('change', compute);
            el.addEventListener('change', compute);
        }
    });

    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const sanitize = () => { el.value = el.value.replace(/[^0-9]/g, ''); };
            el.removeEventListener('input', sanitize);
            el.addEventListener('input', sanitize);
            el.removeEventListener('blur', compute);
            el.addEventListener('blur', compute);
        }
    });

    const clearBtn = document.getElementById('clearFleet');
    if (clearBtn) {
        clearBtn.removeEventListener('click', clearFleet);
        clearBtn.addEventListener('click', clearFleet);
    }
};

const clearFleet = () => {
    SHIPS_DATA.forEach(ship => {
        const input = document.getElementById(`num${ship[5]}`);
        if (input) input.value = '';
    });
    compute();
};

// ============================================
// DRAG & DROP
// ============================================
const initDragHandler = (wrapperId, handleId, storageKey) => {
    const handle = document.getElementById(handleId);
    const wrapper = document.getElementById(wrapperId);
    if (!handle || !wrapper) return;
    
    let isDragging = false;
    let startX, startY, startWrapperX = 0, startWrapperY = 0;

    const getCurrentPosition = () => {
        const style = getComputedStyle(wrapper);
        const transform = style.transform;
        if (transform && transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            return { x: matrix.e, y: matrix.f };
        }
        return { x: parseFloat(style.left) || 0, y: parseFloat(style.top) || 0 };
    };

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
        try {
            localStorage.setItem(storageKey, JSON.stringify({
                left: Math.round(rect.left),
                top: Math.round(rect.top)
            }));
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
};

// ============================================
// ЯЗЫК
// ============================================
const updateExpeditionsLang = () => {
    const dict = getLangDict();
    state.loca.yes = dict.expeditionsYes || 'Yes';
    state.loca.no = dict.expeditionsNo || 'No';
    
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
        if (label && dict[key]) label.textContent = dict[key];
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
        const classMap = [
            ['expeditionsClassDiscoverer', 0],
            ['expeditionsClassCollector', 1],
            ['expeditionsClassGeneral', 2]
        ];
        classMap.forEach(([key, idx]) => {
            if (dict[key]) playerClassSelect.options[idx].textContent = dict[key];
        });
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
    populateFleetFromJSON(JSON.parse(state.options.fleet || '{}'));

    setTimeout(() => {
        const resourceRow = document.querySelector('.resources-row td:first-child');
        if (resourceRow) resourceRow.textContent = dict.expeditionsMaxResourcesLabel || 'Resource find (max):';
        const darkMatterRow = document.querySelector('.dark-matter-row td:first-child');
        if (darkMatterRow) darkMatterRow.textContent = dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):';
        setTimeout(initAccordion, 50);
    }, 100);

    compute();
};

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================
const initExpeditionUI = () => {
    if (state.initialized) return;
    state.initialized = true;
    
    loadFromStorage();
    initExpeditionsTable();

    try {
        populateFleetFromJSON(JSON.parse(state.options.fleet || '{}'));
    } catch (e) {
        console.error('Error populating fleet:', e);
    }

    initBonusesPanel();
    initAccordion();
    initDragHandler('expeditionsWrapper', 'dragHandleExpeditions', CONFIG.POSITION_KEY);
    bindEvents();
    compute();

    document.removeEventListener('languageChanged', updateExpeditionsLang);
    document.addEventListener('languageChanged', updateExpeditionsLang);
    updateExpeditionsLang();
};

// ============================================
// ЭКСПОРТ
// ============================================
window.initExpeditionUI = initExpeditionUI;
window.updateExpeditionsLang = updateExpeditionsLang;
window.clearFleet = clearFleet;
window.compute = compute;

// ============================================
// ЗАПУСК
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const savedView = localStorage.getItem(CONFIG.VIEW_KEY) || 'costs';
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
        btn.addEventListener('click', () => setTimeout(initAccordion, 100));
    });
});

})();