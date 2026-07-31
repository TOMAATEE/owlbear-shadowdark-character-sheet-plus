import type {LANGUAGES} from "../constants"
import type {PlayerCharacter, Gear, Class, Bonus, SpellInfo} from "../types"
import {learnSpellForPlayer} from "../model/PlayerCharacter"
import SPELL_COMPENDIUM from "../compendium/spellCompendium"

export function ensureLanguages(pc: PlayerCharacter) {
    const languages: (typeof LANGUAGES)[number][] = ["Common"]
    switch (pc.ancestry) {
        case "Elf":
            languages.push("Elvish", "Sylvan")
            break
        case "Human":
            break
        case "Dwarf":
            languages.push("Dwarvish")
            break
        case "Goblin":
            languages.push("Goblin")
            break
        case "Halfling":
            break
        case "Half-Elf":
            languages.push("Elvish")
            break
        case "Half-Orc":
            languages.push("Orcish")
            break
        case "Kobold":
            languages.push("Draconic")
            break
    }
    switch (pc.class) {
        case "Knight of St. Ydris":
            languages.push("Diabolic")
            break
        case "Ras-Godai":
            languages.push("Diabolic")
            break
        case "Witch":
            languages.push("Diabolic", "Primordial", "Sylvan")
            break
        case "Green Knight":
            languages.push("Sylvan")
            break
        case "Wyrdling":
            languages.push("Primordial")
            break
    }
    for (const l of languages) {
        if (!pc.languages.includes(l)) {
            pc.languages.push(l)
        }
    }
}

export function setMishapTable(pc: PlayerCharacter) {
    switch (pc.class) {
        case "Necromancer":
            pc.mishapTable = "Necromancer"
            break
        case "Bard":
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
    clearAncestryBonuses(pc)
    addAncestryBonuses(pc.bonuses, pc)
}

export function ensureClassBonuses(pc: PlayerCharacter) {
    clearClassBonuses(pc)
    if (!pc.class || pc.hasCustomClass) return
    addClassBonuses(pc.bonuses, pc.class)
}

export function ensureClassGear(pc: PlayerCharacter) {
    clearClassGear(pc)
    if (!pc.class || pc.hasCustomClass) return
    addClassGear(pc.gear, pc.class)
}

export function ensureClassSpells(pc: PlayerCharacter) {
    clearClassSpells(pc)
    if (!pc.class || pc.hasCustomClass) return
    addClassSpells(pc)
}

function clearClassSpells(pc: PlayerCharacter) {
    pc.spells = pc.spells.filter(
        (spell) =>
            spell.tier !== 0 || spell.class.includes(pc.class) || spell.class.includes(pc.ancestry)
    )
}

function addClassSpells(pc: PlayerCharacter) {
    const classSpells: string[] = []
    switch (pc.class) {
        case "Basilisk Warrior":
            classSpells.push("Petrifying Gaze")
            break
        case "Delver":
            classSpells.push("Scavenger")
            break
        case "Desert Rider":
            classSpells.push("Charge")
            break
        case "Duelist":
            classSpells.push("Parry")
            break
        case "Green Knight":
            classSpells.push("Rooted")
            break
        case "Knight of St. Ydris":
            classSpells.push("Demonic Possession")
            break
        case "Kyzian Archer":
            classSpells.push("Hawk Eye")
            break
        case "Monk of Yag-Kesh":
            classSpells.push("Sun On The Water")
            break
        case "Pit Fighter":
            classSpells.push("Flourish", "Relentless")
            break
        case "Priest":
            classSpells.push("Turn Undead")
            break
        case "Ranger":
            classSpells.push("Herbalism")
            break
        case "Ras-Godai":
            classSpells.push("Smoke Step")
            break
        case "Seer":
            classSpells.push("Omen")
            break
        case "Witch":
            classSpells.push("Revive Familiar")
            break
    }
    classSpells.forEach(spell => {
        learnSpellForPlayer(pc, SPELL_COMPENDIUM[spell.toLowerCase()])
    })
}

function clearAncestryBonuses(pc: PlayerCharacter) {
    pc.bonuses = pc.bonuses.filter(
        (b) => ![
                "Adaptable",
                "Ambitious",
                "Farsight",
                "Keen senses",
                "Knack",
                "Mighty Attack ancestry",
                "Mighty Damage ancestry",
                "Stout",
            ].includes(b.name)
    )
    pc.spells = pc.spells.filter(
        (s) =>  ![
                "Stealthy"
            ].includes(s.name)
    )
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
                "Stone Skin",
                "Scavenger",
                "Trailblazer",
                "Trusty Gear",
                "Tale Spinner",
                "Taunt",
                "Kyzian Quiver",
                "Eye Of Yag-Kesh",
                "Fist Of The Moon God",
                "Still The Heart",
                "Death Sense",
                "River of Death",
                "Chivalric Oath",
                "Inspiring Presence",
                "Knowaguy",
                "Lucksmith",
                "Surprising Guts",
                "Hideous Biology",
                "Pseudopod",
            ].includes(b.name) && !b.name.includes("Thievery:")
    )
}

