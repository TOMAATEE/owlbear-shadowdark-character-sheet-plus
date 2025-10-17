<script lang="ts">
    import {
        calculateTotalHitPointsForPlayer, hasAdvantageOn,
        PlayerCharacterStore as pc,
    } from "../model/PlayerCharacter";
    import RollButton from "./RollButton.svelte";
    import type {Class} from "../types";
    import {clamp} from "../utils";

    function getClassHpDice(c: Class) {
        switch (c) {
            case "Thief":
            case "Witch":
            case "Wizard":
                return "d4";
            case "Bard":
            case "Knight of St. Ydris":
            case "Priest":
            case "Ras-Godai":
            case "Seer":
            case "Warlock":
            default: // Custom classes
                return "d6";
            case "Basilisk Warrior":
            case "Desert Rider":
            case "Pit Fighter":
            case "Fighter":
            case "Ranger":
            case "Sea Wolf":
                return "d8";
        }
    }

    function addRolledHp(e: CustomEvent<{ result: number }>) {
        $pc.maxHitPoints += e.detail.result;
        $pc.hitPoints += e.detail.result;
    }

    function incrMaxHp() {
        $pc.maxHitPoints += 1;
    }

    function decrMaxHp() {
        $pc.maxHitPoints = Math.max(1, $pc.maxHitPoints - 1);
        if ($pc.hitPoints > $pc.maxHitPoints) {
            $pc.hitPoints = $pc.maxHitPoints;
        }
    }

    function longRest() {
        $pc.hitPoints = $pc.maxHitPoints;
        $pc.spells = $pc.spells.map(s => ({
            ...s,
            uses: s.uses ? { ...s.uses, used: 0 } : s.uses,
            disabled: false
        }));
    }

    function clampHp() {
        $pc.hitPoints = clamp($pc.hitPoints, 0, $pc.maxHitPoints)
    }
    $: clampHp()
</script>

<div class="items-center flex gap-7">
    <h2>HP</h2>&nbsp;&nbsp;<RollButton diceType={getClassHpDice($pc.class)} display="dice" advantage={hasAdvantageOn($pc, "hpRoll")} on:rolled={addRolledHp}/>
</div>
<label for="hitpoints"/>
<input
        id="hitpoints"
        type="number"
        inputmode="numeric"
        class="pirata text-5xl text-center"
        min="0"
        bind:value={$pc.hitPoints}
/>

<div class="flex gap-1 justify-between">
    <div>Max: {calculateTotalHitPointsForPlayer($pc)}</div>
    <div>
        <button on:click={decrMaxHp}><i class="material-icons">remove</i></button>
        <button on:click={incrMaxHp}><i class="material-icons">add</i></button>
    </div>
</div>

<button
        class="bg-black text-white rounded-md text-sm self-center px-2"
        on:click={longRest}>Long Rest
</button>
