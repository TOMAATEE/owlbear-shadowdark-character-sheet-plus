import {writable} from "svelte/store"
import {findAny, findSpell} from "../compendium"
import {DICE_TYPES, TITLE_MAP} from "../constants"
import {
    ensureAncestryBonuses,
    ensureClassBonuses,
    ensureClassGear,
    ensureClassSpells,
    ensureLanguages, setMishapTable,
} from "../services/AncestryClassEnsurer"
import {createUndoRedoStore} from "../services/PlayerHistoryTracker"
import type {
    AdvantageBonus,
    Ancestry,
    ArmorInfo,
    Background,
    Bonus,
    Class,
    DiceAmountBonus,
    DiceType,
    DiceTypeBonus,
    DisadvantageBonus,
    Gear,
    GearInfo,
    ModifyBonus,
    PlayerCharacter,
    SpellInfo,
    Stat,
    Title,
    WeaponInfo,
} from "../types"
import {sortAlphabetically, clamp, compareDiceType, toInfo, gearCostToTotal, playerMoneyToTotal} from "../utils"
import {slotsForGear} from "./Gear"
import SPELL_COMPENDIUM from "../compendium/spellCompendium"

export const PlayerCharacterStore = createUndoRedoStore(
    writable<PlayerCharacter>(defaultPC()),
)
export const pc = PlayerCharacterStore

export function defaultPC(): PlayerCharacter {
    return {
        name: "",
        ancestry: "Human",
        class: "Fighter",
        level: 0,
        title: "Rook",
        alignment: "Lawful",
        background: "Scout",
        deity: "Gede",
        notes: "",
        gear: [],
        customGear: [],
        stats: {STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10, None: 0, LVL: 0},
        bonuses: [],
        customBonuses: [],
        customTalents: [],
        maxHitPoints: 1,
        armorClass: 10,
        gearSlotsTotal: 10,
        gold: 0,
        silver: 0,
        copper: 0,
        languages: ["Common"],
        customLanguages: [],
        xp: 0,
        spells: [],
        customSpells: [],
        hitPoints: 1,
        luckToken: true,
    }
}

export function calculateModifierForPlayerStat(pc: PlayerCharacter, stat: Stat): number {
    if (stat == "None") return 0
    let finalModifier = 0
    const baseModifier = clamp(
        Math.floor((calculateStatValueForPlayerStat(pc, stat) - 10) / 2),
        -4,
        4,
    )
    finalModifier += baseModifier
    return finalModifier
}

export function setClassForPlayer(pc: PlayerCharacter, c: Class) {
    pc.class = c
    ensureClassBonuses(pc)
    ensureClassSpells(pc)
    ensureClassGear(pc)
    ensureLanguages(pc)
    setMishapTable(pc)
}

export function setAncestryForPlayer(pc: PlayerCharacter, a: Ancestry | "") {
    pc.ancestry = a
    ensureAncestryBonuses(pc)
    ensureLanguages(pc)
}

export function setBackgroundForPlayer(pc: PlayerCharacter, b: Background | "") {
    pc.background = b
}

export function calculateStatValueForPlayerStat(pc: PlayerCharacter, stat: Stat): number {
    if (stat === "LVL") return pc.level + 10
    const baseStat = pc.stats[stat]
    return baseStat + calculateBonusForPlayerStat(pc, stat)
}

function doesBonusApplyToWeapon(b: Bonus, w: WeaponInfo): boolean {
    const appliesToAllWeapons = !b.metadata

    const appliesToWeaponType =
        b.metadata?.type === "weaponType" &&
        w.weaponType.includes(b.metadata.weaponType)

    const appliesToWeapon =
        b.metadata?.type === "weapon" && b.metadata.weapon === w.name

    return appliesToAllWeapons || appliesToWeaponType || appliesToWeapon
}

function doesBonusApplyToSpell(b: Bonus, s: SpellInfo): boolean {
    const appliesToAllSpells = !b.metadata

    const appliesToSpell =
        b.metadata?.type === "spell" && b.metadata.spell === s.name

    return appliesToAllSpells || appliesToSpell
}

