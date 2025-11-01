import type {Cost, GearInfo, PlayerCharacter} from "../types"

export function gearCostToTotal(g: GearInfo, quantity = 1): number {
    return coinToTotal(g.cost) * quantity
}

export function playerMoneyToTotal(pc: PlayerCharacter): number {
    return coinToTotal({gp: pc.gold, sp: pc.silver, cp: pc.copper})
}

export function coinToTotal(money: Cost): number {
    return money.cp + money.sp * 10 + money.gp * 100
}

export function totalToCost(total: number): Cost {
    const cost = {gp: Math.floor(total / 100), sp: 0, cp: 0}
    total %= 100
    cost.sp = Math.floor(total / 10)
    cost.cp = total % 10
    return cost
}

export function totalToPlayerMoney(pc: PlayerCharacter, total: number) {
    pc.gold = Math.floor(total / 100)
    total %= 100
    pc.silver = Math.floor(total / 10)
    pc.copper = total % 10
}

export function roundCostTo5(cost: Cost): Cost {
    return {
        gp: Math.floor(cost.gp / 5) * 5,
        sp: Math.floor(cost.sp / 5) * 5,
        cp: Math.floor(cost.cp / 5) * 5
    }
}