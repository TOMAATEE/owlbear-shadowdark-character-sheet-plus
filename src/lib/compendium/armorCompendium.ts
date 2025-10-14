import type {ArmorInfo} from "../types";

export const ARMORS: ArmorInfo[] = [
    {
        name: "Plate mail",
        type: "Armor",
        cost: {gp: 130, sp: 0, cp: 0},
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 3},
        ac: {base: 15, modifier: 0},
        playerBonuses: [
            {
                type: "generic",
                name: "Disadv stealth",
                desc: "Disadvantage on stealth rolls",
            },
            {
                type: "generic",
                name: "Cannot swim",
                desc: "You cannot swim while wearing this armor",
            },
        ],
    },
    {
        name: "Mithral Plate Mail",
        type: "Armor",
        cost: {gp: 520, sp: 0, cp: 0},
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 2},
        ac: {base: 15, modifier: 0},
    },
    {
        name: "Chainmail",
        type: "Armor",
        cost: {gp: 60, sp: 0, cp: 0},
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 2},
        ac: {base: 13, modifier: 0, stat: "DEX"},
        playerBonuses: [
            {
                type: "generic",
                name: "Disadv stealth",
                desc: "Disadvantage on stealth rolls",
            },
            {
                type: "generic",
                name: "Disadv swimming",
                desc: "Disadvantage on swimming rolls",
            },
        ],
    },
    {
        name: "Mithral Chainmail",
        type: "Armor",
        cost: {gp: 240, sp: 0, cp: 0},
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 13, modifier: 0, stat: "DEX"},
    },
    {
        name: "Leather Armor",
        type: "Armor",
        cost: {gp: 10, sp: 0, cp: 0},
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 11, modifier: 0, stat: "DEX"},
    },
    {
        name: "Shield",
        type: "Armor",
        cost: {gp: 10, sp: 0, cp: 0},
        properties: ["OneHanded"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 0, modifier: 2},
    },
    {
        name: "Mithral Shield",
        type: "Armor",
        cost: {gp: 40, sp: 0, cp: 0},
        properties: ["OneHanded"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 0},
        ac: {base: 0, modifier: 2},
    },
    {
        name: "Round Shield",
        type: "Armor",
        cost: {gp: 15, sp: 0, cp: 0},
        properties: ["OneHanded"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 0, modifier: 2},
        playerBonuses: [
            {
                type: "generic",
                name: "Sunder block",
                desc: "Sunder to negate one melee hit's damage",
            }
        ]
    },
];

const ARMOR_COMPENDIUM: { [name: string]: ArmorInfo } = {};
for (const w of ARMORS) {
    ARMOR_COMPENDIUM[w.name.toLowerCase()] = w;
}
export default ARMOR_COMPENDIUM;
