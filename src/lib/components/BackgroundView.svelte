<script lang="ts">
    import {BACKGROUNDS} from "../constants";
    import {
        PlayerCharacterStore as pc,
        setBackgroundForPlayer,
    } from "../model/PlayerCharacter";
    import type {Background} from "../types";

    function onToggleCustomBackground(e: Event) {
        $pc.hasCustomBackground = (e.target as HTMLInputElement).checked;
    }

    function onBackgroundChange(e: Event) {
        const a: Background = (e.target as HTMLSelectElement).value as Background;
        setBackgroundForPlayer($pc, a);
        $pc = $pc;
    }
</script>

<div class="flex justify-between">
    <h2>BACKGROUND</h2>
    <div class="flex items-center gap-1">
        <input
                id="customBackground"
                type="checkbox"
                checked={$pc.hasCustomBackground}
                on:input={onToggleCustomBackground}
        />
        <label for="customBackground">Custom</label>
    </div>
</div>
{#if $pc.hasCustomBackground}
    <input type="text" value={$pc.background} on:input={onBackgroundChange}/>
{:else}
    <select value={$pc.background} on:change={onBackgroundChange}>
        {#each Object.entries(BACKGROUNDS) as [background, description]}
            <option value={background} title={description}>
                {background}
            </option>
        {/each}
    </select>
{/if}
