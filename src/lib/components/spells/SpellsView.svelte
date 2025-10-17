<script lang="ts">
    import {
        calculateSpellCastingModifierForPlayer, calculateSpellDiceAmount, calculateSpellMax,
        pc,
    } from "../../model/PlayerCharacter";
    import CustomSpellButton from "./CustomSpellButton.svelte";
    import RollButton from "../RollButton.svelte";
    import SpellsButton from "./SpellsButton.svelte";
    import SpellInfoButton from "./SpellInfoButton.svelte";
    import type {SpellInfo} from "../../types";
    import RollMishapButton from "./RollMishapButton.svelte";
    import {MISHAPS} from "../../compendium/mishapCompendium.js";

    $: spells = $pc.spells.map(
        (spell) => {
            if (!spell) return null;

            if (spell.uses && spell.uses.used == null) {
                spell.uses.used = 0;
            }
            return spell;
        }).filter(Boolean);
    $: hasSpells = spells?.length > 0;

    function toggleFailed(s: SpellInfo) {
        const idx = $pc.spells.findIndex((spell) => spell.name === s.name);

        if (idx === -1) {
            s.disabled = true;
            $pc.spells.push(s);
        } else {
            $pc.spells[idx].disabled = !$pc.spells[idx].disabled;
        }
    }

    function hasFailedSpellcast(s: SpellInfo): boolean {
        const idx = $pc.spells.findIndex((spell) => spell.name === s.name);
        return idx !== -1 && $pc.spells[idx].disabled;
    }

    function isDisabled(s: SpellInfo) {
        return hasFailedSpellcast(s) || (s.uses && s.uses.used >= s.uses.max)
    }
</script>

<div class="flex justify-between my-0.5">
    <h2>Spells</h2>
    {#if $pc.mishapTable in MISHAPS}
        <RollMishapButton/>
    {/if}
</div>
{#if hasSpells}
    <ul>
        {#each spells as spell}
            {@const mod = calculateSpellCastingModifierForPlayer($pc, spell)}
            <li>
                <div class="flex items-center justify-between border-b border-gray-400">
                    <div class="flex gap-1">
                        <div>{spell.name}</div>
                        <SpellInfoButton {spell}/>
                    </div>
                    {#if spell.uses}
                        <div class="ml-auto mr-4">
                            <input class="w-12 text-right" type="number" bind:value="{spell.uses.used}"> /{calculateSpellMax($pc, spell)}
                        </div>
                    {/if}
                    <div class="flex items-center gap-2">
                        <input
                                title="spellcasting failed"
                                type="checkbox"
                                class="w-6 h-6"
                                checked={isDisabled(spell)}
                                on:click={() => toggleFailed(spell)}
                        />
                        <RollButton
                                spell={spell}
                                disabled={isDisabled(spell)}
                                modifier={mod}
                                numDice={calculateSpellDiceAmount($pc, spell)}
                                diceType={spell.roll?.diceType ?? "d20"}
                                on:rolled={() => {if (spell.uses) spell.uses.used += 1}}
                        />
                    </div>
                </div>
            </li>
        {/each}
    </ul>
{/if}

<div class="flex gap-1 my-0.5">
    <SpellsButton/>
    <CustomSpellButton/>
</div>
