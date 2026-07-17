import type {Talent, Patron, ModifyBonus, SpellBonus, Bonus, DiceTypeBonus} from "../types";
import {STATS} from "../constants";
import {WEAPONS} from "./weaponCompendium";

const stats = STATS.filter((s) => !(s === "LVL" || s === "None"))

export const BOONS: { [key in Patron]: Talent[] } = {
    Almazzat: [
        {
            name: "1/day, gain advantage on melee attacks for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Rage",
                    desc: "1/day, gain advantage on melee attacks for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Rage",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "1/day, You can transform into a dire wolf for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Transform: Dire Wolf",
                    desc: "1/day, You can transform into a dire wolf for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Transform: Dire Wolf",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "+2 to Strength or Constitution stat or +1 to melee damage",
            type: "chooseBonus",
            choices: [
                ...(["STR", "CON"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ],
                ),
                {
                    name: "+1 to melee damage",
                    desc: "+1 to melee damage",
                    type: "modifyAmt",
                    bonusTo: "damageRoll",
                    bonusAmount: 1,
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "Gain advantage on initiative rolls (reroll if duplicate)",
            type: "generic",
        },
    ],
    Freya: [
        {
            name: "When you use a luck token, add +1d4 to the roll",
            type: "generic",
        },
        {
            name: "+1 to melee or ranged attacks and damage",
            type: "chooseBonus",
            choices: (["Melee", "Ranged"] as const).map((w) => [
                {
                    name: `+1 to attack for ${w} weapons`,
                    desc: `+1 to attack for ${w} weapons`,
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
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
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: w,
                    },
                },
            ]) as ModifyBonus[][],
        },
        {
            name: "+2 to Charisma or Wisdom stat or +1 to spellcasting checks",
            type: "chooseBonus",
            choices: [
                ...(["CHA", "WIS"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ],
                ),
                {
                    name: "+1 to spellcasting checks",
                    desc: "+1 to spellcasting checks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "spellcastRoll",
                    bonusSource: "Boon",
                    editable: true,
                },
            ] as ModifyBonus[],
        },
        {
            name: "Learn a seer spell, tier = half your level. Cast it with WIS", // TODO
            type: "generic",
        },
    ],
    Krraktanamak: [
        {
            name: "You grow functional gills and can swim effortlessly",
            type: "generic",
        },
        {
            name: "Your skin hardens; gain +1 AC (reroll if at +3)",
            type: "bonus",
            bonuses: [
                {
                    name: "Your skin hardens; gain +1 AC (reroll if at +3)",
                    desc: "Your skin hardens; gain +1 AC (reroll if at +3)",
                    bonusSource: "Boon",
                    type: "modifyAmt",
                    bonusTo: "armorClass",
                    bonusAmount: 1,
                    editable: true,
                },
            ],
        },
        {
            name: "+2 to Strength or Constitution stat or +1 to melee attacks",
            type: "chooseBonus",
            choices: [
                ...(["STR", "CON"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ],
                ),
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    }
                },
            ] as ModifyBonus[],
        },
        {
            name: "Your arm turns into a crab claw you can wield (melee, d8)",
            type: "generic",
        },
    ],
    Kytheros: [
        {
            name: "1/day, force the GM to reroll a single roll",
            type: "bonus",
            bonuses: [
                {
                    name: "Rewind",
                    desc: "1/day, force the GM to reroll a single roll",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Rewind",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "Your skin hardens; gain +1 AC (reroll if at +3)",
            type: "bonus",
            bonuses: [
                {
                    name: "Your skin hardens; gain +1 AC (reroll if at +3)",
                    desc: "Your skin hardens; gain +1 AC (reroll if at +3)",
                    type: "modifyAmt",
                    bonusSource: "Boon",
                    bonusTo: "armorClass",
                    bonusAmount: 1,
                    editable: true,
                },
            ],
        },
        {
            name: "+2 to Strength, Dexterity, or Wisdom stat",
            type: "chooseBonus",
            choices:
                (["CHA", "WIS"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ]
            ) as ModifyBonus[][],
        },
        {
            name: "3/day, add your WIS bonus to any roll (reroll if duplicate)",
            type: "bonus",
            bonuses: [
                {
                    name: "Outwit",
                    desc: "3/day, add your WIS bonus to any roll (reroll if duplicate)",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Outwit",
                    editable: true,
                }
            ] as SpellBonus[]
        },
    ],
    Loki: [
        {
            name: "1/day, turn invisible for 3 rounds (reroll if duplicate)",
            type: "bonus",
            bonuses: [
                {
                    name: "Stealthy",
                    desc: "1/day, turn invisible for 3 rounds (reroll if duplicate)",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Stealthy",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "Create an illusory duplicate of yourself for up to 5 rounds/day",
            type: "bonus",
            bonuses: [
                {
                    name: "Double team",
                    desc: "Create an illusory duplicate of yourself for up to 5 rounds/day",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Double team",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "+2 to Dexterity or Charisma stat or +1 to weapon damage",
            type: "chooseBonus",
            choices: [
                ...(["DEX", "CHA"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ]
                ),
                {
                    name: "+1 to melee damage",
                    desc: "+1 to melee damage",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    }
                },
            ] as ModifyBonus[],
        },
        {
            name: "If you use a luck token on a DEX/CHA check, regain it",
            type: "generic",
        },
    ],
    Molek: [
        {
            name: "Choose one stat to increase to 18 or gain 2d4 HP",
            type: "chooseBonus",
            choices: [
                ...stats.map((s) => [
                        {
                            name: `set ${s} to 18`,
                            desc: `set ${s} to 18`,
                            type: "generic",
                            bonusSource: "Boon",
                            editable: true,
                        },
                    ],
                ),
                [
                    {
                        name: "gain 2d4 HP", // TODO
                        desc: "gain 2d4 HP",
                        type: "generic",
                        bonusSource: "Boon",
                        editable: true,
                    }
                ]
            ] as Bonus[][],
        },
        {
            name: "+2 to Strength or Intelligence stat or +1 to melee attacks",
            type: "chooseBonus",
            choices: [
                ...(["STR", "INT"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    }
                },
            ] as ModifyBonus[],
        },
        {
            name: "Learn a sorcerer spell, tier = half your level. Cast it with INT", // TODO
            type: "generic",
        },
        {
            name: "You become immune to: fire, drowning, or poison",
            type: "chooseBonus",
            choices: (["fire", "drowning", "poison"] as const).map((x) => [
                {
                    name: `${x} immunity`,
                    desc: `You become immune to ${x}`,
                    bonusSource: "Boon",
                    type: "generic",
                    editable: true,
                },
            ]),
        },
    ],
    Mugdulblub: [
        {
            name: "1/day, turn into a crawling puddle of slime for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Transform: Slime",
                    desc: "1/day, turn into a crawling puddle of slime for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Transform: Slime",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "Choose one stat to increase to 18 or gain 2d4 HP",
            type: "chooseBonus",
            choices: [
                [
                    {
                        name: "gain +3 HP",
                        desc: "gain +3 HP",
                        type: "modifyAmt",
                        bonusAmount: 3,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat: "HP",
                        },
                    }
                ],
                ...stats.map((s) => [
                        {
                            name: `+1 to ${s}`,
                            desc: `+1 to ${s}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat: s,
                            },
                        }
                    ],
                ),
            ] as ModifyBonus[][],
        },
        {
            name: "+2 to Dexterity or Constitution stat",
            type: "chooseBonus",
            choices: (["DEX", "CON"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ],
                ) as ModifyBonus[][],
        },
        {
            name: "Become immune to: acid, cold or poison",
            type: "chooseBonus",
            choices: (["acid", "cold", "poison"] as const).map((x) => [
                {
                    name: `${x} immunity`,
                    desc: `You become immune to ${x}`,
                    bonusSource: "Boon",
                    type: "generic",
                    editable: true,
                },
            ]),
        },
    ],
    Oatali: [
        {
            name: "1/day, turn into a crawling puddle of slime for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Transform: Cuoatl",
                    desc: "1/day, turn into a crawling puddle of slime for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Transform: Cuoatl",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "Gain +2 to one stat or the ability to walk on water",
            type: "chooseBonus",
            choices: [
                ...stats.map((s) => [
                        {
                            name: `+1 to ${s}`,
                            desc: `+1 to ${s}`,
                            type: "modifyAmt",
                            bonusAmount: 2,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat: s,
                            },
                        }
                    ],
                ),
                [
                    {
                        name: "Water walking",
                        desc: "ability to walk on water",
                        type: "generic",
                        bonusSource: "Boon",
                        editable: true,
                    }
                ],
            ] as ModifyBonus[][],
        },
        {
            name: "Become immune to: fire, poison or electricity",
            type: "chooseBonus",
            choices: (["fire", "poison", "electricity"] as const).map((x) => [
                {
                    name: `${x} immunity`,
                    desc: `You become immune to ${x}`,
                    bonusSource: "Boon",
                    type: "generic",
                    editable: true,
                },
            ]),
        },
        {
            name: "You sprout multi-hued, iridescent scales and gain +1 AC",
            type: "bonus",
            bonuses: [
                {
                    name: "You sprout multi-hued, iridescent scales and gain +1 AC",
                    desc: "You sprout multi-hued, iridescent scales and gain +1 AC",
                    bonusSource: "Boon",
                    type: "modifyAmt",
                    bonusTo: "armorClass",
                    bonusAmount: 1,
                    editable: true,
                },
            ],
        },
    ],
    "Obe-Ixx of Azarumme": [
        {
            name: "You gain +2 upgrades for your warbands (see pg. 250)",
            type: "generic",
        },
        {
            name: "Gain an additional warband of skeletons (free to maintain)",
            type: "generic",
        },
        {
            name: "Your warbands each gain a LV (+8 HP, +1 attack bonus)",
            type: "generic",
        },
        {
            name: "You can command 1 additional warband (see pg. 248)",
            type: "generic",
        },
    ],
    Odin: [
        {
            name: "1/day, use your action to pray and be restored to full HP",
            type: "bonus",
            bonuses: [
                {
                    name: "Prayer",
                    desc: "1/day, use your action to pray and be restored to full HP",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Prayer",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "+1 to melee attacks and damage",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+1 to melee damage",
                    desc: "+1 to melee damage",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Strength or Intelligence stat or +1 to melee attacks",
            type: "chooseBonus",
            choices: [
                ...(["STR", "INT"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ],
                ),
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    }
                },
            ] as ModifyBonus[],
        },
        {
            name: "Increase the damage die of a weapon you wield to a d12",
            type: "chooseBonus",
            choices: WEAPONS.map((w) => (
                    {
                        name: `d12 damage for ${w.name}`,
                        desc: `d12 damage for ${w.name}`,
                        type: "diceType",
                        bonusTo: "damageRoll",
                        bonusSource: "Boon",
                        diceType: "d12",
                        editable: true,
                        metadata: {
                            type: "weapon",
                            weapon: w.name,
                        },
                    }
                )
            ) as DiceTypeBonus[],
        },
    ],
    Oros: [
        {
            name: "1/day, double all damage you deal for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Brutality",
                    desc: "1/day, double all damage you deal for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Brutality",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "+1 to melee attacks and +2 to melee damage",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to melee attacks",
                    desc: "+1 to melee attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
                {
                    name: "+2 to melee damage",
                    desc: "+2 to melee damage",
                    type: "modifyAmt",
                    bonusAmount: 2,
                    bonusTo: "damageRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Melee",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "Gain +2 to Strength or Constitution stat or +1d6 HP",
            type: "chooseBonus",
            choices: [
                ...(["STR", "CON"] as const).map((stat) => [
                        {
                            name: `+1 to ${stat}`,
                            desc: `+1 to ${stat}`,
                            type: "modifyAmt",
                            bonusAmount: 1,
                            bonusSource: "Boon",
                            editable: true,
                            metadata: {
                                type: "stat",
                                stat,
                            },
                        }
                    ],
                ),
                [
                    {
                        name: "gain 1d6 HP", // TODO
                        desc: "gain 1d6 HP",
                        type: "generic",
                        bonusSource: "Boon",
                        editable: true,
                    }
                ]
            ] as Bonus[][],
        },
        {
            name: "When you kill a foe, your next hit becomes a critical hit",
            type: "generic",
        },
    ],
    Rathgamnon: [
        {
            name: "Hostile magical effects that target you are DC 18 to cast",
            type: "generic",
        },
        {
            name: "Gain +2 to Intelligence, Wisdom, or Charisma",
            type: "chooseBonus",
            choices: (["INT", "WIS", "CHA"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
        },
        {
            name: "Learn a lawful priest spell, tier = half your LV. Cast it with WIS", // TODO
            type: "generic",
        },
        {
            name: "Move as many points as you wish from one stat to another",
            type: "generic",
        },
    ],
    "Saint Ydris": [
        {
            name: "Learn two witch spells of different tiers up to tier 3", // TODO
            type: "generic",
        },
        {
            name: "Learn one witch spell of a tier you can cast (tier 1 if none)", // TODO
            type: "generic",
        },
        {
            name: "+2 to Strength, Constitution, or Charisma stat",
            type: "chooseBonus",
            choices: (["STR", "CON", "CHA"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
        },
        {
            name: "Gain an additional hit points die or +1 to spellcasting checks",
            type: "chooseBonus",
            choices: [
                {
                    name: "gain 1d6 HP", // TODO
                    desc: "gain 1d6 HP",
                    type: "generic",
                    bonusSource: "Boon",
                    editable: true,
                },
                {
                    name: "+1 to spellcasting checks",
                    desc: "+1 to spellcasting checks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "spellcastRoll",
                    bonusSource: "Boon",
                    editable: true,
                },
            ] as Bonus[],
        },
    ],
    "Shune the Vile": [
        {
            name: "1/day, hypnotize a LV 5 or less creature for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Mind read",
                    desc: "1/day, hypnotize a LV 5 or less creature for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Mind read",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "Learn a witch spell, tier = half your level. Cast it with CHA", // TODO
            type: "generic",
        },
        {
            name: "+2 to Dexterity, Intelligence, or Charisma stat",
            type: "chooseBonus",
            choices: (["DEX", "INT", "CHA"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
        },
        {
            name: "+1 XP whenever you learn a valuable or significant secret",
            type: "generic",
        },
    ],
    Titania: [
        {
            name: "1/day, hypnotize a LV 5 or less creature for 3 rounds",
            type: "bonus",
            bonuses: [
                {
                    name: "Hypnotize",
                    desc: "1/day, hypnotize a LV 5 or less creature for 3 rounds",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Hypnotize",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "You can wield a longbow; +1 to ranged attacks and damage",
            type: "bonus",
            bonuses: [
                {
                    name: "You can wield Longbows",
                    bonusSource: "Boon",
                    type: "generic",
                },
                {
                    name: "+1 to ranged attacks",
                    desc: "+1 to ranged attacks",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "attackRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
                {
                    name: "+1 to ranged damage",
                    desc: "+1 to ranged damage",
                    type: "modifyAmt",
                    bonusAmount: 1,
                    bonusTo: "damageRoll",
                    bonusSource: "Boon",
                    editable: true,
                    metadata: {
                        type: "weaponType",
                        weaponType: "Ranged",
                    },
                },
            ] as ModifyBonus[],
        },
        {
            name: "+2 to Dexterity or Charisma stat",
            type: "chooseBonus",
            choices: (["DEX", "CHA"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
        },
        {
            name: "Hostile spells that target you are always hard to cast (DC 15)",
            type: "generic",
        },
    ],
    "The Willowman": [
        {
            name: "1/day, teleport to a far location you see as your move",
            type: "bonus",
            bonuses: [
                {
                    name: "Teleportation",
                    desc: "1/day, teleport to a far location you see as your move",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Teleportation",
                    editable: true,
                }
            ] as SpellBonus[]
        },
        {
            name: "+1 to melee or ranged attacks and damage",
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
            name: "+2 to Strength or Dexterity stat",
            type: "chooseBonus",
            choices: (["STR", "DEX"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
        },
        {
            name: "1/day, force a close being to check morale, even if immune",
            type: "bonus",
            bonuses: [
                {
                    name: "Terrify",
                    desc: "1/day, force a close being to check morale, even if immune",
                    type: "spell",
                    bonusSource: "Boon",
                    spell: "Terrify",
                    editable: true,
                }
            ] as SpellBonus[]
        },
    ],
    "Yag-Kesh": [
        {
            name: "Your Wisdom stat becomes 20 (+5)",
            type: "generic",
        },
        {
            name: "Gain +2 to Strength, Dexterity, or Wisdom stat",
            type: "chooseBonus",
            choices: (["STR", "DEX", "WIS"] as const).map((stat) => [
                    {
                        name: `+1 to ${stat}`,
                        desc: `+1 to ${stat}`,
                        type: "modifyAmt",
                        bonusAmount: 1,
                        bonusSource: "Boon",
                        editable: true,
                        metadata: {
                            type: "stat",
                            stat,
                        },
                    }
                ],
            ) as ModifyBonus[][],
        },
        {
            name: "Increase the damage die of your Fist of the Moon God 1 step (reroll if d12)",
            type: "bonus",
            bonuses: [
                {
                    name: "+1 to dice category Fist of the Moon God",
                    desc: "+1 to dice category Fist of the Moon God",
                    type: "diceType",
                    bonusTo: "damageRoll",
                    diceType: "d10",
                    bonusSteps: 1,
                    bonusSource: "Talent",
                    editable: true,
                    metadata: {
                        type: "weapon",
                        weapon: "Fist of the Moon God",
                    },
                },
            ] as DiceTypeBonus[],
        },
        {
            name: "All weapons you wield gain an additional +1 magical bonus",
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
    ]
}

for (const key in BOONS) {
    if (BOONS[key].length === 4) {
        BOONS[key].push({
            name: "Choose a talent or +2 points to distribute to stats",
            type: "chooseBonus",
            choices: [
                {
                    name: "Choose a talent",
                    desc: "Choose a talent",
                    bonusSource: "Boon",
                    type: "generic",
                },
                {
                    name: "+2 points to distribute to stats",
                    desc: "+2 points to distribute to stats",
                    bonusSource: "Boon",
                    type: "generic",
                },
            ]
        })
    }
}
