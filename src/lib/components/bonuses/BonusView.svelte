<script lang="ts">
    import {
        addBonusToList,
        calculateBonusAmount,
        deleteBonusForList,
        deleteBonusForPlayer, getCapForStatMod,
        pc,
    } from "../../model/PlayerCharacter"
    import type {Bonus} from "../../types"
    import {addSign} from "../../utils"
    import Modal from "../Modal.svelte"
    import {addBonusToPlayer} from "../../model/PlayerCharacter.js"
    import Labelled from "../Labelled.svelte"

    export let bonus: Bonus
    export let showInfo = true
    export let bonuses: Bonus[] = undefined
    let showModal = false
    $: b = bonus

    $: displayableName = b.metadata?.type && b.metadata[b.metadata.type]
        ? `${b.metadata[b.metadata.type]}:` : ""

    function plusBonus() {
        if (bonuses?.length >= 0) {
            bonuses = addBonusToList(bonuses, b, 1)
            $pc = $pc
        } else {
            $pc = addBonusToPlayer($pc, b, 1)
        }
    }

    function minusBonus() {
        if (bonuses?.length >= 0) {
            bonuses = addBonusToList(bonuses, b, -1)
            $pc = $pc
        } else {
            $pc = addBonusToPlayer($pc, b, -1)
        }
    }

    function deleteB() {
        if (bonuses?.length >= 0) {
            bonuses = deleteBonusForList(bonuses, b)
            $pc = $pc
        } else {
            $pc = deleteBonusForPlayer($pc, b)
        }
    }

    function deleteBonus() {
        if ($pc.ancestry === "Elf") {
            if (["Ranged Farsight", "Spell Farsight"].includes(b.name)) {
                deleteB()
                $pc.bonuses.find((x) => x.name === "Farsight").inactive = false
            } else if (b.name === "Farsight") { // deactivate select, reactivatable if player wants to respec
                b.inactive = true
            }
            $pc = $pc
        } else {
            deleteB()
        }
    }

    function selectedBonus(pointerEvent) {
        if (b.type === "select") {
            deleteBonus()
            let bonus = b.bonuses.find((x) => x.name === pointerEvent.target.value)
            $pc = addBonusToPlayer($pc, bonus)
        }
    }
</script>

<div class="flex justify-between gap-3 items-center">
    <div class="flex gap-1">
        {#if b.type === "select" && b.bonuses}
            <select on:change={selectedBonus}>
                {#each b.bonuses as bonus}
                    <option value={bonus.name}>
                        {bonus.desc}
                    </option>
                {/each}
            </select>
        {:else if b.type === "generic"}
            {#if b.desc.length > 100}
                <div class="font-bold">{b.name}</div>
            {:else}
                <div>{b.desc}</div>
            {/if}
        {:else}
            <div class="font-bold">{displayableName}</div>
            {#if b.type === "modifyAmt"}
                <div>{addSign(calculateBonusAmount($pc, b))} to {b.bonusTo}</div>
            {:else if b.type === "diceAmount"}
                <div>{addSign(b.bonusAmount)}{b.diceType}</div>
            {:else if b.type === "disadvantage" || b.type === "advantage"}
                <div>{b.type} on {b.bonusTo}s</div>
            {:else if b.type === "diceType"}
                <div>{b.diceType} on {b.bonusTo}</div>
            {:else if (b.type === "min" || b.type === "max") && b.metadata?.type === "statMod"}
                <div>{addSign(getCapForStatMod($pc, b.metadata.statMod, b.type))} to modifier {b.type}</div>
            {:else if (b.type === "min" || b.type === "max") && b.metadata?.type === "stat"}
                <div>{addSign(getCapForStatMod($pc, b.metadata.stat, b.type))} to stat {b.type}</div>
            {:else if b.type === "setToAmt" && b.metadata?.type === "stat"}
                <div>base amount is {b.setTo}</div>
            {/if}
        {/if}
        {#if showInfo}
            <button on:click={() => { showModal = true }}>
                <i class="material-icons">info</i>
            </button>
        {/if}
    </div>
    {#if b.editable}
        <div class="flex gap-1">
            {#if ["modifyAmt", "diceType", "diceAmount", "min", "max", "setToAmt"].includes(b.type)}
                <button class="pt-1 px-1 rounded-md bg-black text-white" on:click={plusBonus}>
                    <i class="material-icons">add</i>
                </button>
                <button class="pt-1 px-1 rounded-md bg-black text-white" on:click={minusBonus}>
                    <i class="material-icons">remove</i>
                </button>
            {/if}
            <button class="pt-1 px-1 rounded-md bg-black text-white" on:click={deleteBonus}>
                <i class="material-icons">delete</i>
            </button>
        </div>
    {/if}
</div>

{#if showModal}
    <Modal bind:showModal>
        <h2 slot="header">{b.name}</h2>
        <Labelled label="Description" text={b.desc}/>
        <Labelled label="Source" text={b.bonusSource ?? "none"}/>
        <Labelled label="Editable" text={b.editable ? "yes" : "no"}/>
    </Modal>
{/if}
