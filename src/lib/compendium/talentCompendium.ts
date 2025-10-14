import type {
    AdvantageBonus,
    Class, DiceAmountBonus,
    DiceTypeBonus,
    ModifyBonus,
    Talent,
} from "../types";
import {ARMORS} from "./armorCompendium";
import {SPELLS} from "./spellCompendium";
import {WEAPONS} from "./weaponCompendium";

export const CLASS_TALENTS: { [key in Class]: Talent[] } = {
    "Fighter": [
        {
            name: "Gain Weapon Mastery with one weapon",
            type: "chooseBonus",
            choices: WEAPONS
                .filter((w) =>
                    !(
                        (w.damage.oneHanded && w.damage.oneHanded.numDice === 0) ||
                        (w.damage.twoHanded && w.damage.twoHanded.numDice === 0)
                    ))
                .map((w) =>
                    [
                        {
                            name: `+1 to attack for ${w.name}`,
                            desc: `+1 to attack for ${w.name}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusTo: "attackRoll",
                            bonusSource: "Talent",
                            editable: true,
                            metadata: {
                                type: "weapon",
                                weapon: w.name,
                            },
                        },
                        {
                            name: `+1 to damage for ${w.name}`,
                            desc: `+1 to damage for ${w.name}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusTo: "damageRoll",
                            bonusSource: "Talent",
                            editable: true,
                            metadata: {
                                type: "weapon",
                                weapon: w.name,
                            },
                        },
                    ] as ModifyBonus[],
            ),
        },
        {
            name: "+1 to melee and ranged attacks",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to attack type",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+1 to attack type",
                    desc: "+1 to ranged attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength, Dexterity, or Constitution stat",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+2 to CON",
                    type: "modifyAmt",
                    desc: "+2 to CON",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CON",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "Choose one kind of armor. You get +1 AC from that armor",
            type: "chooseBonus",
            choices: ARMORS.map(
                (a) =>
                    ({
                        name: `+1 to ${a.name}`,
                        desc: `+1 to ${a.name}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusTo: "armorClass",
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "armor",
                            armor: a.name,
                        },
                    }) as ModifyBonus,
            ),
        },
    ],
    "Priest": [
        {
            name: "Gain advantage on casting one spell you know",
            type: "chooseBonus",
            choices: SPELLS.map((s) => ({
                name: `Advantage to cast ${s.name}`,
                desc: `Advantage to cast ${s.name}`,
                type: "advantage",
                bonusTo: "spellcastRoll",
                bonusSource: "Talent",
                editable: true,
                metadata: {
                    type: "spell",
                    spell: s.name,
                },
            })) as AdvantageBonus[],
        },
        {
            name: "+1 to melee or ranged attacks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+1 to ranged attacks",
                    desc: "+1 to ranged attacks",
                    type: "modifyAmt",
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 to priest spellcasting checks",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to spellcasting",
                    desc: "+1 to spellcasting",
                    type: "modifyAmt",
                    bonusTo: "spellcastRoll",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength or Wisdom stat",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to stat",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to WIS",
                    desc: "+2 to WIS",
                    type: "modifyAmt",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "WIS",
                    },
                },
            ] as ModifyBonus[],
        },
    ],
    "Thief": [
        {
            name: "Gain advantage on initiative rolls (reroll if duplicate)",
            type: "bonus",
            bonuses: [
                {
                    name: "adv initiative",
                    desc: "adv initiative rolls",
                    type: "advantage",
                    bonusTo: "initiativeRoll",
                    bonusSource: "Talent",
                    editable: true,
                },
            ] as AdvantageBonus[],
        },
        {
            name: "Your Backstab deals +1 dice of damage",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 backstab dice",
                    desc: "+1 backstab dice",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "backstabDice",
                    bonusSource: "Talent",
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength, Dexterity, or Charisma stat",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+2 to CHA",
                    type: "modifyAmt",
                    desc: "+2 to CHA",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CHA",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 to melee and ranged attacks",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to attack type",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+1 to attack type",
                    desc: "+1 to ranged attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ] as ModifyBonus[],
        },
    ],
    "Wizard": [
        {
            name: "Make 1 random magic item of a type you choose",
            type: "generic",
        },
        {
            name: "+2 to Intelligence stat or +1 to wizard spellcasting checks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to INT",
                    type: "modifyAmt",
                    desc: "+2 to INT",
                    bonusTo: "stat",
                    bonusSource: "Talent",
                    bonusAmount: 2,
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "INT",
                    },
                },
                {
                    name: "+1 to spellcasting",
                    desc: "+1 to spellcasting",
                    type: "modifyAmt",
                    bonusTo: "spellcastRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "Gain advantage on casting one spell you know",
            type: "chooseBonus",
            choices: SPELLS.map((s) => ({
                name: `Advantage to cast ${s.name}`,
                desc: `Advantage to cast ${s.name}`,
                type: "advantage",
                bonusTo: "spellcastRoll",
                bonusSource: "Talent",
                editable: true,
                metadata: {
                    type: "spell",
                    spell: s.name,
                },
            })) as AdvantageBonus[],
        },
        {
            name: "Learn one additional wizard spell of any tier you know",
            type: "generic",
        },
    ],
    "Ranger": [
        {
            type: "chooseBonus",
            choices: WEAPONS
                .filter((w) =>
                    !(
                        (w.damage.oneHanded && w.damage.oneHanded.numDice === 0) ||
                        (w.damage.twoHanded && w.damage.twoHanded.numDice === 0)
                    ))
                .map((w) => ({
                name: `d12 damage for ${w.name}`,
                desc: `d12 damage for ${w.name}`,
                type: "diceType",
                bonusTo: "damageRoll",
                bonusSource: "Talent",
                diceType: "d12",
                editable: true,
                metadata: {
                    type: "weapon",
                    weapon: w.name,
                },
            })) as DiceTypeBonus[],
            name: "You deal d12 damage with one weapon you choose",
        },
        {
            name: "+1 to attacks and damage with melee or ranged weapons",
            type: "chooseBonus",
            choices: (["Melee", "Ranged"] as const).map((w) => [
                {
                    name: `+1 to attack for ${w} weapons`,
                    desc: `+1 to attack for ${w} weapons`,
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: w,
                    },
                },
                {
                    name: `+1 to damage for ${w} weapons`,
                    desc: `+1 to damage for ${w} weapons`,
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: w,
                    },
                },
            ]) as ModifyBonus[][],
        },
        {
            name: "+2 to Strength, Dexterity, or Intelligence stat",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+2 to INT",
                    type: "modifyAmt",
                    desc: "+2 to INT",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "INT",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "Reduce the difficulty of your herbalism checks by one step",
            type: "generic",
        },
    ],
    "Bard": [
        {
            name: "You find a random priest or wizard wand (you choose)",
            type: "generic",
        },
        {
            name: "+1 to melee and ranged attacks or +1 to Magical Dabbler rolls",
            type: "chooseBonus",
            choices: [
                [
                    {
                        name: "+1 to melee attacks",
                        desc: "+1 to melee attacks",
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusTo: "attackRoll",
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "weaponType",
                            weaponType: "Melee",
                        },
                    },
                    {
                        name: "+1 to ranged attacks",
                        desc: "+1 to ranged attacks",
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusTo: "attackRoll",
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "weaponType",
                            weaponType: "Ranged",
                        },
                    },
                ],
                [
                    {
                        name: "+1 to Magical Dabbler rolls",
                        desc: "+1 to Magical Dabbler rolls",
                        type: "generic",
                        editable: true,
                    }
                ],
            ] as ModifyBonus[][],
        },
        { // TODO weil Barde ne Extrawurst braucht
            name: "+2 points to distribute to any stats",
            type: "generic",
        },
        {
            name: "Your Presence effects become DC 9 to enact (reroll duplicates)",
            type: "generic",
        },
    ],
    "Knight of St. Ydris": [
        {
            name: "Your Demonic Possession bonus increases by 1 point",
            type: "bonus",
            bonuses: [
                {
                    name: "Your Demonic Possession bonus increases by 1 point",
                    desc: "Your Demonic Possession bonus increases by 1 point",
                    type: "modifyAmt",
                    bonusTo: "spellcastRoll",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 to melee or ranged attacks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+1 to ranged attacks",
                    desc: "+1 to ranged attacks",
                    type: "modifyAmt",
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength, Dexterity, or Constitution stat",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+1 to spellcasting",
                    desc: "+1 to spellcasting",
                    type: "modifyAmt",
                    bonusTo: "spellcastRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Charisma or +1 to witch spellcasting checks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to CHA",
                    type: "modifyAmt",
                    desc: "+2 to CHA",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CHA",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+2 to CON",
                    type: "modifyAmt",
                    desc: "+2 to CON",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CON",
                    },
                },
            ] as ModifyBonus[],
        },
    ],
    "Warlock": [
        {
            name: "Roll a Patron Boon from any patron; an unexplained gift",
            type: "generic",
        },
        {
            name: "Add +1 point to two stats (they must be different)", // TODO
            type: "generic",
        },
        {
            name: "+1 to melee or ranged attacks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+1 to ranged attacks",
                    desc: "+1 to ranged attacks",
                    type: "modifyAmt",
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    bonusAmount: 1,
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "Roll two Patron Boons and choose one to keep",
            type: "generic",
        },
    ],
    "Witch": [
        {
            name: "1/day, teleport to your familiar's location as a move", // TODO
            type: "generic",
        },
        {
            name: "+2 to Charisma stat or +1 to witch spellcasting checks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to CHA",
                    desc: "+2 to CHA",
                    type: "modifyAmt",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CHA",
                    },
                },
                {
                    name: "+1 to witch spellcasting checks",
                    desc: "+1 to witch spellcasting checks",
                    type: "modifyAmt",
                    bonusTo: "spellcastRoll",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "Gain advantage on casting one spell you know",
            type: "chooseBonus",
            choices: SPELLS.map((s) => ({
                name: `Advantage to cast ${s.name}`,
                desc: `Advantage to cast ${s.name}`,
                type: "advantage",
                bonusTo: "spellcastRoll",
                bonusSource: "Talent",
                editable: true,
                metadata: {
                    type: "spell",
                    spell: s.name,
                },
            })) as AdvantageBonus[],
        },
        {
            name: "Learn one additional witch spell of any tier you know",
            type: "generic",
        },
    ],
    "Desert Rider": [
        {
            name: "You can use any rider-bearing creature as your mount (reroll duplicates)",
            type: "generic",
        },
        {
            name: "+1 to attacks or damage with melee and ranged weapons",
            type: "chooseBonus",
            choices: (["attack", "damage"] as const).map((w) => [
                {
                    name: `+1 to ${w} for melee weapons`,
                    desc: `+1 to ${w} for melee weapons`,
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: `${w}Roll`,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: `+1 to ${w} for ranged weapons`,
                    desc: `+1 to ${w} for ranged weapons`,
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: `${w}Roll`,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ]) as ModifyBonus[][],
        },
        {
            name: "+2 to Strength or Dexterity stat, or +1 to melee attacks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 use per day of Charge",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 use per day of Charge",
                    desc: "+1 use per day of Charge",
                    type: "modifyAmt",
                    bonusTo: "spellMax",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "spell",
                        spell: "Charge",
                    },
                },
            ] as ModifyBonus[],
        },
    ],
    "Pit Fighter": [
        {
            name: "1/day, ignore all damage and effects from one attack",
            type: "generic",
        },
        {
            name: "+1 to melee weapon damage",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to melee weapon damage",
                    desc: "+1 to melee weapon damage",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength or Constitution stat, or +1 to melee attacks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to CON",
                    type: "modifyAmt",
                    desc: "+2 to CON",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CON",
                    },
                },
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "Increase the HP you gain from Flourish by 1d6",
            type: "bonus",
            bonuses: [
                {
                    name: "Increased Flourish HP gain",
                    desc: "Increase the HP you gain from Flourish by 1d6",
                    type: "diceAmount",
                    bonusAmount: 1,
                    diceType: "d6",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "spell",
                        spell: "Flourish",
                    },
                },
            ] as DiceAmountBonus[],
        },
    ],
    "Ras-Godai": [
        {
            name: "You are trained in the use of poisons (reroll duplicates)",
            type: "generic",
        },
        {
            name: "Roll an additional talent on the Black Lotus Talents table", // TODO
            type: "generic",
        },
        {
            name: "+2 to Strength or Dexterity stat, or +1 to melee attacks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 use per day of Smoke Step",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 use per day of Smoke Step",
                    desc: "+1 use per day of Smoke Step",
                    type: "modifyAmt",
                    bonusTo: "spellMax",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "spell",
                        spell: "Smoke Step",
                    },
                },
            ] as ModifyBonus[],
        },
    ],
    "Sea Wolf": [
        {
            name: "1/day, go berserk: immune to damage for 3 rounds", // TODO
            type: "generic",
        },
        {
            name: "+1 to melee weapon damage",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to weapon damage",
                    desc: "+1 to weapon damage",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "MeleeRanged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 to melee and ranged attacks or +1 to Magical Dabbler rolls",
            type: "chooseBonus",
            choices: [
                [

                    {
                        name: "+2 to STR",
                        type: "modifyAmt",
                        desc: "+2 to STR",
                        bonusTo: "stat",
                        bonusAmount: 2,
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat: "STR",
                        },
                    },
                ],
                [
                    {
                        name: "+2 to CON",
                        type: "modifyAmt",
                        desc: "+2 to CON",
                        bonusTo: "stat",
                        bonusAmount: 2,
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat: "CON",
                        },
                    },
                ],
                [
                    {
                        name: "+1 to melee attacks",
                        desc: "+1 to melee attacks",
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusTo: "attackRoll",
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "weaponType",
                            weaponType: "Melee",
                        },
                    },
                    {
                        name: "+1 to ranged attacks",
                        desc: "+1 to ranged attacks",
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusTo: "attackRoll",
                        bonusSource: "Talent",
                        editable: true,
                        metadata: {
                            type: "weaponType",
                            weaponType: "Ranged",
                        },
                    },
                ],
            ] as ModifyBonus[][],
        },
        {
            name: "Duality; choose two different Old Gods effects each day (reroll duplicates)",
            type: "generic",
        },
    ],
    "Seer": [
        {
            name: "Learn an additional seer spell from any tier you can cast",
            type: "generic",
        },
        {
            name: "+1 use per day of Omen",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 use per day of Omen",
                    desc: "+1 use per day of Omen",
                    type: "modifyAmt",
                    bonusTo: "spellMax",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "spell",
                        spell: "Omen",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Wisdom or Charisma stat, or +1 to spellcasting checks",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to WIS",
                    type: "modifyAmt",
                    desc: "+2 to WIS",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "WIS",
                    },
                },
                {
                    name: "+2 to CHA",
                    type: "modifyAmt",
                    desc: "+2 to CHA",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CHA",
                    },
                },
                {
                    name: "+1 to spellcasting checks",
                    desc: "+1 to spellcasting checks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "spellcastRoll",
                    bonusSource: "Talent",
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "Increase the dice category of your Destined talent by one",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to dice category Destined",
                    desc: "+1 to dice category Destined",
                    type: "diceType",
                    bonusTo: "spellcastRoll",
                    diceType: "d8", // TODO
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "spell",
                        spell: "Destined",
                    },
                },
            ] as DiceTypeBonus[],
        },
    ],
    "Basilisk Warrior": [
        {
            name: "You find a basilisk egg; a loyal hatchling emerges in 1d4 days (reroll duplicates)",
            type: "generic",
        },
        {
            name: "+1 to weapon attacks and damage",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to melee and ranged attacks",
                    desc: "+1 to melee and ranged attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "MeleeRanged",
                    },
                },
                {
                    name: "+1 to melee and ranged damage",
                    desc: "+1 to melee and ranged damage",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "MeleeRanged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength, Dexterity, or Constitution stat",
            type: "chooseBonus",
            choices: [
                {
                    name: "+2 to STR",
                    type: "modifyAmt",
                    desc: "+2 to STR",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "STR",
                    },
                },
                {
                    name: "+2 to DEX",
                    type: "modifyAmt",
                    desc: "+2 to DEX",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "DEX",
                    },
                },
                {
                    name: "+2 to CON",
                    type: "modifyAmt",
                    desc: "+2 to CON",
                    bonusTo: "stat",
                    bonusAmount: 2,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "stat",
                        stat: "CON",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+1 use per day of Petrifying Gaze",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 use per day of Petrifying Gaze",
                    desc: "+1 use per day of Petrifying Gaze",
                    type: "modifyAmt",
                    bonusTo: "spellMax",
                    bonusAmount: 1,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "spell",
                        spell: "Petrifying Gaze",
                    },
                },
            ] as ModifyBonus[],
        },
    ],
};
