import type {SpellInfo} from "../types"

export const SPELLS: SpellInfo[] = [
    // #################################################################################################################
    // ----------------------------------------------Tier 1 Spells------------------------------------------------------
    // #################################################################################################################
    {
        name: "Alarm",
        range: "Close",
        class: "Wizard",
        tier: 1,
        desc: "You touch one object, such as a door threshold, setting a magical alarm on it.\n" +
            "If any creature you do not designate while casting the spell touches or crosses past the object, a magical bell sounds in your head.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Blight",
        range: "Self",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 1,
        desc: "When you cast this spell, a close-sized patch of earth around you crumbles into lifeless ash.\n" +
            "You gain +1 to your spellcasting checks for the spell's duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Burning Hands",
        range: "Self",
        class: "Wizard",
        tier: 1,
        effect: {type: "Damage", diceType: "d6", numDice: 1},
        desc: "You spread your fingers with thumbs touching, unleashing a circle of flame that fills a close area around where you stand.\nCreatures within the area of effect take 1d6 damage. Unattended flammable objects ignite.",
        duration: {type: "Instant"},
    },
    {
        name: "Breath",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 1,
        desc: "You can hold your breath for the spell's duration.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Cauldron",
        range: "Close",
        class: "Witch",
        tier: 1,
        desc: " You conjure a bubbling cauldron next to you. It can produce one of the following effects:\n" +
            "• Any broken mundane item placed inside the cauldron is repaired.\n" +
            "• A fat, croaking toad leaps out and follows your instructions for the next 3 rounds.\n" +
            "• You can place up to 3 item slots of items inside the cauldron. The cauldron expels these items the next time you cast this spell (expelling items counts as the cauldron's single effect)",
        duration: {type: "Round", amt: 1},
    },
    {
        name: "Chant",
        range: "Self",
        class: "Seer",
        tier: 1,
        desc: "You begin an unearthly chant that lifts your vision beyond its ordinary limitations.\n" +
            "For the spell's duration, you can see all invisible and hidden things as though they were plainly visible.\n" +
            "This spell does not allow you to see in a way that you could not normally, such as in darkness or through walls.",
        duration: {type: "Focus"},
    },
    {
        name: "Charm Person",
        range: "Near",
        class: "Wizard, Witch",
        tier: 1,
        desc: "You magically beguile one humanoid of LV 2 or less within near range, who regards you as a friend for the duration.\n" +
            "The spell ends if you or your allies do anything harmful to the target. The target knows it was magically charmed after the spell ends.\n" +
            "Roll 1d8 to determine amount of days effective",
        duration: {type: "Day", roll: {numDice: 1, diceType: "d8"}},
    },
    {
        name: "Cleanse",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 1,
        desc: "You expunge natural toxins from one creature you touch. End the effects of one poison currently affecting the target.",
        duration: {type: "Instant"},
    },
    {
        name: "Cure Wounds",
        range: "Close",
        class: "Priest",
        tier: 1,
        desc: "Your touch restores ebbing life. Roll a number of d6s equal to 1 + half your level (rounded down). One target you touch regains that much HP.",
        duration: {type: "Instant"},
    },
    {
        name: "Darkness",
        range: "Near",
        class: "Priest",
        alignment: "Chaotic",
        tier: 1,
        desc: "The light cast by one object in range (even a magical object) is permanently extinguished.",
        duration: {type: "Instant"},
    },
    {
        name: "Detect Magic",
        range: "Near",
        class: "Wizard",
        tier: 1,
        desc: "You can sense the presence of magic within near range for the spell's duration.\n" +
            "If you focus for two rounds, you discern its general properties. Full barriers block this spell.",
        duration: {type: "Focus"},
    },
    {
        name: "Detect Magic",
        range: "Near",
        class: "Priest",
        alignment: "Neutral",
        tier: 1,
        desc: "You can sense the presence of magic within near range for the spell's duration.\n" +
            "If you focus for two rounds, you discern its general properties. Full barriers block this spell.",
        duration: {type: "Focus"},
    },
    {
        name: "Evoke Rage",
        range: "Close",
        class: "Seer",
        tier: 1,
        effect: {type: "Damage", diceType: "d4", numDice: 1},
        desc: "You call out the berserk rage locked inside someone. One willing humanoid you touch enters a berserk state.\n" +
            "The target is immune to morale checks, has ADV on STR checks and melee attacks, and deals +1d4 damage for the spell's duration.\n" +
            "If the target does not attack another creature on its turn, the spell ends.",
        duration: {type: "Round", roll: {numDice: 1, diceType: "d4"}},
    },
    {
        name: "Eyebite",
        range: "Near",
        class: "Witch",
        tier: 1,
        effect: {type: "Damage", diceType: "d4", numDice: 1},
        desc: "One creature you target takes 1d4 damage, and it can't see you until the end of its next turn.",
        duration: {type: "Instant"},
    },
    {
        name: "Eyebite",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 1,
        effect: {type: "Damage", diceType: "d4", numDice: 1},
        desc: "One creature you target takes 1d4 damage, and it can't see you until the end of its next turn.",
        duration: {type: "Instant"},
    },
    {
        name: "Feather Fall",
        range: "Self",
        class: "Wizard",
        tier: 1,
        desc: "You may make an attempt to cast this spell when you fall. Your rate of descent slows so that you land safely on your feet.",
        duration: {type: "Instant"},
    },
    {
        name: "First Gate",
        range: "Close",
        class: "Necromancer",
        tier: 1,
        desc: "You can target a living creature of LV 2 or less or an undead creature of LV 4 or less.\n" +
            "The creature falls into a deep sleep. Being injured wakes it.",
        duration: {type: "Instant"},
    },
    {
        name: "Flare",
        range: "Near",
        class: "Wizard",
        alignment: "Lawful",
        tier: 1,
        desc: "A flash of blinding, white light bursts from you. All enemies in range who see it are blinded for the spell's duration.",
        duration: {type: "Round", amt: 1},
    },
    {
        name: "Floating Disk",
        range: "Near",
        class: "Wizard",
        tier: 1,
        desc: "You create a floating, circular disk of force with a concave center. It can carry up to 20 gear slots.\n" +
            "It hovers at waist level and automatically stays within near of you. It can’t cross over drop- offs or pits taller than a human.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Fog",
        range: "Self",
        class: "Witch",
        tier: 1,
        desc: "A thick cloud of fog blooms in a close area around you, making you hard to see.\n" +
            "The cloud moves with you. Attacks against creatures in the cloud have disadvantage.",
        duration: {type: "Focus"},
    },
    {
        name: "Fortify",
        range: "Close",
        class: "Priest",
        alignment: "Lawful",
        tier: 1,
        effect: {type: "Amount", diceType: "d6", numDice: 1},
        desc: "One creature you touch gains 1d6 temporary HP for the spell's duration.\n" +
            "You cannot target the same creature with this spell again until its effects end.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Hold Portal",
        range: "Near",
        class: "Wizard",
        tier: 1,
        desc: "You magically hold a portal closed for the duration. A creature must make a successful STR check vs. your spellcasting check to open the portal. The knock spell ends this spell.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Holy Weapon",
        range: "Close",
        class: "Priest",
        tier: 1,
        desc: "One weapon you touch is imbued with a sacred blessing. The weapon becomes magical and has +1 to attack and damage rolls for the duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Hypnotize",
        range: "Near",
        class: "Witch",
        tier: 1,
        desc: "One creature of LV 3 or less that can see you is rendered stupefied. Breaking the creature's line of sight to you allows it to make a DC 15 Charisma check. On a success, the spell ends.",
        duration: {type: "Focus"},
    },
    {
        name: "Instill",
        range: "Self",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 1,
        desc: "One weapon you wield is imbued with life force.\n" +
            "It becomes a +1 weapon for the spell's duration. If the weapon is a staff, it deals d6 damage instead of d4.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Light",
        range: "Close",
        class: "Priest, Wizard",
        tier: 1,
        desc: "One object you touch glows with bright, heatless light, illuminating out to a near distance for 1 hour of real time.",
        duration: {type: "Hour", subType: "RealTime", amt: 1},
    },
    {
        name: "Mage Armor",
        range: "Self",
        class: "Wizard",
        tier: 1,
        desc: "An invisible layer of magical force protects your vitals. Your armor class becomes 14 (18 on a critical spellcasting check) for the spell’s duration.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Magic Missile",
        range: "Far",
        class: "Wizard",
        tier: 1,
        effect: {type: "Damage", diceType: "d4", numDice: 1},
        desc: "You have advantage on your check to cast this spell. A glowing bolt of force streaks from your open hand, dealing 1d4 damage to one target.",
        duration: {type: "Instant"},
    },
    {
        name: "Mischief",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 1,
        desc: "You magically beguile one humanoid of level 2 or less within near range.\n" +
            "The target is overcome with a compulsion to commit harmful mischief for the spell's duration.\n" +
            "Each round, it tries to commit a sneaky, cruel act that would hinder or inconvenience its nearest ally.\n" +
            "The spell ends if you or your allies do anything to hurt the target that it notices.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Oak, Ash, Thorn",
        range: "Self",
        class: "Witch",
        tier: 1,
        desc: "For the spell's duration, faeries, demons, and devils can't attack you. These beings also can't possess, compel, or beguile you.",
        duration: {type: "Focus"},
    },
    {
        name: "Oxidize",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 1,
        effect: {type: "Amount", diceType: "d100", numDice: 1},
        desc: "One inanimate object you touch the size of a door or less ages d100 years.",
        duration: {type: "Instant"},
    },
    {
        name: "Potion",
        range: "Close",
        class: "Seer",
        tier: 1,
        desc: "As a part of casting this spell, you must bless a single drink of any liquid. The liquid gains healing properties for 1 day.\n" +
            "A creature who imbibes it may end the effects of one poison or may immediately stop dying (the creature remains at 0 HP).",
        duration: {type: "Instant"},
    },
    {
        name: "Puppet",
        range: "Close",
        class: "Witch",
        tier: 1,
        desc: "One humanoid creature of LV 2 or less you touch becomes ensnared by your movements. On your turn, the creature mimics all your movements.\n" +
            "If mimicking you would cause the creature to directly harm itself or an ally, it can make a DC 15 Charisma check. On a success, it resists mimicking you.",
        duration: {type: "Focus"},
    },
    {
        name: "Prayer",
        range: "Close",
        class: "Priest",
        alignment: "Lawful",
        tier: 1,
        desc: "You say a prayer over one creature, granting it resolve. The next time the target fails an attack roll during this spell's duration, it succeeds instead and this spell ends.\n" +
            "You cannot target the same creature with this spell again until its effects end.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Protection From Evil",
        range: "Close",
        class: "Priest, Wizard, Necromancer",
        tier: 1,
        desc: "For the spell’s duration, chaotic beings have disadvantage on attack rolls and hostile spellcasting checks against the target.\n" +
            "These beings also can’t possess, compel, or beguile it.\n" +
            "When cast on an already-possessed target, the possessing entity makes a CHA check vs. the last spellcasting check.\n" +
            "On a failure, the entity is expelled.",
        duration: {type: "Focus"},
    },
    {
        name: "Protection From Good",
        range: "Close",
        class: "Priest, Wizard",
        alignment: "Chaotic",
        tier: 1,
        desc: "For the spell’s duration, lawful beings have disadvantage on attack rolls and hostile spellcasting checks against the target.\n" +
            "These beings also can’t possess, compel, or beguile it.\n" +
            "When cast on an already-possessed target, the possessing entity makes a CHA check vs. the last spellcasting check.\n" +
            "On a failure, the entity is expelled.",
        duration: {type: "Focus"},
    },
    {
        name: "Reveal",
        range: "Near",
        class: "Wizard",
        alignment: "Lawful",
        tier: 1,
        desc: "End all invisibility effects out to a near distance from you. You also become aware of the location of any hiding creatures within range.",
        duration: {type: "Instant"},
    },
    {
        name: "Seal Soul",
        range: "Close",
        class: "Necromancer",
        tier: 1,
        desc: "One dead body you touch becomes sealed against necromantic energy.\n" +
            "This body cannot be used to create an undead creature or be possessed by a dead spirit.",
        duration: {type: "Permanent"},
    },
    {
        name: "Shadowdance",
        range: "Near",
        class: "Witch",
        tier: 1,
        desc: "You spin shadowstuff into a convincing visible and audible illusion at a point within near.\n" +
            "The illusion can be as big as a person and can move within a near range of where it appeared.\n" +
            "The illusion can't affect physical objects. Touching the illusion reveals its false nature.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Shield of Faith",
        range: "Self",
        class: "Priest",
        tier: 1,
        desc: "A protective force wrought of your holy conviction surrounds you. You gain a +2 bonus to your armor class for the duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Sleep",
        range: "Near",
        class: "Wizard",
        tier: 1,
        desc: "This spell fills a near-sized cube extending from you. Choose a number of living creatures in the area up to your level.\n" +
            "Those creatures fall into a deep sleep if they are LV 2 or less. Injury or vigorous shaking wakes them.",
        duration: {type: "Instant"},
    },
    {
        name: "Thorn",
        range: "Close",
        class: "Priest",
        alignment: "Neutral",
        tier: 1,
        effect: {type: "Amount", diceType: "d4", numDice: 1},
        desc: "A weapon or suit of armor you touch sprouts dense thorns. Weapons become magical and deal +1d4 damage for the spell's duration.\n" +
            "Armor becomes magical and deals 1d4 damage to anyone who touches its wearer for the spell's duration. If your deity is Gede, cast this spell with ADV.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Trance",
        range: "Close",
        class: "Seer",
        tier: 1,
        desc: "You enter a trance, catching small glimpses of a creature's fate.\n" +
            "One humanoid creature you touch (you can't target yourself) gains a luck token. It can't have more than one luck token at once.",
        duration: {type: "Instant"},
    },
    {
        name: "Turn Undead",
        range: "Near",
        class: "Necromancer",
        tier: 1,
        desc: "You rebuke undead creatures, forcing them to flee.\n" +
            "Undead creatures within near of you must make a CHA check vs. your spellcasting check.\n" +
            "If a creature fails by 10+ points and is equal to or less than your level, it is destroyed.\n" +
            "Otherwise, on a fail, it flees from you for 5 rounds.",
        duration: {type: "Instant"},
    },
    {
        name: "Undeath",
        range: "Close",
        class: "Necromancer",
        tier: 1,
        desc: "You touch one humanoid’s remains, and it rises as a zombie or skeleton under your control.\n" +
            "The remains must have at least three limbs and its head intact.\n" +
            "The creature acts on your turn.\n" +
            "You can only create one undead creature with this spell at a time. When the spell ends, the corpse collapses into grave dust.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Ward",
        range: "Far",
        class: "Wizard",
        alignment: "Lawful",
        tier: 1,
        desc: "You ward yourself with a magical charm against ambush. For the spell's duration, you can't be surprised (you roll initiative during surprise rounds and are treated as aware of all enemies).",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Whisperwind",
        range: "Far",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 1,
        desc: "You send a brief, whispered message that reaches any creature in range.",
        duration: {type: "Instant"},
    },
    {
        name: "Willowman",
        range: "Near",
        class: "Witch",
        tier: 1,
        desc: "You call upon the Willowman to appear in one creature's mind, filling it with supernatural terror.\n" +
            "Choose one creature of LV 2 or less within range.\n" +
            "That creature must immediately make a morale check.\n" +
            "Even creatures that are not normally subject to morale checks (such as undead) must do so.",
        duration: {type: "Instant"},
    },
    {
        name: "Witchlight",
        range: "Near",
        class: "Witch",
        tier: 1,
        desc: "You summon a floating marsh light that bobs in the air and casts light out to a close radius around it.\n" +
            "The light can change colors and take on vague shapes. It can float up to a near distance on your turn.",
        duration: {type: "Focus"},
    },
    {
        name: "Withermark",
        range: "Far",
        class: "Necromancer",
        tier: 1,
        effect: {type: "Damage", diceType: "d4", numDice: 1},
        desc: "You fling a dark rune of necrotic energy at a target in range.\n" +
            "The target takes 1d4 damage. This damage increases to 2d4 when you reach 5th level.\n" +
            "Undead creatures are unharmed by this spell.",
        duration: {type: "Instant"},
    },
    // #################################################################################################################
    // ----------------------------------------------Tier 2 Spells------------------------------------------------------
    // #################################################################################################################
    {
        name: "Absorb",
        range: "Self",
        class: "Wizard",
        alignment: "Lawful",
        tier: 2,
        desc: "You create an absorptive barrier of force around you. Halve all damage you take for the spell's duration (round down).",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Acid Arrow",
        range: "Far",
        class: "Wizard",
        tier: 2,
        effect: {type: "Damage", diceType: "d6", numDice: 1},
        desc: "You conjure a corrosive bolt that hits one foe, dealing 1d6 damage a round. The bolt remains in the target for as long as you focus.",
        duration: {type: "Focus"},
    },
    {
        name: "Alter Self",
        range: "Self",
        class: "Wizard, Witch",
        tier: 2,
        desc: "You magically change your physical form, gaining one feature that modifies your existing anatomy.\n" +
            "For example, you can grow functional gills on your neck or bear claws on your fingers. This spell can’t grow wings or limbs.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Augury",
        range: "Self",
        class: "Priest, Witch",
        tier: 2,
        desc: "You interpret the meaning of supernatural portents and omens.\n" +
            "Ask the GM one question about a specific course of action. The GM says whether the action will lead to “weal” or “woe.”",
        duration: {type: "Instant"},
    },
    {
        name: "Bane",
        range: "Close",
        class: "Necromancer",
        tier: 2,
        effect: {type: "Amount", diceType: "d6", numDice: 1},
        desc: "One weapon you touch is empowered with necrotic energy.\n" +
            "It deals an additional 1d6 damage against living creatures for the duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Barkskin",
        range: "Self",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 2,
        desc: "Your skin hardens into tough tree bark.\n" +
            "Your AC becomes 15 (18 on a critical spellcasting check) for the spell's duration. You take double damage from fire while you are under the spell's effects.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Befriend",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 2,
        desc: "A tiny natural creature you touch (such as a mouse or moth) regards you as a friend for the spell's duration.\n" +
            "You may give the creature one command, which it tries to complete to the best of its ability and intelligence even after the spell ends. If the command would directly harm the creature, it abandons the task.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Bless",
        range: "Close",
        class: "Priest",
        tier: 2,
        desc: "One creature you touch gains a luck token.",
        duration: {type: "Instant"},
    },
    {
        name: "Blind/Deafen",
        range: "Near",
        class: "Priest",
        tier: 2,
        desc: "You utter a divine censure, blinding or deafening one creature you can see in range.\n" +
            "The creature has disadvantage on tasks requiring the lost sense.",
        duration: {type: "Focus"},
    },
    {
        name: "Bogboil",
        range: "Far",
        class: "Witch",
        tier: 2,
        desc: "You turn a near-sized cube of ground within range into a muddy, boiling bog of quicksand.\n" +
            "A creature stuck in the bog can't move and must succeed on a Dexterity check vs. your spellcasting check to free itself.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Cacklerot",
        range: "Close",
        class: "Witch",
        tier: 2,
        desc: "One target you touch of LV 4 or less collapses helplessly with disturbing, pained laughter for the spell's duration.",
        duration: {type: "Focus"},
    },
    {
        name: "Cat's Eye",
        range: "Self",
        class: "Witch",
        tier: 2,
        desc: "Your irises grow to fill your eyes and your pupils turn into black, vertical slits. You can see invisible creatures and secret doors for the spell's duration.",
        duration: {type: "Focus"},
    },
    {
        name: "Cleansing Weapon",
        range: "Close",
        class: "Priest",
        tier: 2,
        desc: "One weapon you touch is wreathed in purifying flames. It deals an additional 1d4 damage (1d6 vs. undead) for the duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Command Undead",
        range: "Far",
        class: "Necromancer",
        tier: 2,
        desc: "You issue a verbal command to one undead creature of LV 5 or less in range.\n" +
            "The command must be one word, such as “stop.” The target obeys the command for as long as you focus.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Consecrate",
        range: "Close",
        class: "Priest",
        alignment: "Lawful",
        tier: 2,
        desc: "A near-sized area around where you cast this spell becomes sanctified with a holy blessing.\n" +
            "Chaotic creatures of LV 4 or less cannot physically enter this area for the spell's duration.\n" +
            "If your deity is Saint Terragnis, cast this spell with ADV.",
        duration: {type: "Instant"},
    },
    {
        name: "Detect Thoughts",
        range: "Near",
        class: "Wizard",
        tier: 2,
        desc: "You peer into the mind of one creature you can see within the spell’s range.\n" +
            "Each round, you learn the target’s immediate thoughts.\n" +
            "On its turn, the target makes a Wisdom check opposed by your last spellcasting check. If the target succeeds, it notices your presence in its mind and the spell ends.",
        duration: {type: "Focus"},
    },
    {
        name: "Envenom",
        range: "Close",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 2,
        desc: "You turn one cup or vial of potable liquid into a toxic poison. It still appears to be the original liquid in all ways.\n" +
            "A living creature of LV 10 or less who drinks the liquid must pass a DC 15 CON check or go to 0 HP.",
        duration: {type: "Instant"},
    },
    {
        name: "Extract",
        range: "Close",
        class: "Priest",
        alignment: "Chaotic",
        tier: 2,
        desc: "A creature you touch is compelled to tell you its secrets. On its turn, the target tells you the secret it holds most dear that you do not already know.\n" +
            "If your deity is Shune the Vile, cast this spell with ADV.",
        duration: {type: "Instant"},
    },
    {
        name: "Fate",
        range: "Near",
        class: "Seer",
        tier: 2,
        effect: {type: "Damage", diceType: "d10", numDice: 1},
        desc: "You painfully twist the golden threads of a creature's fate. One creature you target in range takes 1d10 damage and loses any luck tokens it has.",
        duration: {type: "Instant"},
    },
    {
        name: "Feast",
        range: "Near",
        class: "Priest",
        alignment: "Neutral",
        tier: 2,
        effect: {type: "Heal", diceType: "d6", numDice: 1},
        desc: "All food within near of you is blessed by Gede's bounty.\n" +
            "Creatures who willingly join you in eating the food who are not friendly toward you become so for one day.\n" +
            "This effect ends if you do anything to harm them.\n" +
            "Creatures who are already friendly toward you regain 1d6 HP and may make an additional check to end any poisons or diseases affecting them.\n" +
            "Uneaten food loses the effects of this spell after the meal is over.",
        duration: {type: "Instant"},
    },
    {
        name: "Final Toll",
        range: "Close",
        class: "Necromancer",
        tier: 2,
        desc: "One undead you touch of LV 2 or less instantly crumbles to dust.",
        duration: {type: "Instant"},
    },
    {
        name: "Fixed Object",
        range: "Close",
        class: "Wizard",
        tier: 2,
        desc: "An object you touch that weighs no more than 5 pounds becomes fixed in its current location. It can support up to 5,000 pounds of weight for the duration of the spell.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Frog Rain",
        range: "Far",
        class: "Witch",
        tier: 2,
        desc: "A rain of indignant frogs pelts a near-sized cube around a point you can see within range.\n" +
            "All creatures within the frog rain take 1d6 damage. Any surviving frogs hop away and disappear.",
        duration: {type: "Instant"},
    },
    {
        name: "Ghoul Touch",
        range: "Close",
        class: "Necromancer",
        tier: 2,
        effect: {type: "Damage", diceType: "d6", numDice: 1},
        desc: "You strike at the life force of a living creature, dealing it 1d6 damage.\n" +
            "If the target is LV 4 or less, it becomes paralyzed for 1d4 rounds.",
        duration: {type: "Instant"},
    },
    {
        name: "Hold Person",
        range: "Near",
        class: "Wizard",
        tier: 2,
        desc: "You magically paralyze one humanoid creature of LV 4 or less you can see within range.",
        duration: {type: "Focus"},
    },
    {
        name: "Inflict Wounds",
        range: "Near",
        class: "Priest",
        alignment: "Chaotic",
        tier: 2,
        effect: {type: "Damage", diceType: "d4", numDice: 2},
        desc: "A vile word you utter drains the life from a creature in range. The target takes 2d4 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Invisibility",
        range: "Close",
        class: "Wizard, Witch",
        tier: 2,
        desc: "A creature you touch becomes invisible for the spell’s duration. The spell ends if the target attacks or casts a spell.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Knock",
        range: "Near",
        class: "Wizard",
        tier: 2,
        desc: "A door, window, gate, chest, or portal you can see within range instantly opens, defeating all mundane locks and barriers. This spell creates a loud knock audible to all within earshot.",
        duration: {type: "Instant"},
    },
    {
        name: "Lamentation",
        range: "Near",
        class: "Necromancer",
        tier: 2,
        desc: "You sing a haunting death dirge about one creature in range. The target must be of a level equal to or less than your own.\n" +
            "The target cannot act on its turn unless it passes a CHA check equal to your last spellcasting check.",
        duration: {type: "Focus"},
    },
    {
        name: "Levitate",
        range: "Self",
        class: "Wizard",
        tier: 2,
        desc: "You can float a near distance vertically per round on your turn. You can also push against solid objects to move horizontally.",
        duration: {type: "Focus"},
    },
    {
        name: "Magnetize",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 2,
        desc: "One object you touch up to the size of a horse becomes powerfully magnetized.\n" +
            "It attracts all smaller magnetic objects within near. If it can move, it is pulled toward larger magnetic objects within near.\n" +
            "A metal creature must pass a STR check equal to your spellcasting check to resist.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Meld",
        range: "Self",
        class: "Wizard",
        alignment: "Lawful",
        tier: 2,
        desc: "You merge slightly with the ethereal plane, freeing yourself from physical hindrances. You may ignore any effect that would impact your movement for the spell's duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Mirror Image",
        range: "Self",
        class: "Wizard",
        tier: 2,
        desc: "You create a number of illusory duplicates of yourself equal to half your level rounded down (minimum 1).\n" +
            "The duplicates surround you and mimic you. Each time a creature attacks you, the attack misses and causes one of the duplicates to evaporate. If all of the illusions have disappeared, the spell ends.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Misty Step",
        range: "Self",
        class: "Wizard",
        tier: 2,
        desc: "In a puff of smoke, you teleport a near distance to an area you can see.",
        duration: {type: "Instant"},
    },
    {
        name: "Pacify",
        range: "Near",
        class: "Wizard",
        alignment: "Lawful",
        tier: 2,
        desc: "Choose one creature within range of LV 3 or less. It must make a morale check (creatures immune to morale checks are not affected by this spell).",
        duration: {type: "Instant"},
    },
    {
        name: "Peace",
        range: "Near",
        class: "Priest",
        alignment: "Lawful",
        tier: 2,
        desc: "You calm the anger and hostility of all creatures of LV 4 or less within near range.\n" +
            "These creatures will not attack you or your allies for the spell's duration. This spell ends if the creatures notice any attempts to harm them.\n" +
            "When this spell ends, the creatures revert to their original dispositions.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Phantoms",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 2,
        desc: "You conjure a terrifying illusion that appears in the mind of one target of LV 3 or less in range. The target must immediately make a morale check.",
        duration: {type: "Instant"},
    },
    {
        name: "Poison",
        range: "Close",
        class: "Witch",
        tier: 2,
        desc: "One worn or carried object you touch becomes toxic for the spell's duration. Any creature in contact with the object at the start of its turn takes 1d6 damage.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Push/Pull",
        range: "Near",
        class: "Wizard",
        alignment: "Lawful",
        tier: 2,
        desc: "You move one human-sized object or a creature of LV 4 or less a near distance. If the target is anchored in a way that prevents free movement, the DC to cast this spell is 18.",
        duration: {type: "Instant"},
    },
    {
        name: "Read The Runes",
        range: "Self",
        class: "Seer",
        tier: 2,
        desc: "You ask the gods a question and cast the runestones, interpreting the meaning of the results.\n" +
            "Ask the Game Master one yes or no question. The Game Master truthfully answers 'yes' or 'no.'",
        duration: {type: "Instant"},
    },
    {
        name: "Regrowth",
        range: "Close",
        class: "Priest",
        alignment: "Neutral",
        tier: 2,
        desc: "One creature you touch regains 1d6 HP or a severed limb of your choice.",
        duration: {type: "Instant"},
    },
    {
        name: "Sacrifice",
        range: "Close",
        class: "Seer",
        tier: 2,
        desc: "As a part of casting this spell, you must ritually sacrifice a living creature of LV 2 or higher.\n" +
            "The target you touch gains a bonus to their next check or attack roll equal to the sacrificed creature's level.",
        duration: {type: "Instant"},
    },
    {
        name: "Second Gate",
        range: "Near",
        class: "Necromancer",
        tier: 2,
        desc: "You render one creature in range mute for the spell's duration. It cannot speak and has DISADV on spellcasting checks.\n" +
            "In place of the above effect, you can restore the lost speech and/or thought of one creature in range for the spell's duration.",
        duration: {type: "Focus"},
    },
    {
        name: "Silence",
        range: "Far",
        class: "Wizard",
        tier: 2,
        desc: "You magically mute sound in a near cube within the spell’s range. Creatures inside the area are deafened, and any sounds they create cannot be heard.",
        duration: {type: "Focus"},
    },
    {
        name: "Smite",
        range: "Near",
        class: "Priest",
        tier: 2,
        effect: {type: "Damage", diceType: "d6", numDice: 1},
        desc: "You call down punishing flames on a creature you can see within range. It takes 1d6 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Soulbind",
        range: "Close",
        class: "Seer",
        tier: 2,
        desc: "You seal the soul of a living creature, preventing magic from leeching into it.\n" +
            "One creature you touch becomes nearly impervious to all magic.\n" +
            "For the spell's duration, all other spells targeting the creature (harmful or helpful) are DC 18 to cast.\n" +
            "This spell ends as soon as the target is affected by another spell.",
        duration: {type: "Focus"},
    },
    {
        name: "Spidersilk",
        range: "Self",
        class: "Witch",
        tier: 2,
        desc: "Sticky spidersilk covers your hands and feet. For the spell's duration, you can walk on vertical surfaces as easily as if it were flat ground.",
        duration: {type: "Focus"},
    },
    {
        name: "Toadstool",
        range: "Self",
        class: "Witch",
        tier: 2,
        effect: {type: "Heal", diceType: "d6", numDice: 1},
        desc: "You conjure a plump, speckled toadstool in your hand. It disappears at the end of your next turn. A creature that eats the toadstool regains 1d6 HP.",
        duration: {type: "Instant"},
    },
    {
        name: "Truespeech",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 2,
        desc: "A natural creature you touch understands and can communicate with you in the true language of all animals.\n" +
            "You can ask the creature one yes or no question. The GM truthfully answers 'yes' or 'no'.\n" +
            "If you cast this spell more than once on the same creature in 24 hours, treat a failed spellcasting check for it as a critical failure instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Web",
        range: "Far",
        class: "Wizard",
        tier: 2,
        desc: "You create a near-sized cube of sticky, dense spider web within the spell’s range.\n" +
            "A creature stuck in the web can’t move and must succeed on a Strength check opposed by your spellcasting check to free itself.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Wither",
        range: "Close",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 2,
        effect: {type: "Damage", diceType: "d6", numDice: 1},
        desc: "Your touch drains the life-energy of one target in range, dealing it 1d6 damage. The target takes double damage from the next attack or damage-dealing spell that strikes it.",
        duration: {type: "Instant"},
    },
    {
        name: "Wrack",
        range: "Far",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 2,
        desc: "A creature you can see within range of LV 5 or less is overcome by agonizing pain. The target must pass a CON check on its turn equal to your last spellcasting check or it cannot move or act.",
        duration: {type: "Focus"},
    },
    {
        name: "Zone of Truth",
        range: "Near",
        class: "Priest",
        tier: 2,
        desc: "You compel a creature you can see to speak truth. It can’t utter a deliberate lie while within range.",
        duration: {type: "Focus"},
    },
    // #################################################################################################################
    // ----------------------------------------------Tier 3 Spells------------------------------------------------------
    // #################################################################################################################
    {
        name: "Alchemy",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 3,
        desc: "One inanimate object of human size or less you touch turns into another material of equal or lesser value.",
        duration: {type: "Instant"},
    },
    {
        name: "Anima",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 3,
        desc: "You animate the life force of one natural object you touch the size of a horse or less.\n" +
            "The object becomes a loyal creature for the spell's duration using the below stats.\n" +
            "Its level is equal to yours. The creature acts on your turn. You may use your action to command it, which it obeys. Otherwise, it does not act.\n" +
            "AC 10 + LV, HP 4.5 x LV, ATK 2 bash +7 (1d12), MV near, S +4, D +0, C +0, I -4, W +0, Ch +0, AL N, LV *",
        duration: {type: "Focus"},
    },
    {
        name: "Animate Dead",
        range: "Close",
        class: "Wizard, Necromancer",
        tier: 3,
        desc: "You touch one humanoid’s remains, and it rises as a zombie or skeleton under your control.\n" +
            "The remains must have at least three limbs and its head intact. The undead creature acts on your turn. After 1 day, the creature collapses into grave dust.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Banish",
        range: "Near",
        class: "Wizard",
        alignment: "Lawful",
        tier: 3,
        desc: "With a word of power, you send one extraplanar creature of LV 6 or less who hears you back to its dimension of origin.",
        duration: {type: "Instant"},
    },
    {
        name: "Betrayal",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 3,
        desc: "One creature of LV 7 or less you can see in range turns on its allies, regarding them as hostile enemies for the spell's duration.",
        duration: {type: "Focus"},
    },
    {
        name: "Blood Rite",
        range: "Self",
        class: "Priest",
        alignment: "Chaotic",
        tier: 3,
        desc: "You enter a supernatural rage. For the spell's duration, you have ADV on melee attacks, and your attacks deal +1d8 damage.\n" +
            "You must make a melee attack against the creature nearest to you on your turn, even if it's an ally. If you cannot, the spell ends.\n" +
            "If your deity is Ramlaat, cast this spell with ADV.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Broomstick",
        range: "Self",
        class: "Witch",
        tier: 3,
        desc: "You conjure a flying broomstick in your hand. The broomstick's rider can fly a near distance each round and can hover in place.",
        duration: {type: "Focus"},
    },
    {
        name: "Cast Out",
        range: "Far",
        class: "Seer",
        tier: 3,
        desc: "You turn a creature aside, throwing it out of your presence.\n" +
            "Choose a creature you can see. For the spell's duration, that creature can't come within near range of you.\n" +
            "It can still attack you from outside of near range.",
        duration: {type: "Focus"},
    },
    {
        name: "Command",
        range: "Far",
        class: "Priest",
        tier: 3,
        duration: {type: "Focus"},
        desc: "You issue a verbal command to one creature in range who can understand you.\n" +
            "The command must be one word, such as “kneel.” The target obeys the command for as long as you focus.\n" +
            "If your command is ever directly harmful to the creature, it may make a Charisma check vs. your last spellcasting check. On a success, the spell ends.",
    },
    {
        name: "Coven",
        range: "Self",
        class: "Witch",
        tier: 3,
        desc: "You call upon the magic you share with your fellow witches.\n" +
            "You regain the use of one tier 3 spell or lower that you can no longer cast for the day. After successfully casting this spell, you can't do so again until you complete a rest.",
        duration: {type: "Instant"},
    },
    {
        name: "Covenant",
        range: "Self",
        class: "Priest",
        alignment: "Lawful",
        tier: 3,
        desc: "You become a beacon of cosmic order, banishing the forces of chaos and entropy. For the spell's duration, you are immune to all spells and magical effects from chaotic sources.\n" +
            "If your deity is Madeera, cast this spell with ADV.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Defile",
        range: "Self",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 3,
        desc: "When you cast this spell, a near-sized circle of earth around you disintegrates into infertile ash.\n" +
            "For this spell's duration, treat all tier 1-3 spells you successfully cast as critical successes. You cannot cast this spell while under its effects.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Dispel Magic",
        range: "Near",
        class: "Wizard",
        tier: 3,
        desc: "End one spell that affects one target you can see in range.",
        duration: {type: "Instant"},
    },
    {
        name: "Dispel Magic",
        range: "Near",
        class: "Priest",
        alignment: "Neutral",
        tier: 3,
        desc: "End one spell that affects one target you can see in range.",
        duration: {type: "Instant"},
    },
    {
        name: "Divination",
        range: "Self",
        class: "Witch",
        tier: 3,
        desc: "You throw the divining bones or peer into the blackness between the stars, seeking a portent.\n" +
            "You can ask the GM one yes or no question. The GM truthfully answers 'yes' or 'no'.\n" +
            "If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Drain Life",
        range: "Close",
        class: "Necromancer",
        tier: 3,
        desc: "One living creature you touch takes 2d6 damage.\n" +
            "You regain HP equal to half the damage you dealt (round down).\n" +
            "If you target an undead creature with this spell, you take damage and it regains HP instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Fabricate",
        range: "Near",
        class: "Wizard",
        tier: 3,
        desc: "This spell can't target creatures. You turn a tree-sized collection of raw materials into a finished work.\n" +
            "For example, you convert a pile of bricks or rocks into a bridge. The finished work converts back to raw materials when the spell ends.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Fireball",
        range: "Far",
        class: "Wizard",
        tier: 3,
        effect: {type: "Damage", diceType: "d6", numDice: 4},
        desc: "You hurl a small flame that erupts into a fiery blast. All creatures in a near-sized cube around where the flame lands take 4d6 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Fly",
        range: "Self",
        class: "Wizard",
        tier: 3,
        desc: "Your feet lift from the ground, and you take to the air like a hummingbird.\n" +
            "You can fly near for the spell's duration and are able to hover in place.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Forbid",
        range: "Self",
        class: "Wizard",
        alignment: "Lawful",
        tier: 3,
        desc: "Creatures cannot teleport into, out of, or within an area of effect extending out to double near from you. This area of effect moves with you.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Gaseous Form",
        range: "Self",
        class: "Wizard",
        tier: 3,
        desc: "You and your gear turn into a cloud of smoke for the spell's duration.\n" +
            "You can fly and pass through any gap that smoke could. You can sense the terrain and any movement around you out to a near distance.\n" +
            "You can't cast spells while in this form.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Hallucinate",
        range: "Near",
        class: "Seer",
        tier: 3,
        desc: "One creature you target in near whose level is less than or equal to your own is overcome by visions of what might yet come to pass.\n" +
            "For the spell's duration, the target cannot act on its turn unless it passes a Wisdom check equal to your last spellcasting check.",
        duration: {type: "Focus"},
    },
    {
        name: "Howl",
        range: "Near",
        class: "Witch",
        tier: 3,
        desc: "All enemies within near range of you must immediately make a morale check. This spell does not affect creatures that are immune to morale checks.",
        duration: {type: "Instant"},
    },
    {
        name: "Identify",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 3,
        desc: "You learn all the magical properties of one item you touch. You cannot cast this spell again until you complete a rest.",
        duration: {type: "Instant"},
    },
    {
        name: "Illusion",
        range: "Far",
        class: "Wizard",
        tier: 3,
        desc: "You create a convincing visible and audible illusion that fills up to a near-sized cube in range.\n" +
            "The illusion cannot cause harm, but creatures who believe the illusion is real react to it as though it were.\n" +
            "A creature who inspects the illusion from afar must pass a Wisdom check vs. your last spellcasting check to perceive the false nature of the illusion.\n" +
            "Touching the illusion also reveals its false nature.",
        duration: {type: "Focus"},
    },
    {
        name: "Lay To Rest",
        range: "Close",
        class: "Priest, Necromancer",
        tier: 3,
        desc: "You instantly send an undead creature you touch to its final afterlife, destroying it utterly. You can target an undead creature of LV 9 or less.",
        duration: {type: "Instant"},
    },
    {
        name: "Lighting Bolt",
        range: "Far",
        class: "Wizard",
        tier: 3,
        effect: {type: "Damage", diceType: "d6", numDice: 3},
        desc: "You shoot a blue-white ray of lightning from your hands, hitting all creatures in a straight line out to a far distance. Creatures struck by the lightning take 3d6 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Locusts",
        range: "Self",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 3,
        desc: "A disorienting cloud of angry, biting locusts fills an area around you out to near.\n" +
            "The cloud moves with you as you move. You are not affected by it.\n" +
            "Creatures in the area of effect take 1d10 damage per round at the start of their turn.\n" +
            "They must pass a CON check equal to your last spellcasting check or be unable to move on their turn.",
        duration: {type: "Focus"},
    },
    {
        name: "Magic Circle",
        range: "Near",
        class: "Wizard",
        tier: 3,
        desc: "You conjure a circle of runes out to near-sized cube centered on yourself and name a type of creature (for example, demons).\n" +
            "For the spell’s duration, creatures of the chosen type cannot attack or cast a hostile spell on anyone inside the circle.\n" +
            "The chosen creatures also can’t possess, compel, or beguile anyone inside the circle.",
        duration: {type: "Focus"},
    },
    {
        name: "Mass Cure",
        range: "Near",
        class: "Priest",
        tier: 3,
        effect: {type: "Heal", diceType: "d6", numDice: 2},
        desc: "All allies within near range of you regain 2d6 HP.",
        duration: {type: "Instant"},
    },
    {
        name: "Mazzim's Mesmerism",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 3,
        desc: "You weave a mind-numbing miasma of dark magic around your targets.\n" +
            "At the start of their turn, all humanoid creatures of LV 5 or less in range must pass a CHA check vs. the last spellcasting check you made.\n" +
            "Creatures who fail stand motionless and agape, staring at unseen images.",
        duration: {type: "Focus"},
    },
    {
        name: "Mistletoe",
        range: "Near",
        class: "Witch",
        tier: 3,
        desc: "Two creatures you can see within near of you become enchanted with each other for 1d8 days.\n" +
            "Each time one of the affected creatures takes damage, it may make a DC 15 Charisma check. On a success, the spell ends.",
        duration: {type: "Day", roll: {numDice: 1, diceType: "d8"}},
    },
    {
        name: "Pin Doll",
        range: "Plane",
        class: "Witch",
        tier: 3,
        effect: {type: "Damage", diceType: "d6", numDice: 2},
        desc: "You pin a piece of hair or flesh taken from one creature to a small, burlap doll the spell conjures.\n" +
            "On your turn while focusing on this spell, you can push a pin into the doll.\n" +
            "Each time you do this, the creature who the hair or flesh belonged to takes 2d6 damage.\n" +
            "After this spell ends, the piece of hair or flesh burns to ash.",
        duration: {type: "Focus"},
    },
    {
        name: "Protection From Energy",
        range: "Close",
        class: "Wizard",
        tier: 3,
        desc: "One creature you touch becomes impervious to the wild fury of the elements.\n" +
            "Choose fire, cold, or electricity. For the spell's duration, the target is immune to harm from energy of the chosen type.",
        duration: {type: "Focus"},
    },
    {
        name: "Raven",
        range: "Unlimited",
        class: "Seer",
        tier: 3,
        desc: "You whisper a message to Odin's own ravens, and they carry it across all worlds to its recipient.\n" +
            "Speak a short sentence, and the name of its recipient, dead or alive. That creature hears your utterance whispered in its mind.",
        duration: {type: "Instant"},
    },
    {
        name: "Reap the Soul",
        range: "Near",
        class: "Necromancer",
        tier: 3,
        desc: "You draw life force from one creature in range that was killed within the last round.\n" +
            "You gain HP and a bonus to your next attack roll or spellcasting check equal to the target's level.",
        duration: {type: "Instant"},
    },
    {
        name: "Rebuke Unholy",
        range: "Near",
        class: "Priest",
        tier: 3,
        desc: "You rebuke creatures who oppose your alignment, forcing them to flee. You must present a holy symbol to cast this spell.\n" +
            "If you are lawful or neutral, this spell affects demons, devils, and outsiders.\n" +
            "If you are chaotic, this spell affects angels and natural creatures of the wild.\n" +
            "Affected creatures within near of you must make a CHA check vs. your spellcasting check.\n" +
            "If a creature fails by 10+ points and is equal to or less than your level, it is destroyed. Otherwise, on a fail, it flees from you for 5 rounds.",
        duration: {type: "Instant"},
    },
    {
        name: "Rend",
        range: "Self",
        class: "Priest",
        alignment: "Chaotic",
        tier: 3,
        desc: "You become a conduit of pure chaos, shredding all organized magic around you.\n" +
            "For the spell's duration, you are immune to all spells and magical effects from lawful sources.\n" +
            "If your deity is Memnon, cast this spell with ADV.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Revitalize",
        range: "Close",
        class: "Priest",
        alignment: "Lawful",
        tier: 3,
        desc: "One creature you touch surges with healing energy. Roll a number of d10s equal to 1 + half your level (rounded down). The target regains that many hit points.",
        duration: {type: "Instant"},
    },
    {
        name: "Restoration",
        range: "Close",
        class: "Priest",
        tier: 3,
        desc: "With the touch of your hands, you expunge curses and illnesses. One curse, illness, or affliction of your choice affecting the target creature ends.",
        duration: {type: "Instant"},
    },
    {
        name: "Sending",
        range: "Unlimited",
        class: "Wizard",
        tier: 3,
        desc: "You send a brief, mental message to any creature with whom you are familiar who is on the same plane.",
        duration: {type: "Instant"},
    },
    {
        name: "Serpent",
        range: "Close",
        class: "Priest",
        alignment: "Neutral",
        tier: 3,
        desc: "An ordinary stick you touch turns into a loyal cobra. The cobra acts on your turn and follows simple instructions you give it, such as 'attack' or 'wait' When the spell ends, the cobra slithers away.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Speak With Dead",
        range: "Close",
        class: "Wizard, Witch, Necromancer",
        tier: 3,
        desc: "A dead body you touch answers your questions in a distant, wheezing voice.\n" +
            "You can ask the dead body up to three yes or no questions (one at a time). The GM truthfully answers \"yes\" or \"no\" to each.\n" +
            "If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Speak with Object",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 3,
        desc: "An object you touch mentally answers your questions. The object's wit matches the rarity of its primary materials. A diamond is wittier than a stone.\n" +
            "You can ask the object up to three yes or no questions (one at a time). The GM truthfully answers 'yes' or 'no' to each.\n" +
            "If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Swarm",
        range: "Far",
        class: "Witch",
        tier: 3,
        desc: "A dense swarm of biting bats, rats, or locusts appears in a near sized cube around a point you can see within range. All creatures that start their turn within the swarm take 2d6 damage and are blinded.",
        duration: {type: "Focus"},
    },
    {
        name: "Third Gate",
        range: "Near",
        class: "Necromancer",
        tier: 3,
        desc: "You read the mind of a creature within range, learning one of its memories of your choosing.\n" +
            "In place of the above effect, you can permanently erase one memory of a creature within range.",
        duration: {type: "Instant"},
    },
    {
        name: "Treeshape",
        range: "Self",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 3,
        desc: "You and your gear turn into a treant with the below stats for the spell's duration.\n" +
            "You do not have the treant's Animate Tree talent. You cannot cast spells while under the effect of this spell. You retain your INT, WIS, and CHA stats.\n" +
            "AC 14, HP 38, ATK 2 slam +8 (1d12) or 1 rock (far) +8 (2d6), MV near, S +4, D -1, C +2, I *, W *, Ch *, AL N, LV 8",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Unlife",
        range: "Close",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 3,
        desc: "A humanoid skull you touch regains a semblance of its former life, animating with red witchlight in its eyes.\n" +
            "The skull can converse in Common. It retains its personality and memories from life, but its recall can be spotty if it's been dead a long time.\n" +
            "When the spell ends, the skull crumbles into grave dust.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Void Stare",
        range: "Far",
        class: "Witch",
        tier: 3,
        desc: "Your eyes turn black as you look into the dark between the stars. One creature of LV 6 or less you can see falls under your control. You decide its actions during its turn.",
        duration: {type: "Focus"},
    },
    {
        name: "Whisper",
        range: "Close",
        class: "Witch",
        tier: 3,
        desc: "You whisper into another creature's ear, planting a false memory in its mind.\n" +
            "You describe one brief, false memory that the target believes is true going forward.\n" +
            "If you fail this spellcasting check, the GM chooses a short, false memory to plant in your mind instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Wolfshape",
        range: "Self",
        class: "Seer",
        tier: 3,
        desc: "You and your gear transform into a wolf for the spell's duration.\n" +
            "You assume the wolf's STR, DEX, CON, HP, AC, speed, attacks, and physical characteristics, but retain your INT, WIS, and CHA.\n" +
            "You can cast spells in this form. If you go to 0 HP, you revert to your true shape at 0 HP. If you are level 5+, you can transform into a dire wolf or a winter wolf instead.",
        duration: {type: "Focus"},
    },
    // #################################################################################################################
    // ----------------------------------------------Tier 4 Spells------------------------------------------------------
    // #################################################################################################################
    {
        name: "Ashes to Ashes",
        range: "Near",
        class: "Necromancer",
        tier: 4,
        desc: "A living creature you target begins crumbling into ash.\n" +
            "You can target a creature you can see of LV 5 or less.\n" +
            "If you successfully focus on this spell for 3 rounds in a row, the target dies and crumbles into a pile of ash.",
        duration: {type: "Focus"},
    },
    {
        name: "Arcane Eye",
        range: "Near",
        class: "Wizard",
        tier: 4,
        desc: "You conjure an invisible, grape- sized eye within range. You can see through the eye.\n" +
            "It can see in the dark out to near range, fly near on your turn, and squeeze through openings as narrow as a keyhole.",
        duration: {type: "Focus"},
    },
    {
        name: "Bear Shape",
        range: "Self",
        class: "Priest",
        alignment: "Neutral",
        tier: 4,
        desc: "You and your gear transform into a bear of your choice for the spell's duration.\n" +
            "You assume the bear's STR, DEX, CON, HP, AC, speed, attacks, and physical characteristics, but retain your INT, WIS, and CHA.\n" +
            "You can cast spells in this form. If you go to 0 HP, you revert to your true shape at 0 HP.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Beguile",
        range: "Near",
        class: "Witch",
        tier: 4,
        desc: "You conjure a convincing visible and audible illusion within range. Creatures who perceive the illusion react to it as though it were real, although it can't cause actual harm.\n" +
            "Touching the illusion instantly reveals its false nature. You may force a creature who interacts with the illusion to make a DC 15 Wisdom check.\n" +
            "If the creature fails, it is enchanted by the illusion for the spell's duration and seeks to protect it.",
        duration: {type: "Focus"},
    },
    {
        name: "Cloak of Night",
        range: "Self",
        class: "Witch",
        tier: 4,
        desc: "Your wrap yourself in a swirling cloak of shadows.\n" +
            "For the spell's duration, your armor class becomes 17 (20 on a critical spellcasting check).\n" +
            "You have advantage on Dexterity checks to sneak and hide for the spell's duration.",
        duration: {type: "Round", amt: 8},
    },
    {
        name: "Cloudkill",
        range: "Far",
        class: "Wizard",
        tier: 4,
        desc: "A putrid cloud of yellow poison fills a near-sized cube within range. It spreads around corners.\n" +
            "Creatures inside the cloud are blinded and take 2d6 damage at the beginning of their turns. A creature of LV 9 or less that ends its turn fully inside the cloud dies.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Commune",
        range: "Self",
        class: "Priest",
        tier: 4,
        desc: "You seek your god's counsel.\n" +
            "Ask the GM up to three yes or no questions. The GM truthfully answers \"yes\" or \"no\" to each.\n" +
            "If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure, instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Confusion",
        range: "Near",
        class: "Wizard",
        tier: 4,
        desc: "You mesmerize one creature you can see in range. The target can't take actions, and it moves in a random direction on its turn.\n" +
            "If the target is LV 9+, it may make a WIS check vs. your last spellcasting check at the start of its turn to end the spell.",
        duration: {type: "Focus"},
    },
    {
        name: "Contagion",
        range: "Close",
        class: "Priest",
        alignment: "Chaotic",
        tier: 4,
        desc: "A creature you touch is inflicted with a horrible wasting disease. Choose a stat.\n" +
            "The target must pass a DC 15 CON check each day or lose 1d6 points from this stat. The target dies when the stat reaches 0.",
        duration: {type: "Permanent"},
    },
    {
        name: "Control Water",
        range: "Far",
        class: "Wizard",
        tier: 4,
        desc: "You move and shape water. You can cause a section of water up to 100 feet in width and depth to change shape, defy gravity, or flow in a different direction.",
        duration: {type: "Focus"},
    },
    {
        name: "Curse",
        range: "Close",
        class: "Witch",
        tier: 4,
        desc: "A creature you touch is afflicted by one of the following curses:\n" +
            "• Hideous boils and warts\n" +
            "• All food tastes of ash\n" +
            "• Voice becomes shrill\n" +
            "• Disturbing nightmares\n" +
            "• Always lose at gambling\n" +
            "• An ally turns into an enemy\n" +
            "• Fear of something ordinary",
        duration: {type: "Permanent", amt: 8},
    },
    {
        name: "Dimension Door",
        range: "Self",
        class: "Wizard, Witch",
        tier: 4,
        desc: "You teleport yourself and up to one other willing creature to any point you can see.",
        duration: {type: "Instant"},
    },
    {
        name: "Dismember",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 4,
        effect: {type: "Damage", diceType: "d8", numDice: 1},
        desc: "One creature in range of LV 9 or less loses an arm or leg (roll randomly to determine which).\n" +
            "It takes 1d8 damage each time this happens. The target loses a new limb each round of the spell's duration.\n" +
            "If it has no other limbs to lose, it is instead beheaded and dies.",
        duration: {type: "Focus"},
    },
    {
        name: "Divination",
        range: "Self",
        class: "Wizard",
        tier: 4,
        desc: "You throw the divining bones or peer into the blackness between the stars, seeking a portent.\n" +
            "You can ask the GM one yes or no question. The GM truthfully answers \"yes\" or \"no\".\n" +
            "If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure, instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Dominate",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 4,
        desc: "You subjugate the will of one creature of LV 9 or less that you can see within range.\n" +
            "The creature cannot act except to follow your commands for the spell's duration.\n" +
            "On your turn, you can command the creature to take actions and move.\n" +
            "The creature acts and moves on its turn, following any instructions you gave it.",
        duration: {type: "Focus"},
    },
    {
        name: "Excoriate",
        range: "Near",
        class: "Necromancer",
        tier: 4,
        effect: {type: "Damage", diceType: "d10", numDice: 2},
        desc: "You burn the life force away from one living creature in range, dealing it 1d10 damage per round.\n" +
            "Undead creatures are healed by this spell instead.",
        duration: {type: "Focus"},
    },
    {
        name: "Flame Strike",
        range: "Far",
        class: "Priest",
        tier: 4,
        effect: {type: "Damage", diceType: "d6", numDice: 2},
        desc: "You call down a holy pillar of fire, immolating one creature you can see within range. The target takes 2d6 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Fourth Gate",
        range: "Close",
        class: "Necromancer",
        tier: 4,
        desc: "You transform a willing creature you touch of LV 10 or less into an undead creature of equal level or less for the spell's duration.\n" +
            "Any gear the target carries melds into its new form. It can't cast spells while under the effects of this one.\n" +
            "In place of the above effect, you can permanently restore a shape-changed creature back to its original form.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Freya's Omen",
        range: "Self",
        class: "Seer",
        tier: 4,
        desc: "For the spell's duration, you do not lose the ability to cast a spell if you fail its spellcasting check.\n" +
            "If you critically fail a spellcasting check, you may reroll your check once. You must use the new result.",
        duration: {type: "Round", roll: {numDice: 1, diceType: "d6"}},
    },
    {
        name: "Glassbones",
        range: "Close",
        class: "Witch",
        tier: 4,
        desc: "A creature you touch becomes fragile. It takes double damage for the spell's duration.",
        duration: {type: "Focus"},
    },
    {
        name: "Glyph",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 4,
        desc: "You draw an arcane symbol on an object that imparts one of the following magical effects:\n" +
            "• Bind. A reader of LV 6 or less is paralyzed for 1 hour.\n" +
            "• Harm. The reader takes 3d6 damage.\n" +
            "• Message. The reader hears a brief mental message.\n" +
            "• Teleportation Sigil. Treat the object as a teleportation sigil per the teleport spell.\n" +
            "The glyph disappears once activated.",
        duration: {type: "Week", amt: 1},
    },
    {
        name: "Halo",
        range: "Self",
        class: "Priest",
        alignment: "Lawful",
        tier: 4,
        desc: "A brilliant halo of golden light appears over your head. Hostile spells that target you are DC 18 to cast for this spell's duration.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Loki's Trickery",
        range: "Near",
        class: "Seer",
        tier: 4,
        desc: "You are filled with Loki's hypnotic guile. Creatures who hear you speak will alter their own beliefs and memories to match your suggestion.\n" +
            "Target one creature who can hear and understand you within range. You make one plausible statement, true or not.\n" +
            "The target must make a Wisdom check vs. your spellcasting check. If it fails, it now believes what you stated as though it were fact, regardless of what it knows.",
        duration: {type: "Instant"},
    },
    {
        name: "Moonbeam",
        range: "Far",
        class: "Witch",
        tier: 4,
        effect: {type: "Damage", diceType: "d6", numDice: 3},
        desc: "A wavering ray of silvery moonlight strikes one creature within far. It takes 3d6 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Mycelium",
        range: "Self",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 4,
        desc: "You connect your mind with the earth's vast fungi network.\n" +
            "Ask the GM one question of up to 15 words. The GM answers truthfully using up to 15 words.\n" +
            "If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Necronomicon",
        range: "Self",
        class: "Necromancer",
        tier: 4,
        desc: "You draw on your studies of the Book of the Dead to interpret portents you glimpse in burning flames and dark waters.\n" +
            "You can ask the GM up to three yes or no questions (one each round). The GM truthfully answers \"yes\" or \"no\" to each.\n" +
            "If you cast this spell more than once a week, treat a failed spellcasting check for it as a critical failure instead.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Nightmare",
        range: "Plane",
        class: "Witch",
        tier: 4,
        desc: "You visit the dreams of one sleeping creature, sending it heart-stopping nightmares.\n" +
            "You can target a creature whose level is less than or equal to half your level rounded down (minimum 1).\n" +
            "The target must be sleeping, and you must have seen it before in person.\n" +
            "If you successfully focus on this spell for 3 rounds in a row, the creature dies of fright.",
        duration: {type: "Focus"},
    },
    {
        name: "Odin's Wisdom",
        range: "Self",
        class: "Seer",
        tier: 4,
        desc: "For the spell's duration, add your level as an additional bonus to your Wisdom checks and spellcasting checks.",
        duration: {type: "Round", roll: {numDice: 1, diceType: "d6"}},
    },
    {
        name: "Passwall",
        range: "Close",
        class: "Wizard",
        tier: 4,
        desc: "A tunnel of your height opens in a barrier you touch and lasts for the duration. The passage can be up to near distance in length and must be in a straight line.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Pillar Of Salt",
        range: "Near",
        class: "Priest",
        tier: 4,
        desc: "A creature you target turns into a statue made of hardened salt. You can target a creature you can see of LV 5 or less.\n" +
            "If you successfully focus on this spell for 3 rounds in a row, the transformation becomes permanent.",
        duration: {type: "Focus"},
    },
    {
        name: "Polymorph",
        range: "Close",
        class: "Wizard, Witch",
        tier: 4,
        desc: "You transform a creature you touch into another natural creature you choose of equal or smaller size.\n" +
            "Any gear the target carries melds into its new form. The target gains the creature's physical statistics, but it retains its non-physical statistics.\n" +
            "If the target goes to 0 HP, it reverts to its true form at half its prior hit points.\n" +
            "You can target any willing creature with this spell, or an unwilling creature whose level is less than or equal to half your level rounded down (minimum 1).",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Regenerate",
        range: "Close",
        class: "Priest",
        tier: 4,
        effect: {type: "Heal", diceType: "d4", numDice: 1},
        desc: "A creature you touch regains 1d4 HP on your turn for the duration. This spell also regrows lost body parts.",
        duration: {type: "Focus"},
    },
    {
        name: "Resilient Sphere",
        range: "Self",
        class: "Wizard",
        tier: 4,
        desc: "You conjure a weightless, glassy sphere around you that extends out to close range.\n" +
            "For the spell's duration, nothing can pass through or crush the sphere. You can roll the sphere a near distance on your turn.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Revenant",
        range: "Self",
        class: "Necromancer",
        tier: 4,
        desc: "You bolster an undead creature, infusing it with potent energy.\n" +
            "Transform an undead creature you touch into another undead creature that is up to two levels higher.\n" +
            "You can't bring an undead creature above 10th level with this spell.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Summon Storm",
        range: "Self",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 4,
        desc: "You summon a violent storm that affects an area around you out to one mile for the duration.\n" +
            "The storm brings darkened skies, severe wind, and driving rain.\n" +
            "For the duration of the spell, you can cast control water (Shadowdark RPG pg. 57) and lightning bolt (Shadowdark RPG pg. 64), even if you do not know the spells.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Stoneskin",
        range: "Self",
        class: "Wizard",
        tier: 4,
        desc: "Your skin becomes like granite. For the spell's duration, your armor class becomes 17 (20 on a critical spellcasting check).",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Siphon",
        range: "Far",
        class: "Priest",
        alignment: "Neutral",
        tier: 4,
        desc: "You suppress the magical effects on one creature or from one object in range for the spell's duration.\n" +
            "You also suppress the effects of all spells cast on the target except this spell for its duration. You have ADV on the next spell you cast after this one ends.\n" +
            "If your deity is Ord, cast this spell with ADV.",
        duration: {type: "Focus"},
    },
    {
        name: "Stasis",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 4,
        desc: "A willing creature you touch becomes suspended in time. If the target is unwilling, it must be of LV 5 or less.\n" +
            "The target becomes unconscious and does not age. Its bodily functions cease, though it remains alive.\n" +
            "You may end the spell at any time or when a predefined condition you chose while casting the spell is met.",
        duration: {type: "Permanent"},
    },
    {
        name: "Telekinesis",
        range: "Far",
        class: "Wizard",
        tier: 4,
        desc: "You lift a creature or object with your mind. Choose a target that weights 1,000 pounds or less. You can move it a near distance in any direction and hold it in place.",
        duration: {type: "Focus"},
    },
    {
        name: "Thor's Thunder",
        range: "Far",
        class: "Seer",
        tier: 4,
        effect: {type: "Damage", diceType: "d6", numDice: 3},
        desc: "Thor casts down a bolt of lightning to strike one target. The target takes 3d6 damage.",
        duration: {type: "Instant"},
    },
    {
        name: "Unhinge",
        range: "Near",
        class: "Priest",
        alignment: "Chaotic",
        tier: 4,
        desc: "One creature in range of LV 5 or less descends into total madness. It spends its turn raving and stalking around uselessly.\n" +
            "If you successfully focus on this spell for 3 rounds in a row, the madness becomes permanent.\n" +
            "If your deity is The Lost, cast this spell with ADV.",
        duration: {type: "Focus"},
    },
    {
        name: "Vision",
        range: "Self",
        class: "Necromancer",
        tier: 4,
        desc: "You can only cast this spell while standing in a river.\n" +
            "The waters around you become the River of Death itself, and visions dance on its surface.\n" +
            "For the spell's duration, you can see and hear a creature or location you choose.\n" +
            "Treat a failed spellcasting check for this spell as a critical failure.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Wall Of Force",
        range: "Near",
        class: "Wizard",
        tier: 4,
        desc: "You lift your hands, conjuring a transparent wall of force. The thin wall must be contiguous and can cover a near-sized area in width and length.\n" +
            "You choose its shape. Nothing on the same plane can physically pass through the wall.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Wheel of Flames",
        range: "Near",
        class: "Priest",
        alignment: "Lawful",
        tier: 4,
        effect: {type: "Damage", diceType: "d6", numDice: 3},
        desc: "You summon a blazing wheel of flames and eyes that envelops one creature in holy energy.\n" +
            "The target takes 3d6 damage. If the target is a demon or devil, it must pass a DC 15 CHA check or be paralyzed for 3 rounds.",
        duration: {type: "Instant"},
    },
    {
        name: "Wrath",
        range: "Self",
        class: "Priest",
        tier: 4,
        desc: "Your weapons become magical +2 and deal an additional 1d8 damage for the spell's duration.",
        duration: {type: "Round", amt: 10},
    },
    // #################################################################################################################
    // ----------------------------------------------Tier 5 Spells------------------------------------------------------
    // #################################################################################################################
    {
        name: "Abjure",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 5,
        desc: "You and one creature you touch both die.",
        duration: {type: "Instant"},
    },
    {
        name: "Anathema",
        range: "Close",
        class: "Witch",
        tier: 5,
        desc: "All allies revile and abandon the creature you touch for 1 day. Each time you or your allies harm the target, its former allies may pass a DC 15 Wisdom check to end the effects of the spell.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Anchor",
        range: "Close",
        class: "Necromancer",
        tier: 5,
        desc: "One creature you touch of LV 10 or less becomes fixed to its location by a black thread that can only be cut by a silver or magic blade (this spell ends when it is severed).\n" +
            "The creature becomes comatose and immune to all harm while under the effects of this spell.",
        duration: {type: "Permanent"},
    },
    {
        name: "Antimagic Shell",
        range: "Self",
        class: "Wizard",
        tier: 5,
        desc: "An invisible, near-sized cube of null-magic appears centered on you. Within the cube, no spells can be cast.\n" +
            "Magic items and spells have no effect in the zone, and no magic can enter. The cube moves with you.\n" +
            "Spells such as dispel magic have no effect on it. Another antimagic shell does not affect this one.",
        duration: {type: "Focus"},
    },
    {
        name: "Balance",
        range: "Close",
        class: "Priest",
        alignment: "Neutral",
        tier: 5,
        desc: "One creature you touch of LV 10 or less becomes partially or fully petrified in the exact manner of your choosing (for instance, one limb, both eyes, whole body). You also become petrified in the exact same way.",
        duration: {type: "Instant"},
    },
    {
        name: "Create Undead",
        range: "Close",
        class: "Wizard, Necromancer",
        tier: 5,
        desc: "You conjure a vengeful undead creature to do your bidding. When you cast this spell, you choose to summon either a wight or wraith.\n" +
            "It appears next to you and is under your control. The undead creature acts on your turn. After 1 day, it melts away into smoke.",
        duration: {type: "Day", subType: "InGame", amt: 1},
    },
    {
        name: "Damnation",
        range: "Near",
        class: "Priest",
        alignment: "Chaotic",
        tier: 5,
        desc: "Choose one creature in range of LV 10 or less. You can only target the same creature with this spell one time.\n" +
            "The creature is cast into your god's domain. Unless the creature is a worthy follower of your god, it is trapped there to suffer eternal punishment.\n" +
            "You cannot cast this spell again until you complete penance.",
        duration: {type: "Instant"},
    },
    {
        name: "Death Ward",
        range: "Close",
        class: "Priest",
        alignment: "Lawful",
        tier: 5,
        desc: "You touch a living creature, sealing its life force against death itself. The target of this spell cannot go below 1 HP for the duration.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Disintegrate",
        range: "Far",
        class: "Wizard",
        tier: 5,
        desc: "A green ray shoots from your finger and turns a creature or object into ash.\n" +
            "A target creature of LV 5 or less instantly dies. If it is LV 6+, it takes 3d8 damage, instead.\n" +
            "A non-magical object up to the size of a large tree is destroyed.",
        duration: {type: "Instant"},
    },
    {
        name: "Divine Vengeance",
        range: "Self",
        class: "Priest",
        tier: 5,
        desc: "You become the divine avatar of your god's wrath, wreathed in holy flames or a black aura of smoldering corruption.\n" +
            "For the spell's duration, you can fly a near distance, your weapons are magical, and you have a +4 bonus to your weapon attacks and damage.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Dominion",
        range: "Near",
        class: "Priest",
        tier: 5,
        desc: "Mighty beings come to your aid. The beings must have a combined total of 16 levels or less.\n" +
            "Chaotic PCs summon demons/devils, and lawful or neutral PCs summon angels. The beings act of free will to aid you on your turn.\n" +
            "After 10 rounds, they return to their realms. You cannot cast this spell again until you complete penance.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Dust to Dust",
        range: "Near",
        class: "Necromancer",
        tier: 5,
        desc: "You command the spirits of the dead to seek their final rest.\n" +
            "All undead creatures of LV 10 or less within range must make a DC 15 CHA check. On a failure, they are destroyed.",
        duration: {type: "Instant"},
    },
    {
        name: "Dreamwalk",
        range: "Close",
        class: "Witch",
        tier: 5,
        desc: "You and any willing creatures you choose within close range step into the dream of a sleeping creature you name that is on your same plane.\n" +
            "You and anyone traveling with you can step out of the creature, appearing next to it as if having teleported there.",
        duration: {type: "Instant"},
    },
    {
        name: "Earthquake",
        range: "2xNear",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 5,
        desc: "The earth shakes violently and splits open, swallowing creatures down to their doom. All creatures standing on the ground within double near of you take 4d6 damage.\n" +
            "Each affected creature of LV 9 or less must pass a DEX check equal to the damage they took or else be swallowed by the earth, never to be seen again.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Enfeeble",
        range: "Close",
        class: "Witch",
        tier: 5,
        desc: "A creature you touch has a random stat reduced to 3 (-4) for one week. Roll a d6 to determine which stat:\n" +
            "1. Strength, 2. Dexterity, 3. Constitution, 4. Intelligence, 5. Wisdom, 6. Charisma.\n" +
            "If you fail the spellcasting check, you have a random stat reduced to 3 for a week instead.",
        duration: {type: "Day", amt: 1},
    },
    {
        name: "Feeblemind",
        range: "Near",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 5,
        desc: "One creature of LV 10 or less within range has its INT and CHA reduced to 1 for the duration. It can't cast spells.",
        duration: {type: "Day", roll: {numDice: 1, diceType: "d8"}},
    },
    {
        name: "Fifth Gate",
        range: "Near",
        class: "Necromancer",
        tier: 5,
        desc: "You can target one dying creature in range.\n" +
            "The target gains 5 rounds on its death timer. It becomes conscious and may act normally while dying.\n" +
            "If the creature would take damage while under the effects of this spell, it instead loses a round on its death timer.\n" +
            "If the creature dies while under the effects of this spell, it may make a DC 18 CON check. On a success, it returns to life at 1 HP.",
        duration: {type: "Instant"},
    },
    {
        name: "Finger of Death",
        range: "Close",
        class: "Witch",
        tier: 5,
        desc: "One creature you touch of LV 9 or less dies. Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.",
        duration: {type: "Instant"},
    },
    {
        name: "Harm",
        range: "Close",
        class: "Priest",
        alignment: "Chaotic",
        tier: 5,
        desc: "One creature you touch goes to 0 hit points. You cannot cast this spell again until you complete penance.",
        duration: {type: "Instant"},
    },
    {
        name: "Heal",
        range: "Close",
        class: "Priest",
        tier: 5,
        desc: "One creature you touch is healed to full HP. You cannot cast this spell again until you complete a rest.",
        duration: {type: "Instant"},
    },
    {
        name: "Hold Monster",
        range: "Near",
        class: "Wizard",
        tier: 5,
        desc: "You paralyze one creature you can see within range. If the target is LV 9+, it may make a STR check vs. your last spellcasting check at the start of its turn to end the spell.",
        duration: {type: "Focus"},
    },
    {
        name: "Judgement",
        range: "Close",
        class: "Priest",
        tier: 5,
        desc: "You instantly banish a creature you touch, sending it and all possessions it carries to face the judgment of your god.\n" +
            "You can banish an intelligent creature of LV 10 or less.\n" +
            "When the creature returns in 5 rounds, it has been healed to full HP if its deeds pleased your god. It has been reduced to 1 hit point if its deeds angered your god.\n" +
            "If your god can't judge its actions, it is unchanged.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Mother of Night",
        range: "Self",
        class: "Witch",
        tier: 5,
        desc: "You beseech the Mother of Night to lend you power. Make a single wish, stating it as exactly as possible.\n" +
            "Your wish occurs, as interpreted by the GM.\n" +
            "If you fail this spellcasting check, the Mother of Night pulls you into The Nightfall for judgment.\n" +
            "You can't cast this spell again until you appease her demands.",
        duration: {type: "Instant"},
    },
    {
        name: "Naming",
        range: "Close",
        class: "Wizard, Green Knight",
        alignment: "Neutral",
        tier: 5,
        desc: "You learn the True Name (Shadowdark RPG pg. 319) of one creature you touch.\n" +
            "If the creature is willing, you may give it a new True Name. A creature may only change its True Name once in its lifetime.\n" +
            "If it does so, its alignment changes to your alignment.",
        duration: {type: "Instant"},
    },
    {
        name: "Permanence",
        range: "Close",
        class: "Wizard",
        alignment: "Lawful",
        tier: 5,
        desc: "In order to cast this spell, you must sprinkle a powdered diamond on the target.\n" +
            "Choose one object in range that is currently under the effects of a spell you have cast.\n" +
            "The duration of that spell becomes 1 year. You cannot alter the original spell's effects after casting permanence.\n" +
            "For instance, you can no longer move an object under the effects of telekinesis.",
        duration: {type: "Year", amt: 1},
    },
    {
        name: "Plane Shift",
        range: "Close",
        class: "Priest, Wizard",
        tier: 5,
        desc: "You fold space and time, transporting yourself and all willing creatures within close range to a location on another plane of your choice.\n" +
            "Unless you have been to your intended location before, you appear in a random place on the destination plane.",
        duration: {type: "Instant"},
    },
    {
        name: "Power Word Kill",
        range: "Near",
        class: "Wizard",
        tier: 5,
        desc: "You utter the Word of Doom. One creature you target of LV 9 or less dies if it hears you.\n" +
            "Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.",
        duration: {type: "Instant"},
    },
    {
        name: "Prismatic Orb",
        range: "Far",
        class: "Wizard",
        tier: 5,
        effect: {type: "Damage", diceType: "d8", numDice: 3},
        desc: "You send a strobing orb of energy streaking toward a target within range.\n" +
            "Choose an energy type from fire, cold, or electricity. The orb deals 3d8 damage and delivers a concussive blast of the chosen energy type.\n" +
            "If the energy type is anathema to the target's existence (for example, cold energy against a fire elemental), the orb deals double damage to it, instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Prophecy",
        range: "Self",
        class: "Priest",
        tier: 5,
        desc: "You commune directly with your god for guidance. Ask the GM one question.\n" +
            "The GM answers the question truthfully using the knowledge your god possesses. Deities are mighty, but not omniscient.\n" +
            "You cannot cast this spell again until you complete penance.",
        duration: {type: "Instant"},
    },
    {
        name: "Ragnarok",
        range: "Far",
        class: "Seer",
        tier: 5,
        desc: "You look deep into the strands of fate, learning the final destiny of one soul after the battle of Ragnarok.\n" +
            "Do they live, or die? Choose one creature in range. You can only target the same creature with this spell one time.\n" +
            "That creature must pass a CON check equal to your spellcasting check or die instantly.",
        duration: {type: "Instant"},
    },
    {
        name: "Rapture",
        range: "Far",
        class: "Priest",
        alignment: "Lawful",
        tier: 5,
        desc: "The searing light of Law itself blazes out from you, washing over everything in sight.\n" +
            "All other creatures of LV 15 or less in range must pass a DC 15 CHA check or be permanently rendered mute and blind.\n" +
            "You cannot cast this spell again until you complete penance.",
        duration: {type: "Instant"},
    },
    {
        name: "Fifth Gate",
        range: "Close",
        class: "Necromancer",
        tier: 5,
        desc: "You can only cast this spell while standing in a river.\n" +
            "You briefly step into the River of Death, sliding between space and time itself.\n" +
            "You and any willing creatures you choose within close range teleport to another river you've stood in on your same plane.",
        duration: {type: "Instant"},
    },
    {
        name: "Root",
        range: "Close",
        class: "Priest",
        alignment: "Neutral",
        tier: 5,
        desc: "One creature you touch is immune to damage for the spell's duration.\n" +
            "You cannot cast this spell again until you complete penance.",
        duration: {type: "Focus"},
    },
    {
        name: "Scrying",
        range: "Self",
        class: "Wizard, Witch",
        tier: 5,
        desc: "You look into a crystal ball or reflecting pool, calling up images of a distant place.\n" +
            "For the spell's duration, you can see and hear a creature or location you choose that is on the same plane.\n" +
            "This spell is DC 18 to cast if you try to scry on a creature or location that is unfamiliar to you.\n" +
            "Each round, creatures you view may make a Wisdom check vs. your last spellcasting check.\n" +
            "On a success, they become aware of your magical observation.",
        duration: {type: "Focus"},
    },
    {
        name: "Shapechange",
        range: "Self",
        class: "Wizard, Witch",
        tier: 5,
        desc: "You transform yourself and any gear you carry into another natural creature you've seen of level 10 or less.\n" +
            "You assume the creature's physical statistics, but you retain your non-physical statistics (such as INT, WIS, and CHA).\n" +
            "If you go to 0 HP while under the effects of this spell, you revert to your true form at 1 HP.",
        duration: {type: "Focus"},
    },
    {
        name: "Soul Jar",
        range: "Close",
        class: "Witch",
        tier: 5,
        desc: "You transfer the soul of one creature you touch of LV 9 or less into a vessel, such as a jar.\n" +
            "The creature's body becomes comatose, but it doesn't die. If the vessel opens or breaks, the creature's soul returns to its body.\n" +
            "You can possess the empty body with your own spirit, taking control of it. Your body becomes comatose during this time.\n" +
            "If the body dies while you possess it, your soul returns to your body.",
        duration: {type: "Permanent", amt: 0},
    },
    {
        name: "Subjugate",
        range: "Close",
        class: "Wizard",
        alignment: "Chaotic",
        tier: 5,
        desc: "In order to cast this spell, you must sprinkle a powdered diamond on the target.\n" +
            "Choose one creature in range that is currently under the effects of a dominate, feeblemind, or polymorph spell you have cast.\n" +
            "The duration of that spell becomes 1 year.",
        duration: {type: "Year", amt: 1},
    },
    {
        name: "Summon Extraplanar",
        range: "Near",
        class: "Wizard",
        tier: 5,
        desc: "You reach into the outer planes, summoning forth a creature. You summon an elemental or outsider of LV 7 or less.\n" +
            "The creature is under your control and acts on your turn. If you lose focus on this spell, you lose control of the creature and it becomes hostile toward you and your allies.\n" +
            "You must pass a spellcasting check on your turn to return the creature to the outer planes.",
        duration: {type: "Focus"},
    },
    {
        name: "Teleport",
        range: "Close",
        class: "Wizard",
        tier: 5,
        desc: "You and any willing creatures you choose within close range teleport to a location you specify on your same plane.\n" +
            "You can travel to a known teleportation sigil or to a location you've been before.\n" +
            "Otherwise, you have a 50% chance of arriving off-target.",
        duration: {type: "Instant"},
    },
    {
        name: "Valkyrie",
        range: "Near",
        class: "Seer",
        tier: 5,
        desc: "You summon a valkyrie to your aid. She appears in a location within near and acts of her own free will to help you.\n" +
            "She returns to Valhalla when the spell ends. You can't cast this again until you complete penance.",
        duration: {type: "Round", amt: 10},
    },
    {
        name: "Wish",
        range: "Self",
        class: "Wizard",
        tier: 5,
        desc: "This mighty spell alters reality. Make a single wish, stating it as exactly as possible. Your wish occurs, as interpreted by the GM.\n" +
            "Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.",
        duration: {type: "Instant", amt: 5},
    },
    {
        name: "World Serpent",
        range: "Close",
        class: "Seer",
        tier: 5,
        desc: "The torturous venom of the World Serpent drips from the weapons of a creature you touch.\n" +
            "The target deals x2 damage with each attack (x4 on a critical hit) for the spell's duration.",
        duration: {type: "Focus"},
    },
    {
        name: "World Tree",
        range: "Close",
        class: "Seer",
        tier: 5,
        desc: "The roots of the life-giving World Tree wrap around the soul of a creature you touch. For the spell's duration, the target can't be brought below 1 HP.",
        duration: {type: "Focus"},
    },
    // #################################################################################################################
    // --------------------------------------------Ancestry "Spells"----------------------------------------------------
    // #################################################################################################################
    {
        name: "Stealthy",
        range: "Self",
        class: "Halfling, Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "you can become invisible.",
        duration: {type: "Round", amt: 3},
    },
    // #################################################################################################################
    // ----------------------------------------------Class "Spells"-----------------------------------------------------
    // #################################################################################################################
    {
        name: "Charge",
        range: "Self",
        class: "Desert Rider",
        tier: 0,
        roll: {numDice: 0, diceType: "d1"},
        uses: {type: "Day", max: 3},
        desc: "You can charge into combat by moving at least near before attacking. Each time you do this, your melee attacks deal double damage that round.",
        duration: {type: "Instant"},
    },
    {
        name: "Demonic Possession",
        range: "Self",
        class: "Knight of St. Ydris",
        tier: 0,
        stat: "LVL",
        roll: {numDice: 0, diceType: "d1"},
        uses: {type: "Day", max: 3},
        desc: "Gain a +1 bonus to your damage rolls that lasts 3 rounds. In addition, add half your level to the damage bonus (round down)",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Flourish",
        range: "Self",
        class: "Pit Fighter",
        tier: 0,
        roll: {numDice: 1, diceType: "d6"},
        uses: {type: "Day", max: 3},
        desc: "Regain 1d6 HP when you hit an enemy with a melee attack",
        duration: {type: "Instant"},
    },
    {
        name: "Herbalism",
        range: "Self",
        class: "Ranger",
        tier: 0,
        stat: "INT",
        desc: "Make an INT check to prepare an herbal remedy you choose. If you fail, you can't make that remedy again until you successfully rest. Unused remedies expire in 3 rounds.\n" +
            "• DC 11: Salve. Heals 1 HP\n" +
            "• DC 12: Stimulant. You can't be surprised for 10 rounds\n" +
            "• DC 13: Foebane. ADV on attacks and damage against one creature type you choose for 1d6 rounds\n" +
            "• DC 14: Restorative. Ends one poison or disease\n" +
            "• DC 15: Curative. Equivalent to a Potion of Healing",
        duration: {type: "Instant"},
    },
    {
        name: "Petrifying Gaze",
        range: "Self",
        class: "Basilisk Warrior",
        tier: 0,
        uses: {type: "Day", max: 1, metadata: {type: "max", stat: "CON"}},
        desc: "One creature of your level or less that meets your gaze must pass a DC 15 CON check or be petrified for 1d4 rounds. It still takes damage as normal while petrified.",
        duration: {type: "Round", roll: {numDice: 1, diceType: "d4"}},
    },
    {
        name: "Relentless",
        range: "Self",
        class: "Pit Fighter",
        tier: 0,
        stat: "CON",
        uses: {type: "Day", max: 3},
        desc: "When you are reduced to 0 HP, make a DC 18 CON check (Implacable applies). On success, you instead go to 1 HP",
        duration: {type: "Instant"},
    },
    {
        name: "Revive Familiar",
        range: "Self",
        class: "Witch",
        tier: 0,
        stat: "None",
        roll: {numDice: 1, diceType: "d4"},
        desc: "If your familiar dies, you can restore it to life by permanently sacrificing 1d4 HP",
        duration: {type: "Instant"},
    },
    {
        name: "Smoke Step",
        range: "Self",
        class: "Ras-Godai",
        tier: 0,
        stat: "None",
        roll: {numDice: 0, diceType: "d1"},
        uses: {type: "Day", max: 3},
        desc: "Teleport to a location you can see within near. This does not use your action",
        duration: {type: "Instant"},
    },
    {
        name: "Turn Undead",
        range: "Near",
        class: "Priest",
        tier: 0,
        desc: "You rebuke undead creatures, forcing them to flee. You must present a holy symbol to cast this spell.\n" +
            "Undead creatures within near of you must make a CHA check opposed by your spellcasting check.\n" +
            "If a creature fails by 10+ points and is equal to or less than your level, it is destroyed.\n" +
            "Otherwise, on a fail, it flees from you for 5 rounds.",
        duration: {type: "Instant"},
    },
    {
        name: "Omen",
        range: "Self",
        class: "Seer",
        tier: 0,
        uses: {type: "Day", max: 3},
        desc: "You can make a DC 9 WIS check. On a success, gain a luck token (you can't have more than one luck token at a time).",
        duration: {type: "Instant"},
    },
    {
        name: "Parry",
        range: "Self",
        class: "Duelist",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "An attack of your choice that would hit you misses instead.",
        duration: {type: "Instant"},
    },
    {
        name: "Scavenger",
        range: "Self",
        class: "Delver",
        tier: 0,
        stat: "None",
        roll: {numDice: 1, diceType: "d6"},
        desc: "When you expend the last of a consumable item you've carried since your last rest, roll a d6.\n" +
            "On a 5 or 6, you regain one use of that item.",
        duration: {type: "Instant"},
    },
    {
        name: "Rooted",
        range: "Self",
        class: "Green Knight",
        tier: 0,
        uses: {type: "Day", max: 3},
        desc: "Activate on your turn. Negate all damage you take until your next turn begins.",
        duration: {type: "Instant"},
    },
    {
        name: "Hawk Eye",
        range: "Self",
        class: "Kyzian Archer",
        tier: 0,
        uses: {type: "Day", max: 3},
        desc: "Add 1 + half your level (round down) to your next ranged attack and its damage roll.",
        duration: {type: "Instant"},
    },
    {
        name: "Sun On The Water",
        range: "Self",
        class: "Monk of Yag-Kesh",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "When a melee or ranged attack misses you, reflect the attack back at the source using the attacker's bonus.",
        duration: {type: "Instant"},
    },
    // #################################################################################################################
    // ----------------------------------------------Talent "Spells"----------------------------------------------------
    // #################################################################################################################
    {
        name: "Berserk",
        range: "Self",
        class: "Sea Wolf",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "Go berserk: immune to damage for 3 rounds.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Familiar TP",
        range: "Self",
        class: "Witch",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "Teleport to your familiar's location as a move.",
        duration: {type: "Instant"},
    },
    {
        name: "Ignore Damage",
        range: "Self",
        class: "Pit Fighter",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "Ignore all damage and effects from one attack.",
        duration: {type: "Instant"},
    },
    {
        name: "Parry Everything",
        range: "Self",
        class: "Duelist",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "All attacks that would hit you this round miss instead.",
        duration: {type: "Round", amt: 1},
    },
    {
        name: "One with the Forest",
        range: "Far",
        class: "Green Knight",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "Step into a tree and exit from another within far.",
        duration: {type: "Round", amt: 1},
    },
    {
        name: "Sprint",
        range: "Far",
        class: "Monk of Yag-Kesh",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "Double your movement speed for 3 rounds.",
        duration: {type: "Round", amt: 3},
    },
    // #################################################################################################################
    // ------------------------------------------------Boon "Spells"----------------------------------------------------
    // #################################################################################################################
    {
        name: "Rage",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "gain advantage on melee attacks.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Transform: Dire Wolf",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "You can transform into a dire wolf.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Rewind",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "force the GM to reroll a single roll.",
        duration: {type: "Instant"},
    },
    {
        name: "Outwit",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "add your WIS bonus to any roll.",
        duration: {type: "Instant"},
    },
    {
        name: "Double team",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 5},
        desc: "Create an illusory duplicate of yourself for up to 5 rds/day.",
        duration: {type: "Round", amt: 1},
    },
    {
        name: "Transform: Cuoatl",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "turn into a cuoatl.",
        duration: {type: "Round", amt: 5},
    },
    {
        name: "Transform: Slime",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "turn into a crawling puddle of slime.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Prayer",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "use your action to pray and be restored to full HP.",
        duration: {type: "Instant"},
    },
    {
        name: "Brutality",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "double all damage you deal.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Mind read",
        range: "Close",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "read the mind of a creature you touch.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Hypnotize",
        range: "Self",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "hypnotize a LV 5 or less creature.",
        duration: {type: "Round", amt: 3},
    },
    {
        name: "Teleportation",
        range: "Far",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "teleport to a far location you see as your move.",
        duration: {type: "Instant"},
    },
    {
        name: "Terrify",
        range: "Close",
        class: "Warlock",
        tier: 0,
        uses: {type: "Day", max: 1},
        desc: "force a close being to check morale, even if immune.",
        duration: {type: "Instant"},
    },
]

const SPELL_COMPENDIUM: { [name: string]: SpellInfo } = {}
for (const s of SPELLS) {
    SPELL_COMPENDIUM[s.name.toLowerCase()] = s
}
export default SPELL_COMPENDIUM