function clearClassGear(pc: PlayerCharacter) {
    pc.gear = pc.gear.filter(
        (g) => !["Thieving Tools", "Holy Symbol", "Fist of the Moon God", "Eye Of Yag-Kesh"].includes(g.name)
    )
}

function addClassGear(gear: Gear[], c: Class) {
    if (c === "Thief" && !gear.find((g) => g.name === "Thieving Tools")) {
        gear.push({name: "Thieving Tools", quantity: 1})
    } else if (c === "Priest" && !gear.find((g) => g.name === "Holy Symbol")) {
        gear.push({name: "Holy Symbol", quantity: 1})
    } else if (c === "Monk of Yag-Kesh" && !gear.find((g) => g.name === "Fist of the Moon God")) {
        gear.push({name: "Fist of the Moon God", quantity: 1, equipped: true}, {name: "Eye Of Yag-Kesh", quantity: 1, equipped: true})
    }
}

function addAncestryBonuses(bonuses: Bonus[], pc: PlayerCharacter) {
    const ancestry = pc.ancestry ?? ""
    switch (ancestry) {
        case "Elf": {
            const name = "Farsight"
            if (!bonuses.find((b) => [name, `Ranged ${name}`, `Spell ${name}`].includes(b.name))) {
                bonuses.push({
                    name,
                    desc: "",
                    bonusSource: "Ancestry",
                    type: "select",
                    bonuses: [
                        {
                            name: "placeholder",
                            desc: "Please select a Ancestry bonus",
                            bonusSource: "Ancestry",
                            type: "generic"
                        },
                        {
                            name: `Ranged ${name}`,
                            desc: "You have a +1 bonus to attack rolls with ranged weapons",
                            bonusSource: "Ancestry",
                            type: "modifyAmt",
                            bonusTo: "attackRoll",
                            bonusAmount: 1,
                            editable: true,
                            metadata: {
                                type: "weaponType",
                                weaponType: "Ranged",
                            },
                        },
                        {
                            name: `Spell ${name}`,
                            desc: "You have a +1 bonus to spellcasting checks",
                            bonusSource: "Ancestry",
                            type: "modifyAmt",
                            bonusTo: "spellcastRoll",
                            bonusAmount: 1,
                            editable: true,
                        },
                    ]
                })
            }
            break
        }
        case "Human": {
            const name = "Ambitious"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "You gain one additional talent roll at 1st level",
                    type: "generic",
                })
            }
            break
        }
        case "Dwarf": {
            const name = "Stout"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "Start with +2 HP. Roll your HP gains per level with ADV",
                    type: "advantage",
                    bonusTo: "hpRoll",
                })
            }
            break
        }
        case "Goblin": {
            const name = "Keen senses"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "You can't be surprised",
                    type: "generic",
                })
            }
            break
        }
        case "Halfling": {
            const name = "Stealthy"
            if (!pc.spells.find((s) => s.name === name)) {
                learnSpellForPlayer(pc, {name} as SpellInfo)
            }
            break
        }
        case "Half-Elf": {
            const name = "Adaptable"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Ancestry",
                    desc: "Roll your talent rolls twice and choose which result to keep",
                    type: "generic",
                })
            }
            break
        }
        case "Half-Orc": {
            const nameAtk = "Mighty Attack ancestry"
            const nameDmg = "Mighty Damage ancestry"
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
                )
            }
            break
        }
        case "Kobold": {
            const name = "Knack"
            if (!bonuses.find((b) => [name, `Luck ${name}`, `Spell ${name}`].includes(b.name))) {
                bonuses.push({
                    name,
                    desc: "",
                    bonusSource: "Ancestry",
                    type: "select",
                    bonuses: [
                        {
                            name: "placeholder",
                            desc: "Please select a Ancestry bonus",
                            bonusSource: "Ancestry",
                            type: "generic"
                        },
                        {
                            name: `Luck ${name}`,
                            desc: "begin each session with a luck token",
                            bonusSource: "Ancestry",
                            type: "generic",
                            editable: true,
                        },
                        {
                            name: `Spell ${name}`,
                            desc: "You have a +1 bonus to spellcasting checks",
                            bonusSource: "Ancestry",
                            type: "modifyAmt",
                            bonusTo: "spellcastRoll",
                            bonusAmount: 1,
                            editable: true,
                        },
                    ]
                })
            }
            break
        }
    }
}

