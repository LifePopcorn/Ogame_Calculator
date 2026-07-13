(function () {
'use strict';
const LANGUAGE_ICONS = {
en: 'images/languages/en.png', ru: 'images/languages/ru.png',
de: 'images/languages/de.png', pl: 'images/languages/pl.png',
es: 'images/languages/es.png', fr: 'images/languages/fr.png',
it: 'images/languages/it.png', nl: 'images/languages/nl.png',
sk: 'images/languages/sk.png', tr: 'images/languages/tr.png',
pt: 'images/languages/pt.png', bs: 'images/languages/bs.png'
};
const LANGUAGE_NAMES = {
en: 'English', ru: 'Russian', de: 'Deutsch', pl: 'Polski',
es: 'Español', fr: 'Français', it: 'Italiano', nl: 'Nederlands',
sk: 'Slovenčina', tr: 'Türkçe', pt: 'Português', bs: 'Bosnian'
};
const CONFIG = {
TM_PER_BOX: 42000,
TM_PACKS: [{ tm: 12500000, priceTRY: 900 }],
METAL_EQ_CRYSTAL: 1.5,
METAL_EQ_DEUT: 3,
TRY_TO_BYN_RATE: 16.01,
CURRENCY_RATES: { BYN: 1, RUB: 23.5, USD: 0.31, EUR: 0.28, TRY: 16.01 },
MAX_LEVEL_SPAN: 1000,
TM_PER_LEVEL_FACTOR: 2
};
const KEYS = {
LANG: 'og_calc_lang_v2',
TRANSFORM: 'og_calc_transform_v2',
INPUTS_BUILD: 'og_calc_inputs_build_v2',
INPUTS_RESEARCH: 'og_calc_inputs_research_v2',
INPUTS_MOON_BUILD: 'og_calc_inputs_moon_build_v2',
TM: 'og_calc_tm_v2',
BOXES: 'og_calc_boxes_v2',
SHIP_QTY: 'og_calc_ship_qty_v2',
ACTIVE_TAB: 'og_calc_active_tab_v2',
LF_INPUTS_BUILD: 'og_calc_lf_inputs_build_v1',
LF_INPUTS_RESEARCH: 'og_calc_inputs_research_v1',
LF_RACE: 'og_calc_lf_race_v1',
ROCKTAL_MEGALITH_LEVEL: 'og_calc_rocktal_megalith_level',
ROCKTAL_MRC_LEVEL: 'og_calc_rocktal_mrc_level',
ROCKTAL_RUNO_LEVEL: 'og_calc_rocktal_runo_level',
SUM_ALL_TABS: 'og_calc_sum_all_tabs',
LF_TOTALS: 'og_calc_lf_totals_v1',
CURRENCY: 'og_calc_currency_v1',
BASE_CURRENCY: 'og_calc_base_currency_v1'
};
const IMAGES_ROOT_PATH = 'images/';
const IMAGES_BUILDINGS_PATH = 'images/buildings/';
const IMAGES_RESEARCH_PATH = 'images/research/';
const IMAGES_SHIPS_PATH = 'images/ships/';
const MRC_REDUCABLE_IDS = new Set([1, 2, 3, 4, 12]);
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
3108: [160000, 12000, 50000, 0, 6000, 1.5, 1.5, 1.5, 0, 1.4],
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
const LF_TECH_COSTS = TECH_COSTS_LF;
const BUILDINGS_DATA = [
{ base: { m: 60, c: 15, d: 0 }, factor: 1.5 },
{ base: { m: 48, c: 24, d: 0 }, factor: 1.6 },
{ base: { m: 225, c: 75, d: 0 }, factor: 1.5 },
{ base: { m: 75, c: 30, d: 0 }, factor: 1.5 },
{ base: { m: 900, c: 360, d: 180 }, factor: 1.8 },
{ base: { m: 400, c: 120, d: 200 }, factor: 2.0 },
{ base: { m: 1000000, c: 500000, d: 100000 }, factor: 2.0 },
{ base: { m: 400, c: 200, d: 100 }, factor: 2.0 },
{ base: { m: 1000, c: 0, d: 0 }, factor: 2.0 },
{ base: { m: 1000, c: 500, d: 0 }, factor: 2.0 },
{ base: { m: 1000, c: 1000, d: 0 }, factor: 2.0 },
{ base: { m: 200, c: 400, d: 200 }, factor: 2.0 },
{ base: { m: 0, c: 50000, d: 100000 }, factor: 2.0 },
{ base: { m: 20000, c: 40000, d: 0 }, factor: 2.0 },
{ base: { m: 200, c: 0, d: 50 }, factor: 5.0 },
{ base: { m: 20000, c: 20000, d: 1000 }, factor: 2.0 }
];
const MOON_BUILDINGS_DATA = [
{ id: 44, name: 'Фабрика роботов', base: { m: 400, c: 120, d: 200 }, factor: 2.0, img: 'robot_factory.png' },
{ id: 45, name: 'Верфь', base: { m: 400000, c: 200000, d: 100000 }, factor: 2.0, img: 'shipyard.png' },
{ id: 41, name: 'Лунная база', base: { m: 20000, c: 40000, d: 20000 }, factor: 2.0, img: 'lunar_base.png' },
{ id: 42, name: 'Сенсорная фаланга', base: { m: 20000, c: 40000, d: 20000 }, factor: 2.0, img: 'sensor_phalanx.png' },
{ id: 43, name: 'Ворота', base: { m: 2000000, c: 4000000, d: 2000000 }, factor: 2.0, img: 'jump_gate.png' }
];
const ICONS_BUILDINGS = [
'metal_mine.png', 'crystal_mine.png', 'deuterium_synth.png', 'solar_plant.png',
'fusion_plant.png', 'robot_factory.png', 'nanite_factory.png', 'shipyard.png',
'metal_storage.png', 'crystal_storage.png', 'deuterium_tank.png', 'research_lab.png',
'terraformer.png', 'alliance_depot.png', 'dock.png', 'missile_silo.png'
];
const MOON_BUILDINGS_ICONS = [
'robot_factory.png', 'shipyard.png', 'lunar_base.png', 'sensor_phalanx.png', 'jump_gate.png'
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
'spy.png', 'computer.png', 'weapons.png', 'shield.png', 'armor.png', 'energy.png',
'hyperspace.png', 'combustion.png', 'impulse.png', 'hyperdrive.png', 'laser.png',
'ion.png', 'plasma.png', 'irn.png', 'astro.png', 'graviton.png'
];
const shipList = [
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
const LF_BUILDING_FILENAMES = {
1001: 'residential_sector.png', 1002: 'biosphere_farm.png', 1003: 'research_center.png',
1004: 'science_academy.png', 1005: 'nerve_calibration_center.png', 1006: 'high_energy_melting.png',
1007: 'food_storage.png', 1008: 'fusion_powered_production.png', 1009: 'skyscraper.png',
1010: 'biotech_lab.png', 1011: 'metropolis.png', 1012: 'planetary_shield.png',
2001: 'meditation_enclave.png', 2002: 'crystal_farm.png', 2003: 'rune_technologium.png',
2004: 'rune_forge.png', 2005: 'orikterium.png', 2006: 'magma_forge.png',
2007: 'chamber_of_rupture.png', 2008: 'megalith.png', 2009: 'crystal_purification.png',
2010: 'deuterium_synthesizer.png', 2011: 'mineral_research_center.png', 2012: 'advanced_recycling_unit.png',
3001: 'assembly_line.png', 3002: 'fusion_cell_factory.png', 3003: 'robotics_research_center.png',
3004: 'upgrade_network.png', 3005: 'quantum_computer_center.png', 3006: 'automated_assembly_center.png',
3007: 'high_performance_transformer.png', 3008: 'microchip_line.png', 3009: 'production_assembly_workshop.png',
3010: 'high_performance_synthesizer.png', 3011: 'mass_chip_production.png', 3012: 'repair_nanobots.png',
4001: 'sanctuary.png', 4002: 'antimatter_condenser.png', 4003: 'cyclone_chamber.png',
4004: 'hall_of_realization.png', 4005: 'transcendental_forum.png', 4006: 'antimatter_converter.png',
4007: 'cloning_lab.png', 4008: 'chrysalis_accelerator.png', 4009: 'biomodifier.png',
4010: 'psionic_modulator.png', 4011: 'ship_production_hall.png', 4012: 'supra_refractor.png'
};
const LF_RESEARCH_FILENAMES = {
1101: 'intergalactic_envoys.png', 1102: 'high_efficiency_extractors.png', 1103: 'fusion_drives.png',
1104: 'stealth_field_generator.png', 1105: 'orbital_dock.png', 1106: 'research_ai.png',
1107: 'high_performance_terraformer.png', 1108: 'enhanced_extraction_technologies.png', 1109: 'light_fighter_mk_ii.png',
1110: 'cruiser_mk_ii.png', 1111: 'enhanced_laboratory_technology.png', 1112: 'plasma_terraformer.png',
1113: 'low_temperature_drives.png', 1114: 'bomber_mk_ii.png', 1115: 'destroyer_mk_ii.png',
1116: 'battlecruiser_mk_ii.png', 1117: 'assistant_robots.png', 1118: 'supercomputer.png',
2101: 'volcanic_batteries.png', 2102: 'acoustic_scanning.png', 2103: 'high_energy_supply_systems.png',
2104: 'cargo_hold_expansion.png', 2105: 'magma_powered_production.png', 2106: 'geothermal_power_plants.png',
2107: 'echo_sounding.png', 2108: 'ion_crystal_enhancement.png', 2109: 'enhanced_stellarator.png',
2110: 'reinforced_diamond_drills.png', 2111: 'seismic_extraction_technology.png', 2112: 'magma_powered_supply_systems.png',
2113: 'ionized_crystal_modules.png', 2114: 'optimized_mine_construction.png', 2115: 'diamond_energy_transmitter.png',
2116: 'obsidian_shield_plating.png', 2117: 'rune_shields.png', 2118: 'rocktal_collector_enhancement.png',
3101: 'catalyst_technology.png', 3102: 'plasma_drive.png', 3103: 'efficiency_module.png',
3104: 'warehouse_ai.png', 3105: 'general_repair_light_fighter.png', 3106: 'automated_transport_lines.png',
3107: 'enhanced_drone_ai.png', 3108: 'experimental_recycling_technology.png', 3109: 'general_repair_cruiser.png',
3110: 'gravitational_maneuver_autopilot.png', 3111: 'high_temperature_superconductors.png', 3112: 'general_repair_battleship.png',
3113: 'swarm_ai.png', 3114: 'general_repair_battlecruiser.png', 3115: 'general_repair_bomber.png',
3116: 'general_repair_destroyer.png', 3117: 'experimental_weapon_technology.png', 3118: 'mechas_overall_enhancement.png',
4101: 'waste_heat_recovery.png', 4102: 'sulfide_process.png', 4103: 'psionic_network.png',
4104: 'telekinetic_grab_beam.png', 4105: 'enhanced_sensor_technology.png', 4106: 'neuromodal_compressor.png',
4107: 'neuro_interface.png', 4108: 'interplanetary_analytical_network.png', 4109: 'speed_boost_heavy_fighter.png',
4110: 'telekinetic_drive.png', 4111: 'sixth_sense.png', 4112: 'psycho_harmonizer.png',
4113: 'efficient_swarm_intelligence.png', 4114: 'speed_boost_large_cargo.png', 4115: 'gravitational_sensors.png',
4116: 'speed_boost_battleship.png', 4117: 'psionic_shield_matrix.png', 4118: 'kaelesh_explorer_enhancement.png'
};
const BONUS_INPUT_IDS = ['megalithLevel', 'mrcLevel', 'runoLevel', 'humansLevel', 'mechasLevel', 'kaeleshLevel'];
let lfTotals = {
humans: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } },
rocktal: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } },
mechas: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } },
kaelesh: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } }
};
let isSumAllTabsMode = false;
let currentLifeformRace = localStorage.getItem(KEYS.LF_RACE) || 'humans';
const SETTINGS_KEY = 'og_calc_settings_v1';
const DEFAULT_SETTINGS = {
tmPerBox: 42000,
tmPackSize: 12500000,
packPriceTRY: 900,
rates: { BYN: 1, RUB: 23.5, USD: 0.31, EUR: 0.28, TRY: 16.01 }
};
let currentSettings = { ...DEFAULT_SETTINGS, rates: { ...DEFAULT_SETTINGS.rates } };
function parseSettingsNumber(v, fallback = 0) {
    if (v === null || v === undefined || v === '') return fallback;
    const str = String(v).trim();
    if (str === '') return fallback;
    const hasComma = str.includes(',');
    const hasDot = str.includes('.');
    let cleaned;
    if (hasComma && hasDot) {
        const lastComma = str.lastIndexOf(',');
        const lastDot = str.lastIndexOf('.');
        if (lastComma > lastDot) {
            cleaned = str.replace(/\./g, '').replace(',', '.');
        } else {
            cleaned = str.replace(/,/g, '');
        }
    } else if (hasComma) {
        cleaned = str.replace(/,/g, '.');
    } else if (hasDot) {
        const dotCount = (str.match(/\./g) || []).length;
        if (dotCount > 1) {
            cleaned = str.replace(/\./g, '');
        } else {
            const dotIndex = str.indexOf('.');
            const afterDot = str.slice(dotIndex + 1);
            if (afterDot.length >= 3 && /^\d+$/.test(afterDot)) {
                cleaned = str.replace(/\./g, '');
            } else {
                cleaned = str;
            }
        }
    } else {
        cleaned = str;
    }
    const n = parseFloat(cleaned);
    return Number.isFinite(n) && n > 0 ? n : fallback;
}
function loadSettings() {
try {
const saved = localStorage.getItem(SETTINGS_KEY);
if (!saved) {
currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
return;
}
const data = JSON.parse(saved);
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
} catch (e) {
currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}
}
function saveSettings() {
try {
localStorage.setItem(SETTINGS_KEY, JSON.stringify(currentSettings));
} catch (e) { }
}
function applySettingsToConfig() {
if (typeof CONFIG === 'undefined') return;
CONFIG.TM_PER_BOX = Math.round(currentSettings.tmPerBox);
CONFIG.TRY_TO_BYN_RATE = currentSettings.rates.TRY || 16.01;
CONFIG.CURRENCY_RATES = {
BYN: 1,
RUB: currentSettings.rates.RUB,
USD: currentSettings.rates.USD,
EUR: currentSettings.rates.EUR,
TRY: currentSettings.rates.TRY
};
if (Array.isArray(CONFIG.TM_PACKS) && CONFIG.TM_PACKS[0]) {
CONFIG.TM_PACKS[0].tm = Math.round(currentSettings.tmPackSize);
CONFIG.TM_PACKS[0].priceTRY = Math.round(currentSettings.packPriceTRY);
}
}
function populateSettingsInputs() {
const setVal = (id, val, isDecimal = false) => {
const el = document.getElementById(id);
if (!el) return;
if (id === 'cfgRateBYN') {
el.value = val !== undefined && val !== null ? String(val) : '';
return;
}
const num = parseSettingsNumber(val, 0);
if (num <= 0) {
el.value = '';
return;
}
if (isDecimal) {
el.value = String(num);
} else {
el.value = formatNumberWithDots(Math.round(num));
}
};
setVal('cfgTmPerBox', currentSettings.tmPerBox, false);
setVal('cfgTmPackSize', currentSettings.tmPackSize, false);
setVal('cfgPackPriceTRY', currentSettings.packPriceTRY, false);
setVal('cfgRateRUB', currentSettings.rates.RUB, true);
setVal('cfgRateUSD', currentSettings.rates.USD, true);
setVal('cfgRateEUR', currentSettings.rates.EUR, true);
setVal('cfgRateTRY', currentSettings.rates.TRY, true);
}
function readSettingsFromInputs() {
currentSettings.tmPerBox = parseSettingsNumber(
document.getElementById('cfgTmPerBox')?.value, DEFAULT_SETTINGS.tmPerBox);
currentSettings.tmPackSize = parseSettingsNumber(
document.getElementById('cfgTmPackSize')?.value, DEFAULT_SETTINGS.tmPackSize);
currentSettings.packPriceTRY = parseSettingsNumber(
document.getElementById('cfgPackPriceTRY')?.value, DEFAULT_SETTINGS.packPriceTRY);
currentSettings.rates.RUB = parseSettingsNumber(
document.getElementById('cfgRateRUB')?.value, DEFAULT_SETTINGS.rates.RUB);
currentSettings.rates.USD = parseSettingsNumber(
document.getElementById('cfgRateUSD')?.value, DEFAULT_SETTINGS.rates.USD);
currentSettings.rates.EUR = parseSettingsNumber(
document.getElementById('cfgRateEUR')?.value, DEFAULT_SETTINGS.rates.EUR);
currentSettings.rates.TRY = parseSettingsNumber(
document.getElementById('cfgRateTRY')?.value, DEFAULT_SETTINGS.rates.TRY);
currentSettings.rates.BYN = 1;
}
function openSettingsModal() {
const modal = document.getElementById('settingsModal');
const btn = document.getElementById('settingsToggle');
if (!modal) return;
populateSettingsInputs();
modal.classList.add('open');
if (btn) btn.classList.add('active');
}
function closeSettingsModal() {
const modal = document.getElementById('settingsModal');
const btn = document.getElementById('settingsToggle');
if (!modal) return;
modal.classList.remove('open');
if (btn) btn.classList.remove('active');
}
function saveAndApplySettings() {
readSettingsFromInputs();
saveSettings();
applySettingsToConfig();
if (typeof updateBoxesCostTL === 'function') updateBoxesCostTL();
if (typeof updateBoxesNeeded === 'function') updateBoxesNeeded();
closeSettingsModal();
}
function resetSettingsToDefaults() {
currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
populateSettingsInputs();
}
function initSettingsPanel() {
const toggleBtn = document.getElementById('settingsToggle');
const modal = document.getElementById('settingsModal');
const backdrop = modal?.querySelector('.settings-modal__backdrop');
const closeBtn = document.getElementById('settingsModalClose');
const saveBtn = document.getElementById('settingsSave');
const resetBtn = document.getElementById('settingsReset');
if (toggleBtn) {
toggleBtn.addEventListener('click', (e) => {
e.stopPropagation();
if (modal?.classList.contains('open')) closeSettingsModal();
else openSettingsModal();
});
}
if (closeBtn) closeBtn.addEventListener('click', closeSettingsModal);
if (backdrop) backdrop.addEventListener('click', closeSettingsModal);
if (saveBtn) saveBtn.addEventListener('click', saveAndApplySettings);
if (resetBtn) resetBtn.addEventListener('click', resetSettingsToDefaults);
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && modal?.classList.contains('open')) {
closeSettingsModal();
}
});
loadSettings();
applySettingsToConfig();
}
function safeLocalStorageSet(key, value) {
try {
localStorage.setItem(key, value);
return true;
} catch (e) {
if (e.name === 'QuotaExceededError') {
Object.keys(localStorage).forEach(k => {
if (k.startsWith('og_calc_')) localStorage.removeItem(k);
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
function safeLocalStorageGet(key, defaultValue) {
try {
const value = localStorage.getItem(key);
return value !== null ? value : defaultValue;
} catch (e) {
return defaultValue;
}
}
const sanitizeInput = (input) => !input ? '' : String(input).replace(/[^0-9]/g, '').slice(0, 15);
function formatWithDotsRaw(inputStr) {
if (inputStr === null || inputStr === undefined || inputStr === '') return '';
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
const formatNumberWithDots = (n) => {
if (n === null || n === undefined || isNaN(n)) return '0';
return Math.round(Number(n) || 0).toLocaleString('de-DE');
};
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
const convertToMetal = (m, c, d) =>
(m || 0) + (c || 0) * CONFIG.METAL_EQ_CRYSTAL + (d || 0) * CONFIG.METAL_EQ_DEUT;
function debounce(fn, wait) {
let t = null;
return function (...a) {
clearTimeout(t);
t = setTimeout(() => fn.apply(this, a), wait);
};
}
const formatSpanMetal = (n) => { const s = document.createElement('span'); s.className = 'val-metal'; s.textContent = formatNumberWithDots(n); return s; };
const formatSpanCrystal = (n) => { const s = document.createElement('span'); s.className = 'val-crystal'; s.textContent = formatNumberWithDots(n); return s; };
const formatSpanDeut = (n) => { const s = document.createElement('span'); s.className = 'val-deut'; s.textContent = formatNumberWithDots(n); return s; };
function createImageFallbackEl(label) {
const span = document.createElement('span');
span.className = 'icon-fallback';
span.setAttribute('aria-hidden', 'true');
span.textContent = label ? label[0] : '—';
return span;
}
function createIconWithFallback(src, alt, size = 20) {
const img = document.createElement('img');
img.src = src;
img.alt = alt;
img.className = 'icon';
img.width = size;
img.height = size;
img.loading = 'lazy';
img.style.cssText = `width:${size}px;height:${size}px;vertical-align:middle;border-radius:4px;`;
img.addEventListener('error', function handler() {
if (img._fallback) return;
img.removeEventListener('error', handler);
const fb = createImageFallbackEl(alt);
img.style.display = 'none';
if (img.parentNode) img.parentNode.insertBefore(fb, img.nextSibling);
img._fallback = true;
}, { once: true });
return img;
}
const updateResourceCell = (td, value, className) => {
if (!td) return;
let span = td.firstChild;
if (!span || span.tagName !== 'SPAN') {
td.innerHTML = '';
span = document.createElement('span');
span.className = className;
td.appendChild(span);
}
span.textContent = formatNumberWithDots(value);
};
class LimitedCache {
constructor(maxSize = 500) {
this.cache = new Map();
this.maxSize = maxSize;
}
get(key) {
if (!this.cache.has(key)) return undefined;
const value = this.cache.get(key);
this.cache.delete(key);
this.cache.set(key, value);
return value;
}
set(key, value) {
if (this.cache.has(key)) this.cache.delete(key);
else if (this.cache.size >= this.maxSize) {
const firstKey = this.cache.keys().next().value;
this.cache.delete(firstKey);
}
this.cache.set(key, value);
}
clear() { this.cache.clear(); }
}
const calculationCache = new LimitedCache(500);
const clearCalculationCache = () => calculationCache.clear();
const getCachedCalculation = (key, fn) => {
if (calculationCache.cache.has(key)) return calculationCache.cache.get(key);
const result = fn();
calculationCache.set(key, result);
return result;
};
function geomSum(base, factor, from, to) {
const cacheKey = `geom_${base.m}_${base.c}_${base.d}_${factor}_${from}_${to}`;
return getCachedCalculation(cacheKey, () => {
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
});
}
function calcBuildCostLF(techID, techLevel, techData, costRdc) {
const cacheKey = `build_${techID}_${techLevel}_${costRdc}`;
return getCachedCalculation(cacheKey, () => {
if (techLevel < 1) return [0, 0, 0];
const data = techData[techID];
if (data === undefined) return [0, 0, 0];
const cost = [0, 0, 0];
costRdc = Math.min(0.99, costRdc);
for (let i = 0; i < 3; i++) {
cost[i] = Math.floor((1 - costRdc) * Math.floor(data[i] * techLevel * Math.pow(data[5 + i], (techLevel - 1))));
}
return cost;
});
}
function calcDeconstrCostLF(techID, techLevel, techData, ionTechLevel) {
const cacheKey = `deconstr_${techID}_${techLevel}_${ionTechLevel}`;
return getCachedCalculation(cacheKey, () => {
const cost = [0, 0, 0];
if (techLevel < 0 || Number(techID) % 1000 > 100) return cost;
const data = techData[techID];
if (data === undefined) return cost;
const ionReduction = 1 - (0.04 * parseNumberInput(ionTechLevel));
for (let i = 0; i < 3; i++) {
cost[i] = Math.floor(Math.floor(data[i] * techLevel * Math.pow(data[5 + i], techLevel - 1)) * ionReduction);
}
return cost;
});
}
function getBuildCostLF(techID, techLevelFrom, techLevelTo, techData, ionTechLevel, rsrCostRdc, bldCostRdc = 0) {
const cacheKey = `build_range_${techID}_${techLevelFrom}_${techLevelTo}_${rsrCostRdc}_${bldCostRdc}`;
return getCachedCalculation(cacheKey, () => {
let totalCost = [0, 0, 0];
const costReduction = Number(techID) % 1000 < 100 ? bldCostRdc : rsrCostRdc;
if (Number(techLevelFrom) > Number(techLevelTo)) {
for (let i = Number(techLevelFrom) - 1; i >= Math.max(Number(techLevelTo), 0); i--) {
const levelToUse = i === 0 ? 1 : i;
const cost = calcDeconstrCostLF(techID, levelToUse, techData, ionTechLevel);
totalCost[0] += cost[0]; totalCost[1] += cost[1]; totalCost[2] += cost[2];
}
} else {
for (let i = Number(techLevelFrom) + 1; i <= Number(techLevelTo); i++) {
const cost = calcBuildCostLF(techID, i, techData, costReduction);
totalCost[0] += cost[0]; totalCost[1] += cost[1]; totalCost[2] += cost[2];
}
}
return totalCost;
});
}
function createTableRow({ index, techId, name, iconPath, dataset, showPlanets, planetsType }) {
const tr = document.createElement('tr');
tr.dataset.index = index;
if (techId !== undefined) tr.dataset.techId = techId;
if (dataset) Object.entries(dataset).forEach(([k, v]) => { tr.dataset[k] = v; });
const tdName = document.createElement('td');
tdName.className = 'name-cell';
const img = createIconWithFallback(iconPath, name, 20);
tdName.appendChild(img);
tdName.appendChild(document.createTextNode(name));
tr.appendChild(tdName);
const tdFrom = document.createElement('td');
const fromInput = document.createElement('input');
fromInput.type = 'text';
fromInput.className = 'lvl-input';
fromInput.dataset.type = 'from';
fromInput.dataset.index = index;
fromInput.inputMode = 'numeric';
tdFrom.appendChild(fromInput);
tr.appendChild(tdFrom);
const tdTo = document.createElement('td');
const toInput = document.createElement('input');
toInput.type = 'text';
toInput.className = 'lvl-input';
toInput.dataset.type = 'to';
toInput.dataset.index = index;
toInput.inputMode = 'numeric';
tdTo.appendChild(toInput);
tr.appendChild(tdTo);
if (showPlanets) {
const tdP = document.createElement('td');
const planetImg = document.createElement('img');
planetImg.src = `${IMAGES_ROOT_PATH}planet.png`;
planetImg.className = 'icon';
planetImg.alt = '';
const planetInput = document.createElement('input');
planetInput.type = 'text';
planetInput.className = 'planet-input';
planetInput.dataset.type = planetsType;
planetInput.dataset.index = index;
planetInput.inputMode = 'numeric';
planetInput.value = '1';
tdP.append(planetImg, planetInput);
tr.appendChild(tdP);
}
const tdM = document.createElement('td'); tdM.className = 'm'; tdM.appendChild(formatSpanMetal(0));
const tdC = document.createElement('td'); tdC.className = 'c'; tdC.appendChild(formatSpanCrystal(0));
const tdD = document.createElement('td'); tdD.className = 'd'; tdD.appendChild(formatSpanDeut(0));
const tdP = document.createElement('td'); tdP.className = 'p'; tdP.textContent = '0';
tr.append(tdM, tdC, tdD, tdP);
return tr;
}
function buildRowsBuildings() {
const tbodyB = document.getElementById('tbodyBuildings');
if (!tbodyB) return;
tbodyB.innerHTML = '';
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const names = (typeof LANG_BUILDINGS !== 'undefined' && LANG_BUILDINGS[lang])
? LANG_BUILDINGS[lang]
: (typeof LANG_BUILDINGS !== 'undefined' ? LANG_BUILDINGS.ru : []);
const customOrder = [0, 1, 2, 3, 4, 8, 9, 10, 5, 7, 11, 6, 12, 13, 14, 15];
const frag = document.createDocumentFragment();
customOrder.forEach((i) => {
const name = names[i] ? names[i].trim() : `Building ${i}`;
const iconFileName = ICONS_BUILDINGS[i] ? ICONS_BUILDINGS[i].trim() : '';
const iconPath = iconFileName ? `${IMAGES_BUILDINGS_PATH}${iconFileName}` : '';
const row = createTableRow({
index: i, name, iconPath, showPlanets: true, planetsType: 'planets'
});
frag.appendChild(row);
});
tbodyB.appendChild(frag);
attachLvlInputHandlers();
}
function buildRowsResearch() {
const tbodyR = document.getElementById('tbodyResearch');
if (!tbodyR) return;
tbodyR.innerHTML = '';
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const names = (typeof LANG_RESEARCH !== 'undefined' && LANG_RESEARCH[lang])
? LANG_RESEARCH[lang]
: (typeof LANG_RESEARCH !== 'undefined' ? LANG_RESEARCH.ru : []);
const frag = document.createDocumentFragment();
names.forEach((name, i) => {
const cleanName = name ? name.trim() : `Research ${i}`;
const iconFileName = ICONS_RESEARCH[i] ? ICONS_RESEARCH[i].trim() : '';
const iconPath = iconFileName ? `${IMAGES_RESEARCH_PATH}${iconFileName}` : '';
const row = createTableRow({
index: i, name: cleanName, iconPath, showPlanets: false
});
frag.appendChild(row);
});
tbodyR.appendChild(frag);
attachLvlInputHandlers();
}
function buildRowsMoonBuildings() {
const tbody = document.getElementById('tbodyMoonBuildings');
if (!tbody) return;
tbody.innerHTML = '';
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
const frag = document.createDocumentFragment();
MOON_BUILDINGS_DATA.forEach((building, i) => {
const name = (dict && dict[`moon_${building.id}`]) ? dict[`moon_${building.id}`] : building.name;
const iconPath = `${IMAGES_BUILDINGS_PATH}${MOON_BUILDINGS_ICONS[i]}`;
const row = createTableRow({
index: i, name, iconPath,
dataset: { buildingId: building.id },
showPlanets: true, planetsType: 'moons'
});
frag.appendChild(row);
});
tbody.appendChild(frag);
attachLvlInputHandlers();
}
function buildRowsLfBuildings() {
const tbody = document.getElementById('tbodyLfBuildings');
if (!tbody) return;
tbody.innerHTML = '';
const frag = document.createDocumentFragment();
const raceMap = { humans: '1', rocktal: '2', mechas: '3', kaelesh: '4' };
const prefix = raceMap[currentLifeformRace] + '0';
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
const imagePath = `images/lifeforms/buildings/${currentLifeformRace}/`;
for (let i = 1; i <= 12; i++) {
const techId = Number(prefix + String(i).padStart(2, '0'));
if (!LF_TECH_COSTS[techId]) continue;
const name = (dict && dict[`lf_b_${techId}`]) ? dict[`lf_b_${techId}`] : `ID ${techId}`;
const fileName = (LF_BUILDING_FILENAMES[techId] ? LF_BUILDING_FILENAMES[techId].trim() : '') || `${techId}.png`;
const iconPath = `${imagePath}${fileName}`;
const row = createTableRow({
index: i - 1, techId, name, iconPath,
showPlanets: true, planetsType: 'planets'
});
frag.appendChild(row);
}
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
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
const imagePath = `images/lifeforms/research/${currentLifeformRace}/`;
for (let i = 1; i <= 18; i++) {
const techId = Number(prefix + String(i).padStart(2, '0'));
if (!LF_TECH_COSTS[techId]) continue;
const name = (dict && dict[`lf_r_${techId}`]) ? dict[`lf_r_${techId}`] : `ID ${techId}`;
const fileName = (LF_RESEARCH_FILENAMES[techId] ? LF_RESEARCH_FILENAMES[techId].trim() : '') || `${techId}.png`;
const iconPath = `${imagePath}${fileName}`;
const row = createTableRow({
index: i - 1, techId, name, iconPath,
showPlanets: true, planetsType: 'planets'
});
frag.appendChild(row);
}
tbody.appendChild(frag);
attachLvlInputHandlers();
}
function recalcStandardTable(tbodyId, dataArray, sumIds, isMoon = false) {
const tbody = document.getElementById(tbodyId);
if (!tbody) return;
let tm = 0, tc = 0, td = 0, tp = 0;
let megalithLevel = 0, mineralCenterLevel = 0;
if (tbodyId === 'tbodyBuildings' && currentLifeformRace === 'rocktal') {
megalithLevel = parseNumberInput(document.getElementById('megalithLevel')?.value || '0');
mineralCenterLevel = parseNumberInput(document.getElementById('mrcLevel')?.value || '0');
}
tbody.querySelectorAll('tr').forEach(tr => {
const idx = Number(tr.dataset.index);
const data = dataArray[idx];
if (!data) return;
const from = parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value));
const toVal = sanitizeInput(tr.querySelector('input[data-type="to"]')?.value);
let to = (toVal === '' ? from : parseNumberInput(toVal));
to = Math.max(from, to);
if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
const multiplier = Math.max(1, parseNumberInput(tr.querySelector(`input[data-type="${isMoon ? 'moons' : 'planets'}"]`)?.value) || 1);
const sum = geomSum({ m: data.base.m, c: data.base.c, d: data.base.d }, data.factor, from, to);
let m = Math.round(sum.m * multiplier);
let c = Math.round(sum.c * multiplier);
let d = Math.round(sum.d * multiplier);
let p = Math.round(sum.points * multiplier);
if (tbodyId === 'tbodyBuildings' && currentLifeformRace === 'rocktal') {
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
updateResourceCell(tr.querySelector('td.m'), m, 'val-metal');
updateResourceCell(tr.querySelector('td.c'), c, 'val-crystal');
updateResourceCell(tr.querySelector('td.d'), d, 'val-deut');
tr.querySelector('td.p').textContent = formatNumberWithDots(p);
tm += m; tc += c; td += d; tp += p;
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
if (!tbody) return;
let tm = 0, tc = 0, td = 0, tp = 0;
let megalithLevel = 0, mineralCenterLevel = 0, rsrCostRdc = 0;
if (currentLifeformRace === 'rocktal') {
megalithLevel = parseNumberInput(document.getElementById('megalithLevel')?.value || '0');
mineralCenterLevel = parseNumberInput(document.getElementById('mrcLevel')?.value || '0');
} else {
const levelInputId = { humans: 'humansLevel', rocktal: 'runoLevel', mechas: 'mechasLevel', kaelesh: 'kaeleshLevel' }[currentLifeformRace];
rsrCostRdc = 0.0025 * parseNumberInput(document.getElementById(levelInputId)?.value || '0');
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
const fromInput = sanitizeInput(tr.querySelector('input[data-type="from"]')?.value);
const toInput = sanitizeInput(tr.querySelector('input[data-type="to"]')?.value);
let from = 0, to = 0;
if (fromInput === '' && toInput === '') { from = to = 0; }
else if (toInput === '') { from = 0; to = parseNumberInput(fromInput); }
else { from = parseNumberInput(fromInput); to = Math.max(from, parseNumberInput(toInput)); }
if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1);
let resCost = [0, 0, 0], points = 0;
if (isBuilding) {
let bldCostRdc = 0;
if (currentLifeformRace === 'rocktal') {
bldCostRdc = 0.01 * megalithLevel;
if (MRC_REDUCABLE_IDS.has(techId % 1000)) bldCostRdc += 0.005 * mineralCenterLevel;
}
if (to > from) {
resCost = getBuildCostLF(techId, from, to, LF_TECH_COSTS, 0, 0, bldCostRdc);
points = Math.round((resCost[0] + resCost[1] + resCost[2]) / 1000.0);
} else if (from > to) {
const ionTechLevel = parseNumberInput(document.getElementById('ionTechLevel')?.value || '0');
for (let level = from; level > to; level--) {
const levelCost = calcDeconstrCostLF(techId, level, LF_TECH_COSTS, ionTechLevel);
resCost[0] += levelCost[0]; resCost[1] += levelCost[1]; resCost[2] += levelCost[2];
}
points = -1 * Math.round((resCost[0] + resCost[1] + resCost[2]) / 1000.0);
}
} else {
resCost = getBuildCostLF(techId, from, to, LF_TECH_COSTS, 0, rsrCostRdc, 0);
points = Math.round((resCost[0] + resCost[1] + resCost[2]) / 1000.0);
}
let m = Math.round(resCost[0] * planets);
let c = Math.round(resCost[1] * planets);
let d = Math.round(resCost[2] * planets);
let p = Math.round(points * planets);
updateResourceCell(tr.querySelector('td.m'), m, 'val-metal');
updateResourceCell(tr.querySelector('td.c'), c, 'val-crystal');
updateResourceCell(tr.querySelector('td.d'), d, 'val-deut');
tr.querySelector('td.p').textContent = formatNumberWithDots(p);
tm += m; tc += c; td += d; tp += p;
});
const suffix = isBuilding ? 'LfB' : 'LfR';
updateResourceCell(document.getElementById(`sumMetal${suffix}`), tm, 'val-metal');
updateResourceCell(document.getElementById(`sumCrystal${suffix}`), tc, 'val-crystal');
updateResourceCell(document.getElementById(`sumDeut${suffix}`), td, 'val-deut');
document.getElementById(`sumPoints${suffix}`).textContent = formatNumberWithDots(tp);
const totalMetalLf = Math.round(convertToMetal(tm, tc, td));
document.getElementById(`sumTotalMetal${suffix}`).textContent = formatNumberWithDots(totalMetalLf);
if (isBuilding) {
lfTotals[currentLifeformRace].buildings = { m: tm, c: tc, d: td, p: tp, total: totalMetalLf };
} else {
lfTotals[currentLifeformRace].research = { m: tm, c: tc, d: td, p: tp, total: totalMetalLf };
}
saveLfTotals();
updateBoxesNeeded();
updateSumAllTabsRows();
}
function recalcAllBuildings() { recalcStandardTable('tbodyBuildings', BUILDINGS_DATA, { m: 'sumMetalB', c: 'sumCrystalB', d: 'sumDeutB', p: 'sumPointsB', total: 'sumTotalMetalB' }); }
function recalcAllMoonBuildings() { recalcStandardTable('tbodyMoonBuildings', MOON_BUILDINGS_DATA, { m: 'sumMetalMoon', c: 'sumCrystalMoon', d: 'sumDeutMoon', p: 'sumPointsMoon', total: 'sumTotalMetalMoon' }, true); }
function recalcAllLfBuildings() { recalcLfTable('tbodyLfBuildings', true); }
function recalcAllLfResearch() { recalcLfTable('tbodyLfResearch', false); }
function recalcAllResearch() {
const tbodyR = document.getElementById('tbodyResearch');
if (!tbodyR) return;
let sm = 0, sc = 0, sd = 0, sp = 0, totalLevels = 0;
tbodyR.querySelectorAll('tr').forEach(tr => {
const idx = Number(tr.dataset.index) || 0;
const data = RESEARCH_DATA[idx] || { base: { m: 0, c: 0, d: 0 }, factor: 1 };
const from = parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value));
const toVal = sanitizeInput(tr.querySelector('input[data-type="to"]')?.value);
let to = (toVal === '' ? from : parseNumberInput(toVal));
to = Math.max(from, to);
if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
const sum = geomSum({ m: data.base.m, c: data.base.c, d: data.base.d }, data.factor, from, to);
const m = sum.m, c = sum.c, d = sum.d, p = sum.points;
updateResourceCell(tr.querySelector('td.m'), m, 'val-metal');
updateResourceCell(tr.querySelector('td.c'), c, 'val-crystal');
updateResourceCell(tr.querySelector('td.d'), d, 'val-deut');
tr.querySelector('td.p').textContent = formatNumberWithDots(p);
sm += m; sc += c; sd += d; sp += p; totalLevels += sum.levels || 0;
});
updateResourceCell(document.getElementById('sumMetalR'), sm, 'val-metal');
updateResourceCell(document.getElementById('sumCrystalR'), sc, 'val-crystal');
updateResourceCell(document.getElementById('sumDeutR'), sd, 'val-deut');
document.getElementById('sumPointsR').textContent = formatNumberWithDots(sp);
document.getElementById('sumTotalMetalR').textContent = formatNumberWithDots(Math.round(convertToMetal(sm, sc, sd)));
const tmEl = document.getElementById('tmInput');
const perLevel = tmEl ? parseNumberInput(tmEl.value) : 0;
const totalTM = Math.round(perLevel * totalLevels * CONFIG.TM_PER_LEVEL_FACTOR);
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
document.getElementById('tmTotal').textContent = (dict.totalTMLabel || 'Итого: ') + formatNumberWithDots(totalTM);
updateBoxesNeeded();
updateSumAllTabsRows();
}
function renderTable() {
try {
const tableBody = document.querySelector('#shipsTable tbody');
if (!tableBody) return;
const qtyMap = JSON.parse(safeLocalStorageGet(KEYS.SHIP_QTY, '{}'));
tableBody.innerHTML = '';
const frag = document.createDocumentFragment();
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
shipList.forEach(ship => {
const shipId = ship.id.trim();
const v = qtyMap[shipId] || '';
const shipName = (dict && dict[`ship_${shipId}`]) ? dict[`ship_${shipId}`] : shipId;
const row = document.createElement('tr');
row.setAttribute('data-row-id', shipId);
const tdName = document.createElement('td');
tdName.style.textAlign = 'left';
const img = createIconWithFallback(`${IMAGES_SHIPS_PATH}${ship.img.trim()}`, shipName, 28);
tdName.appendChild(img);
const span = document.createElement('span');
span.className = 'ship-name';
span.textContent = shipName;
tdName.appendChild(span);
const tdQty = document.createElement('td');
const qtyInput = document.createElement('input');
qtyInput.type = 'text';
qtyInput.inputMode = 'numeric';
qtyInput.pattern = '[0-9.]*';
qtyInput.value = v ? formatWithDotsRaw(v) : '';
qtyInput.dataset.id = shipId;
tdQty.appendChild(qtyInput);
const tdM = document.createElement('td'); tdM.appendChild(formatSpanMetal(ship.metal));
const tdC = document.createElement('td'); tdC.appendChild(formatSpanCrystal(ship.crystal));
const tdD = document.createElement('td'); tdD.appendChild(formatSpanDeut(ship.deut));
const tdP = document.createElement('td'); tdP.className = 'p'; tdP.textContent = '0';
row.append(tdName, tdQty, tdM, tdC, tdD, tdP);
frag.appendChild(row);
});
const trSum = document.createElement('tr');
trSum.className = 'summary-row regular-total-row';
const tdNameSum = document.createElement('td');
tdNameSum.style.textAlign = 'left';
tdNameSum.style.fontWeight = 'bold';
tdNameSum.textContent = (dict && dict.total) ? dict.total : 'Итого';
const tdQtySum = document.createElement('td');
const tdMSum = document.createElement('td'); tdMSum.className = 'm'; tdMSum.id = 'sumMetalF'; tdMSum.appendChild(formatSpanMetal(0));
const tdCSum = document.createElement('td'); tdCSum.className = 'c'; tdCSum.id = 'sumCrystalF'; tdCSum.appendChild(formatSpanCrystal(0));
const tdDSum = document.createElement('td'); tdDSum.className = 'd'; tdDSum.id = 'sumDeutF'; tdDSum.appendChild(formatSpanDeut(0));
const tdPSum = document.createElement('td'); tdPSum.className = 'p'; tdPSum.textContent = '0';
trSum.append(tdNameSum, tdQtySum, tdMSum, tdCSum, tdDSum, tdPSum);
frag.appendChild(trSum);
const trTotal = document.createElement('tr');
trTotal.className = 'total-metal-row regular-total-row';
const tdNameTotal = document.createElement('td');
tdNameTotal.style.textAlign = 'left';
tdNameTotal.style.fontWeight = 'bold';
tdNameTotal.textContent = (dict && dict.totalInMetal) ? dict.totalInMetal : 'Всего в металле';
const tdQtyTotal = document.createElement('td');
const tdMTotal = document.createElement('td');
tdMTotal.className = 'm';
tdMTotal.colSpan = 3;
const spanTotalMetal = document.createElement('span');
spanTotalMetal.id = 'sumTotalMetalF';
spanTotalMetal.textContent = '0';
tdMTotal.appendChild(spanTotalMetal);
const tdPTotal = document.createElement('td');
trTotal.append(tdNameTotal, tdQtyTotal, tdMTotal, tdPTotal);
frag.appendChild(trTotal);
const trSumAll = document.createElement('tr');
trSumAll.className = 'sum-all-tabs-row';
trSumAll.style.display = 'none';
const tdNameSumAll = document.createElement('td');
tdNameSumAll.style.textAlign = 'left';
tdNameSumAll.style.fontWeight = 'bold';
tdNameSumAll.textContent = (dict && dict.sumAllTabs) ? dict.sumAllTabs : 'Сумма по всем вкладкам';
const tdQtySumAll = document.createElement('td');
const tdMSumAll = document.createElement('td'); tdMSumAll.className = 'm'; tdMSumAll.innerHTML = '<span class="val-metal sum-all-tabs-metal">0</span>';
const tdCSumAll = document.createElement('td'); tdCSumAll.className = 'c'; tdCSumAll.innerHTML = '<span class="val-crystal sum-all-tabs-crystal">0</span>';
const tdDSumAll = document.createElement('td'); tdDSumAll.className = 'd'; tdDSumAll.innerHTML = '<span class="val-deut sum-all-tabs-deut">0</span>';
const tdPSumAll = document.createElement('td'); tdPSumAll.className = 'p'; tdPSumAll.innerHTML = '<span class="sum-all-tabs-points">0</span>';
trSumAll.append(tdNameSumAll, tdQtySumAll, tdMSumAll, tdCSumAll, tdDSumAll, tdPSumAll);
const trSumAllTotal = document.createElement('tr');
trSumAllTotal.className = 'sum-all-tabs-total-row';
trSumAllTotal.style.display = 'none';
const tdNameSumAllTotal = document.createElement('td');
tdNameSumAllTotal.style.textAlign = 'left';
tdNameSumAllTotal.style.fontWeight = 'bold';
tdNameSumAllTotal.textContent = (dict && dict.totalInMetal) ? dict.totalInMetal : 'Всего в металле';
const tdQtySumAllTotal = document.createElement('td');
const tdMSumAllTotal = document.createElement('td');
tdMSumAllTotal.colSpan = 3;
tdMSumAllTotal.className = 'm';
tdMSumAllTotal.innerHTML = '<span class="sum-all-tabs-total">0</span>';
const tdPSumAllTotal = document.createElement('td');
trSumAllTotal.append(tdNameSumAllTotal, tdQtySumAllTotal, tdMSumAllTotal, tdPSumAllTotal);
frag.appendChild(trSumAll);
frag.appendChild(trSumAllTotal);
tableBody.appendChild(frag);
attachLiveThousandsFormatting('input[data-id]');
tableBody.addEventListener('input', debounce((e) => {
if (e.target.matches('input[data-id]')) {
saveShipQuantities();
computeFleet();
}
}, 150));
} catch (e) {
console.error('Render table error:', e);
}
}
function computeFleet() {
try {
const factorC = CONFIG.METAL_EQ_CRYSTAL, factorD = CONFIG.METAL_EQ_DEUT;
let fleetM = 0, fleetC = 0, fleetD = 0, fleetPoints = 0;
document.querySelectorAll('input[data-id]').forEach(inp => {
const qty = parseNumberInput(sanitizeInput(inp.value));
const row = inp.closest('tr');
const pointsCell = row.querySelector('.p');
if (qty <= 0) { inp.value = ''; pointsCell.textContent = '0'; return; }
const ship = shipList.find(s => s.id.trim() === inp.dataset.id.trim());
if (!ship) return;
const shipM = qty * ship.metal, shipC = qty * ship.crystal, shipD = qty * ship.deut;
fleetM += shipM; fleetC += shipC; fleetD += shipD;
inp.value = formatWithDotsRaw(qty);
const shipPoints = Math.round((ship.metal + ship.crystal + ship.deut) / 1000) * qty;
pointsCell.textContent = formatNumberWithDots(shipPoints);
fleetPoints += shipPoints;
});
const tbody = document.querySelector('#shipsTable tbody');
if (tbody) {
const rows = tbody.querySelectorAll('tr');
if (rows.length >= 4) {
const sumRow = rows[rows.length - 4], totalRow = rows[rows.length - 3];
updateResourceCell(sumRow.querySelector('td.m'), fleetM, 'val-metal');
updateResourceCell(sumRow.querySelector('td.c'), fleetC, 'val-crystal');
updateResourceCell(sumRow.querySelector('td.d'), fleetD, 'val-deut');
sumRow.querySelector('td.p').textContent = formatNumberWithDots(fleetPoints);
const totalMetal = Math.round(fleetM + fleetC * factorC + fleetD * factorD);
const totalSpan = totalRow.querySelector('#sumTotalMetalF');
if (totalSpan) totalSpan.textContent = formatNumberWithDots(totalMetal);
}
}
updateBoxesNeeded();
updateSumAllTabsRows();
} catch (e) {
console.error('Fleet compute error:', e);
}
}
function saveShipQuantities() {
try {
const qtyMap = {};
document.querySelectorAll('input[data-id]').forEach(inp => {
qtyMap[inp.dataset.id] = parseNumberInput(sanitizeInput(inp.value));
});
safeLocalStorageSet(KEYS.SHIP_QTY, JSON.stringify(qtyMap));
} catch (e) {
console.warn('Failed to save ship quantities:', e);
}
}
function attachLiveThousandsFormatting(selector) {
const inputs = document.querySelectorAll(selector);
inputs.forEach(inp => {
if (!inp || inp.thousandsBound) return;
inp.thousandsBound = true;
const formatAndSetCursor = function () {
const el = this;
const raw = sanitizeInput(el.value);
const selStart = el.selectionStart || 0;
let left = raw.slice(0, selStart).replace(/[^0-9-]/g, '');
const leftDigitsCount = (left[0] === '-' ? left.slice(1) : left).length;
const formatted = formatWithDotsRaw(raw);
el.value = formatted;
let newPos = 0, digitsSeen = 0;
for (let i = 0; i < formatted.length; i++) {
if (/\d/.test(formatted[i])) digitsSeen++;
newPos++;
if (digitsSeen >= leftDigitsCount) break;
}
try { el.setSelectionRange(newPos, newPos); } catch (e) {}
};
inp.addEventListener('input', formatAndSetCursor);
inp.addEventListener('blur', function () {
const v = this.value;
if (v === '' || v === '-') { this.value = ''; return; }
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
const cleanedChunk = formatWithDotsRaw(sanitizeInput(text));
const start = this.selectionStart || 0, end = this.selectionEnd || start;
const before = this.value.slice(0, start), after = this.value.slice(end);
const nextRaw = before + cleanedChunk + after;
const next = formatWithDotsRaw(nextRaw);
this.value = next;
const caretTargetDigits = (before + cleanedChunk).replace(/[^0-9]/g, '').length;
let pos = 0, seen = 0;
while (pos < next.length && seen < caretTargetDigits) {
if (/\d/.test(next[pos])) seen++;
pos++;
}
try { this.setSelectionRange(pos, pos); } catch (e) {}
this.dispatchEvent(new Event('change', { bubbles: true }));
});
});
}
function attachLvlInputHandlers() {
document.querySelectorAll('.lvl-input').forEach(inp => {
if (inp._lvlBound) return;
inp._lvlBound = true;
const restrictTo99 = (inputEl) => {
let val = sanitizeInput(inputEl.value);
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
let num = Number(sanitizeInput(text));
if (isNaN(num) || num < 0) num = 0;
if (num > 99) num = 99;
inp.value = String(num);
inp.dispatchEvent(new Event('input', { bubbles: true }));
inp.dispatchEvent(new Event('change', { bubbles: true }));
});
});
}
let __inputsHandlersAttached = false;
function attachInputsHandlers() {
if (__inputsHandlersAttached) return;
__inputsHandlersAttached = true;
const setupTableDelegation = (tbodyId, recalcFn, storageKey) => {
const tbody = document.getElementById(tbodyId);
if (!tbody) return;
const persistTable = () => {
const key = typeof storageKey === 'function' ? storageKey() : storageKey;
if (!key) return;
try {
const rows = Array.from(tbody.querySelectorAll('tr')).map(tr => ({
from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
planets: parseNumberInput(sanitizeInput(tr.querySelector(`input[data-type="${tbodyId.includes('Moon') ? 'moons' : 'planets'}"]`)?.value)) || 1
}));
safeLocalStorageSet(key, JSON.stringify(rows));
} catch (e) {}
};
tbody.addEventListener('input', debounce((e) => {
if (e.target.matches('.lvl-input, .planet-input')) {
recalcFn();
persistTable();
}
}, 150));
};
setupTableDelegation('tbodyBuildings', recalcAllBuildings, KEYS.INPUTS_BUILD);
setupTableDelegation('tbodyResearch', recalcAllResearch, KEYS.INPUTS_RESEARCH);
setupTableDelegation('tbodyMoonBuildings', recalcAllMoonBuildings, KEYS.INPUTS_MOON_BUILD);
setupTableDelegation('tbodyLfBuildings', recalcAllLfBuildings, () => `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`);
setupTableDelegation('tbodyLfResearch', recalcAllLfResearch, () => `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`);
const tmEl = document.getElementById('tmInput');
if (tmEl) {
tmEl.addEventListener('input', debounce(recalcAllResearch, 150));
tmEl.addEventListener('blur', recalcAllResearch);
tmEl.addEventListener('change', () => { safeLocalStorageSet(KEYS.TM, tmEl.value); });
}
const boxEl = document.getElementById('boxValue');
if (boxEl) {
const saveBoxValue = debounce(() => {
const val = parseNumberInput(sanitizeInput(boxEl.value));
safeLocalStorageSet(KEYS.BOXES, JSON.stringify({ boxValue: val }));
if (getActiveTab() === 'fleet') computeFleet();
updateBoxesNeeded();
}, 150);
boxEl.addEventListener('input', saveBoxValue);
boxEl.addEventListener('change', saveBoxValue);
}
const sel = document.getElementById('lifeformSelect');
if (sel) {
sel.addEventListener('change', (e) => {
persistLfInputs();
saveLfTotals();
currentLifeformRace = e.target.value;
safeLocalStorageSet(KEYS.LF_RACE, currentLifeformRace);
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
btn.addEventListener('click', (ev) => {
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
ensureProperPositioning();
});
});
document.querySelectorAll('.building-subtab-btn').forEach(btn => {
btn.addEventListener('click', (ev) => {
ev.stopPropagation();
const tab = btn.dataset.buildingTab;
document.querySelectorAll('.building-subtab-btn').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
const planetEl = document.getElementById('planetBuildingsContent'), moonEl = document.getElementById('moonBuildingsContent');
if (planetEl) planetEl.classList.toggle('active', tab === 'planet');
if (moonEl) moonEl.classList.toggle('active', tab === 'moon');
try {
if (tab === 'moon') recalcAllMoonBuildings();
else recalcAllBuildings();
} catch (e) {
console.error('Tab switch recalc error:', e);
}
updateBoxesNeeded();
safeLocalStorageSet('og_calc_active_building_tab', tab);
});
});
document.querySelectorAll('.lf-subtab-btn').forEach(btn => {
btn.addEventListener('click', (ev) => {
ev.stopPropagation();
const subtab = btn.dataset.subtab;
document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
const lfBuild = document.getElementById('lf-buildings');
const lfRes = document.getElementById('lf-research');
if (lfBuild) lfBuild.classList.toggle('active', subtab === 'lf-buildings');
if (lfRes) lfRes.classList.toggle('active', subtab === 'lf-research');
if (subtab === 'lf-research') recalcAllLfResearch();
else recalcAllLfBuildings();
safeLocalStorageSet('og_calc_active_lf_subtab_v1', subtab);
});
});
const langToggle = document.getElementById('langToggle');
const langDropdownMenu = document.getElementById('langDropdownMenu');
const currentLangEl = document.getElementById('currentLang');
if (langToggle && langDropdownMenu) {
const availableLangs = Object.keys(LANGUAGE_ICONS);
langDropdownMenu.innerHTML = '';
availableLangs.forEach(langCode => {
const option = document.createElement('div');
option.className = 'lang-option';
option.dataset.lang = langCode;
const iconImg = document.createElement('img');
iconImg.src = LANGUAGE_ICONS[langCode] || 'images/languages/unknown.png';
iconImg.alt = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
iconImg.className = 'lang-icon-img';
iconImg.style.cssText = 'width:18px;height:18px;vertical-align:middle;margin-right:6px;';
const textSpan = document.createElement('span');
textSpan.className = 'lang-text';
textSpan.textContent = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
option.append(iconImg, textSpan);
langDropdownMenu.appendChild(option);
option.addEventListener('click', (e) => {
e.stopPropagation();
e.preventDefault();
applyLang(langCode);
setTimeout(() => { langDropdownMenu.style.display = 'none'; }, 50);
if (currentLangEl) {
currentLangEl.innerHTML = '';
const newIconImg = document.createElement('img');
newIconImg.src = LANGUAGE_ICONS[langCode] || 'images/languages/unknown.png';
newIconImg.alt = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
newIconImg.className = 'lang-icon-img';
newIconImg.style.cssText = 'width:18px;height:18px;vertical-align:middle;margin-right:4px;';
const newTextSpan = document.createElement('span');
newTextSpan.className = 'lang-text';
newTextSpan.textContent = LANGUAGE_NAMES[langCode] || langCode.toUpperCase();
currentLangEl.append(newIconImg, newTextSpan);
}
});
});
const currentLang = safeLocalStorageGet(KEYS.LANG, 'ru');
if (currentLangEl) {
currentLangEl.innerHTML = '';
const iconImg = document.createElement('img');
iconImg.src = LANGUAGE_ICONS[currentLang] || 'images/languages/unknown.png';
iconImg.alt = LANGUAGE_NAMES[currentLang] || currentLang.toUpperCase();
iconImg.className = 'lang-icon-img';
iconImg.style.cssText = 'width:18px;height:18px;vertical-align:middle;margin-right:4px;';
const textSpan = document.createElement('span');
textSpan.className = 'lang-text';
textSpan.textContent = LANGUAGE_NAMES[currentLang] || currentLang.toUpperCase();
currentLangEl.append(iconImg, textSpan);
}
langToggle.addEventListener('click', (e) => {
e.stopPropagation();
e.preventDefault();
langDropdownMenu.style.display = langDropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});
document.addEventListener('click', (e) => {
if (!langDropdownMenu.contains(e.target) && e.target !== langToggle) {
langDropdownMenu.style.display = 'none';
}
});
}
attachBonusInputHandlers();
}
function attachBonusInputHandlers() {
BONUS_INPUT_IDS.forEach(id => {
const el = document.getElementById(id);
if (el && !el._bonusBound) {
const handler = debounce(() => {
if (['humansLevel', 'mechasLevel', 'kaeleshLevel'].includes(id)) recalcAllLfResearch();
else if (id === 'megalithLevel' || id === 'mrcLevel') {
recalcAllLfBuildings();
recalcAllBuildings();
} else if (id === 'runoLevel') recalcAllLfResearch();
updateBoxesNeeded();
safeLocalStorageSet(`og_calc_${id}`, String(parseNumberInput(el.value)));
}, 150);
el.addEventListener('input', handler);
el.addEventListener('change', handler);
el.addEventListener('blur', handler);
el._bonusBound = true;
}
});
}
function saveLfTotals() {
try { safeLocalStorageSet(KEYS.LF_TOTALS, JSON.stringify(lfTotals)); } catch (e) {}
}
function loadLfTotals() {
try {
const saved = safeLocalStorageGet(KEYS.LF_TOTALS, null);
if (!saved) return;
const data = JSON.parse(saved);
if (data && typeof data === 'object') {
['humans', 'rocktal', 'mechas', 'kaelesh'].forEach(race => {
if (data[race]) {
lfTotals[race] = {
buildings: {
m: Number(data[race].buildings?.m) || 0,
c: Number(data[race].buildings?.c) || 0,
d: Number(data[race].buildings?.d) || 0,
p: Number(data[race].buildings?.p) || 0,
total: Number(data[race].buildings?.total) || 0
},
research: {
m: Number(data[race].research?.m) || 0,
c: Number(data[race].research?.c) || 0,
d: Number(data[race].research?.d) || 0,
p: Number(data[race].research?.p) || 0,
total: Number(data[race].research?.total) || 0
}
};
}
});
}
} catch (e) {}
}
function persistLfInputs() {
try {
const buildRows = document.querySelectorAll('#tbodyLfBuildings tr');
const researchRows = document.querySelectorAll('#tbodyLfResearch tr');
const b = [], r = [];
buildRows.forEach((tr, i) => {
b[i] = {
from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
planets: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="planets"]')?.value)) || 1
};
});
researchRows.forEach((tr, i) => {
r[i] = {
from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
planets: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="planets"]')?.value)) || 1
};
});
safeLocalStorageSet(`${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, JSON.stringify(b));
safeLocalStorageSet(`${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, JSON.stringify(r));
} catch (e) {
console.warn('Persist LF inputs:', e);
}
}
function saveInputRowsFromSelector(selector, key, planetsType = 'planets') {
const rows = document.querySelectorAll(selector);
const data = [];
rows.forEach(tr => {
data.push({
from: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="from"]')?.value)),
to: parseNumberInput(sanitizeInput(tr.querySelector('input[data-type="to"]')?.value)),
planets: parseNumberInput(sanitizeInput(tr.querySelector(`input[data-type="${planetsType}"]`)?.value)) || 1
});
});
safeLocalStorageSet(key, JSON.stringify(data));
}
function saveAllInputsBeforeSwitch() {
try {
saveInputRowsFromSelector('#tbodyBuildings tr', KEYS.INPUTS_BUILD, 'planets');
saveInputRowsFromSelector('#tbodyResearch tr', KEYS.INPUTS_RESEARCH, 'planets');
saveInputRowsFromSelector('#tbodyMoonBuildings tr', KEYS.INPUTS_MOON_BUILD, 'moons');
saveInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, 'planets');
saveInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, 'planets');
saveShipQuantities();
const boxes = { boxValue: parseNumberInput(sanitizeInput(document.getElementById('boxValue')?.value)) };
safeLocalStorageSet(KEYS.BOXES, JSON.stringify(boxes));
const tmInput = document.getElementById('tmInput')?.value;
if (tmInput !== undefined) safeLocalStorageSet(KEYS.TM, tmInput);
BONUS_INPUT_IDS.forEach(id => {
const el = document.getElementById(id);
if (el) safeLocalStorageSet(`og_calc_${id}`, el.value);
});
} catch (e) {
console.warn('Save all inputs:', e);
}
}
function restoreInputRowsFromSelector(selector, key, planetsType = 'planets') {
const data = JSON.parse(safeLocalStorageGet(key, 'null'));
if (!data) return;
document.querySelectorAll(selector).forEach((tr, i) => {
if (data[i]) {
const fromInp = tr.querySelector('input[data-type="from"]');
const toInp = tr.querySelector('input[data-type="to"]');
if (fromInp) fromInp.value = data[i].from ? String(Math.min(99, data[i].from)) : '';
if (toInp) toInp.value = data[i].to ? String(Math.min(99, data[i].to)) : '';
const planetInp = tr.querySelector(`input[data-type="${planetsType}"]`);
if (planetInp) planetInp.value = data[i].planets ? formatWithDotsRaw(data[i].planets) : '1';
}
});
}
function restoreAllInputsAfterSwitch() {
try {
restoreInputRowsFromSelector('#tbodyBuildings tr', KEYS.INPUTS_BUILD, 'planets');
restoreInputRowsFromSelector('#tbodyResearch tr', KEYS.INPUTS_RESEARCH, 'planets');
restoreInputRowsFromSelector('#tbodyMoonBuildings tr', KEYS.INPUTS_MOON_BUILD, 'moons');
restoreInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${currentLifeformRace}`, 'planets');
restoreInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${currentLifeformRace}`, 'planets');
const shipQty = JSON.parse(safeLocalStorageGet(KEYS.SHIP_QTY, '{}'));
if (shipQty) document.querySelectorAll('input[data-id]').forEach(inp => {
const v = shipQty[inp.dataset.id];
if (v) inp.value = formatWithDotsRaw(v);
});
const boxes = JSON.parse(safeLocalStorageGet(KEYS.BOXES, '{}'));
if (boxes.boxValue) document.getElementById('boxValue').value = formatWithDotsRaw(boxes.boxValue);
const tmSaved = safeLocalStorageGet(KEYS.TM, null);
if (tmSaved) document.getElementById('tmInput').value = tmSaved;
BONUS_INPUT_IDS.forEach(id => {
const saved = safeLocalStorageGet(`og_calc_${id}`, null);
if (saved !== null && document.getElementById(id)) {
document.getElementById(id).value = String(parseNumberInput(saved));
}
});
} catch (e) {
console.warn('Restore inputs:', e);
}
}
function applyLang(lang, skipRebuild = false) {
if (!lang) return;
const currentLang = safeLocalStorageGet(KEYS.LANG, 'ru');
if (currentLang === lang && !skipRebuild) return;
safeLocalStorageSet(KEYS.LANG, lang);
if (!skipRebuild) saveAllInputsBeforeSwitch();
const dict = window.getLangDict ? window.getLangDict(lang) : {};
document.querySelectorAll('[data-i18n]').forEach(el => {
const key = el.getAttribute('data-i18n');
if (dict && dict[key]) el.textContent = dict[key];
});
document.querySelectorAll('[data-i18n-ph]').forEach(el => {
const key = el.getAttribute('data-i18n-ph');
if (dict && dict[key]) el.setAttribute('placeholder', dict[key]);
});
const navBtns = document.querySelectorAll('.nav-btn[data-view]');
navBtns.forEach(btn => {
let key = '';
if (btn.dataset.view === 'costs') key = 'tabBuildings';
else if (btn.dataset.view === 'expeditions') key = 'tabExpeditions';
if (key && dict && dict[key]) btn.textContent = dict[key];
});
const lfSelect = document.getElementById('lifeformSelect');
if (lfSelect) {
const options = lfSelect.querySelectorAll('option');
options.forEach(opt => { if (dict && dict[opt.value]) opt.textContent = dict[opt.value]; });
if (dict && dict.lfSelectLabel) lfSelect.setAttribute('aria-label', dict.lfSelectLabel);
}
if (!skipRebuild) {
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
document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));
document.querySelector(`.lf-subtab-btn[data-subtab="${activeLfSubtab}"]`)?.classList.add('active');
const lfBuild = document.getElementById('lf-buildings'), lfRes = document.getElementById('lf-research');
if (lfBuild) lfBuild.classList.toggle('active', activeLfSubtab === 'lf-buildings');
if (lfRes) lfRes.classList.toggle('active', activeLfSubtab === 'lf-research');
}
attachLiveThousandsFormatting('#boxValue, input[data-id]');
attachInputsHandlers();
recalcAllBuildings();
recalcAllResearch();
recalcAllMoonBuildings();
recalcAllLfBuildings();
recalcAllLfResearch();
computeFleet();
updateLfBonusesVisibility(currentLifeformRace);
if (typeof window.updateExpeditionsLang === 'function') window.updateExpeditionsLang();
ensureProperPositioning();
}
}
const getActiveTab = () => document.querySelector('.tab-btn.active')?.dataset.tab || 'buildings';
function setActiveTab(tab) {
clearCalculationCache();
document.querySelectorAll('.tab-btn').forEach(b => {
const isActive = (b.dataset.tab === tab);
b.classList.toggle('active', isActive);
b.setAttribute('aria-selected', isActive ? 'true' : 'false');
b.setAttribute('tabindex', isActive ? '0' : '-1');
});
const tabB = document.getElementById('tabBuildings'), tabR = document.getElementById('tabResearch'),
tabF = document.getElementById('tabFleet'), tabL = document.getElementById('tabLifeforms');
if (tabB) tabB.classList.toggle('active', tab === 'buildings');
if (tabR) tabR.classList.toggle('active', tab === 'research');
if (tabF) tabF.classList.toggle('active', tab === 'fleet');
if (tabL) tabL.classList.toggle('active', tab === 'lifeforms');
if (tab === 'fleet') {
renderTable();
computeFleet();
} else {
if (tab === 'buildings') recalcAllBuildings();
else if (tab === 'research') recalcAllResearch();
else if (tab === 'lifeforms') {
persistLfInputs();
let activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
if (!document.querySelector(`.lf-subtab-btn[data-subtab="${activeSub}"]`)) activeSub = 'lf-buildings';
document.querySelectorAll('.lf-subtab-btn').forEach(b => b.classList.remove('active'));
document.querySelector(`.lf-subtab-btn[data-subtab="${activeSub}"]`)?.classList.add('active');
const lfBuild = document.getElementById('lf-buildings'), lfRes = document.getElementById('lf-research');
if (lfBuild) lfBuild.classList.toggle('active', activeSub === 'lf-buildings');
if (lfRes) lfRes.classList.toggle('active', activeSub === 'lf-research');
buildRowsLfBuildings();
buildRowsLfResearch();
restoreAllInputsAfterSwitch();
attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');
recalcAllLfBuildings();
recalcAllLfResearch();
}
}
updateBoxesNeeded();
safeLocalStorageSet(KEYS.ACTIVE_TAB, tab);
}
function switchView(newView) {
document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === newView));
const tableWrapper = document.getElementById('tableWrapper');
if (tableWrapper) tableWrapper.style.display = newView === 'costs' ? 'block' : 'none';
const expWrapper = document.getElementById('expeditionsWrapper');
if (expWrapper) expWrapper.style.display = newView === 'expeditions' ? 'block' : 'none';
if (newView === 'expeditions' && window.panZoomExpeditions) window.panZoomExpeditions.applyTransform();
else if (newView === 'costs' && window.panZoomMain) window.panZoomMain.applyTransform();
safeLocalStorageSet('og_calc_active_view', newView);
updateBackgroundVideo(newView);
}
function getSumAllTabsMetalValue() {
let total = 0;
try {
const sumB = parseNumberInput(document.getElementById('sumTotalMetalB')?.textContent) || 0;
const sumMoon = parseNumberInput(document.getElementById('sumTotalMetalMoon')?.textContent) || 0;
const sumR = parseNumberInput(document.getElementById('sumTotalMetalR')?.textContent) || 0;
const sumFleet = parseNumberInput(document.getElementById('sumTotalMetalF')?.textContent) || 0;
let sumLfB = 0, sumLfR = 0;
Object.values(lfTotals).forEach(race => {
sumLfB += race.buildings?.total || 0;
sumLfR += race.research?.total || 0;
});
total = sumB + sumMoon + sumR + sumLfB + sumLfR + sumFleet;
} catch (e) {
console.warn('Sum tabs error:', e);
}
return total;
}
function getCurrentTotalMetalValue() {
try {
const active = document.querySelector('.tab-btn.active')?.dataset.tab;
if (active === 'research') return parseNumberInput(document.getElementById('sumTotalMetalR')?.textContent);
if (active === 'fleet') return parseNumberInput(document.getElementById('sumTotalMetalF')?.textContent);
if (active === 'lifeforms') {
const activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
return parseNumberInput(document.getElementById(activeSub === 'lf-buildings' ? 'sumTotalMetalLfB' : 'sumTotalMetalLfR')?.textContent);
}
return parseNumberInput(document.getElementById('sumTotalMetalB')?.textContent);
} catch (e) {
return 0;
}
}
function updateSumAllTabsRows() {
const show = isSumAllTabsMode;
document.querySelectorAll('.sum-all-tabs-row, .sum-all-tabs-total-row').forEach(row => {
row.style.display = show ? '' : 'none';
});
document.querySelectorAll('.regular-total-row').forEach(row => {
row.style.display = show ? 'none' : '';
});
if (!show) return;
const totals = { m: 0, c: 0, d: 0, p: 0 };
const ids = [
['sumMetalB', 'sumCrystalB', 'sumDeutB', 'sumPointsB'],
['sumMetalMoon', 'sumCrystalMoon', 'sumDeutMoon', 'sumPointsMoon'],
['sumMetalR', 'sumCrystalR', 'sumDeutR', 'sumPointsR'],
['sumMetalF', 'sumCrystalF', 'sumDeutF', null]
];
ids.forEach(([mId, cId, dId, pId]) => {
const mEl = document.getElementById(mId);
const cEl = document.getElementById(cId);
const dEl = document.getElementById(dId);
totals.m += mEl ? (parseNumberInput(mEl.textContent) || 0) : 0;
totals.c += cEl ? (parseNumberInput(cEl.textContent) || 0) : 0;
totals.d += dEl ? (parseNumberInput(dEl.textContent) || 0) : 0;
if (pId) {
const pEl = document.getElementById(pId);
totals.p += pEl ? (parseNumberInput(pEl.textContent) || 0) : 0;
}
});
const fleetPointsEl = document.querySelector('#shipsTable tbody tr.summary-row td.p');
if (fleetPointsEl) {
totals.p += parseNumberInput(fleetPointsEl.textContent) || 0;
}
Object.values(lfTotals).forEach(race => {
if (race.buildings) {
totals.m += race.buildings.m || 0;
totals.c += race.buildings.c || 0;
totals.d += race.buildings.d || 0;
totals.p += race.buildings.p || 0;
}
if (race.research) {
totals.m += race.research.m || 0;
totals.c += race.research.c || 0;
totals.d += race.research.d || 0;
totals.p += race.research.p || 0;
}
});
const totalMetal = Math.round(convertToMetal(totals.m, totals.c, totals.d));
document.querySelectorAll('.sum-all-tabs-metal').forEach(el => el.textContent = formatNumberWithDots(totals.m));
document.querySelectorAll('.sum-all-tabs-crystal').forEach(el => el.textContent = formatNumberWithDots(totals.c));
document.querySelectorAll('.sum-all-tabs-deut').forEach(el => el.textContent = formatNumberWithDots(totals.d));
document.querySelectorAll('.sum-all-tabs-total').forEach(el => el.textContent = formatNumberWithDots(totalMetal));
document.querySelectorAll('.sum-all-tabs-points').forEach(el => el.textContent = formatNumberWithDots(totals.p));
}
function updateBoxesNeeded() {
try {
const boxesNeededEl = document.getElementById('boxesNeeded');
const boxValueInput = document.getElementById('boxValue');
const boxValue = parseNumberInput(sanitizeInput(boxValueInput?.value || ''));
if (!boxValue || boxValue <= 0) {
if (boxesNeededEl) boxesNeededEl.textContent = '—';
const boxesCost = document.getElementById('boxesCostTL');
if (boxesCost) boxesCost.innerHTML = '—';
const leftover = document.getElementById('leftoverTmValue');
if (leftover) leftover.textContent = '—';
return;
}
const targetMetal = isSumAllTabsMode ? getSumAllTabsMetalValue() : getCurrentTotalMetalValue();
const needed = Math.ceil(targetMetal / boxValue);
if (boxesNeededEl) boxesNeededEl.textContent = formatWithDotsRaw(needed);
updateBoxesCostTL(targetMetal);
} catch (e) {
console.warn('Update boxes:', e);
}
}
function updateBoxesCostTL(targetMetal = null) {
try {
const boxesCostTLEl = document.getElementById('boxesCostTL');
const leftoverTmValueEl = document.getElementById('leftoverTmValue');
const boxValueInput = document.getElementById('boxValue');
const currencyValueEl = document.getElementById('currencyValue');
if (!boxesCostTLEl) return;
const boxValue = parseNumberInput(sanitizeInput(boxValueInput?.value || ''));
if (boxValue <= 0) {
boxesCostTLEl.textContent = '—';
if (leftoverTmValueEl) leftoverTmValueEl.textContent = '—';
if (currencyValueEl) currencyValueEl.textContent = '0';
return;
}
if (targetMetal === null) targetMetal = isSumAllTabsMode ? getSumAllTabsMetalValue() : getCurrentTotalMetalValue();
if (!Number.isFinite(targetMetal) || targetMetal <= 0) {
boxesCostTLEl.textContent = '0';
if (leftoverTmValueEl) leftoverTmValueEl.textContent = '0';
if (currencyValueEl) currencyValueEl.textContent = '0';
return;
}
const neededBoxesRaw = Math.ceil(targetMetal / boxValue);
const MAX_ALLOWED_BOXES = 1e9;
if (neededBoxesRaw > MAX_ALLOWED_BOXES) {
boxesCostTLEl.textContent = '—';
if (leftoverTmValueEl) leftoverTmValueEl.textContent = '—';
if (currencyValueEl) currencyValueEl.textContent = '0';
return;
}
const requiredTM = neededBoxesRaw * CONFIG.TM_PER_BOX;
const pack = (CONFIG.TM_PACKS && CONFIG.TM_PACKS[0]) || null;
const packTm = pack?.tm || 0, packPriceTRY = pack?.priceTRY || 0;
if (packTm <= 0 || packPriceTRY <= 0) {
boxesCostTLEl.textContent = '—';
if (leftoverTmValueEl) leftoverTmValueEl.textContent = '—';
if (currencyValueEl) currencyValueEl.textContent = '0';
return;
}
const packsCount = Math.max(1, Math.ceil(requiredTM / packTm));
const totalTRY = packsCount * packPriceTRY;
const leftoverTM = packsCount * packTm - requiredTM;
const baseCurrency = safeLocalStorageGet(KEYS.BASE_CURRENCY, 'TRY');
const targetCurrency = safeLocalStorageGet(KEYS.CURRENCY, 'BYN');
const amountInBYN = totalTRY / CONFIG.TRY_TO_BYN_RATE;
const amountInBaseCurrency = Math.round(amountInBYN * CONFIG.CURRENCY_RATES[baseCurrency]);
const amountInTargetCurrency = Math.round(amountInBYN * CONFIG.CURRENCY_RATES[targetCurrency]);
const baseValue = formatNumberWithDots(amountInBaseCurrency);
const targetValue = formatNumberWithDots(amountInTargetCurrency);
boxesCostTLEl.textContent = baseValue;
if (currencyValueEl) currencyValueEl.textContent = targetValue;
if (leftoverTmValueEl) leftoverTmValueEl.textContent = leftoverTM > 0 ? formatWithDotsRaw(leftoverTM) : '0';
} catch (e) {
console.warn('Update boxes cost:', e);
}
}
function updateLfBonusesVisibility(race) {
const bonusesEl = document.getElementById('lfBonuses');
if (!bonusesEl) return;
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
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
const frag = document.createDocumentFragment();
fieldsToCreate.forEach(field => {
const fieldDiv = document.createElement('div');
fieldDiv.className = 'field';
const label = document.createElement('label');
label.setAttribute('for', field.inputId);
label.textContent = (dict && dict[field.labelKey]) ? dict[field.labelKey] : field.labelKey;
const input = document.createElement('input');
input.id = field.inputId;
input.type = 'text';
input.inputMode = 'numeric';
input.min = '0';
input.max = '100';
input.placeholder = field.placeholder;
const existingValue = document.getElementById(field.inputId)?.value;
if (existingValue && existingValue !== '') input.value = sanitizeInput(existingValue);
else {
const savedValue = safeLocalStorageGet(`og_calc_${field.inputId}`, null);
if (savedValue !== null) input.value = formatWithDotsRaw(parseNumberInput(savedValue));
}
fieldDiv.append(label, input);
frag.appendChild(fieldDiv);
});
bonusesEl.appendChild(frag);
attachBonusInputHandlers();
BONUS_INPUT_IDS.forEach(id => {
const savedValue = safeLocalStorageGet(`og_calc_${id}`, null);
const input = document.getElementById(id);
if (savedValue !== null && input && !input.value) {
input.value = formatWithDotsRaw(parseNumberInput(savedValue));
}
});
}
class PanZoomController {
constructor(wrapperId, handleId, storageKey) {
this.wrapper = document.getElementById(wrapperId);
this.handle = document.getElementById(handleId);
this.storageKey = storageKey;
if (!this.wrapper || !this.handle) return;
this.state = { x: 0, y: 0, scale: 1 };
this.isDragging = false;
this.startPointer = { x: 0, y: 0 };
this.startState = { x: 0, y: 0 };
this.minScale = 0.3;
this.maxScale = 3.5;
this.padding = 60;
this.loadState();
this.applyTransform();
this._bindDrag();
}
loadState() {
try {
const saved = localStorage.getItem(this.storageKey);
if (saved) {
const data = JSON.parse(saved);
this.state = {
x: Number(data.x) || 0,
y: Number(data.y) || 0,
scale: Math.max(this.minScale, Math.min(this.maxScale, Number(data.scale) || 1))
};
}
} catch (e) {}
}
saveState() {
try { localStorage.setItem(this.storageKey, JSON.stringify(this.state)); } catch (e) {}
}
applyTransform() {
const x = Math.round(this.state.x), y = Math.round(this.state.y);
this.wrapper.style.transformOrigin = '0 0';
this.wrapper.style.transform = `translate(${x}px, ${y}px) scale(${this.state.scale})`;
}
clampPosition() {
const rect = this.wrapper.getBoundingClientRect();
const vw = window.innerWidth, vh = window.innerHeight, s = this.state.scale;
const baseW = rect.width / s, baseH = rect.height / s;
const minX = this.padding - baseW, maxX = vw - this.padding;
const minY = this.padding - baseH, maxY = vh - this.padding;
this.state.x = Math.max(minX, Math.min(maxX, this.state.x));
this.state.y = Math.max(minY, Math.min(maxY, this.state.y));
}
zoom(factor, centerPoint = null) {
    const oldScale = this.state.scale;
    const newScale = Math.max(this.minScale, Math.min(this.maxScale, oldScale * factor));
    if (newScale === oldScale) return;

    const cx = centerPoint ? centerPoint.x : window.innerWidth  / 2;
    const cy = centerPoint ? centerPoint.y : window.innerHeight / 2;
    this.state.x = cx - (cx - this.state.x) * (newScale / oldScale);
    this.state.y = cy - (cy - this.state.y) * (newScale / oldScale);
    this.state.scale = newScale;

    // Сначала применяем transform, потом ограничиваем на свежем rect
    this.applyTransform();
    requestAnimationFrame(() => {
        this.clampPosition();
        this.applyTransform();
        this.saveState();
    });
}
reset() {
    // 1. Сбрасываем в (0,0,1) и применяем — браузер пересчитывает layout
    this.state = { x: 0, y: 0, scale: 1 };
    this.applyTransform();

    // 2. В следующем кадре центрируем с учётом реального положения wrapper'а
    requestAnimationFrame(() => {
        const rect  = this.wrapper.getBoundingClientRect();
        const baseW = rect.width;    // scale = 1, делить не нужно
        const baseH = rect.height;

        // Текущий центр таблицы на экране
        const curCX = rect.left + baseW / 2;
        const curCY = rect.top  + baseH / 2;

        // Желаемый центр — центр viewport
        const tgtCX = window.innerWidth  / 2;
        const tgtCY = window.innerHeight / 2;

        // Смещение transform = разница (т.к. scale = 1)
        this.state.x = tgtCX - curCX;
        this.state.y = tgtCY - curCY;

        this.clampPosition();
        this.applyTransform();
        this.saveState();
    });
}
_bindDrag() {
this.handle.style.touchAction = 'none';
this.handle.style.cursor = 'grab';
this._onPointerDown = (e) => {
this.isDragging = true;
this.startPointer = { x: e.clientX, y: e.clientY };
this.startState = { ...this.state };
this.handle.style.cursor = 'grabbing';
this.wrapper.style.zIndex = '2000';
this.wrapper.style.willChange = 'transform';
try { this.handle.setPointerCapture(e.pointerId); } catch (e) {}
};
this._onPointerMove = (e) => {
if (!this.isDragging) return;
const dx = (e.clientX - this.startPointer.x) / this.state.scale;
const dy = (e.clientY - this.startPointer.y) / this.state.scale;
this.state.x = this.startState.x + dx;
this.state.y = this.startState.y + dy;
this.applyTransform();
};
this._stopDrag = (e) => {
if (!this.isDragging) return;
this.isDragging = false;
this.handle.style.cursor = 'grab';
this.wrapper.style.zIndex = '1000';
this.wrapper.style.willChange = 'auto';
this.clampPosition();
this.applyTransform();
this.saveState();
try { this.handle.releasePointerCapture(e.pointerId); } catch (e) {}
};
this.handle.addEventListener('pointerdown', this._onPointerDown);
document.addEventListener('pointermove', this._onPointerMove);
document.addEventListener('pointerup', this._stopDrag);
document.addEventListener('pointercancel', this._stopDrag);
}
destroy() {
if (this._onPointerDown) this.handle.removeEventListener('pointerdown', this._onPointerDown);
if (this._onPointerMove) document.removeEventListener('pointermove', this._onPointerMove);
if (this._stopDrag) {
document.removeEventListener('pointerup', this._stopDrag);
document.removeEventListener('pointercancel', this._stopDrag);
}
this.wrapper.style.transform = 'none';
}
}
window.panZoomMain = null;
window.panZoomExpeditions = null;
function initPanZoom() {
window.panZoomMain = new PanZoomController('tableWrapper', 'dragHandle', KEYS.TRANSFORM);
window.panZoomExpeditions = new PanZoomController('expeditionsWrapper', 'dragHandleExpeditions', 'og_calc_expeditions_transform');
}
function initZoomControls() {
const zoomIn = document.getElementById('globalZoomIn'),
zoomOut = document.getElementById('globalZoomOut'),
zoomReset = document.getElementById('globalZoomReset');
const getActiveController = () => {
const isExp = document.getElementById('expeditionsWrapper')?.style.display !== 'none';
return isExp ? window.panZoomExpeditions : window.panZoomMain;
};
if (zoomIn) zoomIn.addEventListener('click', () => getActiveController()?.zoom(1.15));
if (zoomOut) zoomOut.addEventListener('click', () => getActiveController()?.zoom(1 / 1.15));
if (zoomReset) zoomReset.addEventListener('click', () => {
const ctrl = getActiveController();
const isExp = document.getElementById('expeditionsWrapper')?.style.display !== 'none';
if (isExp) {
['tech_hyper-level', 'percent-resources', 'percent-ships', 'class-bonus-collector',
'class-bonus-discoverer', 'dark-matter-discovery-bonus'].forEach(id => {
const el = document.getElementById(id);
if (el) el.value = '0';
});
const pClass = document.getElementById('player-class'); if (pClass) pClass.value = '0';
const uSpeed = document.getElementById('universe-speed'); if (uSpeed) uSpeed.value = '1';
const rBooster = document.getElementById('resource-discovery-booster'); if (rBooster) rBooster.value = '0';
const hTop = document.getElementById('highTop'); if (hTop) hTop.value = '5000000';
document.querySelectorAll('#lf-ships-bonuses .lf-bonus-input').forEach(i => i.value = '0');
if (typeof window.compute === 'function') window.compute();
} else {
fullResetToZero();
}
ctrl?.reset();
});
}
function fullResetToZero() {
try {
const lfSelectElement = document.getElementById('lifeformSelect');
const originalRace = lfSelectElement ? lfSelectElement.value : 'humans';
Object.values(KEYS).forEach(k => {
if (k !== KEYS.TRANSFORM) localStorage.removeItem(k);
});
localStorage.removeItem('og_calc_expeditions_transform');
localStorage.removeItem('og_calc_expeditions_pos');
const allLfKeys = Object.keys(localStorage).filter(k =>
k.startsWith('og_calc_lf_inputs') ||
k.startsWith('og_calc_megalithLevel') ||
k.startsWith('og_calc_mrcLevel') ||
k.startsWith('og_calc_runoLevel') ||
k.startsWith('og_calc_humansLevel') ||
k.startsWith('og_calc_mechasLevel') ||
k.startsWith('og_calc_kaeleshLevel')
);
allLfKeys.forEach(k => localStorage.removeItem(k));
BONUS_INPUT_IDS.forEach(id => localStorage.removeItem(`og_calc_${id}`));
localStorage.removeItem(KEYS.LF_TOTALS);
isSumAllTabsMode = false;
const checkbox = document.getElementById('sumAllTabsCheckbox');
if (checkbox) checkbox.checked = false;
lfTotals = {
humans: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } },
rocktal: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } },
mechas: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } },
kaelesh: { buildings: { m: 0, c: 0, d: 0, p: 0, total: 0 }, research: { m: 0, c: 0, d: 0, p: 0, total: 0 } }
};
const boxValueEl = document.getElementById('boxValue');
if (boxValueEl) boxValueEl.value = '';
const tmInputEl = document.getElementById('tmInput');
if (tmInputEl) tmInputEl.value = '';
['#tbodyBuildings', '#tbodyResearch', '#tbodyMoonBuildings'].forEach(sel => {
document.querySelectorAll(`${sel} input[data-type="from"], ${sel} input[data-type="to"]`).forEach(inp => {
inp.value = '';
});
document.querySelectorAll(`${sel} input[data-type="planets"], ${sel} input[data-type="moons"]`).forEach(inp => {
inp.value = '1';
});
});
const races = ['humans', 'rocktal', 'mechas', 'kaelesh'];
races.forEach(race => {
currentLifeformRace = race;
buildRowsLfBuildings();
buildRowsLfResearch();
document.querySelectorAll('#tbodyLfBuildings input[data-type="from"], #tbodyLfBuildings input[data-type="to"], #tbodyLfResearch input[data-type="from"], #tbodyLfResearch input[data-type="to"]').forEach(inp => {
inp.value = '';
});
document.querySelectorAll('#tbodyLfBuildings input[data-type="planets"], #tbodyLfResearch input[data-type="planets"]').forEach(inp => {
inp.value = '1';
});
saveInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${race}`, 'planets');
saveInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${race}`, 'planets');
recalcAllLfBuildings();
recalcAllLfResearch();
});
currentLifeformRace = originalRace;
if (lfSelectElement) lfSelectElement.value = originalRace;
safeLocalStorageSet(KEYS.LF_RACE, originalRace);
buildRowsBuildings();
buildRowsResearch();
buildRowsMoonBuildings();
buildRowsLfBuildings();
buildRowsLfResearch();
renderTable();
recalcAllBuildings();
recalcAllResearch();
recalcAllMoonBuildings();
recalcAllLfBuildings();
recalcAllLfResearch();
computeFleet();
updateLfBonusesVisibility(currentLifeformRace);
['sumPointsB', 'sumPointsR', 'sumPointsLfB', 'sumPointsLfR'].forEach(id => {
const el = document.getElementById(id);
if (el) el.textContent = '0';
});
const boxesNeeded = document.getElementById('boxesNeeded');
if (boxesNeeded) boxesNeeded.textContent = '—';
const boxesCost = document.getElementById('boxesCostTL');
if (boxesCost) boxesCost.innerHTML = '—';
const leftover = document.getElementById('leftoverTmValue');
if (leftover) leftover.textContent = '—';
const currencyValue = document.getElementById('currencyValue');
if (currencyValue) currencyValue.textContent = '0';
updateSumAllTabsRows();
updateBoxesNeeded();
saveLfTotals();
} catch (e) {
console.error('Full reset:', e);
}
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
function updateBackgroundVideo(view) {
const bgVideo = document.getElementById('bgVideo');
if (!bgVideo) return;
const targetSrc = view === 'expeditions' ? 'images/background2.webm' : 'images/background.webm';
if (bgVideo.currentSrc && bgVideo.currentSrc.includes(targetSrc)) {
if (bgVideo.paused) bgVideo.play().catch(() => {});
return;
}
bgVideo.pause();
bgVideo.src = targetSrc;
bgVideo.load();
bgVideo.play().catch(() => {});
}
function restoreFromStorage() {
try {
loadLfTotals();
buildRowsBuildings();
buildRowsResearch();
buildRowsMoonBuildings();
buildRowsLfBuildings();
buildRowsLfResearch();
renderTable();
restoreInputRowsFromSelector('#tbodyBuildings tr', KEYS.INPUTS_BUILD, 'planets');
restoreInputRowsFromSelector('#tbodyResearch tr', KEYS.INPUTS_RESEARCH, 'planets');
restoreInputRowsFromSelector('#tbodyMoonBuildings tr', KEYS.INPUTS_MOON_BUILD, 'moons');
const savedRace = safeLocalStorageGet(KEYS.LF_RACE, 'humans');
currentLifeformRace = savedRace;
const lfSel = document.getElementById('lifeformSelect');
if (lfSel) lfSel.value = savedRace;
const bonusesEl = document.getElementById('lfBonuses');
if (bonusesEl) {
bonusesEl.innerHTML = '';
updateLfBonusesVisibility(savedRace);
}
restoreInputRowsFromSelector('#tbodyLfBuildings tr', `${KEYS.LF_INPUTS_BUILD}_${savedRace}`, 'planets');
restoreInputRowsFromSelector('#tbodyLfResearch tr', `${KEYS.LF_INPUTS_RESEARCH}_${savedRace}`, 'planets');
const boxes = JSON.parse(safeLocalStorageGet(KEYS.BOXES, '{}'));
if (boxes && boxes.boxValue) document.getElementById('boxValue').value = formatWithDotsRaw(boxes.boxValue);
const tmSaved = safeLocalStorageGet(KEYS.TM, null);
if (tmSaved) document.getElementById('tmInput').value = tmSaved;
const shipQty = JSON.parse(safeLocalStorageGet(KEYS.SHIP_QTY, '{}'));
if (shipQty) document.querySelectorAll('input[data-id]').forEach(inp => {
const v = shipQty[inp.dataset.id];
if (v) inp.value = formatWithDotsRaw(v);
});
BONUS_INPUT_IDS.forEach(id => {
const saved = safeLocalStorageGet(`og_calc_${id}`, null);
if (saved !== null && document.getElementById(id)) {
document.getElementById(id).value = String(parseNumberInput(saved));
}
});
try {
const savedSumAllTabs = safeLocalStorageGet(KEYS.SUM_ALL_TABS, null);
if (savedSumAllTabs !== null) {
isSumAllTabsMode = savedSumAllTabs === 'true';
const checkbox = document.getElementById('sumAllTabsCheckbox');
if (checkbox) checkbox.checked = isSumAllTabsMode;
}
} catch (e) {
console.warn('Restore sum tabs:', e);
}
updateSumAllTabsRows();
setTimeout(() => {
const lang = safeLocalStorageGet(KEYS.LANG, 'ru');
const dict = window.getLangDict ? window.getLangDict(lang) : {};
document.querySelectorAll('[data-i18n]').forEach(el => {
const key = el.getAttribute('data-i18n');
if (dict && dict[key]) el.textContent = dict[key];
});
document.querySelectorAll('[data-i18n-ph]').forEach(el => {
const key = el.getAttribute('data-i18n-ph');
if (dict && dict[key]) el.setAttribute('placeholder', dict[key]);
});
}, 0);
} catch (e) {
console.error('Restore from storage:', e);
}
}
function initApp() {
try {
initSettingsPanel();
attachLiveThousandsFormatting('#boxValue, input[data-id]');
attachLvlInputHandlers();
attachInputsHandlers();
const savedLang = safeLocalStorageGet(KEYS.LANG, 'ru');
applyLang(savedLang, true);
restoreFromStorage();
initPanZoom();
initZoomControls();
window.addEventListener('resize', () => { positionTabs(); ensureProperPositioning(); });
const savedTab = safeLocalStorageGet(KEYS.ACTIVE_TAB, 'buildings');
setActiveTab(savedTab);
const savedLfSubtab = safeLocalStorageGet('og_calc_active_lf_subtab_v1', 'lf-buildings');
document.querySelectorAll('.lf-subtab-btn').forEach(btn => {
btn.classList.toggle('active', btn.dataset.subtab === savedLfSubtab);
});
const lfBuild = document.getElementById('lf-buildings'), lfRes = document.getElementById('lf-research');
if (lfBuild) lfBuild.classList.toggle('active', savedLfSubtab === 'lf-buildings');
if (lfRes) lfRes.classList.toggle('active', savedLfSubtab === 'lf-research');
const savedBuildingTab = safeLocalStorageGet('og_calc_active_building_tab', 'planet');
document.querySelectorAll('.building-subtab-btn').forEach(btn => {
btn.classList.toggle('active', btn.dataset.buildingTab === savedBuildingTab);
});
const planetEl = document.getElementById('planetBuildingsContent'),
moonEl = document.getElementById('moonBuildingsContent');
if (planetEl) planetEl.classList.toggle('active', savedBuildingTab === 'planet');
if (moonEl) moonEl.classList.toggle('active', savedBuildingTab === 'moon');
const savedSumAllTabs = safeLocalStorageGet(KEYS.SUM_ALL_TABS, null);
if (savedSumAllTabs !== null) {
isSumAllTabsMode = savedSumAllTabs === 'true';
const checkbox = document.getElementById('sumAllTabsCheckbox');
if (checkbox) checkbox.checked = isSumAllTabsMode;
}
const sumAllTabsCheckbox = document.getElementById('sumAllTabsCheckbox');
if (sumAllTabsCheckbox) {
sumAllTabsCheckbox.addEventListener('change', function () {
isSumAllTabsMode = this.checked;
safeLocalStorageSet(KEYS.SUM_ALL_TABS, String(isSumAllTabsMode));
updateSumAllTabsRows();
updateBoxesNeeded();
});
}
const savedView = safeLocalStorageGet('og_calc_active_view', 'costs');
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.classList.toggle('active', btn.dataset.view === savedView);
});
const tableWrapper = document.getElementById('tableWrapper'),
expWrapper = document.getElementById('expeditionsWrapper');
if (tableWrapper) tableWrapper.style.display = savedView === 'costs' ? 'block' : 'none';
if (expWrapper) expWrapper.style.display = savedView === 'expeditions' ? 'block' : 'none';
setTimeout(() => updateBackgroundVideo(savedView), 50);
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.addEventListener('click', () => switchView(btn.dataset.view));
});
const savedViewOnInit = safeLocalStorageGet('og_calc_active_view', 'costs');
if (savedViewOnInit === 'expeditions') {
setTimeout(() => {
if (typeof window.initExpeditionUI === 'function') window.initExpeditionUI();
else document.dispatchEvent(new CustomEvent('initExpeditionOnLoad'));
}, 150);
}
const baseCurrencySelector = document.getElementById('baseCurrencySelector');
if (baseCurrencySelector) {
const savedBaseCurrency = safeLocalStorageGet(KEYS.BASE_CURRENCY, 'TRY');
baseCurrencySelector.value = savedBaseCurrency;
baseCurrencySelector.addEventListener('change', function () {
safeLocalStorageSet(KEYS.BASE_CURRENCY, this.value);
updateBoxesCostTL();
});
}
const currencySelector = document.getElementById('currencySelector');
if (currencySelector) {
const savedCurrency = safeLocalStorageGet(KEYS.CURRENCY, 'BYN');
currencySelector.value = savedCurrency;
currencySelector.addEventListener('change', function () {
safeLocalStorageSet(KEYS.CURRENCY, this.value);
updateBoxesCostTL();
});
}
} catch (e) {
console.error('Init app:', e);
}
}
if (document.readyState !== 'loading') initApp();
else document.addEventListener('DOMContentLoaded', initApp);
})();
