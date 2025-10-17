import type {LANGUAGES} from "../constants";
import type {PlayerCharacter, Gear, Class, Bonus, Ancestry} from "../types";
import {learnSpellForPlayer} from "../model/PlayerCharacter";
import SPELL_COMPENDIUM from "../compendium/spellCompendium";

export function ensureLanguages(pc: PlayerCharacter) {
    const languages: (typeof LANGUAGES)[number][] = ["Common"];
    switch (pc.ancestry) {
        case "Elf":
            languages.push("Elvish", "Sylvan");
            break;
        case "Human":
            break;
        case "Dwarf":
            languages.push("Dwarvish");
            break;
        case "Goblin":
            languages.push("Goblin");
            break;
        case "Halfling":
            break;
        case "Half-Orc":
            languages.push("Orcish");
            break;
        case "Kobold":
            languages.push("Draconic");
            break;
    }
    switch (pc.class) {
        case "Knight of St. Ydris":
            languages.push("Diabolic");
            break;
        case "Witch":
            languages.push("Diabolic", "Primordial", "Sylvan");
            break;
    }
    for (const l of languages) {
        if (!pc.languages.includes(l)) {
            pc.languages.push(l);
        }
    }
}

export function setMishapTable(pc: PlayerCharacter) {
    switch (pc.class) {
        case "Wizard":
            pc.mishapTable = "Wizard"
            break
        case "Knight of St. Ydris":
        case "Witch":
            pc.mishapTable = "Diabolical"
            break
        default:
            pc.mishapTable = undefined
    }
}

export function ensureAncestryBonuses(pc: PlayerCharacter) {
    clearAncestryBonuses(pc);
    addAncestryBonuses(pc.bonuses, pc.ancestry);
}

export function ensureClassBonuses(pc: PlayerCharacter) {
    clearClassBonuses(pc);
    if (!pc.class || pc.hasCustomClass) return;
    addClassBonuses(pc.bonuses, pc.class);
}

export function ensureClassGear(pc: PlayerCharacter) {
    clearClassGear(pc);
    if (!pc.class || pc.hasCustomClass) return;
    addClassGear(pc.gear, pc.class);
}

export function ensureClassSpells(pc: PlayerCharacter) {
    clearClassSpells(pc);
    if (!pc.class || pc.hasCustomClass) return;
    addClassSpells(pc);
}

function clearClassSpells(pc: PlayerCharacter) {
    pc.spells = pc.spells.filter(
        (spell) =>
            spell.tier !== 0
    );
}

function addClassSpells(pc: PlayerCharacter) {
    const classSpells: string[] = [];
    switch (pc.class) {
        case "Basilisk Warrior":
            classSpells.push("Petrifying Gaze");
            break;
        case "Desert Rider":
            classSpells.push("Charge");
            break;
        case "Knight of St. Ydris":
            classSpells.push("Demonic Possession");
            break;
        case "Pit Fighter":
            classSpells.push("Flourish", "Relentless");
            break;
        case "Priest":
            classSpells.push("Turn Undead");
            break;
        case "Ras-Godai":
            classSpells.push("Smoke Step");
            break;
        case "Seer":
            classSpells.push("Omen");
            break;
        case "Witch":
            classSpells.push("Revive Familiar");
            break;
    }
    classSpells.forEach(spell => {
        learnSpellForPlayer(pc, SPELL_COMPENDIUM[spell.toLowerCase()])
    })
}

function clearAncestryBonuses(pc: PlayerCharacter) {
    pc.bonuses = pc.bonuses.filter(
        (b) =>
            ![
                "Stout",
                "Keen senses",
                "Stealthy",
                "Mighty Attack ancestry",
                "Mighty Damage ancestry",
            ].includes(b.name)
    );
}

function clearClassBonuses(pc: PlayerCharacter) {
    pc.bonuses = pc.bonuses.filter(
        (b) =>
            ![
                "Thievery",
                "Backstab",
                "Learning Spells",
                "Hauler",
                "Herbalism",
                "Wayfinder",
                "Bardic Arts",
                "Magic Dabbler",
                "Presence",
                "Prolific",
                "Demonic Possession Increase",
                "Patron",
                "Implacable",
                "Last Stand",
                "Assassin",
                "Seafarer",
                "Old Gods",
                "Shield Wall",
                "Destined",
                "Basilisk Blood",
                "Stone Skin"
            ].includes(b.name) && !b.name.includes("Thievery:")
    );
}

