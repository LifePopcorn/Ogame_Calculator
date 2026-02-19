// ============================================
// OGame Калькулятор - languages.js
// Версия: 1.08.0 (Исправленная)
// ============================================
'use strict';

// ============================================
// КОНФИГУРАЦИЯ ЯЗЫКОВ
// ============================================
const LANGUAGE_CONFIG = Object.freeze({
    ICONS: {
        'en': 'images/languages/en.png',
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
    },
    NAMES: {
        'en': 'English',
        'ru': 'Russian',
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
    },
    DEFAULT: 'ru'
});

// ============================================
// ПОСТРОЙКИ
// ============================================
const LANG_BUILDINGS_BASE = {
    en: [
        "Metal Mine", "Crystal Mine", "Deuterium Synthesizer", "Solar Plant",
        "Fusion Plant", "Robot Factory", "Nanite Factory", "Shipyard",
        "Metal Storage", "Crystal Storage", "Deuterium Tank", "Research Lab",
        "Terraformer", "Alliance Depot", "Dock", "Missile Silo"
    ],
    ru: [
        "Рудник по добыче металла", "Рудник по добыче кристалла", "Синтезатор дейтерия", "Солнечная электростанция",
        "Термоядерная электростанция", "Фабрика роботов", "Фабрика нанитов", "Верфь",
        "Хранилище металла", "Хранилище кристалла", "Хранилище дейтерия", "Иссл-ская лаборатория",
        "Терраформер", "Склад альянса", "Космический док", "Ракетная шахта"
    ],
    de: [
        "Metallmine", "Kristallmine", "Deuterium-Synthesizer", "Solaranlage",
        "Fusionskraftwerk", "Robotergenerator", "Nanitenfabrik", "Werft",
        "Metalllager", "Kristalllager", "Deuterium-Tank", "Forschungslabor",
        "Terraformer", "Allianzlager", "Dock", "Raketensilo"
    ],
    pl: [
        "Kopalnia metali", "Kopalnia kryształu", "Syntetyzator deuteru", "Elektrownia słoneczna",
        "Elektrownia termojądrowa", "Fabryka robotów", "Fabryka nanitów", "Stocznia",
        "Magazyn metali", "Magazyn kryształu", "Zbiornik deuteru", "Laboratorium badawcze",
        "Terraformer", "Magazyn sojuszu", "Dok", "Rakieta"
    ],
    es: [
        "Mina de metal", "Mina de cristal", "Sintetizador de deuterio", "Planta solar",
        "Planta de fusión", "Fábrica de robots", "Fábrica de nanitas", "Astillero",
        "Almacén de metal", "Almacén de cristal", "Tanque de deuterio", "Laboratorio de investigación",
        "Terraformer", "Depósito de la alianza", "Dique", "Silo de misiles"
    ],
    fr: [
        "Mine de métal", "Mine de cristal", "Synthétiseur de deutérium", "Centrale solaire",
        "Centrale à fusion", "Usine de robots", "Usine de nanites", "Chantier spatial",
        "Entrepôt de métal", "Entrepôt de cristal", "Réservoir de deutérium", "Laboratoire de recherche",
        "Terraformeur", "Dépôt d'alliance", "Quai", "Silos à fusées"
    ],
    it: [
        "Miniera di metallo", "Miniera di cristallo", "Sintetizzatore di deuterio", "Centrale solare",
        "Centrale a fusione", "Fabbrica di robot", "Fabbrica di naniti", "Cantiere navale",
        "Deposito di metallo", "Deposito di cristallo", "Serbatoio di deuterio", "Laboratorio di ricerca",
        "Terraformer", "Deposito dell'alleanza", "Dock", "Silo missilistico"
    ],
    nl: [
        "Metaalmijn", "Kristalmijn", "Deuterium-synthesizer", "Zonnepaneel",
        "Fusiecentrale", "Robotfabriek", "Nanietfabriek", "Scheepswerf",
        "Metaalopslag", "Kristalopslag", "Deuteriumtank", "Onderzoekscentrum",
        "Terraformer", "Alliantie-opslag", "Dok", "Raketensilo"
    ],
    sk: [
        "Dolný kov", "Dolný kryštál", "Syntetizátor deuteria", "Solárna elektráreň",
        "Fúzna elektráreň", "Fabrika robotov", "Fabrika nanitov", "Lodenica",
        "Úložisko kovu", "Úložisko kryštálu", "Nádrž deuteria", "Výskumné laboratórium",
        "Terraformer", "Úložisko aliancie", "Dok", "Raketový silo"
    ],
    tr: [
        "Metal Madeni", "Kristal Madeni", "Deuterium Sentezleyici", "Solar Enerji Santrali",
        "Füzyon Santrali", "Robot Fabrikası", "Nanite Fabrikası", "Tersane",
        "Metal Deposu", "Kristal Deposu", "Deuterium Tankeri", "Bilimsel Araştırma Laboratuvarı",
        "Terraformer", "İttifak Deposu", "Uzay İskelesi", "Roket Silosu"
    ],
    pt: [
        "Mina de metal", "Mina de cristal", "Sintetizador de deutério", "Central solar",
        "Central de fusão", "Fábrica de robôs", "Fábrica de nanitas", "Estaleiro",
        "Armazém de metal", "Armazém de cristal", "Tanque de deutério", "Laboratório de pesquisa",
        "Terraformador", "Depósito da aliança", "Doca", "Silos de mísseis"
    ],
    bs: [
        "Rudnik metala", "Rudnik kristala", "Sintetizator deuterija", "Solarna elektrana",
        "Fuzijska elektrana", "Fabrika robotima", "Fabrika nanita", "Brodogradilište",
        "Skladište metala", "Skladište kristala", "Tank za deuterij", "Istraživačka laboratorija",
        "Terraformer", "Skladište saveza", "Dok", "Raketni silo"
    ]
};

