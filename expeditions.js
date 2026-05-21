(function() {
  'use strict';

  const SHIPS_DATA = [
    ['small-cargo',     5000,        0, 10,   5000,      'SC'],
    ['large-cargo',     7500,        0, 50,   25000,     'LC'],
    ['light-fighter',   12500,       0, 20,   50,        'LF'],
    ['heavy-fighter',   10000,       1, 75,   100,       'HF'],
    ['pathfinder',      12000,       2, 300,  10000,     'PA'],
    ['cruiser',         15000,       1, 300,  800,       'CR'],
    ['battleship',      10000,       2, 500,  1500,      'BS'],
    ['battlecruiser',   10000,       2, 250,  750,       'BC'],
    ['colony-ship',     2500,        1, 1000, 7500,      'CS'],
    ['recycler',        2000,        0, 300,  20000,     'RC'],
    ['esp-probe',       100000000,   0, 1,    0,         'EP'],
    ['bomber',          4000,        1, 700,  500,       'BM'],
    ['destroyer',       5000,        2, 1000, 2000,      'DR'],
    ['death-star',      100,         2, 1,    1000000,   'DS'],
    ['reaper',          7000,        2, 1100, 10000,     'RE']
  ];

  const SHIP_IMAGE_MAP = {
    'small-cargo':    'maly_transport.png',
    'large-cargo':    'bolshoy_transport.png',
    'light-fighter':  'legkiy_istrebitel.png',
    'heavy-fighter':  'tyazhely_istrebitel.png',
    'pathfinder':     'pathfinder.png',
    'cruiser':        'kreiser.png',
    'battleship':     'linkor.png',
    'battlecruiser':  'battlecruiser.png',
    'colony-ship':    'colony_ship.png',
    'recycler':       'recycler.png',
    'esp-probe':      'espionage_probe.png',
    'bomber':         'bombardirovshik.png',
    'destroyer':      'unichtozhitel.png',
    'death-star':     'death_star.png',
    'reaper':         'reaper.png'
  };

  const SHIP_PROPERTIES = [
    ['RC', 16000],  ['CS', 30000],   ['DS', 9000000], ['EP', 1000],   ['SC', 4000],
    ['LF', 4000],   ['LC', 12000],   ['HF', 10000],   ['CR', 27000],  ['PA', 23000],
    ['BS', 60000],  ['BC', 70000],   ['BM', 75000],   ['DR', 110000], ['RE', 140000]
  ];

  const FLEET_CODE_MAP = {
    'SC': '202', 'LC': '203', 'LF': '204', 'HF': '205', 'PA': '219',
    'CR': '206', 'BS': '207', 'BC': '215', 'CS': '208', 'RC': '209',
    'EP': '210', 'BM': '211', 'DR': '213', 'DS': '214', 'RE': '218'
  };

  const FLEET_CODE_REVERSE = Object.fromEntries(
    Object.entries(FLEET_CODE_MAP).map(([a, c]) => [c, a])
  );

  const HIGH_TOP_VALUES = [
    40000, 500000, 1200000, 1800000, 2400000,
    3000000, 3600000, 4200000, 5000000
  ];

  const CONSTANTS = {
    BASE_DARK_MATTER:       1800,
    MAX_DARK_MATTER:        2000000,
    MIN_SHIP_FIND_VALUE:    10000,
    MIN_RESOURCE_FIND:      200,
    HYPER_TECH_FACTOR:      0.05,
    COLLECTOR_CARGO_BONUS:  0.25,
    GENERAL_CARGO_BONUS:    0.2,
    DEUTERIUM_DIVISOR:      3,
    CRYSTAL_DIVISOR:        2,
    COLLECTOR_CLASS:        1,
    GENERAL_CLASS:          2,
    DISCOVERER_CLASS:       0,
    TRANSPORT_INDICES:      [0, 1],
    GENERAL_BONUS_INDICES:  [7, 14]
  };

  const STORAGE_KEY = 'options_expeditions';
  const LANG_KEY    = 'og_calc_lang_v2';
  const ACCORDION_KEY = 'og_expeditions_accordion_expanded';

  const LABEL_MAP = {
    'player-class':                  'expeditionsPlayerClass',
    'universe-speed':                'expeditionsUniverseSpeed',
    'tech_hyper-level':              'expeditionsHyperTech',
    'percent-resources':             'expeditionsResourceBonus',
    'percent-ships':                 'expeditionsShipBonus',
    'class-bonus-collector':         'expeditionsCollectorBonus',
    'class-bonus-discoverer':        'expeditionsDiscovererBonus',
    'dark-matter-discovery-bonus':   'expeditionsDarkMatterBonus',
    'resource-discovery-booster':    'expeditionsResourceBooster'
  };

  let LOCA_YES = 'Yes';
  let LOCA_NO  = 'No';

  const defaultParams = () => ({
    universeSpeed:            1,
    highTop:                  40000,
    playerClass:              0,
    hyperTechLevel:           0,
    percentRes:               0,
    percentShips:             0,
    classBonusCollector:      0,
    classBonusDiscoverer:     0,
    darkMatterDiscoveryBonus: 0,
    resourceDiscoveryBooster: 0,
    fleet:                    '{}',
    lfShipsBonuses:           Array(15).fill(0)
  });

  const options = {
    prm: defaultParams(),

    load() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        const data = JSON.parse(saved);
        Object.assign(this.prm, data);
        if (!Array.isArray(this.prm.lfShipsBonuses) || this.prm.lfShipsBonuses.length !== 15) {
          this.prm.lfShipsBonuses = Array(15).fill(0);
        }
      } catch (e) {
        console.warn('Expeditions: failed to load options', e);
      }
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.prm));
      } catch (e) {
        console.warn('Expeditions: failed to save options', e);
      }
    }
  };

  const getLang = () => localStorage.getItem(LANG_KEY) || 'ru';
  const getDict = () => window.getLangDict ? window.getLangDict(getLang()) : {};

  const numToOGame = (n) => {
    if (n == null || isNaN(n)) return '0';
    return Math.floor(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const parseInput = (input) => {
    if (!input || !input.value) return 0;
    const clean = input.value.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
  };

  const validateAndFormatInput = (input) => {
    const num = parseInput(input);
    input.value = num > 0 ? numToOGame(num) : '';
  };

  const getShipName = (shipKey) => {
    const dict = getDict();
    const key = `ship_${shipKey.replace(/-/g, '_')}`;
    return dict[key] || shipKey.replace(/-/g, ' ');
  };

  const calcShipCargo = (ship, index, params) => {
    const baseCapacity = ship[4];
    let capacity = baseCapacity * (1 + CONSTANTS.HYPER_TECH_FACTOR * params.hyperTechLevel);

    if (params.playerClass === CONSTANTS.COLLECTOR_CLASS &&
        CONSTANTS.TRANSPORT_INDICES.includes(index)) {
      capacity += baseCapacity * CONSTANTS.COLLECTOR_CARGO_BONUS *
                  (1 + params.classBonusCollector / 100);
    }

    if (params.playerClass === CONSTANTS.GENERAL_CLASS &&
        CONSTANTS.GENERAL_BONUS_INDICES.includes(index)) {
      capacity += baseCapacity * CONSTANTS.GENERAL_CARGO_BONUS;
    }

    capacity += baseCapacity * (params.lfShipsBonuses[index] || 0) / 100;
    return capacity;
  };

  const getCargoCapacity = (abbrev) => {
    const params = options.prm;

    if (abbrev) {
      const idx = SHIPS_DATA.findIndex(s => s[5] === abbrev);
      if (idx === -1) return 0;
      return Math.floor(calcShipCargo(SHIPS_DATA[idx], idx, params));
    }

    let total = 0;
    SHIPS_DATA.forEach((ship, i) => {
      const input = document.getElementById(`num${ship[5]}`);
      const count = input ? parseInput(input) : 0;
      if (count > 0) {
        total += count * calcShipCargo(ship, i, params);
      }
    });
    return Math.floor(total);
  };

  const createFleetJSON = () => {
    const json = {};
    for (const [abbr, code] of Object.entries(FLEET_CODE_MAP)) {
      const input = document.getElementById(`num${abbr}`);
      json[code] = input ? parseInput(input) : 0;
    }
    return json;
  };

  const populateFleetFromJSON = (json = {}) => {
    for (const [code, val] of Object.entries(json)) {
      const abbr = FLEET_CODE_REVERSE[code];
      if (!abbr) continue;
      const input = document.getElementById(`num${abbr}`);
      if (input) input.value = val > 0 ? numToOGame(val) : '';
    }
  };

  let computeTimeout = null;
  const computeDebounced = () => {
    clearTimeout(computeTimeout);
    computeTimeout = setTimeout(compute, 100);
  };

  const DOM = {};
  const cacheDOM = () => {
    const ids = [
      'player-class', 'universe-speed', 'tech_hyper-level',
      'percent-resources', 'percent-ships', 'class-bonus-collector',
      'class-bonus-discoverer', 'dark-matter-discovery-bonus',
      'resource-discovery-booster', 'highTop', 'max_points',
      'storageCapacity', 'maxFindMet', 'maxFindCry', 'maxFindDeu',
      'darkMatterFind'
    ];
    ids.forEach(id => {
      DOM[id.replace(/-/g, '_')] = document.getElementById(id);
    });
  };

  const createShipIcon = (shipKey, size = 20) => {
    const img = document.createElement('img');
    img.src = `images/ships/${SHIP_IMAGE_MAP[shipKey]}`;
    img.alt = getShipName(shipKey);
    img.className = 'icon';
    img.width = size;
    img.height = size;
    img.loading = 'lazy';
    img.style.cssText = 'border-radius:4px;vertical-align:middle;';

    img.addEventListener('error', function() {
      if (this._fallback) return;
      const fb = document.createElement('span');
      fb.className = 'icon-fallback';
      fb.textContent = getShipName(shipKey).charAt(0);
      fb.style.cssText = `margin-right:6px;display:inline-block;width:${size}px;height:${size}px;line-height:${size}px;text-align:center;`;
      this.style.display = 'none';
      this.parentNode?.insertBefore(fb, this.nextSibling);
      this._fallback = true;
    });

    return img;
  };

  const readParamsFromDOM = () => {
    const p = options.prm;
    p.playerClass              = parseInt(DOM.player_class?.value) || 0;
    p.universeSpeed            = parseInt(DOM.universe_speed?.value) || 1;
    p.hyperTechLevel           = parseInput(DOM.tech_hyper_level);
    p.percentRes               = parseInput(DOM.percent_resources);
    p.percentShips             = parseInput(DOM.percent_ships);
    p.classBonusCollector      = parseInput(DOM.class_bonus_collector);
    p.classBonusDiscoverer     = parseInput(DOM.class_bonus_discoverer);
    p.darkMatterDiscoveryBonus = parseInput(DOM.dark_matter_discovery_bonus);
    p.resourceDiscoveryBooster = parseInt(DOM.resource_booster?.value) || 0;
    p.highTop                  = HIGH_TOP_VALUES[DOM.highTop?.selectedIndex || 0] || 40000;

    document.querySelectorAll('#lf-ships-bonuses input').forEach((inp, i) => {
      if (i < 15) p.lfShipsBonuses[i] = parseFloat(inp.value) || 0;
    });

    try { p.fleet = JSON.stringify(createFleetJSON()); } catch (e) {}
  };

  const resetAllShipStatus = () => {
    SHIP_PROPERTIES.forEach(([abbr]) => {
      const el = document.getElementById(`can${abbr}`);
      if (el) {
        el.textContent = LOCA_NO;
        el.className = 'can-be-found-no';
      }
    });
  };

  const markShipsAsFindable = () => {
    let maxShipTier = 0;
    let foundShips = false;

    SHIP_PROPERTIES.forEach((ship, d) => {
      const count = parseInput(document.getElementById(`num${ship[0]}`));
      if (d <= 2 || count <= 0) return;

      foundShips = true;
      for (let j = 3; j <= d; j++) {
        const el = document.getElementById(`can${SHIP_PROPERTIES[j][0]}`);
        if (el) {
          el.textContent = LOCA_YES;
          el.className = 'bolder-label can-be-found-yes';
        }
      }

      if (d < SHIP_PROPERTIES.length - 1) {
        const nextEl = document.getElementById(`can${SHIP_PROPERTIES[d + 1][0]}`);
        if (nextEl) {
          nextEl.textContent = LOCA_YES;
          nextEl.className = 'bolder-label can-be-found-yes';
        }
      }
    });

    return foundShips;
  };

  const compute = () => {
    if (!DOM.player_class) cacheDOM();
    const tbody = document.getElementById('expeditionsFleetBody');
    if (!tbody) return;

    readParamsFromDOM();
    const p = options.prm;

    const hasPathfinder = parseInput(document.getElementById('numPA')) > 0;
    const totalCapacity = getCargoCapacity();

    resetAllShipStatus();
    const foundShips = markShipsAsFindable();

    const isDiscoverer = p.playerClass === CONSTANTS.DISCOVERER_CLASS;
    const pathfinderMultiplier = hasPathfinder ? (isDiscoverer ? 3 : 2) : (isDiscoverer ? 1.5 : 1);
    const factor = pathfinderMultiplier * p.universeSpeed;
    const discovererBonus = isDiscoverer ? (1 + p.classBonusDiscoverer / 100) : 1;
    const resFactor = (1 + p.percentRes / 100) * discovererBonus *
                      (1 + p.resourceDiscoveryBooster / 100);

    let maxPoints = Math.floor(factor * p.highTop * (1 + p.percentRes / 100) * discovererBonus);
    const singleLCCap = getCargoCapacity('LC');
    const minLC = singleLCCap > 0 ? Math.ceil(maxPoints / singleLCCap) : 0;

    const dict = getDict();
    const maxPointsLabel = dict.expeditionsMaxPointsLabel || 'Resource find (max):';
    if (DOM.max_points) {
      DOM.max_points.textContent = `${maxPointsLabel} ${numToOGame(maxPoints)} (${minLC} LC)`;
    }

    const baseResourceFind = factor * p.highTop;
    const maxShipFindValue = foundShips
      ? Math.max(CONSTANTS.MIN_SHIP_FIND_VALUE, Math.min(totalCapacity, Math.floor(baseResourceFind)))
      : 0;

    const maxResourceFind = Math.floor(
      Math.max(baseResourceFind, CONSTANTS.MIN_RESOURCE_FIND) * resFactor
    );

    const metal   = totalCapacity > 0 ? Math.min(maxResourceFind, totalCapacity) : 0;
    const crystal = totalCapacity > 0 ? Math.min(maxResourceFind / CONSTANTS.CRYSTAL_DIVISOR, totalCapacity) : 0;
    const deut    = totalCapacity > 0 ? Math.min(maxResourceFind / CONSTANTS.DEUTERIUM_DIVISOR, totalCapacity) : 0;

    if (DOM.storageCapacity) {
      DOM.storageCapacity.textContent = numToOGame(totalCapacity);
      DOM.storageCapacity.style.fontStyle = maxResourceFind > totalCapacity ? 'italic' : 'normal';
    }
    if (DOM.maxFindMet) DOM.maxFindMet.textContent = numToOGame(metal);
    if (DOM.maxFindCry) DOM.maxFindCry.textContent = numToOGame(crystal);
    if (DOM.maxFindDeu) DOM.maxFindDeu.textContent = numToOGame(deut);

    for (let d = 3; d < SHIP_PROPERTIES.length; d++) {
      const [abbr, tier] = SHIP_PROPERTIES[d];
      const canEl  = document.getElementById(`can${abbr}`);
      const findEl = document.getElementById(`find${abbr}`);
      if (!canEl || !findEl) continue;

      const can = canEl.textContent === LOCA_YES;
      const maxShips = can
        ? Math.floor(maxShipFindValue / tier * (1 + p.percentShips / 100))
        : 0;

      findEl.textContent = numToOGame(maxShips);
      findEl.className = maxShips > 0 ? 'bolder-label can-be-found-yes' : '';
    }

    const darkMatter = Math.min(
      CONSTANTS.MAX_DARK_MATTER,
      Math.floor(CONSTANTS.BASE_DARK_MATTER * (1 + p.darkMatterDiscoveryBonus / 100))
    );
    if (DOM.darkMatterFind) DOM.darkMatterFind.textContent = numToOGame(darkMatter);

    options.save();
  };

  const initBonusesPanel = () => {
    const container = document.getElementById('lf-ships-bonuses');
    if (!container) return;

    const dict = getDict();
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
    const frag = document.createDocumentFragment();

    SHIPS_DATA.forEach((ship, i) => {
      const row = document.createElement('tr');
      row.className = i % 2 === 0 ? 'odd' : 'even';

      const nameCell = document.createElement('td');
      nameCell.style.cssText = 'text-align:left;padding:2px 4px;display:flex;align-items:center;gap:8px;';
      nameCell.appendChild(createShipIcon(ship[0]));
      nameCell.appendChild(document.createTextNode(getShipName(ship[0])));

      const bonusCell = document.createElement('td');
      bonusCell.style.cssText = 'text-align:center;padding:2px 4px;';

      const input = document.createElement('input');
      input.type = 'text';
      input.inputMode = 'decimal';
      input.value = options.prm.lfShipsBonuses[i] || 0;
      input.dataset.index = i;
      input.className = 'lf-bonus-input quantity-input';

      input.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
        computeDebounced();
      });

      input.addEventListener('blur', function() {
        const idx = parseInt(this.dataset.index);
        if (isNaN(idx) || idx < 0 || idx >= 15) return;
        options.prm.lfShipsBonuses[idx] = parseFloat(this.value) || 0;
        options.save();
        computeDebounced();
      });

      bonusCell.appendChild(input);
      row.append(nameCell, bonusCell);
      frag.appendChild(row);
    });

    tbody.appendChild(frag);
  };

  const buildFleetTableBody = (tbody, dict) => {
    const frag = document.createDocumentFragment();

    SHIPS_DATA.forEach((ship, i) => {
      const tr = document.createElement('tr');
      tr.className = i % 2 === 0 ? 'odd' : 'even';

      const nameCell = document.createElement('td');
      nameCell.className = 'first-column';
      nameCell.style.cssText = 'display:flex;align-items:center;gap:8px;';
      nameCell.appendChild(createShipIcon(ship[0], 28));
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

      input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        computeDebounced();
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

    const capRow = document.createElement('tr');
    capRow.className = 'storage-row';
    capRow.innerHTML = `
      <td colspan="2">${dict.expeditionsCargoCapacity || 'Storage Capacity:'}</td>
      <td colspan="2" style="text-align:right;"><span id="storageCapacity">0</span></td>
    `;
    tbody.appendChild(capRow);

    const resRow = document.createElement('tr');
    resRow.className = 'resources-row';
    resRow.innerHTML = `
      <td colspan="2">${dict.expeditionsMaxResourcesLabel || 'Resource find (max):'}</td>
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
      <td colspan="2">${dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):'}</td>
      <td colspan="2" style="text-align:right;"><span id="darkMatterFind">0</span></td>
    `;
    tbody.appendChild(dmRow);
  };

  const initExpeditionsTable = () => {
    const tbody = document.getElementById('expeditionsFleetBody');
    if (!tbody) {
      setTimeout(initExpeditionsTable, 100);
      return;
    }

    const dict = getDict();
    LOCA_YES = dict.expeditionsYes || 'Yes';
    LOCA_NO  = dict.expeditionsNo  || 'No';

    if (tbody.children.length === 0) {
      buildFleetTableBody(tbody, dict);
    }

    populateFleetFromJSON(JSON.parse(options.prm.fleet || '{}'));
    restoreExpeditionSettings();
    cacheDOM();
    compute();
  };

  const restoreExpeditionSettings = () => {
    const p = options.prm;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined && val !== null) el.value = val;
    };

    setVal('player-class',                p.playerClass);
    setVal('universe-speed',              p.universeSpeed);
    setVal('highTop',                     p.highTop);
    setVal('resource-discovery-booster',  p.resourceDiscoveryBooster);
    setVal('tech_hyper-level',            p.hyperTechLevel > 0 ? numToOGame(p.hyperTechLevel) : '');
    setVal('percent-resources',           p.percentRes > 0 ? numToOGame(p.percentRes) : '');
    setVal('percent-ships',               p.percentShips > 0 ? numToOGame(p.percentShips) : '');
    setVal('class-bonus-collector',       p.classBonusCollector > 0 ? numToOGame(p.classBonusCollector) : '');
    setVal('class-bonus-discoverer',      p.classBonusDiscoverer > 0 ? numToOGame(p.classBonusDiscoverer) : '');
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
    compute();
  };

  const initAccordion = () => {
    const header  = document.querySelector('#lf-bonuses-accordion .ui-accordion-header');
    const content = document.getElementById('accordion-lf-prm');
    if (!header || !content || header.dataset.bound) return;

    header.dataset.bound = 'true';
    const newHeader = header.cloneNode(true);
    header.replaceWith(newHeader);

    newHeader.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isVisible = content.style.display === 'block';
      content.style.display = isVisible ? 'none' : 'block';

      const icon = newHeader.querySelector('.ui-icon');
      if (icon) icon.className = `ui-icon ui-icon-triangle-1-${isVisible ? 'e' : 's'}`;

      try {
        localStorage.setItem(ACCORDION_KEY, JSON.stringify(!isVisible));
      } catch (e) {}
    });

    let isExpanded = false;
    try {
      isExpanded = JSON.parse(localStorage.getItem(ACCORDION_KEY) || 'false');
    } catch (e) {}

    content.style.display = isExpanded ? 'block' : 'none';
    const icon = newHeader.querySelector('.ui-icon');
    if (icon) icon.className = `ui-icon ui-icon-triangle-1-${isExpanded ? 's' : 'e'}`;
  };

  const bindEvents = () => {
    ['player-class', 'universe-speed', 'highTop', 'resource-discovery-booster'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.onchange = computeDebounced;
    });

    [
      'tech_hyper-level', 'percent-resources', 'percent-ships',
      'class-bonus-collector', 'class-bonus-discoverer', 'dark-matter-discovery-bonus'
    ].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };
      el.onblur  = computeDebounced;
    });

    const clearBtn = document.getElementById('clearFleet');
    if (clearBtn) clearBtn.onclick = clearFleet;
  };

  const updateExpeditionsLang = () => {
    const dict = getDict();
    LOCA_YES = dict.expeditionsYes || 'Yes';
    LOCA_NO  = dict.expeditionsNo  || 'No';

    const accSpan = document.querySelector('#lf-bonuses-accordion .ui-accordion-header a span');
    if (accSpan) accSpan.textContent = dict.expeditionsShipBonuses || 'Ships stats bonuses (%)';

    const title = document.querySelector('#settings-panel .settings-title');
    if (title) title.textContent = dict.expeditionsSettingsTitle || 'OGame Expeditions Calculator';

    for (const [id, key] of Object.entries(LABEL_MAP)) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label && dict[key]) label.textContent = dict[key];
    }

    const hTop = document.getElementById('highTop');
    if (hTop) {
      for (let i = 0; i < hTop.options.length; i++) {
        const k = `expeditionsHighTop${i + 1}`;
        if (dict[k]) hTop.options[i].textContent = dict[k];
      }
    }

    const pClass = document.getElementById('player-class');
    if (pClass) {
      if (dict.expeditionsClassDiscoverer) pClass.options[0].textContent = dict.expeditionsClassDiscoverer;
      if (dict.expeditionsClassCollector)  pClass.options[1].textContent = dict.expeditionsClassCollector;
      if (dict.expeditionsClassGeneral)    pClass.options[2].textContent = dict.expeditionsClassGeneral;
    }

    document.querySelectorAll('#data-table th').forEach((th, i) => {
      if (i === 0 && dict.shipType)        th.textContent = dict.shipType;
      if (i === 1 && dict.qty)             th.textContent = dict.qty;
      if (i === 2 && dict.canBeFound)      th.innerHTML   = dict.canBeFound;
      if (i === 3 && dict.maxCanBeFound)   th.innerHTML   = dict.maxCanBeFound;
    });

    document.querySelectorAll('#expeditionsFleetBody .first-column').forEach((cell, i) => {
      if (!SHIPS_DATA[i]) return;
      const shipKey = SHIPS_DATA[i][0];
      cell.childNodes.forEach(node => { if (node.nodeType === 3) node.textContent = ''; });
      cell.appendChild(document.createTextNode(getShipName(shipKey)));
      const img = cell.querySelector('img');
      if (img) img.alt = getShipName(shipKey);
    });

    initBonusesPanel();

    setTimeout(() => {
      const resourceRow = document.querySelector('.resources-row td:first-child');
      if (resourceRow) resourceRow.textContent = dict.expeditionsMaxResourcesLabel || 'Resource find (max):';
      const darkMatterRow = document.querySelector('.dark-matter-row td:first-child');
      if (darkMatterRow) darkMatterRow.textContent = dict.expeditionsDarkMatterFindLabel || 'Dark Matter find (max):';
      setTimeout(initAccordion, 50);
    }, 100);

    compute();
  };

  let isExpeditionsInit = false;
  const initExpeditionUI = () => {
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
  };

  window.initExpeditionUI     = initExpeditionUI;
  window.updateExpeditionsLang = updateExpeditionsLang;
  window.clearFleet           = clearFleet;
  window.compute              = compute;

  document.addEventListener('DOMContentLoaded', () => {
    const savedView = localStorage.getItem('og_calc_active_view') || 'costs';
    if (savedView === 'expeditions') setTimeout(initExpeditionUI, 150);

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.dataset.view === 'expeditions') setTimeout(initExpeditionUI, 100);
      });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(initAccordion, 100));
    });
  });
})();