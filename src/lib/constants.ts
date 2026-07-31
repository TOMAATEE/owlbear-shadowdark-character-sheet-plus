import type {Class, SpellTier} from "./types"

export const GEAR_TYPES = ["Basic", "Armor", "Weapon", "Treasure"] as const
export const ARMOR_PROPERTIES = [
    "Sundering",
    "OneHanded",
    "TwoHanded",
    "Magic",
    "Mount",
    "Loud",
    "Heavy",
    "Restrictive",
] as const
export const RANGE_TYPES = ["Self", "Close", "2xClose", "Near", "2xNear", "Far", "Plane", "Unlimited"] as const
export const DICE_TYPES = ["d1", "d4", "d6", "d8", "d10", "d12", "d20", "d100"] as const
export const SCHEMA_VERSION = "1.0.0"
export const SCHEMA_TYPE = "sd-char-sheet"
export const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA", "LVL", "None"] as const
export const ALIGNMENTS = ["Neutral", "Lawful", "Chaotic"] as const
export const TREASURE_PROPERTIES = {"Impure": 0.4, "Cracked": 0.8, "Basic": 1, "Pure": 1.2, "Perfect": 1.6, "Cut": 2, "Huge": 4} as const
export const WEAPON_TYPES = ["Melee", "Ranged", "MeleeRanged"] as const
export const WEAPON_PROPERTIES = [
    "Finesse",
    "Loading",
    "Thrown",
    "Versatile",
    "Magic",
    "Breakable",
    "Sniper",
    "Returning",
    "Sundering",
    "Charge",
    "Devastating",
    "Mounted",
    "Caltrops",
] as const

export const TIME_UNITS = [
    "Second",
    "Minute",
    "Round",
    "Hour",
    "Day",
    "Week",
    "Month",
    "Year",
] as const

export const NUMERICAL_BONUS_TOS = [
    "gearSlots",
    "stat",
    "armorClass",
    "backstabDice",
    "hp",
    "spellMax",
    "modifierCap"
] as const

export const ROLL_BONUS_TOS = [
    "hpRoll",
    "attackRoll",
    "spellcastRoll",
    "damageRoll",
    "statRoll",
    "initiativeRoll",
    "talentRoll",
] as const

export const BONUS_TOS = [...NUMERICAL_BONUS_TOS, ...ROLL_BONUS_TOS] as const

export const PATRONS = [
    "Almazzat",
    "Freya",
    "Krraktanamak",
    "Kytheros",
    "Loki",
    "Molek",
    "Mugdulblub",
    "Oatali",
    "Obe-Ixx of Azarumme",
    "Odin",
    "Oros",
    "Rathgamon",
    "Saint Ydris",
    "Shune the Vile",
    "Titania",
    "The Willowman",
    "Yag-Kesh",
]

export const DEITIES = [
    "Gede",
    "Madeera the Covenant",
    "Memnon",
    "Ord",
    "Ramlaat",
    "Saint Terragnis",
    "The Lost",
    ...PATRONS
] as const