const LANG_BUILDINGS = Object.freeze(LANG_BUILDINGS_BASE);

// ============================================
// ИССЛЕДОВАНИЯ
// ============================================
const LANG_RESEARCH_BASE = {
    en: [
        "Espionage", "Computer Technology", "Weapon Technology", "Shield Technology",
        "Ship Armor", "Energy Technology", "Hyperspace Technology", "Combustion Drive",
        "Impulse Drive", "Hyperspace Drive", "Laser Technology", "Ion Technology",
        "Plasma Technology", "Intergalactic Research Network", "Astrophysics", "Graviton Technology"
    ],
    ru: [
        "Шпионаж", "Компьютерная технология", "Оружейная технология", "Щитовая технология",
        "Броня космических кораблей", "Энергетическая технология", "Гипер-нная технология", "Реактивный Двигатель",
        "Импульсный Двигатель", "Гипер-нный Двигатель", "Лазерная технология", "Ионная технология",
        "Плазменная технология", "М.И.С", "Астрофизика", "Гравитационная технология"
    ],
    de: [
        "Spionage", "Computertechnologie", "Waffentechnologie", "Schildtechnologie",
        "Raumschiffpanzerung", "Energietechnologie", "Hyperraumtechnologie", "Verbrennungstriebwerk",
        "Impulstriebwerk", "Hyperraumantrieb", "Laser-Technologie", "Ionentechnologie",
        "Plasmatechnologie", "Intergalaktisches Forschungsnetzwerk", "Astrophysik", "Gravitontechnologie"
    ],
    pl: [
        "Szpiegostwo", "Technologia komputerowa", "Technologia broni", "Technologia tarczy",
        "Pancerz statku kosmicznego", "Technologia energetyczna", "Technologia hiperprzestrzeni", "Silnik spalania",
        "Silnik impulsowy", "Silnik hiperprzestrzenny", "Technologia laserowa", "Technologia jonowa",
        "Technologia plazmowa", "Międzygalaktyczna sieć badań", "Astrofizyka", "Technologia grawitonowa"
    ],
    es: [
        "Espionaje", "Tecnología informática", "Tecnología de armas", "Tecnología de escudos",
        "Armadura de naves espaciales", "Tecnología energética", "Tecnología de hiperespacio", "Motor de combustión",
        "Motor de impulso", "Motor de hiperespacio", "Tecnología láser", "Tecnología iónica",
        "Tecnología de plasma", "Red de investigación intergaláctica", "Astrofísica", "Tecnología de gravitones"
    ],
    fr: [
        "Espionnage", "Technologie informatique", "Technologie d'armes", "Technologie de bouclier",
        "Armure des vaisseaux spatiaux", "Technologie énergétique", "Technologie d'hyperespace", "Moteur à combustion",
        "Moteur à impulsion", "Moteur d'hyperespace", "Technologie laser", "Technologie ionique",
        "Technologie plasma", "Réseau de recherche intergalactique", "Astrophysique", "Technologie des gravitons"
    ],
    it: [
        "Spionaggio", "Tecnologia informatica", "Tecnologia delle armi", "Tecnologia degli scudi",
        "Armatura delle navi spaziali", "Tecnologia energetica", "Tecnologia iperspaziale", "Propulsione a combustione",
        "Propulsione a impulso", "Propulsione iperspaziale", "Tecnologia laser", "Tecnologia a ioni",
        "Tecnologia a plasma", "Rete di ricerca intergalattica", "Astrofisica", "Tecnologia dei gravitoni"
    ],
    nl: [
        "Spionage", "Computertechnologie", "Wapentechnologie", "Schildtechnologie",
        "Ruimteschippanzering", "Energie technologie", "Hyperruimte technologie", "Verbrandingsaandrijving",
        "Impuls aandrijving", "Hyperruimte aandrijving", "Laser technologie", "Ion technologie",
        "Plasma technologie", "Intergalactisch onderzoeksnetwerk", "Astrofysica", "Graviton technologie"
    ],
    sk: [
        "Špiónstvo", "Počítačová technológia", "Zbraňová technológia", "Ochranná technológia",
        "Páncel vesmírnych lodí", "Energetická technológia", "Hyperpriestorová technológia", "Spalovací motor",
        "Impulzný motor", "Hyperpriestorový motor", "Laserová technológia", "Iónová technológia",
        "Plazmová technológia", "Medzigalaktická výskumná sieť", "Astrofyzika", "Gravitónová technológia"
    ],
    tr: [
        "Casusluk Tekniği", "Bilgisayar Teknolojisi", "Silah Teknolojisi", "Koruyucu Kalkan Tekniği",
        "Uzay Gemisi Zırhlandırması", "Enerji Tekniği", "Hiperuzay Teknolojisi", "Yanmalı Motor Takımı",
        "İtki Motoru", "Hiperuzay İticisi", "Lazer Tekniği", "İyon Tekniği",
        "Plazma Tekniği", "Galaksiler Arası Araştırma Ağı", "Astrofizik", "Gravitasyon Araştırması"
    ],
    pt: [
        "Espionagem", "Tecnologia da computação", "Tecnologia de armas", "Tecnologia de escudos",
        "Armadura de naves espaciais", "Tecnologia energética", "Tecnologia de hiperespaço", "Motor de combustão",
        "Motor de impulso", "Motor de hiperespaço", "Tecnologia a laser", "Tecnologia iónica",
        "Tecnologia de plasma", "Rede de investigação interestelar", "Astrofísica", "Tecnologia de gravitões"
    ],
    bs: [
        "Špijunacija", "Računarska tehnologija", "Oružna tehnologija", "Zaštitna tehnologija",
        "Oklop svemirskih brodova", "Energetska tehnologija", "Hipersvemirska tehnologija", "Motor sa sagorijevanjem",
        "Impulsni motor", "Hipersvemirski motor", "Laser tehnologija", "Jonska tehnologija",
        "Plazma tehnologija", "Međugalaktička istraživača mreža", "Astrofizika", "Gravitaciona tehnologija"
    ]
};

