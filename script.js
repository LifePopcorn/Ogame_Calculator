(function () {
    'use strict';

    const CONFIG = {
        TM_PER_BOX: 42000,
        TM_PACKS: [{ tm: 12500000, priceTRY: 900 }],
        METAL_EQ_CRYSTAL: 1.5,
        METAL_EQ_DEUT: 3,
        TRY_TO_BYN_RATE: 16.01,
        CURRENCY_RATES: { BYN: 1, RUB: 23.5, USD: 0.31, EUR: 0.28, TRY: 16.01 },
        MAX_LEVEL_SPAN: 99,
        MAX_LEVEL: 99,
        TM_PER_LEVEL_FACTOR: 2
    };

    const KEYS = {
        LANG: 'og_calc_lang_v2',
        TRANSFORM: 'og_calc_transform_v2',
        INPUTS_BUILD: 'og_calc_inputs_build_v2',
        INPUTS_RESEARCH: 'og_calc_inputs_research_v2',
        INPUTS_MOON_BUILD: 'og_calc_inputs_moon_build_v2',
        LF_INPUTS_BUILD: 'og_calc_lf_inputs_build_v1',
        LF_INPUTS_RESEARCH: 'og_calc_lf_inputs_research_v1',
        LF_RACE: 'og_calc_lf_race_v1',
        LF_TOTALS: 'og_calc_lf_totals_v1',
        TM: 'og_calc_tm_v2',
        BOXES: 'og_calc_boxes_v2',
        SHIP_QTY: 'og_calc_ship_qty_v2',
        ACTIVE_TAB: 'og_calc_active_tab_v2',
        SUM_ALL_TABS: 'og_calc_sum_all_tabs',
        CURRENCY: 'og_calc_currency_v1',
        BASE_CURRENCY: 'og_calc_base_currency_v1'
    };

    const IMG = {
        root: 'images/',
        buildings: 'images/buildings/',
        research: 'images/research/',
        ships: 'images/ships/'
    };

    const LANGUAGES = {
        en: 'English',
        ru: 'Русский',
        de: 'Deutsch',
        pl: 'Polski',
        es: 'Español',
        fr: 'Français',
        it: 'Italiano',
        nl: 'Nederlands',
        sk: 'Slovenčina',
        tr: 'Türkçe',
        pt: 'Português',
        bs: 'Bosanski'
    };

    const BUILDINGS = [
        { img: 'metal_mine.png', base: { m: 60, c: 15, d: 0 }, factor: 1.5 },
        { img: 'crystal_mine.png', base: { m: 48, c: 24, d: 0 }, factor: 1.6 },
        { img: 'deuterium_synth.png', base: { m: 225, c: 75, d: 0 }, factor: 1.5 },
        { img: 'solar_plant.png', base: { m: 75, c: 30, d: 0 }, factor: 1.5 },
        { img: 'fusion_plant.png', base: { m: 900, c: 360, d: 180 }, factor: 1.8 },
        { img: 'robot_factory.png', base: { m: 400, c: 120, d: 200 }, factor: 2.0 },
        { img: 'nanite_factory.png', base: { m: 1000000, c: 500000, d: 100000 }, factor: 2.0 },
        { img: 'shipyard.png', base: { m: 400, c: 200, d: 100 }, factor: 2.0 },
        { img: 'metal_storage.png', base: { m: 1000, c: 0, d: 0 }, factor: 2.0 },
        { img: 'crystal_storage.png', base: { m: 1000, c: 500, d: 0 }, factor: 2.0 },
        { img: 'deuterium_tank.png', base: { m: 1000, c: 1000, d: 0 }, factor: 2.0 },
        { img: 'research_lab.png', base: { m: 200, c: 400, d: 200 }, factor: 2.0 },
        { img: 'terraformer.png', base: { m: 0, c: 50000, d: 100000 }, factor: 2.0 },
        { img: 'alliance_depot.png', base: { m: 20000, c: 40000, d: 0 }, factor: 2.0 },
        { img: 'dock.png', base: { m: 200, c: 0, d: 50 }, factor: 5.0 },
        { img: 'missile_silo.png', base: { m: 20000, c: 20000, d: 1000 }, factor: 2.0 }
    ];

    const BUILDING_ORDER = [0, 1, 2, 3, 4, 8, 9, 10, 5, 7, 11, 6, 12, 13, 14, 15];
    const MRC_BUILDING_IDS = [1, 2, 3, 6, 7, 8];

    const MOON_BUILDINGS = [
        { id: 44, name: 'Фабрика роботов', img: 'robot_factory.png', base: { m: 400, c: 120, d: 200 }, factor: 2.0 },
        { id: 45, name: 'Верфь', img: 'shipyard.png', base: { m: 400000, c: 200000, d: 100000 }, factor: 2.0 },
        { id: 41, name: 'Лунная база', img: 'lunar_base.png', base: { m: 20000, c: 40000, d: 20000 }, factor: 2.0 },
        { id: 42, name: 'Сенсорная фаланга', img: 'sensor_phalanx.png', base: { m: 20000, c: 40000, d: 20000 }, factor: 2.0 },
        { id: 43, name: 'Ворота', img: 'jump_gate.png', base: { m: 2000000, c: 4000000, d: 2000000 }, factor: 2.0 }
    ];

    const RESEARCH = [
        { img: 'spy.png', base: { m: 200, c: 1000, d: 200 }, factor: 2.0 },
        { img: 'computer.png', base: { m: 0, c: 400, d: 600 }, factor: 2.0 },
        { img: 'weapons.png', base: { m: 800, c: 200, d: 0 }, factor: 2.0 },
        { img: 'shield.png', base: { m: 200, c: 600, d: 0 }, factor: 2.0 },
        { img: 'armor.png', base: { m: 1000, c: 0, d: 0 }, factor: 2.0 },
        { img: 'energy.png', base: { m: 0, c: 800, d: 400 }, factor: 2.0 },
        { img: 'hyperspace.png', base: { m: 0, c: 4000, d: 2000 }, factor: 2.0 },
        { img: 'combustion.png', base: { m: 400, c: 0, d: 600 }, factor: 2.0 },
        { img: 'impulse.png', base: { m: 2000, c: 4000, d: 600 }, factor: 2.0 },
        { img: 'hyperdrive.png', base: { m: 10000, c: 20000, d: 6000 }, factor: 2.0 },
        { img: 'laser.png', base: { m: 200, c: 100, d: 0 }, factor: 2.0 },
        { img: 'ion.png', base: { m: 1000, c: 300, d: 100 }, factor: 2.0 },
        { img: 'plasma.png', base: { m: 2000, c: 4000, d: 1000 }, factor: 2.0 },
        { img: 'irn.png', base: { m: 240000, c: 400000, d: 160000 }, factor: 2.0 },
        { img: 'astro.png', base: { m: 4000, c: 8000, d: 4000 }, factor: 1.75 },
        { img: 'graviton.png', base: { m: 0, c: 0, d: 0 }, factor: 3.0 }
    ];

    const SHIPS = [
        { id: 'small_cargo', metal: 2000, crystal: 2000, deut: 0, img: 'maly_transport.png' },
        { id: 'large_cargo', metal: 6000, crystal: 6000, deut: 0, img: 'bolshoy_transport.png' },
        { id: 'light_fighter', metal: 3000, crystal: 1000, deut: 0, img: 'legkiy_istrebitel.png' },
        { id: 'heavy_fighter', metal: 6000, crystal: 4000, deut: 0, img: 'tyazhely_istrebitel.png' },
        { id: 'cruiser', metal: 20000, crystal: 7000, deut: 2000, img: 'kreiser.png' },
        { id: 'battleship', metal: 45000, crystal: 15000, deut: 0, img: 'linkor.png' },
        { id: 'recycler', metal: 10000, crystal: 6000, deut: 2000, img: 'recycler.png' },
        { id: 'bomber', metal: 50000, crystal: 25000, deut: 15000, img: 'bombardirovshik.png' },
        { id: 'destroyer', metal: 60000, crystal: 50000, deut: 15000, img: 'unichtozhitel.png' },
        { id: 'battlecruiser', metal: 30000, crystal: 40000, deut: 15000, img: 'battlecruiser.png' },
        { id: 'death_star', metal: 5000000, crystal: 4000000, deut: 1000000, img: 'death_star.png' },
        { id: 'reaper', metal: 85000, crystal: 55000, deut: 20000, img: 'reaper.png' },
        { id: 'pathfinder', metal: 8000, crystal: 15000, deut: 8000, img: 'pathfinder.png' }
    ];

    const LF_TECH_COSTS = {
        1001: [7, 2, 0, 0, 40, 1.2, 1.2, 0, 0, 1.21],
        1002: [5, 2, 0, 8, 40, 1.23, 1.23, 0, 1.02, 1.25],
        1003: [20000, 25000, 10000, 10, 16000, 1.3, 1.3, 1.3, 1.08, 1.25],
        1004: [5000, 3200, 1500, 15, 16000, 1.7, 1.7, 1.7, 1.25, 1.6],
        1005: [50000, 40000, 50000, 30, 64000, 1.7, 1.7, 1.7, 1.25, 1.7],
        1006: [9000, 6000, 3000, 40, 2000, 1.5, 1.5, 1.5, 1.1, 1.3],
        1007: [25000, 13000, 7000, 0, 12000, 1.09, 1.09, 1.09, 0, 1.17],
        1008: [50000, 25000, 15000, 80, 28000, 1.5, 1.5, 1.5, 1.1, 1.2],
        1009: [75000, 20000, 25000, 50, 40000, 1.09, 1.09, 1.09, 1.02, 1.2],
        1010: [150000, 30000, 15000, 60, 52000, 1.12, 1.12, 1.12, 1.03, 1.2],
        1011: [80000, 35000, 60000, 90, 90000, 1.5, 1.5, 1.5, 1.05, 1.3],
        1012: [250000, 125000, 125000, 100, 95000, 1.15, 1.15, 1.15, 1.02, 1.2],
        1101: [5000, 2500, 500, 0, 1000, 1.3, 1.3, 1.3, 0, 1.2],
        1102: [7000, 10000, 5000, 0, 2000, 1.5, 1.5, 1.5, 0, 1.3],
        1103: [15000, 10000, 5000, 0, 2500, 1.3, 1.3, 1.3, 0, 1.3],
        1104: [20000, 15000, 7500, 0, 3500, 1.3, 1.3, 1.3, 0, 1.3],
        1105: [25000, 20000, 10000, 0, 4140, 1.3, 1.3, 1.3, 0, 1.2],
        1106: [35000, 25000, 15000, 0, 5000, 1.5, 1.5, 1.5, 0, 1.3],
        1107: [70000, 40000, 20000, 0, 8000, 1.3, 1.3, 1.3, 0, 1.3],
        1108: [80000, 50000, 20000, 0, 6000, 1.5, 1.5, 1.5, 0, 1.3],
        1109: [320000, 240000, 100000, 0, 6500, 1.5, 1.5, 1.5, 0, 1.4],
        1110: [320000, 240000, 100000, 0, 7000, 1.5, 1.5, 1.5, 0, 1.4],
        1111: [120000, 30000, 25000, 0, 7500, 1.5, 1.5, 1.5, 0, 1.3],
        1112: [100000, 40000, 30000, 0, 10000, 1.3, 1.3, 1.3, 0, 1.3],
        1113: [200000, 100000, 100000, 0, 8500, 1.3, 1.3, 1.3, 0, 1.3],
        1114: [160000, 120000, 50000, 0, 9000, 1.5, 1.5, 1.5, 0, 1.4],
        1115: [160000, 120000, 50000, 0, 9500, 1.5, 1.5, 1.5, 0, 1.4],
        1116: [320000, 240000, 100000, 0, 10000, 1.5, 1.5, 1.5, 0, 1.4],
        1117: [300000, 180000, 120000, 0, 11000, 1.5, 1.5, 1.5, 0, 1.3],
        1118: [500000, 300000, 200000, 0, 13000, 1.3, 1.3, 1.3, 0, 1.3],
        2001: [9, 3, 0, 0, 40, 1.2, 1.2, 0, 0, 1.21],
        2002: [7, 2, 0, 10, 40, 1.2, 1.2, 0, 1.03, 1.21],
        2003: [40000, 10000, 15000, 15, 16000, 1.3, 1.3, 1.3, 1.1, 1.25],
        2004: [5000, 3800, 1000, 20, 16000, 1.7, 1.7, 1.7, 1.35, 1.6],
        2005: [50000, 40000, 50000, 60, 64000, 1.65, 1.65, 1.65, 1.3, 1.7],
        2006: [10000, 8000, 1000, 40, 2000, 1.4, 1.4, 1.4, 1.1, 1.3],
        2007: [20000, 15000, 10000, 0, 16000, 1.2, 1.2, 1.2, 0, 1.25],
        2008: [50000, 35000, 15000, 80, 40000, 1.5, 1.5, 1.5, 1.3, 1.4],
        2009: [85000, 44000, 25000, 90, 40000, 1.4, 1.4, 1.4, 1.1, 1.2],
        2010: [120000, 50000, 20000, 90, 52000, 1.4, 1.4, 1.4, 1.1, 1.2],
        2011: [250000, 150000, 100000, 120, 90000, 1.8, 1.8, 1.8, 1.3, 1.3],
        2012: [250000, 125000, 125000, 100, 95000, 1.5, 1.5, 1.5, 1.1, 1.3],
        2101: [10000, 6000, 1000, 0, 1000, 1.5, 1.5, 1.5, 0, 1.3],
        2102: [7500, 12500, 5000, 0, 2000, 1.5, 1.5, 1.5, 0, 1.3],
        2103: [15000, 10000, 5000, 0, 2500, 1.5, 1.5, 1.5, 0, 1.3],
        2104: [20000, 15000, 7500, 0, 3500, 1.3, 1.3, 1.3, 0, 1.4],
        2105: [25000, 20000, 10000, 0, 4500, 1.5, 1.5, 1.5, 0, 1.3],
        2106: [50000, 50000, 20000, 0, 5000, 1.5, 1.5, 1.5, 0, 1.3],
        2107: [70000, 40000, 20000, 0, 5500, 1.5, 1.5, 1.5, 0, 1.3],
        2108: [160000, 120000, 50000, 0, 6000, 1.5, 1.5, 1.5, 0, 1.4],
        2109: [75000, 55000, 25000, 0, 6500, 1.5, 1.5, 1.5, 0, 1.3],
        2110: [85000, 40000, 35000, 0, 7000, 1.5, 1.5, 1.5, 0, 1.3],
        2111: [120000, 30000, 25000, 0, 7500, 1.5, 1.5, 1.5, 0, 1.3],
        2112: [100000, 40000, 30000, 0, 8000, 1.5, 1.5, 1.5, 0, 1.3],
        2113: [200000, 100000, 100000, 0, 8500, 1.2, 1.2, 1.2, 0, 1.3],
        2114: [220000, 110000, 110000, 0, 9000, 1.3, 1.3, 1.3, 0, 1.3],
        2115: [240000, 120000, 120000, 0, 9500, 1.3, 1.3, 1.3, 0, 1.3],
        2116: [250000, 250000, 250000, 0, 10000, 1.4, 1.4, 1.4, 0, 1.4],
        2117: [500000, 300000, 200000, 0, 13000, 1.5, 1.5, 1.5, 0, 1.3],
        2118: [300000, 180000, 120000, 0, 11000, 1.7, 1.7, 1.7, 0, 1.4],
        3001: [6, 2, 0, 0, 40, 1.21, 1.21, 0, 0, 1.22],
        3002: [5, 2, 0, 8, 48, 1.18, 1.18, 0, 1.02, 1.2],
        3003: [30000, 20000, 10000, 13, 16000, 1.3, 1.3, 1.3, 1.08, 1.25],
        3004: [5000, 3800, 1000, 10, 16000, 1.8, 1.8, 1.8, 1.2, 1.6],
        3005: [50000, 40000, 50000, 40, 64000, 1.8, 1.8, 1.8, 1.2, 1.7],
        3006: [7500, 7000, 1000, 0, 2000, 1.3, 1.3, 1.3, 0, 1.3],
        3007: [35000, 15000, 10000, 40, 16000, 1.5, 1.5, 1.5, 1.05, 1.4],
        3008: [50000, 20000, 30000, 40, 12000, 1.07, 1.07, 1.07, 1.01, 1.17],
        3009: [100000, 10000, 3000, 80, 40000, 1.14, 1.14, 1.14, 1.04, 1.3],
        3010: [100000, 40000, 20000, 60, 52000, 1.5, 1.5, 1.5, 1.1, 1.2],
        3011: [55000, 50000, 30000, 70, 50000, 1.5, 1.5, 1.5, 1.05, 1.3],
        3012: [250000, 125000, 125000, 100, 95000, 1.4, 1.4, 1.4, 1.05, 1.4],
        3101: [10000, 6000, 1000, 0, 1000, 1.5, 1.5, 1.5, 0, 1.3],
        3102: [7500, 12500, 5000, 0, 2000, 1.3, 1.3, 1.3, 0, 1.3],
        3103: [15000, 10000, 5000, 0, 2500, 1.5, 1.5, 1.5, 0, 1.4],
        3104: [20000, 15000, 7500, 0, 3500, 1.3, 1.3, 1.3, 0, 1.3],
        3105: [160000, 120000, 50000, 0, 4500, 1.5, 1.5, 1.5, 0, 1.4],
        3106: [50000, 50000, 20000, 0, 5000, 1.5, 1.5, 1.5, 0, 1.3],
        3107: [70000, 40000, 20000, 0, 5500, 1.3, 1.3, 1.3, 0, 1.3],
        3108: [160000, 120000, 50000, 0, 6000, 1.5, 1.5, 1.5, 0, 1.4],
        3109: [160000, 120000, 50000, 0, 6500, 1.5, 1.5, 1.5, 0, 1.4],
        3110: [85000, 40000, 35000, 0, 7000, 1.2, 1.2, 1.2, 0, 1.3],
        3111: [120000, 30000, 25000, 0, 7500, 1.3, 1.3, 1.3, 0, 1.3],
        3112: [160000, 120000, 50000, 0, 8000, 1.5, 1.5, 1.5, 0, 1.4],
        3113: [200000, 100000, 100000, 0, 8500, 1.5, 1.5, 1.5, 0, 1.3],
        3114: [160000, 120000, 50000, 0, 9000, 1.5, 1.5, 1.5, 0, 1.4],
        3115: [320000, 240000, 100000, 0, 9500, 1.5, 1.5, 1.5, 0, 1.4],
        3116: [320000, 240000, 100000, 0, 10000, 1.5, 1.5, 1.5, 0, 1.4],
        3117: [500000, 300000, 200000, 0, 13000, 1.5, 1.5, 1.5, 0, 1.3],
        3118: [300000, 180000, 120000, 0, 11000, 1.7, 1.7, 1.7, 0, 1.4],
        4001: [4, 3, 0, 0, 40, 1.21, 1.21, 0, 0, 1.22],
        4002: [6, 3, 0, 9, 40, 1.2, 1.2, 0, 1.02, 1.22],
        4003: [20000, 15000, 15000, 10, 16000, 1.3, 1.3, 1.3, 1.08, 1.25],
        4004: [7500, 5000, 800, 15, 16000, 1.8, 1.8, 1.8, 1.3, 1.7],
        4005: [60000, 30000, 50000, 30, 64000, 1.8, 1.8, 1.8, 1.3, 1.8],
        4006: [8500, 5000, 3000, 0, 2000, 1.25, 1.25, 1.25, 0, 1.35],
        4007: [15000, 15000, 5000, 0, 12000, 1.2, 1.2, 1.2, 0, 1.2],
        4008: [75000, 25000, 30000, 30, 16000, 1.05, 1.05, 1.05, 1.03, 1.18],
        4009: [87500, 25000, 30000, 40, 40000, 1.2, 1.2, 1.2, 1.02, 1.2],
        4010: [150000, 30000, 30000, 140, 52000, 1.4, 1.4, 1.4, 1.05, 1.8],
        4011: [75000, 50000, 55000, 90, 90000, 1.2, 1.2, 1.2, 1.04, 1.3],
        4012: [500000, 250000, 250000, 100, 95000, 1.4, 1.4, 1.4, 1.05, 1.3],
        4101: [10000, 6000, 1000, 0, 1000, 1.5, 1.5, 1.5, 0, 1.4],
        4102: [7500, 12500, 5000, 0, 2000, 1.5, 1.5, 1.5, 0, 1.3],
        4103: [15000, 10000, 5000, 0, 2500, 1.5, 1.5, 1.5, 0, 1.4],
        4104: [20000, 15000, 7500, 0, 3500, 1.5, 1.5, 1.5, 0, 1.4],
        4105: [25000, 20000, 10000, 0, 4500, 1.5, 1.5, 1.5, 0, 1.4],
        4106: [50000, 50000, 20000, 0, 5000, 1.3, 1.3, 1.3, 0, 1.4],
        4107: [70000, 40000, 20000, 0, 5500, 1.5, 1.5, 1.5, 0, 1.3],
        4108: [80000, 50000, 20000, 0, 6000, 1.2, 1.2, 1.2, 0, 1.2],
        4109: [320000, 240000, 100000, 0, 6500, 1.5, 1.5, 1.5, 0, 1.4],
        4110: [85000, 40000, 35000, 0, 7000, 1.2, 1.2, 1.2, 0, 1.2],
        4111: [120000, 30000, 25000, 0, 7500, 1.5, 1.5, 1.5, 0, 1.4],
        4112: [100000, 40000, 30000, 0, 8000, 1.5, 1.5, 1.5, 0, 1.3],
        4113: [200000, 100000, 100000, 0, 8500, 1.5, 1.5, 1.5, 0, 1.3],
        4114: [160000, 120000, 50000, 0, 9000, 1.5, 1.5, 1.5, 0, 1.4],
        4115: [240000, 120000, 120000, 0, 9500, 1.5, 1.5, 1.5, 0, 1.4],
        4116: [320000, 240000, 100000, 0, 10000, 1.5, 1.5, 1.5, 0, 1.4],
        4117: [500000, 300000, 200000, 0, 13000, 1.5, 1.5, 1.5, 0, 1.3],
        4118: [300000, 180000, 120000, 0, 11000, 1.7, 1.7, 1.7, 0, 1.4]
    };

    const LF_BUILDING_FILENAMES = {
        1001: 'residential_sector.png',
        1002: 'biosphere_farm.png',
        1003: 'research_center.png',
        1004: 'science_academy.png',
        1005: 'nerve_calibration_center.png',
        1006: 'high_energy_melting.png',
        1007: 'food_storage.png',
        1008: 'fusion_powered_production.png',
        1009: 'skyscraper.png',
        1010: 'biotech_lab.png',
        1011: 'metropolis.png',
        1012: 'planetary_shield.png',
        2001: 'meditation_enclave.png',
        2002: 'crystal_farm.png',
        2003: 'rune_technologium.png',
        2004: 'rune_forge.png',
        2005: 'orikterium.png',
        2006: 'magma_forge.png',
        2007: 'chamber_of_rupture.png',
        2008: 'megalith.png',
        2009: 'crystal_purification.png',
        2010: 'deuterium_synthesizer.png',
        2011: 'mineral_research_center.png',
        2012: 'advanced_recycling_unit.png',
        3001: 'assembly_line.png',
        3002: 'fusion_cell_factory.png',
        3003: 'robotics_research_center.png',
        3004: 'upgrade_network.png',
        3005: 'quantum_computer_center.png',
        3006: 'automated_assembly_center.png',
        3007: 'high_performance_transformer.png',
        3008: 'microchip_line.png',
        3009: 'production_assembly_workshop.png',
        3010: 'high_performance_synthesizer.png',
        3011: 'mass_chip_production.png',
        3012: 'repair_nanobots.png',
        4001: 'sanctuary.png',
        4002: 'antimatter_condenser.png',
        4003: 'cyclone_chamber.png',
        4004: 'hall_of_realization.png',
        4005: 'transcendental_forum.png',
        4006: 'antimatter_converter.png',
        4007: 'cloning_lab.png',
        4008: 'chrysalis_accelerator.png',
        4009: 'biomodifier.png',
        4010: 'psionic_modulator.png',
        4011: 'ship_production_hall.png',
        4012: 'supra_refractor.png'
    };

    const LF_RESEARCH_FILENAMES = {
        1101: 'intergalactic_envoys.png',
        1102: 'high_efficiency_extractors.png',
        1103: 'fusion_drives.png',
        1104: 'stealth_field_generator.png',
        1105: 'orbital_dock.png',
        1106: 'research_ai.png',
        1107: 'high_performance_terraformer.png',
        1108: 'enhanced_extraction_technologies.png',
        1109: 'light_fighter_mk_ii.png',
        1110: 'cruiser_mk_ii.png',
        1111: 'enhanced_laboratory_technology.png',
        1112: 'plasma_terraformer.png',
        1113: 'low_temperature_drives.png',
        1114: 'bomber_mk_ii.png',
        1115: 'destroyer_mk_ii.png',
        1116: 'battlecruiser_mk_ii.png',
        1117: 'assistant_robots.png',
        1118: 'supercomputer.png',
        2101: 'volcanic_batteries.png',
        2102: 'acoustic_scanning.png',
        2103: 'high_energy_supply_systems.png',
        2104: 'cargo_hold_expansion.png',
        2105: 'magma_powered_production.png',
        2106: 'geothermal_power_plants.png',
        2107: 'echo_sounding.png',
        2108: 'ion_crystal_enhancement.png',
        2109: 'enhanced_stellarator.png',
        2110: 'reinforced_diamond_drills.png',
        2111: 'seismic_extraction_technology.png',
        2112: 'magma_powered_supply_systems.png',
        2113: 'ionized_crystal_modules.png',
        2114: 'optimized_mine_construction.png',
        2115: 'diamond_energy_transmitter.png',
        2116: 'obsidian_shield_plating.png',
        2117: 'rune_shields.png',
        2118: 'rocktal_collector_enhancement.png',
        3101: 'catalyst_technology.png',
        3102: 'plasma_drive.png',
        3103: 'efficiency_module.png',
        3104: 'warehouse_ai.png',
        3105: 'general_repair_light_fighter.png',
        3106: 'automated_transport_lines.png',
        3107: 'enhanced_drone_ai.png',
        3108: 'experimental_recycling_technology.png',
        3109: 'general_repair_cruiser.png',
        3110: 'gravitational_maneuver_autopilot.png',
        3111: 'high_temperature_superconductors.png',
        3112: 'general_repair_battleship.png',
        3113: 'swarm_ai.png',
        3114: 'general_repair_battlecruiser.png',
        3115: 'general_repair_bomber.png',
        3116: 'general_repair_destroyer.png',
        3117: 'experimental_weapon_technology.png',
        3118: 'mechas_overall_enhancement.png',
        4101: 'waste_heat_recovery.png',
        4102: 'sulfide_process.png',
        4103: 'psionic_network.png',
        4104: 'telekinetic_grab_beam.png',
        4105: 'enhanced_sensor_technology.png',
        4106: 'neuromodal_compressor.png',
        4107: 'neuro_interface.png',
        4108: 'interplanetary_analytical_network.png',
        4109: 'speed_boost_heavy_fighter.png',
        4110: 'telekinetic_drive.png',
        4111: 'sixth_sense.png',
        4112: 'psycho_harmonizer.png',
        4113: 'efficient_swarm_intelligence.png',
        4114: 'speed_boost_large_cargo.png',
        4115: 'gravitational_sensors.png',
        4116: 'speed_boost_battleship.png',
        4117: 'psionic_shield_matrix.png',
        4118: 'kaelesh_explorer_enhancement.png'
    };

    const MRC_REDUCABLE_IDS = new Set([2001, 2002]);
    const RACES = ['humans', 'rocktal', 'mechas', 'kaelesh'];
    const RACE_PREFIX = { humans: '1', rocktal: '2', mechas: '3', kaelesh: '4' };
    const BONUS_INPUT_IDS = ['megalithLevel', 'mrcLevel', 'runoLevel', 'humansLevel', 'mechasLevel', 'kaeleshLevel'];

    const emptyRaceTotals = () => ({
        buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 },
        research: { m: 0, c: 0, d: 0, p: 0, total: 0 }
    });

    let lfTotals = {
        humans: emptyRaceTotals(),
        rocktal: emptyRaceTotals(),
        mechas: emptyRaceTotals(),
        kaelesh: emptyRaceTotals()
    };

    let isSumAllTabsMode = false;
    let currentLifeformRace = 'humans';

    const SETTINGS_KEY = 'og_calc_settings_v1';

    const DEFAULT_SETTINGS = {
        tmPerBox: 42000,
        tmPackSize: 12500000,
        packPriceTRY: 900,
        rates: { BYN: 1, RUB: 23.5, USD: 0.31, EUR: 0.28, TRY: 16.01 }
    };

    let currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

    const numberFormatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });

    function safeSet(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                Object.keys(localStorage).forEach(k => {
                    if (k.startsWith('og_calc_')) {
                        localStorage.removeItem(k);
                    }
                });

                try {
                    localStorage.setItem(key, value);
                    return true;
                } catch (e2) {
                    return false;
                }
            }

            return false;
        }
    }

    function safeGet(key, def) {
        try {
            const v = localStorage.getItem(key);
            return v !== null ? v : def;
        } catch (e) {
            return def;
        }
    }

    function safeJsonParse(value, fallback) {
        try {
            const parsed = JSON.parse(value);
            return parsed === null ? fallback : parsed;
        } catch (e) {
            return fallback;
        }
    }

    function migrateKey(oldKey, newKey) {
        try {
            if (localStorage.getItem(newKey) === null && localStorage.getItem(oldKey) !== null) {
                localStorage.setItem(newKey, localStorage.getItem(oldKey));
                localStorage.removeItem(oldKey);
            }
        } catch (e) {}
    }

    const normalizeRace = race => (RACES.includes(race) ? race : 'humans');

    const sanitizeInput = v => (!v ? '' : String(v).replace(/[^0-9]/g, '').slice(0, 15));

    function formatWithDotsRaw(input) {
        if (input === null || input === undefined || input === '') {
            return '';
        }

        const s = String(input);
        const sign = s[0] === '-' ? '-' : '';
        const digits = (sign ? s.slice(1) : s).replace(/[^0-9]/g, '');

        if (!digits) {
            return sign ? '-' : '';
        }

        let out = '';

        for (let i = digits.length; i > 0; i -= 3) {
            out = digits.slice(Math.max(0, i - 3), i) + (out ? '.' + out : '');
        }

        return sign + out;
    }

    const formatNumberWithDots = n => {
        if (n === null || n === undefined || Number.isNaN(n)) {
            return '0';
        }

        const value = Math.round(Number(n) || 0);

        if (!Number.isFinite(value)) {
            return '∞';
        }

        return numberFormatter.format(value);
    };

    function parseNumberInput(s) {
        if (s === null || s === undefined) {
            return 0;
        }

        const str = String(s).trim();

        if (str === '' || str === '-') {
            return 0;
        }

        const negative = str[0] === '-';
        const num = Number(str.replace(/[^0-9]/g, '')) || 0;

        if (!Number.isFinite(num)) {
            return 0;
        }

        const safe = Math.min(num, Number.MAX_SAFE_INTEGER);

        return negative ? -safe : safe;
    }

    const convertToMetal = (m, c, d) => (m || 0) + (c || 0) * CONFIG.METAL_EQ_CRYSTAL + (d || 0) * CONFIG.METAL_EQ_DEUT;

    function debounce(fn, wait) {
        let t = null;

        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    const currentLang = () => {
        const saved = safeGet(KEYS.LANG, 'ru');
        return LANGUAGES[saved] ? saved : 'ru';
    };

    const getDict = () => (window.getLangDict ? window.getLangDict(currentLang()) : {});

    function resSpan(cls, n) {
        const s = document.createElement('span');
        s.className = cls;
        s.textContent = formatNumberWithDots(n);
        return s;
    }

    function makeIcon(src, alt, size = 20) {
        const img = document.createElement('img');

        img.src = src;
        img.alt = alt;
        img.className = 'icon';
        img.width = size;
        img.height = size;
        img.loading = 'lazy';
        img.style.cssText = `width:${size}px;height:${size}px;vertical-align:middle;border-radius:4px;`;

        img.addEventListener('error', function handler() {
            if (img._fallback) {
                return;
            }

            img.removeEventListener('error', handler);

            const fb = document.createElement('span');

            fb.className = 'icon-fallback';
            fb.setAttribute('aria-hidden', 'true');
            fb.textContent = alt ? alt[0] : '—';

            img.style.display = 'none';

            if (img.parentNode) {
                img.parentNode.insertBefore(fb, img.nextSibling);
            }

            img._fallback = true;
        }, { once: true });

        return img;
    }

    function updateResourceCell(td, value, cls) {
        if (!td) {
            return;
        }

        let span = td.firstChild;

        if (!span || span.tagName !== 'SPAN') {
            td.innerHTML = '';
            span = document.createElement('span');
            span.className = cls;
            td.appendChild(span);
        }

        span.textContent = formatNumberWithDots(value);
    }

    class LimitedCache {
        constructor(maxSize = 500) {
            this.cache = new Map();
            this.maxSize = maxSize;
        }

        get(key) {
            if (!this.cache.has(key)) {
                return undefined;
            }

            const v = this.cache.get(key);

            this.cache.delete(key);
            this.cache.set(key, v);

            return v;
        }

        set(key, value) {
            if (this.cache.has(key)) {
                this.cache.delete(key);
            } else if (this.cache.size >= this.maxSize) {
                this.cache.delete(this.cache.keys().next().value);
            }

            this.cache.set(key, value);
        }

        clear() {
            this.cache.clear();
        }
    }

    const calcCache = new LimitedCache(500);

    function cached(key, fn) {
        const hit = calcCache.get(key);

        if (hit !== undefined) {
            return hit;
        }

        const result = fn();

        calcCache.set(key, result);

        return result;
    }

    function geomSum(base, factor, from, to) {
        return cached(`geom_${base.m}_${base.c}_${base.d}_${factor}_${from}_${to}`, () => {
            const count = Math.max(0, to - from);

            if (count <= 0) {
                return { m: 0, c: 0, d: 0, points: 0, levels: 0 };
            }

            const start = Math.max(0, from);

            const sum = b => {
                if (!b) {
                    return 0;
                }

                if (factor === 1) {
                    return b * count;
                }

                const value = b * Math.pow(factor, start) * (Math.pow(factor, count) - 1) / (factor - 1);

                return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
            };

            const m = Math.round(sum(base.m));
            const c = Math.round(sum(base.c));
            const d = Math.round(sum(base.d));

            return {
                m,
                c,
                d,
                points: Math.round((m + c + d) / 1000),
                levels: count
            };
        });
    }

    function calcBuildCostLF(techId, level, rdc) {
        return cached(`build_${techId}_${level}_${rdc}`, () => {
            const d = LF_TECH_COSTS[techId];

            if (!d || level < 1) {
                return [0, 0, 0];
            }

            const k = Math.min(0.99, rdc);

            return [0, 1, 2].map(i => Math.floor((1 - k) * Math.floor(d[i] * level * Math.pow(d[5 + i], level - 1))));
        });
    }

    function calcDeconstrCostLF(techId, level) {
        return cached(`deconstr_${techId}_${level}`, () => {
            const d = LF_TECH_COSTS[techId];

            if (!d || level < 0 || techId % 1000 > 100) {
                return [0, 0, 0];
            }

            return [0, 1, 2].map(i => Math.floor(d[i] * level * Math.pow(d[5 + i], level - 1)));
        });
    }

    function getBuildCostLF(techId, from, to, rsrRdc, bldRdc = 0) {
        return cached(`range_${techId}_${from}_${to}_${rsrRdc}_${bldRdc}`, () => {
            const total = [0, 0, 0];
            const rdc = techId % 1000 < 100 ? bldRdc : rsrRdc;

            for (let lvl = from + 1; lvl <= to; lvl++) {
                const c = calcBuildCostLF(techId, lvl, rdc);

                total[0] += c[0];
                total[1] += c[1];
                total[2] += c[2];
            }

            return total;
        });
    }

    function createTableRow({ index, techId, name, iconPath, dataset, showPlanets, planetsType }) {
        const tr = document.createElement('tr');

        tr.dataset.index = index;

        if (techId !== undefined) {
            tr.dataset.techId = techId;
        }

        if (dataset) {
            Object.entries(dataset).forEach(([k, v]) => {
                tr.dataset[k] = v;
            });
        }

        const tdName = document.createElement('td');

        tdName.className = 'name-cell';
        tdName.appendChild(makeIcon(iconPath, name, 20));
        tdName.appendChild(document.createTextNode(name));
        tr.appendChild(tdName);

        [['from', 'lvl-input'], ['to', 'lvl-input']].forEach(([type, cls]) => {
            const td = document.createElement('td');
            const inp = document.createElement('input');

            inp.type = 'text';
            inp.className = cls;
            inp.dataset.type = type;
            inp.dataset.index = index;
            inp.inputMode = 'numeric';

            td.appendChild(inp);
            tr.appendChild(td);
        });

        if (showPlanets) {
            const td = document.createElement('td');
            const planetImg = document.createElement('img');

            planetImg.src = IMG.root + 'planet.png';
            planetImg.className = 'icon';
            planetImg.alt = '';

            const inp = document.createElement('input');

            inp.type = 'text';
            inp.className = 'planet-input';
            inp.dataset.type = planetsType;
            inp.dataset.index = index;
            inp.inputMode = 'numeric';
            inp.value = '1';

            td.append(planetImg, inp);
            tr.appendChild(td);
        }

        const tdM = document.createElement('td');
        tdM.className = 'm';
        tdM.appendChild(resSpan('val-metal', 0));

        const tdC = document.createElement('td');
        tdC.className = 'c';
        tdC.appendChild(resSpan('val-crystal', 0));

        const tdD = document.createElement('td');
        tdD.className = 'd';
        tdD.appendChild(resSpan('val-deut', 0));

        const tdP = document.createElement('td');
        tdP.className = 'p';
        tdP.textContent = '0';

        tr.append(tdM, tdC, tdD, tdP);

        return tr;
    }

    function buildRowsBuildings() {
        const tbody = document.getElementById('tbodyBuildings');

        if (!tbody) {
            return;
        }

        tbody.innerHTML = '';

        const names = (typeof LANG_BUILDINGS !== 'undefined' && (LANG_BUILDINGS[currentLang()] || LANG_BUILDINGS.ru)) || [];
        const frag = document.createDocumentFragment();

        BUILDING_ORDER.forEach(i => {
            const b = BUILDINGS[i];

            frag.appendChild(createTableRow({
                index: i,
                name: (names[i] || `Building ${i}`).trim(),
                iconPath: IMG.buildings + b.img,
                showPlanets: true,
                planetsType: 'planets'
            }));
        });

        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }

    function buildRowsResearch() {
        const tbody = document.getElementById('tbodyResearch');

        if (!tbody) {
            return;
        }

        tbody.innerHTML = '';

        const names = (typeof LANG_RESEARCH !== 'undefined' && (LANG_RESEARCH[currentLang()] || LANG_RESEARCH.ru)) || [];
        const frag = document.createDocumentFragment();

        RESEARCH.forEach((r, i) => {
            frag.appendChild(createTableRow({
                index: i,
                name: (names[i] || `Research ${i}`).trim(),
                iconPath: IMG.research + r.img,
                showPlanets: false
            }));
        });

        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }

    function buildRowsMoonBuildings() {
        const tbody = document.getElementById('tbodyMoonBuildings');

        if (!tbody) {
            return;
        }

        tbody.innerHTML = '';

        const dict = getDict();
        const frag = document.createDocumentFragment();

        MOON_BUILDINGS.forEach((b, i) => {
            frag.appendChild(createTableRow({
                index: i,
                name: dict[`moon_${b.id}`] || b.name,
                iconPath: IMG.buildings + b.img,
                dataset: { buildingId: b.id },
                showPlanets: true,
                planetsType: 'moons'
            }));
        });

        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }

    function buildRowsLfBuildings() {
        const tbody = document.getElementById('tbodyLfBuildings');

        if (!tbody) {
            return;
        }

        tbody.innerHTML = '';

        const prefix = RACE_PREFIX[currentLifeformRace] + '0';
        const dict = getDict();
        const frag = document.createDocumentFragment();

        for (let i = 1; i <= 12; i++) {
            const techId = Number(prefix + String(i).padStart(2, '0'));

            if (!LF_TECH_COSTS[techId]) {
                continue;
            }

            frag.appendChild(createTableRow({
                index: i - 1,
                techId,
                name: dict[`lf_b_${techId}`] || `ID ${techId}`,
                iconPath: `images/lifeforms/buildings/${currentLifeformRace}/${LF_BUILDING_FILENAMES[techId] || techId + '.png'}`,
                showPlanets: true,
                planetsType: 'planets'
            }));
        }

        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }

    function buildRowsLfResearch() {
        const tbody = document.getElementById('tbodyLfResearch');

        if (!tbody) {
            return;
        }

        tbody.innerHTML = '';

        const prefix = RACE_PREFIX[currentLifeformRace] + '1';
        const dict = getDict();
        const frag = document.createDocumentFragment();

        for (let i = 1; i <= 18; i++) {
            const techId = Number(prefix + String(i).padStart(2, '0'));

            if (!LF_TECH_COSTS[techId]) {
                continue;
            }

            frag.appendChild(createTableRow({
                index: i - 1,
                techId,
                name: dict[`lf_r_${techId}`] || `ID ${techId}`,
                iconPath: `images/lifeforms/research/${currentLifeformRace}/${LF_RESEARCH_FILENAMES[techId] || techId + '.png'}`,
                showPlanets: true,
                planetsType: 'planets'
            }));
        }

        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }

    function recalcStandardTable(tbodyId, dataArray, sumIds, isMoon = false) {
        const tbody = document.getElementById(tbodyId);

        if (!tbody) {
            return;
        }

        let tm = 0;
        let tc = 0;
        let td = 0;
        let tp = 0;

        const useMrc = tbodyId === 'tbodyBuildings' && currentLifeformRace === 'rocktal';
        const mrcLevel = useMrc ? parseNumberInput(document.getElementById('mrcLevel')?.value || '0') : 0;

        tbody.querySelectorAll('tr').forEach(tr => {
            const idx = Number(tr.dataset.index);
            const data = dataArray[idx];

            if (!data) {
                return;
            }

            const from = parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value));
            const toRaw = sanitizeInput(tr.querySelector('input[data-type="to"]')?.value);

            let to = Math.max(from, toRaw === '' ? from : parseNumberInput(toRaw));

            if (to - from > CONFIG.MAX_LEVEL_SPAN) {
                to = from + CONFIG.MAX_LEVEL_SPAN;
            }

            const mult = Math.max(1, parseNumberInput(tr.querySelector(`input[data-type="${isMoon ? 'moons' : 'planets'}"]`)?.value) || 1);
            const sum = geomSum(data.base, data.factor, from, to);

            let m = Math.round(sum.m * mult);
            let c = Math.round(sum.c * mult);
            let d = Math.round(sum.d * mult);

            if (useMrc && mrcLevel > 0 && MRC_BUILDING_IDS.includes(idx + 1)) {
                const discount = Math.min(0.99, 0.005 * mrcLevel);
                const k = 1 - discount;

                m = Math.ceil(m * k);
                c = Math.ceil(c * k);
                d = Math.ceil(d * k);
            }

            const p = Math.round((m + c + d) / 1000);

            updateResourceCell(tr.querySelector('td.m'), m, 'val-metal');
            updateResourceCell(tr.querySelector('td.c'), c, 'val-crystal');
            updateResourceCell(tr.querySelector('td.d'), d, 'val-deut');

            tr.querySelector('td.p').textContent = formatNumberWithDots(p);

            tm += m;
            tc += c;
            td += d;
            tp += p;
        });

        if (sumIds) {
            updateResourceCell(document.getElementById(sumIds.m), tm, 'val-metal');
            updateResourceCell(document.getElementById(sumIds.c), tc, 'val-crystal');
            updateResourceCell(document.getElementById(sumIds.d), td, 'val-deut');

            document.getElementById(sumIds.p).textContent = formatNumberWithDots(tp);
            document.getElementById(sumIds.total).textContent = formatNumberWithDots(Math.round(convertToMetal(tm, tc, td)));
        }

        updateBoxesNeeded();
        updateSumAllTabsRows();
    }

    function recalcLfTable(tbodyId, isBuilding) {
        const tbody = document.getElementById(tbodyId);

        if (!tbody) {
            return;
        }

        let tm = 0;
        let tc = 0;
        let td = 0;
        let tp = 0;

        let megalithLevel = 0;
        let mrcLevel = 0;
        let rsrRdc = 0;

        if (currentLifeformRace === 'rocktal') {
            megalithLevel = parseNumberInput(document.getElementById('megalithLevel')?.value || '0');
            mrcLevel = parseNumberInput(document.getElementById('mrcLevel')?.value || '0');
            rsrRdc = 0.0025 * parseNumberInput(document.getElementById('runoLevel')?.value || '0');
        } else {
            const inputId = { humans: 'humansLevel', mechas: 'mechasLevel', kaelesh: 'kaeleshLevel' }[currentLifeformRace];
            rsrRdc = 0.0025 * parseNumberInput(document.getElementById(inputId)?.value || '0');
        }

        tbody.querySelectorAll('tr').forEach(tr => {
            const techId = Number(tr.dataset.techId) || 0;

            if (!techId || !LF_TECH_COSTS[techId]) {
                updateResourceCell(tr.querySelector('td.m'), 0, 'val-metal');
                updateResourceCell(tr.querySelector('td.c'), 0, 'val-crystal');
                updateResourceCell(tr.querySelector('td.d'), 0, 'val-deut');

                tr.querySelector('td.p').textContent = '0';

                return;
            }

            const fromRaw = sanitizeInput(tr.querySelector('input[data-type="from"]')?.value);
            const toRaw = sanitizeInput(tr.querySelector('input[data-type="to"]')?.value);

            let from = 0;
            let to = 0;

            if (fromRaw === '' && toRaw === '') {
                from = to = 0;
            } else if (toRaw === '') {
                from = 0;
                to = parseNumberInput(fromRaw);
            } else {
                from = parseNumberInput(fromRaw);
                to = Math.max(from, parseNumberInput(toRaw));
            }

            if (to - from > CONFIG.MAX_LEVEL_SPAN) {
                to = from + CONFIG.MAX_LEVEL_SPAN;
            }

            const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1);

            let cost = [0, 0, 0];
            let points = 0;

            if (isBuilding) {
                let bldRdc = 0;

                if (currentLifeformRace === 'rocktal') {
                    bldRdc = 0.01 * megalithLevel;

                    if (MRC_REDUCABLE_IDS.has(techId)) {
                        bldRdc += 0.005 * mrcLevel;
                    }
                }

                if (to > from) {
                    cost = getBuildCostLF(techId, from, to, 0, bldRdc);
                    points = Math.round((cost[0] + cost[1] + cost[2]) / 1000);
                } else if (from > to) {
                    for (let lvl = from; lvl > to; lvl--) {
                        const c = calcDeconstrCostLF(techId, lvl);

                        cost[0] += c[0];
                        cost[1] += c[1];
                        cost[2] += c[2];
                    }

                    points = -Math.round((cost[0] + cost[1] + cost[2]) / 1000);
                }
            } else {
                cost = getBuildCostLF(techId, from, to, rsrRdc, 0);
                points = Math.round((cost[0] + cost[1] + cost[2]) / 1000);
            }

            const m = Math.round(cost[0] * planets);
            const c = Math.round(cost[1] * planets);
            const d = Math.round(cost[2] * planets);
            const p = Math.round(points * planets);

            updateResourceCell(tr.querySelector('td.m'), m, 'val-metal');
            updateResourceCell(tr.querySelector('td.c'), c, 'val-crystal');
            updateResourceCell(tr.querySelector('td.d'), d, 'val-deut');

            tr.querySelector('td.p').textContent = formatNumberWithDots(p);

            tm += m;
            tc += c;
            td += d;
            tp += p;
        });

        const suf = isBuilding ? 'LfB' : 'LfR';

        updateResourceCell(document.getElementById('sumMetal' + suf), tm, 'val-metal');
        updateResourceCell(document.getElementById('sumCrystal' + suf), tc, 'val-crystal');
        updateResourceCell(document.getElementById('sumDeut' + suf), td, 'val-deut');

        document.getElementById('sumPoints' + suf).textContent = formatNumberWithDots(tp);

        const totalMetal = Math.round(convertToMetal(tm, tc, td));

        document.getElementById('sumTotalMetal' + suf).textContent = formatNumberWithDots(totalMetal);

        lfTotals[currentLifeformRace][isBuilding ? 'buildings' : 'research'] = {
            m: tm,
            c: tc,
            d: td,
            p: tp,
            total: totalMetal
        };

        saveLfTotals();
        updateBoxesNeeded();
        updateSumAllTabsRows();
    }

    const recalcAllBuildings = () => recalcStandardTable('tbodyBuildings', BUILDINGS, {
        m: 'sumMetalB',
        c: 'sumCrystalB',
        d: 'sumDeutB',
        p: 'sumPointsB',
        total: 'sumTotalMetalB'
    });

    const recalcAllMoonBuildings = () => recalcStandardTable('tbodyMoonBuildings', MOON_BUILDINGS, {
        m: 'sumMetalMoon',
        c: 'sumCrystalMoon',
        d: 'sumDeutMoon',
        p: 'sumPointsMoon',
        total: 'sumTotalMetalMoon'
    }, true);

    const recalcAllLfBuildings = () => recalcLfTable('tbodyLfBuildings', true);
    const recalcAllLfResearch = () => recalcLfTable('tbodyLfResearch', false);

    function recalcAllResearch() {
        const tbody = document.getElementById('tbodyResearch');

        if (!tbody) {
            return;
        }

        let sm = 0;
        let sc = 0;
        let sd = 0;
        let sp = 0;
        let totalLevels = 0;

        tbody.querySelectorAll('tr').forEach(tr => {
            const idx = Number(tr.dataset.index) || 0;
            const data = RESEARCH[idx];

            if (!data) {
                return;
            }

            const from = parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value));
            const toRaw = sanitizeInput(tr.querySelector('input[data-type="to"]')?.value);

            let to = Math.max(from, toRaw === '' ? from : parseNumberInput(toRaw));

            if (to - from > CONFIG.MAX_LEVEL_SPAN) {
                to = from + CONFIG.MAX_LEVEL_SPAN;
            }

            const sum = geomSum(data.base, data.factor, from, to);

            updateResourceCell(tr.querySelector('td.m'), sum.m, 'val-metal');
            updateResourceCell(tr.querySelector('td.c'), sum.c, 'val-crystal');
            updateResourceCell(tr.querySelector('td.d'), sum.d, 'val-deut');

            tr.querySelector('td.p').textContent = formatNumberWithDots(sum.points);

            sm += sum.m;
            sc += sum.c;
            sd += sum.d;
            sp += sum.points;
            totalLevels += sum.levels;
        });

        updateResourceCell(document.getElementById('sumMetalR'), sm, 'val-metal');
        updateResourceCell(document.getElementById('sumCrystalR'), sc, 'val-crystal');
        updateResourceCell(document.getElementById('sumDeutR'), sd, 'val-deut');

        document.getElementById('sumPointsR').textContent = formatNumberWithDots(sp);
        document.getElementById('sumTotalMetalR').textContent = formatNumberWithDots(Math.round(convertToMetal(sm, sc, sd)));

        const perLevel = parseNumberInput(document.getElementById('tmInput')?.value || '0');
        const totalTM = Math.round(perLevel * totalLevels * CONFIG.TM_PER_LEVEL_FACTOR);

        document.getElementById('tmTotal').textContent = (getDict().totalTMLabel || 'Итого: ') + formatNumberWithDots(totalTM);

        updateBoxesNeeded();
        updateSumAllTabsRows();
    }

    function recalcAll() {
        recalcAllBuildings();
        recalcAllMoonBuildings();
        recalcAllResearch();
        recalcAllLfBuildings();
        recalcAllLfResearch();
        computeFleet();
        updateBoxesNeeded();
        updateSumAllTabsRows();
    }

    function renderTable() {
        const tableBody = document.querySelector('#shipsTable tbody');

        if (!tableBody) {
            return;
        }

        const qtyMap = safeJsonParse(safeGet(KEYS.SHIP_QTY, '{}'), {});
        const dict = getDict();

        tableBody.innerHTML = '';

        const frag = document.createDocumentFragment();

        SHIPS.forEach(ship => {
            const row = document.createElement('tr');

            row.setAttribute('data-row-id', ship.id);

            const tdName = document.createElement('td');

            tdName.style.textAlign = 'left';
            tdName.appendChild(makeIcon(IMG.ships + ship.img, dict[`ship_${ship.id}`] || ship.id, 28));

            const nameSpan = document.createElement('span');

            nameSpan.className = 'ship-name';
            nameSpan.textContent = dict[`ship_${ship.id}`] || ship.id;

            tdName.appendChild(nameSpan);

            const tdQty = document.createElement('td');
            const qtyInput = document.createElement('input');

            qtyInput.type = 'text';
            qtyInput.inputMode = 'numeric';
            qtyInput.pattern = '[0-9.]*';
            qtyInput.value = qtyMap[ship.id] ? formatWithDotsRaw(qtyMap[ship.id]) : '';
            qtyInput.dataset.id = ship.id;

            tdQty.appendChild(qtyInput);

            const tdM = document.createElement('td');
            tdM.appendChild(resSpan('val-metal', ship.metal));

            const tdC = document.createElement('td');
            tdC.appendChild(resSpan('val-crystal', ship.crystal));

            const tdD = document.createElement('td');
            tdD.appendChild(resSpan('val-deut', ship.deut));

            const tdP = document.createElement('td');

            tdP.className = 'p';
            tdP.textContent = '0';

            row.append(tdName, tdQty, tdM, tdC, tdD, tdP);

            frag.appendChild(row);
        });

        const trSum = document.createElement('tr');

        trSum.className = 'summary-row regular-total-row';

        const tdSumName = document.createElement('td');

        tdSumName.style.cssText = 'text-align:left;font-weight:bold;';
        tdSumName.textContent = dict.total || 'Итого';

        const tdSumQty = document.createElement('td');

        const tdSM = document.createElement('td');
        tdSM.className = 'm';
        tdSM.id = 'sumMetalF';
        tdSM.appendChild(resSpan('val-metal', 0));

        const tdSC = document.createElement('td');
        tdSC.className = 'c';
        tdSC.id = 'sumCrystalF';
        tdSC.appendChild(resSpan('val-crystal', 0));

        const tdSD = document.createElement('td');
        tdSD.className = 'd';
        tdSD.id = 'sumDeutF';
        tdSD.appendChild(resSpan('val-deut', 0));

        const tdSP = document.createElement('td');

        tdSP.className = 'p';
        tdSP.textContent = '0';

        trSum.append(tdSumName, tdSumQty, tdSM, tdSC, tdSD, tdSP);

        frag.appendChild(trSum);

        const trTotal = document.createElement('tr');

        trTotal.className = 'total-metal-row regular-total-row';

        const tdTotalName = document.createElement('td');

        tdTotalName.style.cssText = 'text-align:left;font-weight:bold;';
        tdTotalName.textContent = dict.totalInMetal || 'Всего в металле';

        const tdTotalQty = document.createElement('td');

        const tdTotalM = document.createElement('td');

        tdTotalM.className = 'm';
        tdTotalM.colSpan = 3;

        const totalSpan = document.createElement('span');

        totalSpan.id = 'sumTotalMetalF';
        totalSpan.textContent = '0';

        tdTotalM.appendChild(totalSpan);

        const tdTotalP = document.createElement('td');

        trTotal.append(tdTotalName, tdTotalQty, tdTotalM, tdTotalP);

        frag.appendChild(trTotal);

        const trSumAll = document.createElement('tr');

        trSumAll.className = 'sum-all-tabs-row';
        trSumAll.style.display = 'none';
        trSumAll.innerHTML =
            `<td style="text-align:left;font-weight:bold;">${dict.sumAllTabs || 'Сумма по всем вкладкам'}</td><td></td>` +
            `<td class="m"><span class="val-metal sum-all-tabs-metal">0</span></td>` +
            `<td class="c"><span class="val-crystal sum-all-tabs-crystal">0</span></td>` +
            `<td class="d"><span class="val-deut sum-all-tabs-deut">0</span></td>` +
            `<td class="p"><span class="sum-all-tabs-points">0</span></td>`;

        frag.appendChild(trSumAll);

        const trSumAllTotal = document.createElement('tr');

        trSumAllTotal.className = 'sum-all-tabs-total-row';
        trSumAllTotal.style.display = 'none';
        trSumAllTotal.innerHTML =
            `<td style="text-align:left;font-weight:bold;">${dict.totalInMetal || 'Всего в металле'}</td><td></td>` +
            `<td class="m" colspan="3"><span class="sum-all-tabs-total">0</span></td><td class="p"></td>`;

        frag.appendChild(trSumAllTotal);

        tableBody.appendChild(frag);

        attachLiveThousandsFormatting('input[data-id]');

        if (!tableBody.dataset.fleetInputBound) {
            tableBody.dataset.fleetInputBound = '1';

            tableBody.addEventListener('input', debounce(e => {
                if (e.target.matches('input[data-id]')) {
                    saveShipQuantities();
                    computeFleet();
                }
            }, 150));
        }
    }

    function computeFleet() {
        let fm = 0;
        let fc = 0;
        let fd = 0;
        let fp = 0;

        document.querySelectorAll('input[data-id]').forEach(inp => {
            const qty = parseNumberInput(sanitizeInput(inp.value));
            const row = inp.closest('tr');

            if (!row) {
                return;
            }

            const pointsCell = row.querySelector('.p');

            if (qty <= 0) {
                inp.value = '';
                pointsCell.textContent = '0';
                return;
            }

            const ship = SHIPS.find(s => s.id === inp.dataset.id);

            if (!ship) {
                return;
            }

            fm += qty * ship.metal;
            fc += qty * ship.crystal;
            fd += qty * ship.deut;

            inp.value = formatWithDotsRaw(qty);

            const pts = Math.round((ship.metal + ship.crystal + ship.deut) / 1000) * qty;

            pointsCell.textContent = formatNumberWithDots(pts);

            fp += pts;
        });

        updateResourceCell(document.getElementById('sumMetalF'), fm, 'val-metal');
        updateResourceCell(document.getElementById('sumCrystalF'), fc, 'val-crystal');
        updateResourceCell(document.getElementById('sumDeutF'), fd, 'val-deut');

        const sumP = document.querySelector('#shipsTable tbody tr.summary-row td.p');

        if (sumP) {
            sumP.textContent = formatNumberWithDots(fp);
        }

        const totalSpan = document.getElementById('sumTotalMetalF');

        if (totalSpan) {
            totalSpan.textContent = formatNumberWithDots(Math.round(convertToMetal(fm, fc, fd)));
        }

        updateBoxesNeeded();
        updateSumAllTabsRows();
    }

    function saveShipQuantities() {
        const qtyMap = {};

        document.querySelectorAll('input[data-id]').forEach(inp => {
            qtyMap[inp.dataset.id] = parseNumberInput(sanitizeInput(inp.value));
        });

        safeSet(KEYS.SHIP_QTY, JSON.stringify(qtyMap));
    }

    function attachLiveThousandsFormatting(selector) {
        document.querySelectorAll(selector).forEach(inp => {
            if (inp.thousandsBound) {
                return;
            }

            inp.thousandsBound = true;

            const formatAndSetCursor = function () {
                const raw = sanitizeInput(this.value);
                const selStart = this.selectionStart || 0;
                const leftDigits = raw.slice(0, selStart).replace(/[^0-9-]/g, '').length;
                const formatted = formatWithDotsRaw(raw);

                this.value = formatted;

                let pos = 0;
                let seen = 0;

                for (let i = 0; i < formatted.length; i++) {
                    if (/\d/.test(formatted[i])) {
                        seen++;
                    }

                    pos++;

                    if (seen >= leftDigits) {
                        break;
                    }
                }

                try {
                    this.setSelectionRange(pos, pos);
                } catch (e) {}
            };

            inp.addEventListener('input', formatAndSetCursor);

            inp.addEventListener('blur', function () {
                if (this.value === '' || this.value === '-') {
                    this.value = '';
                    return;
                }

                const num = parseNumberInput(this.value);

                this.value = num === 0 ? '' : formatWithDotsRaw(num);

                this.dispatchEvent(new Event('change', { bubbles: true }));
            });

            inp.addEventListener('keydown', function (e) {
                if (e.ctrlKey || e.metaKey) {
                    return;
                }

                const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Tab', 'Home', 'End'];

                if (allowed.includes(e.key) || (e.key >= '0' && e.key <= '9') || ['-', '.', ','].includes(e.key)) {
                    return;
                }

                e.preventDefault();
            });

            inp.addEventListener('paste', function (e) {
                e.preventDefault();

                const clipboard = e.clipboardData || window.clipboardData;
                const text = clipboard ? clipboard.getData('text') : '';
                const start = this.selectionStart || 0;
                const end = this.selectionEnd || start;
                const next = formatWithDotsRaw(this.value.slice(0, start) + sanitizeInput(text) + this.value.slice(end));

                this.value = next;

                const targetDigits = (this.value.slice(0, start) + sanitizeInput(text)).length;

                let pos = 0;
                let seen = 0;

                while (pos < next.length && seen < targetDigits) {
                    if (/\d/.test(next[pos])) {
                        seen++;
                    }

                    pos++;
                }

                try {
                    this.setSelectionRange(pos, pos);
                } catch (err) {}

                this.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });
    }

    function attachLvlInputHandlers() {
        document.querySelectorAll('.lvl-input').forEach(inp => {
            if (inp._lvlBound) {
                return;
            }

            inp._lvlBound = true;

            const restrict = el => {
                const val = sanitizeInput(el.value);

                if (val === '') {
                    return;
                }

                const num = Math.min(Number(val), CONFIG.MAX_LEVEL);

                el.value = String(num);
            };

            inp.addEventListener('input', () => restrict(inp));

            inp.addEventListener('blur', function () {
                restrict(inp);
                inp.dispatchEvent(new Event('change', { bubbles: true }));
            });

            inp.addEventListener('paste', function (e) {
                e.preventDefault();

                const clipboard = e.clipboardData || window.clipboardData;
                const num = Number(sanitizeInput(clipboard ? clipboard.getData('text') : ''));

                inp.value = String(Number.isNaN(num) || num < 0 ? 0 : Math.min(num, CONFIG.MAX_LEVEL));

                inp.dispatchEvent(new Event('input', { bubbles: true }));
                inp.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });
    }

    let inputsHandlersAttached = false;

    function attachInputsHandlers() {
        if (inputsHandlersAttached) {
            return;
        }

        inputsHandlersAttached = true;

        const setupTable = (tbodyId, recalcFn, storageKey) => {
            const tbody = document.getElementById(tbodyId);

            if (!tbody) {
                return;
            }

            const persist = () => {
                const key = typeof storageKey === 'function' ? storageKey() : storageKey;

                if (!key) {
                    return;
                }

                const rows = Array.from(tbody.querySelectorAll('tr')).map(tr => ({
                    from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
                    to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
                    planets: parseNumberInput(sanitizeInput(tr.querySelector(`input[data-type="${tbodyId.includes('Moon') ? 'moons' : 'planets'}"]`)?.value)) || 1
                }));

                safeSet(key, JSON.stringify(rows));
            };

            tbody.addEventListener('input', debounce(e => {
                if (e.target.matches('.lvl-input, .planet-input')) {
                    recalcFn();
                    persist();
                }
            }, 150));
        };

        setupTable('tbodyBuildings', recalcAllBuildings, KEYS.INPUTS_BUILD);
        setupTable('tbodyResearch', recalcAllResearch, KEYS.INPUTS_RESEARCH);
        setupTable('tbodyMoonBuildings', recalcAllMoonBuildings, KEYS.INPUTS_MOON_BUILD);
        setupTable('tbodyLfBuildings', recalcAllLfBuildings, () => `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`);
        setupTable('tbodyLfResearch', recalcAllLfResearch, () => `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`);

        const tmEl = document.getElementById('tmInput');

        if (tmEl) {
            tmEl.addEventListener('input', debounce(recalcAllResearch, 150));
            tmEl.addEventListener('blur', recalcAllResearch);
            tmEl.addEventListener('change', () => safeSet(KEYS.TM, tmEl.value));
        }

        const boxEl = document.getElementById('boxValue');

        if (boxEl) {
            const onBoxChange = debounce(() => {
                safeSet(KEYS.BOXES, JSON.stringify({ boxValue: parseNumberInput(sanitizeInput(boxEl.value)) }));
                updateBoxesNeeded();
            }, 150);

            boxEl.addEventListener('input', onBoxChange);
            boxEl.addEventListener('change', onBoxChange);
        }

        const sel = document.getElementById('lifeformSelect');

        if (sel) {
            sel.addEventListener('change', e => {
                BONUS_INPUT_IDS.forEach(id => {
                    const el = document.getElementById(id);

                    if (el) {
                        safeSet(`og_calc_${id}`, el.value);
                    }
                });

                persistLfInputs();
                saveLfTotals();

                currentLifeformRace = normalizeRace(e.target.value);

                safeSet(KEYS.LF_RACE, currentLifeformRace);

                updateLfBonusesVisibility(currentLifeformRace);
                buildRowsLfBuildings();
                buildRowsLfResearch();

                attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');

                restoreAllInputsAfterSwitch();
                recalcAllLfBuildings();
                recalcAllLfResearch();
                updateBoxesNeeded();
            });
        }

        document.querySelectorAll('#tabsLeft .tab-btn').forEach(btn => {
            btn.addEventListener('click', ev => {
                ev.stopPropagation();

                document.querySelectorAll('#tabsLeft .tab-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                    b.setAttribute('tabindex', '-1');
                });

                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                btn.setAttribute('tabindex', '0');

                document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));

                setActiveTab(btn.dataset.tab);
            });
        });

        document.querySelectorAll('.building-subtab-btn').forEach(btn => {
            btn.addEventListener('click', ev => {
                ev.stopPropagation();

                const tab = btn.dataset.buildingTab;

                document.querySelectorAll('.building-subtab-btn').forEach(b => b.classList.remove('active'));

                btn.classList.add('active');

                document.getElementById('planetBuildingsContent')?.classList.toggle('active', tab === 'planet');
                document.getElementById('moonBuildingsContent')?.classList.toggle('active', tab === 'moon');

                if (tab === 'moon') {
                    recalcAllMoonBuildings();
                } else {
                    recalcAllBuildings();
                }

                updateBoxesNeeded();

                safeSet('og_calc_active_building_tab', tab);
            });
        });

        document.querySelectorAll('.lf-subtab-btn').forEach(btn => {
            btn.addEventListener('click', ev => {
                ev.stopPropagation();

                const subtab = btn.dataset.subtab;

                document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));

                btn.classList.add('active');

                document.getElementById('lf-buildings')?.classList.toggle('active', subtab === 'lf-buildings');
                document.getElementById('lf-research')?.classList.toggle('active', subtab === 'lf-research');

                if (subtab === 'lf-research') {
                    recalcAllLfResearch();
                } else {
                    recalcAllLfBuildings();
                }

                safeSet('og_calc_active_lf_subtab_v1', subtab);
            });
        });

        const langToggle = document.getElementById('langToggle');
        const langMenu = document.getElementById('langDropdownMenu');

        if (langToggle && langMenu) {
            langMenu.innerHTML = '';

            Object.keys(LANGUAGES).forEach(code => {
                const option = document.createElement('div');

                option.className = 'lang-option';
                option.dataset.lang = code;

                const icon = makeIcon(`images/languages/${code}.png`, LANGUAGES[code], 18);

                icon.style.marginRight = '6px';

                const label = document.createElement('span');

                label.className = 'lang-text';
                label.textContent = LANGUAGES[code];

                option.append(icon, label);

                langMenu.appendChild(option);

                option.addEventListener('click', e => {
                    e.stopPropagation();
                    e.preventDefault();

                    applyLang(code);

                    setTimeout(() => {
                        langMenu.style.display = 'none';
                    }, 50);

                    setLangLabel(code);
                });
            });

            setLangLabel(currentLang());

            langToggle.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();

                langMenu.style.display = langMenu.style.display === 'flex' ? 'none' : 'flex';
            });

            document.addEventListener('click', e => {
                if (!langMenu.contains(e.target) && e.target !== langToggle) {
                    langMenu.style.display = 'none';
                }
            });
        }

        attachBonusInputHandlers();
    }

    function setLangLabel(code) {
        const el = document.getElementById('currentLang');

        if (!el) {
            return;
        }

        el.innerHTML = '';

        const icon = makeIcon(`images/languages/${code}.png`, LANGUAGES[code] || code.toUpperCase(), 18);

        icon.style.marginRight = '4px';

        const label = document.createElement('span');

        label.className = 'lang-text';
        label.textContent = LANGUAGES[code] || code.toUpperCase();

        el.append(icon, label);
    }

    function attachBonusInputHandlers() {
        BONUS_INPUT_IDS.forEach(id => {
            const el = document.getElementById(id);

            if (!el || el._bonusBound) {
                return;
            }

            const handler = debounce(() => {
                if (['humansLevel', 'mechasLevel', 'kaeleshLevel', 'runoLevel'].includes(id)) {
                    recalcAllLfResearch();
                } else if (id === 'megalithLevel' || id === 'mrcLevel') {
                    recalcAllLfBuildings();
                    recalcAllBuildings();
                }

                updateBoxesNeeded();

                safeSet(`og_calc_${id}`, String(parseNumberInput(el.value)));
            }, 150);

            el.addEventListener('input', handler);
            el.addEventListener('change', handler);
            el.addEventListener('blur', handler);

            el._bonusBound = true;
        });
    }

    function saveLfTotals() {
        safeSet(KEYS.LF_TOTALS, JSON.stringify(lfTotals));
    }

    function loadLfTotals() {
        const data = safeJsonParse(safeGet(KEYS.LF_TOTALS, 'null'), null);

        if (!data || typeof data !== 'object') {
            return;
        }

        RACES.forEach(race => {
            if (!data[race]) {
                return;
            }

            ['buildings', 'research'].forEach(kind => {
                if (data[race][kind]) {
                    lfTotals[race][kind] = ['m', 'c', 'd', 'p', 'total'].reduce((acc, f) => {
                        acc[f] = Number(data[race][kind][f]) || 0;
                        return acc;
                    }, {});
                }
            });
        });
    }

    function persistLfInputs() {
        const collect = selector => Array.from(document.querySelectorAll(selector)).map(tr => ({
            from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
            to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
            planets: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="planets"]')?.value)) || 1
        }));

        safeSet(`${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, JSON.stringify(collect('#tbodyLfBuildings tr')));
        safeSet(`${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, JSON.stringify(collect('#tbodyLfResearch tr')));
    }

    function saveInputRowsFromSelector(selector, key, planetsType = 'planets') {
        const data = Array.from(document.querySelectorAll(selector)).map(tr => ({
            from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
            to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
            planets: parseNumberInput(sanitizeInput(tr.querySelector(`input[data-type="${planetsType}"]`)?.value)) || 1
        }));

        safeSet(key, JSON.stringify(data));
    }

    function saveAllInputsBeforeSwitch() {
        saveInputRowsFromSelector('#tbodyBuildings tr', KEYS.INPUTS_BUILD, 'planets');
        saveInputRowsFromSelector('#tbodyResearch tr', KEYS.INPUTS_RESEARCH, 'planets');
        saveInputRowsFromSelector('#tbodyMoonBuildings tr', KEYS.INPUTS_MOON_BUILD, 'moons');
        saveInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, 'planets');
        saveInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, 'planets');

        saveShipQuantities();

        safeSet(KEYS.BOXES, JSON.stringify({ boxValue: parseNumberInput(sanitizeInput(document.getElementById('boxValue')?.value)) }));

        const tmInput = document.getElementById('tmInput')?.value;

        if (tmInput !== undefined) {
            safeSet(KEYS.TM, tmInput);
        }

        BONUS_INPUT_IDS.forEach(id => {
            const el = document.getElementById(id);

            if (el) {
                safeSet(`og_calc_${id}`, el.value);
            }
        });
    }

    function restoreInputRowsFromSelector(selector, key, planetsType = 'planets') {
        const data = safeJsonParse(safeGet(key, 'null'), null);

        if (!Array.isArray(data)) {
            return;
        }

        document.querySelectorAll(selector).forEach((tr, i) => {
            if (!data[i]) {
                return;
            }

            const fromInp = tr.querySelector('input[data-type="from"]');
            const toInp = tr.querySelector('input[data-type="to"]');

            if (fromInp) {
                fromInp.value = data[i].from ? String(Math.min(CONFIG.MAX_LEVEL, data[i].from)) : '';
            }

            if (toInp) {
                toInp.value = data[i].to ? String(Math.min(CONFIG.MAX_LEVEL, data[i].to)) : '';
            }

            const planetInp = tr.querySelector(`input[data-type="${planetsType}"]`);

            if (planetInp) {
                planetInp.value = data[i].planets ? formatWithDotsRaw(data[i].planets) : '1';
            }
        });
    }

    function restoreAllInputsAfterSwitch() {
        restoreInputRowsFromSelector('#tbodyBuildings tr', KEYS.INPUTS_BUILD, 'planets');
        restoreInputRowsFromSelector('#tbodyResearch tr', KEYS.INPUTS_RESEARCH, 'planets');
        restoreInputRowsFromSelector('#tbodyMoonBuildings tr', KEYS.INPUTS_MOON_BUILD, 'moons');
        restoreInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, 'planets');
        restoreInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, 'planets');

        const shipQty = safeJsonParse(safeGet(KEYS.SHIP_QTY, '{}'), {});

        if (shipQty) {
            document.querySelectorAll('input[data-id]').forEach(inp => {
                if (shipQty[inp.dataset.id]) {
                    inp.value = formatWithDotsRaw(shipQty[inp.dataset.id]);
                }
            });
        }

        const boxes = safeJsonParse(safeGet(KEYS.BOXES, '{}'), {});

        if (boxes.boxValue) {
            document.getElementById('boxValue').value = formatWithDotsRaw(boxes.boxValue);
        }

        const tmSaved = safeGet(KEYS.TM, null);

        if (tmSaved) {
            document.getElementById('tmInput').value = tmSaved;
        }

        BONUS_INPUT_IDS.forEach(id => {
            const saved = safeGet(`og_calc_${id}`, null);

            if (saved !== null && document.getElementById(id)) {
                document.getElementById(id).value = String(parseNumberInput(saved));
            }
        });
    }

    function applyLang(lang, skipRebuild = false) {
        if (!lang || !LANGUAGES[lang]) {
            return;
        }

        if (currentLang() === lang && !skipRebuild) {
            return;
        }

        safeSet(KEYS.LANG, lang);

        if (!skipRebuild) {
            saveAllInputsBeforeSwitch();
        }

        const dict = getDict();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');

            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');

            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        document.querySelectorAll('.nav-btn[data-view]').forEach(btn => {
            const key = btn.dataset.view === 'costs' ? 'tabBuildings' : btn.dataset.view === 'expeditions' ? 'tabExpeditions' : '';

            if (key && dict[key]) {
                btn.textContent = dict[key];
            }
        });

        const lfSelect = document.getElementById('lifeformSelect');

        if (lfSelect) {
            lfSelect.querySelectorAll('option').forEach(opt => {
                if (dict[opt.value]) {
                    opt.textContent = dict[opt.value];
                }
            });

            if (dict.lfSelectLabel) {
                lfSelect.setAttribute('aria-label', dict.lfSelectLabel);
            }
        }

        if (skipRebuild) {
            return;
        }

        const activeTab = getActiveTab();
        const activeLfSubtab = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';

        buildRowsBuildings();
        buildRowsResearch();
        buildRowsMoonBuildings();
        renderTable();
        buildRowsLfBuildings();
        buildRowsLfResearch();

        restoreAllInputsAfterSwitch();

        setActiveTab(activeTab);

        if (activeTab === 'lifeforms') {
            document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.toggle('active', b.dataset.subtab === activeLfSubtab));

            document.getElementById('lf-buildings')?.classList.toggle('active', activeLfSubtab === 'lf-buildings');
            document.getElementById('lf-research')?.classList.toggle('active', activeLfSubtab === 'lf-research');
        }

        attachLiveThousandsFormatting('#boxValue, input[data-id]');
        attachInputsHandlers();

        recalcAll();

        updateLfBonusesVisibility(currentLifeformRace);

        if (typeof window.updateExpeditionsLang === 'function') {
            window.updateExpeditionsLang();
        }
    }

    const getActiveTab = () => document.querySelector('.tab-btn.active')?.dataset.tab || 'buildings';

    function setActiveTab(tab) {
        calcCache.clear();

        document.querySelectorAll('.tab-btn').forEach(b => {
            const isActive = b.dataset.tab === tab;

            b.classList.toggle('active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
            b.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        ['buildings', 'research', 'fleet', 'lifeforms'].forEach(t => {
            const elMap = {
                buildings: 'tabBuildings',
                research: 'tabResearch',
                fleet: 'tabFleet',
                lifeforms: 'tabLifeforms'
            };

            document.getElementById(elMap[t])?.classList.toggle('active', t === tab);
        });

        if (tab === 'fleet') {
            renderTable();
            computeFleet();
        } else if (tab === 'buildings') {
            recalcAllBuildings();
        } else if (tab === 'research') {
            recalcAllResearch();
        } else if (tab === 'lifeforms') {
            persistLfInputs();

            let activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';

            if (!document.querySelector(`.lf-subtab-btn[data-subtab="${activeSub}"]`)) {
                activeSub = 'lf-buildings';
            }

            document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.toggle('active', b.dataset.subtab === activeSub));

            document.getElementById('lf-buildings')?.classList.toggle('active', activeSub === 'lf-buildings');
            document.getElementById('lf-research')?.classList.toggle('active', activeSub === 'lf-research');

            buildRowsLfBuildings();
            buildRowsLfResearch();

            restoreAllInputsAfterSwitch();

            attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');

            recalcAllLfBuildings();
            recalcAllLfResearch();
        }

        updateBoxesNeeded();

        safeSet(KEYS.ACTIVE_TAB, tab);
    }

    function switchView(newView) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === newView));

        const tableWrapper = document.getElementById('tableWrapper');
        const expWrapper = document.getElementById('expeditionsWrapper');

        if (tableWrapper) {
            tableWrapper.style.display = newView === 'costs' ? 'block' : 'none';
        }

        if (expWrapper) {
            expWrapper.style.display = newView === 'expeditions' ? 'block' : 'none';
        }

        if (newView === 'expeditions') {
            window.panZoomExpeditions?.applyTransform();
        } else {
            window.panZoomMain?.applyTransform();
        }

        safeSet('og_calc_active_view', newView);

        updateBackgroundVideo(newView);
    }

    function getSumAllTabsMetalValue() {
        const ids = ['sumTotalMetalB', 'sumTotalMetalMoon', 'sumTotalMetalR', 'sumTotalMetalF'];

        let total = ids.reduce((acc, id) => acc + (parseNumberInput(document.getElementById(id)?.textContent) || 0), 0);

        Object.values(lfTotals).forEach(race => {
            total += race.buildings?.total || 0;
            total += race.research?.total || 0;
        });

        return total;
    }

    function getCurrentTotalMetalValue() {
        const active = getActiveTab();

        if (active === 'buildings') {
            const isMoonActive = document.querySelector('.building-subtab-btn.active')?.dataset.buildingTab === 'moon';
            const id = isMoonActive ? 'sumTotalMetalMoon' : 'sumTotalMetalB';

            return parseNumberInput(document.getElementById(id)?.textContent) || 0;
        }

        if (active === 'research') {
            return parseNumberInput(document.getElementById('sumTotalMetalR')?.textContent) || 0;
        }

        if (active === 'fleet') {
            return parseNumberInput(document.getElementById('sumTotalMetalF')?.textContent) || 0;
        }

        if (active === 'lifeforms') {
            const sub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';

            return parseNumberInput(document.getElementById(sub === 'lf-buildings' ? 'sumTotalMetalLfB' : 'sumTotalMetalLfR')?.textContent) || 0;
        }

        return 0;
    }

    function updateSumAllTabsRows() {
        const show = isSumAllTabsMode;

        document.querySelectorAll('.sum-all-tabs-row, .sum-all-tabs-total-row').forEach(r => {
            r.style.display = show ? '' : 'none';
        });

        document.querySelectorAll('.regular-total-row').forEach(r => {
            r.style.display = show ? 'none' : '';
        });

        if (!show) {
            return;
        }

        const totals = { m: 0, c: 0, d: 0, p: 0 };

        [
            ['sumMetalB', 'sumCrystalB', 'sumDeutB', 'sumPointsB'],
            ['sumMetalMoon', 'sumCrystalMoon', 'sumDeutMoon', 'sumPointsMoon'],
            ['sumMetalR', 'sumCrystalR', 'sumDeutR', 'sumPointsR'],
            ['sumMetalF', 'sumCrystalF', 'sumDeutF', null]
        ].forEach(([mId, cId, dId, pId]) => {
            totals.m += parseNumberInput(document.getElementById(mId)?.textContent) || 0;
            totals.c += parseNumberInput(document.getElementById(cId)?.textContent) || 0;
            totals.d += parseNumberInput(document.getElementById(dId)?.textContent) || 0;

            if (pId) {
                totals.p += parseNumberInput(document.getElementById(pId)?.textContent) || 0;
            }
        });

        const fleetP = document.querySelector('#shipsTable tbody tr.summary-row td.p');

        if (fleetP) {
            totals.p += parseNumberInput(fleetP.textContent) || 0;
        }

        Object.values(lfTotals).forEach(race => {
            ['buildings', 'research'].forEach(kind => {
                if (!race[kind]) {
                    return;
                }

                totals.m += race[kind].m || 0;
                totals.c += race[kind].c || 0;
                totals.d += race[kind].d || 0;
                totals.p += race[kind].p || 0;
            });
        });

        const totalMetal = Math.round(convertToMetal(totals.m, totals.c, totals.d));

        document.querySelectorAll('.sum-all-tabs-metal').forEach(el => el.textContent = formatNumberWithDots(totals.m));
        document.querySelectorAll('.sum-all-tabs-crystal').forEach(el => el.textContent = formatNumberWithDots(totals.c));
        document.querySelectorAll('.sum-all-tabs-deut').forEach(el => el.textContent = formatNumberWithDots(totals.d));
        document.querySelectorAll('.sum-all-tabs-total').forEach(el => el.textContent = formatNumberWithDots(totalMetal));
        document.querySelectorAll('.sum-all-tabs-points').forEach(el => el.textContent = formatNumberWithDots(totals.p));
    }

    function updateBoxesNeeded() {
        const boxesNeededEl = document.getElementById('boxesNeeded');
        const boxValue = parseNumberInput(sanitizeInput(document.getElementById('boxValue')?.value || ''));

        if (!boxValue || boxValue <= 0) {
            if (boxesNeededEl) {
                boxesNeededEl.textContent = '—';
            }

            const boxesCost = document.getElementById('boxesCostTL');

            if (boxesCost) {
                boxesCost.innerHTML = '—';
            }

            const leftover = document.getElementById('leftoverTmValue');

            if (leftover) {
                leftover.textContent = '—';
            }

            return;
        }

        const targetMetal = isSumAllTabsMode ? getSumAllTabsMetalValue() : getCurrentTotalMetalValue();

        if (boxesNeededEl) {
            boxesNeededEl.textContent = formatWithDotsRaw(Math.ceil(targetMetal / boxValue));
        }

        updateBoxesCostTL(targetMetal);
    }

    function updateBoxesCostTL(targetMetal = null) {
        const boxesCostEl = document.getElementById('boxesCostTL');

        if (!boxesCostEl) {
            return;
        }

        const leftoverEl = document.getElementById('leftoverTmValue');
        const currencyEl = document.getElementById('currencyValue');
        const boxValue = parseNumberInput(sanitizeInput(document.getElementById('boxValue')?.value || ''));

        const setEmpty = txt => {
            boxesCostEl.textContent = txt;

            if (leftoverEl) {
                leftoverEl.textContent = txt;
            }

            if (currencyEl) {
                currencyEl.textContent = txt === '—' ? '0' : txt;
            }
        };

        if (boxValue <= 0) {
            return setEmpty('—');
        }

        if (targetMetal === null) {
            targetMetal = isSumAllTabsMode ? getSumAllTabsMetalValue() : getCurrentTotalMetalValue();
        }

        if (!Number.isFinite(targetMetal) || targetMetal <= 0) {
            return setEmpty('0');
        }

        const neededBoxes = Math.ceil(targetMetal / boxValue);

        if (neededBoxes > 1e9) {
            return setEmpty('—');
        }

        const pack = CONFIG.TM_PACKS[0];

        if (!pack || pack.tm <= 0 || pack.priceTRY <= 0) {
            return setEmpty('—');
        }

        const packsCount = Math.max(1, Math.ceil(neededBoxes * CONFIG.TM_PER_BOX / pack.tm));
        const totalTRY = packsCount * pack.priceTRY;
        const leftoverTM = packsCount * pack.tm - neededBoxes * CONFIG.TM_PER_BOX;
        const baseCurrency = safeGet(KEYS.BASE_CURRENCY, 'TRY');
        const targetCurrency = safeGet(KEYS.CURRENCY, 'BYN');
        const amountInBYN = totalTRY / CONFIG.TRY_TO_BYN_RATE;
        const baseRate = CONFIG.CURRENCY_RATES[baseCurrency] || 1;
        const targetRate = CONFIG.CURRENCY_RATES[targetCurrency] || 1;

        boxesCostEl.textContent = formatNumberWithDots(Math.round(amountInBYN * baseRate));

        if (currencyEl) {
            currencyEl.textContent = formatNumberWithDots(Math.round(amountInBYN * targetRate));
        }

        if (leftoverEl) {
            leftoverEl.textContent = leftoverTM > 0 ? formatWithDotsRaw(leftoverTM) : '0';
        }
    }

    function updateLfBonusesVisibility(race) {
        const box = document.getElementById('lfBonuses');

        if (!box) {
            return;
        }

        const current = {};

        BONUS_INPUT_IDS.forEach(id => {
            const el = document.getElementById(id);

            if (el && el.value !== '') {
                current[id] = sanitizeInput(el.value);
            }
        });

        const fields = {
            rocktal: [['lfMegalith', 'megalithLevel'], ['lfMineralCenter', 'mrcLevel'], ['lfRunoTech', 'runoLevel']],
            humans: [['lf_b_1003', 'humansLevel']],
            mechas: [['lf_b_3003', 'mechasLevel']],
            kaelesh: [['lf_b_4003', 'kaeleshLevel']]
        }[race] || [];

        const dict = getDict();

        box.innerHTML = '';

        const frag = document.createDocumentFragment();

        fields.forEach(([labelKey, inputId]) => {
            const fieldDiv = document.createElement('div');

            fieldDiv.className = 'field';

            const label = document.createElement('label');

            label.setAttribute('for', inputId);
            label.textContent = dict[labelKey] || labelKey;

            const input = document.createElement('input');

            input.id = inputId;
            input.type = 'text';
            input.inputMode = 'numeric';
            input.min = '0';
            input.max = '100';
            input.placeholder = '0';

            const value = current[inputId] ?? safeGet(`og_calc_${inputId}`, null);

            if (value !== null && value !== '') {
                input.value = formatWithDotsRaw(parseNumberInput(value));
            }

            fieldDiv.append(label, input);

            frag.appendChild(fieldDiv);
        });

        box.appendChild(frag);

        attachBonusInputHandlers();
    }

    class PanZoomController {
        constructor(wrapperId, handleId, storageKey) {
            this.wrapper = document.getElementById(wrapperId);
            this.handle = document.getElementById(handleId);
            this.storageKey = storageKey;

            if (!this.wrapper || !this.handle) {
                return;
            }

            this.state = { x: 0, y: 0, scale: 1 };
            this.isDragging = false;
            this.minScale = 0.3;
            this.maxScale = 3.5;
            this.padding = 60;

            this.loadState();
            this.applyTransform();
            this.bindDrag();
        }

        loadState() {
            const data = safeJsonParse(safeGet(this.storageKey, 'null'), null);

            if (data) {
                this.state = {
                    x: Number(data.x) || 0,
                    y: Number(data.y) || 0,
                    scale: Math.max(this.minScale, Math.min(this.maxScale, Number(data.scale) || 1))
                };
            }
        }

        saveState() {
            safeSet(this.storageKey, JSON.stringify(this.state));
        }

        applyTransform() {
            if (!this.wrapper) {
                return;
            }

            const x = Math.round(this.state.x);
            const y = Math.round(this.state.y);

            this.wrapper.style.transformOrigin = '0 0';
            this.wrapper.style.transform = `translate(${x}px, ${y}px) scale(${this.state.scale})`;
        }

        clampPosition() {
            if (!this.wrapper) {
                return;
            }

            const rect = this.wrapper.getBoundingClientRect();
            const s = this.state.scale;
            const baseW = rect.width / s;
            const baseH = rect.height / s;
            const minX = this.padding - baseW;
            const maxX = window.innerWidth - this.padding;
            const minY = this.padding - baseH;
            const maxY = window.innerHeight - this.padding;

            this.state.x = Math.max(minX, Math.min(maxX, this.state.x));
            this.state.y = Math.max(minY, Math.min(maxY, this.state.y));
        }

        zoom(factor, center = null) {
            if (!this.wrapper) {
                return;
            }

            const oldScale = this.state.scale;
            const newScale = Math.max(this.minScale, Math.min(this.maxScale, oldScale * factor));

            if (newScale === oldScale) {
                return;
            }

            const cx = center ? center.x : window.innerWidth / 2;
            const cy = center ? center.y : window.innerHeight / 2;

            this.state.x = cx - (cx - this.state.x) * (newScale / oldScale);
            this.state.y = cy - (cy - this.state.y) * (newScale / oldScale);
            this.state.scale = newScale;

            this.applyTransform();

            requestAnimationFrame(() => {
                this.clampPosition();
                this.applyTransform();
                this.saveState();
            });
        }

        reset() {
            if (!this.wrapper) {
                return;
            }

            this.state = { x: 0, y: 0, scale: 1 };

            this.applyTransform();

            requestAnimationFrame(() => {
                const rect = this.wrapper.getBoundingClientRect();

                this.state.x = window.innerWidth / 2 - (rect.left + rect.width / 2);
                this.state.y = window.innerHeight / 2 - (rect.top + rect.height / 2);

                this.clampPosition();
                this.applyTransform();
                this.saveState();
            });
        }

        bindDrag() {
            if (!this.wrapper || !this.handle) {
                return;
            }

            this.handle.style.touchAction = 'none';
            this.handle.style.cursor = 'grab';

            this._onPointerDown = e => {
                this.isDragging = true;
                this.startPointer = { x: e.clientX, y: e.clientY };
                this.startState = { ...this.state };

                this.handle.style.cursor = 'grabbing';
                this.wrapper.style.zIndex = '2000';
                this.wrapper.style.willChange = 'transform';

                try {
                    this.handle.setPointerCapture(e.pointerId);
                } catch (e2) {}
            };

            this._onPointerMove = e => {
                if (!this.isDragging) {
                    return;
                }

                this.state.x = this.startState.x + (e.clientX - this.startPointer.x);
                this.state.y = this.startState.y + (e.clientY - this.startPointer.y);

                this.applyTransform();
            };

            this._stopDrag = e => {
                if (!this.isDragging) {
                    return;
                }

                this.isDragging = false;

                this.handle.style.cursor = 'grab';
                this.wrapper.style.zIndex = '1000';
                this.wrapper.style.willChange = 'auto';

                this.clampPosition();
                this.applyTransform();
                this.saveState();

                try {
                    this.handle.releasePointerCapture(e.pointerId);
                } catch (e2) {}
            };

            this.handle.addEventListener('pointerdown', this._onPointerDown);
            document.addEventListener('pointermove', this._onPointerMove);
            document.addEventListener('pointerup', this._stopDrag);
            document.addEventListener('pointercancel', this._stopDrag);
        }
    }

    let panZoomMain = null;
    let panZoomExpeditions = null;

    function initPanZoom() {
        if (!panZoomMain) {
            panZoomMain = new PanZoomController('tableWrapper', 'dragHandle', KEYS.TRANSFORM);
        }

        if (!panZoomExpeditions) {
            panZoomExpeditions = new PanZoomController('expeditionsWrapper', 'dragHandleExpeditions', 'og_calc_expeditions_transform');
        }

        window.panZoomMain = panZoomMain;
        window.panZoomExpeditions = panZoomExpeditions;
    }

    function initZoomControls() {
        const getActiveController = () => {
            const expWrapper = document.getElementById('expeditionsWrapper');

            return expWrapper && expWrapper.style.display !== 'none'
                ? window.panZoomExpeditions
                : window.panZoomMain;
        };

        document.getElementById('globalZoomIn')?.addEventListener('click', () => getActiveController()?.zoom(1.15));
        document.getElementById('globalZoomOut')?.addEventListener('click', () => getActiveController()?.zoom(1 / 1.15));

        document.getElementById('globalZoomReset')?.addEventListener('click', () => {
            const expWrapper = document.getElementById('expeditionsWrapper');
            const isExp = expWrapper && expWrapper.style.display !== 'none';

            if (isExp) {
                ['tech_hyper-level', 'percent-resources', 'percent-ships', 'class-bonus-collector', 'class-bonus-discoverer', 'dark-matter-discovery-bonus'].forEach(id => {
                    const el = document.getElementById(id);

                    if (el) {
                        el.value = '0';
                    }
                });

                const pClass = document.getElementById('player-class');
                const uSpeed = document.getElementById('universe-speed');
                const rBooster = document.getElementById('resource-discovery-booster');
                const hTop = document.getElementById('highTop');

                if (pClass) {
                    pClass.selectedIndex = 0;
                }

                if (uSpeed) {
                    uSpeed.selectedIndex = 0;
                }

                if (rBooster) {
                    rBooster.selectedIndex = 0;
                }

                if (hTop) {
                    hTop.selectedIndex = 0;
                }

                document.querySelectorAll('#lf-ships-bonuses .lf-bonus-input').forEach(i => i.value = '0');

                if (typeof window.clearFleet === 'function') {
                    window.clearFleet();
                }

                if (typeof window.compute === 'function') {
                    window.compute();
                }
            } else {
                fullResetToZero();
            }

            getActiveController()?.reset();
        });
    }

    function fullResetToZero() {
        const lfSelect = document.getElementById('lifeformSelect');
        const originalRace = normalizeRace(lfSelect ? lfSelect.value : 'humans');
        const preservedKeys = [KEYS.TRANSFORM, KEYS.LANG];

        Object.values(KEYS).forEach(k => {
            if (!preservedKeys.includes(k)) {
                localStorage.removeItem(k);
            }
        });

        ['og_calc_active_view', 'og_calc_active_building_tab', 'og_calc_active_lf_subtab_v1', 'options_expeditions', 'og_expeditions_accordion_expanded', 'og_calc_expeditions_transform'].forEach(k => {
            localStorage.removeItem(k);
        });

        Object.keys(localStorage)
            .filter(k => k.startsWith('og_calc_lf_inputs') || BONUS_INPUT_IDS.some(id => k === `og_calc_${id}`))
            .forEach(k => localStorage.removeItem(k));

        isSumAllTabsMode = false;

        const checkbox = document.getElementById('sumAllTabsCheckbox');

        if (checkbox) {
            checkbox.checked = false;
        }

        lfTotals = {
            humans: emptyRaceTotals(),
            rocktal: emptyRaceTotals(),
            mechas: emptyRaceTotals(),
            kaelesh: emptyRaceTotals()
        };

        const boxValueEl = document.getElementById('boxValue');

        if (boxValueEl) {
            boxValueEl.value = '';
        }

        const tmInputEl = document.getElementById('tmInput');

        if (tmInputEl) {
            tmInputEl.value = '';
        }

        ['#tbodyBuildings', '#tbodyResearch', '#tbodyMoonBuildings'].forEach(sel => {
            document.querySelectorAll(`${sel} input[data-type="from"], ${sel} input[data-type="to"]`).forEach(inp => {
                inp.value = '';
            });

            document.querySelectorAll(`${sel} input[data-type="planets"], ${sel} input[data-type="moons"]`).forEach(inp => {
                inp.value = '1';
            });
        });

        RACES.forEach(race => {
            currentLifeformRace = race;

            buildRowsLfBuildings();
            buildRowsLfResearch();

            document.querySelectorAll('#tbodyLfBuildings input[data-type="from"], #tbodyLfBuildings input[data-type="to"], #tbodyLfResearch input[data-type="from"], #tbodyLfResearch input[data-type="to"]')
                .forEach(inp => {
                    inp.value = '';
                });

            document.querySelectorAll('#tbodyLfBuildings input[data-type="planets"], #tbodyLfResearch input[data-type="planets"]')
                .forEach(inp => {
                    inp.value = '1';
                });

            saveInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${race}`, 'planets');
            saveInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${race}`, 'planets');

            recalcAllLfBuildings();
            recalcAllLfResearch();
        });

        currentLifeformRace = originalRace;

        if (lfSelect) {
            lfSelect.value = originalRace;
        }

        safeSet(KEYS.LF_RACE, originalRace);
        safeSet(KEYS.BASE_CURRENCY, 'TRY');
        safeSet(KEYS.CURRENCY, 'BYN');

        const baseCurrencySelector = document.getElementById('baseCurrencySelector');

        if (baseCurrencySelector) {
            baseCurrencySelector.value = 'TRY';
        }

        const currencySelector = document.getElementById('currencySelector');

        if (currencySelector) {
            currencySelector.value = 'BYN';
        }

        buildRowsBuildings();
        buildRowsResearch();
        buildRowsMoonBuildings();
        buildRowsLfBuildings();
        buildRowsLfResearch();

        renderTable();
        recalcAll();

        updateLfBonusesVisibility(currentLifeformRace);

        ['sumPointsB', 'sumPointsR', 'sumPointsLfB', 'sumPointsLfR'].forEach(id => {
            const el = document.getElementById(id);

            if (el) {
                el.textContent = '0';
            }
        });

        const boxesNeeded = document.getElementById('boxesNeeded');

        if (boxesNeeded) {
            boxesNeeded.textContent = '—';
        }

        const boxesCost = document.getElementById('boxesCostTL');

        if (boxesCost) {
            boxesCost.innerHTML = '—';
        }

        const leftover = document.getElementById('leftoverTmValue');

        if (leftover) {
            leftover.textContent = '—';
        }

        const currencyValue = document.getElementById('currencyValue');

        if (currencyValue) {
            currencyValue.textContent = '0';
        }

        if (typeof window.clearFleet === 'function') {
            window.clearFleet();
        }

        if (typeof window.updateExpeditionsLang === 'function') {
            window.updateExpeditionsLang();
        }

        updateSumAllTabsRows();
        updateBoxesNeeded();
        saveLfTotals();

        switchView('costs');
        setActiveTab('buildings');
    }

    function updateBackgroundVideo(view) {
        const bgVideo = document.getElementById('bgVideo');

        if (!bgVideo) {
            return;
        }

        const targetSrc = view === 'expeditions' ? 'images/background2.webm' : 'images/background.webm';

        if (bgVideo.currentSrc && bgVideo.currentSrc.includes(targetSrc)) {
            if (bgVideo.paused) {
                bgVideo.play().catch(() => {});
            }

            return;
        }

        bgVideo.pause();
        bgVideo.src = targetSrc;
        bgVideo.load();
        bgVideo.play().catch(() => {});
    }

    function parseSettingsNumber(v, fallback = 0) {
        if (v === null || v === undefined || v === '') {
            return fallback;
        }

        let str = String(v).trim();

        if (str === '') {
            return fallback;
        }

        const hasComma = str.includes(',');
        const hasDot = str.includes('.');

        let cleaned;

        if (hasComma && hasDot) {
            cleaned = str.lastIndexOf(',') > str.lastIndexOf('.')
                ? str.replace(/\./g, '').replace(',', '.')
                : str.replace(/,/g, '');
        } else if (hasComma) {
            cleaned = str.replace(/,/g, '.');
        } else if (hasDot) {
            const dotCount = (str.match(/\./g) || []).length;

            if (dotCount > 1) {
                cleaned = str.replace(/\./g, '');
            } else {
                const afterDot = str.slice(str.indexOf('.') + 1);

                cleaned = (afterDot.length >= 3 && /^\d+$/.test(afterDot)) ? str.replace(/\./g, '') : str;
            }
        } else {
            cleaned = str;
        }

        const n = parseFloat(cleaned);

        return Number.isFinite(n) && n > 0 ? n : fallback;
    }

    function loadSettings() {
        const data = safeJsonParse(safeGet(SETTINGS_KEY, 'null'), null);

        if (!data) {
            currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
            return;
        }

        currentSettings = {
            tmPerBox: parseSettingsNumber(data.tmPerBox, DEFAULT_SETTINGS.tmPerBox),
            tmPackSize: parseSettingsNumber(data.tmPackSize, DEFAULT_SETTINGS.tmPackSize),
            packPriceTRY: parseSettingsNumber(data.packPriceTRY, DEFAULT_SETTINGS.packPriceTRY),
            rates: {
                BYN: 1,
                RUB: parseSettingsNumber(data.rates?.RUB, DEFAULT_SETTINGS.rates.RUB),
                USD: parseSettingsNumber(data.rates?.USD, DEFAULT_SETTINGS.rates.USD),
                EUR: parseSettingsNumber(data.rates?.EUR, DEFAULT_SETTINGS.rates.EUR),
                TRY: parseSettingsNumber(data.rates?.TRY, DEFAULT_SETTINGS.rates.TRY)
            }
        };
    }

    function saveSettings() {
        safeSet(SETTINGS_KEY, JSON.stringify(currentSettings));
    }

    function applySettingsToConfig() {
        CONFIG.TM_PER_BOX = Math.round(currentSettings.tmPerBox);
        CONFIG.TRY_TO_BYN_RATE = currentSettings.rates.TRY || 16.01;
        CONFIG.CURRENCY_RATES = { BYN: 1, ...currentSettings.rates };

        if (CONFIG.TM_PACKS[0]) {
            CONFIG.TM_PACKS[0].tm = Math.round(currentSettings.tmPackSize);
            CONFIG.TM_PACKS[0].priceTRY = Math.round(currentSettings.packPriceTRY);
        }
    }

    function populateSettingsInputs() {
        const setVal = (id, val, isDecimal = false) => {
            const el = document.getElementById(id);

            if (!el) {
                return;
            }

            if (id === 'cfgRateBYN') {
                el.value = (val !== undefined && val !== null) ? String(val) : '';
                return;
            }

            const num = parseSettingsNumber(val, 0);

            if (num <= 0) {
                el.value = '';
                return;
            }

            el.value = isDecimal ? String(num) : formatNumberWithDots(Math.round(num));
        };

        setVal('cfgTmPerBox', currentSettings.tmPerBox);
        setVal('cfgTmPackSize', currentSettings.tmPackSize);
        setVal('cfgPackPriceTRY', currentSettings.packPriceTRY);
        setVal('cfgRateBYN', 1, true);
        setVal('cfgRateRUB', currentSettings.rates.RUB, true);
        setVal('cfgRateUSD', currentSettings.rates.USD, true);
        setVal('cfgRateEUR', currentSettings.rates.EUR, true);
        setVal('cfgRateTRY', currentSettings.rates.TRY, true);
    }

    function readSettingsFromInputs() {
        currentSettings.tmPerBox = parseSettingsNumber(document.getElementById('cfgTmPerBox')?.value, DEFAULT_SETTINGS.tmPerBox);
        currentSettings.tmPackSize = parseSettingsNumber(document.getElementById('cfgTmPackSize')?.value, DEFAULT_SETTINGS.tmPackSize);
        currentSettings.packPriceTRY = parseSettingsNumber(document.getElementById('cfgPackPriceTRY')?.value, DEFAULT_SETTINGS.packPriceTRY);
        currentSettings.rates.RUB = parseSettingsNumber(document.getElementById('cfgRateRUB')?.value, DEFAULT_SETTINGS.rates.RUB);
        currentSettings.rates.USD = parseSettingsNumber(document.getElementById('cfgRateUSD')?.value, DEFAULT_SETTINGS.rates.USD);
        currentSettings.rates.EUR = parseSettingsNumber(document.getElementById('cfgRateEUR')?.value, DEFAULT_SETTINGS.rates.EUR);
        currentSettings.rates.TRY = parseSettingsNumber(document.getElementById('cfgRateTRY')?.value, DEFAULT_SETTINGS.rates.TRY);
        currentSettings.rates.BYN = 1;
    }

    function openSettingsModal() {
        const modal = document.getElementById('settingsModal');

        if (!modal) {
            return;
        }

        populateSettingsInputs();

        modal.classList.add('open');

        document.getElementById('settingsToggle')?.classList.add('active');
    }

    function closeSettingsModal() {
        const modal = document.getElementById('settingsModal');

        if (!modal) {
            return;
        }

        modal.classList.remove('open');

        document.getElementById('settingsToggle')?.classList.remove('active');
    }

    function saveAndApplySettings() {
        readSettingsFromInputs();
        saveSettings();
        applySettingsToConfig();
        updateBoxesCostTL();
        updateBoxesNeeded();
        closeSettingsModal();
    }

    function resetSettingsToDefaults() {
        currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
        populateSettingsInputs();
    }

    function initSettingsPanel() {
        const toggleBtn = document.getElementById('settingsToggle');
        const modal = document.getElementById('settingsModal');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', e => {
                e.stopPropagation();

                if (modal?.classList.contains('open')) {
                    closeSettingsModal();
                } else {
                    openSettingsModal();
                }
            });
        }

        document.getElementById('settingsModalClose')?.addEventListener('click', closeSettingsModal);

        modal?.querySelector('.settings-modal__backdrop')?.addEventListener('click', closeSettingsModal);

        document.getElementById('settingsSave')?.addEventListener('click', saveAndApplySettings);
        document.getElementById('settingsReset')?.addEventListener('click', resetSettingsToDefaults);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal?.classList.contains('open')) {
                closeSettingsModal();
            }
        });

        loadSettings();
        applySettingsToConfig();
    }

    function restoreFromStorage() {
        RACES.forEach(race => {
            migrateKey(`og_calc_lf_inputs_build_v1_${race}`, `${KEYS.LF_INPUTS_BUILD}_${race}`);
            migrateKey(`og_calc_inputs_research_v1_${race}`, `${KEYS.LF_INPUTS_RESEARCH}_${race}`);
        });

        loadLfTotals();

        currentLifeformRace = normalizeRace(safeGet(KEYS.LF_RACE, 'humans'));

        buildRowsBuildings();
        buildRowsResearch();
        buildRowsMoonBuildings();
        buildRowsLfBuildings();
        buildRowsLfResearch();

        renderTable();

        restoreInputRowsFromSelector('#tbodyBuildings tr', KEYS.INPUTS_BUILD, 'planets');
        restoreInputRowsFromSelector('#tbodyResearch tr', KEYS.INPUTS_RESEARCH, 'planets');
        restoreInputRowsFromSelector('#tbodyMoonBuildings tr', KEYS.INPUTS_MOON_BUILD, 'moons');
        restoreInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, 'planets');
        restoreInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, 'planets');

        const lfSel = document.getElementById('lifeformSelect');

        if (lfSel) {
            lfSel.value = currentLifeformRace;
        }

        updateLfBonusesVisibility(currentLifeformRace);

        const boxes = safeJsonParse(safeGet(KEYS.BOXES, '{}'), {});

        if (boxes && boxes.boxValue) {
            document.getElementById('boxValue').value = formatWithDotsRaw(boxes.boxValue);
        }

        const tmSaved = safeGet(KEYS.TM, null);

        if (tmSaved) {
            document.getElementById('tmInput').value = tmSaved;
        }

        const shipQty = safeJsonParse(safeGet(KEYS.SHIP_QTY, '{}'), {});

        if (shipQty) {
            document.querySelectorAll('input[data-id]').forEach(inp => {
                if (shipQty[inp.dataset.id]) {
                    inp.value = formatWithDotsRaw(shipQty[inp.dataset.id]);
                }
            });
        }

        BONUS_INPUT_IDS.forEach(id => {
            const saved = safeGet(`og_calc_${id}`, null);

            if (saved !== null && document.getElementById(id)) {
                document.getElementById(id).value = String(parseNumberInput(saved));
            }
        });

        const savedSumAllTabs = safeGet(KEYS.SUM_ALL_TABS, null);

        if (savedSumAllTabs !== null) {
            isSumAllTabsMode = savedSumAllTabs === 'true';

            const checkbox = document.getElementById('sumAllTabsCheckbox');

            if (checkbox) {
                checkbox.checked = isSumAllTabsMode;
            }
        }

        updateSumAllTabsRows();

        setTimeout(() => {
            const dict = getDict();

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');

                if (dict[key]) {
                    el.textContent = dict[key];
                }
            });

            document.querySelectorAll('[data-i18n-ph]').forEach(el => {
                const key = el.getAttribute('data-i18n-ph');

                if (dict[key]) {
                    el.setAttribute('placeholder', dict[key]);
                }
            });
        }, 0);
    }

    function initApp() {
        initSettingsPanel();

        attachLiveThousandsFormatting('#boxValue, input[data-id]');
        attachLvlInputHandlers();
        attachInputsHandlers();

        applyLang(currentLang(), true);

        restoreFromStorage();

        initPanZoom();
        initZoomControls();

        const savedLfSubtab = safeGet('og_calc_active_lf_subtab_v1', 'lf-buildings');

        document.querySelectorAll('.lf-subtab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.subtab === savedLfSubtab));

        document.getElementById('lf-buildings')?.classList.toggle('active', savedLfSubtab === 'lf-buildings');
        document.getElementById('lf-research')?.classList.toggle('active', savedLfSubtab === 'lf-research');

        const savedBuildingTab = safeGet('og_calc_active_building_tab', 'planet');

        document.querySelectorAll('.building-subtab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.buildingTab === savedBuildingTab));

        document.getElementById('planetBuildingsContent')?.classList.toggle('active', savedBuildingTab === 'planet');
        document.getElementById('moonBuildingsContent')?.classList.toggle('active', savedBuildingTab === 'moon');

        const sumAllTabsCheckbox = document.getElementById('sumAllTabsCheckbox');

        if (sumAllTabsCheckbox) {
            sumAllTabsCheckbox.addEventListener('change', function () {
                isSumAllTabsMode = this.checked;

                safeSet(KEYS.SUM_ALL_TABS, String(isSumAllTabsMode));

                updateSumAllTabsRows();
                updateBoxesNeeded();
            });
        }

        const savedView = safeGet('og_calc_active_view', 'costs');

        switchView(savedView);

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => switchView(btn.dataset.view));
        });

        if (savedView === 'expeditions' && typeof window.initExpeditionUI === 'function') {
            setTimeout(() => window.initExpeditionUI(), 150);
        }

        const baseCurrencySelector = document.getElementById('baseCurrencySelector');

        if (baseCurrencySelector) {
            baseCurrencySelector.value = safeGet(KEYS.BASE_CURRENCY, 'TRY');

            baseCurrencySelector.addEventListener('change', function () {
                safeSet(KEYS.BASE_CURRENCY, this.value);
                updateBoxesCostTL();
            });
        }

        const currencySelector = document.getElementById('currencySelector');

        if (currencySelector) {
            currencySelector.value = safeGet(KEYS.CURRENCY, 'BYN');

            currencySelector.addEventListener('change', function () {
                safeSet(KEYS.CURRENCY, this.value);
                updateBoxesCostTL();
            });
        }

        setActiveTab(safeGet(KEYS.ACTIVE_TAB, 'buildings'));

        recalcAll();
    }

    if (document.readyState !== 'loading') {
        initApp();
    } else {
        document.addEventListener('DOMContentLoaded', initApp);
    }
})();