export const BACKGROUNDS = {
    // Desert
    "Alkeshi": "You have helpful contacts in the City-State of Alkesh",
    "Outlander": "You came with a caravan from a distant land",
    "Siruul": "The desert elves raised you and taught you survival",
    "Assassin": "You were a killer for hire before leaving it behind",
    "Escapee": "You escaped a cult dedicated to the demon Molek",
    "Miraged": "You got lost in the desert and forgot who you are",
    "Scrag Trainer": "You can ride scrag and teach them tricks",
    "Bandit": "You have connections with your old bandit crew",
    "Gladiator": "You survived the arena and have a few local fans",
    "Merchant": "You are a skilled haggler and always get a deal",
    "Hunted": "The Ras-Godai assassins have a contract to kill you",
    "Arcanist": "You know how to find Gehemna, the fabled library",
    // Swamp
    "Stilt Orcs": "Reclusive orcs raised you to thrive in the swamps",
    "Snake Catcher": "You know how to trick and charm snakes",
    "Ghostly": "Swamp halflings raised you to move about unseen",
    "Haunted": "A restless spirit follows you; it wants something",
    "Feral": "You grew up alone and lived by survival of the fittest",
    "Bogborn": "You can easily spot the bog's hidden dangers",
    "Chosen": "An eldritch force calls to you in the dark of the night",
    "Mystic": "You see portents in the moonlit waters of the bog",
    "Spirited Away": "A hag kidnapped you and raised you for years",
    "Hermit": "Loners respect you and civilized folk fear you",
    "Sworn": "You made a risky bargain with a swamp demon",
    "Death-Touched": "You are often mistaken for being undead",
    // Island and Ocean
    "Nord": "A warrior clan from the Isles of Andrik raised you",
    "Fisher": "You can catch a fish better than just about anyone",
    "Shipwright": "You know how to build and repair ships",
    "Pirate": "You have a criminal past and friends in low places",
    "Pearl Diver": "You can swim and dive like the merfolk of lore",
    "Marooned": "You were left for dead but somehow survived",
    "Displaced": "Your home was destroyed and you seek revenge",
    "Skald": "You've been trained to sing the legends of the nords",
    "Prisoner": "You escaped a hard life of rowing in a ship's galley",
    "Trader": "You know your way around every port city and town",
    "Sailor": "You're at home on the water and capable at sailing",
    "Privateer": "You work for a lord to catch and punish pirates",
    // Grassland
    "Kyzian": "You belong to a nomadic Kyzian clan led by a prince",
    "Horse Trader": "You know all about horses, and they like you",
    "Warden": "Tend to the ancient tombs and burial mounds",
    "Scavenger": "You prey on the weak and survive on scraps",
    "Meadowborn": "Halflings treat you as a cousin or good friend",
    "Pariah": "Your family cast you out to make an example of you",
    "Hawk Trainer": "Birds of prey view you as a kindred spirit",
    "Warrior": "You have pledged military service to a Kyzian Prince",
    "Antiquarian": "You know all about rare curios and odd trinkets",
    "Palaceborn": "You are a minor noble from the Ivory Palace",
    "Stormborn": "A spirit of wind and thunder watches over you",
    "Prince": "You are the leader of a small clan of Kyzian nomads",
    // Mountain
    "Stoneborn": "The dwarves of Stonehall raised you proudly",
    "Deep Dweller": "You know the ways of deep and silent places",
    "Blacksmith": "You are skilled in the peerless dwarvish craft",
    "Miner": "You have an instinct for the stone's many dangers",
    "Astronomer": "You know the stars and their complex patterns",
    "Rimeborn": "Bitter cold does not affect you as it does others",
    "Abducted": "You awoke with no memory on a mountain peak",
    "Monk": "You were a student in the Monastery of Yag-Kesh",
    "Goatherd": "Domestic animals trust you and follow your lead",
    "Ras-Godai": "You trained among the Ras-Godai assassins",
    "Orcish": "Mountain orcs raised you and taught you their ways",
    "Goblinborn": "A tribe of goblins reared you as one of their own",
    // Forest
    "Lydonian": "You grew up in Lydonia and have contacts there",
    "Hunter": "You're an expert at hunting game in the woods",
    "Orphan": "You wandered into town as a ragged, lost child",
    "Fugitive": "You're hiding in the woods from the authorities",
    "Witchborn": "You inherited a strong talent for the occult",
    "Herbalist": "You know the forest's remedies and poisons",
    "Grave Digger": "You know more about the dead than most",
    "Demonic": "You were found beneath a cursed Marrow tree",
    "Elfborn": "Elves raised you to know art, beauty, and magic",
    "Penitent": "You came to the forest to find forgiveness",
    "Fey Touched": "A fey being has watched over you from birth",
    "Drawn": "Something in the deep woods calls to you at night",
    // Jungle
    "Witness": "You've seen a lost city deep within the jungle",
    "Marked": "A powerful being has chosen you for a purpose",
    "Indebted": "You are trying to outrun an impossible debt",
    "Riverfolk": "You are good with canoes and river navigation",
    "Doomseer": "Brief, apocalyptic visions haunt your dreams",
    "Itzalca": "A human tribe raised you to know their ways",
    "Academic": "You study ancient ruins and lost civilizations",
    "Treasure Hunter": "You've followed a rumor for many years",
    "Castaway": "Your ship and crew sank off the jungle's shore",
    "Isolated": "You're the first to ever leave your remote village",
    "Fireborn": "You can endure volcanic heat better than anyone",
    "Cartographer": "You are skilled at creating and selling maps",
    // Civilization
    "Meridian": "You're from the City of Masks and know it well",
    "Peasant": "You scrape out a living under a lord's protection",
    "Beggar": "You are adept at surviving in the urban streets",
    "Soldier": "You served in an army; other soldiers respect you",
    "Noble": "You are the child of a noble (5:6) or royal (1:6)",
    "Apprentice": "You were a wizard apprentice at Gedgarrin",
    "Thief": "You have connections to a local Thieves' Guild",
    "Acolyte": "You're a low-ranking member of a church or cult",
    "Barkeep": "You're talented at gossip and hospitality",
    "Exiled": "You're exiled from your homeland, never to return",
    "Revived": "Someone brought your spirit back from death",
    "Lost": "You've seen The Lost; you possess terrible knowledge",
    // Base Set
    "Banished": "Your people cast you out for supposed crimes.",
    "Barbarian": "You left the horde, but it never quite left you.",
    "Chirurgeon": "You know anatomy, surgery, and first aid.",
    "Cult Initiate": "You know blasphemous secrets and rituals.",
    "Jeweler": "You can easily appraise value and authenticity.",
    "Mercenary": "You fought friend and foe alike for your coin.",
    "Minstrel": "You survived on stealth, observation, and speed.",
    "Orphaned": "An unusual guardian rescued and raised you.",
    "Ranger": "The woods and wilds are your true home.",
    "Scholar": "You've traveled far with your charm and talent.",
    "Scout": "The woods and wilds are your true home.",
    "Thieves' Guild": "You have connections, contacts, and debts.",
    "Urchin": "You grew up in the merciless streets of a large city.",
    "Wanted": "There's a price on your head, but you have allies.",
    "Wizard's Apprentice": "You have a knack and eye for magic.",
    // Core Source 1
    "Amnesiac": "Your past is a haze, but some memories return.",
    "Ascetic": "People fear you, but seek out your guidance.",
    "Demonborn": "An ancestor of yours is a powerful demon.",
    "Fallen": "You fell from grace. Will you atone, or embrace it?.",
    "Feytouched": "A fairy befriended you in your childhood.",
    "Forager": "You know how to find the edible and the deadly.",
    "Healer": "You understand how life and death intertwine.",
    "Outcast": "You were thrown out for real or supposed crimes.",
    "Redeemer": "You must redeem the name of your kin.",
    "Sacrifice": "You were to be ritually sacrificed, but escaped.",
    "Wolfchild": "Long ago, you walked into town wearing pelts.",
    "Woodborn": "They found you in the hollow of an oak tree.",
    // Core Source 3
    "Bowyer": "You can make and fix any bow or arrow.",
    "Crafter": "You can make and fix any utilitarian item.",
    "Criminal": "You were exiled from your village for a crime.",
    "Crop Farmer": "You toil in the earth and know all plants.",
    "Drifter": "You have not yet found a jarl worthy of your loyalty.",
    "Enforcer": "You enforce the jarl's law in your village.",
    "Far Traveler": "You know many distant people and customs.",
    "Freed": "You were a thrall, but escaped or won your freedom.",
    "God's Blood": "You are descended from a god it marks you.",
    "Heroborn": "You are the descendant of a famous warrior.",
    "Livestock Farmer": "You have intuition about all animals.",
    "Nobleborn": "You are the child of a 1d6: 1-5. jarl, 6. king.",
    "Seer's Apprentice": "You know some of the mystic arts.",
} as const

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
    "Basilisk Warrior",
    "Delver",
    "Duelist",
    "Green Knight",
    "Kyzian Archer",
    "Monk of Yag-Kesh",
    "Necromancer",
    "Paladin",
    "Roustabout",
    "Wyrdling",
] as const

