import type {ArmorInfo} from "../types"

export const ARMORS: ArmorInfo[] = [
    {
        name: "Leather Armor",
        type: "Armor",
        cost: {gp: 10, sp: 0, cp: 0},
        properties: ["Mount"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 11, modifier: 0, stat: "DEX"},
    },
    {
        name: "Chainmail",
        type: "Armor",
        cost: {gp: 60, sp: 0, cp: 0},
        properties: ["Mount", "Loud", "Restrictive"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 2},
        ac: {base: 13, modifier: 0, stat: "DEX"},
    },
    {
        name: "Mithral Chainmail",
        type: "Armor",
        cost: {gp: 240, sp: 0, cp: 0},
        properties: ["Mount"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 13, modifier: 0, stat: "DEX"},
    },
    {
        name: "Plate mail",
        type: "Armor",
        cost: {gp: 130, sp: 0, cp: 0},
        properties: ["Mount", "Loud", "Heavy"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 3},
        ac: {base: 15, modifier: 0},
    },
    {
        name: "Mithral Plate Mail",
        type: "Armor",
        cost: {gp: 520, sp: 0, cp: 0},
        properties: ["Mount"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 2},
        ac: {base: 15, modifier: 0},
    },
    {
        name: "Round Shield",
        type: "Armor",
        cost: {gp: 15, sp: 0, cp: 0},
        properties: ["OneHanded", "Sundering"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 1},
        ac: {base: 0, modifier: 2},
    },
    {
        name: "Mithral Round Shield",
        type: "Armor",
        cost: {gp: 60, sp: 0, cp: 0},
        properties: ["OneHanded", "Sundering"],
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 0},
        ac: {base: 0, modifier: 2},
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
        name: "Eye Of Yag-Kesh",
        type: "Armor",
        cost: {gp: 0, sp: 0, cp: 0},
        canBeEquipped: true,
        slots: {freeCarry: 0, perSlot: 1, slotsUsed: 0},
        ac: {base: 0, modifier: 0, stat: "DEX", posStat: "WIS"},
    },
]

const ARMOR_COMPENDIUM: { [name: string]: ArmorInfo } = {}
for (const w of ARMORS) {
    ARMOR_COMPENDIUM[w.name.toLowerCase()] = w
}
export default ARMOR_COMPENDIUM
