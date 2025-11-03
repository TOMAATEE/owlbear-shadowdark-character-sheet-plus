<script lang="ts">
    import CustomGearButton from "./CustomGearButton.svelte"
    import GearButton from "./GearButton.svelte"
    import {findAny} from "../../compendium"
    import {calculateGearSlotsForPlayer, pc} from "../../model/PlayerCharacter"
    import {sortAlphabetically, gearCostToTotal, playerMoneyToTotal, totalToPlayerMoney} from "../../utils"
    import type {Gear} from "../../types"
    import MenuOption from "../Menu/MenuOption.svelte"
    import Menu from "../Menu/Menu.svelte"

    // variables for right click menu
    let showMenu = false
    let menuType: "Delete" | "Sell"
    let pos = {x: 0, y: 0}
    let relevantGear: Gear
    let perStack: number

    const COIN_NAME = "Extra Coins"
    $: costlyGear = $pc.gear
        .filter((g) => findAny(g.name)?.slots.freeCarry === 0)
        .sort((a, b) => sortAlphabetically(a.name, b.name))

    $: totalCoins = $pc.gold + $pc.silver + $pc.copper

    $: if (costlyGear && totalCoins > 100) {
        costlyGear.push({
            name: COIN_NAME,
            quantity: totalCoins - 100,
        })
    }

    $: freeGear = $pc.gear
        .filter((g) => findAny(g.name)?.slots.freeCarry)
        .sort((a, b) => sortAlphabetically(a.name, b.name))

    $: totalSlots = calculateGearSlotsForPlayer($pc)

    $: freeSlots =
        totalSlots -
        costlyGear.reduce((acc, curr) => {
            return acc + slotsForGear(curr)
        }, 0)

    function slotsForGear(g: Gear): number {
        if (g.name === COIN_NAME) {
            return Math.ceil(g.quantity / 100)
        }

        const foundGear = findAny(g.name)
        return Math.ceil(g.quantity / foundGear.slots.perSlot) * foundGear.slots.slotsUsed
    }

    function deleteGear(name: string, amount = 1) {
        const idx = $pc.gear.findIndex((g) => g.name === name)
        const g = $pc.gear[idx]
        if (g.quantity > amount) {
            g.quantity -= amount
        } else {
            $pc.gear.splice(idx, amount)
        }
        $pc = $pc
    }

    function sellGear(name: string, quantity = 1) {
        const idx = $pc.gear.findIndex((g) => g.name === name)
        const item = $pc.gear[idx]
        if (item.quantity < quantity) quantity = item.quantity

        let g = findAny(name)
        let pcTotal = playerMoneyToTotal($pc)
        let costTotal = gearCostToTotal(g, quantity)
        pcTotal += costTotal
        totalToPlayerMoney($pc, pcTotal)
        deleteGear(g.name, quantity)
    }

    function toggleEquipped(g: Gear) {
        g.equipped = !g.equipped
        $pc = $pc
    }

    function canInteractWithGear(_gear: Gear): boolean {
        return true
        // as nice as this is, it is ultimately limiting to the player's creativity
        // if (gear.equipped) return true
        // return gear.equipped || canPlayerEquipGear($pc, gear)
    }

    function exchange(from: "silver" | "copper", to: "gold" | "silver") {
        if ($pc[from] > 9) {
            $pc[to] += Math.floor($pc[from] / 10)
            $pc[from] %= 10
        } else if ($pc[from] < 0) {
            const deficit = Math.ceil(Math.abs($pc[from]) / 10)
            $pc[to] -= deficit
            $pc[from] += deficit * 10
        }
    }

    function exchangeSToG() {
        exchange("silver", "gold")
    }

    function exchangeCToS() {
        exchange("copper", "silver")
    }

    async function onRightClick(type: "Delete" | "Sell", gear: Gear, event: MouseEvent) {
        window.dispatchEvent(new CustomEvent("closeAllContextMenus"))
        if (showMenu) {
            showMenu = false
            await new Promise((res) => setTimeout(res, 100))
        }
        menuType = type
        relevantGear = gear
        perStack = findAny(relevantGear.name).slots.perSlot
        pos = {x: event.clientX, y: event.clientY}
        showMenu = true
    }

    function closeMenu() {
        showMenu = false
    }

    function processGear(mode: "one" | "stack" | "all") {
        let amount: number
        switch (mode) {
            case "one":
                amount = 1
                break
            case "all":
                amount = relevantGear.quantity
                break
            case "stack":
                amount = perStack
        }
        if (menuType === "Sell") {
            sellGear(relevantGear.name, amount)
        } else {
            deleteGear(relevantGear.name, amount)
        }
    }