const LANG_RESEARCH = Object.freeze(LANG_RESEARCH_BASE);

// ============================================
// ПОСТРОЙКИ ФОРМ ЖИЗНИ
// ============================================
const LANG_LF_BUILDINGS_BASE = {
    en: {
        1001: "Residential Sector", 1002: "Biosphere Farm", 1003: "Research Center", 1004: "Science Academy",
        1005: "Nerve Calibration Center", 1006: "High Energy Melting", 1007: "Food Storage",
        1008: "Fusion-Powered Factory", 1009: "Skyscraper", 1010: "Biotech Lab",
        1011: "Metropolis", 1012: "Planetary Shield",
        2001: "Meditation Enclave", 2002: "Crystal Farm", 2003: "Rune Technologium", 2004: "Rune Forge",
        2005: "Orikterium", 2006: "Magma Forge", 2007: "Chamber of Rupture", 2008: "Megalith", 2009: "Crystal Purification",
        2010: "Deuterium Synthesizer", 2011: "Mineral Research Center", 2012: "Advanced Recycling Plant",
        3001: "Assembly Line", 3002: "Fusion Cell Factory", 3003: "Robotics Research Center",
        3004: "Upgrade Network", 3005: "Quantum Computer Center", 3006: "Automated Assembly Center",
        3007: "High Performance Transformer", 3008: "Microchip Line", 3009: "Production Assembly Workshop",
        3010: "High Performance Synthesizer", 3011: "Mass Chip Production", 3012: "Repair Nanites",
        4001: "Sanctuary", 4002: "Antimatter Condenser", 4003: "Cyclone Chamber", 4004: "Hall of Realization",
        4005: "Transcendence Forum", 4006: "Antimatter Converter", 4007: "Cloning Lab",
        4008: "Chrysalis Accelerator", 4009: "Biomodifier", 4010: "Psionic Modulator",
        4011: "Ship Production Hall", 4012: "Supra Refractor"
    },
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
    de: {
        1001: "Wohnviertel", 1002: "Biosphärenfarm", 1003: "Forschungszentrum", 1004: "Wissenschaftsakademie",
        1005: "Nervenkalibrierungszentrum", 1006: "Hochenergie-Schmelzen", 1007: "Lebensmittelspeicher",
        1008: "Fusionskraftwerk", 1009: "Wolkenkratzer", 1010: "Biotechnologielabor",
        1011: "Metropole", 1012: "Planetenschild",
        2001: "Meditationsenklave", 2002: "Kristallfarm", 2003: "Rune-Technologium", 2004: "Runenschmiede",
        2005: "Orikterium", 2006: "Magma-Schmiede", 2007: "Zerbrechungskammer", 2008: "Megalith", 2009: "Kristallreinigung",
        2010: "Deuterium-Synthesizer", 2011: "Mineralienforschungszentrum", 2012: "Erweiterte Recyclinganlage",
        3001: "Fließband", 3002: "Fusionszellfabrik", 3003: "Robotik-Forschungszentrum",
        3004: "Upgrade-Netzwerk", 3005: "Quantencomputer-Zentrum", 3006: "Automatisiertes Montagezentrum",
        3007: "Hochleistungstransformator", 3008: "Mikrochip-Linie", 3009: "Produktions- und Montagewerkstatt",
        3010: "Hochleistungssynthesizer", 3011: "Massen-Chip-Produktion", 3012: "Reparaturnaniten",
        4001: "Heiligtum", 4002: "Antimaterie-Kondensator", 4003: "Zyklonkammer", 4004: "Halle der Realisierung",
        4005: "Forum der Transzendenz", 4006: "Antimaterie-Konverter", 4007: "Klonierungslabor",
        4008: "Chrysalis-Beschleuniger", 4009: "Biomodifikator", 4010: "Psionischer Modulator",
        4011: "Schiffproduktionshalle", 4012: "Supra-Refraktor"
    }
};

