import type {Class, SpellTier} from "./types";

export const GEAR_TYPES = ["Basic", "Armor", "Weapon"] as const;
export const SHIELD_PROPERTIES = [
    "Shield",
    "OneHanded",
    "TwoHanded",
    "Magic",
] as const;
export const RANGE_TYPES = ["Self", "Close", "2xClose", "Near", "Far", "Plane", "Unlimited"] as const;
export const DICE_TYPES = ["d1", "d4", "d6", "d8", "d10", "d12", "d20"] as const;
export const SCHEMA_VERSION = "1.0.0";
export const SCHEMA_TYPE = "sd-char-sheet";
export const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA", "LVL", "None"] as const;
export const ALIGNMENTS = ["Neutral", "Lawful", "Chaotic"] as const;
export const WEAPON_TYPES = ["Melee", "Ranged", "MeleeRanged"] as const;
export const WEAPON_PROPERTIES = [
    "Finesse",
    "Loading",
    "Thrown",
    "Versatile",
    "Magic",
    "Breakable",
    "Blowgun",
    "Bolas",
    "Lash",
    "Returning",
    "Sundering",
    "Spear-thrower"
] as const;

export const TIME_UNITS = [
    "Second",
    "Minute",
    "Round",
    "Hour",
    "Day",
    "Week",
    "Month",
    "Year",
] as const;

export const NUMERICAL_BONUS_TOS = [
    "gearSlots",
    "stat",
    "armorClass",
    "backstabDice",
    "hp",
    "spellMax",
] as const;

export const ROLL_BONUS_TOS = [
    "hpRoll",
    "attackRoll",
    "spellcastRoll",
    "damageRoll",
    "statRoll",
    "initiativeRoll",
    "talentRoll",
] as const;

export const BONUS_TOS = [...NUMERICAL_BONUS_TOS, ...ROLL_BONUS_TOS] as const;

export const DEITIES = [
    "None",
    "Saint Terragnis",
    "Gede",
    "Madeera the Covenant",
    "Ord",
    "Memnon",
    "Ramlaat",
    "Shune the Vile",
    "The Lost",
] as const;

export const BACKGROUNDS = {
    // Base Set
    "Acolyte": "You're well trained in religious rites and doctrines.",
    "Banished": "Your people cast you out for supposed crimes.",
    "Barbarian": "You left the horde, but it never quite left you.",
    "Chirurgeon": "You know anatomy, surgery, and first aid.",
    "Cult Initiate": "You know blasphemous secrets and rituals.",
    "Herbalist": "You know plants, medicines, and poisons.",
    "Jeweler": "You can easily appraise value and authenticity.",
    "Mercenary": "You fought friend and foe alike for your coin.",
    "Minstrel": "You survived on stealth, observation, and speed.",
    "Noble": "A famous name has opened many doors for you.",
    "Orphaned": "An unusual guardian rescued and raised you.",
    "Ranger": "The woods and wilds are your true home.",
    "Sailor": "Pirate, privateer, or merchant — the seas are yours.",
    "Scholar": "You've traveled far with your charm and talent.",
    "Scout": "The woods and wilds are your true home.",
    "Soldier": "You served as a fighter in an organized army.",
    "Thieves' Guild": "You have connections, contacts, and debts.",
    "Urchin": "You grew up in the merciless streets of a large city.",
    "Wanted": "There's a price on your head, but you have allies.",
    "Wizard's Apprentice": "You have a knack and eye for magic.",
    // Core Source 1
    "Amnesiac": "Your past is a haze, but some memories return.",
    "Ascetic": "People fear you, but seek out your guidance.",
    "Chosen": "An eldritch being selected you for a purpose.",
    "Demonborn": "An ancestor of yours is a powerful demon.",
    "Drawn": "You hear a whispered call and follow it.",
    "Fallen": "You fell from grace. Will you atone, or embrace it?.",
    "Feytouched": "A fairy befriended you in your childhood.",
    "Forager": "You know how to find the edible and the deadly.",
    "Fugitive": "An anonymous savior helped you disappear.",
    "Haunted": "A restless spirit wants something from you.",
    "Healer": "You understand how life and death intertwine.",
    "Hermit": "The wilds (and its creatures) are your family.",
    "Marked": "You carry an eldritch mark. Is it a curse, or a gift?",
    "Marooned": "They left you behind, but you refused to die.",
    "Outcast": "You were thrown out for real or supposed crimes.",
    "Redeemer": "You must redeem the name of your kin.",
    "Sacrifice": "You were to be ritually sacrificed, but escaped.",
    "Witchborn": "They burned your mother, but spared you.",
    "Wolfchild": "Long ago, you walked into town wearing pelts.",
    "Woodborn": "They found you in the hollow of an oak tree.",
    // Core Source 3
    "Blacksmith": "Weapons, armor, horseshoes; you do it all.",
    "Bowyer": "You can make and fix any bow or arrow.",
    "Crafter": "You can make and fix any utilitarian item.",
    "Criminal": "You were exiled from your village for a crime.",
    "Crop Farmer": "You toil in the earth and know all plants.",
    "Displaced": "You fled after a rival jarl attacked your village.",
    "Drifter": "You have not yet found a jarl worthy of your loyalty.",
    "Enforcer": "You enforce the jarl's law in your village.",
    "Far Traveler": "You know many distant people and customs.",
    "Fisher": "You know all the sea creatures and legends.",
    "Freed": "You were a thrall, but escaped or won your freedom.",
    "God's Blood": "You are descended from a god; it marks you.",
    "Heroborn": "You are the descendant of a famous warrior.",
    "Hunter": "You know how to move quietly in the wilds.",
    "Livestock Farmer": "You have intuition about all animals.",
    "Nobleborn": "You are the child of a 1d6: 1-5. jarl, 6. king.",
    "Seer's Apprentice": "You know some of the mystic arts.",
    "Shipwright": "You know how to build and repair longboats.",
    "Skald": "You are a poet and know all the ancient ballads.",
    "Trader": "You have mercantile connections in every village.",
} as const;

