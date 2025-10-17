import type {MishapClass, Mishap} from "../types";

export const MISHAPS: { [key in MishapClass]: Mishap[] } = {
    "Wizard": [
// #####################################################################################################################
// ------------------------------------------------------ Tier 1-2 -----------------------------------------------------
// #####################################################################################################################
        {
            name: "Devastation",
            tiers: [1, 2],
            desc: "Roll twice and combine both effects (reroll any further 1s)"
        },
        {
            name: "Explosion",
            tiers: [1, 2],
            roll: {type: "Damage", diceType: "d8", numDice: 1},
            desc: "You take 1d8 damage"
        },
        {
            name: "Refraction",
            tiers: [1, 2],
            desc: "You target yourself with the spell"
        },
        {
            name: "Your hand slipped",
            tiers: [1, 2],
            desc: "You target a random ally with the spell"
        },
        {
            name: "Mind wound",
            tiers: [1, 2],
            desc: "You can't cast this spell again for a week"
        },
        {
            name: "Discorporation",
            tiers: [1, 2],
            target: {category: "Gear", type: "delete", amount: 1},
            desc: "One random piece of your gear disappears forever"
        },
        {
            name: "Spell worm",
            tiers: [1, 2],
            desc: "You lose the ability to cast a random spell on each of your turns until you pass a DC 12 CON check. You regain the ability to cast those spells after completing a rest"
        },
        {
            name: "Harmonic failure",
            tiers: [1, 2],
            target: {category: "Spell", type: "disable", amount: 1},
            desc: "You lose the ability to cast a random spell until you complete a rest"
        },
        {
            name: "Poof",
            tiers: [1, 2],
            desc: "You suppress all light within a near distance from you, including sunlight and magical light, for 10 rounds"
        },
        {
            name: "The horror",
            tiers: [1, 2],
            desc: "You scream uncontrollably for 3 rounds in Primordial, drawing lots of attention"
        },
        {
            name: "Energy surge",
            tiers: [1, 2],
            desc: "You glow bright purple for 10 rounds, granting enemies advantage on attacks against you"
        },
        {
            name: "Unstable conduit",
            tiers: [1, 2],
            desc: "You have disadvantage on casting spells of the same tier for 10 rounds"
        },
// #####################################################################################################################
// ----------------------------------------------------- Tier 3-4 ------------------------------------------------------
// #####################################################################################################################
        {
            name: "Devastation",
            tiers: [3, 4],
            desc: "Roll twice and combine both effects (reroll any further 1s)"
        },
        {
            name: "Blast radius",
            tiers: [3, 4],
            roll: {type: "Damage", diceType: "d6", numDice: 2},
            desc: "You and all near creatures take 2d6 damage"
        },
        {
            name: "Duplicate refraction",
            tiers: [3, 4],
            desc: "You target yourself and the nearest ally with two identical copies of the spell"
        },
        {
            name: "You flubbed the incantation",
            tiers: [3, 4],
            desc: "You cast a random spell from your known spells at the same targets, even if it would not normally be possible"
        },
        {
            name: "Ethereal bandersnatch",
            tiers: [3, 4],
            target: {category: "Gear", type: "delete", amount: 2},
            desc: "Two random pieces of your gear disappear forever"
        },
        {
            name: "Arcano-mutagenesis",
            tiers: [3, 4],
            desc: "You must pass a DC 12 CON check or a random stat drops to 3 (-4) until you successfully complete a rest" // TODO
        },
        {
            name: "Boom",
            tiers: [3, 4],
            desc: "You open a 30-foot deep sinkhole in the ground with you at the center. You and all near creatures must pass a DC 15 Dexterity check or fall in" // TODO
        },
        {
            name: "Petrification",
            tiers: [3, 4],
            roll: {type: "Amount", diceType: "d4", numDice: 1},
            desc: "1d4 of your limbs petrify for the next 24 hours"
        },
        {
            name: "Stupefaction",
            tiers: [3, 4],
            target: {category: "Spell", type: "disable", amount: "tier"},
            desc: "You lose the ability to cast all spells of the same tier until you complete a rest"
        },
        {
            name: "It cannot be unseen",
            tiers: [3, 4],
            roll: {type: "Round", diceType: "d10", numDice: 1}, // TODO
            desc: "You must pass a DC 12 Wisdom check or descend into mad raving for 1d10 rounds"
        },
        {
            name: "Radioactive energies",
            tiers: [3, 4],
            roll: {type: "Round", diceType: "d4", numDice: 1},
            desc: "You whirl with repulsive energies, drawing the hostility and attacks of all enemies who can see you for the next 1d4 rounds"
        },
        {
            name: "Uncontained channeling",
            tiers: [3, 4],
            desc: "You have disadvantage on casting spells of the same tier and lower for 10 rounds"
        },
// #####################################################################################################################
// ----------------------------------------------------- Tier 5 --------------------------------------------------------
// #####################################################################################################################
        {
            name: "Devastation",
            tiers: [5],
            desc: "Roll twice and combine both effects (reroll any further 1s)"
        },
        {
            name: "Pyroclastic extrusion",
            tiers: [5],
            roll: {type: "Damage", diceType: "d8", numDice: 3},
            desc: "You deal 3d8 damage to yourself and all creatures within near"
        },
        {
            name: "Astral incision",
            tiers: [5],
            target: {category: "Spell", type: "delete", amount: 1},
            desc: "An otherworldly blade cuts into your memory. You permanently forget one random spell"
        },
        {
            name: "The grimlow",
            tiers: [5],
            roll: {type: "Round", diceType: "d4", numDice: 2},
            desc: "You accidentally summon a hostile grimlow in a space near to you. It persists for 2d4 rounds before disappearing whence it came"
        },
        {
            name: "Dark plasma aura",
            tiers: [5],
            roll: {type: "Round", diceType: "d6", numDice: 2},
            desc: "Attacks against you pass through a vile aura, dealing double damage for the next 2d6 rounds"
        },
        {
            name: "Gate",
            tiers: [5],
            roll: {type: "Round", diceType: "d4", numDice: 1},
            desc: "You open a magic portal to another location, whether on this plane or another. Something dreadful will come through in 1d4 rounds unless you close it with a DC 18 INT check on your turn"
        },
        {
            name: "Runaway arcana loop",
            tiers: [5],
            desc: "Your spell targets a random creature you can see, even if it would not normally be possible. Each subsequent turn, you must pass a spellcasting check for that spell or you cast it on another random creature in the same way (effect ends on success)"
        },
        {
            name: "Arcane obstruction",
            tiers: [5],
            target: {category: "Spell", type: "disable", amount: "randomTier"},
            desc: "You lose the ability to cast all spells of a random tier until you complete a rest"
        },
        {
            name: "What lurks beyond the veil",
            tiers: [5],
            roll: {type: "Hour", diceType: "d4", numDice: 1},
            desc: "You must pass a DC 15 WIS check or fall into mad raving for 1d4 hours" // TODO
        },
        {
            name: "Ord's balance",
            tiers: [5],
            desc: "You must either permanently sacrifice a magic item or the ability to cast a tier 3+ spell you know"
        },
        {
            name: "Unmitigated chain reaction",
            tiers: [5],
            desc: "You have disadvantage on casting all spells for the next 10 rounds"
        },
        {
            name: "Shred",
            tiers: [5],
            desc: "You tear a large hole in the fabric of the universe close to you; the lightless tear grows larger every round"
        },
    ],
// #####################################################################################################################
// ----------------------------------------------------- Tier 1-3 ------------------------------------------------------
// #####################################################################################################################
    Diabolical: [
        {
            name: "Diablerie",
            tiers: [1, 2, 3],
            desc: "Roll twice and combine both effects (reroll any further 1s)"
        },
        {
            name: "Wither",
            tiers: [1, 2, 3],
            roll: {type: "Damage", diceType: "d6", numDice: -1}, // -1 gets translated to spell tier
            desc: "You take 1d6 damage per spell tier"
        },
        {
            name: "Newt",
            tiers: [1, 2, 3],
            desc: "You turn into a tiny, 1 HP newt for 3 rounds. You can't cast spells in this form"
        },
        {
            name: "Shune's baleful gaze",
            tiers: [1, 2, 3],
            target: {category: "Spell", type: "disable", amount: 1},
            desc: "You can't cast this spell and another random spell again for a week"
        },
        {
            name: "Thieving fairies",
            tiers: [1, 2, 3],
            target: {category: "Gear", type: "delete", amount: 1},
            desc: "You lose a random piece of gear"
        },
        {
            name: "Cobwebs",
            tiers: [1, 2, 3],
            desc: "Mental cobwebs cloud your mind; you can't cast this spell again for a week"
        },
        {
            name: "Cackles",
            tiers: [1, 2, 3],
            desc: "You fall to the ground in a fit of cackling, unable to do anything but laugh for the next 3 rounds"
        },
        {
            name: "Double trouble",
            tiers: [1, 2, 3],
            target: {category: "Spell", type: "disable", amount: 1},
            desc: "You lose the ability to cast a random spell until you complete a rest"
        },
        {
            name: "Swamp gas",
            tiers: [1, 2, 3],
            desc: "The air fills with sulfurous gas in a near-sized cube around you. All creatures who end their turn in it are blinded and take 1d6 damage. It lasts 3 rounds"
        },
        {
            name: "Bat",
            tiers: [1, 2, 3],
            desc: "An angry bat appears on your head, flapping and clinging to your face. You are blinded for 3 rounds or until you can toss the beastie away from you"
        },
        {
            name: "Salt",
            tiers: [1, 2, 3],
            desc: "You're surrounded by a ring of salt and can't touch it or pass through it until something breaks the ring"
        },
        {
            name: "Siphon",
            tiers: [1, 2, 3],
            desc: "You have disadvantage on casting spells of the same tier or lower for the next 10 rounds"
        },
// #####################################################################################################################
// ----------------------------------------------------- Tier 4-5 ------------------------------------------------------
// #####################################################################################################################
        {
            name: "Maelstrom",
            tiers: [4, 5],
            desc: "Roll twice and combine both effects (reroll any further 1s)"
        },
        {
            name: "Ruin",
            tiers: [4, 5],
            roll: {type: "Damage", diceType: "d8", numDice: -1}, // -1 gets translated to spell tier
            desc: "You take 1d8 damage per spell tier"
        },
        {
            name: "Mind rot",
            tiers: [4, 5],
            target: {category: "Spell", type: "delete", amount: 1},
            desc: "You permanently forget one random spell"
        },
        {
            name: "Maelstrom",
            tiers: [4, 5],
            roll: {type: "Round", diceType: "d6", numDice: 1},
            desc: "You summon The Willowman (who is angry with you) in a space near to you. He stays for 1d6 rounds before disappearing from whence he came"
        },
        {
            name: "Accursed imps",
            tiers: [4, 5],
            target: {category: "Gear", type: "delete", amount: 3},
            desc: "Cackling imps from hell swarm you, stealing three pieces of random gear and flapping away"
        },
        {
            name: "Lightning blast",
            tiers: [4, 5],
            roll: {type: "Damage", diceType: "d6", numDice: 3},
            desc: "You deal 3d6 damage to yourself and all nearby creatures"
        },
        {
            name: "Cold iron",
            tiers: [4, 5],
            roll: {type: "Damage", diceType: "d6", numDice: 2},
            desc: "Spikes of cold iron lance from the ethereal realm, piercing you. You take 2d6 damage and are paralyzed for 2 rounds"
        },
        {
            name: "Mother of Night",
            tiers: [4, 5],
            target: {category: "Spell", type: "disable", amount: 1},
            desc: "You displease the Dark Mother and lose the ability to cast this spell until atoning to her"
        },
        {
            name: "Catatonia",
            tiers: [4, 5],
            desc: "You stare blankly and can't take any actions for the next hour"
        },
        {
            name: "Tongue of dog",
            tiers: [4, 5],
            target: {category: "Spell", type: "disable", amount: "randomTier"},
            desc: "Your tongue lolls every time you try to cast a spell of a random tier, ruining the magic. This persists until you complete a rest"
        },
        {
            name: "Fiddlesticks",
            tiers: [4, 5],
            desc: "You have disadvantage on casting all spells for the next 10 rounds"
        },
        {
            name: "Nemesis",
            tiers: [4, 5],
            desc: "Somewhere, a child is born who will grow up to become a mighty, sworn enemy to you"
        },
    ]
}