</script>

<div class="flex gap-1 p-1">
    <h2>GEAR</h2>
    <span>({totalSlots} slots, {freeSlots} free)</span>
    <GearButton/>
    <CustomGearButton/>
</div>
{#if freeSlots < 0}
    <div class="text-red-600">Over Encumbered</div>
{/if}

<div class="flex gap-1">
    <div class="flex items-center">
        <div>GP:</div>
        <input
                type="number"
                inputmode="numeric"
                bind:value={$pc.gold}
                class="w-16"
        />
    </div>
    <div class="flex items-center">
        <div>SP:</div>
        <input
                type="number"
                inputmode="numeric"
                bind:value={$pc.silver}
                class="w-16"
                on:change={exchangeSToG}
        />
    </div>
    <div class="flex items-center">
        <div>CP:</div>
        <input
                type="number"
                inputmode="numeric"
                bind:value={$pc.copper}
                class="w-16"
                on:change={exchangeCToS}
        />
    </div>
</div>

<div
        class="overflow-scroll flex flex-col gap-1 p-2"
        style="box-shadow: inset 0 0 5px #000"
>
    <ul>
        {#each costlyGear as g, i}
            <li>
                <div class="flex items-center justify-between border-b border-gray-400">
                    <div class="flex justify-between">
                        <span>
                          {i + 1}. {g.name} x {g.quantity} ({slotsForGear(g)} slot{slotsForGear(g) !== 1 ? "s" : ""})
                        </span>
                    </div>
                    {#if g.name !== COIN_NAME}
                        <div class="flex gap-1 items-center">
                            {#if findAny(g.name).canBeEquipped}
                                <input
                                        title="equipped"
                                        type="checkbox"
                                        class="w-6 h-6"
                                        checked={g.equipped}
                                        disabled={!canInteractWithGear(g)}
                                        on:click={() => toggleEquipped(g)}
                                />
                            {/if}
                            <button
                                    on:click={() => deleteGear(g.name)}
                                    class="px-1 pt-1 rounded-md bg-black text-white"
                                    on:contextmenu|preventDefault={(e) => onRightClick("Delete", g, e)}
                            >
                                <i class="material-icons">delete</i>
                            </button>
                            <button
                                    on:click={() => sellGear(g.name)}
                                    class="px-1 pt-1 rounded-md bg-black text-white"
                                    on:contextmenu|preventDefault={(e) => onRightClick("Sell", g, e)}
                            >
                                <i class="material-icons translate-y-0.5">attach_money</i>
                            </button>
                        </div>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
    <h2>Free Gear</h2>
    <ul>
        {#each freeGear as g, i}
            <li>
                <div class="flex gap-1 items-center justify-between border-b border-gray-400">
                    <span>{i + 1 + ". "}{g.name} x {g.quantity}</span>
                    <div class="flex gap-1 items-center">
                        {#if findAny(g.name).canBeEquipped}
                            <input
                                    title="equipped"
                                    type="checkbox"
                                    class="w-6 h-6"
                                    checked={g.equipped}
                                    disabled={!canInteractWithGear(g)}
                                    on:click={() => toggleEquipped(g)}
                            />
                        {/if}
                        <button on:click={() => deleteGear(g.name)} class="px-1 pt-1 rounded-md bg-black text-white">
                            <i class="material-icons">delete</i>
                        </button>
                        <button on:click={() => sellGear(g.name)} class="px-1 pt-1 rounded-md bg-black text-white">
                            <i class="material-icons translate-y-0.5">attach_money</i>
                        </button>
                    </div>
                </div>
            </li>
        {/each}
    </ul>

    {#if showMenu}
        <Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
            <MenuOption on:click={() => processGear("one")} text={`${menuType} one`} />
            <MenuOption on:click={() => processGear("stack")} text={`${menuType} stack (${perStack})`} isDisabled={perStack === 1} />
            <MenuOption on:click={() => processGear("all")} text={`${menuType} all`} />
        </Menu>
    {/if}
</div>