export const TITLE_MAP: {
    [key in Class]: {
        [key in "Lawful" | "Neutral" | "Chaotic"]: readonly string[]
    }
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
    "Delver": {
        Lawful: ["Explorer", "Researcher", "Antiquarian", "Archeologist", "Professor"],
        Chaotic: ["Intruder", "Opportunist", "Larcenist", "Tomb Robber", "Defiler"],
        Neutral: ["Investigator", "Observer", "Pathfinder", "Trailblazer", "Pioneer"],
    },
    "Duelist": {
        Lawful: ["Fencer", "Defender", "Mongoose", "Wolf", "Swordmaster"],
        Chaotic: ["Ruffian", "Heckler", "Viper", "Cobra", "Swordmaster"],
        Neutral: ["Student", "Challenger", "Mouser", "Panther", "Swordmaster"],
    },
    "Green Knight": {
        Lawful: ["Sapling", "Summer Sun", "Verdant Knight", "Master of Trees", "Mights Oak"],
        Chaotic: ["Weed", "Winter Wind", "Blighted Knight", "Master of Thorns", "Weeping Willow"],
        Neutral: ["Seedling", "Spring Rain", "Rose Knight", "Master of Roots", "Wise Elm"],
    },
    "Kyzian Archer": {
        Lawful: ["Feather", "Striker", "Fierce Wind", "Gold Arrow", "Eagle"],
        Chaotic: ["Stinger", "Deadeye", "Frozen Wind", "Black Arrow", "Scorpion"],
        Neutral: ["Talon", "Hunter", "Burning Wind", "Crimson Arrow", "Hawk"],
    },
    "Monk of Yag-Kesh": {
        Lawful: ["Disciple", "Path of Light", "Sun Warrior", "Golden Soul", "Sun Master"],
        Chaotic: ["Disciple", "Path of Night", "Shadow Warrior", "Dark Soul", "Shadow Master"],
        Neutral: ["Disciple", "Path of Dream", "Moon Warrior", "Silver Soul", "Moon Master"],
    },
    "Necromancer": {
        Lawful: ["Apprentice", "Walker", "Guardian", "River Master", "Angel of Death"],
        Chaotic: ["Adept", "Weeper", "Reaper", "Death Master", "Undying One"],
        Neutral: ["Seeker", "Watcher", "Guide", "Gate Master", "Arbiter of Death"],
    },
    "Paladin": {
        Lawful: ["Page", "Squire", "Knight", "Knight Banneret", "Knight of the Cross"],
        Chaotic: ["Page", "Squire", "Fell Knight", "Oathbreaker", "Blackguard"],
        Neutral: ["Page", "Squire", "Knight Errant", "Knight Penitent", "Knight of the Legion"],
    },
    "Roustabout": {
        Lawful: ["Handyperson", "Crafter", "Foreman", "Master Crafter", "Guild Leader"],
        Chaotic: ["Rascal", "Hustler", "Rogue", "Rebel", "Renegade"],
        Neutral: ["Drifter", "Vagabond", "Seeker", "Wayfinder", "Nomad Monarch"],
    },
    "Wyrdling": {
        Lawful: ["Chosen One", "Cursed", "Haunted", "Tortured", "Crazed One"],
        Chaotic: ["Chosen One", "Blessed", "Consecrated", "Revered", "Exalted One"],
        Neutral: ["Chosen One", "Seeker", "Listener", "Watcher", "Learned One"],
    },
} as const

export const ANCESTRIES = [
    "Elf",
    "Human",
    "Goblin",
    "Halfling",
    "Half-Elf",
    "Half-Orc",
    "Dwarf",
    "Kobold"
] as const

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
] as const

export const ValueForDiceType = {
    d1: 1,
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
} as const

export const SPELL_TIERS: SpellTier[] = [0, 1, 2, 3, 4, 5]

export const TREASURE_TAX_PERCENT = 1
export const TREASURE_TAX = 1 + TREASURE_TAX_PERCENT / 100