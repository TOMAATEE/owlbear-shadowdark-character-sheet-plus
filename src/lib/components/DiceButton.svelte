<script lang="ts">
    import Modal from "./Modal.svelte"
    import {rollCustomDiceArray, sum, toPlusString} from "../utils";
    import {notify} from "../services/Notifier";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()

    let showModal = false
    let amount = 1
    let sides = 6
    let modifier = 0
    let secret: boolean = false
    let brackets: boolean = false
    let advantage: boolean = false
    let disadvantage: boolean = false

    function roll() {
        console.log("advantage:", advantage, "disadvantage:", disadvantage)
        const roll1 = rollCustomDiceArray(sides, amount)
        let roll2 = []
        let result = 0
        let msg = `rolled ${amount}d${sides}: ${toPlusString(roll1, brackets)}`
        if (advantage || disadvantage) {
            roll2 = rollCustomDiceArray(sides, amount)
            result = advantage ? Math.max(sum(roll1), sum(roll2)) : Math.min(sum(roll1), sum(roll2))
            msg += ` vs. ${toPlusString(roll2, brackets)}`
        }
        result = result > 0 ? result : sum(roll1)
        msg += `\n ${result} + ${modifier} = ${result + modifier}`
        notify(msg, {secret})
        if (!secret) {
            dispatch("rolled", { result })
        }
    }
</script>

<button class="bg-black text-white px-1" on:click={() => (showModal = true)}>
    <i class="material-icons translate-y-1">casino</i>
</button>

<Modal bind:showModal>
    <h1 slot="header">Roll Dice</h1>
    <input id="amount" class="text-right" style="width: 4rem" type="number" bind:value={amount}/> d <input type="number" style="width: 4rem" bind:value={sides}/> + <input type="number" style="width: 4rem" bind:value={modifier}/>
    <div class="justify-between gap-1">
        <input type="checkbox" id="secret" bind:checked={secret}/>
        <label for="secret">Secret</label>
        <input type="checkbox" id="brackets" bind:checked={brackets}/>
        <label for="brackets">Brackets</label>
    </div>
    <div class="justify-between gap-1">
        <input type="checkbox" id="advantage" bind:checked={advantage} on:change={() => advantage && (disadvantage = false)}/>
        <label for="advantage">Advantage</label>
        <input type="checkbox" id="disadvantage" bind:checked={disadvantage} on:change={() => disadvantage && (advantage = false)}/>
        <label for="disadvantage">Disadvantage</label>
    </div>
    <button class="w-full bg-black text-white p-1" on:click={roll}>
        ROLL
    </button>
</Modal>