// Fallback для остальных языков
['pl', 'es', 'fr', 'it', 'nl', 'sk', 'tr', 'pt', 'bs'].forEach(lang => {
    LANG_LF_BUILDINGS_BASE[lang] = LANG_LF_BUILDINGS_BASE.en;
});

const LANG_LF_BUILDINGS = Object.freeze(LANG_LF_BUILDINGS_BASE);

// ============================================
// ИССЛЕДОВАНИЯ ФОРМ ЖИЗНИ
// ============================================
const LANG_LF_RESEARCH_BASE = {
    en: {
        1101: "Intergalactic Envoys", 1102: "High-Efficiency Extractors", 1103: "Fusion Drives",
        1104: "Stealth Field Generator", 1105: "Orbital Dock", 1106: "Research AI",
        1107: "High-Performance Terraformer", 1108: "Enhanced Extraction Technologies", 1109: "Light Fighter Mk II",
        1110: "Cruiser Mk II", 1111: "Enhanced Laboratory Technology", 1112: "Plasma Terraformer",
        1113: "Low-Temperature Drives", 1114: "Bomber Mk II", 1115: "Destroyer Mk II",
        1116: "Battlecruiser Mk II", 1117: "Helper Robots", 1118: "Quantum Computer",
        2101: "Volcanic Batteries", 2102: "Acoustic Scanning", 2103: "High-Energy Supply Systems",
        2104: "Cargo Bay Expansion", 2105: "Magma-Powered Production",
        2106: "Geothermal Power Plants", 2107: "Echo Sounding", 2108: "Ion Crystal Enhancement",
        2109: "Enhanced Stellarator", 2110: "Reinforced Diamond Drills", 2111: "Seismic Extraction Technology",
        2112: "Magma-Powered Supply Systems", 2113: "Ionized Crystal Modules",
        2114: "Optimized Mine Construction", 2115: "Diamond Energy Transmitter",
        2116: "Obsidian Shield Plating", 2117: "Rune Shields", 2118: "Rock'tal Collector Enhancement",
        3101: "Catalyst Technology", 3102: "Plasma Drive", 3103: "Efficiency Module",
        3104: "Warehouse AI", 3105: "General Repair – Light Fighter", 3106: "Automated Transport Lines",
        3107: "Enhanced Drone AI", 3108: "Experimental Recycling Technology", 3109: "General Repair – Cruiser",
        3110: "Gravitational Maneuver Autopilot", 3111: "High-Temperature Superconductors", 3112: "General Repair – Battleship",
        3113: "Swarm AI", 3114: "General Repair – Battlecruiser", 3115: "General Repair – Bomber",
        3116: "General Repair – Destroyer", 3117: "Experimental Weapon Technology", 3118: "Mechas General Enhancement",
        4101: "Waste Heat Recovery", 4102: "Sulfide Process", 4103: "Psionic Network",
        4104: "Telekinetic Grab Beam", 4105: "Enhanced Sensor Technology", 4106: "Neuromodal Compressor",
        4107: "Neuro Interface", 4108: "Interplanetary Analytical Network", 4109: "Speed Boost – Heavy Fighter",
        4110: "Telekinetic Drive", 4111: "Sixth Sense", 4112: "Psycho Harmonizer",
        4113: "Efficient Swarm Intelligence", 4114: "Speed Boost – Large Cargo", 4115: "Gravitational Sensors",
        4116: "Speed Boost – Battleship", 4117: "Psionic Shield Matrix", 4118: "Kaelesh Explorer Enhancement"
    },
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
        2116: "Обсидиановое армирование щита", 2117: "Рунные щиты", 2118: "Улучшение Рок'тал для Коллекционера",
        3101: "Технология Катализаторов", 3102: "Плазменный двигатель", 3103: "Модуль эффективности",
        3104: "ИИ склада", 3105: "Генеральный ремонт (Лёгкий истребитель)", 3106: "Автоматизированные линии транспортировки",
        3107: "Улучшенный ИИ дронов", 3108: "Экспериментальная технология переработки", 3109: "Генеральный ремонт (Крейсер)",
        3110: "Автопилот гравитационного маневра", 3111: "Высокотемпературные суперпроводники", 3112: "Генеральный ремонт (Линкор)",
        3113: "Искусственный интеллект роя", 3114: "Генеральный ремонт (Линейный крейсер)", 3115: "Генеральный ремонт (Бомбардировщик)",
        3116: "Генеральный ремонт (Уничтожитель)", 3117: "Технология экспериментального вооружения", 3118: "Общее улучшение Мех",
        4101: "Теплоутилизация", 4102: "Сульфидный процесс", 4103: "Псионная сеть",
        4104: "Телекинетический захватный луч", 4105: "Технология улучшенных сенсоров", 4106: "Нейромодальный компрессор",
        4107: "Нейроинтерфейс", 4108: "Межпланетная аналитическая сеть", 4109: "Разгон (Тяжёлый истребитель)",
        4110: "Телекинетический двигатель", 4111: "Шестое чувство", 4112: "Психогармонизатор",
        4113: "Эффективный интеллект роя", 4114: "Разгон (Большой транспорт)", 4115: "Гравитационные сенсоры",
        4116: "Разгон (Линкор)", 4117: "Псионная матрица щита", 4118: "Улучшение Кэлиш для Исследователя"
    },
    de: {
        1101: "Intergalaktische Gesandte", 1102: "Hochleistungs-Extraktoren", 1103: "Fusionsantriebe",
        1104: "Tarnfeldgenerator", 1105: "Orbitale Dockstation", 1106: "Forschungs-KI",
        1107: "Hochleistungs-Terraformer", 1108: "Verbesserte Extraktionstechnologien", 1109: "Leichter Jäger Mk II",
        1110: "Kreuzer Mk II", 1111: "Verbesserte Labortechnologie", 1112: "Plasma-Terraformer",
        1113: "Niedertemperatur-Antriebe", 1114: "Bomber Mk II", 1115: "Zerstörer Mk II",
        1116: "Schlachtkreuzer Mk II", 1117: "Helfer-Roboter", 1118: "Quantencomputer",
        2101: "Vulkanische Batterien", 2102: "Akustische Abtastung", 2103: "Hochenergie-Versorgungssysteme",
        2104: "Frachtraumerweiterung", 2105: "Magma-betriebene Produktion",
        2106: "Geothermische Kraftwerke", 2107: "Echolot", 2108: "Ion-Kristall-Verbesserung",
        2109: "Verbesserter Stellarator", 2110: "Verstärkte Diamantbohrer", 2111: "Seismische Extraktionstechnologie",
        2112: "Magma-betriebene Versorgungssysteme", 2113: "Ionisierte Kristallmodule",
        2114: "Optimierte Mine-Bauweise", 2115: "Diamant-Energieübertrager",
        2116: "Obsidian-Schildverkleidung", 2117: "Runenschilder", 2118: "Rock'tal-Sammler-Verbesserung",
        3101: "Katalysatortechnologie", 3102: "Plasma-Antrieb", 3103: "Effizienzmodul",
        3104: "Lager-KI", 3105: "Allgemeine Reparatur – Leichter Jäger", 3106: "Automatisierte Transportleitungen",
        3107: "Verbesserte Drohnen-KI", 3108: "Experimentelle Recycling-Technologie", 3109: "Allgemeine Reparatur – Kreuzer",
        3110: "Gravitationsmanöver-Autopilot", 3111: "Hochtemperatur-Supraleiter", 3112: "Allgemeine Reparatur – Schlachtschiff",
        3113: "Schwarm-KI", 3114: "Allgemeine Reparatur – Schlachtkreuzer", 3115: "Allgemeine Reparatur – Bomber",
        3116: "Allgemeine Reparatur – Zerstörer", 3117: "Experimentelle Waffentechnologie", 3118: "Allgemeine Mechas-Verbesserung",
        4101: "Abwärmerückgewinnung", 4102: "Sulfidprozess", 4103: "Psionisches Netzwerk",
        4104: "Telekinetischer Greiferstrahl", 4105: "Verbesserte Sensortechnologie", 4106: "Neuromodaler Kompressor",
        4107: "Neuro-Schnittstelle", 4108: "Interplanetarisches Analyse-Netzwerk", 4109: "Geschwindigkeitsboost – Schwerer Jäger",
        4110: "Telekinetischer Antrieb", 4111: "Sechster Sinn", 4112: "Psycho-Harmonisator",
        4113: "Effiziente Schwarmintelligenz", 4114: "Geschwindigkeitsboost – Großtransporter", 4115: "Gravitations-Sensoren",
        4116: "Geschwindigkeitsboost – Schlachtschiff", 4117: "Psionische Schildmatrix", 4118: "Kaelesh-Entdecker-Verbesserung"
    }
};

