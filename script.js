(function () {
    'use strict';
    const LANGUAGE_ICONS = {
        'en_GB': 'images/languages/en_gb.png',
        'en_US': 'images/languages/en_us.png',
        'ru': 'images/languages/ru.png',
        'de': 'images/languages/de.png',
        'pl': 'images/languages/pl.png',
        'es': 'images/languages/es.png',
        'fr': 'images/languages/fr.png',
        'it': 'images/languages/it.png',
        'nl': 'images/languages/nl.png',
        'sk': 'images/languages/sk.png',
        'tr': 'images/languages/tr.png',
        'pt': 'images/languages/pt.png',
        'bs': 'images/languages/bs.png'
    };
    const TECH_COSTS_LF = {
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
        1105: [25000, 20000, 10000, 0, 4500, 1.4, 1.4, 1.4, 0, 1.2],
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
    const CONFIG = {
        TM_PER_BOX: 42000,
        TM_PACKS: [{ tm: 12500000, priceTRY: 900 }],
        METAL_EQ_CRYSTAL: 1.5,
        METAL_EQ_DEUT: 3,
        MAX_LEVEL_SPAN: 1000,
        TM_PER_LEVEL_FACTOR: 2
    };
    let isSumAllTabsMode = false;
    let currentLifeformRace = localStorage.getItem('og_calc_lf_race_v1') || 'humans';
    const KEYS = {
        LANG: 'og_calc_lang_v2',
        TRANSFORM: 'og_calc_transform_v2',
        INPUTS_BUILD: 'og_calc_inputs_build_v2',
        INPUTS_RESEARCH: 'og_calc_inputs_research_v2',
        TM: 'og_calc_tm_v2',
        BOXES: 'og_calc_boxes_v2',
        SHIP_QTY: 'og_calc_ship_qty_v2',
        ACTIVE_TAB: 'og_calc_active_tab_v2',
        LF_INPUTS_BUILD: 'og_calc_lf_inputs_build_v1',
        LF_INPUTS_RESEARCH: 'og_calc_lf_inputs_research_v1',
        LF_RACE: 'og_calc_lf_race_v1',
        ROCKTAL_MEGALITH_LEVEL: 'og_calc_rocktal_megalith_level',
        ROCKTAL_MRC_LEVEL: 'og_calc_rocktal_mrc_level',
        ROCKTAL_RUNO_LEVEL: 'og_calc_rocktal_runo_level',
        SUM_ALL_TABS: 'og_calc_sum_all_tabs'
    };
    const LANGUAGE_NAMES = {
        'en_GB': 'English (GB)',
        'en_US': 'English (US)',
        'ru': 'Русский',
        'de': 'Deutsch',
        'pl': 'Polski',
        'es': 'Español',
        'fr': 'Français',
        'it': 'Italiano',
        'nl': 'Nederlands',
        'sk': 'Slovenčina',
        'tr': 'Türkçe',
        'pt': 'Português',
        'bs': 'Bosnian'
    };
    const MRC_REDUCTABLE_IDS = new Set([1, 2, 3, 4, 12, 2001, 2002]);
    const TECH_COSTS = TECH_COSTS_LF;
    const IMAGES_ROOT_PATH = 'images/';
    const IMAGES_BUILDINGS_PATH = 'images/buildings/';
    const IMAGES_RESEARCH_PATH = 'images/research/';
    const IMAGES_SHIPS_PATH = 'images/ships/';
    const BUILDINGS_DATA = [
        { base: { m: 60, c: 15, d: 0 }, factor: 1.5 },
        { base: { m: 48, c: 24, d: 0 }, factor: 1.6 },
        { base: { m: 225, c: 75, d: 0 }, factor: 1.5 },
        { base: { m: 75, c: 30, d: 0 }, factor: 1.5 },
        { base: { m: 900, c: 360, d: 180 }, factor: 1.8 },
        { base: { m: 400, c: 120, d: 200 }, factor: 2.0 },
        { base: { m: 1000000, c: 500000, d: 100000 }, factor: 2.0 },
        { base: { m: 400, c: 200, d: 100 }, factor: 2.0 },
        { base: { m: 2000, c: 0, d: 0 }, factor: 2.0 },
        { base: { m: 2000, c: 1000, d: 0 }, factor: 2.0 },
        { base: { m: 2000, c: 2000, d: 0 }, factor: 2.0 },
        { base: { m: 200, c: 400, d: 200 }, factor: 2.0 },
        { base: { m: 50000, c: 100000, d: 0 }, factor: 2.0 },
        { base: { m: 20000, c: 40000, d: 0 }, factor: 2.0 },
        { base: { m: 200, c: 0, d: 50 }, factor: 2.0 },
        { base: { m: 20000, c: 20000, d: 0 }, factor: 2.0 }
    ];
    const ICONS_BUILDINGS = [
        "metal_mine.png", "crystal_mine.png", "deuterium_synth.png", "solar_plant.png",
        "fusion_plant.png", "robot_factory.png", "nanite_factory.png", "shipyard.png",
        "metal_storage.png", "crystal_storage.png", "deuterium_tank.png", "research_lab.png",
        "terraformer.png", "alliance_depot.png", "dock.png", "missile_silo.png"
    ];
    const RESEARCH_DATA = [
        { base: { m: 200, c: 1000, d: 200 }, factor: 2.0 },
        { base: { m: 0, c: 400, d: 600 }, factor: 2.0 },
        { base: { m: 800, c: 200, d: 0 }, factor: 2.0 },
        { base: { m: 200, c: 600, d: 0 }, factor: 2.0 },
        { base: { m: 1000, c: 0, d: 0 }, factor: 2.0 },
        { base: { m: 0, c: 800, d: 400 }, factor: 2.0 },
        { base: { m: 0, c: 4000, d: 2000 }, factor: 2.0 },
        { base: { m: 400, c: 0, d: 600 }, factor: 2.0 },
        { base: { m: 2000, c: 4000, d: 600 }, factor: 2.0 },
        { base: { m: 10000, c: 20000, d: 6000 }, factor: 2.0 },
        { base: { m: 200, c: 100, d: 0 }, factor: 2.0 },
        { base: { m: 1000, c: 300, d: 100 }, factor: 2.0 },
        { base: { m: 2000, c: 4000, d: 1000 }, factor: 2.0 },
        { base: { m: 240000, c: 400000, d: 160000 }, factor: 2.0 },
        { base: { m: 4000, c: 8000, d: 4000 }, factor: 1.75 },
        { base: { m: 0, c: 0, d: 0 }, factor: 3.0 }
    ];
    const ICONS_RESEARCH = [
        "spy.png", "computer.png", "weapons.png", "shield.png",
        "armor.png", "energy.png", "hyperspace.png", "combustion.png",
        "impulse.png", "hyperdrive.png", "laser.png", "ion.png",
        "plasma.png", "irn.png", "astro.png", "graviton.png"
    ];
    const shipList = [
        { id: "small_cargo", metal: 2000, crystal: 2000, deut: 0, img: "maly_transport.png" },
        { id: "large_cargo", metal: 6000, crystal: 6000, deut: 0, img: "bolshoy_transport.png" },
        { id: "light_fighter", metal: 3000, crystal: 1000, deut: 0, img: "legkiy_istrebitel.png" },
        { id: "heavy_fighter", metal: 6000, crystal: 4000, deut: 0, img: "tyazhely_istrebitel.png" },
        { id: "cruiser", metal: 20000, crystal: 7000, deut: 2000, img: "kreiser.png" },
        { id: "battleship", metal: 45000, crystal: 15000, deut: 0, img: "linkor.png" },
        { id: "recycler", metal: 10000, crystal: 6000, deut: 2000, img: "recycler.png" },
        { id: "bomber", metal: 50000, crystal: 25000, deut: 15000, img: "bombardirovshik.png" },
        { id: "destroyer", metal: 60000, crystal: 50000, deut: 15000, img: "unichtozhitel.png" },
        { id: "battlecruiser", metal: 30000, crystal: 40000, deut: 15000, img: "battlecruiser.png" },
        { id: "death_star", metal: 5000000, crystal: 4000000, deut: 1000000, img: "death_star.png" },
        { id: "reaper", metal: 85000, crystal: 55000, deut: 20000, img: "reaper.png" },
        { id: "pathfinder", metal: 8000, crystal: 15000, deut: 8000, img: "pathfinder.png" }
    ];
    const LIFEFORM_RACES = ['humans', 'rocktal', 'mechas', 'kaelesh'];
    const LF_BUILDING_FILENAMES = {
        1001: "residential_sector.png", 1002: "biosphere_farm.png", 1003: "research_center.png",
        1004: "science_academy.png", 1005: "nerve_calibration_center.png", 1006: "high_energy_melting.png",
        1007: "food_storage.png", 1008: "fusion_powered_production.png", 1009: "skyscraper.png",
        1010: "biotech_lab.png", 1011: "metropolis.png", 1012: "planetary_shield.png",
        2001: "meditation_enclave.png", 2002: "crystal_farm.png", 2003: "rune_technologium.png",
        2004: "rune_forge.png", 2005: "orikterium.png", 2006: "magma_forge.png",
        2007: "chamber_of_rupture.png", 2008: "megalith.png", 2009: "crystal_purification.png",
        2010: "deuterium_synthesizer.png", 2011: "mineral_research_center.png", 2012: "advanced_recycling_unit.png",
        3001: "assembly_line.png", 3002: "fusion_cell_factory.png", 3003: "robotics_research_center.png",
        3004: "upgrade_network.png", 3005: "quantum_computer_center.png", 3006: "automated_assembly_center.png",
        3007: "high_performance_transformer.png", 3008: "microchip_line.png", 3009: "production_assembly_workshop.png",
        3010: "high_performance_synthesizer.png", 3011: "mass_chip_production.png", 3012: "repair_nanobots.png",
        4001: "sanctuary.png", 4002: "antimatter_condenser.png", 4003: "cyclone_chamber.png",
        4004: "hall_of_realization.png", 4005: "transcendental_forum.png", 4006: "antimatter_converter.png",
        4007: "cloning_lab.png", 4008: "chrysalis_accelerator.png", 4009: "biomodifier.png",
        4010: "psionic_modulator.png", 4011: "ship_production_hall.png", 4012: "supra_refractor.png"
    };
    const LF_RESEARCH_FILENAMES = {
        1101: "intergalactic_envoys.png", 1102: "high_efficiency_extractors.png", 1103: "fusion_drives.png",
        1104: "stealth_field_generator.png", 1105: "orbital_dock.png", 1106: "research_ai.png",
        1107: "high_performance_terraformer.png", 1108: "enhanced_extraction_technologies.png", 1109: "light_fighter_mk_ii.png",
        1110: "cruiser_mk_ii.png", 1111: "enhanced_laboratory_technology.png", 1112: "plasma_terraformer.png",
        1113: "low_temperature_drives.png", 1114: "bomber_mk_ii.png", 1115: "destroyer_mk_ii.png",
        1116: "battlecruiser_mk_ii.png", 1117: "assistant_robots.png", 1118: "supercomputer.png",
        2101: "volcanic_batteries.png", 2102: "acoustic_scanning.png", 2103: "high_energy_supply_systems.png",
        2104: "cargo_hold_expansion.png", 2105: "magma_powered_production.png", 2106: "geothermal_power_plants.png",
        2107: "echo_sounding.png", 2108: "ion_crystal_enhancement.png", 2109: "enhanced_stellarator.png",
        2110: "reinforced_diamond_drills.png", 2111: "seismic_extraction_technology.png", 2112: "magma_powered_supply_systems.png",
        2113: "ionized_crystal_modules.png", 2114: "optimized_mine_construction.png", 2115: "diamond_energy_transmitter.png",
        2116: "obsidian_shield_plating.png", 2117: "rune_shields.png", 2118: "rocktal_collector_enhancement.png",
        3101: "catalyst_technology.png", 3102: "plasma_drive.png", 3103: "efficiency_module.png",
        3104: "warehouse_ai.png", 3105: "general_repair_light_fighter.png", 3106: "automated_transport_lines.png",
        3107: "enhanced_drone_ai.png", 3108: "experimental_recycling_technology.png", 3109: "general_repair_cruiser.png",
        3110: "gravitational_maneuver_autopilot.png", 3111: "high_temperature_superconductors.png", 3112: "general_repair_battleship.png",
        3113: "swarm_ai.png", 3114: "general_repair_battlecruiser.png", 3115: "general_repair_bomber.png",
        3116: "general_repair_destroyer.png", 3117: "experimental_weapon_technology.png", 3118: "mechas_overall_enhancement.png",
        4101: "waste_heat_recovery.png", 4102: "sulfide_process.png", 4103: "psionic_network.png",
        4104: "telekinetic_grab_beam.png", 4105: "enhanced_sensor_technology.png", 4106: "neuromodal_compressor.png",
        4107: "neuro_interface.png", 4108: "interplanetary_analytical_network.png", 4109: "speed_boost_heavy_fighter.png",
        4110: "telekinetic_drive.png", 4111: "sixth_sense.png", 4112: "psycho_harmonizer.png",
        4113: "efficient_swarm_intelligence.png", 4114: "speed_boost_large_cargo.png", 4115: "gravitational_sensors.png",
        4116: "speed_boost_battleship.png", 4117: "psionic_shield_matrix.png", 4118: "kaelesh_explorer_enhancement.png"
    };
    const BONUS_INPUT_IDS = ['megalithLevel', 'mrcLevel', 'runoLevel', 'humansLevel', 'mechasLevel', 'kaeleshLevel'];
    function updateLfBonusesVisibility(race) {
        const bonusesEl = document.getElementById('lfBonuses');
        if (!bonusesEl) return;
        const lang = localStorage.getItem(KEYS.LANG) || 'ru';
        const dict = getLangDict(lang);
        bonusesEl.innerHTML = '';
        let fieldsToCreate = [];
        if (race === 'rocktal') {
            fieldsToCreate = [
                { labelKey: 'lfMegalith', inputId: 'megalithLevel', placeholder: '0' },
                { labelKey: 'lfMineralCenter', inputId: 'mrcLevel', placeholder: '0' },
                { labelKey: 'lfRunoTech', inputId: 'runoLevel', placeholder: '0' }
            ];
        } else if (race === 'humans') {
            fieldsToCreate = [{ labelKey: 'lf_b_1003', inputId: 'humansLevel', placeholder: '0' }];
        } else if (race === 'mechas') {
            fieldsToCreate = [{ labelKey: 'lf_b_3003', inputId: 'mechasLevel', placeholder: '0' }];
        } else if (race === 'kaelesh') {
            fieldsToCreate = [{ labelKey: 'lf_b_4003', inputId: 'kaeleshLevel', placeholder: '0' }];
        }
        fieldsToCreate.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'field';
            const label = document.createElement('label');
            label.setAttribute('for', field.inputId);
            label.textContent = dict[field.labelKey] || field.labelKey;
            const input = document.createElement('input');
            input.id = field.inputId;
            input.type = 'text';
            input.inputmode = 'numeric';
            input.min = '0';
            input.max = '100';
            input.placeholder = field.placeholder;
            const existingValue = document.getElementById(field.inputId)?.value;
            if (existingValue && existingValue !== '') {
                input.value = existingValue;
            } else {
                const savedValue = localStorage.getItem(`og_calc_${field.inputId}`);
                if (savedValue !== null) {
                    input.value = formatWithDotsRaw(parseNumberInput(savedValue));
                }
            }
            fieldDiv.appendChild(label);
            fieldDiv.appendChild(input);
            bonusesEl.appendChild(fieldDiv);
        });
        attachBonusInputHandlers();
        BONUS_INPUT_IDS.forEach(id => {
            const savedValue = localStorage.getItem(`og_calc_${id}`);
            const input = document.getElementById(id);
            if (savedValue !== null && input && !input.value) {
                input.value = formatWithDotsRaw(parseNumberInput(savedValue));
            }
        });
    }
    function getLangDict(lang) {
        const dict = {};
        const safeLang = lang && LANG_OTHER[lang] ? lang : 'ru';
        if (LANG_OTHER && LANG_OTHER[safeLang]) Object.assign(dict, LANG_OTHER[safeLang]);
        if (LANG_BUILDINGS && LANG_BUILDINGS[safeLang]) {
            LANG_BUILDINGS[safeLang].forEach((name, idx) => dict[`building${idx}`] = name);
        }
        if (LANG_RESEARCH && LANG_RESEARCH[safeLang]) {
            LANG_RESEARCH[safeLang].forEach((name, idx) => dict[`research${idx}`] = name);
        }
        if (LANG_LF_BUILDINGS && LANG_LF_BUILDINGS[safeLang]) {
            Object.entries(LANG_LF_BUILDINGS[safeLang]).forEach(([id, name]) => dict[`lf_b_${id}`] = name);
        }
        if (LANG_LF_RESEARCH && LANG_LF_RESEARCH[safeLang]) {
            Object.entries(LANG_LF_RESEARCH[safeLang]).forEach(([id, name]) => dict[`lf_r_${id}`] = name);
        }
        if (LANG_SHIPS && LANG_SHIPS[safeLang]) {
            Object.entries(LANG_SHIPS[safeLang]).forEach(([id, name]) => dict[`ship_${id}`] = name);
        }
        return dict;
    }
    function calcBuildCostLF(techID, techLevel, techData, costRdc) {
        if (techLevel < 1) return [0, 0, 0];
        const data = techData[techID];
        if (data === undefined) return [0, 0, 0];
        const cost = [0, 0, 0];
        costRdc = Math.min(0.99, costRdc);
        for (let i = 0; i < 3; i++) {
            cost[i] = Math.floor((1 - costRdc) * Math.floor(data[i] * techLevel * Math.pow(data[5 + i], (techLevel - 1))));
        }
        return cost;
    }
    function getBuildCostLF(techID, techLevelFrom, techLevelTo, techData, ionTechLevel, rsrCostRdc, bldCostRdc = 0) {
        let totalCost = [0, 0, 0];
        const costReduction = Number(techID) % 1000 < 100 ? bldCostRdc : rsrCostRdc;
        if (Number(techLevelFrom) > Number(techLevelTo)) {
            for (let i = Number(techLevelFrom) - 1; i >= Math.max(Number(techLevelTo), 0); i--) {
                const levelToUse = i === 0 ? 1 : i;
                const cost = calcDeconstrCostLF(techID, levelToUse, techData, ionTechLevel);
                totalCost[0] += cost[0];
                totalCost[1] += cost[1];
                totalCost[2] += cost[2];
            }
        } else {
            for (let i = Number(techLevelFrom) + 1; i <= Number(techLevelTo); i++) {
                const cost = calcBuildCostLF(techID, i, techData, costReduction);
                totalCost[0] += cost[0];
                totalCost[1] += cost[1];
                totalCost[2] += cost[2];
            }
        }
        return totalCost;
    }
    function calcDeconstrCostLF(techID, techLevel, techData, ionTechLevel) {
        const cost = [0, 0, 0];
        if (techLevel < 0 || Number(techID) % 1000 > 100) return cost;
        const data = techData[techID];
        if (data === undefined) return cost;
        const ionReduction = 1 - (0.04 * parseNumberInput(ionTechLevel));
        for (let i = 0; i < 3; i++) {
            cost[i] = Math.floor(Math.floor(data[i] * techLevel * Math.pow(data[5 + i], techLevel - 1)) * ionReduction);
        }
        return cost;
    }
    function getBuildEnergyCostLF(techID, techLevel, techData, ionTechLevel, bldCostRdc = 0) {
        if (techLevel < 1) return 0;
        const data = techData[techID];
        if (data === undefined) return 0;
        let buildCost = Math.floor(Math.floor(data[3] * techLevel * Math.pow(data[8], techLevel)) * (1 - 0.04 * parseNumberInput(ionTechLevel)));
        if (bldCostRdc > 0) buildCost = Math.floor(buildCost * (1 - bldCostRdc));
        return buildCost;
    }
    function formatWithDotsRaw(inputStr) {
        if (inputStr === null || inputStr === undefined) return '';
        const s = String(inputStr);
        const sign = s[0] === '-' ? '-' : '';
        const digits = (sign ? s.slice(1) : s).replace(/[^0-9]/g, '');
        if (digits.length === 0) return sign ? '-' : '';
        let out = '';
        for (let i = digits.length; i > 0; i -= 3) {
            const start = Math.max(0, i - 3);
            out = digits.slice(start, i) + (out ? '.' + out : '');
        }
        return sign + out;
    }
    function formatNumberWithDots(n) {
        if (n === null || n === undefined || isNaN(n)) return '0';
        return formatWithDotsRaw(Math.round(Number(n) || 0));
    }
    function parseNumberInput(s) {
        if (s === null || s === undefined) return 0;
        const str = String(s).trim();
        if (str === '' || str === '-') return 0;
        const negative = str[0] === '-';
        const cleaned = str.replace(/[^0-9]/g, '');
        const num = cleaned ? Number(cleaned) : 0;
        if (!Number.isFinite(num)) return 0;
        const safe = Math.min(num, Number.MAX_SAFE_INTEGER);
        return negative ? -safe : safe;
    }
    function formatSpanMetal(n) {
        const span = document.createElement('span');
        span.className = 'val-metal';
        span.textContent = formatNumberWithDots(n);
        return span;
    }
    function formatSpanCrystal(n) {
        const span = document.createElement('span');
        span.className = 'val-crystal';
        span.textContent = formatNumberWithDots(n);
        return span;
    }
    function formatSpanDeut(n) {
        const span = document.createElement('span');
        span.className = 'val-deut';
        span.textContent = formatNumberWithDots(n);
        return span;
    }
    function convertToMetal(m, c, d) {
        return (m || 0) + (c || 0) * CONFIG.METAL_EQ_CRYSTAL + (d || 0) * CONFIG.METAL_EQ_DEUT;
    }
    function debounce(fn, wait) {
        let t = null;
        return function (...a) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, a), wait);
        };
    }
    function createImageFallbackEl(label) {
        const span = document.createElement('span');
        span.className = 'icon-fallback';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = label ? label[0] : '—';
        return span;
    }
    function geomSum(base, factor, from, to) {
        const len = Math.max(0, to - from);
        if (len <= 0) return { m: 0, c: 0, d: 0, points: 0 };
        const expoStart = Math.max(0, from);
        const count = len;
        const sum = (b) => {
            if (!b || count === 0) return 0;
            if (factor === 1) return b * count * Math.pow(factor, expoStart);
            return b * Math.pow(factor, expoStart) * (Math.pow(factor, count) - 1) / (factor - 1);
        };
        const m = Math.round(sum(base.m));
        const c = Math.round(sum(base.c));
        const d = Math.round(sum(base.d));
        const points = Math.round((m + c + d) / 1000);
        return { m, c, d, points, levels: count };
    }
    function getActiveTab() {
        return document.querySelector('.tab-btn.active')?.dataset.tab || 'buildings';
    }
    function attachLvlInputHandlers() {
        document.querySelectorAll('.lvl-input').forEach(inp => {
            if (inp._lvlBound) return;
            inp._lvlBound = true;
            const restrictTo99 = (inputEl) => {
                let val = inputEl.value.trim().replace(/[^0-9]/g, '');
                if (val === '') return;
                let num = Number(val);
                if (num > 99) num = 99;
                inputEl.value = String(num);
            };
            inp.addEventListener('input', () => restrictTo99(inp));
            inp.addEventListener('blur', function () {
                restrictTo99(inp);
                inp.dispatchEvent(new Event('change', { bubbles: true }));
            });
            inp.addEventListener('paste', function (e) {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
                let num = Number(text.trim().replace(/[^0-9]/g, ''));
                if (isNaN(num) || num < 0) num = 0;
                if (num > 99) num = 99;
                inp.value = String(num);
                inp.dispatchEvent(new Event('input', { bubbles: true }));
                inp.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });
    }
    function recalcAllLfBuildings() {
        const tbody = document.getElementById('tbodyLfBuildings');
        if (!tbody) return;
        let tm = 0, tc = 0, td = 0, tp = 0;
        let megalithLevel = 0, mineralCenterLevel = 0;
        if (currentLifeformRace === 'rocktal') {
            megalithLevel = parseNumberInput(document.getElementById('megalithLevel')?.value || '0');
            mineralCenterLevel = parseNumberInput(document.getElementById('mrcLevel')?.value || '0');
        }
        tbody.querySelectorAll('tr').forEach(tr => {
            const techId = Number(tr.querySelector('td:first-child')?.textContent) || 0;
            if (!techId || !TECH_COSTS[techId]) {
                const mCell = tr.querySelector('td.m');
                mCell.innerHTML = ''; mCell.appendChild(formatSpanMetal(0));
                const cCell = tr.querySelector('td.c');
                cCell.innerHTML = ''; cCell.appendChild(formatSpanCrystal(0));
                const dCell = tr.querySelector('td.d');
                dCell.innerHTML = ''; dCell.appendChild(formatSpanDeut(0));
                tr.querySelector('td.p').textContent = '0';
                return;
            }
            const fromInput = tr.querySelector('input[data-type="from"]').value.trim();
            const toInput = tr.querySelector('input[data-type="to"]').value.trim();
            let from = 0, to = 0;
            if (fromInput === '' && toInput === '') { from = to = 0; }
            else if (toInput === '') { const level = parseNumberInput(fromInput); from = 0; to = level; }
            else { from = parseNumberInput(fromInput); to = Math.max(from, parseNumberInput(toInput)); }
            if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
            const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1);
            let bldCostRdc = 0;
            if (currentLifeformRace === 'rocktal') {
                bldCostRdc = 0.01 * megalithLevel;
                if (MRC_REDUCTABLE_IDS.has(techId % 1000)) bldCostRdc += 0.005 * mineralCenterLevel;
            }
            const isDeconstruct = from > to;
            const ionTechLevel = isDeconstruct ? parseNumberInput(document.getElementById('ionTechLevel')?.value || '0') : 0;
            let resCost = [0, 0, 0], points = 0;
            if (to > from) {
                resCost = getBuildCostLF(techId, from, to, TECH_COSTS, 0, 0, bldCostRdc);
                points = Math.round((resCost[0] + resCost[1] + resCost[2]) / 1000.0);
            } else if (from > to) {
                for (let level = from; level > to; level--) {
                    const levelCost = calcDeconstrCostLF(techId, level, TECH_COSTS, ionTechLevel);
                    resCost[0] += levelCost[0];
                    resCost[1] += levelCost[1];
                    resCost[2] += levelCost[2];
                }
                points = -1 * Math.round((resCost[0] + resCost[1] + resCost[2]) / 1000.0);
            }
            let m = Math.round(resCost[0] * planets);
            let c = Math.round(resCost[1] * planets);
            let d = Math.round(resCost[2] * planets);
            let p = Math.round(points * planets);
            const mCell = tr.querySelector('td.m');
            mCell.innerHTML = ''; mCell.appendChild(formatSpanMetal(m));
            const cCell = tr.querySelector('td.c');
            cCell.innerHTML = ''; cCell.appendChild(formatSpanCrystal(c));
            const dCell = tr.querySelector('td.d');
            dCell.innerHTML = ''; dCell.appendChild(formatSpanDeut(d));
            tr.querySelector('td.p').textContent = formatNumberWithDots(p);
            tm += m; tc += c; td += d; tp += p;
        });
        const sumMetalEl = document.getElementById('sumMetalLfB');
        sumMetalEl.innerHTML = ''; sumMetalEl.appendChild(formatSpanMetal(tm));
        const sumCrystalEl = document.getElementById('sumCrystalLfB');
        sumCrystalEl.innerHTML = ''; sumCrystalEl.appendChild(formatSpanCrystal(tc));
        const sumDeutEl = document.getElementById('sumDeutLfB');
        sumDeutEl.innerHTML = ''; sumDeutEl.appendChild(formatSpanDeut(td));
        document.getElementById('sumPointsLfB').textContent = formatNumberWithDots(tp);
        document.getElementById('sumTotalMetalLfB').textContent = formatNumberWithDots(Math.round(convertToMetal(tm, tc, td)));
        updateBoxesNeeded();
    }
    function recalcAllLfResearch() {
    const tbody = document.getElementById('tbodyLfResearch');
    if (!tbody) return;
    let tm = 0, tc = 0, td = 0, tp = 0;
    const levelInputId = {
        'humans': 'humansLevel',
        'mechas': 'mechasLevel',
        'kaelesh': 'kaeleshLevel',
        'rocktal': 'runoLevel'
    }[currentLifeformRace];
    const levelValue = parseNumberInput(document.getElementById(levelInputId)?.value || '0');
    const rsrCostRdc = 0.0025 * levelValue; // Исправлено: 0.0025 вместо 0.025
    tbody.querySelectorAll('tr').forEach(tr => {
        const techId = Number(tr.querySelector('td:first-child')?.textContent) || 0;
        if (!techId || !TECH_COSTS[techId]) {
            const mCell = tr.querySelector('td.m');
            mCell.innerHTML = ''; mCell.appendChild(formatSpanMetal(0));
            const cCell = tr.querySelector('td.c');
            cCell.innerHTML = ''; cCell.appendChild(formatSpanCrystal(0));
            const dCell = tr.querySelector('td.d');
            dCell.innerHTML = ''; dCell.appendChild(formatSpanDeut(0));
            tr.querySelector('td.p').textContent = '0';
            return;
        }
        const fromInput = tr.querySelector('input[data-type="from"]').value.trim();
        const toInput = tr.querySelector('input[data-type="to"]').value.trim();
        let from = 0, to = 0;
        if (fromInput === '' && toInput === '') { from = to = 0; }
        else if (toInput === '') { const level = parseNumberInput(fromInput); from = 0; to = level; }
        else { from = parseNumberInput(fromInput); to = Math.max(from, parseNumberInput(toInput)); }
        if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
        const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1);
        let resCost = getBuildCostLF(techId, from, to, TECH_COSTS, 0, rsrCostRdc, 0);
        let p = Math.round((resCost[0] + resCost[1] + resCost[2]) / 1000.0);
        let m = Math.round(resCost[0] * planets);
        let c = Math.round(resCost[1] * planets);
        let d = Math.round(resCost[2] * planets);
        const mCell = tr.querySelector('td.m');
        mCell.innerHTML = ''; mCell.appendChild(formatSpanMetal(m));
        const cCell = tr.querySelector('td.c');
        cCell.innerHTML = ''; cCell.appendChild(formatSpanCrystal(c));
        const dCell = tr.querySelector('td.d');
        dCell.innerHTML = ''; dCell.appendChild(formatSpanDeut(d));
        tr.querySelector('td.p').textContent = formatNumberWithDots(p);
        tm += m; tc += c; td += d; tp += p;
    });
    const sumMetalEl = document.getElementById('sumMetalLfR');
    sumMetalEl.innerHTML = ''; sumMetalEl.appendChild(formatSpanMetal(tm));
    const sumCrystalEl = document.getElementById('sumCrystalLfR');
    sumCrystalEl.innerHTML = ''; sumCrystalEl.appendChild(formatSpanCrystal(tc));
    const sumDeutEl = document.getElementById('sumDeutLfR');
    sumDeutEl.innerHTML = ''; sumDeutEl.appendChild(formatSpanDeut(td));
    document.getElementById('sumPointsLfR').textContent = formatNumberWithDots(tp);
    document.getElementById('sumTotalMetalLfR').textContent = formatNumberWithDots(Math.round(convertToMetal(tm, tc, td)));
    updateBoxesNeeded();
}
    function recalcAllBuildings() {
        const tbodyB = document.getElementById('tbodyBuildings');
        if (!tbodyB) return;
        let tm = 0, tc = 0, td = 0, tp = 0;
        let megalithLevel = 0, mineralCenterLevel = 0;
        if (currentLifeformRace === 'rocktal') {
            megalithLevel = parseNumberInput(document.getElementById('megalithLevel')?.value || '0');
            mineralCenterLevel = parseNumberInput(document.getElementById('mrcLevel')?.value || '0');
        }
        tbodyB.querySelectorAll('tr').forEach(tr => {
            const idx = Number(tr.dataset.index) || 0;
            const data = BUILDINGS_DATA[idx] || { base: { m: 0, c: 0, d: 0 }, factor: 1 };
            const from = parseNumberInput(tr.querySelector('input[data-type="from"]').value);
            const toVal = tr.querySelector('input[data-type="to"]').value;
            let to = (toVal === '' ? from : parseNumberInput(toVal));
            to = Math.max(from, to);
            if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
            const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1);
            const sum = geomSum({ m: data.base.m, c: data.base.c, d: data.base.d }, data.factor, from, to);
            let m = Math.round(sum.m * planets);
            let c = Math.round(sum.c * planets);
            let d = Math.round(sum.d * planets);
            let p = Math.round(sum.points * planets);
            if (currentLifeformRace === 'rocktal') {
                let totalDiscount = 0;
                const isResourceBuilding = [1, 2, 3, 6, 7, 8].includes(idx + 1);
                if (mineralCenterLevel > 0 && isResourceBuilding) totalDiscount += 0.005 * mineralCenterLevel;
                if (totalDiscount > 0) {
                    m = Math.ceil(m * (1 - totalDiscount));
                    c = Math.ceil(c * (1 - totalDiscount));
                    d = Math.ceil(d * (1 - totalDiscount));
                    p = Math.round((m + c + d) / 1000);
                }
            }
            const mCell = tr.querySelector('td.m');
            mCell.innerHTML = ''; mCell.appendChild(formatSpanMetal(m));
            const cCell = tr.querySelector('td.c');
            cCell.innerHTML = ''; cCell.appendChild(formatSpanCrystal(c));
            const dCell = tr.querySelector('td.d');
            dCell.innerHTML = ''; dCell.appendChild(formatSpanDeut(d));
            tr.querySelector('td.p').textContent = formatNumberWithDots(p);
            tm += m; tc += c; td += d; tp += p;
        });
        const sumMetalEl = document.getElementById('sumMetalB');
        sumMetalEl.innerHTML = ''; sumMetalEl.appendChild(formatSpanMetal(tm));
        const sumCrystalEl = document.getElementById('sumCrystalB');
        sumCrystalEl.innerHTML = ''; sumCrystalEl.appendChild(formatSpanCrystal(tc));
        const sumDeutEl = document.getElementById('sumDeutB');
        sumDeutEl.innerHTML = ''; sumDeutEl.appendChild(formatSpanDeut(td));
        document.getElementById('sumPointsB').textContent = formatNumberWithDots(tp);
        document.getElementById('sumTotalMetalB').textContent = formatNumberWithDots(Math.round(convertToMetal(tm, tc, td)));
        updateBoxesNeeded();
    }
    function recalcAllResearch() {
        const tbodyR = document.getElementById('tbodyResearch');
        if (!tbodyR) return;
        let sm = 0, sc = 0, sd = 0, sp = 0, totalLevels = 0;
        tbodyR.querySelectorAll('tr').forEach(tr => {
            const idx = Number(tr.dataset.index) || 0;
            const data = RESEARCH_DATA[idx] || { base: { m: 0, c: 0, d: 0 }, factor: 1 };
            const from = parseNumberInput(tr.querySelector('input[data-type="from"]').value);
            const toVal = tr.querySelector('input[data-type="to"]').value;
            let to = (toVal === '' ? from : parseNumberInput(toVal));
            to = Math.max(from, to);
            if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
            const sum = geomSum({ m: data.base.m, c: data.base.c, d: data.base.d }, data.factor, from, to);
            const m = sum.m, c = sum.c, d = sum.d, p = sum.points;
            const mCell = tr.querySelector('td.m');
            mCell.innerHTML = ''; mCell.appendChild(formatSpanMetal(m));
            const cCell = tr.querySelector('td.c');
            cCell.innerHTML = ''; cCell.appendChild(formatSpanCrystal(c));
            const dCell = tr.querySelector('td.d');
            dCell.innerHTML = ''; dCell.appendChild(formatSpanDeut(d));
            tr.querySelector('td.p').textContent = formatNumberWithDots(p);
            sm += m; sc += c; sd += d; sp += p; totalLevels += sum.levels || 0;
        });
        const sumMetalEl = document.getElementById('sumMetalR');
        sumMetalEl.innerHTML = ''; sumMetalEl.appendChild(formatSpanMetal(sm));
        const sumCrystalEl = document.getElementById('sumCrystalR');
        sumCrystalEl.innerHTML = ''; sumCrystalEl.appendChild(formatSpanCrystal(sc));
        const sumDeutEl = document.getElementById('sumDeutR');
        sumDeutEl.innerHTML = ''; sumDeutEl.appendChild(formatSpanDeut(sd));
        document.getElementById('sumPointsR').textContent = formatNumberWithDots(sp);
        document.getElementById('sumTotalMetalR').textContent = formatNumberWithDots(Math.round(convertToMetal(sm, sc, sd)));
        const perLevel = parseNumberInput(document.getElementById('tmInput')?.value);
        const totalTM = Math.round(perLevel * totalLevels * CONFIG.TM_PER_LEVEL_FACTOR);
        const lang = localStorage.getItem(KEYS.LANG) || 'ru';
        const dict = getLangDict(lang);
        document.getElementById('tmTotal').textContent = (dict.totalTMLabel || 'Итого: ') + formatNumberWithDots(totalTM);
        updateBoxesNeeded();
    }
    function computeFleet() {
        try {
            const factorC = CONFIG.METAL_EQ_CRYSTAL;
            const factorD = CONFIG.METAL_EQ_DEUT;
            let fleetM = 0, fleetC = 0, fleetD = 0;
            document.querySelectorAll("input[data-id]").forEach(inp => {
                const qty = parseNumberInput(inp.value);
                const row = inp.closest('tr');
                const pointsCell = row.querySelector('.p');
                if (qty <= 0) {
                    inp.value = '';
                    pointsCell.textContent = '0';
                    return;
                }
                const ship = shipList.find(s => s.id === inp.dataset.id);
                if (!ship) return;
                fleetM += qty * ship.metal;
                fleetC += qty * ship.crystal;
                fleetD += qty * ship.deut;
                inp.value = formatWithDotsRaw(qty);
                const shipPoints = Math.round((ship.metal + ship.crystal + ship.deut) / 1000) * qty;
                pointsCell.textContent = formatNumberWithDots(shipPoints);
            });
            const planetM = parseNumberInput(document.getElementById('planetMetal')?.value);
            const planetC = parseNumberInput(document.getElementById('planetCrystal')?.value);
            const planetD = parseNumberInput(document.getElementById('planetDeut')?.value);
            const totalM = Math.max(0, fleetM - planetM);
            const totalC = Math.max(0, fleetC - planetC);
            const totalD = Math.max(0, fleetD - planetD);
            const totalResEl = document.getElementById('totalRes');
            const lang = localStorage.getItem(KEYS.LANG) || 'ru';
            const dict = getLangDict(lang);
            if (totalResEl) {
                totalResEl.innerHTML = '';
                totalResEl.appendChild(formatSpanMetal(totalM));
                totalResEl.appendChild(document.createTextNode(` ${dict.metal}, `));
                totalResEl.appendChild(formatSpanCrystal(totalC));
                totalResEl.appendChild(document.createTextNode(` ${dict.crystal}, `));
                totalResEl.appendChild(formatSpanDeut(totalD));
                totalResEl.appendChild(document.createTextNode(` ${dict.deut}`));
            }
            const totalMetalEq = Math.round(totalM + totalC * factorC + totalD * factorD);
            const totalMetalEqEl = document.getElementById('totalMetalEq');
            if (totalMetalEqEl) totalMetalEqEl.textContent = formatNumberWithDots(totalMetalEq);
            const boxesCount = parseNumberInput(document.getElementById('boxesCount')?.value);
            const boxValue = parseNumberInput(document.getElementById('boxValue')?.value);
            const boxesMetal = boxesCount * boxValue;
            const grand = boxesMetal - totalMetalEq;
            const grandTotalEl = document.getElementById('grandTotal');
            if (grandTotalEl) {
                grandTotalEl.textContent = formatNumberWithDots(Math.round(grand));
                grandTotalEl.style.color = grand >= 0 ? "#41c879" : "#ff4d4d";
            }
            const boxesData = {
                boxesCount,
                boxValue,
                planetMetal: planetM,
                planetCrystal: planetC,
                planetDeut: planetD
            };
            try { localStorage.setItem(KEYS.BOXES, JSON.stringify(boxesData)); } catch (e) { }
            updateBoxesNeeded();
        } catch (e) { }
    }
    function renderTable() {
        try {
            const tableBody = document.querySelector("#shipsTable tbody");
            if (!tableBody) return;
            const qtyMap = JSON.parse(localStorage.getItem(KEYS.SHIP_QTY) || '{}');
            tableBody.innerHTML = '';
            const frag = document.createDocumentFragment();
            shipList.forEach(ship => {
                const v = qtyMap[ship.id] || '';
                const row = document.createElement('tr');
                row.setAttribute('data-row-id', ship.id);
                const lang = localStorage.getItem(KEYS.LANG) || 'ru';
                const dict = getLangDict(lang);
                const shipName = dict[`ship_${ship.id}`] || ship.id;
                const tdName = document.createElement('td');
                tdName.style.textAlign = 'left';
                const img = document.createElement('img');
                img.src = `${IMAGES_SHIPS_PATH}${ship.img}`;
                img.alt = shipName;
                img.width = 28;
                img.height = 28;
                img.loading = 'lazy';
                img.style.width = '28px';
                img.style.height = '28px';
                img.style.verticalAlign = 'middle';
                img.style.marginRight = '8px';
                img.style.borderRadius = '4px';
                img.addEventListener('error', () => {
                    if (!img._fallback) {
                        const fb = createImageFallbackEl(shipName);
                        img.style.display = 'none';
                        img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
                        img._fallback = true;
                    }
                });
                tdName.appendChild(img);
                const span = document.createElement('span');
                span.className = 'ship-name';
                span.textContent = shipName;
                tdName.appendChild(span);
                const tdQty = document.createElement('td');
                tdQty.innerHTML = `<input type="text" inputmode="numeric" pattern="[0-9\\.]*" value="${v ? formatWithDotsRaw(v) : ''}" data-id="${ship.id}">`;
                const tdM = document.createElement('td');
                tdM.appendChild(formatSpanMetal(ship.metal));
                const tdC = document.createElement('td');
                tdC.appendChild(formatSpanCrystal(ship.crystal));
                const tdD = document.createElement('td');
                tdD.appendChild(formatSpanDeut(ship.deut));
                const points = Math.round((ship.metal + ship.crystal + ship.deut) / 1000);
                const tdP = document.createElement('td');
                tdP.className = 'p';
                tdP.textContent = '0';
                row.appendChild(tdName);
                row.appendChild(tdQty);
                row.appendChild(tdM);
                row.appendChild(tdC);
                row.appendChild(tdD);
                row.appendChild(tdP);
                frag.appendChild(row);
            });
            tableBody.appendChild(frag);
            attachLiveThousandsFormatting('input[data-id]');
            document.querySelectorAll("input[data-id]").forEach(inp => {
                if (!inp || inp._qtyBound) return;
                inp.addEventListener('input', () => {
                    saveShipQuantities();
                    computeFleet();
                });
                inp.addEventListener('change', () => {
                    saveShipQuantities();
                    computeFleet();
                });
                inp._qtyBound = true;
            });
        } catch (e) { }
    }
    function buildRowsBuildings() {
        const tbodyB = document.getElementById('tbodyBuildings');
        if (!tbodyB) return;
        tbodyB.innerHTML = '';
        const lang = localStorage.getItem(KEYS.LANG) || 'ru';
        const dict = getLangDict(lang);
        const names = LANG_BUILDINGS[lang] || LANG_BUILDINGS.ru;
        const frag = document.createDocumentFragment();
        names.forEach((name, i) => {
            const tr = document.createElement('tr');
            tr.dataset.index = i;
            const tdName = document.createElement('td');
            tdName.className = 'name-cell';
            const iconFileName = ICONS_BUILDINGS[i];
            if (iconFileName) {
                const img = document.createElement('img');
                img.src = `${IMAGES_BUILDINGS_PATH}${iconFileName}`;
                img.className = 'icon';
                img.alt = '';
                img.addEventListener('error', () => {
                    if (!img._fallback) {
                        const fb = createImageFallbackEl(name);
                        img.style.display = 'none';
                        img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
                        img._fallback = true;
                    }
                });
                tdName.appendChild(img);
            } else {
                tdName.appendChild(createImageFallbackEl(name));
            }
            tdName.appendChild(document.createTextNode(name));
            tr.appendChild(tdName);
            const tdFrom = document.createElement('td');
            tdFrom.innerHTML = `<input type="text" class="lvl-input" data-type="from" data-index="${i}" inputmode="numeric">`;
            const tdTo = document.createElement('td');
            tdTo.innerHTML = `<input type="text" class="lvl-input" data-type="to" data-index="${i}" inputmode="numeric">`;
            const tdPlanets = document.createElement('td');
            tdPlanets.innerHTML = `<img src="${IMAGES_ROOT_PATH}planet.png" class="icon" alt=""><input type="text" class="planet-input" data-type="planets" data-index="${i}" inputmode="numeric" value="1">`;
            const tdM = document.createElement('td');
            tdM.className = 'm';
            tdM.appendChild(formatSpanMetal(0));
            const tdC = document.createElement('td');
            tdC.className = 'c';
            tdC.appendChild(formatSpanCrystal(0));
            const tdD = document.createElement('td');
            tdD.className = 'd';
            tdD.appendChild(formatSpanDeut(0));
            const tdP = document.createElement('td');
            tdP.className = 'p';
            tdP.textContent = '0';
            tr.appendChild(tdFrom);
            tr.appendChild(tdTo);
            tr.appendChild(tdPlanets);
            tr.appendChild(tdM);
            tr.appendChild(tdC);
            tr.appendChild(tdD);
            tr.appendChild(tdP);
            frag.appendChild(tr);
        });
        tbodyB.appendChild(frag);
        attachLvlInputHandlers();
    }
    function buildRowsResearch() {
        const tbodyR = document.getElementById('tbodyResearch');
        if (!tbodyR) return;
        tbodyR.innerHTML = '';
        const lang = localStorage.getItem(KEYS.LANG) || 'ru';
        const dict = getLangDict(lang);
        const names = LANG_RESEARCH[lang] || LANG_RESEARCH.ru;
        const frag = document.createDocumentFragment();
        names.forEach((name, i) => {
            const tr = document.createElement('tr');
            tr.dataset.index = i;
            const tdName = document.createElement('td');
            tdName.className = 'name-cell';
            const iconFileName = ICONS_RESEARCH[i];
            if (iconFileName) {
                const img = document.createElement('img');
                img.src = `${IMAGES_RESEARCH_PATH}${iconFileName}`;
                img.className = 'icon';
                img.alt = '';
                img.addEventListener('error', () => {
                    if (!img._fallback) {
                        const fb = createImageFallbackEl(name);
                        img.style.display = 'none';
                        img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
                        img._fallback = true;
                    }
                });
                tdName.appendChild(img);
            } else {
                tdName.appendChild(createImageFallbackEl(name));
            }
            tdName.appendChild(document.createTextNode(name));
            tr.appendChild(tdName);
            const tdFrom = document.createElement('td');
            tdFrom.innerHTML = `<input type="text" class="lvl-input" data-type="from" data-index="${i}" inputmode="numeric">`;
            const tdTo = document.createElement('td');
            tdTo.innerHTML = `<input type="text" class="lvl-input" data-type="to" data-index="${i}" inputmode="numeric">`;
            const tdM = document.createElement('td');
            tdM.className = 'm';
            tdM.appendChild(formatSpanMetal(0));
            const tdC = document.createElement('td');
            tdC.className = 'c';
            tdC.appendChild(formatSpanCrystal(0));
            const tdD = document.createElement('td');
            tdD.className = 'd';
            tdD.appendChild(formatSpanDeut(0));
            const tdP = document.createElement('td');
            tdP.className = 'p';
            tdP.textContent = '0';
            tr.appendChild(tdFrom);
            tr.appendChild(tdTo);
            tr.appendChild(tdM);
            tr.appendChild(tdC);
            tr.appendChild(tdD);
            tr.appendChild(tdP);
            frag.appendChild(tr);
        });
        tbodyR.appendChild(frag);
        attachLvlInputHandlers();
    }
    function buildRowsLfBuildings() {
        const tbody = document.getElementById('tbodyLfBuildings');
        if (!tbody) return;
        tbody.innerHTML = '';
        const frag = document.createDocumentFragment();
        const raceMap = { humans: '1', rocktal: '2', mechas: '3', kaelesh: '4' };
        const prefix = raceMap[currentLifeformRace] + '0';
        for (let i = 1; i <= 12; i++) {
            const techId = Number(prefix + String(i).padStart(2, '0'));
            if (!TECH_COSTS[techId]) continue;
            const tr = document.createElement('tr');
            tr.dataset.index = i - 1;
            const tdId = document.createElement('td');
            tdId.style.display = 'none';
            tdId.textContent = techId;
            tr.appendChild(tdId);
            const lang = localStorage.getItem(KEYS.LANG) || 'ru';
            const dict = getLangDict(lang);
            const name = dict[`lf_b_${techId}`] || `ID ${techId}`;
            const tdName = document.createElement('td');
            tdName.className = 'name-cell';
            const img = document.createElement('img');
            const imagePath = `images/lifeforms/buildings/${currentLifeformRace}/`;
            const fileName = LF_BUILDING_FILENAMES[techId] || `${techId}.png`;
            img.src = `${imagePath}${fileName}`;
            img.className = 'icon';
            img.alt = name;
            img.addEventListener('error', () => {
                if (!img._fallback) {
                    const fb = createImageFallbackEl(name);
                    img.style.display = 'none';
                    img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
                    img._fallback = true;
                }
            });
            tdName.appendChild(img);
            const span = document.createElement('span');
            span.textContent = name;
            tdName.appendChild(span);
            tr.appendChild(tdName);
            const tdFrom = document.createElement('td');
            tdFrom.innerHTML = `<input type="text" class="lvl-input" data-type="from" data-index="${i - 1}">`;
            const tdTo = document.createElement('td');
            tdTo.innerHTML = `<input type="text" class="lvl-input" data-type="to" data-index="${i - 1}">`;
            const tdPlanets = document.createElement('td');
            tdPlanets.innerHTML = `<img src="${IMAGES_ROOT_PATH}planet.png" class="icon" alt=""><input type="text" class="planet-input" data-type="planets" data-index="${i - 1}" inputmode="numeric" value="1">`;
            const tdM = document.createElement('td');
            tdM.className = 'm';
            tdM.appendChild(formatSpanMetal(0));
            const tdC = document.createElement('td');
            tdC.className = 'c';
            tdC.appendChild(formatSpanCrystal(0));
            const tdD = document.createElement('td');
            tdD.className = 'd';
            tdD.appendChild(formatSpanDeut(0));
            const tdP = document.createElement('td');
            tdP.className = 'p';
            tdP.textContent = '0';
            tr.append(tdFrom, tdTo, tdPlanets, tdM, tdC, tdD, tdP);
            frag.appendChild(tr);
        };
        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }
    function buildRowsLfResearch() {
        const tbody = document.getElementById('tbodyLfResearch');
        if (!tbody) return;
        tbody.innerHTML = '';
        const frag = document.createDocumentFragment();
        const raceMap = { humans: '1', rocktal: '2', mechas: '3', kaelesh: '4' };
        const prefix = raceMap[currentLifeformRace] + '1';
        for (let i = 1; i <= 18; i++) {
            const techId = Number(prefix + String(i).padStart(2, '0'));
            if (!TECH_COSTS[techId]) continue;
            const tr = document.createElement('tr');
            tr.dataset.index = i - 1;
            const tdId = document.createElement('td');
            tdId.style.display = 'none';
            tdId.textContent = techId;
            tr.appendChild(tdId);
            const lang = localStorage.getItem(KEYS.LANG) || 'ru';
            const dict = getLangDict(lang);
            const name = dict[`lf_r_${techId}`] || `ID ${techId}`;
            const tdName = document.createElement('td');
            tdName.className = 'name-cell';
            const img = document.createElement('img');
            const imagePath = `images/lifeforms/research/${currentLifeformRace}/`;
            const fileName = LF_RESEARCH_FILENAMES[techId] || `${techId}.png`;
            img.src = `${imagePath}${fileName}`;
            img.className = 'icon';
            img.alt = name;
            img.addEventListener('error', () => {
                if (!img._fallback) {
                    const fb = createImageFallbackEl(name);
                    img.style.display = 'none';
                    img.parentNode && img.parentNode.insertBefore(fb, img.nextSibling);
                    img._fallback = true;
                }
            });
            tdName.appendChild(img);
            const span = document.createElement('span');
            span.textContent = name;
            tdName.appendChild(span);
            tr.appendChild(tdName);
            const tdFrom = document.createElement('td');
            tdFrom.innerHTML = `<input type="text" class="lvl-input" data-type="from" data-index="${i - 1}">`;
            const tdTo = document.createElement('td');
            tdTo.innerHTML = `<input type="text" class="lvl-input" data-type="to" data-index="${i - 1}">`;
            const tdPlanets = document.createElement('td');
            tdPlanets.innerHTML = `<img src="${IMAGES_ROOT_PATH}planet.png" class="icon" alt=""><input type="text" class="planet-input" data-type="planets" data-index="${i - 1}" inputmode="numeric" value="1">`;
            const tdM = document.createElement('td');
            tdM.className = 'm';
            tdM.appendChild(formatSpanMetal(0));
            const tdC = document.createElement('td');
            tdC.className = 'c';
            tdC.appendChild(formatSpanCrystal(0));
            const tdD = document.createElement('td');
            tdD.className = 'd';
            tdD.appendChild(formatSpanDeut(0));
            const tdP = document.createElement('td');
            tdP.className = 'p';
            tdP.textContent = '0';
            tr.append(tdFrom, tdTo, tdPlanets, tdM, tdC, tdD, tdP);
            frag.appendChild(tr);
        };
        tbody.appendChild(frag);
        attachLvlInputHandlers();
    }
    function attachLiveThousandsFormatting(selector) {
        const inputs = document.querySelectorAll(selector);
        inputs.forEach(inp => {
            if (!inp || inp._thousandsBound) return;
            inp._thousandsBound = true;
            const formatAndSetCursor = function () {
                const el = this;
                const raw = el.value;
                const selStart = el.selectionStart || 0;
                let left = raw.slice(0, selStart).replace(/[^0-9-]/g, '');
                const leftDigitsCount = (left[0] === '-' ? left.slice(1) : left).length;
                const formatted = formatWithDotsRaw(raw);
                el.value = formatted;
                let newPos = 0;
                let digitsSeen = 0;
                for (let i = 0; i < formatted.length; i++) {
                    if (/\d/.test(formatted[i])) digitsSeen++;
                    newPos++;
                    if (digitsSeen >= leftDigitsCount) break;
                }
                try { el.setSelectionRange(newPos, newPos); } catch (e) { }
            };
            inp.addEventListener('input', formatAndSetCursor);
            inp.addEventListener('blur', function () {
                const v = this.value;
                if (v === '' || v === '-') {
                    this.value = '';
                    return;
                }
                const num = parseNumberInput(v);
                this.value = num === 0 ? '' : formatWithDotsRaw(num);
                this.dispatchEvent(new Event('change', { bubbles: true }));
            });
            inp.addEventListener('keydown', function (e) {
                const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Tab', 'Home', 'End'];
                if (e.ctrlKey || e.metaKey) return;
                if (allowed.indexOf(e.key) !== -1) return;
                if (e.key >= '0' && e.key <= '9') return;
                if (e.key === '-' || e.key === '.' || e.key === ',') return;
                e.preventDefault();
            });
            inp.addEventListener('paste', function (e) {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
                const cleanedChunk = formatWithDotsRaw(text);
                const start = this.selectionStart || 0;
                const end = this.selectionEnd || start;
                const before = this.value.slice(0, start);
                const after = this.value.slice(end);
                const nextRaw = before + cleanedChunk + after;
                const next = formatWithDotsRaw(nextRaw);
                this.value = next;
                const caretTargetDigits = (before + cleanedChunk).replace(/[^0-9]/g, '').length;
                let pos = 0, seen = 0;
                while (pos < next.length && seen < caretTargetDigits) {
                    if (/\d/.test(next[pos])) seen++;
                    pos++;
                }
                try { this.setSelectionRange(pos, pos); } catch (e) { }
                this.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });
    }
    function saveShipQuantities() {
        try {
            const qtyMap = {};
            document.querySelectorAll('input[data-id]').forEach(inp => {
                qtyMap[inp.dataset.id] = parseNumberInput(inp.value);
            });
            localStorage.setItem(KEYS.SHIP_QTY, JSON.stringify(qtyMap));
        } catch (e) { }
    }
    function getSumAllTabsMetalValue() {
        let total = 0;
        try {
            const sumB = parseNumberInput(document.getElementById('sumTotalMetalB')?.textContent) || 0;
            const sumR = parseNumberInput(document.getElementById('sumTotalMetalR')?.textContent) || 0;
            const sumLfB = parseNumberInput(document.getElementById('sumTotalMetalLfB')?.textContent) || 0;
            const sumLfR = parseNumberInput(document.getElementById('sumTotalMetalLfR')?.textContent) || 0;
            const sumFleet = parseNumberInput(document.getElementById('totalMetalEq')?.textContent) || 0;
            total = sumB + sumR + sumLfB + sumLfR + sumFleet;
        } catch (e) { }
        return total;
    }
    let __inputsHandlersAttached = false;
    function attachInputsHandlers() {
        if (__inputsHandlersAttached) return;
        __inputsHandlersAttached = true;
        const debouncedRecalcBuildings = debounce(() => {
            if (getActiveTab() === 'buildings') recalcAllBuildings();
        }, 120);
        const debouncedRecalcResearch = debounce(() => {
            if (getActiveTab() === 'research') recalcAllResearch();
        }, 120);
        const debouncedComputeFleet = debounce(() => {
            if (getActiveTab() === 'fleet') computeFleet();
        }, 120);
        const debouncedRecalcLfBuildings = debounce(() => {
            if (getActiveTab() === 'lifeforms') recalcAllLfBuildings();
        }, 120);
        const debouncedRecalcLfResearch = debounce(() => {
            if (getActiveTab() === 'lifeforms') recalcAllLfResearch();
        }, 120);
        document.getElementById('sumAllTabsCheckbox')?.addEventListener('change', (e) => {
            isSumAllTabsMode = e.target.checked;
            try { localStorage.setItem(KEYS.SUM_ALL_TABS, String(isSumAllTabsMode)); } catch (e) { }
            updateBoxesNeeded();
        });
        const tbodyB = document.getElementById('tbodyBuildings');
        if (tbodyB) {
            tbodyB.addEventListener('input', e => {
                const t = e.target;
                if (!(t.matches('.lvl-input') || t.matches('.planet-input'))) return;
                debouncedRecalcBuildings();
                try {
                    const rows = Array.from(tbodyB.querySelectorAll('tr')).map(tr => {
                        return {
                            from: parseNumberInput(tr.querySelector('input[data-type="from"]')?.value),
                            to: parseNumberInput(tr.querySelector('input[data-type="to"]')?.value),
                            planets: parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1
                        };
                    });
                    localStorage.setItem(KEYS.INPUTS_BUILD, JSON.stringify(rows));
                } catch (e) { }
            });
            tbodyB.addEventListener('change', () => debouncedRecalcBuildings());
        }
        const tbodyR = document.getElementById('tbodyResearch');
        if (tbodyR) {
            tbodyR.addEventListener('input', e => {
                const t = e.target;
                if (!t.matches('.lvl-input')) return;
                debouncedRecalcResearch();
                try {
                    const rows = Array.from(tbodyR.querySelectorAll('tr')).map(tr => {
                        return {
                            from: parseNumberInput(tr.querySelector('input[data-type="from"]')?.value),
                            to: parseNumberInput(tr.querySelector('input[data-type="to"]')?.value)
                        };
                    });
                    localStorage.setItem(KEYS.INPUTS_RESEARCH, JSON.stringify(rows));
                } catch (e) { }
            });
            tbodyR.addEventListener('change', () => debouncedRecalcResearch());
        }
        const tmEl = document.getElementById('tmInput');
        if (tmEl) {
            tmEl.addEventListener('input', () => debouncedRecalcResearch());
            tmEl.addEventListener('blur', () => debouncedRecalcResearch());
            tmEl.addEventListener('change', () => {
                try { localStorage.setItem(KEYS.TM, tmEl.value); } catch (e) { }
            });
        }
        const fleetInputs = ['boxesCount', 'boxValue', 'planetMetal', 'planetCrystal', 'planetDeut'];
        fleetInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => {
                    if (getActiveTab() === 'fleet') computeFleet();
                    updateBoxesNeeded();
                });
            }
        });
        ['tbodyLfBuildings', 'tbodyLfResearch'].forEach(id => {
            const tbody = document.getElementById(id);
            if (tbody) {
                tbody.addEventListener('input', e => {
                    const t = e.target;
                    if (!t.matches('.lvl-input') && !t.matches('.planet-input')) return;
                    if (id === 'tbodyLfBuildings') debouncedRecalcLfBuildings();
                    else debouncedRecalcLfResearch();
                    persistLfInputs();
                });
                tbody.addEventListener('change', () => {
                    if (id === 'tbodyLfBuildings') debouncedRecalcLfBuildings(); else debouncedRecalcLfResearch();
                    persistLfInputs();
                });
            }
        });
        const sel = document.getElementById('lifeformSelect');
        if (sel) {
            sel.addEventListener('change', (e) => {
                currentLifeformRace = e.target.value;
                try { localStorage.setItem(KEYS.LF_RACE, currentLifeformRace); } catch (e) { }
                updateLfBonusesVisibility(currentLifeformRace);
                buildRowsLfBuildings();
                buildRowsLfResearch();
                attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');
                recalcAllLfBuildings();
                recalcAllLfResearch();
                updateBoxesNeeded();
            });
        }
        BONUS_INPUT_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const handler = () => {
                    if (['humansLevel', 'mechasLevel', 'kaeleshLevel'].includes(id)) {
                        recalcAllLfResearch();
                    } else if (id === 'megalithLevel' || id === 'mrcLevel') {
                        recalcAllLfBuildings(); recalcAllBuildings();
                    } else if (id === 'runoLevel') {
                        recalcAllLfResearch();
                    }
                    updateBoxesNeeded();
                    try {
                        localStorage.setItem(`og_calc_${id}`, String(parseNumberInput(el.value)));
                    } catch (e) { }
                };
                el.addEventListener('input', handler);
                el.addEventListener('change', handler);
                el.addEventListener('blur', handler);
            }
        });
        document.querySelectorAll('#tabsLeft .tab-btn').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                document.querySelectorAll('#tabsLeft .tab-btn').forEach(b => {
                    b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); b.setAttribute('tabindex', '-1');
                });
                btn.classList.add('active'); btn.setAttribute('aria-selected', 'true'); btn.setAttribute('tabindex', '0');
                document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
                const tab = btn.dataset.tab;
                setActiveTab(tab);
                ensureProperPositioning();
            });
        });
        document.querySelectorAll('.lf-subtab-btn').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const subtab = btn.dataset.subtab;
                document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('lf-buildings').classList.toggle('active', subtab === 'lf-buildings');
                document.getElementById('lf-research').classList.toggle('active', subtab === 'lf-research');
                if (subtab === 'lf-buildings') recalcAllLfBuildings();
                else recalcAllLfResearch();
                updateBoxesNeeded();
                try { localStorage.setItem('og_calc_active_lf_subtab_v1', subtab); } catch (e) { }
            });
        });
        const langToggle = document.getElementById('langToggle');
        const langDropdownMenu = document.getElementById('langDropdownMenu');
        const currentLangEl = document.getElementById('currentLang');
        if (langToggle && langDropdownMenu) {
            const availableLangs = Object.keys(LANG_BUILDINGS);
            langDropdownMenu.innerHTML = '';
            availableLangs.forEach(langCode => {
                const option = document.createElement('div');
                option.className = 'lang-option';
                option.dataset.lang = langCode;
                const iconImg = document.createElement('img');
                iconImg.src = LANGUAGE_ICONS[langCode] || 'images/languages/unknown.png';
                iconImg.alt = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
                iconImg.className = 'lang-icon-img';
                iconImg.style.width = '18px';
                iconImg.style.height = '18px';
                iconImg.style.verticalAlign = 'middle';
                iconImg.style.marginRight = '6px';
                const textSpan = document.createElement('span');
                textSpan.className = 'lang-text';
                textSpan.textContent = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
                option.appendChild(iconImg);
                option.appendChild(textSpan);
                langDropdownMenu.appendChild(option);
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    applyLang(langCode);
                    langDropdownMenu.style.display = 'none';
                    currentLangEl.innerHTML = '';
                    const newIconImg = document.createElement('img');
                    newIconImg.src = LANGUAGE_ICONS[langCode] || 'images/languages/unknown.png';
                    newIconImg.alt = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
                    newIconImg.className = 'lang-icon-img';
                    newIconImg.style.width = '18px';
                    newIconImg.style.height = '18px';
                    newIconImg.style.verticalAlign = 'middle';
                    newIconImg.style.marginRight = '4px';
                    const newTextSpan = document.createElement('span');
                    newTextSpan.className = 'lang-text';
                    newTextSpan.textContent = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
                    currentLangEl.appendChild(newIconImg);
                    currentLangEl.appendChild(newTextSpan);
                });
            });
            const currentLang = localStorage.getItem(KEYS.LANG) || 'ru';
            if (currentLangEl) {
                currentLangEl.innerHTML = '';
                const iconImg = document.createElement('img');
                iconImg.src = LANGUAGE_ICONS[currentLang] || 'images/languages/unknown.png';
                iconImg.alt = LANGUAGE_NAMES[currentLang] || currentLang.toUpperCase();
                iconImg.className = 'lang-icon-img';
                iconImg.style.width = '18px';
                iconImg.style.height = '18px';
                iconImg.style.verticalAlign = 'middle';
                iconImg.style.marginRight = '4px';
                const textSpan = document.createElement('span');
                textSpan.className = 'lang-text';
                textSpan.textContent = LANGUAGE_NAMES[currentLang] || currentLang.toUpperCase();
                currentLangEl.appendChild(iconImg);
                currentLangEl.appendChild(textSpan);
            }
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                langDropdownMenu.style.display = langDropdownMenu.style.display === 'flex' ? 'none' : 'flex';
            });
            document.addEventListener('click', (e) => {
                if (!langDropdownMenu.contains(e.target) && e.target !== langToggle) langDropdownMenu.style.display = 'none';
            });
        }
    }
    function attachBonusInputHandlers() {
        BONUS_INPUT_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (el && !el._bonusBound) {
                const handler = () => {
                    if (['humansLevel', 'mechasLevel', 'kaeleshLevel'].includes(id)) {
                        recalcAllLfResearch();
                    } else if (id === 'megalithLevel' || id === 'mrcLevel') {
                        recalcAllLfBuildings(); recalcAllBuildings();
                    } else if (id === 'runoLevel') {
                        recalcAllLfResearch();
                    }
                    updateBoxesNeeded();
                    try {
                        localStorage.setItem(`og_calc_${id}`, String(parseNumberInput(el.value)));
                    } catch (e) { }
                };
                el.addEventListener('input', handler);
                el.addEventListener('change', handler);
                el.addEventListener('blur', handler);
                el._bonusBound = true;
            }
        });
    }
    function persistLfInputs() {
        try {
            const buildRows = document.querySelectorAll('#tbodyLfBuildings tr');
            const researchRows = document.querySelectorAll('#tbodyLfResearch tr');
            const b = [], r = [];
            buildRows.forEach((tr, i) => {
                const from = parseNumberInput(tr.querySelector('input[data-type="from"]')?.value);
                const to = parseNumberInput(tr.querySelector('input[data-type="to"]')?.value);
                const planets = parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1;
                b[i] = { from, to, planets };
            });
            researchRows.forEach((tr, i) => {
                const from = parseNumberInput(tr.querySelector('input[data-type="from"]')?.value);
                const to = parseNumberInput(tr.querySelector('input[data-type="to"]')?.value);
                const planets = parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1;
                r[i] = { from, to, planets };
            });
            localStorage.setItem(KEYS.LF_INPUTS_BUILD, JSON.stringify(b));
            localStorage.setItem(KEYS.LF_INPUTS_RESEARCH, JSON.stringify(r));
        } catch (e) { }
    }
    function applyLang(lang) {
        if (!lang) return;
        const currentLang = localStorage.getItem(KEYS.LANG) || 'ru';
        if (currentLang === lang) return;
        try { localStorage.setItem(KEYS.LANG, lang); } catch (e) { }
        saveAllInputsBeforeSwitch();
        const dict = getLangDict(lang);
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) el.textContent = dict[key];
        });
        document.querySelectorAll("[data-i18n-ph]").forEach(el => {
            const key = el.getAttribute("data-i18n-ph");
            if (dict[key]) el.setAttribute("placeholder", dict[key]);
        });
        const lfSelect = document.getElementById('lifeformSelect');
        if (lfSelect) {
            const options = lfSelect.querySelectorAll('option');
            options.forEach(opt => {
                const key = opt.value;
                if (dict[key]) opt.textContent = dict[key];
            });
            if (dict.lfSelectLabel) lfSelect.setAttribute('aria-label', dict.lfSelectLabel);
        }
        const activeTab = getActiveTab();
        const activeLfSubtab = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
        buildRowsBuildings();
        buildRowsResearch();
        renderTable();
        buildRowsLfBuildings();
        buildRowsLfResearch();
        restoreAllInputsAfterSwitch();
        setActiveTab(activeTab);
        if (activeTab === 'lifeforms') {
            document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.lf-subtab-btn[data-subtab="${activeLfSubtab}"]`)?.classList.add('active');
            document.getElementById('lf-buildings').classList.toggle('active', activeLfSubtab === 'lf-buildings');
            document.getElementById('lf-research').classList.toggle('active', activeLfSubtab === 'lf-research');
        }
        attachLiveThousandsFormatting('#boxesCount, #boxValue, input[data-id]');
        attachLiveThousandsFormatting('#planetMetal, #planetCrystal, #planetDeut');
        attachInputsHandlers();
        recalcAllBuildings();
        recalcAllResearch();
        recalcAllLfBuildings();
        recalcAllLfResearch();
        computeFleet();
        updateBoxesNeeded();
        updateLfBonusesVisibility(currentLifeformRace);
        ensureProperPositioning();
    }
    function saveAllInputsBeforeSwitch() {
        try {
            const saveInputRows = (selector, key) => {
                const rows = document.querySelectorAll(selector);
                const data = [];
                rows.forEach(tr => {
                    data.push({
                        from: parseNumberInput(tr.querySelector('input[data-type="from"]')?.value),
                        to: parseNumberInput(tr.querySelector('input[data-type="to"]')?.value),
                        planets: parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1
                    });
                });
                localStorage.setItem(key, JSON.stringify(data));
            };
            saveInputRows('#tbodyBuildings tr', KEYS.INPUTS_BUILD);
            saveInputRows('#tbodyResearch tr', KEYS.INPUTS_RESEARCH);
            saveInputRows('#tbodyLfBuildings tr', KEYS.LF_INPUTS_BUILD);
            saveInputRows('#tbodyLfResearch tr', KEYS.LF_INPUTS_RESEARCH);
            saveShipQuantities();
            const boxes = {
                boxesCount: parseNumberInput(document.getElementById('boxesCount')?.value),
                boxValue: parseNumberInput(document.getElementById('boxValue')?.value),
                planetMetal: parseNumberInput(document.getElementById('planetMetal')?.value),
                planetCrystal: parseNumberInput(document.getElementById('planetCrystal')?.value),
                planetDeut: parseNumberInput(document.getElementById('planetDeut')?.value)
            };
            localStorage.setItem(KEYS.BOXES, JSON.stringify(boxes));
            const tmInput = document.getElementById('tmInput')?.value;
            if (tmInput !== undefined) localStorage.setItem(KEYS.TM, tmInput);
            BONUS_INPUT_IDS.forEach(id => {
                const el = document.getElementById(id);
                if (el) localStorage.setItem(`og_calc_${id}`, el.value);
            });
        } catch (e) { }
    }
    function restoreAllInputsAfterSwitch() {
        try {
            const restoreRows = (selector, key) => {
                const data = JSON.parse(localStorage.getItem(key) || 'null');
                if (!data) return;
                document.querySelectorAll(selector).forEach((tr, i) => {
                    if (data[i]) {
                        tr.querySelector('input[data-type="from"]').value = data[i].from ? String(Math.min(99, data[i].from)) : '';
                        tr.querySelector('input[data-type="to"]').value = data[i].to ? String(Math.min(99, data[i].to)) : '';
                        if (tr.querySelector('input[data-type="planets"]')) {
                            tr.querySelector('input[data-type="planets"]').value = data[i].planets ? formatWithDotsRaw(data[i].planets) : '1';
                        }
                    }
                });
            };
            restoreRows('#tbodyBuildings tr', KEYS.INPUTS_BUILD);
            restoreRows('#tbodyResearch tr', KEYS.INPUTS_RESEARCH);
            restoreRows('#tbodyLfBuildings tr', KEYS.LF_INPUTS_BUILD);
            restoreRows('#tbodyLfResearch tr', KEYS.LF_INPUTS_RESEARCH);
            const shipQty = JSON.parse(localStorage.getItem(KEYS.SHIP_QTY) || '{}');
            if (shipQty) {
                document.querySelectorAll('input[data-id]').forEach(inp => {
                    const v = shipQty[inp.dataset.id];
                    if (v) inp.value = formatWithDotsRaw(v);
                });
            }
            const boxes = JSON.parse(localStorage.getItem(KEYS.BOXES) || '{}');
            ['boxesCount', 'boxValue', 'planetMetal', 'planetCrystal', 'planetDeut'].forEach(id => {
                if (boxes[id]) document.getElementById(id).value = formatWithDotsRaw(boxes[id]);
            });
            const tmSaved = localStorage.getItem(KEYS.TM);
            if (tmSaved) document.getElementById('tmInput').value = tmSaved;
            BONUS_INPUT_IDS.forEach(id => {
                const saved = localStorage.getItem(`og_calc_${id}`);
                if (saved !== null && document.getElementById(id)) document.getElementById(id).value = String(parseNumberInput(saved));
            });
        } catch (e) { }
    }
    function ensureProperPositioning() {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                positionTabs();
                setTimeout(() => {
                    const wrapper = document.getElementById('tableWrapper');
                    if (wrapper && (wrapper.getBoundingClientRect().width === 0 || wrapper.getBoundingClientRect().height === 0)) {
                        positionTabs();
                    }
                }, 100);
            });
        });
    }
    function restoreFromStorage() {
        try {
            buildRowsBuildings();
            buildRowsResearch();
            buildRowsLfBuildings();
            buildRowsLfResearch();
            renderTable();
            const inputsBuild = JSON.parse(localStorage.getItem(KEYS.INPUTS_BUILD) || 'null');
            if (inputsBuild) {
                const trs = document.getElementById('tbodyBuildings')?.querySelectorAll('tr') || [];
                trs.forEach((tr, i) => {
                    if (inputsBuild[i]) {
                        tr.querySelector('input[data-type="from"]').value = inputsBuild[i].from ? String(Math.min(99, inputsBuild[i].from)) : '';
                        tr.querySelector('input[data-type="to"]').value = inputsBuild[i].to ? String(Math.min(99, inputsBuild[i].to)) : '';
                        tr.querySelector('input[data-type="planets"]').value = inputsBuild[i].planets ? formatWithDotsRaw(inputsBuild[i].planets) : '1';
                    }
                });
            }
            const inputsResearch = JSON.parse(localStorage.getItem(KEYS.INPUTS_RESEARCH) || 'null');
            if (inputsResearch) {
                const trs = document.getElementById('tbodyResearch')?.querySelectorAll('tr') || [];
                trs.forEach((tr, i) => {
                    if (inputsResearch[i]) {
                        tr.querySelector('input[data-type="from"]').value = inputsResearch[i].from ? String(Math.min(99, inputsResearch[i].from)) : '';
                        tr.querySelector('input[data-type="to"]').value = inputsResearch[i].to ? String(Math.min(99, inputsResearch[i].to)) : '';
                    }
                });
            }
            const savedRace = localStorage.getItem(KEYS.LF_RACE) || 'humans';
            currentLifeformRace = savedRace;
            const lfSel = document.getElementById('lifeformSelect');
            if (lfSel) lfSel.value = savedRace;
            const bonusesEl = document.getElementById('lfBonuses');
            if (bonusesEl) {
                bonusesEl.innerHTML = '';
                updateLfBonusesVisibility(savedRace);
            }
            const lfInputsBuild = JSON.parse(localStorage.getItem(KEYS.LF_INPUTS_BUILD) || 'null');
            if (lfInputsBuild) {
                document.querySelectorAll('#tbodyLfBuildings tr').forEach((tr, i) => {
                    if (lfInputsBuild[i]) {
                        tr.querySelector('input[data-type="from"]').value = lfInputsBuild[i].from ? String(Math.min(99, lfInputsBuild[i].from)) : '';
                        tr.querySelector('input[data-type="to"]').value = lfInputsBuild[i].to ? String(Math.min(99, lfInputsBuild[i].to)) : '';
                        tr.querySelector('input[data-type="planets"]').value = lfInputsBuild[i].planets ? formatWithDotsRaw(lfInputsBuild[i].planets) : '1';
                    }
                });
            }
            const lfInputsResearch = JSON.parse(localStorage.getItem(KEYS.LF_INPUTS_RESEARCH) || 'null');
            if (lfInputsResearch) {
                document.querySelectorAll('#tbodyLfResearch tr').forEach((tr, i) => {
                    if (lfInputsResearch[i]) {
                        tr.querySelector('input[data-type="from"]').value = lfInputsResearch[i].from ? String(Math.min(99, lfInputsResearch[i].from)) : '';
                        tr.querySelector('input[data-type="to"]').value = lfInputsResearch[i].to ? String(Math.min(99, lfInputsResearch[i].to)) : '';
                        tr.querySelector('input[data-type="planets"]').value = lfInputsResearch[i].planets ? formatWithDotsRaw(lfInputsResearch[i].planets) : '1';
                    }
                });
            }
            const boxes = JSON.parse(localStorage.getItem(KEYS.BOXES) || '{}');
            if (boxes) {
                if (boxes.boxesCount) document.getElementById('boxesCount').value = formatWithDotsRaw(boxes.boxesCount);
                if (boxes.boxValue) document.getElementById('boxValue').value = formatWithDotsRaw(boxes.boxValue);
                if (boxes.planetMetal) document.getElementById('planetMetal').value = formatWithDotsRaw(boxes.planetMetal);
                if (boxes.planetCrystal) document.getElementById('planetCrystal').value = formatWithDotsRaw(boxes.planetCrystal);
                if (boxes.planetDeut) document.getElementById('planetDeut').value = formatWithDotsRaw(boxes.planetDeut);
            }
            const tmSaved = localStorage.getItem(KEYS.TM);
            if (tmSaved) document.getElementById('tmInput').value = tmSaved;
            const shipQty = JSON.parse(localStorage.getItem(KEYS.SHIP_QTY) || '{}');
            if (shipQty) {
                document.querySelectorAll('input[data-id]').forEach(inp => {
                    const v = shipQty[inp.dataset.id];
                    if (v) inp.value = formatWithDotsRaw(v);
                });
            }
            BONUS_INPUT_IDS.forEach(id => {
                const saved = localStorage.getItem(`og_calc_${id}`);
                if (saved !== null && document.getElementById(id)) document.getElementById(id).value = String(parseNumberInput(saved));
            });
            try {
                const savedSumAllTabs = localStorage.getItem(KEYS.SUM_ALL_TABS);
                if (savedSumAllTabs !== null) {
                    isSumAllTabsMode = savedSumAllTabs === 'true';
                    const checkbox = document.getElementById('sumAllTabsCheckbox');
                    if (checkbox) checkbox.checked = isSumAllTabsMode;
                }
            } catch (e) { }
            const trf = JSON.parse(localStorage.getItem(KEYS.TRANSFORM) || 'null');
            if (trf) {
                window.scale = trf.scale || 1;
                window.posX = trf.posX || 0;
                window.posY = trf.posY || 0;
                const wrapper = document.getElementById('tableWrapper');
                if (wrapper) {
                    wrapper.style.transform = `translate(${Math.round(window.posX)}px, ${Math.round(window.posY)}px) scale(${window.scale})`;
                }
            } else {
                window.scale = 1;
                window.posX = 0;
                window.posY = 0;
            }
        } catch (e) { }
    }
    function centerWrapper() {
        const wrapperEl = document.getElementById('tableWrapper');
        if (!wrapperEl) return;
        window.scale = 1;
        wrapperEl.style.transform = 'none';
        const rect = wrapperEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        window.posX = Math.round((viewportWidth - rect.width) / 2);
        window.posY = Math.round((viewportHeight - rect.height) / 2);
        wrapperEl.style.transform = `translate(${window.posX}px, ${window.posY}px) scale(${window.scale})`;
        wrapperEl.style.willChange = 'transform';
        try {
            localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({
                scale: window.scale,
                posX: window.posX,
                posY: window.posY
            }));
        } catch (e) { }
        positionTabs();
    }
    function resetAndCenter() {
        fullResetToZero();
        centerWrapper();
    }
    function fullResetToZero() {
        try {
            Object.values(KEYS).forEach(k => localStorage.removeItem(k));
            BONUS_INPUT_IDS.forEach(id => localStorage.removeItem(`og_calc_${id}`));
            localStorage.removeItem(KEYS.SUM_ALL_TABS);
            isSumAllTabsMode = false;
            const checkbox = document.getElementById('sumAllTabsCheckbox');
            if (checkbox) checkbox.checked = false;
            document.querySelectorAll("input").forEach(i => { i.value = ''; });
            BONUS_INPUT_IDS.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            buildRowsBuildings();
            buildRowsResearch();
            buildRowsLfBuildings();
            buildRowsLfResearch();
            renderTable();
            recalcAllBuildings();
            recalcAllResearch();
            recalcAllLfBuildings();
            recalcAllLfResearch();
            computeFleet();
            ['sumPointsB', 'sumPointsR', 'sumPointsLfB', 'sumPointsLfR', 'totalMetalEq', 'grandTotal'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = '0';
            });
            const totalResEl = document.getElementById('totalRes');
            const lang = localStorage.getItem(KEYS.LANG) || 'ru';
            const dict = getLangDict(lang);
            if (totalResEl) {
                totalResEl.innerHTML = '';
                totalResEl.appendChild(formatSpanMetal(0));
                totalResEl.appendChild(document.createTextNode(` ${dict.metal}, `));
                totalResEl.appendChild(formatSpanCrystal(0));
                totalResEl.appendChild(document.createTextNode(` ${dict.crystal}, `));
                totalResEl.appendChild(formatSpanDeut(0));
                totalResEl.appendChild(document.createTextNode(` ${dict.deut}`));
            };
            document.getElementById('boxesNeeded').textContent = '—';
            document.getElementById('boxesCostTL').innerHTML = '<span class="try-value">TRY: —</span>';
            document.getElementById('leftoverTmValue').textContent = '—';
        } catch (e) { }
    }
    function positionTabs() {
        try {
            const tabsLeftEl = document.getElementById('tabsLeft');
            const headerBarEl = document.getElementById('headerBar');
            const wrapperEl = document.getElementById('tableWrapper');
            if (!tabsLeftEl || !headerBarEl || !wrapperEl) return;
            const boxRow = document.getElementById('globalBoxRow') || headerBarEl;
            const wrapperRect = wrapperEl.getBoundingClientRect();
            const targetRect = boxRow.getBoundingClientRect();
            const offsetWithinWrapper = targetRect.top - wrapperRect.top;
            tabsLeftEl.style.top = `${Math.max(0, Math.round(offsetWithinWrapper - 2))}px`;
        } catch (e) { }
    }
    function updateBoxesNeeded() {
        try {
            const boxesNeededEl = document.getElementById('boxesNeeded');
            const boxValueInput = document.getElementById('boxValue');
            const boxValue = parseNumberInput(boxValueInput?.value || '');
            if (!boxValue || boxValue <= 0) {
                boxesNeededEl && (boxesNeededEl.textContent = '—');
                document.getElementById('boxesCostTL').innerHTML = '<span class="try-value">TRY: —</span>';
                document.getElementById('leftoverTmValue').textContent = '—';
                return;
            }
            const targetMetal = isSumAllTabsMode ? getSumAllTabsMetalValue() : getCurrentTotalMetalValue();
            const needed = Math.ceil(targetMetal / boxValue);
            boxesNeededEl && (boxesNeededEl.textContent = formatWithDotsRaw(needed));
            updateBoxesCostTL(targetMetal);
        } catch (e) { }
    }
    function updateBoxesCostTL(targetMetal = null) {
        try {
            const boxesCostTLEl = document.getElementById('boxesCostTL');
            const leftoverTmValueEl = document.getElementById('leftoverTmValue');
            const boxValueInput = document.getElementById('boxValue');
            if (!boxesCostTLEl) return;
            const boxValue = parseNumberInput(boxValueInput?.value || '');
            if (boxValue <= 0) {
                boxesCostTLEl.innerHTML = '<span class="try-value">TRY: —</span>';
                leftoverTmValueEl && (leftoverTmValueEl.textContent = '—');
                return;
            }
            if (targetMetal === null) {
                targetMetal = isSumAllTabsMode ? getSumAllTabsMetalValue() : getCurrentTotalMetalValue();
            }
            if (!Number.isFinite(targetMetal) || targetMetal <= 0) {
                boxesCostTLEl.innerHTML = '<span class="try-value">TRY: 0</span>';
                leftoverTmValueEl && (leftoverTmValueEl.textContent = '0');
                return;
            }
            const neededBoxesRaw = Math.ceil(targetMetal / boxValue);
            const MAX_ALLOWED_BOXES = 1e9;
            if (neededBoxesRaw > MAX_ALLOWED_BOXES) {
                boxesCostTLEl.innerHTML = '<span class="try-value">TRY: —</span>';
                leftoverTmValueEl && (leftoverTmValueEl.textContent = '—');
                return;
            }
            const requiredTM = neededBoxesRaw * CONFIG.TM_PER_BOX;
            const pack = (CONFIG.TM_PACKS && CONFIG.TM_PACKS[0]) || null;
            const packTm = pack?.tm || 0;
            const packPriceTRY = pack?.priceTRY || 0;
            if (packTm <= 0 || packPriceTRY <= 0) {
                boxesCostTLEl.innerHTML = '<span class="try-value">TRY: —</span>';
                leftoverTmValueEl && (leftoverTmValueEl.textContent = '—');
                return;
            }
            const packsCount = Math.max(1, Math.ceil(requiredTM / packTm));
            const totalTRY = packsCount * packPriceTRY;
            const leftoverTM = packsCount * packTm - requiredTM;
            const tryValue = formatNumberWithDots(totalTRY);
            const bynValue = formatNumberWithDots(Math.round(totalTRY / 12.35));
            boxesCostTLEl.innerHTML = `<span class="try-value">TRY: ${tryValue} / BYN: ${bynValue}</span>`;
            leftoverTmValueEl && (leftoverTmValueEl.textContent = leftoverTM > 0 ? formatWithDotsRaw(leftoverTM) : '0');
        } catch (e) { }
    }
    function getCurrentTotalMetalValue() {
        try {
            const active = document.querySelector('.tab-btn.active')?.dataset.tab;
            if (active === 'research') return parseNumberInput(document.getElementById('sumTotalMetalR')?.textContent);
            if (active === 'fleet') return parseNumberInput(document.getElementById('totalMetalEq')?.textContent);
            if (active === 'lifeforms') {
                const activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
                return parseNumberInput(document.getElementById(activeSub === 'lf-buildings' ? 'sumTotalMetalLfB' : 'sumTotalMetalLfR')?.textContent);
            }
            return parseNumberInput(document.getElementById('sumTotalMetalB')?.textContent);
        } catch (e) { return 0; }
    }
    function setActiveTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(b => {
            const isActive = (b.dataset.tab === tab);
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
            b.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        document.getElementById('tabBuildings')?.classList.toggle('active', tab === 'buildings');
        document.getElementById('tabResearch')?.classList.toggle('active', tab === 'research');
        document.getElementById('tabFleet')?.classList.toggle('active', tab === 'fleet');
        document.getElementById('tabLifeforms')?.classList.toggle('active', tab === 'lifeforms');
        if (tab === 'fleet') {
            const fleetDelivery = document.getElementById('fleetDelivery');
            if (fleetDelivery) fleetDelivery.style.display = 'flex';
            renderTable();
            computeFleet();
        } else {
            const fleetDelivery = document.getElementById('fleetDelivery');
            if (fleetDelivery) fleetDelivery.style.display = 'none';
            if (tab === 'buildings') recalcAllBuildings();
            else if (tab === 'research') recalcAllResearch();
            else if (tab === 'lifeforms') {
                persistLfInputs();
                let activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
                if (!document.querySelector(`.lf-subtab-btn[data-subtab="${activeSub}"]`)) activeSub = 'lf-buildings';
                document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector(`.lf-subtab-btn[data-subtab="${activeSub}"]`)?.classList.add('active');
                document.getElementById('lf-buildings').classList.toggle('active', activeSub === 'lf-buildings');
                document.getElementById('lf-research').classList.toggle('active', activeSub === 'lf-research');
                buildRowsLfBuildings();
                buildRowsLfResearch();
                restoreAllInputsAfterSwitch();
                attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');
                recalcAllLfBuildings();
                recalcAllLfResearch();
            }
        }
        updateBoxesNeeded();
        try { localStorage.setItem(KEYS.ACTIVE_TAB, tab); } catch (e) { }
    }
    (function initDraggableWrapper() {
        const dragHandle = document.getElementById('dragHandle');
        const wrapper = document.getElementById('tableWrapper');
        if (!dragHandle || !wrapper) return;
        let isDragging = false, startX = 0, startY = 0, startPosX = 0, startPosY = 0;
        dragHandle.style.touchAction = 'none';
        dragHandle.style.cursor = 'grab';
        dragHandle.addEventListener('pointerdown', (ev) => {
            ev.preventDefault();
            isDragging = true;
            startX = ev.clientX; startY = ev.clientY;
            startPosX = window.posX || 0; startPosY = window.posY || 0;
            try { dragHandle.setPointerCapture(ev.pointerId); } catch { }
            dragHandle.style.cursor = 'grabbing';
        });
        document.addEventListener('pointermove', (ev) => {
            if (!isDragging) return;
            ev.preventDefault();
            const dx = (ev.clientX - startX) / (window.scale || 1);
            const dy = (ev.clientY - startY) / (window.scale || 1);
            window.posX = startPosX + dx;
            window.posY = startPosY + dy;
            wrapper.style.transform = `translate(${Math.round(window.posX)}px, ${Math.round(window.posY)}px) scale(${window.scale || 1})`;
            wrapper.style.willChange = 'transform';
        });
        const stopDrag = (ev) => {
            if (!isDragging) return;
            isDragging = false;
            try { dragHandle.releasePointerCapture(ev.pointerId); } catch (e) { }
            dragHandle.style.cursor = 'grab';
            try {
                localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({
                    scale: window.scale || 1,
                    posX: window.posX || 0,
                    posY: window.posY || 0
                }));
            } catch (e) { }
            positionTabs();
        };
        document.addEventListener('pointerup', stopDrag);
        document.addEventListener('pointercancel', stopDrag);
    })();
    function initApp() {
        try {
            attachLiveThousandsFormatting('#boxesCount, #boxValue, input[data-id]');
            attachLiveThousandsFormatting('#planetMetal, #planetCrystal, #planetDeut');
            ['planetMetal', 'planetCrystal', 'planetDeut'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const handler = () => {
                        computeFleet();
                        try {
                            const boxes = JSON.parse(localStorage.getItem(KEYS.BOXES) || '{}');
                            boxes[id] = parseNumberInput(el.value);
                            localStorage.setItem(KEYS.BOXES, JSON.stringify(boxes));
                        } catch (e) { }
                    };
                    el.addEventListener('input', handler);
                    el.addEventListener('change', handler);
                    el.addEventListener('blur', handler);
                }
            });
            attachLvlInputHandlers();
            attachInputsHandlers();
            restoreFromStorage();
            document.getElementById('globalZoomIn')?.addEventListener('click', () => {
                window.scale = Math.min(3.5, (window.scale || 1) * 1.1);
                const wrapper = document.getElementById('tableWrapper');
                if (wrapper) wrapper.style.transform = `translate(${Math.round(window.posX)}px, ${Math.round(window.posY)}px) scale(${window.scale})`;
                try { localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale, posX: window.posX, posY: window.posY })); } catch (e) { }
                positionTabs();
            });
            document.getElementById('globalZoomOut')?.addEventListener('click', () => {
                window.scale = Math.max(0.3, (window.scale || 1) / 1.1);
                const wrapper = document.getElementById('tableWrapper');
                if (wrapper) wrapper.style.transform = `translate(${Math.round(window.posX)}px, ${Math.round(window.posY)}px) scale(${window.scale})`;
                try { localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale, posX: window.posX, posY: window.posY })); } catch (e) { }
                positionTabs();
            });
            document.getElementById('globalZoomReset')?.addEventListener('click', resetAndCenter);
            window.addEventListener('resize', () => {
                positionTabs();
                ensureProperPositioning();
            });
            const savedLang = localStorage.getItem(KEYS.LANG) || 'ru';
            applyLang(savedLang);
            const savedTab = localStorage.getItem(KEYS.ACTIVE_TAB) || 'buildings';
            setActiveTab(savedTab);
            const savedLfSubtab = localStorage.getItem('og_calc_active_lf_subtab_v1') || 'lf-buildings';
            document.querySelectorAll('.lf-subtab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.subtab === savedLfSubtab);
            });
            document.getElementById('lf-buildings').classList.toggle('active', savedLfSubtab === 'lf-buildings');
            document.getElementById('lf-research').classList.toggle('active', savedLfSubtab === 'lf-research');
            const savedSumAllTabs = localStorage.getItem(KEYS.SUM_ALL_TABS);
            if (savedSumAllTabs !== null) {
                isSumAllTabsMode = savedSumAllTabs === 'true';
                const checkbox = document.getElementById('sumAllTabsCheckbox');
                if (checkbox) checkbox.checked = isSumAllTabsMode;
            }
            setTimeout(() => {
                const trf = JSON.parse(localStorage.getItem(KEYS.TRANSFORM) || 'null');
                if (!trf) centerWrapper();
            }, 100);
        } catch (e) { }
    }
    if (document.readyState !== 'loading') initApp();
    else document.addEventListener('DOMContentLoaded', initApp);
})();