export const CLASSES = [
    "Fighter",
    "Priest",
    "Wizard",
    "Thief",
    "Ranger",
    "Bard",
    "Knight of St. Ydris",
    "Warlock",
    "Witch",
    "Desert Rider",
    "Pit Fighter",
    "Ras-Godai",
    "Sea Wolf",
    "Seer",
    "Basilisk Warrior"
] as const;

export const TITLE_MAP: {
    [key in Class]: {
        [key in "Lawful" | "Neutral" | "Chaotic"]: readonly string[];
    };
} = {
    "Fighter": {
        Lawful: ["Squire", "Cavalier", "Knight", "Thane", "Lord/Lady"],
        Chaotic: ["Knave", "Bandit", "Slayer", "Reaver", "Warlord"],
        Neutral: ["Warrior", "Bararian", "Battlerager", "Warchief", "Chieftain"],
    },
    "Priest": {
        Lawful: ["Acolyte", "Crusader", "Templar", "Champion", "Paladin"],
        Chaotic: ["Initiate", "Zealot", "Cultist", "Scourge", "Chaos Knight"],
        Neutral: ["Seeker", "Invoker", "Haruspex", "Mystic", "Oracle"],
    },
    "Thief": {
        Lawful: ["Footpad", "Burglar", "Rook", "Underboss", "Boss"],
        Chaotic: ["Thug", "Cutthroat", "Shadow", "Assassin", "Wraith"],
        Neutral: ["Robber", "Outlaw", "Rogue", "Renegade", "Bandit King/Queen"],
    },
    "Wizard": {
        Lawful: ["Apprentice", "Conjurer", "Arcanist", "Mage", "Archmage"],
        Chaotic: ["Adept", "Channeler", "Witch/Warlock", "Diabolist", "Sorcerer"],
        Neutral: ["Shaman", "Seer", "Warden", "sage", "Druid"],
    },
    "Ranger": {
        Lawful: ["Wanderer", "Strider", "Warden", "Guardian", "Sentinel"],
        Chaotic: ["Hood", "Outlaw", "Fugitive", "Exile", "Pariah"],
        Neutral: ["Stranger", "Wayfarer", "Outlander", "Recluse", "Hermit"],
    },
    "Bard": {
        Lawful: ["Storyteller", "Balladeer", "Philosopher", "Poet", "Master Poet"],
        Chaotic: ["Guttersnipe", "Charlatan", "Satirist", "Silvertongue", "Doomspeaker"],
        Neutral: ["Seeker", "Witness", "Speaker", "Voice", "Truthbearer"],
    },
    "Knight of St. Ydris": {
        Lawful: ["Arbiter", "Enforcer", "Knight Marshal", "Judge", "Justiciar"],
        Chaotic: ["Traitor", "Fallen", "Oathbreaker", "Blackguard", "Demonlord"],
        Neutral: ["Brother/Sister", "Exorcist", "Reverend Knight", "Inquisitor", "Grand Inquisitor"],
    },
    "Warlock": {
        Lawful: ["Favored", "Herald", "Eminent", "Exalted", "Incarnation"],
        Chaotic: ["Marked", "Zealot", "Occultist", "Champion", "Harbinger"],
        Neutral: ["Chosen", "Channeler", "Prophesied", "Transcendent", "Avatar"],
    },
    "Witch": {
        Lawful: ["Fortune Teller", "Far Seer", "Prophet", "Wise One", "Baba"],
        Chaotic: ["Whisperer", "Hexer", "Hag/Elder", "Crone/Uncle", "Baba"],
        Neutral: ["Shaman", "Conjurer", "Soothsayer", "Conduit", "Baba"],
    },
    "Desert Rider": {
        Lawful: ["Outrider", "Sandrunner", "Trailblazer", "Swift Wind", "Stormrunner"],
        Chaotic: ["Bandit", "Robber", "Raider", "Scourge", "Bandit King/Queen"],
        Neutral: ["Rat", "Fox", "Wolf", "Tiger", "Dragon"],
    },
    "Pit Fighter": {
        Lawful: ["Rookie", "Gladiator", "Hero", "Champion", "Legend"],
        Chaotic: ["Ruffian", "Brawler", "Heel", "Villain", "Legend"],
        Neutral: ["Underdog", "Dark Horse", "Wild Card", "Victor", "Legend"],
    },
    "Ras-Godai": {
        Lawful: ["Acolyte", "Mirror Path", "Monk", "Master", "White Lotus"],
        Chaotic: ["Acolyte", "Shadow Path", "Monk", "Assassin", "Black Lotus"],
        Neutral: ["Acolyte", "Fire Path", "Monk", "Demon Blade", "Red Lotus"],
    },
    "Sea Wolf": {
        Lawful: ["Freefolk", "Shieldman/maiden", "Thane", "Jarl", "King/Queen"],
        Chaotic: ["Rabble", "Raider", "Reaver", "Conqueror", "Usurper"],
        Neutral: ["Wanderer", "Explorer", "Adventurer", "Renowned", "Legendary"],
    },
    "Seer": {
        Lawful: ["Guide", "Chanter", "Rune Reader", "Wise One", "Seer of Odin"],
        Chaotic: ["Hedge Witch", "Whisperer", "Bone Reader", "Dreaded One", "Seer of Loki"],
        Neutral: ["Fortune Teller", "Singer", "Star Reader", "Blessed One", "Seer of Freya"],
    },
    "Basilisk Warrior": {
        Lawful: ["Stone Warrior", "Strong Stone", "Protector", "Sun Serpent", "Amber Basilisk"],
        Chaotic: ["Stone Warrior", "Sharp Stone", "Slayer", "Moon Serpent", "Obsidian Basilisk"],
        Neutral: ["Stone Warrior", "Silent Stone", "Watcher", "Sky Serpent", "Sapphire Basilisk"],
    },
} as const;

export const ANCESTRIES = [
    "Elf",
    "Human",
    "Goblin",
    "Halfling",
    "Half-Orc",
    "Dwarf",
    "Kobold"
] as const;

export const LANGUAGES = [
    "Common",
    "Dwarvish",
    "Elvish",
    "Giant",
    "Goblin",
    "Merran",
    "Orcish",
    "Reptillian",
    "Sylvan",
    "Thanian",
    "Celestial",
    "Diabolic",
    "Draconic",
    "Primordial",
] as const;

export const ValueForDiceType = {
    d1: 1,
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
} as const;

export const SPELL_TIERS: SpellTier[] = [0, 1, 2, 3, 4, 5];