// Fallback для остальных языков
['pl', 'es', 'fr', 'it', 'nl', 'sk', 'tr', 'pt', 'bs'].forEach(lang => {
    LANG_LF_RESEARCH_BASE[lang] = LANG_LF_RESEARCH_BASE.en;
});

const LANG_LF_RESEARCH = Object.freeze(LANG_LF_RESEARCH_BASE);

// ============================================
// КОРАБЛИ
// ============================================
const LANG_SHIPS_BASE = {
    en: {
        small_cargo: "Small Cargo",
        large_cargo: "Large Cargo",
        light_fighter: "Light Fighter",
        heavy_fighter: "Heavy Fighter",
        cruiser: "Cruiser",
        battleship: "Battleship",
        recycler: "Recycler",
        bomber: "Bomber",
        destroyer: "Destroyer",
        battlecruiser: "Battlecruiser",
        death_star: "Death Star",
        reaper: "Reaper",
        pathfinder: "Pathfinder",
        colony_ship: "Colony Ship",
        esp_probe: "Espionage Probe"
    },
    ru: {
        small_cargo: "Малый транспорт",
        large_cargo: "Большой транспорт",
        light_fighter: "Лёгкий истребитель",
        heavy_fighter: "Тяжёлый истребитель",
        cruiser: "Крейсер",
        battleship: "Линкор",
        recycler: "Переработчик",
        bomber: "Бомбардировщик",
        destroyer: "Уничтожитель",
        battlecruiser: "Линейный крейсер",
        death_star: "Звезда смерти",
        reaper: "Жнец",
        pathfinder: "Первопроходец",
        colony_ship: "Колонизатор",
        esp_probe: "Шпионский зонд"
    },
    de: {
        small_cargo: "Kleiner Frachter",
        large_cargo: "Großer Frachter",
        light_fighter: "Leichter Jäger",
        heavy_fighter: "Schwerer Jäger",
        cruiser: "Kreuzer",
        battleship: "Schlachtschiff",
        recycler: "Recycler",
        bomber: "Bomber",
        destroyer: "Zerstörer",
        battlecruiser: "Schlachtkreuzer",
        death_star: "Todesstern",
        reaper: "Sensenmann",
        pathfinder: "Pionier",
        colony_ship: "Kolonieschiff",
        esp_probe: "Spionagesonde"
    }
};

