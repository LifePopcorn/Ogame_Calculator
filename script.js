(function(){
  'use strict';

  // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ / КОНФИГУРАЦИЯ ===
  const CONFIG = {
    TM_PER_BOX: 42000,
    TM_PACKS: [{ tm: 12500000, priceTRY: 900 }],
    METAL_EQ_CRYSTAL: 1.5,
    METAL_EQ_DEUT: 3,
    MAX_LEVEL_SPAN: 1000,
    TM_PER_LEVEL_FACTOR: 2,
    MEGALITH_DISCOUNT_PER_LEVEL: 0.05,
    MINERAL_CENTER_DISCOUNT_PER_LEVEL: 0.05
  };

  // --- НОВОЕ: Константы для путей к изображениям ---
  const IMAGES_ROOT_PATH = 'images/'; // Корень папки с изображениями
  const IMAGES_BUILDINGS_PATH = 'images/buildings/'; // Путь к папке с изображениями построек
  const IMAGES_RESEARCH_PATH = 'images/research/';   // Путь к папке с изображениями исследований
  const IMAGES_SHIPS_PATH = 'images/ships/';         // Путь к папке с изображениями кораблей
  // ----------------------------------------------

  const TECH_COSTS = {
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
    1112: [100000, 40000, 30000, 0, 10000, 1.5, 1.5, 1.5, 0, 1.3],
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

  const LANG = {
    ru: {
      tmLabel: "Тёмная материя",
      totalTMLabel: "Итого: ",
      tabBuildings: "Постройки",
      tabResearch: "Исследования",
      tabFleet: "Флот",
      tabLifeforms: "Формы жизни",
      lfTabBuildings: "Постройки",
      lfTabResearch: "Исследования",
      lfBuilding: "Постройка",
      lfResearch: "Исследование",
      energy: "Энергия",
      locale: "ru-RU",
      boxesLabel: "Коробка с металлом",
      needOpen: "Нужно открыть:",
      boxes: "коробок",
      building: "Постройка",
      from: "От",
      to: "До",
      planets: "Планеты",
      metal: "Металл",
      crystal: "Кристалл",
      deut: "Дейтерий",
      points: "Очки",
      total: "Итого",
      totalInMetal: "Всего в металле",
      research: "Исследование",
      ship: "Корабль",
      qty: "Количество",
      planetResources: "Ресурсы на планете",
      deliveryTotals: "Итого по ресурсам:",
      metalEq: "Эквивалент в металле:",
      grandAfter: "Остаток после вычета:",
      leftoverLabel: "Остаток ТМ",
      boxesCountPh: "Кол-во коробок",
      boxValuePh: "Металла в 1 коробке",
      planetMetalPh: "Металл",
      planetCrystalPh: "Кристалл",
      planetDeutPh: "Дейтерий",
      lfSelectLabel: "Форма жизни",
      humans: "Люди",
      rocktal: "Рок’тал",
      mechas: "Мехи",
      kaelesh: "Кэлиш"
    },
    tr: {
      tmLabel: "Karanlık Madde",
      totalTMLabel: "Toplam: ",
      tabBuildings: "Binalar",
      tabResearch: "Araştırmalar",
      tabFleet: "Filo",
      tabLifeforms: "Yaşam biçimleri",
      lfTabBuildings: "Binalar",
      lfTabResearch: "Araştırmalar",
      lfBuilding: "Bina",
      lfResearch: "Araştırma",
      energy: "Enerji",
      locale: "tr-TR",
      boxesLabel: "Metal Paketi",
      needOpen: "Açılmalı:",
      boxes: "kutu",
      building: "Bina",
      from: "Başlangıç",
      to: "Hedef",
      planets: "Gezegenler",
      metal: "Metal",
      crystal: "Kristal",
      deut: "Deuterium",
      points: "Puan",
      total: "Toplam",
      totalInMetal: "Metalde toplam",
      research: "Araştırma",
      ship: "Gemi",
      qty: "Adet",
      planetResources: "Gezegendeki kaynaklar",
      deliveryTotals: "Toplam kaynaklar:",
      metalEq: "Metale eşdeğer:",
      grandAfter: "Toplamdan sonra kalan:",
      leftoverLabel: "Kalan KM",
      boxesCountPh: "Kutu sayısı",
      boxValuePh: "Bir kutudaki metal",
      planetMetalPh: "Metal",
      planetCrystalPh: "Kristal",
      planetDeutPh: "Deuterium",
      lfSelectLabel: "Yaşam biçimi",
      humans: "İnsanlar",
      rocktal: "Rock’tal",
      mechas: "Mekanikler",
      kaelesh: "Kaelesh"
    }
  };

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

  const BUILDING_NAMES = {
    ru: [
      "Рудник по добыче металла", "Рудник по добыче кристалла", "Синтезатор дейтерия", "Солнечная электростанция",
      "Термоядерная электростанция", "Фабрика роботов", "Фабрика нанитов", "Верфь",
      "Хранилище металла", "Хранилище кристалла", "Хранилище дейтерия", "Исслед-кая лаборатория",
      "Терраформер", "Склад альянса", "Космическая док", "Ракетная шахта"
    ],
    tr: [
      "Metal Madeni", "Kristal Madeni", "Deuterium Sentezleyici", "Solar Enerji Santrali",
      "Füzyon Santrali", "Robot Fabrikası", "Nanite Fabrikası", "Tersane",
      "Metal Deposu", "Kristal Deposu", "Deuterium Tankeri", "Bilimsel Araştırma Laboratuvarı",
      "Terraformer", "İttifak Deposu", "Uzay İskelesi", "Roket Silosu"
    ]
  };

  // --- ИСПРАВЛЕНО: Теперь содержит только имена файлов ---
  const ICONS_BUILDINGS = [
    "metal_mine.png", "crystal_mine.png", "deuterium_synth.png", "solar_plant.png",
    "fusion_plant.png", "robot_factory.png", "nanite_factory.png", "shipyard.png",
    "metal_storage.png", "crystal_storage.png", "deuterium_tank.png", "research_lab.png",
    "terraformer.png", "alliance_depot.png", "dock.png", "missile_silo.png"
  ];
  // ----------------------------------------------------

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

  const RESEARCH_NAMES = {
    ru: [
      "Шпионаж", "Компьютерная технология", "Оружейная технология", "Щитовая технология",
      "Броня космических кораблей", "Энергетическая технология", "Гипер-нная технология", "Реактивный Двигатель",
      "Импульсный Двигатель", "Гипер-нный Двигатель", "Лазерная технология", "Ионная технология",
      "Плазменная технология", "М.И.С", "Астрофизика", "Гравитационная технология"
    ],
    tr: [
      "Casusluk Tekniği", "Bilgisayar Teknolojisi", "Silah Teknolojisi", "Koruyucu Kalkan Tekniği",
      "Uzay Gemisi Zırhlandırması", "Enerji Tekniği", "Hiperuzay Teknolojisi", "Yanmalı Motor Takımı",
      "İtki Motoru", "Hiperuzay İticisi", "Lazer Tekniği", "İyon Tekniği",
      "Plazma Tekniği", "Galaksiler Arası Araştırma Ağı", "Astrofizik", "Gravitasyon Araştırması"
    ]
  };

  // --- ИСПРАВЛЕНО: Теперь содержит только имена файлов ---
  const ICONS_RESEARCH = [
    "spy.png", "computer.png", "weapons.png", "shield.png",
    "armor.png", "energy.png", "hyperspace.png", "combustion.png",
    "impulse.png", "hyperdrive.png", "laser.png", "ion.png",
    "plasma.png", "irn.png", "astro.png", "graviton.png"
  ];
  // ----------------------------------------------------

  // --- ИСПРАВЛЕНО: Теперь содержит только имена файлов ---
  const shipList = [
    { id: "small_cargo", ru: "Малый транспорт", tr: "Küçük Nakliye", metal: 2000, crystal: 2000, deut: 0, img: "maly_transport.png" },
    { id: "large_cargo", ru: "Большой транспорт", tr: "Büyük Nakliye", metal: 6000, crystal: 6000, deut: 0, img: "bolshoy_transport.png" },
    { id: "light_fighter", ru: "Лёгкий истребитель", tr: "Hafif Avcı", metal: 3000, crystal: 1000, deut: 0, img: "legkiy_istrebitel.png" },
    { id: "heavy_fighter", ru: "Тяжёлый истребитель", tr: "Ağır Avcı", metal: 6000, crystal: 4000, deut: 0, img: "tyazhely_istrebitel.png" },
    { id: "cruiser", ru: "Крейсер", tr: "Kruvazör", metal: 20000, crystal: 7000, deut: 2000, img: "kreiser.png" },
    { id: "battleship", ru: "Линкор", tr: "Komuta Gemisi", metal: 45000, crystal: 15000, deut: 0, img: "linkor.png" },
    { id: "recycler", ru: "Переработчик", tr: "Geri Dönüşümcü", metal: 10000, crystal: 6000, deut: 2000, img: "recycler.png" },
    { id: "bomber", ru: "Бомбардировщик", tr: "Bombardıman Gemisi", metal: 50000, crystal: 25000, deut: 15000, img: "bombardirovshik.png" },
    { id: "battlecruiser", ru: "Линейный крейсер", tr: "Fırkateyn", metal: 30000, crystal: 40000, deut: 15000, img: "battlecruiser.png" },
    { id: "destroyer", ru: "Уничтожитель", tr: "Muhrip", metal: 60000, crystal: 50000, deut: 15000, img: "unichtozhitel.png" },
    { id: "death_star", ru: "Звезда смерти", tr: "Ölüm Yıldızı", metal: 5000000, crystal: 4000000, deut: 1000000, img: "death_star.png" },
    { id: "pathfinder", ru: "Перво-проходец", tr: "Rehber", metal: 8000, crystal: 15000, deut: 8000, img: "pathfinder.png" },
    { id: "reaper", ru: "Жнец", tr: "Azrail", metal: 85000, crystal: 55000, deut: 20000, img: "reaper.png" }
  ];
  // ----------------------------------------------------

  const LIFEFORM_RACES = ['humans', 'rocktal', 'mechas', 'kaelesh'];
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
    ROCKTAL_MRC_LEVEL: 'og_calc_rocktal_mrc_level'
  };

  const LF_BUILDING_NAMES = {
    ru: {
      1001: "Жилые кварталы", 1002: "Биосферическая ферма", 1003: "Центр Исследований", 1004: "Академия наук",
      1005: "Центр Нервной Калибрации", 1006: "Высокоэнергетическое плавление", 1007: "Хранилище пищи",
      1008: "Производство с термоядерным ист. эн.", 1009: "Небоскреб", 1010: "Биотехническая лаборатория",
      1011: "Метрополь", 1012: "Планетарный щит",
      2001: "Анклав Медитации", 2002: "Кристальная ферма", 2003: "Рунный Технологиум", 2004: "Рунная Кузница",
      2005: "Орикториум", 2006: "Кузница Магмы", 2007: "Камера Разрыва", 2008: "Мегалит", 2009: "Очистка Кристаллов",
      2010: "Синтезатор Дейтерия", 2011: "Центр исследования минералов", 2012: "Продвинутая установка переработки ресурсов",
      3001: "Конвейер", 3002: "Фабрика термоядерных клеток", 3003: "Центр Роботических Исследований",
      3004: "Сеть обновлений", 3005: "Центр Квантового Компьютера", 3006: "Автоматизированный центр сборки",
      3007: "Высокопроизводительный трансформер", 3008: "Конвейер микрочипов", 3009: "Производственно-сборочный цех",
      3010: "Высокопроизводительный Синтезатор", 3011: "Массовое производство чипов", 3012: "Ремонтные нано-боты",
      4001: "Святилище", 4002: "Конденсатор Антиматерии", 4003: "Циклонная камера", 4004: "Зал реализации",
      4005: "Трансцендентальный форум", 4006: "Конвектор Антиматерии", 4007: "Лаборатория клонирования",
      4008: "Ускоритель хризалиды", 4009: "Биомодификатор", 4010: "Псионный модулятор",
      4011: "Зал производства кораблей", 4012: "Рефрактор Супра"
    },
    tr: {
      1001: "Konut Bölgesi", 1002: "Biyosfer Çiftliği", 1003: "Araştırma Merkezi", 1004: "Bilim Akademisi",
      1005: "Sinir Kalibrasyon Merkezi", 1006: "Yüksek Enerjili Ergitme", 1007: "Gıda Deposu",
      1008: "Füzyon Enerjili Üretim", 1009: "Gökyüzü", 1010: "Biyoteknoloji Laboratuvarı",
      1011: "Metropol", 1012: "Gezegen Kalkanı",
      2001: "Meditasyon Enklavesi", 2002: "Kristal Çiftliği", 2003: "Rune Teknoloji Merkezi", 2004: "Rune Dövmehanesi",
      2005: "Orikterium", 2006: "Magma Dövmehanesi", 2007: "Yıkım Odası", 2008: "Megalit", 2009: "Kristal Arıtma",
      2010: "Deuterium Sentezleyici", 2011: "Mineral Araştırma Merkezi", 2012: "Gelişmiş Geri Dönüşüm Birimi",
      3001: "Montaj Hattı", 3002: "Füzyon Hücre Fabrikası", 3003: "Robot Araştırma Merkezi",
      3004: "Yükseltme Ağı", 3005: "Kuantum Bilgisayar Merkezi", 3006: "Otomatik Montaj Merkezi",
      3007: "Yüksek Performanslı Transformatör", 3008: "Mikroçip Hattı", 3009: "Üretim ve Montaj Atölyesi",
      3010: "Yüksek Performanslı Sentezleyici", 3011: "Toplu Çip Üretimi", 3012: "Onarım Nano-Botları",
      4001: "Tapınak", 4002: "Antimadde Kondansatörü", 4003: "Siklon Odası", 4004: "Gerçekleşme Salonu",
      4005: "Aşkın Forumu", 4006: "Antimadde Konvektörü", 4007: "Klonlama Laboratuvarı",
      4008: "Koza Hızlandırıcısı", 4009: "Biyomodifikatör", 4010: "Psionik Modülatör",
      4011: "Gemi Üretim Salonu", 4012: "Supra Kırıcı"
    }
  };

  const LF_RESEARCH_NAMES = {
    ru: {
      1101: "Межгалактические послы", 1102: "Высокопроизводительные экстракторы", 1103: "Термоядерные двигатели",
      1104: "Генератор поля скрытности", 1105: "Орбитальная пристань", 1106: "Исследовательский ИИ",
      1107: "Высокопроизводительный Терраформер", 1108: "Технологии улучшенной выработки", 1109: "Лёгкий истребитель Mk II",
      1110: "Крейсер Mk II", 1111: "Технология улучшенной лаборатории", 1112: "Плазменный Терраформер",
      1113: "Низкотемпературные двигатели", 1114: "Бомбардировщик Mk II", 1115: "Уничтожитель Mk II",
      1116: "Линейный крейсер Mk II", 1117: "Роботы-ассистенты", 1118: "Суперкомпьютер",
      2101: "Вулканические аккумуляторы", 2102: "Акустическое сканирование", 2103: "Высокоэнергетические системы подкачки",
      2104: "Увеличение грузового отсека (гражданские корабли)", 2105: "Производство с магмовым источником энергии",
      2106: "Геотермальные электростанции", 2107: "Эхолотный промер", 2108: "Улучшение ионных кристаллов (Тяжёлый истребитель)",
      2109: "Улучшенный стелларатор", 2110: "Укрепленные алмазные сверла", 2111: "Сейсмическая технология выработки",
      2112: "Системы подкачки с магмовым источником энергии", 2113: "Модули ионизированных кристаллов",
      2114: "Оптимизированный метод постройки шахт", 2115: "Алмазный передатчик энергии",
      2116: "Обсидиановое армирование щита", 2117: "Рунные щиты.", 2118: "Улучшение Рок’тал для Коллекционера",
      3101: "Технология Катализаторов", 3102: "Плазменный двигатель", 3103: "Модуль эффективности",
      3104: "ИИ склада", 3105: "Генеральный ремонт (Лёгкий истребитель)", 3106: "Автоматизированные линии транспортировки",
      3107: "Улучшенный ИИ дронов", 3108: "Экспериментальная технология переработки", 3109: "Генеральный ремонт (Крейсер)",
      3110: "Автопилот гравитационного маневра", 3111: "Высокотемпературные суперпроводники", 3112: "Генеральный ремонт (Линкор)",
      3113: "Искусственный интеллект роя", 3114: "Генеральный ремонт (Линейный крейсер)", 3115: "Генеральный ремонт (Бомбардировщик)",
      3116: "Генеральный ремонт (Уничтожитель)", 3117: "Технология экспериментального вооружения", 3118: "Общее улучшение Мех",
      4101: "Теплоутилизация", 4102: "Сульфидный процесс", 4103: "Псионная сеть",
      4104: "Телекинетический захватный луч", 4105: "Технология улучшенных сенсоров", 4106: "Нейромодальный компрессор",
      4107: "Нейроинтерфейс.", 4108: "Межпланетная аналитическая сеть", 4109: "Разгон (Тяжёлый истребитель)",
      4110: "Телекинетический двигатель", 4111: "Шестое чувство", 4112: "Психогармонизатор",
      4113: "Эффективный интеллект роя", 4114: "Разгон (Большой транспорт)", 4115: "Гравитационные сенсоры",
      4116: "Разгон (Линкор)", 4117: "Псионная матрица щита", 4118: "Улучшение Кэлиш для Исследователя"
    },
    tr: {
      1101: "Galaksiarası Elçiler", 1102: "Yüksek Verimli Ekstraktörler", 1103: "Füzyon Motorlar",
      1104: "Gizlilik Alanı Jeneratörü", 1105: "Yörünge İstasyonu", 1106: "Araştırma AI'sı",
      1107: "Yüksek Verimli Terraformer", 1108: "Geliştirilmiş Çıkarma Teknolojileri", 1109: "Hafif Avcı Mk II",
      1110: "Kruvazör Mk II", 1111: "Geliştirilmiş Laboratuvar Teknolojisi", 1112: "Plazma Terraformer",
      1113: "Düşük Sıcaklık Motorları", 1114: "Bombardıman Gemisi Mk II", 1115: "Muhrip Mk II",
      1116: "Fırkateyn Mk II", 1117: "Asistan Robotlar", 1118: "Süper Bilgisayar",
      2101: "Volkanik Aküler", 2102: "Akustik Tarama", 2103: "Yüksek Enerjili Besleme Sistemleri",
      2104: "Yük Kapasitesi Artışı (Sivil Gemiler)", 2105: "Magma Enerjili Üretim",
      2106: "Jeotermal Santraller", 2107: "Yankı Sınama", 2108: "İyon Kristali Geliştirme (Ağır Avcı)",
      2109: "Geliştirilmiş Stelarator", 2110: "Güçlendirilmiş Elmas Matkaplar", 2111: "Sismik Çıkarma Teknolojisi",
      2112: "Magma Enerjili Besleme Sistemleri", 2113: "İyonize Kristal Modülleri",
      2114: "Optimize Edilmiş Maden İnşa Yöntemi", 2115: "Elmas Enerji İleticisi",
      2116: "Obsidyen Kalkan Zırhı", 2117: "Rune Kalkanları", 2118: "Toplayıcı için Rock’tal Geliştirme",
      3101: "Katalizör Teknolojisi", 3102: "Plazma Motoru", 3103: "Verimlilik Modülü",
      3104: "Depo AI'sı", 3105: "Genel Onarım (Hafif Avcı)", 3106: "Otomatik Nakliye Hatları",
      3107: "Geliştirilmiş Drone AI'sı", 3108: "Deneysel Geri Dönüşüm Teknolojisi", 3109: "Genel Onarım (Kruvazör)",
      3110: "Yerçekimi Manevrası Otomatik Pilotu", 3111: "Yüksek Sıcaklık Süper İletkenleri", 3112: "Genel Onarım (Komuta Gemisi)",
      3113: "Sürü Yapay Zekası", 3114: "Genel Onarım (Fırkateyn)", 3115: "Genel Onarım (Bombardıman Gemisi)",
      3116: "Genel Onarım (Muhrip)", 3117: "Deneysel Silah Teknolojisi", 3118: "Mekanikler için Genel Geliştirme",
      4101: "Atık Isı Geri Kazanımı", 4102: "Sülfit İşlemi", 4103: "Psionik Ağ",
      4104: "Telekinetik Tutma Işını", 4105: "Geliştirilmiş Sensör Teknolojisi", 4106: "Nöro Modal Kompresör",
      4107: "Nöro Arabirim", 4108: "Gezegenlerarası Analitik Ağ", 4109: "Hız Artışı (Ağır Avcı)",
      4110: "Telekinetik Motor", 4111: "Altıncı His", 4112: "Psiko Harmonizatör",
      4113: "Verimli Sürü Zekası", 4114: "Hız Artışı (Büyük Nakliye)", 4115: "Yerçekimi Sensörleri",
      4116: "Hız Artışı (Komuta Gemisi)", 4117: "Psionik Kalkan Matrisi", 4118: "Kâşif için Kaelesh Geliştirme"
    }
  };

  function getLfBuildingName(techId) {
    const lang = localStorage.getItem(KEYS.LANG) || 'ru';
    return LF_BUILDING_NAMES[lang]?.[techId] || LF_BUILDING_NAMES.ru?.[techId] || `ID ${techId}`;
  }

  function getLfResearchName(techId) {
    const lang = localStorage.getItem(KEYS.LANG) || 'ru';
    return LF_RESEARCH_NAMES[lang]?.[techId] || LF_RESEARCH_NAMES.ru?.[techId] || `ID ${techId}`;
  }

  // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
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

  function getNumberFormatter(lang) {
    try {
      return new Intl.NumberFormat(LANG[lang]?.locale || 'ru-RU');
    } catch (e) {
      return new Intl.NumberFormat('ru-RU');
    }
  }

  function formatNumber(n, lang = localStorage.getItem(KEYS.LANG) || 'ru') {
    if (n === null || n === undefined || isNaN(n)) return '0';
    const nf = getNumberFormatter(lang);
    return nf.format(Math.round(Number(n) || 0));
  }

  function formatSpanMetal(n) {
    return `<span class="val-metal">${formatNumber(n)}</span>`;
  }

  function formatSpanCrystal(n) {
    return `<span class="val-crystal">${formatNumber(n)}</span>`;
  }

  function formatSpanDeut(n) {
    return `<span class="val-deut">${formatNumber(n)}</span>`;
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

  function getLevelCost(techId, level) {
    const data = TECH_COSTS[techId];
    if (!data) return { m: 0, c: 0, d: 0, points: 0 };
    const [baseM, baseC, baseD] = data;
    const fM = data[5], fC = data[6], fD = data[7];
    const m = Math.ceil(baseM * Math.pow(fM, level - 1));
    const c = Math.ceil(baseC * Math.pow(fC, level - 1));
    const d = Math.ceil(baseD * Math.pow(fD, level - 1));
    const points = Math.round((m + c + d) / 1000);
    return { m, c, d, points };
  }

  // Заменить старую getTotalCostLf на эту реализацию
  function getTotalCostLf(techId, from, to) {
    // Диапазон пустой
    if (from >= to) return { m: 0, c: 0, d: 0, points: 0 };
    // Защита: нет данных
    if (!TECH_COSTS[techId]) return { m: 0, c: 0, d: 0, points: 0 };
    let totalM = 0, totalC = 0, totalD = 0;
    // Суммируем уровни level = from .. to-1.
    // (UI уже приводит пустое "До" в from=1,to=level+1 при одном поле)
    for (let level = from; level < to; level++) {
      const lvlCost = getLevelCost(techId, level);
      totalM += Number(lvlCost.m || 0);
      totalC += Number(lvlCost.c || 0);
      totalD += Number(lvlCost.d || 0);
    }
    const points = Math.round((totalM + totalC + totalD) / 1000);
    return { m: totalM, c: totalC, d: totalD, points };
  }

  function geomSum(base, factor, from, to) {
    const len = Math.max(0, to - from);
    if (len <= 0) return { m: 0, c: 0, d: 0, e: 0, points: 0, levels: 0 };
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
    const e = Math.round(sum(base.e || 0));
    const points = Math.round((m + c + d) / 1000);
    return { m, c, d, e, points, levels: count };
  }

  function getActiveTab() {
    return document.querySelector('.tab-btn.active')?.dataset.tab || 'buildings';
  }

  // === ⭐ СПЕЦИАЛЬНЫЙ ОБРАБОТЧИК ВВОДА ДЛЯ .lvl-input (0–99) ===
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
      inp.addEventListener('blur', () => {
        restrictTo99(inp);
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      });
      inp.addEventListener('paste', (e) => {
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

  // === ОСНОВНЫЕ РАСЧЁТНЫЕ ФУНКЦИИ ===
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
      const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]').value) || 1);
      const sum = geomSum({ m: data.base.m, c: data.base.c, d: data.base.d, e: 0 }, data.factor, from, to);
      let m = Math.round(sum.m * planets);
      let c = Math.round(sum.c * planets);
      let d = Math.round(sum.d * planets);
      let p = Math.round(sum.points * planets);
      if (currentLifeformRace === 'rocktal') {
        let totalDiscount = 0;
        const isResourceBuilding = [1, 2, 3, 6, 7, 8].includes(idx + 1);
        if (mineralCenterLevel > 0 && isResourceBuilding) {
          totalDiscount += 0.005 * mineralCenterLevel;
        }
        if (totalDiscount > 0) {
          m = Math.ceil(m * (1 - totalDiscount));
          c = Math.ceil(c * (1 - totalDiscount));
          d = Math.ceil(d * (1 - totalDiscount));
          p = Math.round((m + c + d) / 1000);
        }
      }
      tr.querySelector('td.m').innerHTML = formatSpanMetal(m);
      tr.querySelector('td.c').innerHTML = formatSpanCrystal(c);
      tr.querySelector('td.d').innerHTML = formatSpanDeut(d);
      tr.querySelector('td.p').textContent = formatNumber(p);
      tm += m;
      tc += c;
      td += d;
      tp += p;
    });
    document.getElementById('sumMetalB').innerHTML = formatSpanMetal(tm);
    document.getElementById('sumCrystalB').innerHTML = formatSpanCrystal(tc);
    document.getElementById('sumDeutB').innerHTML = formatSpanDeut(td);
    document.getElementById('sumPointsB').textContent = formatNumber(tp);
    document.getElementById('sumTotalMetalB').textContent = formatNumber(Math.round(convertToMetal(tm, tc, td)));
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
      const sum = geomSum({ m: data.base.m, c: data.base.c, d: data.base.d, e: 0 }, data.factor, from, to);
      const m = sum.m, c = sum.c, d = sum.d, p = sum.points;
      tr.querySelector('td.m').innerHTML = formatSpanMetal(m);
      tr.querySelector('td.c').innerHTML = formatSpanCrystal(c);
      tr.querySelector('td.d').innerHTML = formatSpanDeut(d);
      tr.querySelector('td.p').textContent = formatNumber(p);
      sm += m;
      sc += c;
      sd += d;
      sp += p;
      totalLevels += sum.levels || 0;
    });
    document.getElementById('sumMetalR').innerHTML = formatSpanMetal(sm);
    document.getElementById('sumCrystalR').innerHTML = formatSpanCrystal(sc);
    document.getElementById('sumDeutR').innerHTML = formatSpanDeut(sd);
    document.getElementById('sumPointsR').textContent = formatNumber(sp);
    document.getElementById('sumTotalMetalR').textContent = formatNumber(Math.round(convertToMetal(sm, sc, sd)));
    const perLevel = parseNumberInput(document.getElementById('tmInput')?.value);
    const totalTM = Math.round(perLevel * totalLevels * CONFIG.TM_PER_LEVEL_FACTOR);
    document.getElementById('tmTotal').textContent = (LANG[localStorage.getItem(KEYS.LANG) || 'ru'].totalTMLabel || 'Итого: ') + formatNumber(totalTM);
    updateBoxesNeeded();
  }

  function computeFleet() {
    try {
      const factorC = CONFIG.METAL_EQ_CRYSTAL;
      const factorD = CONFIG.METAL_EQ_DEUT;
      let totalM = 0, totalC = 0, totalD = 0;
      document.querySelectorAll("input[data-id]").forEach(inp => {
        const qty = parseNumberInput(inp.value);
        if (qty <= 0) {
          inp.value = '';
          return;
        }
        const ship = shipList.find(s => s.id === inp.dataset.id);
        if (!ship) return;
        totalM += qty * ship.metal;
        totalC += qty * ship.crystal;
        totalD += qty * ship.deut;
        inp.value = formatWithDotsRaw(qty);
      });
      const totalResEl = document.getElementById('totalRes');
      const totalMetalEqEl = document.getElementById('totalMetalEq');
      const grandTotalEl = document.getElementById('grandTotal');
      const lang = localStorage.getItem(KEYS.LANG) || 'ru';
      if (totalResEl) totalResEl.innerHTML = `${formatSpanMetal(totalM)} ${LANG[lang].metal}, ${formatSpanCrystal(totalC)} ${LANG[lang].crystal}, ${formatSpanDeut(totalD)} ${LANG[lang].deut}`;
      const metalEq = Math.round(totalM + totalC * factorC + totalD * factorD);
      if (totalMetalEqEl) totalMetalEqEl.textContent = formatNumber(metalEq);
      const boxesCount = parseNumberInput(document.getElementById('boxesCount')?.value);
      const boxValue = parseNumberInput(document.getElementById('boxValue')?.value);
      const boxesMetal = boxesCount * boxValue;
      const planetM = parseNumberInput(document.getElementById('planetMetal')?.value);
      const planetC = parseNumberInput(document.getElementById('planetCrystal')?.value);
      const planetD = parseNumberInput(document.getElementById('planetDeut')?.value);
      const planetMetalEq = planetM + planetC * factorC + planetD * factorD;
      const grand = boxesMetal + planetMetalEq - metalEq;
      if (grandTotalEl) {
        grandTotalEl.textContent = formatNumber(Math.round(grand));
        grandTotalEl.style.color = grand >= 0 ? "#41c879" : "#ff4d4d";
      }
      const availableMetalPool = boxesMetal + planetMetalEq;
      let cumulativeEq = 0;
      document.querySelectorAll("#shipsTable tbody tr[data-row-id]").forEach(row => {
        const id = row.getAttribute('data-row-id');
        const inp = row.querySelector('input[data-id]');
        const qty = parseNumberInput(inp?.value);
        const ship = shipList.find(s => s.id === id);
        let rowEq = 0;
        if (ship && qty > 0) {
          const m = ship.metal * qty, c = ship.crystal * qty, d = ship.deut * qty;
          rowEq = m + c * factorC + d * factorD;
        }
        cumulativeEq += rowEq;
        if (availableMetalPool > 0 && rowEq > 0 && cumulativeEq > availableMetalPool) row.classList.add('row-deficit');
        else row.classList.remove('row-deficit');
      });
      localStorage.setItem(KEYS.BOXES, JSON.stringify({
        boxesCount,
        boxValue,
        planetMetal: planetM,
        planetCrystal: planetC,
        planetDeut: planetD
      }));
      updateBoxesNeeded();
    } catch (e) {}
  }

  // ✅ ИСПРАВЛЕНА ОБРАБОТКА ВВОДА ДЛЯ ФОРМ ЖИЗНИ ===
  function recalcAllLfBuildings() {
    const tbody = document.getElementById('tbodyLfBuildings');
    if (!tbody) return;
    let tm = 0, tc = 0, td = 0, tp = 0;
    tbody.querySelectorAll('tr').forEach(tr => {
      const techId = Number(tr.querySelector('td:first-child')?.textContent) || 0;
      if (!techId || !TECH_COSTS[techId]) {
        tr.querySelector('td.m').innerHTML = formatSpanMetal(0);
        tr.querySelector('td.c').innerHTML = formatSpanCrystal(0);
        tr.querySelector('td.d').innerHTML = formatSpanDeut(0);
        tr.querySelector('td.p').textContent = '0';
        return;
      }
      const fromInput = tr.querySelector('input[data-type="from"]').value.trim();
      const toInput = tr.querySelector('input[data-type="to"]').value.trim();
      let from, to;
      if (fromInput === '' && toInput === '') {
        from = 0; to = 0;
      } else if (toInput === '') {
        // Только "От" = N → сумма уровней 1..N → from=1, to=N+1
        const level = parseNumberInput(fromInput);
        from = 1;
        to = level + 1;
      } else {
        from = parseNumberInput(fromInput);
        to = parseNumberInput(toInput);
        to = Math.max(from, to);
      }
      if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
      const planets = Math.max(1, parseNumberInput(tr.querySelector('input[data-type="planets"]').value) || 1); // НОВОЕ
      const cost = getTotalCostLf(techId, from, to);
      let m = Math.round(cost.m * planets); // НОВОЕ
      let c = Math.round(cost.c * planets); // НОВОЕ
      let d = Math.round(cost.d * planets); // НОВОЕ
      let p = Math.round(cost.points * planets); // НОВОЕ
      tr.querySelector('td.m').innerHTML = formatSpanMetal(m);
      tr.querySelector('td.c').innerHTML = formatSpanCrystal(c);
      tr.querySelector('td.d').innerHTML = formatSpanDeut(d);
      tr.querySelector('td.p').textContent = formatNumber(p);
      tm += m;
      tc += c;
      td += d;
      tp += p;
    });
    document.getElementById('sumMetalLfB').innerHTML = formatSpanMetal(tm);
    document.getElementById('sumCrystalLfB').innerHTML = formatSpanCrystal(tc);
    document.getElementById('sumDeutLfB').innerHTML = formatSpanDeut(td);
    document.getElementById('sumPointsLfB').textContent = formatNumber(tp);
    document.getElementById('sumTotalMetalLfB').textContent = formatNumber(Math.round(convertToMetal(tm, tc, td)));
    updateBoxesNeeded();
  }

  function recalcAllLfResearch() {
    const tbody = document.getElementById('tbodyLfResearch');
    if (!tbody) return;
    let tm = 0, tc = 0, td = 0, tp = 0;
    tbody.querySelectorAll('tr').forEach(tr => {
      const techId = Number(tr.querySelector('td:first-child')?.textContent) || 0;
      if (!techId || !TECH_COSTS[techId]) {
        tr.querySelector('td.m').innerHTML = formatSpanMetal(0);
        tr.querySelector('td.c').innerHTML = formatSpanCrystal(0);
        tr.querySelector('td.d').innerHTML = formatSpanDeut(0);
        tr.querySelector('td.p').textContent = '0';
        return;
      }
      const fromInput = tr.querySelector('input[data-type="from"]').value.trim();
      const toInput = tr.querySelector('input[data-type="to"]').value.trim();
      let from, to;
      if (fromInput === '' && toInput === '') {
        from = 0; to = 0;
      } else if (toInput === '') {
        // Только "От" = N → сумма уровней 1..N → from=1, to=N+1
        const level = parseNumberInput(fromInput);
        from = 1;
        to = level + 1;
      } else {
        from = parseNumberInput(fromInput);
        to = parseNumberInput(toInput);
        to = Math.max(from, to);
      }
      if (to - from > CONFIG.MAX_LEVEL_SPAN) to = from + CONFIG.MAX_LEVEL_SPAN;
      const cost = getTotalCostLf(techId, from, to);
      tr.querySelector('td.m').innerHTML = formatSpanMetal(cost.m);
      tr.querySelector('td.c').innerHTML = formatSpanCrystal(cost.c);
      tr.querySelector('td.d').innerHTML = formatSpanDeut(cost.d);
      tr.querySelector('td.p').textContent = formatNumber(cost.points);
      tm += cost.m;
      tc += cost.c;
      td += cost.d;
      tp += cost.points;
    });
    document.getElementById('sumMetalLfR').innerHTML = formatSpanMetal(tm);
    document.getElementById('sumCrystalLfR').innerHTML = formatSpanCrystal(tc);
    document.getElementById('sumDeutLfR').innerHTML = formatSpanDeut(td);
    document.getElementById('sumPointsLfR').textContent = formatNumber(tp);
    document.getElementById('sumTotalMetalLfR').textContent = formatNumber(Math.round(convertToMetal(tm, tc, td)));
    updateBoxesNeeded();
  }

  // === ФУНКЦИИ РЕНДЕРА ===
  function buildRowsBuildings() {
    const tbodyB = document.getElementById('tbodyBuildings');
    if (!tbodyB) return;
    tbodyB.innerHTML = '';
    const names = BUILDING_NAMES[localStorage.getItem(KEYS.LANG) || 'ru'] || BUILDING_NAMES.ru;
    const frag = document.createDocumentFragment();
    names.forEach((name, i) => {
      const tr = document.createElement('tr');
      tr.dataset.index = i;
      const tdName = document.createElement('td');
      tdName.className = 'name-cell';
      const iconFileName = ICONS_BUILDINGS[i]; // Получаем имя файла
      if (iconFileName) {
        const img = document.createElement('img');
        // --- ИСПРАВЛЕНО: Используем новую константу для пути ---
        img.src = `${IMAGES_BUILDINGS_PATH}${iconFileName}`;
        // ------------------------------------------------------
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
      // --- ИСПРАВЛЕНО: Используем путь из корня для изображений, не относящихся к подпапкам ---
      tdPlanets.innerHTML = `<img src="${IMAGES_ROOT_PATH}planet.png" class="icon" alt=""><input type="text" class="planet-input" data-type="planets" data-index="${i}" inputmode="numeric" value="1">`;
      // ----------------------------------------------------
      const tdM = document.createElement('td');
      tdM.className = 'm';
      tdM.innerHTML = `<span class="val-metal">0</span>`;
      const tdC = document.createElement('td');
      tdC.className = 'c';
      tdC.innerHTML = `<span class="val-crystal">0</span>`;
      const tdD = document.createElement('td');
      tdD.className = 'd';
      tdD.innerHTML = `<span class="val-deut">0</span>`;
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
    attachLvlInputHandlers(); // Применяем обработку 0–99 после генерации
  }

  function buildRowsResearch() {
    const tbodyR = document.getElementById('tbodyResearch');
    if (!tbodyR) return;
    tbodyR.innerHTML = '';
    const names = RESEARCH_NAMES[localStorage.getItem(KEYS.LANG) || 'ru'] || RESEARCH_NAMES.ru;
    const frag = document.createDocumentFragment();
    names.forEach((name, i) => {
      const tr = document.createElement('tr');
      tr.dataset.index = i;
      const tdName = document.createElement('td');
      tdName.className = 'name-cell';
      const iconFileName = ICONS_RESEARCH[i]; // Получаем имя файла
      if (iconFileName) {
        const img = document.createElement('img');
        // --- ИСПРАВЛЕНО: Используем новую константу для пути ---
        img.src = `${IMAGES_RESEARCH_PATH}${iconFileName}`;
        // ------------------------------------------------------
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
      tdM.innerHTML = `<span class="val-metal">0</span>`;
      const tdC = document.createElement('td');
      tdC.className = 'c';
      tdC.innerHTML = `<span class="val-crystal">0</span>`;
      const tdD = document.createElement('td');
      tdD.className = 'd';
      tdD.innerHTML = `<span class="val-deut">0</span>`;
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
    attachLvlInputHandlers(); // Применяем обработку 0–99 после генерации
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
      const name = getLfBuildingName(techId);
      const tdName = document.createElement('td');
      tdName.className = 'name-cell';
      tdName.textContent = name;
      tr.appendChild(tdName);
      const tdFrom = document.createElement('td');
      tdFrom.innerHTML = `<input type="text" class="lvl-input" data-type="from" data-index="${i - 1}">`;
      const tdTo = document.createElement('td');
      tdTo.innerHTML = `<input type="text" class="lvl-input" data-type="to" data-index="${i - 1}">`;
      const tdPlanets = document.createElement('td'); // НОВОЕ
      // --- ИСПРАВЛЕНО: Используем путь из корня для изображений, не относящихся к подпапкам ---
      tdPlanets.innerHTML = `<img src="${IMAGES_ROOT_PATH}planet.png" class="icon" alt=""><input type="text" class="planet-input" data-type="planets" data-index="${i - 1}" inputmode="numeric" value="1">`;
      // ----------------------------------------------------
      const tdM = document.createElement('td');
      tdM.className = 'm';
      tdM.innerHTML = '<span class="val-metal">0</span>';
      const tdC = document.createElement('td');
      tdC.className = 'c';
      tdC.innerHTML = '<span class="val-crystal">0</span>';
      const tdD = document.createElement('td');
      tdD.className = 'd';
      tdD.innerHTML = '<span class="val-deut">0</span>';
      const tdE = document.createElement('td');
      tdE.className = 'e';
      tdE.textContent = '0';
      const tdP = document.createElement('td');
      tdP.className = 'p';
      tdP.textContent = '0';
      tr.append(tdFrom, tdTo, tdPlanets, tdM, tdC, tdD, tdE, tdP); // НОВОЕ
      frag.appendChild(tr);
    }
    tbody.appendChild(frag);
    attachLvlInputHandlers(); // Применяем обработку 0–99 после генерации
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
      const name = getLfResearchName(techId);
      const tdName = document.createElement('td');
      tdName.className = 'name-cell';
      tdName.textContent = name;
      tr.appendChild(tdName);
      const tdFrom = document.createElement('td');
      tdFrom.innerHTML = `<input type="text" class="lvl-input" data-type="from" data-index="${i - 1}">`;
      const tdTo = document.createElement('td');
      tdTo.innerHTML = `<input type="text" class="lvl-input" data-type="to" data-index="${i - 1}">`;
      const tdM = document.createElement('td');
      tdM.className = 'm';
      tdM.innerHTML = '<span class="val-metal">0</span>';
      const tdC = document.createElement('td');
      tdC.className = 'c';
      tdC.innerHTML = '<span class="val-crystal">0</span>';
      const tdD = document.createElement('td');
      tdD.className = 'd';
      tdD.innerHTML = '<span class="val-deut">0</span>';
      const tdE = document.createElement('td');
      tdE.className = 'e';
      tdE.textContent = '0';
      const tdP = document.createElement('td');
      tdP.className = 'p';
      tdP.textContent = '0';
      tr.append(tdFrom, tdTo, tdM, tdC, tdD, tdE, tdP);
      frag.appendChild(tr);
    };
    tbody.appendChild(frag);
    attachLvlInputHandlers(); // Применяем обработку 0–99 после генерации
  }

  function renderTable() {
    const tableBody = document.querySelector("#shipsTable tbody");
    if (!tableBody) return;
    const qtyMap = JSON.parse(localStorage.getItem(KEYS.SHIP_QTY) || '{}');
    tableBody.innerHTML = '';
    const frag = document.createDocumentFragment();
    shipList.forEach(ship => {
      const v = qtyMap[ship.id] || '';
      const row = document.createElement('tr');
      row.setAttribute('data-row-id', ship.id);
      const shipName = (localStorage.getItem(KEYS.LANG) === 'tr') ? (ship.tr || ship.ru) : (ship.ru || ship.tr);
      const tdName = document.createElement('td');
      tdName.style.textAlign = 'left';
      const img = document.createElement('img');
      // --- ИСПРАВЛЕНО: Используем новую константу для пути к кораблям ---
      img.src = `${IMAGES_SHIPS_PATH}${ship.img}`;
      // ----------------------------------------------------
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
      const tdM = document.createElement('td');
      tdM.innerHTML = formatSpanMetal(ship.metal);
      const tdC = document.createElement('td');
      tdC.innerHTML = formatSpanCrystal(ship.crystal);
      const tdD = document.createElement('td');
      tdD.innerHTML = formatSpanDeut(ship.deut);
      const tdQty = document.createElement('td');
      tdQty.innerHTML = `<input type="text" inputmode="numeric" pattern="[0-9\\.]*" value="${v ? formatWithDotsRaw(v) : ''}" data-id="${ship.id}">`;
      row.appendChild(tdName);
      row.appendChild(tdM);
      row.appendChild(tdC);
      row.appendChild(tdD);
      row.appendChild(tdQty);
      frag.appendChild(row);
    });
    tableBody.appendChild(frag);
    attachLiveThousandsFormatting('input[data-id]');
    document.querySelectorAll("input[data-id]").forEach(inp => {
      if (!inp._qtyBound) {
        inp.addEventListener('input', () => {
          saveShipQuantities();
          computeFleet();
        });
        inp.addEventListener('change', () => {
          saveShipQuantities();
          computeFleet();
        });
        inp._qtyBound = true;
      }
    });
  }

  // === ОБРАБОТКА ВВОДА ===
  function attachLiveThousandsFormatting(selector) {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(inp => {
      if (!inp || inp._thousandsBound) return;
      inp._thousandsBound = true;
      inp.addEventListener('input', function () {
        const el = this;
        const raw = el.value;
        const selStart = el.selectionStart || 0;
        let left = raw.slice(0, selStart).replace(/[^0-9\-]/g, '');
        const leftDigitsCount = (left[0] === '-' ? left.slice(1) : left).length;
        const formatted = formatWithDotsRaw(raw);
        el.value = formatted;
        let digitsSeen = 0, newPos = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) digitsSeen++;
          newPos++;
          if (digitsSeen >= leftDigitsCount) break;
        }
        try {
          el.setSelectionRange(newPos, newPos);
        } catch (e) {}
      });
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
        try {
          this.setSelectionRange(pos, pos);
        } catch (e) {}
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
    } catch (e) {}
  }

  // === ОБРАБОТЧИКИ ===
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
        } catch (e) {}
      });
      tbodyB.addEventListener('change', () => debouncedRecalcBuildings());
    }

    const tbodyR = document.getElementById('tbodyResearch');
    if (tbodyR) {
      tbodyR.addEventListener('input', e => {
        const t = e.target;
        if (!t.matches('.lvl-input')) return;
        debouncedRecalcResearch();
      });
      tbodyR.addEventListener('change', () => debouncedRecalcResearch());
    }

    const tmEl = document.getElementById('tmInput');
    if (tmEl) {
      tmEl.addEventListener('input', () => debouncedRecalcResearch());
      tmEl.addEventListener('blur', () => debouncedRecalcResearch());
      tmEl.addEventListener('change', () => {
        try {
          localStorage.setItem(KEYS.TM, tmEl.value);
        } catch (e) {}
      });
    }

    ['boxesCount', 'boxValue'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        debouncedComputeFleet();
        updateBoxesNeeded();
      });
      el.addEventListener('change', () => {
        debouncedComputeFleet();
      });
    });

    const tbodyLfB = document.getElementById('tbodyLfBuildings');
    if(tbodyLfB){
      tbodyLfB.addEventListener('input', e=>{
        const t=e.target;
        if(!t.matches('.lvl-input') && !t.matches('.planet-input')) return; // НОВОЕ
        debouncedRecalcLfBuildings();
        persistLfInputs();
      });
      tbodyLfB.addEventListener('change', ()=>{ debouncedRecalcLfBuildings(); persistLfInputs(); });
    }

    const tbodyLfR = document.getElementById('tbodyLfResearch');
    if(tbodyLfR){
      tbodyLfR.addEventListener('input', e=>{
        const t=e.target;
        if(!t.matches('.lvl-input')) return;
        debouncedRecalcLfResearch();
        persistLfInputs();
      });
      tbodyLfR.addEventListener('change', ()=>{ debouncedRecalcLfResearch(); persistLfInputs(); });
    }

    const sel = document.getElementById('lifeformSelect');
    if(sel){
      sel.addEventListener('change', (e)=>{
        currentLifeformRace = e.target.value;
        try{ localStorage.setItem(KEYS.LF_RACE, currentLifeformRace); }catch(e){}
        buildRowsLfBuildings();
        buildRowsLfResearch();
        attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');
        recalcAllLfBuildings();
        recalcAllLfResearch();
        updateBoxesNeeded();
      });
    }

    const megInput = document.getElementById('megalithLevel');
    const mrcInput = document.getElementById('mrcLevel');
    if(megInput){
      const applyMeg = ()=>{ try{ localStorage.setItem(KEYS.ROCKTAL_MEGALITH_LEVEL, String(parseNumberInput(megInput.value))); }catch(e){} recalcAllLfBuildings(); recalcAllBuildings(); updateBoxesNeeded(); };
      megInput.addEventListener('input', applyMeg);
      megInput.addEventListener('change', applyMeg);
      megInput.addEventListener('blur', applyMeg);
    }
    if(mrcInput){
      const applyMrc = ()=>{ try{ localStorage.setItem(KEYS.ROCKTAL_MRC_LEVEL, String(parseNumberInput(mrcInput.value))); }catch(e){} recalcAllLfResearch(); recalcAllBuildings(); updateBoxesNeeded(); };
      mrcInput.addEventListener('input', applyMrc);
      mrcInput.addEventListener('change', applyMrc);
      mrcInput.addEventListener('blur', applyMrc);
    }

    document.getElementById('langRU')?.addEventListener('click', (ev) => {
      ev.stopPropagation();
      applyLang('ru');
    });
    document.getElementById('langTR')?.addEventListener('click', (ev) => {
      ev.stopPropagation();
      applyLang('tr');
    });

    document.querySelectorAll('.tab-btn').forEach(btn=>{
      btn.addEventListener('click', (ev)=>{
        ev.stopPropagation();
        document.querySelectorAll('.tab-btn').forEach(b=>{
          b.classList.remove('active'); b.setAttribute('aria-selected','false'); b.setAttribute('tabindex','-1');
        });
        btn.classList.add('active'); btn.setAttribute('aria-selected','true'); btn.setAttribute('tabindex','0');
        document.querySelectorAll('.tab-content').forEach(p=> p.classList.remove('active'));
        const tab = btn.dataset.tab;
        setActiveTab(tab);
        positionTabs();
      });
    });

    document.querySelectorAll('.lf-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const subtab = btn.dataset.subtab;
        document.querySelectorAll('.lf-subtab-btn').forEach(b=> b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('lf-buildings').classList.toggle('active', subtab==='lf-buildings');
        document.getElementById('lf-research').classList.toggle('active', subtab==='lf-research');
        if(subtab==='lf-buildings') recalcAllLfBuildings();
        else recalcAllLfResearch();
        updateBoxesNeeded();
        try{
          localStorage.setItem('og_calc_active_lf_subtab_v1', subtab);
        }catch(e){}
      });
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const savedTheme = localStorage.getItem('og_calc_theme') || 'dark';
      document.body.classList.toggle('theme-light', savedTheme === 'light');
      document.body.classList.toggle('theme-dark', savedTheme === 'dark');
      themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('theme-light');
        document.body.classList.toggle('theme-light', !isLight);
        document.body.classList.toggle('theme-dark', isLight);
        localStorage.setItem('og_calc_theme', isLight ? 'dark' : 'light');
      });
    }
  }

  // === ОСТАЛЬНЫЕ ФУНКЦИИ ===
  function persistLfInputs(){
    try{
      const buildRows = document.querySelectorAll('#tbodyLfBuildings tr');
      const researchRows = document.querySelectorAll('#tbodyLfResearch tr');
      const b = [];
      buildRows.forEach((tr,i)=>{
        const from = parseNumberInput(tr.querySelector('input[data-type="from"]')?.value);
        const to = parseNumberInput(tr.querySelector('input[data-type="to"]')?.value);
        const planets = parseNumberInput(tr.querySelector('input[data-type="planets"]')?.value) || 1; // НОВОЕ
        b[i] = { from, to, planets }; // НОВОЕ
      });
      const r = [];
      researchRows.forEach((tr,i)=>{
        const from = parseNumberInput(tr.querySelector('input[data-type="from"]')?.value);
        const to = parseNumberInput(tr.querySelector('input[data-type="to"]')?.value);
        r[i] = { from, to };
      });
      localStorage.setItem(KEYS.LF_INPUTS_BUILD, JSON.stringify(b));
      localStorage.setItem(KEYS.LF_INPUTS_RESEARCH, JSON.stringify(r));
    }catch(e){}
  }

  function applyLang(lang){
    if(!lang) return;
    try { localStorage.setItem(KEYS.LANG, lang); } catch(e){}
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(key && LANG[lang] && LANG[lang][key] !== undefined){ el.textContent = LANG[lang][key]; }
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const key = el.getAttribute('data-i18n-ph');
      if(key && LANG[lang] && LANG[lang][key] !== undefined){ el.setAttribute('placeholder', LANG[lang][key]); }
    });
    buildRowsBuildings();
    buildRowsResearch();
    renderTable();
    buildRowsLfBuildings();
    buildRowsLfResearch();
    restoreFromStorage();
    attachLiveThousandsFormatting('#boxesCount, #boxValue, #planetMetal, #planetCrystal, #planetDeut, input[data-id]');
    attachInputsHandlers();
    recalcAllBuildings();
    recalcAllResearch();
    recalcAllLfBuildings();
    recalcAllLfResearch();
    computeFleet();
    positionTabs();
    document.getElementById('langRU')?.classList.toggle('active', lang==='ru');
    document.getElementById('langTR')?.classList.toggle('active', lang==='tr');
  }

  function restoreFromStorage(){
    try{
      buildRowsBuildings();
      buildRowsResearch();
      renderTable();
      const inputsBuild = JSON.parse(localStorage.getItem(KEYS.INPUTS_BUILD) || 'null');
      if(inputsBuild){
        const trs = document.getElementById('tbodyBuildings')?.querySelectorAll('tr') || [];
        trs.forEach((tr,i)=>{
          if(inputsBuild[i]){
            tr.querySelector('input[data-type="from"]').value = inputsBuild[i].from ? String(Math.min(99, inputsBuild[i].from)) : '';
            tr.querySelector('input[data-type="to"]').value = inputsBuild[i].to ? String(Math.min(99, inputsBuild[i].to)) : '';
            tr.querySelector('input[data-type="planets"]').value = inputsBuild[i].planets ? formatWithDotsRaw(inputsBuild[i].planets) : '1';
          }
        });
      }
      const inputsResearch = JSON.parse(localStorage.getItem(KEYS.INPUTS_RESEARCH) || 'null');
      if(inputsResearch){
        const trs = document.getElementById('tbodyResearch')?.querySelectorAll('tr') || [];
        trs.forEach((tr,i)=>{
          if(inputsResearch[i]){
            tr.querySelector('input[data-type="from"]').value = inputsResearch[i].from ? String(Math.min(99, inputsResearch[i].from)) : '';
            tr.querySelector('input[data-type="to"]').value = inputsResearch[i].to ? String(Math.min(99, inputsResearch[i].to)) : '';
          }
        });
      }
      const savedRace = localStorage.getItem(KEYS.LF_RACE) || 'humans';
      currentLifeformRace = savedRace;
      const lfSel = document.getElementById('lifeformSelect'); if(lfSel) lfSel.value = savedRace;
      buildRowsLfBuildings();
      buildRowsLfResearch();
      const lfInputsBuild = JSON.parse(localStorage.getItem(KEYS.LF_INPUTS_BUILD) || 'null');
      if(lfInputsBuild){
        document.querySelectorAll('#tbodyLfBuildings tr').forEach((tr,i)=>{
          if(lfInputsBuild[i]){
            tr.querySelector('input[data-type="from"]').value = lfInputsBuild[i].from ? String(Math.min(99, lfInputsBuild[i].from)) : '';
            tr.querySelector('input[data-type="to"]').value = lfInputsBuild[i].to ? String(Math.min(99, lfInputsBuild[i].to)) : '';
            tr.querySelector('input[data-type="planets"]').value = lfInputsBuild[i].planets ? formatWithDotsRaw(lfInputsBuild[i].planets) : '1'; // НОВОЕ
          }
        });
      }
      const lfInputsResearch = JSON.parse(localStorage.getItem(KEYS.LF_INPUTS_RESEARCH) || 'null');
      if(lfInputsResearch){
        document.querySelectorAll('#tbodyLfResearch tr').forEach((tr,i)=>{
          if(lfInputsResearch[i]){
            tr.querySelector('input[data-type="from"]').value = lfInputsResearch[i].from ? String(Math.min(99, lfInputsResearch[i].from)) : '';
            tr.querySelector('input[data-type="to"]').value = lfInputsResearch[i].to ? String(Math.min(99, lfInputsResearch[i].to)) : '';
          }
        });
      }
      const boxes = JSON.parse(localStorage.getItem(KEYS.BOXES) || '{}');
      if(boxes){
        if(boxes.boxesCount) document.getElementById('boxesCount').value = formatWithDotsRaw(boxes.boxesCount);
        if(boxes.boxValue) document.getElementById('boxValue').value = formatWithDotsRaw(boxes.boxValue);
        if(boxes.planetMetal) document.getElementById('planetMetal').value = formatWithDotsRaw(boxes.planetMetal);
        if(boxes.planetCrystal) document.getElementById('planetCrystal').value = formatWithDotsRaw(boxes.planetCrystal);
        if(boxes.planetDeut) document.getElementById('planetDeut').value = formatWithDotsRaw(boxes.planetDeut);
      }
      const tmSaved = localStorage.getItem(KEYS.TM);
      if(tmSaved) document.getElementById('tmInput').value = tmSaved;
      const shipQty = JSON.parse(localStorage.getItem(KEYS.SHIP_QTY) || '{}');
      if(shipQty){
        document.querySelectorAll('input[data-id]').forEach(inp=>{
          const v = shipQty[inp.dataset.id]; if(v) inp.value = formatWithDotsRaw(v);
        });
      }
      const megSaved = localStorage.getItem(KEYS.ROCKTAL_MEGALITH_LEVEL);
      const mrcSaved = localStorage.getItem(KEYS.ROCKTAL_MRC_LEVEL);
      if(megSaved !== null && document.getElementById('megalithLevel')) document.getElementById('megalithLevel').value = String(parseNumberInput(megSaved));
      if(mrcSaved !== null && document.getElementById('mrcLevel')) document.getElementById('mrcLevel').value = String(parseNumberInput(mrcSaved));
      const trf = JSON.parse(localStorage.getItem(KEYS.TRANSFORM) || 'null');
      if(trf){
        window.scale = trf.scale || 1; window.posX = trf.posX || 0; window.posY = trf.posY || 0;
        const wrapper = document.getElementById('tableWrapper');
        if(wrapper){
          wrapper.style.transform = `translate(${Math.round(window.posX)}px, ${Math.round(window.posY)}px) scale(${window.scale})`;
          wrapper.style.willChange = 'transform';
        }
      } else {
        window.scale = 1; window.posX = 0; window.posY = 0;
      }
      const lang = localStorage.getItem(KEYS.LANG) || 'ru';
      document.getElementById('langRU')?.classList.toggle('active', lang==='ru');
      document.getElementById('langTR')?.classList.toggle('active', lang==='tr');
      const savedTheme = localStorage.getItem('og_calc_theme') || 'dark';
      document.body.classList.toggle('theme-light', savedTheme === 'light');
      document.body.classList.toggle('theme-dark', savedTheme === 'dark');
    }catch(e){}
  }

  function centerWrapper(){
    const wrapperEl = document.getElementById('tableWrapper');
    if(!wrapperEl) return;
    window.scale = 1;
    window.posX = Math.round((window.innerWidth - wrapperEl.getBoundingClientRect().width) / 2);
    window.posY = Math.round((window.innerHeight - wrapperEl.getBoundingClientRect().height) / 2);
    const wrapper = document.getElementById('tableWrapper');
    if(wrapper){
      wrapper.style.transform = `translate(${window.posX}px, ${window.posY}px) scale(${window.scale})`;
      wrapper.style.willChange = 'transform';
    }
    try{ localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale, posX: window.posX, posY: window.posY })); }catch(e){}
    positionTabs();
  }

  function fullResetToZero(){
    try{
      localStorage.removeItem(KEYS.INPUTS_BUILD);
      localStorage.removeItem(KEYS.INPUTS_RESEARCH);
      localStorage.removeItem(KEYS.TM);
      localStorage.removeItem(KEYS.BOXES);
      localStorage.removeItem(KEYS.SHIP_QTY);
      localStorage.removeItem(KEYS.LF_INPUTS_BUILD);
      localStorage.removeItem(KEYS.LF_INPUTS_RESEARCH);
      localStorage.removeItem(KEYS.ROCKTAL_MEGALITH_LEVEL);
      localStorage.removeItem(KEYS.ROCKTAL_MRC_LEVEL);
      document.querySelectorAll('#tbodyBuildings input,#tbodyResearch input,#tbodyLfBuildings input,#tbodyLfResearch input,input[data-id]').forEach(i=>{ i.value=''; });
      ['boxesCount','boxValue','planetMetal','planetCrystal','planetDeut','tmInput','megalithLevel','mrcLevel'].forEach(id=>{
        const el = document.getElementById(id);
        if(el) el.value = '';
      });
      window.scale = 1;
      window.posX = Math.round(window.posX || 0);
      window.posY = Math.round(window.posY || 0);
      const wrapper = document.getElementById('tableWrapper');
      if(wrapper){
        wrapper.style.transform = `translate(${window.posX}px, ${window.posY}px) scale(${window.scale})`;
        wrapper.style.willChange = 'transform';
      }
      try{ localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale, posX: window.posX, posY: window.posY })); }catch(e){}
      recalcAllBuildings();
      recalcAllResearch();
      recalcAllLfBuildings();
      recalcAllLfResearch();
      renderTable();
      computeFleet();
      ['sumPointsB','sumPointsR','sumPointsLfB','sumPointsLfR','totalMetalEq','grandTotal'].forEach(id=>{
        const el = document.getElementById(id); if(el) el.textContent = '0';
      });
      const totalResEl = document.getElementById('totalRes');
      if(totalResEl) totalResEl.innerHTML = `${formatSpanMetal(0)} ${LANG[localStorage.getItem(KEYS.LANG)||'ru'].metal}, ${formatSpanCrystal(0)} ${LANG[localStorage.getItem(KEYS.LANG)||'ru'].crystal}, ${formatSpanDeut(0)} ${LANG[localStorage.getItem(KEYS.LANG)||'ru'].deut}`;
      const boxesNeededEl = document.getElementById('boxesNeeded'); if(boxesNeededEl) boxesNeededEl.textContent = '—';
      const boxesCostTL = document.getElementById('boxesCostTL'); if(boxesCostTL) boxesCostTL.innerHTML = `<span class="try-value">TRY: —</span>`;
      const leftoverTmValue = document.getElementById('leftoverTmValue'); if(leftoverTmValue) leftoverTmValue.textContent = '—';
      centerWrapper();
    }catch(e){}
  }

  function positionTabs(){
    try{
      const tabsLeftEl = document.getElementById('tabsLeft');
      const headerBarEl = document.getElementById('headerBar');
      const wrapperEl = document.getElementById('tableWrapper');
      if(!tabsLeftEl || !headerBarEl || !wrapperEl) return;
      const boxRow = document.getElementById('globalBoxRow') || headerBarEl;
      const wrapperRect = wrapperEl.getBoundingClientRect();
      const targetRect = boxRow.getBoundingClientRect();
      const offsetWithinWrapper = targetRect.top - wrapperRect.top;
      const extra = -2;
      tabsLeftEl.style.top = `${Math.max(0, Math.round(offsetWithinWrapper + extra))}px`;
    }catch(e){}
  }

  function updateBoxesNeeded() {
    try {
      const boxesNeededEl = document.getElementById('boxesNeeded');
      const boxValueInput = document.getElementById('boxValue');
      const boxValue = parseNumberInput(boxValueInput?.value || '');
      const targetMetal = getCurrentTotalMetalValue();
      if (!boxValue || boxValue <= 0) {
        boxesNeededEl && (boxesNeededEl.textContent = '—');
        document.getElementById('boxesCostTL').innerHTML = `<span class="try-value">TRY: —</span>`;
        const leftover = document.getElementById('leftoverTmValue');
        leftover && (leftover.textContent = '—');
      } else {
        const needed = Math.ceil(targetMetal / boxValue);
        boxesNeededEl && (boxesNeededEl.textContent = formatWithDotsRaw(needed));
        updateBoxesCostTL();
      }
    } catch (e) {}
  }

  function updateBoxesCostTL() {
    try {
      const boxesCostTLEl = document.getElementById('boxesCostTL');
      const leftoverTmValueEl = document.getElementById('leftoverTmValue');
      const boxValueInput = document.getElementById('boxValue');
      if (!boxesCostTLEl) return;
      const boxValue = parseNumberInput(boxValueInput?.value || '');
      if (boxValue <= 0) {
        boxesCostTLEl.innerHTML = `<span class="try-value">TRY: —</span>`;
        leftoverTmValueEl && (leftoverTmValueEl.textContent = '—');
        return;
      }
      const targetMetalEq = getCurrentTotalMetalValue();
      if (!Number.isFinite(targetMetalEq) || targetMetalEq <= 0) {
        boxesCostTLEl.innerHTML = `<span class="try-value">TRY: 0</span>`;
        leftoverTmValueEl && (leftoverTmValueEl.textContent = '0');
        return;
      }
      const neededBoxesRaw = Math.ceil(targetMetalEq / boxValue);
      const MAX_ALLOWED_BOXES = 1e9;
      if (neededBoxesRaw > MAX_ALLOWED_BOXES) {
        boxesCostTLEl.innerHTML = `<span class="try-value">TRY: —</span>`;
        leftoverTmValueEl && (leftoverTmValueEl.textContent = '—');
        return;
      }
      const requiredTM = neededBoxesRaw * CONFIG.TM_PER_BOX;
      const pack = (CONFIG.TM_PACKS && CONFIG.TM_PACKS[0]) || null;
      const packTm = pack && Number.isFinite(Number(pack.tm)) ? Number(pack.tm) : 0;
      const packPriceTRY = pack && (Number.isFinite(Number(pack.priceTRY)) ? Number(pack.priceTRY) : 0);
      if (packTm <= 0 || packPriceTRY <= 0) {
        boxesCostTLEl.innerHTML = `<span class="try-value">TRY: —</span>`;
        leftoverTmValueEl && (leftoverTmValueEl.textContent = '—');
        return;
      }
      const packsCount = Math.max(1, Math.ceil(requiredTM / packTm));
      const totalTRY = packsCount * packPriceTRY;
      const leftoverTM = packsCount * packTm - requiredTM;
      boxesCostTLEl.innerHTML = `<span class="try-value">TRY: ${formatNumberWithDots(totalTRY)}</span>`;
      leftoverTmValueEl && (leftoverTmValueEl.textContent = leftoverTM > 0 ? formatWithDotsRaw(leftoverTM) : '0');
    } catch (e) {}
  }

  function getCurrentTotalMetalValue() {
    try {
      const active = document.querySelector('.tab-btn.active')?.dataset.tab;
      if (active === 'research') {
        return parseNumberInput(document.getElementById('sumTotalMetalR')?.textContent);
      }
      if (active === 'fleet') {
        return parseNumberInput(document.getElementById('totalMetalEq')?.textContent);
      }
      if (active === 'lifeforms') {
        const activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
        if (activeSub === 'lf-buildings') {
          return parseNumberInput(document.getElementById('sumTotalMetalLfB')?.textContent);
        } else {
          return parseNumberInput(document.getElementById('sumTotalMetalLfR')?.textContent);
        }
      }
      return parseNumberInput(document.getElementById('sumTotalMetalB')?.textContent);
    } catch (e) {
      return 0;
    }
  }

  function setActiveTab(tab){
    document.querySelectorAll('.tab-btn').forEach(b=>{
      const isActive = (b.dataset.tab===tab);
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      b.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    document.getElementById('tabBuildings')?.classList.toggle('active', tab==='buildings');
    document.getElementById('tabResearch')?.classList.toggle('active', tab==='research');
    document.getElementById('tabFleet')?.classList.toggle('active', tab==='fleet');
    document.getElementById('tabLifeforms')?.classList.toggle('active', tab==='lifeforms');
    if(tab==='fleet'){
      const fleetDelivery = document.getElementById('fleetDelivery');
      if(fleetDelivery) fleetDelivery.style.display = 'flex';
      renderTable();
      computeFleet();
    } else {
      const fleetDelivery = document.getElementById('fleetDelivery');
      if(fleetDelivery) fleetDelivery.style.display = 'none';
      if(tab==='buildings') recalcAllBuildings();
      else if(tab==='research') recalcAllResearch();
      else if(tab==='lifeforms'){
        const activeSub = document.querySelector('.lf-subtab-btn.active')?.dataset.subtab || 'lf-buildings';
        document.querySelectorAll('.lf-subtab-btn').forEach(b=> b.classList.remove('active'));
        document.querySelector(`.lf-subtab-btn[data-subtab="${activeSub}"]`)?.classList.add('active');
        document.getElementById('lf-buildings').classList.toggle('active', activeSub==='lf-buildings');
        document.getElementById('lf-research').classList.toggle('active', activeSub==='lf-research');
        buildRowsLfBuildings();
        buildRowsLfResearch();
        attachLiveThousandsFormatting('#tbodyLfBuildings input, #tbodyLfResearch input');
        recalcAllLfBuildings();
        recalcAllLfResearch();
      }
    }
    updateBoxesNeeded();
    try{
      localStorage.setItem(KEYS.ACTIVE_TAB, tab);
    }catch(e){}
  }

  // === ИНИЦИАЛИЗАЦИЯ ===
  (function(){
    const dragHandle = document.getElementById('dragHandle');
    const wrapper = document.getElementById('tableWrapper');
    if(!dragHandle || !wrapper) return;
    let dragging = false;
    let startX = 0, startY = 0;
    let startPosX = 0, startPosY = 0;
    let rafId = null;
    dragHandle.style.touchAction='none';
    dragHandle.style.cursor='grab';
    function applyTransform(){
      rafId = null;
      wrapper.style.transform = `translate(${window.posX||0}px, ${window.posY||0}px) scale(${window.scale||1})`;
    }
    dragHandle.addEventListener('pointerdown', ev=>{
      ev.preventDefault();
      dragging = true;
      startX = ev.clientX;
      startY = ev.clientY;
      startPosX = window.posX || 0;
      startPosY = window.posY || 0;
      try{ dragHandle.setPointerCapture(ev.pointerId); }catch{}
      dragHandle.style.cursor='grabbing';
    });
    document.addEventListener('pointermove', ev=>{
      if(!dragging) return;
      ev.preventDefault();
      const dx = (ev.clientX - startX) / (window.scale || 1);
      const dy = (ev.clientY - startY) / (window.scale || 1);
      window.posX = startPosX + dx;
      window.posY = startPosY + dy;
      if(!rafId){
        rafId = requestAnimationFrame(applyTransform);
      }
    });
    function stopDrag(ev){
      if(!dragging) return;
      dragging = false;
      try{ dragHandle.releasePointerCapture && dragHandle.releasePointerCapture(ev && ev.pointerId); }catch{}
      dragHandle.style.cursor='grab';
      try{ localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale||1, posX: window.posX||0, posY: window.posY||0 })); }catch(e){}
      positionTabs();
    }
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointercancel', stopDrag);
    dragHandle.addEventListener('keydown', e=>{
      const step=10;
      if(e.key==='ArrowLeft'){ window.posX = (window.posX||0) - step; }
      if(e.key==='ArrowRight'){ window.posX = (window.posX||0) + step; }
      if(e.key==='ArrowUp'){ window.posY = (window.posY||0) - step; }
      if(e.key==='ArrowDown'){ window.posY = (window.posY||0) + step; }
      if(!rafId){ rafId = requestAnimationFrame(applyTransform); }
      try{ localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale||1, posX: window.posX||0, posY: window.posY||0 })); }catch(e){}
      positionTabs();
    });
  })();

  function init(){
    try{
      buildRowsBuildings();
      buildRowsResearch();
      renderTable();
      buildRowsLfBuildings();
      buildRowsLfResearch();
      // ⚠️ УБЕДИТЕСЬ, что вызов attachLiveThousandsFormatting НЕ ВКЛЮЧАЕТ .lvl-input
      attachLiveThousandsFormatting('#boxesCount, #boxValue, #planetMetal, #planetCrystal, #planetDeut, input[data-id]');
      attachLvlInputHandlers(); // Подключаем ограничение 0–99
      attachInputsHandlers();
      restoreFromStorage();
      const ZOOM_STEP = 1.08;
      document.getElementById('globalZoomIn')?.addEventListener('click', ()=>{
        window.scale = Math.min(3.5, (window.scale||1)*ZOOM_STEP);
        const wrapper = document.getElementById('tableWrapper');
        if(wrapper){
          wrapper.style.transform = `translate(${window.posX||0}px, ${window.posY||0}px) scale(${window.scale||1})`;
          wrapper.style.willChange = 'transform';
        }
        try{ localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale||1, posX: window.posX||0, posY: window.posY||0 })); }catch(e){}
        positionTabs();
      });
      document.getElementById('globalZoomOut')?.addEventListener('click', ()=>{
        window.scale = Math.max(0.4, (window.scale||1)/ZOOM_STEP);
        const wrapper = document.getElementById('tableWrapper');
        if(wrapper){
          wrapper.style.transform = `translate(${window.posX||0}px, ${window.posY||0}px) scale(${window.scale||1})`;
          wrapper.style.willChange = 'transform';
        }
        try{ localStorage.setItem(KEYS.TRANSFORM, JSON.stringify({ scale: window.scale||1, posX: window.posX||0, posY: window.posY||0 })); }catch(e){}
        positionTabs();
      });
      document.getElementById('globalZoomReset')?.addEventListener('click', ()=>{
        fullResetToZero();
        positionTabs();
      });
      window.addEventListener('resize', positionTabs);
      positionTabs();
      const savedTab = localStorage.getItem(KEYS.ACTIVE_TAB) || 'buildings';
      setActiveTab(savedTab);
    }catch(e){}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
