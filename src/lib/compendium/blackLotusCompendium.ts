import type {ModifyBonus, SpellBonus, Talent} from "../types";

export const BLACK_LOTUS: Talent[] = [
    {
        name: "Gain two Black Lotus talents (reroll further 1s this instance)",
        type: "generic",
    },
    {
        name: "1/day, paralyze a target of LV 9 or less for 1d4 rounds when you damage it with a weapon",
        type: "bonus",
        bonuses: [
            {
                name: "Paralyze",
                desc: "1/day, paralyze a target of LV 9 or less for 1d4 rounds when you damage it with a weapon",
                type: "spell",
                spell: "Paralyze",
                bonusSource: "Talent",
                editable: true,
            },
        ] as SpellBonus[],
    },
    {
        name: "You have advantage on Dexterity checks to avoid entrapment or injury",
        type: "generic",
    },
    {
        name: "You gain +1 to your AC when wielding a melee weapon in each hand",
        type: "bonus",
        bonuses: [
            {
                name: `+1 to AC when dual wielding`,
                desc: `+1 to AC when dual wielding`,
                type: "modifyAmt",
                bonusAmount: 1,
                bonusTo: "armorClass",
                bonusSource: "Black Lotus",
                editable: true,
            }
        ] as ModifyBonus[],
    },
    {
        name: "You gain an additional hit points die", // TODO
        type: "generic",
    },
    {
        name: "You deal triple damage with your Assassinate talent",
        type: "generic",
    },
    {
        name: "When enemies who can see you make a morale check, the DC is 18 instead of 15",
        type: "generic",
    },
    {
        name: "1/day, you can walk on water as if it were solid for 1d4 rounds",
        type: "bonus",
        bonuses: [
            {
                name: "Waterwalking",
                desc: "1/day, you can walk on water as if it were solid for 1d4 rounds",
                type: "spell",
                spell: "Waterwalking",
                bonusSource: "Talent",
                editable: true,
            },
        ] as SpellBonus[],
    },
    {
        name: "1/day, choose a living creature of LV 5 or less you can see within near; it must pass a DC 15 CON check or fall asleep",
        type: "bonus",
        bonuses: [
            {
                name: "Lullaby",
                desc: "1/day, choose a living creature of LV 5 or less you can see within near; it must pass a DC 15 CON check or fall asleep",
                type: "spell",
                spell: "Lullaby",
                bonusSource: "Talent",
                editable: true,
            },
        ] as SpellBonus[],
    },
    {
        name: "1/day, you can walk on sheer surfaces such as walls for 1d4 rounds",
        type: "bonus",
        bonuses: [
            {
                name: "Wallwalking",
                desc: "1/day, you can walk on sheer surfaces such as walls for 1d4 rounds",
                type: "spell",
                spell: "Wallwalking",
                bonusSource: "Talent",
                editable: true,
            },
        ] as SpellBonus[],
    },
    {
        name: "+1 to melee damage",
        type: "bonus",
        bonuses: [
            {
                name: "+1 to melee damage",
                desc: "+1 to melee damage",
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
        ]
    },
    {
        name: "1/day, choose a creature of LV 9 or less you can see; it must pass a DC 15 WIS check or it can't see or hear you for 1d4 rounds",
        type: "bonus",
        bonuses: [
            {
                name: "Cloaking",
                desc: "1/day, choose a creature of LV 9 or less you can see; it must pass a DC 15 WIS check or it can't see or hear you for 1d4 rounds",
                type: "spell",
                spell: "Cloaking",
                bonusSource: "Talent",
                editable: true,
            },
        ] as SpellBonus[],
    },
]