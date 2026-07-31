<script lang="ts">
    import RollButton from "./RollButton.svelte"
    import {
        PlayerCharacterStore,
        calculateBonusForPlayerStat,
        calculateModifierForPlayerStat,
        calculateStatValueForPlayerStat, getCapForStat,
    } from "../model/PlayerCharacter"
    import type {Stat} from "../types"
    import {clamp} from "../utils";

    export let forStat: Stat
    const pc = PlayerCharacterStore
    $: modifier = calculateModifierForPlayerStat($pc, forStat)
    $: statValue = clamp(calculateStatValueForPlayerStat($pc, forStat), 1 + getCapForStat($pc, forStat, "min"), 20 + getCapForStat($pc, forStat, "max"))

    function onInput(e: Event) {
        $pc.stats[forStat] =
            parseInt((e.target as HTMLInputElement).value) -
            calculateBonusForPlayerStat($pc, forStat)
    }
</script>

<div class="flex flex-col">
    <label for="{`${forStat}-input}`}"/>
    <h2>{forStat}</h2>
    <div class="sheet-stat flex gap-1 items-center">
        <input
                id={`${forStat}-input}`}
                type="number"
                inputmode="numeric"
                value={statValue}
                on:input={onInput}
                min='{1 + getCapForStat($pc, forStat, "min")}'
                max='{20 + getCapForStat($pc, forStat, "max")}'
                class="w-1/2"
        />&nbsp/&nbsp<RollButton {modifier}/>
    </div>
</div>

<style>
</style>
