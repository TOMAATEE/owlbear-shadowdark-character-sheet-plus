<script lang="ts">
    import {DEITIES} from "../constants"
    import {
        PlayerCharacterStore as pc,
        setDeityForPlayer,
    } from "../model/PlayerCharacter"
    import type {Deity} from "../types"

    function onToggleCustomDeity(e: Event) {
        $pc.hasCustomDeity = (e.target as HTMLInputElement).checked
    }

    function onDeityChange(e: Event) {
        const a: Deity = (e.target as HTMLSelectElement).value as Deity
        setDeityForPlayer($pc, a)
        $pc = $pc
    }
</script>

<div class="flex justify-between">
    <h2>DEITY</h2>
    <div class="flex items-center gap-1">
        <input
                id="customDeity"
                type="checkbox"
                checked={$pc.hasCustomDeity}
                on:input={onToggleCustomDeity}
        />
        <label for="customDeity">Custom</label>
    </div>
</div>
{#if $pc.hasCustomDeity}
    <input type="text" value={$pc.deity} on:input={onDeityChange}/>
{:else}
    <select value={$pc.deity} on:change={onDeityChange}>
        {#each DEITIES as deity}
            <option value={deity}>
                {deity}
            </option>
        {/each}
    </select>
{/if}
