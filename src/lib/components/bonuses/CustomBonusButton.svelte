<script lang="ts">
    import Modal from "../Modal.svelte"
    import CustomBonusForm from "./CustomBonusForm.svelte"
    import type {Bonus, GearInfo} from "../../types"

    let showForm = false
    let showModal = false
    export let bonuses: Bonus[] = undefined
</script>

<button
        class="w-full bg-black text-white p-2"
        on:click={() => {
            showForm = true
            showModal = true
        }}>Custom Bonus
</button
>

{#if showForm}
    <Modal bind:showModal>
        <h1 slot="header">Custom Bonus</h1>
        <CustomBonusForm bind:bonuses={bonuses}
                on:finish={() => {
                    showForm = false
                }}
        />
    </Modal>
{/if}