function clearClassGear(pc: PlayerCharacter) {
    pc.gear = pc.gear.filter(
        (g) => !["Thieving Tools", "Holy Symbol"].includes(g.name)
    );
}

function addClassGear(gear: Gear[], c: Class) {
    if (c === "Thief" && !gear.find((g) => g.name === "Thieving Tools")) {
        gear.push({name: "Thieving Tools", quantity: 1});
    } else if (c === "Priest" && !gear.find((g) => g.name === "Holy Symbol")) {
        gear.push({name: "Holy Symbol", quantity: 1});
    }
}

function addAncestryBonuses(bonuses: Bonus[], a: Ancestry | "") {
    switch (a) {
        case "Elf":
            break;
        case "Human":
            break;
        case "Dwarf": {
            const name = "Stout";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "Roll your HP gains with ADV",
                    type: "advantage",
                    bonusTo: "hpRoll",
                });
            }
            break;
        }
        case "Goblin": {
            const name = "Keen senses";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "You can't be surprised",
                    type: "generic",
                });
            }
            break;
        }
        case "Halfling": {
            const name = "Stealthy";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "Once per day, you can become invisible for 3 rounds",
                    type: "generic",
                });
            }
            break;
        }
        case "Half-Orc": {
            const nameAtk = "Mighty Attack ancestry";
            const nameDmg = "Mighty Damage ancestry";
            if (!bonuses.find((b) => b.name === nameAtk || b.name === nameDmg)) {
                bonuses.push(
                    {
                        name: nameAtk,
                        desc: "You have a +1 bonus to attack rolls with melee weapons",
                        bonusSource: "Ancestry",
                        type: "modifyAmt",
                        bonusTo: "attackRoll",
                        bonusAmount: 1,
                        metadata: {
                            type: "weaponType",
                            weaponType: "Melee",
                        },
                    },
                    {
                        name: nameDmg,
                        desc: "You have a +1 bonus to damage rolls with melee weapons",
                        bonusSource: "Ancestry",
                        type: "modifyAmt",
                        bonusTo: "damageRoll",
                        bonusAmount: 1,
                        metadata: {
                            type: "weaponType",
                            weaponType: "Melee",
                        },
                    }
                );
            }
            break;
        }
        case "Kobold": {
            const name = "Knack";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "You get +1 to spellcasting checks or may begin each session with a luck token",
                    type: "generic",
                });
            }
            break;
        }
    }
}

