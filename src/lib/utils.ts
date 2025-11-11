import {findAny} from "./compendium"
import {DICE_TYPES, ValueForDiceType} from "./constants"
import type {ArmorInfo, Cost, DiceType, Gear, GearInfo, PlayerCharacter, Slots, TreasureInfo, WeaponInfo} from "./types"

export function clamp(n: number, min: number, max: number): number {
    return Math.max(Math.min(max, n), min)
}

export function sum(numbers: number[]): number {
    return numbers.reduce((acc, x) => acc + x, 0)
}

export function rollDice(diceType: DiceType, numDice = 1): number {
    let result = 0
    for (let i = 0; i < numDice; i++) {
        result += Math.floor(Math.random() * ValueForDiceType[diceType]) + 1
    }
    return result
}

export function rollDiceA(diceType: DiceType, numDice = 1): number[] {
    const result: number[] = []
    for (let i = 0; i < numDice; i++) {
        result.push(rollDice(diceType))
    }
    return result
}

export function toPlusString(numbers: number[], brackets: boolean = null): string {
    if (brackets === null) brackets = numbers.length > 1
    const diceS = numbers.reduce((prev, current) => prev + current + " + ", brackets ? "(" : "")
    return diceS.substring(0, diceS.length - 3) + (brackets ? ")" : "")
}

export function addSign(n: number): string {
    return `${n >= 0 ? "+" : ""}${n}`
}

export function sortAlphabetically(a: string, b: string, ascending = true): number {
    const dir = ascending ? 1 : -1
    return a.localeCompare(b, undefined, { sensitivity: 'base' }) * dir
}

export function sortNumeric(a: number, b: number, ascending = true): number {
    const dir = ascending ? 1 : -1
    return (a - b) * dir
}

export function sortCost(a: Cost, b: Cost, ascending = true): number {
    return (
        sortNumeric(a.gp, b.gp, ascending) ||
        sortNumeric(a.sp, b.sp, ascending) ||
        sortNumeric(a.cp, b.cp, ascending)
    )
}

export function sortSlots(a: Slots, b: Slots, ascending = true): number {
    if (a.freeCarry !== b.freeCarry) {
        return (a.freeCarry ? -1 : 1) * (ascending ? 1 : -1)
    }
    return (
        sortNumeric(a.slotsUsed, b.slotsUsed, ascending) ||
        sortNumeric(b.perSlot, a.perSlot, ascending) // inverted a and b, more perSlot -> "smaller" item
    )
}

export function toInfo<T extends GearInfo>(g: Gear): T {
    return findAny(g.name) as T
}

// eslint-disable-next-line
export function debounce<F extends (...args: any[]) => any>(
    fn: F,
    ms = 500,
    onStartWaiting?: () => void,
    onFinish?: () => void
) {
    let timer: NodeJS.Timeout

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        onStartWaiting?.()
        return new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                resolve(fn(...args))
                onFinish?.()
            }, ms)
        })
    }
}

export function compareDiceType(a: DiceType, b: DiceType) {
    return (
        DICE_TYPES.findIndex((d) => d === a) - DICE_TYPES.findIndex((d) => d === b)
    )
}

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

export function getCostForGear(g: GearInfo, multiplier = 1): string {
    const { gp, sp, cp } = totalToCost(coinToTotal(g.cost) * multiplier)
    return [gp && `${gp}gp`, sp && `${sp}sp`, cp && `${cp}cp`].filter(Boolean).join(" ")
}

export function isWeaponInfo(gear: GearInfo): gear is WeaponInfo {
    return gear.type === "Weapon";
}

export function isArmorInfo(gear: GearInfo): gear is ArmorInfo {
    return gear.type === "Armor";
}

export function isTreasureInfo(gear: GearInfo): gear is TreasureInfo {
    return gear.type === "Treasure";
}