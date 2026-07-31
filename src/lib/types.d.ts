import {
    WEAPON_TYPES,
    DICE_TYPES,
    RANGE_TYPES,
    WEAPON_PROPERTIES,
    ALIGNMENTS,
    DEITIES,
    BACKGROUNDS,
    TIME_UNITS,
    TITLE_MAP,
    CLASSES,
    ANCESTRIES,
    LANGUAGES,
    STATS,
    BONUS_TOS,
    ROLL_BONUS_TOS,
    ARMOR_PROPERTIES,
    GEAR_TYPES,
    NUMERICAL_BONUS_TOS,
    TREASURE_PROPERTIES, PATRONS,
} from "./constants"

export type Merge<T, R> = Omit<T, keyof R> & R

export type DiceType = (typeof DICE_TYPES)[number]
export type RangeType = (typeof RANGE_TYPES)[number]
export type TimeUnit = (typeof TIME_UNITS)[number]
export type DurationSubType = "InGame" | "RealTime"
export type DurationType = "Focus" | "Instant" | "Permanent" | TimeUnit
export type Roll = {
    diceType: DiceType
    numDice: number
}
export type EffectRoll = Merge<Roll, {
    type: "Damage" | "Heal" | "Amount" | "Round" | TimeUnit
}>

///// Talent
export type GenericTalent = {
    name: string
    type: "generic"
}
export type BonusTalent = Merge<
    GenericTalent,
    {
        type: "bonus"
        bonuses: Bonus[]
    }
>
export type ChooseBonusTalent = Merge<
    GenericTalent,
    {
        type: "chooseBonus"
        choices: (Bonus | Bonus[])[]
    }
>
export type Talent = GenericTalent | BonusTalent | ChooseBonusTalent

///// Spell
export type SpellTier = 0 | 1 | 2 | 3 | 4 | 5
export type SpellClass =
    Extract<
        Class, "Bard" | "Basilisk Warrior" | "Desert Rider" | "Delver" | "Duelist" | "Green Knight"
        | "Knight of St. Ydris" | "Kyzian Archer" | "Monk of Yag-Kesh" | "Necromancer" | "Pit Fighter" | "Priest"
        | "Ranger" | "Ras-Godai" | "Sea Wolf" | "Seer" | "Wizard" | "Witch"
    >
    | "Priest, Wizard" | "Wizard, Witch" | "Priest, Witch" | "Wizard, Necromancer" | "Priest, Necromancer"
    | "Priest, Wizard, Necromancer" | "Wizard, Witch, Necromancer" | "Wizard, Green Knight" | "Halfling, Warlock"
    | "Other" | "Boon"
export type SpellInfo = {
    name: string
    class: SpellClass
    alignment?: Alignment
    stat?: Stat
    tier: SpellTier
    range: RangeType
    roll?: Roll
    effect?: EffectRoll
    uses?: {
        type: DurationType
        max: number
        used?: number
        metadata?: MaxUsesMetaData
    }
    duration: {
        type: DurationType
        subType?: DurationSubType // default to InGame time
        roll?: Roll
        amt?: number
    }
    editable?: boolean
    desc: string
    disabled?: boolean //  spellcasting check failed or daily uses reached
}

export type MishapClass = Extract<Class, "Wizard", "Necromancer"> | "Diabolical"
export type Mishap = {
    name: string
    tiers: SpellTier[]
    roll?: EffectRoll
    target?: {
        category: "Gear" | "Spell" | "Ally" | "Area" | "Self",
        type: "disable" | "delete" | "damage",
        amount?: number | "tier" | "randomTier"
    }
    desc: string
}

///// PlayerCharacter
export type Alignment = (typeof ALIGNMENTS)[number]
export type Patron = (typeof PATRONS)[string]
export type Deity = (typeof DEITIES)[number]
export type Background = (typeof BACKGROUNDS)[string]
export type Class = (typeof CLASSES)[number]
export type Title = (typeof TITLE_MAP)[number]
export type Ancestry = (typeof ANCESTRIES)[number]
export type Language = (typeof LANGUAGES)[number]
export type Stat = (typeof STATS)[number]
export type StatBlock = {
    [key in Stat]: number
}
export type PlayerCharacter = {
    name: string
    ancestry: Ancestry | ""
    hasCustomAncestry?: boolean
    class?: Class
    hasCustomClass?: boolean
    level: number
    title: Title
    alignment: Alignment
    background: Background | ""
    hasCustomBackground?: boolean
    deity: Deity
    hasCustomDeity?: boolean
    gear: Gear[]
    customGear: GearInfo[]
    notes: string
    stats: StatBlock
    bonuses: Bonus[]
    customBonuses: Bonus[]
    customTalents: Talent[]
    maxHitPoints: number
    armorClass: number
    gearSlotsTotal: number
    gold: number
    silver: number
    copper: number
    languages: Language[]
    customLanguages: string[]
    xp: number
    spells: SpellInfo[]
    customSpells: SpellInfo[]
    mishapTable?: MishapClass
    hitPoints: number
    luckToken?: number
    multipleLuckTokens?: boolean
}