export function calculateDamageDiceTypeForPlayerWeapon(pc: PlayerCharacter, w: WeaponInfo, handedness: "oneHanded" | "twoHanded"): DiceType {
    let result = w.damage[handedness].diceType

    const diceTypeBonuses = pc.bonuses
        .filter(
            (b) =>
                b.type === "diceType" &&
                b.bonusTo === "damageRoll" &&
                doesBonusApplyToWeapon(b, w),
        )
        .map((b: DiceTypeBonus) => b.diceType)
        .sort(compareDiceType)
        .reverse()

    if (diceTypeBonuses[0] && compareDiceType(diceTypeBonuses[0], result) > 0) {
        // this will be the greatest diceType among all bonuses.
        result = diceTypeBonuses[0]
    }

    return result
}

export function calculateBonusForPlayerStat(pc: PlayerCharacter, stat: Stat): number {
    const bonuses =  pc.bonuses
        .filter(
            (b) =>
                b.type === "modifyAmt" &&
                b.bonusTo === "stat" &&
                b.metadata?.type === "stat" &&
                b.metadata.stat === stat,
        )
        .reduce((acc, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) =>
            b.type === "modifyAmt" &&
            b.bonusTo === "stat" &&
            b.metadata?.type === "stat" &&
            b.metadata.stat === stat
        )
        .reduce((acc: number, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    return bonuses + gearBonuses
}

export function calculateArmorClassForPlayer(pc: PlayerCharacter) {
    let baseAC = pc.armorClass
    let modsFromStat = calculateModifierForPlayerStat(pc, "DEX") // default to DEX

    let modsFromUnrestrictedBonuses = 0
    for (const b of pc.bonuses) {
        if (b.type === "modifyAmt" && b.bonusTo === "armorClass" && !b.metadata) {
            modsFromUnrestrictedBonuses += calculateBonusAmount(pc, b)
        }
    }

    let modsFromGearBonuses = 0
    for (const b of getAllGearBonuses(pc)) {
        if (b.type === "modifyAmt" && b.bonusTo === "armorClass") {
            modsFromGearBonuses += calculateBonusAmount(pc, b)
        }
    }

    let modsFromShields = 0
    const shields = pc.gear
        .filter((g) => g.equipped)
        .map(toInfo<ArmorInfo>)
        .filter((g) => g.type === "Armor" && g.properties?.includes("OneHanded"))

    for (const s of shields) {
        modsFromShields += s.ac.modifier
    }

    const armor = pc.gear
        .filter((g) => g.equipped)
        .map(toInfo<ArmorInfo>)
        .filter((g) => g.type === "Armor" && !g.properties?.includes("OneHanded"))

    let modsFromArmor = 0
    let shouldAddStat = true
    for (const a of armor) {
        if (a.ac.stat && a.ac.stat !== "DEX") {
            modsFromStat = calculateModifierForPlayerStat(pc, a.ac.stat)
        }

        modsFromArmor += a.ac.modifier

        modsFromArmor += pc.bonuses
            .filter(
                (b) =>
                    b.type === "modifyAmt" &&
                    b.metadata?.type === "armor" &&
                    b.metadata.armor === a.name,
            )
            .reduce((acc, b: ModifyBonus) => acc + b.bonusAmount, 0)

        if (a.ac.base > 0) {
            shouldAddStat = Boolean(a.ac.stat)
            baseAC = Math.max(a.ac.base, baseAC)
        }
    }

    return (
        baseAC +
        modsFromUnrestrictedBonuses +
        modsFromGearBonuses +
        modsFromShields +
        modsFromArmor +
        (shouldAddStat ? modsFromStat : 0)
    )
}

export function calculateTitleForPlayer(pc: PlayerCharacter): Title | undefined {
    if (pc.level === 0) return undefined
    try {
        return TITLE_MAP[pc.class][pc.alignment][Math.max(0, Math.floor((pc.level - 1) / 2))]
    } catch {
        return undefined
    }
}

export function calculateSpellDiceAmount(pc: PlayerCharacter, spell: SpellInfo) {
    const bonuses: DiceAmountBonus[] = pc.bonuses.filter(
        (b) =>
            b.type === "diceAmount" &&
            b.metadata.type === "spell" &&
            b.metadata.spell === spell.name) as DiceAmountBonus[]

    let amount = spell.roll?.numDice ?? 1

    bonuses.forEach((bonus) => {
        amount += bonus.bonusAmount
    })
    return amount
}

export function calculateSpellCastingModifierForPlayer(pc: PlayerCharacter, spell: SpellInfo): number {
    let result = 0
    let stat = spell.stat
    if (!stat) {
        switch (pc.class) {
            case "Priest":
            case "Seer":
                stat = "WIS"
                break
            case "Wizard":
                stat = "INT"
                break
            case "Bard":
            case "Knight of St. Ydris":
            case "Witch":
                stat = "CHA"
                break
            default:
                return 0
        }
    }
    const baseModifier = calculateModifierForPlayerStat(pc, stat)
    result += baseModifier
    if (spell.tier === 0) return result

    const bonuses = pc.bonuses
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "spellcastRoll")
        .reduce((acc: number, b: ModifyBonus) => {
            if (doesBonusApplyToSpell(b, spell)) {
                acc += calculateBonusAmount(pc, b)
            }
            return acc
        }, 0)
    result += bonuses

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "spellcastRoll")
        .reduce((acc: number, b: ModifyBonus) => {
            if (doesBonusApplyToSpell(b, spell)) {
                acc += calculateBonusAmount(pc, b)
            }
            return acc
        }, 0)
    result += gearBonuses

    return result
}