// Fallback для остальных языков
['pl', 'es', 'fr', 'it', 'nl', 'sk', 'tr', 'pt', 'bs'].forEach(lang => {
    LANG_SHIPS_BASE[lang] = LANG_SHIPS_BASE.en;
});

const LANG_SHIPS = Object.freeze(LANG_SHIPS_BASE);

// ============================================
// ПРОЧИЕ ПЕРЕВОДЫ
// ============================================
const LANG_OTHER_BASE = {
    en: {
        tmLabel: "Dark Matter",
        totalTMLabel: "Total: ",
        tabBuildings: "Buildings",
        tabResearch: "Research",
        tabFleet: "Fleet",
        tabLifeforms: "Lifeforms",
        lfTabBuildings: "Buildings",
        lfTabResearch: "Research",
        lfBuilding: "Building",
        lfResearch: "Research",
        energy: "Energy",
        locale: "en-US",
        boxesLabel: "Metal Box",
        needOpen: "Need to open: ",
        boxes: "boxes",
        building: "Building",
        from: "From",
        to: "To",
        planets: "Planets",
        metal: "Metal",
        crystal: "Crystal",
        deut: "Deuterium",
        points: "Points",
        total: "Total",
        totalInMetal: "Total in metal",
        research: "Research",
        ship: "Ship",
        qty: "Quantity",
        planetResources: "Resources on planet",
        deliveryTotals: "Total resources: ",
        metalEq: "Equivalent in metal: ",
        grandAfter: "Remaining after deduction: ",
        leftoverLabel: "Leftover DM",
        boxesCountPh: "Number of boxes",
        boxValuePh: "Metal in 1 box",
        planetMetalPh: "Metal",
        planetCrystalPh: "Crystal",
        planetDeutPh: "Deuterium",
        lfSelectLabel: "Lifeform",
        humans: "Humans",
        rocktal: "Rock'tal",
        mechas: "Mechas",
        kaelesh: "Kaelesh",
        lfMegalith: "Megalith",
        lfMineralCenter: "Mineral Research Center",
        lfRunoTech: "Rune Technologium",
        sumAllTabs: "Sum across all tabs",
        dragHandleLabel: "Move table",
        languageSelectLabel: "Interface language",
        expeditionsSettingsTitle: "OGame Expeditions Calculator",
        expeditionsFleetTitle: "Fleet composition for expedition",
        expeditionsMaxPointsLabel: "Resource find (max): ",
        expeditionsPlayerClass: "Class: ",
        expeditionsUniverseSpeed: "Speed factor: ",
        expeditionsHyperTech: "Level of Hyperspace Technology: ",
        expeditionsResourceBonus: "Expedition Resource Bonus: ",
        expeditionsShipBonus: "Expedition Ship Bonus: ",
        expeditionsCollectorBonus: "\"Collector\" class bonus: ",
        expeditionsDiscovererBonus: "\"Discoverer\" class bonus: ",
        expeditionsDarkMatterBonus: "Dark Matter discovery bonus: ",
        expeditionsResourceBooster: "Resources discovery booster: ",
        shipType: "Ship Type: ",
        canBeFound: "Can a ship of this type be found? ",
        maxCanBeFound: "Discoverable number of ships (max): ",
        expeditionsCargoCapacity: "Storage Capacity: ",
        expeditionsMaxResourcesLabel: "Resource find (max): ",
        expeditionsDarkMatterFindLabel: "Dark Matter find (max): ",
        expeditionsYes: "Yes",
        expeditionsNo: "No",
        expeditionsHighTop1: "< 10.000",
        expeditionsHighTop2: "< 100.000",
        expeditionsHighTop3: "< 1.000.000",
        expeditionsHighTop4: "< 5.000.000",
        expeditionsHighTop5: "< 25.000.000",
        expeditionsHighTop6: "< 50.000.000",
        expeditionsHighTop7: "< 75.000.000",
        expeditionsHighTop8: "< 100.000.000",
        expeditionsHighTop9: "> 100.000.000",
        expeditionsClassDiscoverer: "Discoverer",
        expeditionsClassCollector: "Collector",
        expeditionsClassGeneral: "Other",
        expeditionsShipBonuses: "Ships stats bonuses (%)"
    },
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
        needOpen: "Нужно открыть: ",
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
        deliveryTotals: "Итого по ресурсам: ",
        metalEq: "Эквивалент в металле: ",
        grandAfter: "Остаток после вычета: ",
        leftoverLabel: "Остаток ТМ",
        boxesCountPh: "Кол-во коробок",
        boxValuePh: "Металла в 1 коробке",
        planetMetalPh: "Металл",
        planetCrystalPh: "Кристалл",
        planetDeutPh: "Дейтерий",
        lfSelectLabel: "Форма жизни",
        humans: "Люди",
        rocktal: "Рок'тал",
        mechas: "Мехи",
        kaelesh: "Кэлиш",
        lfMegalith: "Мегалит",
        lfMineralCenter: "Центр минералов",
        lfRunoTech: "Рунный Техно-ум",
        sumAllTabs: "Сумма по всем вкладкам",
        dragHandleLabel: "Переместить таблицу",
        languageSelectLabel: "Язык интерфейса",
        expeditionsSettingsTitle: "Калькулятор Экспедиции OGame",
        expeditionsFleetTitle: "Состав флота для экспедиции",
        expeditionsMaxPointsLabel: "Может быть найдено ресурсов (max): ",
        expeditionsPlayerClass: "Класс: ",
        expeditionsUniverseSpeed: "Скорость вселенной: ",
        expeditionsHyperTech: "Уровень Гиперпространственной технологии: ",
        expeditionsResourceBonus: "Бонус к поиску ресурсов: ",
        expeditionsShipBonus: "Бонус к поиску кораблей: ",
        expeditionsCollectorBonus: "Бонус класса \"Коллекционер\": ",
        expeditionsDiscovererBonus: "Бонус класса \"Исследователь\": ",
        expeditionsDarkMatterBonus: "Бонус поиска Тёмной Материи: ",
        expeditionsResourceBooster: "Бустер поиска ресурсов: ",
        shipType: "Тип",
        canBeFound: "Корабль может быть найден? ",
        maxCanBeFound: "Может быть найдено кораблей (max)",
        expeditionsCargoCapacity: "Грузоподъёмность: ",
        expeditionsMaxResourcesLabel: "Может быть найдено ресурсов (max): ",
        expeditionsDarkMatterFindLabel: "Может быть найдено Тёмной Материи (max): ",
        expeditionsYes: "Да",
        expeditionsNo: "Нет",
        expeditionsHighTop1: "< 10.000",
        expeditionsHighTop2: "< 100.000",
        expeditionsHighTop3: "< 1.000.000",
        expeditionsHighTop4: "< 5.000.000",
        expeditionsHighTop5: "< 25.000.000",
        expeditionsHighTop6: "< 50.000.000",
        expeditionsHighTop7: "< 75.000.000",
        expeditionsHighTop8: "< 100.000.000",
        expeditionsHighTop9: "> 100.000.000",
        expeditionsClassDiscoverer: "Исследователь",
        expeditionsClassCollector: "Коллекционер",
        expeditionsClassGeneral: "Другой",
        expeditionsShipBonuses: "Повышение характеристик кораблей (в %)"
    }
};