function addClassBonuses(bonuses: Bonus[], c: Class) {
    switch (c) {
        case "Thief": {
            let name = "Thievery";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on climbing, sneaking, hiding, applying disguises, disabling traps, picking pockets, opening locks",
                        type: "generic",
                    },
                );
            }

            name = "Backstab";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Class",
                    desc: "+1 additional weapon dice of damage on unaware enemies",
                    type: "modifyAmt",
                    bonusTo: "backstabDice",
                    bonusAmount: 1,
                    bonusIncreaseRatePerLevel: 0.5,
                });
            }
            break;
        }
        case "Priest": {
            break;
        }
        case "Wizard": {
            const name = "Learning Spells";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Class",
                    desc: "Study a scroll (1 Day) + DC 15 INT check to permanently learn scroll",
                    type: "generic",
                });
            }
            break;
        }
        case "Fighter": {
            const name = "Hauler";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Class",
                    desc: "Add Your CON Modifier, if positive, to your total gear slots",
                    type: "modifyAmt",
                    bonusTo: "gearSlots",
                    bonusAmount: 0,
                    metadata: {
                        type: "stat",
                        stat: "CON",
                    },
                });
            }
            break;
        }
        case "Ranger": {
            const name = "Herbalism";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "Make an INT check to find some herbs",
                        type: "generic",
                    },
                    {
                        name: "Wayfinder",
                        bonusSource: "Class",
                        desc: "ADV on checks associated with navigation, survivalism, tracking, sneaking, hiding, nature, animals",
                        type: "generic",
                    }
                );
            }
            break;
        }
        case "Bard": {
            const name = "Bardic Arts";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on oration, performing arts, lore, and diplomacy",
                        type: "generic",
                    },
                    {
                        name: "Magic Dabbler",
                        bonusSource: "Class",
                        desc: "You can activate spell scrolls and wands using Charisma as your spellcasting stat. Nat1: wizard mishap",
                        type: "generic",
                    },
                    {
                        name: "Presence",
                        bonusSource: "Class",
                        desc: "Make a DC 12 CHA check to enact one of the following effects. If you fail (excluding focus), you can't use that effect again until you rest.\n" +
                            "Inspire: One target in near gains a luck token.\n" +
                            "Fascinate (Focus): You transfix all chosen targets of level 4 or less within near",
                        type: "generic",
                    },
                    {
                        name: "Prolific",
                        bonusSource: "Class",
                        desc: "Add 1d6 to your learning rolls. Groups carousing with 1 or more bards add 1d6 to their rolls",
                        type: "generic",
                    },
                );
            }
            break;
        }
        case "Knight of St. Ydris": {
            const name = "Demonic Possession Increase";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "gain a bonus to your Demonic Possession bonus damage",
                        type: "modifyAmt",
                        bonusTo: "spellcastRoll",
                        bonusAmount: 1,
                        metadata: {
                            type: "spell",
                            spell: "Demonic Possession",
                        },
                    },
                );
            }
            break;
        }
        case "Warlock": {
            const name = "Patron";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "Your patron can choose to grant or withhold its gifts at any time. You can gain new Patron Boons/talents (or lose them) as a result",
                        type: "generic",
                    },
                );
            }
            break;
        }
        case "Witch":
            break;
        case "Desert Rider": {
            break;
        }
        case "Pit Fighter": {
            const name = "Implacable";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on CON checks to resist injury, poison, or endure extreme environments",
                        type: "generic",
                    },
                    {
                        name: "Last Stand",
                        bonusSource: "Class",
                        desc: "You get up from dying with 1 HP on a roll of 18-20",
                        type: "generic",
                    },
                );
            }
            break;
        }
        case "Ras-Godai": {
            const name = "Assassin";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on checks to sneak and hide. Your attacks deal double damage against targets that are unaware of your presence",
                        type: "generic",
                    },
                );
            }
            break;
        }
        case "Sea Wolf": {
            const name = "Seafarer";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on checks related to navigating and crewing boats",
                        type: "generic",
                    },
                    {
                        name: "Old Gods",
                        bonusSource: "Class",
                        desc: "Choose one after you complete a rest; you gain its benefits until you complete your next rest.\n" +
                            "Odin. You regain 1d4 HP every time you kill an enemy.\n" +
                            "Freya. You gain a luck token if you don't have one. Each time you use a luck token, add 1d6 to your roll.\n" +
                            "Loki. You have ADV on checks to lie, sneak, and hide.",
                        type: "generic",
                    },
                    {
                        name: "Shield Wall",
                        bonusSource: "Class",
                        desc: "If you wield a shield, you can take a defensive stance. Your AC becomes 20 during this time",
                        type: "generic",
                    },
                );
            }
            break;
        }
        case "Seer": {
            const name = "Destined";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "Whenever you use a luck token, add 1d6 to the roll",
                        type: "generic",
                    },
                );
            }
            break;
        }
        case "Basilisk Warrior": {
            const name = "Basilisk Blood";
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on CON checks to avoid harmful maladies, poisons, or afflictions",
                        type: "generic",
                    },
                    {
                        name: "Stone Skin",
                        bonusSource: "Class",
                        desc: "You have ADV on checks to hide in natural environments",
                        type: "generic",
                    },
                    {
                        name: "Stone Skin",
                        bonusSource: "Class",
                        desc: "Add 2 + half your level (round down) to your AC.",
                        type: "modifyAmt",
                        bonusTo: "armorClass",
                        bonusAmount: 2,
                        bonusIncreaseRatePerLevel: 0.5,
                    },
                );
            }
            break;
        }
    }
}
