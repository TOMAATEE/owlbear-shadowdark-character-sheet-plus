<script lang="ts">
    import Modal from "../Modal.svelte";
    import {pc, unlearnSpellForPlayer} from "../../model/PlayerCharacter";
    import {rollDice, rollDiceA, sum, toPlusString} from "../../utils";
    import {MISHAPS} from "../../compendium/mishapCompendium";
    import {SPELL_TIERS} from "../../constants";
    import type {Mishap, MishapClass, SpellTier} from "../../types";

    let showModal = false;

    $: if (!showModal) {
        reset();
    }

    let rolled = false;
    let highlight = -1;
    let nat1highlights: number[];
    let total: number
    let tier: SpellTier = 1;
    let selectedClass: MishapClass = $pc.mishapTable;
    let options: Mishap[];
    let msg: string;
    let affected = []

    reloadMishaps()

    function rollMishap() {
        reset()
        const roll =  rollDice("d12")
        rolled = true;
        highlight = roll - 1
        if (roll === 1) {
            let one = 1
            let two = 1
            while (one === 1) {
                one =  rollDice("d12")
            }
            while (two === 1) {
                two =  rollDice("d12")
            }
            nat1highlights = [one - 1, two - 1]
        }
    }

    function setOptionsForHighlight() {
        if (highlight === 0 && nat1highlights) { // nat 1 is always 2 mishaps, highlight all for clarity
            let highlight1 = options[nat1highlights[0]];
            let highlight2 = options[nat1highlights[1]];
            msg = ""
            msg += getMishapEffect(highlight1)
            msg += (msg.length > 0 ? "\n" : "") + getMishapEffect(highlight2)
            if (!highlight1.roll && !highlight1.target && !highlight2.roll && !highlight2.target) msg = undefined
        } else {
            const highlightedMishap = options[highlight];
            msg = getMishapEffect(highlightedMishap)
        }
    }

    function getMishapEffect(mishap: Mishap) {
        if (mishap.target) {
            switch (mishap.target.category) {
                case "Gear":
                    let gears = []
                    if ($pc.gear.length > (mishap.target.amount as number)) {
                        for (let i = 0; i < (mishap.target.amount as number);) {
                            const gear = $pc.gear[Math.floor(Math.random() * $pc.gear.length)].name
                            if (!affected.includes(gear) && !gears.includes(gear) && gear !== "Backpack") {
                                gears.push(gear)
                                i++
                            }
                        }
                    } else {
                        gears = $pc.gear.map(g => g.name)
                    }
                    affected.push(...gears)
                    return `${mishap.name}: ${mishap.target.type} ${mishap.target.category}: ${gears.join(", ")}`
                case "Spell":
                    let spells = []
                    if (mishap.target.amount === "tier") {
                        spells = $pc.spells.filter(s => s.tier === tier).map(s => s.name)
                    } else if (mishap.target.amount === "randomTier") {
                        spells = $pc.spells.filter(s => s.tier === Math.floor(Math.random() * 5) + 1).map(s => s.name)
                    } else {
                        if ($pc.spells.length > mishap.target.amount) {
                            for (let i = 0; i < mishap.target.amount;) {
                                const spell = $pc.spells[Math.floor(Math.random() * $pc.spells.length)]
                                if (!affected.includes(spell.name) || !spells.includes(spell.name) || spell.tier !== 0) {
                                    spells.push(spell.name)
                                    i++
                                }
                            }
                        } else {
                            spells = $pc.spells.filter(s => s.tier !== 0).map(s => s.name)
                        }
                    }
                    affected.push(...spells)
                    return `${mishap.name}: ${mishap.target.type} ${mishap.target.category}: ${spells.join(", ")}`
            }
        } else if (mishap.roll) {
            let diceAmount = mishap.roll.numDice
            if (diceAmount === -1) diceAmount = tier

            const effect = rollDiceA(mishap.roll.diceType, diceAmount)
            total = sum(effect)
            const unit = mishap.roll.type + (["Damage", "Heal", "Amount"].includes(mishap.roll.type) || total === 1 ? "" : "s")
            return `${mishap.name}: ${toPlusString(effect, false)} = ${total} ${unit}`
        }
        return ""
    }

    function updateSheet() {
        if (highlight === 0 && nat1highlights) { // nat 1 is always 2 mishaps
            let mishap1 = options[nat1highlights[0]]
            let mishap2 = options[nat1highlights[1]]
            updatePerMishap(mishap1)
            updatePerMishap(mishap2)
        } else {
            let mishap1 = options[highlight]
            updatePerMishap(mishap1)
        }
        $pc = $pc;
        showModal = false;
    }

    function updatePerMishap(mishap: Mishap) {
        console.log(affected)
        if (mishap.target) {
            switch (mishap.target.category) {
                case "Gear":
                    affected.forEach(gear => deleteGear(gear))
                    break
                case "Spell":
                    if (mishap.target.type === "delete") {
                        affected.forEach(spell => unlearnSpellForPlayer($pc, spell))
                    } else if (mishap.target.type === "disable") {
                        $pc.spells.forEach(s => {
                            if (affected.includes(s.name)) s.disabled = true;
                        });
                    }
                    break
            }
        } else if (mishap.roll) {
            if (mishap.roll.type === "Damage") {
                $pc.hitPoints -= total
            }
        }
    }

    function deleteGear(name: string) {
        const idx = $pc.gear.findIndex((g) => g.name === name);
        const g = $pc.gear[idx];
        if (g) {
            if (g.quantity > 1) {
                g.quantity -= 1;
            } else {
                $pc.gear.splice(idx, 1);
            }
            $pc = $pc;
        }
    }

    function reloadMishaps() {
        options = MISHAPS[selectedClass].filter((m) => m.tiers.includes(tier));
        reset()
    }

    $: if (highlight > -1) {
        setOptionsForHighlight();
    }

    function reset() {
        affected = []
        highlight = -1;
        rolled = false;
        total = 0
        nat1highlights = undefined
        msg = undefined
    }
</script>

<button
        class="bg-black text-white w-40 p-1"
        on:click={() => (showModal = true)}>Roll Mishap
</button>

<Modal bind:showModal>
    <h2 slot="header" class="text-lg">Roll Mishap</h2>
    <select bind:value={selectedClass} on:change={reloadMishaps}>
        {#each Object.keys(MISHAPS) as c}
            <option value={c}>{c}</option>
        {/each}
    </select>
    <select bind:value={tier} on:change={reloadMishaps}>
        {#each SPELL_TIERS.filter(t => t !== 0) as tier}
            <option value={tier}>Tier {tier}</option>
        {/each}
    </select>
    <table>
        <tr class="text-left border-b border-black">
            <th class="w-20">1d12</th>
            <th>Effect</th>
        </tr>
        {#each options as o, i}
            <tr class="border-b border-black" class:bg-yellow-300={highlight === i} class:bg-yellow-200={nat1highlights && nat1highlights.includes(i)}>
                <td>{i + 1}</td>
                <td class="align-top leading-snug">
                    <span class="font-bold mr-1 whitespace-nowrap">{o.name}</span>
                    <span class="break-words">{o.desc}</span>
                </td>
            </tr>
        {/each}
    </table>
    <button class="w-full bg-black text-white p-1" on:click={rollMishap}>
        {rolled ? "REROLL" : "ROLL"}
    </button>
    {#if rolled}
        <button class="w-full bg-black text-white p-1" on:click={updateSheet}>
            Update Sheet
        </button>
        {#if msg}
            {msg}
        {/if}
    {/if}
</Modal>

<style lang="postcss">
    select {
        @apply my-1;
    }
</style>