/////// Bonus
export type NumericalBonusTo = (typeof NUMERICAL_BONUS_TOS)[number]
export type RollBonusTo = (typeof ROLL_BONUS_TOS)[number]
export type BonusTo = (typeof BONUS_TOS)[number]
export type BonusSourceCategory = "Ability" | "Talent"
export type BonusSourceType = "Ancestry" | "Class" | "Gear" | "Talent" | "Boon" | "Black Lotus" | "Custom"
export type WeaponBonusMetaData = {
    type: "weapon"
    weapon: string
}
export type ArmorBonusMetaData = {
    type: "armor"
    armor: string
}
export type WeaponTypeBonusMetaData = {
    type: "weaponType"
    weaponType: WeaponType
}
export type StatBonusMetaData = {
    type: "stat"
    stat: Stat
}
export type StatModBonusMetaData = {
    type: "statMod"
    statMod: Stat
}
export type SpellBonusMetaData = {
    type: "spell"
    spell: string
}
export type MaxUsesMetaData = {
    type: "max"
    stat: Stat
}
export type BonusMetaData =
    | WeaponBonusMetaData
    | WeaponTypeBonusMetaData
    | ArmorBonusMetaData
    | StatBonusMetaData
    | StatModBonusMetaData
    | SpellBonusMetaData
    | MaxUsesMetaData
export type GenericBonus = {
    name: string
    desc: string
    bonusSource: BonusSourceType
    type: "generic"
    metadata?: BonusMetaData
    inactive?: boolean
    editable?: boolean
}
export type SelectBonus = Merge<
    GenericBonus,
    {
        type: "select"
        bonuses: Bonus[]
    }
>
export type ModifyBonus = Merge<
    GenericBonus,
    {
        type: "modifyAmt"
        bonusTo: BonusTo
        bonusAmount: number
        bonusIncreaseRatePerLevel?: number // bonus amount increases at this rate per level (rounded down)
    }
>
export type SetToBonus = Merge<
    GenericBonus,
    {
        type: "setToAmt"
        bonusTo: BonusTo
        setTo: number
    }
>
export type DiceTypeBonus = Merge<
    GenericBonus,
    {
        type: "diceType"
        bonusTo: RollBonusTo
        diceType: DiceType
        bonusSteps?: number
    }
>
export type SpellBonus = Merge<
    GenericBonus,
    {
        type: "spell"
        spell?: string
        tier?: SpellTier | boolean
    }
>
export type DiceAmountBonus = Merge<
    GenericBonus,
    {
        type: "diceAmount"
        diceType: DiceType
        bonusAmount: number
    }
>
export type AdvantageBonus = Merge<
    GenericBonus,
    {
        type: "advantage"
        bonusTo: RollBonusTo
    }
>
export type DisadvantageBonus = Merge<
    GenericBonus,
    {
        type: "disadvantage"
        bonusTo: RollBonusTo
    }
>
export type ModifierCapBonus = Merge<
    GenericBonus,
    {
        type: "min" | "max"
        amount: number
    }
>
export type Bonus =
    | SelectBonus
    | GenericBonus
    | ModifyBonus
    | SetToBonus
    | DiceTypeBonus
    | SpellBonus
    | DiceAmountBonus
    | AdvantageBonus
    | DisadvantageBonus
    | ModifierCapBonus

///// ShadowDarklings
export type SDBonus = {
    sourceType: BonusSourceType
    sourceName: string
    sourceCategory: BonusSourceCategory
    gainedAtLevel: number
    name: string
    bonusName: string
    bonusTo: string
    bonusAmount: number
}

///// Gear
export type Cost = {
    gp: number
    sp: number
    cp: number
}
export type Slots = {
    perSlot: number
    slotsUsed: number
    freeCarry: number
}
export type Currency = keyof Cost
export type GearProperty =
    | ShieldProperty
    | WeaponProperty
    | TreasureProperty
    | "Magic"
    | "Attackable" // attackable means it can show up in the attacks view
export type GearType = (typeof GEAR_TYPES)[number]
export type GearInfo = {
    name: string
    properties?: GearProperty[]
    type: GearType
    canBeEquipped: boolean
    slots: Slots
    cost: Cost
    desc?: string
    playerBonuses?: Bonus[]
    editable?: boolean
}
export type Gear = {
    name: string
    quantity: number
    equipped?: boolean
    broken?: boolean
}
export type TreasureProperty = keyof typeof TREASURE_PROPERTIES
export type TreasureInfo = Merge<
    GearInfo,
    {
        type: "Treasure"
        properties: TreasureProperty[]
        modCosts?: boolean
    }
>

///// Weapon
export type WeaponType = (typeof WEAPON_TYPES)[number]
export type WeaponProperty = (typeof WEAPON_PROPERTIES)[number]
export type WeaponInfo = Merge<
    GearInfo,
    {
        type: "Weapon"
        properties?: WeaponProperty[]
        damage: {
            oneHanded?: Roll
            twoHanded?: Roll
        }
        range: RangeType | RangeType[]
        weaponType: WeaponType
    }
>

////// Armor
export type ShieldProperty = (typeof ARMOR_PROPERTIES)[number]
export type ArmorAC = {
    base: number
    modifier: number
    stat?: Stat
    posStat?: Stat
}
export type ArmorInfo = Merge<
    GearInfo,
    {
        type: "Armor"
        properties?: ShieldProperty[]
        ac: ArmorAC
    }
>

type LocalSettings = {
    popoverDuration?: number
}