export function calculateDamageBonusForPlayerWeapon(pc: PlayerCharacter, w: WeaponInfo): number {
    const bonuses = pc.bonuses
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "damageRoll")
        .reduce((acc: number, b: ModifyBonus) => {
            if (doesBonusApplyToWeapon(b, w)) {
                acc += calculateBonusAmount(pc, b)
            }
            return acc
        }, 0)

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "damageRoll")
        .reduce((acc: number, b: ModifyBonus) => {
            if (doesBonusApplyToWeapon(b, w)) {
                acc += calculateBonusAmount(pc, b)
            }
            return acc
        }, 0)

    return bonuses + gearBonuses
}

export function calculateAttackBonusForPlayerWeapon(pc: PlayerCharacter, w: WeaponInfo): number {
    let result = 0
    // melee vs ranged
    const strMod = calculateModifierForPlayerStat(pc, "STR")
    const dexMod = calculateModifierForPlayerStat(pc, "DEX")
    if (w.properties?.includes("Finesse") || w.weaponType === "MeleeRanged") {
        result += Math.max(strMod, dexMod)
    } else {
        result += w.weaponType === "Melee" ? strMod : dexMod
    }

    const bonuses = pc.bonuses
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "attackRoll")
        .reduce((acc: number, b: ModifyBonus) => {
            if (doesBonusApplyToWeapon(b, w)) {
                acc += calculateBonusAmount(pc, b)
            }
            return acc
        }, 0)
    result += bonuses

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "attackRoll")
        .reduce((acc: number, b: ModifyBonus) => {
            if (doesBonusApplyToWeapon(b, w)) {
                acc += calculateBonusAmount(pc, b)
            }
            return acc
        }, 0)
    result += gearBonuses

    return result
}

export function getAllGearBonuses(pc: PlayerCharacter): Bonus[] {
    return pc.gear
        // only want to apply equippable bonuses or bonuses that don't require equipping
        .map((g) => ({isEquipped: g.equipped, g: findAny(g.name)}))
        .filter(({isEquipped, g}) => g && (!g.canBeEquipped || isEquipped))
        .map(({g}) => g.playerBonuses)
        .filter(Boolean)
        .flat()
}

