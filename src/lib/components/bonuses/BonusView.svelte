<script lang="ts">
    import {
        addBonusToList,
        calculateBonusAmount,
        deleteBonusForList,
        deleteBonusForPlayer,
        pc,
    } from "../../model/PlayerCharacter"
    import type {Bonus} from "../../types"
    import {addSign} from "../../utils"
    import Modal from "../Modal.svelte"
    import {addBonusToPlayer} from "../../model/PlayerCharacter.js"

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

    function deleteBonus() {
        if (bonuses?.length >= 0) {
            bonuses = deleteBonusForList(bonuses, b)
            $pc = $pc
        } else {
            $pc = deleteBonusForPlayer($pc, b)
        }
    }
</script>

<div class="flex justify-between gap-3 items-center">
    <div class="flex gap-1">
        {#if b.type === "generic"}
            <div>{b.desc}</div>
        {:else if b.type === "modifyAmt"}
            <div class="font-bold">{displayableName}</div>
            <div>{addSign(calculateBonusAmount($pc, b))} to {b.bonusTo}</div>
        {:else if b.type === "diceAmount"}
            <div class="font-bold">{displayableName}</div>
            <div>{addSign(b.bonusAmount)}{b.diceType}</div>
        {:else if b.type === "disadvantage" || b.type === "advantage"}
            <div class="font-bold">{displayableName}</div>
            <div>{b.type} on {b.bonusTo}s</div>
        {:else if b.type === "diceType"}
            <div class="font-bold">{displayableName}</div>
            <div>{b.diceType} on {b.bonusTo}</div>
        {/if}
        {#if showInfo}
            <button on:click={() => { showModal = true }}>
                <i class="material-icons">info</i>
            </button>
        {/if}
    </div>
    {#if b.editable}
        <div class="flex gap-1">
            {#if ["modifyAmt", "diceType", "diceAmount"].includes(b.type)}
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
        <div>Description: {b.desc}</div>
        <div>Source: {b.bonusSource ?? "none"}</div>
        <div>Editable: {b.editable ?? "no"}</div>
    </Modal>
{/if}