function addClassBonuses(bonuses: Bonus[], c: Class) {
    switch (c) {
        case "Thief": {
            let name = "Thievery"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on climbing, sneaking, hiding, applying disguises, disabling traps, picking pockets, opening locks",
                        type: "generic",
                    },
                )
            }

            name = "Backstab"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Class",
                    desc: "+1 additional weapon dice of damage on unaware enemies",
                    type: "modifyAmt",
                    bonusTo: "backstabDice",
                    bonusAmount: 1,
                    bonusIncreaseRatePerLevel: 0.5,
                })
            }
            break
        }
        case "Priest": {
            break
        }
        case "Wizard": {
            const name = "Learning Spells"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push({
                    name,
                    bonusSource: "Class",
                    desc: "Study a scroll (1 Day) + DC 15 INT check to permanently learn scroll",
                    type: "generic",
                })
            }
            break
        }
        case "Fighter": {
            const name = "Hauler"
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
                })
            }
            break
        }
        case "Ranger": {
            const name = "Herbalism"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name: "Wayfinder",
                        bonusSource: "Class",
                        desc: "ADV on checks associated with navigation, survivalism, tracking, sneaking, hiding, nature, animals",
                        type: "generic",
                    }
                )
            }
            break
        }
        case "Bard": {
            const name = "Bardic Arts"
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
                )
            }
            break
        }
        case "Knight of St. Ydris": {
            const name = "Demonic Possession Increase"
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
                )
            }
            break
        }
        case "Warlock": {
            const name = "Patron"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "Your patron can choose to grant or withhold its gifts at any time. You can gain new Patron Boons/talents (or lose them) as a result",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Witch":
            break
        case "Desert Rider": {
            break
        }
        case "Pit Fighter": {
            const name = "Implacable"
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
                )
            }
            break
        }
        case "Ras-Godai": {
            const name = "Assassin"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "ADV on checks to sneak and hide. Your attacks deal double damage against targets that are unaware of your presence",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Sea Wolf": {
            const name = "Seafarer"
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
                        desc: "Choose one after you complete a rest you gain its benefits until you complete your next rest.\n" +
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
                )
            }
            break
        }
        case "Seer": {
            const name = "Destined"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "Whenever you use a luck token, add 1d6 to the roll",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Basilisk Warrior": {
            const name = "Basilisk Blood"
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
                )
            }
            break
        }
        case "Delver": {
            const name = "Trailblazer"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "You have ADV on checks to Climbing, Swimming, Foraging, Understanding unknown languages, Avoid or escape natural terrain hazards",
                        type: "generic",
                    },
                    {
                        name: "Trusty Gear",
                        bonusSource: "Class",
                        desc: "Choose one type of gear or weapon you can wield.\n" +
                            "You gain 1 + half your level (round down) on checks or attack rolls made with that type of gear or weapon",
                        type: "modifyAmt",
                        bonusTo: "attackRoll",
                        bonusAmount: 1,
                        bonusIncreaseRatePerLevel: 0.5,
                    },
                )
            }
            break
        }
        case "Duelist": {
            const name = "Tale Spinner"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "You may make a DC 15 CHA check. If you pass, unknown people around you believe you are famous and important for the remainder of your interaction with them.\n" +
                            "The same individual cannot be fooled by this twice",
                        type: "generic",
                    },
                    {
                        name: "Taunt",
                        bonusSource: "Class",
                        desc: "When an enemy misses you with an attack, you have advantage on attacks against that enemy next round",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Kyzian Archer": {
            const name = "Kyzian Quiver"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "One of your arrow quivers can hold up to 80 arrows while only occupying one gear slot",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Monk of Yag-Kesh": {
            const name = "Eye Of Yag-Kesh"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "While unarmored, add your Wisdom modifier (if positive) to your AC",
                        type: "generic",
                    },
                    {
                        name: "Fist Of The Moon God",
                        bonusSource: "Class",
                        desc: "Your strikes are +0 magic weapons that deal d8 damage.\n" +
                            "They become +1 at 2nd level, +2 at 4th level, and +3 at 8th level",
                        type: "generic",
                    },
                    {
                        name: "Still The Heart",
                        bonusSource: "Class",
                        desc: "You can stop your metabolism for a total number of rounds per day equal to your level.\n" +
                            "You gain the following benefits for the duration:\n" +
                            "• You do not need to breathe.\n" +
                            "• Delay the onset of any poisons until this effect ends.\n" +
                            "• If you drop to 0 HP, you do not fall unconscious or begin dying until this effect ends.",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Necromancer": {
            const name = "Death Sense"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "You can sense the location and general nature of undead and dying creatures within near of you",
                        type: "generic",
                    },
                    {
                        name: "River of Death",
                        bonusSource: "Class",
                        desc: "Your spirit has walked in the eternal river, and you have learned to resist the pull of death.\n" +
                            "You do not die at 0 CON, and you roll a d6 for your death timer instead of a d4",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Paladin": {
            const name = "Chivalric Oath"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "You swear to act with integrity, humility, and chivalry. You must give honor and mercy to the deserving.\n" +
                            "If you break this oath, you lose your Inspiring Presence and Named Blade talents until completing a holy quest of great challenge",
                        type: "generic",
                    },
                    {
                        name: "Inspiring Presence",
                        bonusSource: "Class",
                        desc: "Allies within near of you rise from dying on a roll of 18-20 and regain HP equal to your CHA bonus (min. 1).\n" +
                            "Enemies within near of you lose immunity to morale checks",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Roustabout": {
            const name = "Knowaguy"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "You have advantage on checks related to interacting with commoners and sourcing favors",
                        type: "generic",
                    },
                    {
                        name: "Lucksmith",
                        bonusSource: "Class",
                        desc: "Whenever another player uses your luck token, they have advantage on the new roll",
                        type: "generic",
                    },
                    {
                        name: "Surprising Guts",
                        bonusSource: "Class",
                        desc: "When you are reduced to half your HP or lower, you have advantage on your next roll",
                        type: "generic",
                    },
                )
            }
            break
        }
        case "Wyrdling": {
            const name = "Hideous Biology"
            if (!bonuses.find((b) => b.name === name)) {
                bonuses.push(
                    {
                        name,
                        bonusSource: "Class",
                        desc: "You can hideously stretch your body to fit through inch-wide cracks.\n" +
                            "It takes you 3 rounds to pass through an obstacle in this way",
                        type: "generic",
                    },
                    {
                        name: "Pseudopod",
                        bonusSource: "Class",
                        desc: "You can sprout a clawed, horrid pseudopod from your body",
                        type: "generic",
                    },
                )
            }
            break
        }
    }
}