// Fallback для остальных языков
['de', 'pl', 'es', 'fr', 'it', 'nl', 'sk', 'tr', 'pt', 'bs'].forEach(lang => {
    LANG_OTHER_BASE[lang] = { ...LANG_OTHER_BASE.en, locale: `${lang}-${lang.toUpperCase()}` };
});

const LANG_OTHER = Object.freeze(LANG_OTHER_BASE);

// ============================================
// КЭШ ПЕРЕВОДОВ
// ============================================
const LANG_CACHE = new Map();

// ============================================
// ФУНКЦИЯ ПОЛУЧЕНИЯ СЛОВАРЯ ПЕРЕВОДОВ
// ============================================
const getLangDict = (() => {
    const copyArray = (source, dict, prefix) => {
        if (!source) return;
        source.forEach((name, idx) => {
            dict[`${prefix}${idx}`] = name.trim();
        });
    };

    const copyObject = (source, dict, prefix) => {
        if (!source) return;
        Object.entries(source).forEach(([id, name]) => {
            dict[`${prefix}${id}`] = name.trim();
        });
    };

    return (lang = LANGUAGE_CONFIG.DEFAULT) => {
        if (LANG_CACHE.has(lang)) return LANG_CACHE.get(lang);

        const safeLang = LANG_OTHER[lang] ? lang : LANGUAGE_CONFIG.DEFAULT;
        const dict = { ...LANG_OTHER[safeLang] };

        copyArray(LANG_BUILDINGS[safeLang], dict, 'building');
        copyArray(LANG_RESEARCH[safeLang], dict, 'research');
        copyObject(LANG_LF_BUILDINGS[safeLang], dict, 'lf_b_');
        copyObject(LANG_LF_RESEARCH[safeLang], dict, 'lf_r_');
        copyObject(LANG_SHIPS[safeLang], dict, 'ship_');

        LANG_CACHE.set(lang, dict);
        return dict;
    };
})();

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================
const clearLangCache = () => LANG_CACHE.clear();
const getAvailableLanguages = () => Object.keys(LANG_BUILDINGS);
const getLanguageName = (langCode) => LANGUAGE_CONFIG.NAMES[langCode] || langCode.toUpperCase();
const getLanguageIcon = (langCode) => LANGUAGE_CONFIG.ICONS[langCode] || 'images/languages/unknown.png';

// ============================================
// ЭКСПОРТ
// ============================================
if (typeof window !== 'undefined') {
    window.getLangDict = getLangDict;
    window.clearLangCache = clearLangCache;
    window.getAvailableLanguages = getAvailableLanguages;
    window.getLanguageName = getLanguageName;
    window.getLanguageIcon = getLanguageIcon;
    window.LANGUAGE_CONFIG = LANGUAGE_CONFIG;
    window.LANG_BUILDINGS = LANG_BUILDINGS;
    window.LANG_RESEARCH = LANG_RESEARCH;
    window.LANG_LF_BUILDINGS = LANG_LF_BUILDINGS;
    window.LANG_LF_RESEARCH = LANG_LF_RESEARCH;
    window.LANG_SHIPS = LANG_SHIPS;
    window.LANG_OTHER = LANG_OTHER;
}

// ============================================
// КОНЕЦ ФАЙЛА languages.js
// ============================================