export function calculateGearSlotsForPlayer(pc: PlayerCharacter) {
    const base = Math.max(10, pc.stats.STR)

    const bonuses = pc.bonuses.reduce((acc: number, b: Bonus) => {
        if (b.type === "modifyAmt") {
            if (b.metadata?.type === "stat") {
                if (b.metadata.stat === "STR") acc += Math.max(b.bonusAmount, 0)
            } else if (b.bonusTo === "gearSlots") {
                acc += calculateBonusAmount(pc, b)
            }
        }
        return acc
    }, 0)

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "gearSlots")
        .reduce((acc: number, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    return base + bonuses + gearBonuses
}

export function calculateFreeSlotsForPlayer(pc: PlayerCharacter): number {
    const costlyGear = pc.gear
        .filter((g) => findAny(g.name)?.slots?.freeCarry === 0)
        .sort((a, b) => sortAlphabetically(a.name, b.name))

    const totalSlots = calculateGearSlotsForPlayer(pc)

    return totalSlots - costlyGear.reduce((acc, curr) => {
        return acc + slotsForGear(curr)
    }, 0)
}

export function levelUpPlayer(pc: PlayerCharacter) {
    const xpCap = pc.level === 0 ? 10 : pc.level * 10

    if (pc.xp < xpCap) return
    if (pc.level == 10) return

    pc.level += 1
    pc.xp -= xpCap
}

export function playerHasSpell(pc: PlayerCharacter, spell: SpellInfo) {
    return pc.spells.findIndex((s) => s.name === spell.name) > -1
}

export function playerCanLearnSpell(pc: PlayerCharacter, spell: SpellInfo) {
    let canAlsoLearn = "###"
    if (pc.class === "Knight of St. Ydris") canAlsoLearn = "Witch"
    return (
        pc.hasCustomClass ||
        ((spell.class.toLowerCase().includes(pc.class.toLowerCase()) ||
        spell.class.toLowerCase().includes(canAlsoLearn.toLowerCase())) &&
            (!spell.alignment || spell.alignment.includes(pc.alignment)))
    )
}

export function learnSpellForPlayer(pc: PlayerCharacter, spell: SpellInfo) {
    if (playerHasSpell(pc, spell)) return
    pc.spells.push(SPELL_COMPENDIUM[spell.name.toLowerCase()])
}

export function unlearnSpellForPlayer(pc: PlayerCharacter, spell: SpellInfo) {
    pc.spells = pc.spells.filter((s) => s.name !== spell.name)
}

export function addBonusToPlayer(pc: PlayerCharacter, b: Bonus, customAmount: number = null): PlayerCharacter {
    if (b.type === "spell") {
        const spell = findSpell(b.spell)
        if (playerHasSpell(pc, spell) && spell.uses) {
            pc.bonuses = addBonusToList(pc.bonuses, {
                name: b.name,
                desc: `additional use per ${spell.uses.type}`,
                type: "modifyAmt",
                bonusTo: "spellMax",
                bonusAmount: customAmount ?? 1,
                editable: true,
                metadata: {
                    type: "spell",
                    spell: spell.name
                }
            } as ModifyBonus)
        } else {
            learnSpellForPlayer(pc, spell)
        }
    } else {
        pc.bonuses = addBonusToList(pc.bonuses, b, customAmount)
    }
    return pc
}

export function addBonusToList(bonuses: Bonus[], b: Bonus, customAmount: number = null): Bonus[] {
    let bonus = bonuses.find((bonus) => bonus.name === b.name)
    if (!bonus) {
        bonuses.push(b)
        return bonuses
    }
    if (b.type === "modifyAmt") {
        (bonus as ModifyBonus).bonusAmount += customAmount ?? b.bonusAmount
    } else if (b.type === "diceAmount") {
        (bonus as DiceAmountBonus).bonusAmount += customAmount ?? b.bonusAmount
    } else if (b.type === "diceType" && b.bonusSteps) {
        bonus = bonus as DiceTypeBonus
        bonus.diceType = DICE_TYPES[clamp(DICE_TYPES.indexOf(bonus.diceType) + (customAmount ?? b.bonusSteps), 0, DICE_TYPES.length - 1)]
    }
    return bonuses
}

export function deleteBonusForPlayer(pc: PlayerCharacter, bonus: Bonus): PlayerCharacter {
    pc.bonuses = deleteBonusForList(pc.bonuses, bonus)
    return pc
}

export function deleteBonusForList(bonuses: Bonus[], bonus: Bonus): Bonus[] {
    return bonuses.filter((b) => b.name !== bonus.name)
}

export function hasAdvantageOn(pc: PlayerCharacter, s: string) {
    const bonuses = pc.bonuses.filter((b) => b.type === "advantage")
    if (bonuses.length === 0) return false
    return bonuses.filter((b: AdvantageBonus) => b.bonusTo === s).length >= 1
}

export function hasDisadvantageOn(pc: PlayerCharacter, s: string) {
    const bonuses = pc.bonuses.filter((b) => b.type === "disadvantage")
    if (bonuses.length === 0) return false
    return bonuses.filter((b: DisadvantageBonus) => b.bonusTo === s).length >= 1
}

export function calculateTotalHitPointsForPlayer(pc: PlayerCharacter): number {
    const baseMaxHP = pc.maxHitPoints
    const bonuses = pc.bonuses
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "hp")
        .reduce((acc, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "hp")
        .reduce((acc: number, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    return baseMaxHP + bonuses + gearBonuses
}

export function calculateModifierForHpRoll(pc: PlayerCharacter): number {
    const bonuses = pc.bonuses
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "hpRoll")
        .reduce((acc, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) => b.type === "modifyAmt" && b.bonusTo === "hpRoll")
        .reduce((acc: number, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)

    return bonuses + gearBonuses
}

export function calculateBonusAmount(pc: PlayerCharacter, b: ModifyBonus): number {
    let result = b.bonusAmount

    if (b.bonusTo !== "stat" && b.metadata?.type === "stat") {
        result = Math.max(result, calculateModifierForPlayerStat(pc, b.metadata.stat))
    }
    const levelRateBonus = Math.floor(pc.level * (b.bonusIncreaseRatePerLevel ?? 0))
    return result + levelRateBonus
}

export function calculateSpellMax(pc: PlayerCharacter, spell: SpellInfo) {
    if (!spell.uses) return
    let base = spell.uses.max
    if (spell.uses.metadata && spell.uses.metadata.type === "max") {
        base = Math.max(base, calculateModifierForPlayerStat(pc, spell.uses.metadata.stat))
    }
    const bonuses = pc.bonuses
        .filter((b) =>
            b.type === "modifyAmt" &&
            b.bonusTo === "spellMax" &&
            doesBonusApplyToSpell(b, spell)
        )
        .reduce((acc, b: ModifyBonus) => acc + b.bonusAmount, 0)

    const gearBonuses = getAllGearBonuses(pc)
        .filter((b) =>
            b.type === "modifyAmt" &&
            b.bonusTo === "hp" &&
            doesBonusApplyToSpell(b, spell)
        )
        .reduce((acc: number, b: ModifyBonus) => acc + calculateBonusAmount(pc, b), 0)
    return base + bonuses + gearBonuses
}

export function deleteCustomPlayerSpell(pc: PlayerCharacter, spell: SpellInfo) {
    pc.spells = pc.spells.filter((s) => s.name !== spell.name)
    pc.bonuses = pc.bonuses.filter((b) =>
        !(b.metadata?.type === "spell" && b.metadata.spell === spell.name)
    )
    pc.customSpells = pc.customSpells.filter((s) => s.name !== spell.name)
}

function isArmorShield(g: GearInfo): boolean {
    return g.type === "Armor" && g.properties?.includes("OneHanded")
}

function isWearableArmor(g: GearInfo): boolean {
    return g.type === "Armor" && !g.properties?.includes("OneHanded")
}

export function canPlayerAffordGear(pc: PlayerCharacter, g: GearInfo, quantity = 1) {
    const convertedCost = gearCostToTotal(g, quantity)
    const pcConverted = playerMoneyToTotal(pc)
    return pcConverted >= convertedCost
}

export function canPlayerEquipGear(pc: PlayerCharacter, gear: Gear) {
    if (gear.equipped) return false
    const g = findAny(gear.name)
    if (!g || !g.canBeEquipped) return false

    if (isWearableArmor(g)) {
        const equippedArmor = pc.gear
            .filter((a) => a.equipped)
            .map((a) => findAny(a.name))
            .filter(isWearableArmor)
        return equippedArmor.length === 0 // must not be wearing armor
    }

    const freeHands = calculateFreeHands(pc)

    if (freeHands <= 0) return false
    if (freeHands == 2) return true

    // we know the pc has only 1 free hand here
    if (g.type === "Weapon") {
        const w = g as WeaponInfo
        return Boolean(w.damage.oneHanded)
    } else if (isArmorShield(g)) {
        return freeHands >= 1
    }

    // custom equippable gear can always be equipped
    return true
}

export function calculateFreeHands(pc: PlayerCharacter): number {
    let freeHands = 2

    const equippedWeapons = pc.gear
        .filter((w) => w.equipped)
        .map((w) => findAny(w.name))
        .filter((w) => w.type === "Weapon")
        .map((w) => w as WeaponInfo)

    const equippedArmor = pc.gear
        .filter((a) => a.equipped)
        .map((a) => findAny(a.name))
        .filter((a) => a.type === "Armor")

    // shields and weapons take up hands
    freeHands -= equippedWeapons.reduce((acc, w) => {
        const isWeaponOneHandable = Boolean(w.damage.oneHanded)
        return acc + (isWeaponOneHandable ? 1 : 2)
    }, 0)

    freeHands -= equippedArmor.filter(
        (a) => a.properties?.includes("OneHanded"),
    ).length

    return freeHands
}
