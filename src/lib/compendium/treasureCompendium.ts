import type {TreasureInfo} from "../types"
import {TREASURE_PROPERTIES} from "../constants"
import {gearCostToTotal, totalToCost, roundCostTo5} from "../utils"

export const TREASURE: TreasureInfo[] = [
    // #################################################################################################################
    // ----------------------------------------------------Gems---------------------------------------------------------
    // #################################################################################################################
    {
        name: "Pearl",
        properties: ["Cracked", "Basic", "Perfect", "Huge"],
        modCosts: true,
        cost: {gp: 20, sp: 0, cp: 0},
        canBeEquipped: false,
        type: "Treasure",
        slots: {perSlot: 0, slotsUsed: 0, freeCarry: 1},
    },
    {
        name: "Gem",
        properties: ["Cracked", "Pure", "Perfect", "Cut", "Huge"],
        modCosts: true,
        cost: {gp: 50, sp: 0, cp: 0},
        canBeEquipped: false,
        type: "Treasure",
        slots: {perSlot: 0, slotsUsed: 0, freeCarry: 1},
    },
]

const TREASURE_COMPENDIUM: { [name: string]: TreasureInfo } = {}
for (const treasure of TREASURE) {
    const baseCost = treasure.modCosts ? gearCostToTotal(treasure) : null

    for (const prop of treasure.properties) {
        const name = prop === "Basic" ? treasure.name : `${prop} ${treasure.name}`
        const cost = treasure.modCosts
            ? roundCostTo5(totalToCost(baseCost * TREASURE_PROPERTIES[prop]))
            : treasure.cost

        TREASURE_COMPENDIUM[name.toLowerCase()] = {...treasure, name, cost}
    }
}

export default TREASURE_COMPENDIUM