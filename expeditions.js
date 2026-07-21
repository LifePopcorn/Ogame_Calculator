(function () {
    ' strict';

    const LANG_KEY = 'og_calc_lang_v2';
    const STORAGE_KEY = 'options_expeditions';
    const ACCORDION_KEY = 'og_expeditions_accordion_expanded';
    const ACTIVE_VIEW_KEY = 'og_calc_active_view';

    const SHIPS = [
        ['small-cargo', 5000, 'SC'],
        ['large-cargo', 25000, 'LC'],
        ['light-fighter', 50, 'LF'],
        ['heavy-fighter', 100, 'HF'],
        ['pathfinder', 10000, 'PA'],
        ['cruiser', 800, 'CR'],
        ['battleship', 1500, 'BS'],
        ['battlecruiser', 750, 'BC'],
        ['colony-ship', 7500, 'CS'],
        ['recycler', 20000, 'RC'],
        ['esp-probe', 0, 'EP'],
        ['bomber', 500, 'BM'],
        ['destroyer', 2000, 'DR'],
        ['death-star', 1000000, 'DS'],
        ['reaper', 10000, 'RE']
    ];

    const SHIP_IMAGE_MAP = {
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

    const SHIP_PROPERTIES = [
        ['RC', 16000],
        ['CS', 30000],
        ['DS', 9000000],
        ['EP', 1000],
        ['SC', 4000],
        ['LF', 4000],
        ['LC', 12000],
        ['HF', 10000],
        ['CR', 27000],
        ['PA', 23000],
        ['BS', 60000],
        ['BC', 70000],
        ['BM', 75000],
        ['DR', 110000],
        ['RE', 140000]
    ];

    const FLEET_CODE_MAP = {
        SC: '202',
        LC: '203',
        LF: '204',
        HF: '205',
        PA: '219',
        CR: '206',
        BS: '207',
        BC: '215',
        CS: '208',
        RC: '209',
        EP: '210',
        BM: '211',
        DR: '213',
        DS: '214',
        RE: '218'
    };

    const HIGH_TOP_VALUES = [
        40000,
        500000,
        1200000,
        1800000,
        2400000,
        3000000,
        3600000,
        4200000,
        5000000
    ];

    const BONUSES_ORDER = [0, 1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 7, 14, 4];

    function safeGet(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }

    function safeSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    function safeJsonParse(value, fallback) {
        try {
            const parsed = JSON.parse(value);
            return parsed === null ? fallback : parsed;
        } catch (e) {
            return fallback;
        }
    }

    const state = {
        prm: {
            universeSpeed: 1,
            highTop: 40000,
            highTopIndex: 0,
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
            const saved = safeJsonParse(safeGet(STORAGE_KEY, null), null);

            if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
                return;
            }

            Object.assign(this.prm, saved);

            if (!Array.isArray(this.prm.lfShipsBonuses) || this.prm.lfShipsBonuses.length !== 15) {
                this.prm.lfShipsBonuses = Array(15).fill(0);
            }

            if (!Number.isInteger(this.prm.highTopIndex) || this.prm.highTopIndex < 0) {
                this.prm.highTopIndex = 0;
            }
        },

        save() {
            safeSet(STORAGE_KEY, JSON.stringify(this.prm));
        }
    };

    let LOCA_YES = 'Да';
    let LOCA_NO = 'Нет';

    const el = id => document.getElementById(id);

    const getLang = () => {
        const lang = safeGet(LANG_KEY, 'ru');
        return window.getLangDict ? window.getLangDict(lang) : {};
    };

    const numToOGame = n => {
        if (n === null || n === undefined || Number.isNaN(n)) {
            return '0';
        }

        return Math.floor(Math.abs(n))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const parseInput = input => {
        if (!input || !input.value) {
            return 0;
        }

        const clean = input.value.replace(/[^0-9]/g, '');
        return clean ? parseInt(clean, 10) : 0;
    };

    const validateAndFormatInput = input => {
        const num = parseInput(input);
        input.value = num > 0 ? numToOGame(num) : '';
    };

    const getShipName = shipKey => {
        const dict = getLang();
        const dictKey = 'ship_' + shipKey.replace(/-/g, '_');
        return dict[dictKey] || shipKey.replace(/-/g, ' ');
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
            if (img._fallback) {
                return;
            }

            img.removeEventListener('error', handler);

            const fb = document.createElement('span');
            fb.className = 'icon-fallback';
            fb.textContent = alt.charAt(0);
            fb.style.cssText = `margin-right:6px;display:inline-block;width:${size}px;height:${size}px;line-height:${size}px;text-align:center;`;

            img.style.display = 'none';

            if (img.parentNode) {
                img.parentNode.insertBefore(fb, img.nextSibling);
            }

            img._fallback = true;
        }, { once: true });

        return img;
    };

    const cargoCache = {
        key: null,
        single: new Map()
    };

    function getCargoCapacity(abbr) {
        const p = state.prm;

        const paramsKey = [
            p.hyperTechLevel,
            p.playerClass,
            p.classBonusCollector,
            p.lfShipsBonuses.join(',')
        ].join('|');

        if (cargoCache.key !== paramsKey) {
            cargoCache.key = paramsKey;
            cargoCache.single.clear();
        }

        if (abbr) {
            if (cargoCache.single.has(abbr)) {
                return cargoCache.single.get(abbr);
            }

            const idx = SHIPS.findIndex(s => s[2] === abbr);

            if (idx === -1) {
                return 0;
            }

            let cap = SHIPS[idx][1] * (1 + 0.05 * p.hyperTechLevel);

            if (p.playerClass === 1 && idx < 2) {
                cap += SHIPS[idx][1] * 0.25 * (1 + p.classBonusCollector / 100);
            }

            cap += SHIPS[idx][1] * (p.lfShipsBonuses[idx] || 0) / 100;
            cap = Math.floor(cap);

            cargoCache.single.set(abbr, cap);

            return cap;
        }

        let total = 0;

        SHIPS.forEach((ship, i) => {
            const count = parseInput(el('num' + ship[2]));

            if (count <= 0) {
                return;
            }

            let inc = count * ship[1] * (1 + 0.05 * p.hyperTechLevel);

            if (p.playerClass === 1 && i < 2) {
                inc += count * ship[1] * 0.25 * (1 + p.classBonusCollector / 100);
            }

            if (p.playerClass === 2 && (ship[0] === 'recycler' || ship[0] === 'pathfinder')) {
                inc += count * ship[1] * 0.2;
            }

            inc += count * ship[1] * (p.lfShipsBonuses[i] || 0) / 100;

            total += inc;
        });

        return Math.floor(total);
    }

    function ensureLfShipBonuses() {
        if (!Array.isArray(state.prm.lfShipsBonuses) || state.prm.lfShipsBonuses.length !== 15) {
            state.prm.lfShipsBonuses = Array(15).fill(0);
        }
    }

    function readLfShipBonuses() {
        ensureLfShipBonuses();

        document.querySelectorAll('#lf-ships-bonuses input').forEach(inp => {
            const idx = parseInt(inp.dataset.index, 10);

            if (!Number.isInteger(idx) || idx < 0 || idx >= 15) {
                return;
            }

            state.prm.lfShipsBonuses[idx] = parseFloat(inp.value) || 0;
        });
    }

    const createFleetJSON = () => {
        const json = {};

        for (const [abbr, code] of Object.entries(FLEET_CODE_MAP)) {
            json[code] = parseInput(el('num' + abbr));
        }

        return json;
    };

    const populateFleetFromJSON = (json = {}) => {
        if (!json || typeof json !== 'object' || Array.isArray(json)) {
            return;
        }

        const rev = Object.fromEntries(
            Object.entries(FLEET_CODE_MAP).map(([abbr, code]) => [code, abbr])
        );

        for (const [code, val] of Object.entries(json)) {
            const abbr = rev[code];

            if (!abbr) {
                continue;
            }

            const input = el('num' + abbr);

            if (input) {
                input.value = val > 0 ? numToOGame(val) : '';
            }
        }
    };

    const restoreExpeditionSettings = () => {
        const p = state.prm;

        const setTextInput = (id, val) => {
            const e = el(id);

            if (!e || val === undefined || val === null) {
                return;
            }

            e.value = val;
        };

        const setSelectValue = (id, val, fallbackIndex) => {
            const e = el(id);

            if (!e || val === undefined || val === null) {
                return;
            }

            const str = String(val);

            e.value = str;

            if (e.value === str) {
                return;
            }

            for (let i = 0; i < e.options.length; i++) {
                const opt = e.options[i];

                if (
                    opt.value === str ||
                    parseInt(opt.value, 10) === val ||
                    parseInt(opt.textContent, 10) === val
                ) {
                    e.selectedIndex = i;
                    return;
                }
            }

            if (Number.isInteger(fallbackIndex) && fallbackIndex >= 0 && fallbackIndex < e.options.length) {
                e.selectedIndex = fallbackIndex;
            }
        };

        setSelectValue('player-class', p.playerClass, p.playerClass);
        setSelectValue('universe-speed', p.universeSpeed, p.universeSpeed - 1);

        const highTopEl = el('highTop');

        if (highTopEl) {
            if (
                Number.isInteger(p.highTopIndex) &&
                p.highTopIndex >= 0 &&
                p.highTopIndex < highTopEl.options.length
            ) {
                highTopEl.selectedIndex = p.highTopIndex;
            } else {
                setSelectValue('highTop', p.highTop, 0);
            }
        }

        setSelectValue(
            'resource-discovery-booster',
            p.resourceDiscoveryBooster,
            Math.round((p.resourceDiscoveryBooster || 0) / 5)
        );

        setTextInput('tech_hyper-level', p.hyperTechLevel > 0 ? numToOGame(p.hyperTechLevel) : '');
        setTextInput('percent-resources', p.percentRes > 0 ? numToOGame(p.percentRes) : '');
        setTextInput('percent-ships', p.percentShips > 0 ? numToOGame(p.percentShips) : '');
        setTextInput('class-bonus-collector', p.classBonusCollector > 0 ? numToOGame(p.classBonusCollector) : '');
        setTextInput('class-bonus-discoverer', p.classBonusDiscoverer > 0 ? numToOGame(p.classBonusDiscoverer) : '');
        setTextInput('dark-matter-discovery-bonus', p.darkMatterDiscoveryBonus > 0 ? numToOGame(p.darkMatterDiscoveryBonus) : '');

        ensureLfShipBonuses();

        document.querySelectorAll('#lf-ships-bonuses input').forEach(inp => {
            const idx = parseInt(inp.dataset.index, 10);

            if (!Number.isInteger(idx) || idx < 0 || idx >= 15) {
                return;
            }

            if (p.lfShipsBonuses[idx] > 0) {
                inp.value = p.lfShipsBonuses[idx];
            }
        });
    };

    const clearFleet = () => {
        SHIPS.forEach(ship => {
            const input = el('num' + ship[2]);

            if (input) {
                input.value = '';
            }
        });

        compute();
    };

    let computeTimeout = null;

    const computeDebounced = () => {
        if (computeTimeout) {
            clearTimeout(computeTimeout);
        }

        computeTimeout = setTimeout(compute, 100);
    };

    function getSelectInt(id, fallback) {
        const e = el(id);

        if (!e) {
            return fallback;
        }

        const parsed = parseInt(e.value, 10);

        return Number.isNaN(parsed) ? fallback : parsed;
    }

    function compute() {
        const p = state.prm;

        const playerClassEl = el('player-class');

        if (playerClassEl) {
            const parsed = parseInt(playerClassEl.value, 10);
            p.playerClass = Number.isNaN(parsed) ? playerClassEl.selectedIndex : parsed;
        } else {
            p.playerClass = 0;
        }

        const universeSpeedEl = el('universe-speed');

        if (universeSpeedEl) {
            const parsed = parseInt(universeSpeedEl.value, 10);
            const speed = Number.isNaN(parsed) ? universeSpeedEl.selectedIndex + 1 : parsed;
            p.universeSpeed = speed > 0 ? speed : 1;
        } else {
            p.universeSpeed = 1;
        }

        p.hyperTechLevel = parseInput(el('tech_hyper-level'));
        p.percentRes = parseInput(el('percent-resources'));
        p.percentShips = parseInput(el('percent-ships'));
        p.classBonusCollector = parseInput(el('class-bonus-collector'));
        p.classBonusDiscoverer = parseInput(el('class-bonus-discoverer'));
        p.darkMatterDiscoveryBonus = parseInput(el('dark-matter-discovery-bonus'));
        p.resourceDiscoveryBooster = getSelectInt('resource-discovery-booster', 0);

        readLfShipBonuses();

        try {
            p.fleet = JSON.stringify(createFleetJSON());
        } catch (e) {}

        const tbody = el('expeditionsFleetBody');

        if (!tbody) {
            return;
        }

        SHIP_PROPERTIES.forEach(prop => {
            const canEl = el('can' + prop[0]);

            if (canEl) {
                canEl.textContent = LOCA_NO;
                canEl.className = 'can-be-found-no';
            }
        });

        let foundShips = false;

        for (let d = 0; d < SHIP_PROPERTIES.length; d++) {
            if (d > 2 && parseInput(el('num' + SHIP_PROPERTIES[d][0])) > 0) {
                foundShips = true;

                for (let j = 3; j <= Math.min(d + 1, SHIP_PROPERTIES.length - 1); j++) {
                    const canEl = el('can' + SHIP_PROPERTIES[j][0]);

                    if (canEl) {
                        canEl.textContent = LOCA_YES;
                        canEl.className = 'bolder-label can-be-found-yes';
                    }
                }
            }
        }

        const highTopEl = el('highTop');
        const highTopIndex = highTopEl ? highTopEl.selectedIndex : 0;

        p.highTopIndex = highTopIndex;

        const highTop = HIGH_TOP_VALUES[highTopIndex] || HIGH_TOP_VALUES[0];

        p.highTop = highTop;

        const totalCapacity = getCargoCapacity();
        const hasPathfinder = parseInput(el('numPA')) > 0;

        const factor = hasPathfinder
            ? (p.playerClass === 0 ? 3 * p.universeSpeed : 2)
            : (p.playerClass === 0 ? 1.5 * p.universeSpeed : 1);

        const discovererBonus = p.playerClass === 0
            ? 1 + p.classBonusDiscoverer / 100
            : 1;

        const base = factor * highTop;

        const maxPoints = Math.floor(
            base * (1 + p.percentRes / 100) * discovererBonus
        );

        const singleLCCap = getCargoCapacity('LC');
        const minLC = singleLCCap > 0 ? Math.ceil(maxPoints / singleLCCap) : 0;

        const dict = getLang();

        const maxPointsEl = el('max_points');

        if (maxPointsEl) {
            maxPointsEl.textContent =
                `${dict.expeditionsMaxPointsLabel || 'Resource find (max):'}: ${numToOGame(maxPoints)} (${minLC} LC)`;
        }

        const shipFindPool = foundShips
            ? Math.max(10000, Math.min(totalCapacity, Math.floor(base)))
            : 0;

        const resFactor =
            (1 + p.percentRes / 100) *
            discovererBonus *
            (1 + p.resourceDiscoveryBooster / 100);

        const dRaw = Math.max(base, 200) * resFactor;

        const metal = totalCapacity > 0 ? Math.floor(Math.min(dRaw, totalCapacity)) : 0;
        const crystal = totalCapacity > 0 ? Math.floor(Math.min(dRaw / 2, totalCapacity)) : 0;
        const deut = totalCapacity > 0 ? Math.floor(Math.min(dRaw / 3, totalCapacity)) : 0;

        const storageEl = el('storageCapacity');

        if (storageEl) {
            storageEl.textContent = numToOGame(totalCapacity);
            storageEl.style.fontStyle = dRaw > totalCapacity ? 'italic' : 'normal';
        }

        const maxFindMetEl = el('maxFindMet');
        const maxFindCryEl = el('maxFindCry');
        const maxFindDeuEl = el('maxFindDeu');

        if (maxFindMetEl) {
            maxFindMetEl.textContent = numToOGame(metal);
        }

        if (maxFindCryEl) {
            maxFindCryEl.textContent = numToOGame(crystal);
        }

        if (maxFindDeuEl) {
            maxFindDeuEl.textContent = numToOGame(deut);
        }

        for (let d = 3; d < SHIP_PROPERTIES.length; d++) {
            const canEl = el('can' + SHIP_PROPERTIES[d][0]);
            const findEl = el('find' + SHIP_PROPERTIES[d][0]);

            if (canEl && findEl) {
                const can = canEl.textContent === LOCA_YES;

                const maxShips = can
                    ? Math.floor((shipFindPool / SHIP_PROPERTIES[d][1]) * (1 + p.percentShips / 100))
                    : 0;

                findEl.textContent = numToOGame(maxShips);
                findEl.className = maxShips > 0 ? 'bolder-label can-be-found-yes' : '';
            }
        }

        const darkMatter = Math.min(
            2000000,
            Math.floor(1800 * (1 + p.darkMatterDiscoveryBonus / 100))
        );

        const darkMatterFindEl = el('darkMatterFind');

        if (darkMatterFindEl) {
            darkMatterFindEl.textContent = numToOGame(darkMatter);
        }

        state.save();
    }

    function initBonusesPanel() {
        const container = el('lf-ships-bonuses');

        if (!container) {
            return;
        }

        ensureLfShipBonuses();

        const dict = getLang();

        container.innerHTML =
            `<table><thead><tr>` +
            `<th style="text-align:left;padding:2px 4px;">${dict.shipType || 'Ship Type'}</th>` +
            `<th style="text-align:center;padding:2px 4px;">${dict.expeditionsCargoCapacity || 'Storage Capacity'}</th>` +
            `</tr></thead><tbody></tbody></table>`;

        const tbody = container.querySelector('tbody');
        const frag = document.createDocumentFragment();

        BONUSES_ORDER.forEach((shipIdx, row) => {
            const ship = SHIPS[shipIdx];

            const tr = document.createElement('tr');
            tr.className = row % 2 === 0 ? 'odd' : 'even';

            const nameCell = document.createElement('td');
            nameCell.style.cssText = 'text-align:left;padding:2px 4px;display:flex;align-items:center;gap:8px;';

            nameCell.appendChild(
                createShipIcon(
                    `images/ships/${SHIP_IMAGE_MAP[ship[0]]}`,
                    getShipName(ship[0]),
                    32
                )
            );

            nameCell.appendChild(document.createTextNode(getShipName(ship[0])));

            const bonusCell = document.createElement('td');
            bonusCell.style.cssText = 'text-align:center;padding:2px 4px;';

            const input = document.createElement('input');

            input.type = 'text';
            input.inputMode = 'numeric';
            input.value = state.prm.lfShipsBonuses[shipIdx] || 0;
            input.dataset.index = shipIdx;
            input.className = 'lf-bonus-input quantity-input';

            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9.]/g, '');
                computeDebounced();
            });

            input.addEventListener('blur', function () {
                const idx = parseInt(this.dataset.index, 10);

                if (!Number.isInteger(idx) || idx < 0 || idx >= 15) {
                    return;
                }

                ensureLfShipBonuses();

                state.prm.lfShipsBonuses[idx] = parseFloat(this.value) || 0;

                state.save();
                computeDebounced();
            });

            bonusCell.appendChild(input);

            tr.append(nameCell, bonusCell);

            frag.appendChild(tr);
        });

        tbody.appendChild(frag);
    }

    let tableInitAttempts = 0;

    function initExpeditionsTable() {
        const tbody = el('expeditionsFleetBody');

        if (!tbody) {
            if (++tableInitAttempts < 20) {
                setTimeout(initExpeditionsTable, 100);
            }

            return;
        }

        tableInitAttempts = 0;

        const dict = getLang();

        LOCA_YES = dict.expeditionsYes || 'Yes';
        LOCA_NO = dict.expeditionsNo || 'No';

        if (tbody.children.length === 0) {
            const frag = document.createDocumentFragment();

            SHIPS.forEach((ship, i) => {
                const tr = document.createElement('tr');
                tr.className = i % 2 === 0 ? 'odd' : 'even';

                const nameCell = document.createElement('td');
                nameCell.className = 'first-column';
                nameCell.style.cssText = 'display:flex;align-items:center;gap:8px;';

                nameCell.appendChild(
                    createShipIcon(
                        `images/ships/${SHIP_IMAGE_MAP[ship[0]]}`,
                        getShipName(ship[0]),
                        32
                    )
                );

                nameCell.appendChild(document.createTextNode(getShipName(ship[0])));

                const qtyCell = document.createElement('td');
                qtyCell.style.cssText = 'text-align:center;';
                qtyCell.className = 'quantity-cell';

                const input = document.createElement('input');

                input.id = 'num' + ship[2];
                input.type = 'text';
                input.inputMode = 'numeric';
                input.placeholder = '0';
                input.className = 'quantity-input';
                input.maxLength = 9;

                input.addEventListener('input', function () {
                    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 9);
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
                canSpan.id = 'can' + ship[2];
                canSpan.textContent = LOCA_NO;
                canSpan.className = 'can-be-found-no';

                canCell.appendChild(canSpan);

                const maxCell = document.createElement('td');
                maxCell.style.cssText = 'text-align:center;';

                const maxSpan = document.createElement('span');
                maxSpan.id = 'find' + ship[2];
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

        const clearBtn = el('clearFleet');

        if (clearBtn && !clearBtn._bound) {
            clearBtn._bound = true;

            clearBtn.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                clearFleet();
            });
        }

        const fleet = safeJsonParse(state.prm.fleet, {});

        populateFleetFromJSON(fleet);
        restoreExpeditionSettings();
        compute();
    }

    let accordionBound = false;

    function initAccordion() {
        const header = document.querySelector('#lf-bonuses-accordion .ui-accordion-header');
        const content = el('accordion-lf-prm');

        if (!header || !content || accordionBound) {
            return;
        }

        accordionBound = true;

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

            safeSet(ACCORDION_KEY, JSON.stringify(!isVisible));
        });

        const isExpanded = safeJsonParse(safeGet(ACCORDION_KEY, 'false'), false);

        content.style.display = isExpanded ? 'block' : 'none';

        const icon = newHeader.querySelector('.ui-icon');

        if (icon) {
            icon.className = `ui-icon ui-icon-triangle-1-${isExpanded ? 's' : 'e'}`;
        }
    }

    function bindEvents() {
        ['player-class', 'universe-speed', 'highTop', 'resource-discovery-booster'].forEach(id => {
            const e = el(id);

            if (e) {
                e.addEventListener('change', computeDebounced);
            }
        });

        [
            'tech_hyper-level',
            'percent-resources',
            'percent-ships',
            'class-bonus-collector',
            'class-bonus-discoverer',
            'dark-matter-discovery-bonus'
        ].forEach(id => {
            const e = el(id);

            if (!e) {
                return;
            }

            e.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            e.addEventListener('blur', computeDebounced);
        });

        const clearBtn = el('clearFleet');

        if (clearBtn && !clearBtn._bound) {
            clearBtn._bound = true;

            clearBtn.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                clearFleet();
            });
        }
    }

    function setCellText(cell, text) {
        let textNode = null;

        cell.childNodes.forEach(node => {
            if (!textNode && node.nodeType === Node.TEXT_NODE) {
                textNode = node;
            }
        });

        if (textNode) {
            textNode.textContent = text;
        } else {
            cell.appendChild(document.createTextNode(text));
        }

        cell.normalize();
    }

    function updateExpeditionsLang() {
        const dict = getLang();

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

        const highTopSelect = el('highTop');

        if (highTopSelect) {
            for (let i = 0; i < highTopSelect.options.length; i++) {
                const key = dict[`expeditionsHighTop${i + 1}`];

                if (key) {
                    highTopSelect.options[i].textContent = key;
                }
            }
        }

        const playerClassSelect = el('player-class');

        if (playerClassSelect && playerClassSelect.options.length >= 3) {
            if (dict.expeditionsClassDiscoverer) {
                playerClassSelect.options[0].textContent = dict.expeditionsClassDiscoverer;
            }

            if (dict.expeditionsClassCollector) {
                playerClassSelect.options[1].textContent = dict.expeditionsClassCollector;
            }

            if (dict.expeditionsClassGeneral) {
                playerClassSelect.options[2].textContent = dict.expeditionsClassGeneral;
            }
        }

        const headers = document.querySelectorAll('#data-table th');

        if (headers.length > 0) {
            if (headers[0] && dict.shipType) {
                headers[0].textContent = dict.shipType;
            }

            if (headers[1]) {
                headers[1].textContent = '';
                headers[1].appendChild(document.createTextNode(dict.qty || 'Количество'));

                const clearBtn = document.createElement('button');

                clearBtn.id = 'clearFleet';
                clearBtn.type = 'button';
                clearBtn.className = 'clear-fleet-mini';
                clearBtn.textContent = '✕';

                clearBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    clearFleet();
                });

                headers[1].appendChild(clearBtn);
            }

            if (headers[2] && dict.canBeFound) {
                headers[2].textContent = dict.canBeFound;
            }

            if (headers[3] && dict.maxCanBeFound) {
                headers[3].textContent = dict.maxCanBeFound;
            }
        }

        document.querySelectorAll('#expeditionsFleetBody .first-column').forEach((cell, i) => {
            if (!SHIPS[i]) {
                return;
            }

            const name = getShipName(SHIPS[i][0]);

            setCellText(cell, name);

            const img = cell.querySelector('img');

            if (img) {
                img.alt = name;
            }
        });

        initBonusesPanel();

        setTimeout(() => {
            const resourceRow = document.querySelector('.resources-row td:first-child');

            if (resourceRow) {
                resourceRow.textContent = dict.expeditionsMaxResourcesLabel || 'Resource find (max):';
            }

            const darkMatterRow = document.querySelector('.dark-matter-row td:first-child');

            if (darkMatterRow) {
                darkMatterRow.textContent = dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):';
            }
        }, 100);

        compute();
    }

    let isExpeditionsInit = false;

    function initExpeditionUI() {
        if (isExpeditionsInit) {
            updateExpeditionsLang();
            return;
        }

        isExpeditionsInit = true;

        state.load();

        initExpeditionsTable();
        initBonusesPanel();
        initAccordion();
        bindEvents();
        compute();

        document.removeEventListener('languageChanged', updateExpeditionsLang);
        document.addEventListener('languageChanged', updateExpeditionsLang);

        updateExpeditionsLang();
    }

    window.initExpeditionUI = initExpeditionUI;
    window.updateExpeditionsLang = updateExpeditionsLang;
    window.clearFleet = clearFleet;
    window.compute = compute;

    function initOnLoad() {
        const savedView = safeGet(ACTIVE_VIEW_KEY, 'costs');

        if (savedView === 'expeditions') {
            setTimeout(initExpeditionUI, 150);
        }

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                if (this.dataset.view === 'expeditions') {
                    setTimeout(initExpeditionUI, 100);
                }
            });
        });
    }

    if (document.readyState !== 'loading') {
        initOnLoad();
    } else {
        document.addEventListener('DOMContentLoaded', initOnLoad);
    }
})();