<script lang="ts">
    import ARMOR_COMPENDIUM from "../../compendium/armorCompendium"
    import GEAR_COMPENDIUM from "../../compendium/basicGearCompendium"
    import WEAPON_COMPENDIUM from "../../compendium/weaponCompendium"
    import {canPlayerAffordGear} from "../../model/PlayerCharacter"
    import type {GearInfo, Gear} from "../../types"
    import {pc} from "../../model/PlayerCharacter"
    import Modal from "../Modal.svelte"
    import CustomGearForm from "./CustomGearForm.svelte"
    import TextInput from "../TextInput.svelte"
    import TREASURE_COMPENDIUM from "../../compendium/treasureCompendium"
    import {gearCostToTotal, playerMoneyToTotal, totalToPlayerMoney} from "../../services/Helper"

    let gear: GearInfo = undefined
    let showCustomGearEditModal = false

    let showOnlyWhatICanAfford = false
    let showWeapon = true
    let showArmor = true
    let showBasic = true
    let showTreasure = false
    let showCustom = false

    let gearInput: string = ""
    $: allResults = Object.values(GEAR_COMPENDIUM)
        .concat(Object.values(ARMOR_COMPENDIUM))
        .concat(Object.values(WEAPON_COMPENDIUM))
        .concat(Object.values(TREASURE_COMPENDIUM))
        .concat($pc.customGear ?? [])
        .filter((g) => {
            if (showCustom && !$pc.customGear.find((cg) => cg.name === g.name)) return false
            if (!showWeapon && g.type === "Weapon") return false
            if (!showArmor && g.type === "Armor") return false
            if (!showBasic && g.type === "Basic") return false
            if (!showTreasure && g.type === "Treasure") return false
            if (showOnlyWhatICanAfford && !canPlayerAffordGear($pc, g)) return false
            return g.name.toLowerCase().includes(gearInput.toLowerCase())
        })//.sort((a, b) => a.name.localeCompare(b.name))

    let resultGear: Gear[] = []
    $: if (resultGear.length === 0 && allResults.length > 0) {
        resultGear = allResults.map(g => ({ name: g.name, quantity: 1 }))
    }
    $: if (allResults.length > 0) {
        resultGear = []
        for (const g of allResults) {
            resultGear.push({ name: g.name, quantity: 1 })
        }
    }

    function addGear(g: GearInfo, quantity: number) {
        const existingGear = $pc.gear.find(
            (existingG) => existingG.name === g.name
        )
        if (existingGear) {
            existingGear.quantity += quantity
        } else {
            const gear: Gear = {name: g.name, quantity: quantity}
            $pc.gear.push(gear)
        }
        $pc = $pc
    }

    function buyGear(g: GearInfo, quantity: number) {
        if (canPlayerAffordGear($pc, g, quantity)) {
            let pcTotal = playerMoneyToTotal($pc)
            let costTotal = gearCostToTotal(g, quantity)
            pcTotal -= costTotal
            totalToPlayerMoney($pc, pcTotal)
            addGear(g, quantity)
        }
    }

    function getCostForGear(g: GearInfo): string {
        const {gp, sp, cp} = g.cost
        let gpStr: string, spStr: string, cpStr: string
        if (gp) gpStr = `${gp}gp`
        if (sp) spStr = `${sp}sp`
        if (cp) cpStr = `${cp}cp`
        return [gpStr, spStr, cpStr].join(" ")
    }

    function deleteCustomGear(gear: GearInfo) {
        $pc.gear = $pc.gear.filter((g) => g.name !== gear.name)
        $pc.bonuses = $pc.bonuses.filter((b) => {
            if (b.metadata?.type === "weapon" && b.metadata.weapon === gear.name)
                return false
            return !(b.metadata?.type === "armor" && b.metadata.armor === gear.name)
        })
        $pc.customGear = $pc.customGear.filter((g) => g.name !== gear.name)
    }
</script>

<div class="border-b flex flex-col gap-1">
    <TextInput
            bind:value={gearInput}
            placeholder="search e.g. Torch"
            class="w-full"
    />
    <div class="flex gap-1 items-center flex-wrap">
        <div class="font-bold">Filter:</div>
        <input id="showWeapon" type="checkbox" bind:checked={showWeapon}/>
        <label for="showWeapon">Weapon</label>
        <input id="showArmor" type="checkbox" bind:checked={showArmor}/>
        <label for="showArmor">Armor</label>
        <input id="showBasic" type="checkbox" bind:checked={showBasic}/>
        <label for="showBasic">Basic</label>
        <input id="showTreasure" type="checkbox" bind:checked={showTreasure}/>
        <label for="showTreasure">Treasure</label>
        <input id="showCustom" type="checkbox" bind:checked={showCustom}/>
        <label for="showCustom">Custom</label>
        <input id="showAffordable" type="checkbox" bind:checked={showOnlyWhatICanAfford}/>
        <label for="showAffordable">Affordable</label>
    </div>
    <div>
        <table class="w-full">
            <thead class="text-left sticky top-0 bg-white">
            <tr>
                <th>Name</th>
                <th class="text-center">Cost</th>
                <th>Slots</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {#each allResults as g, i}
                <tr class="border-b" class:bg-gray-100={i % 2 === 0}>
                    <td class="pl-3">{g.name}</td>
                    <td class="justify-end flex mr-2">{getCostForGear(g)}</td>
                    <td class="pr-3">{
                        g.slots.freeCarry || g.slots.slotsUsed === 0
                            ? "Free"
                            : (g.slots.perSlot > g.slots.slotsUsed)
                                ? `${g.slots.slotsUsed}/${g.slots.perSlot}`
                                : `${g.slots.slotsUsed}`}
                    </td>
                    <td><input type="number" class="w-14" bind:value={resultGear[i].quantity} min="0"/></td>
                    <td class="flex justify-end gap-1">
                        {#if g.editable}
                            <button
                                    class="bg-black rounded-md text-white px-1 text-xs"
                                    on:click={() => deleteCustomGear(g)}><i class="material-icons">delete</i>
                            </button>
                            <button
                                    class="bg-black rounded-md text-white px-1 text-xs"
                                    on:click={() => {
                                        gear = g
                                        showCustomGearEditModal = true
                                    }}><i class="material-icons">edit</i>
                            </button>
                        {/if}
                        <button on:click={() => addGear(g, resultGear[i].quantity)} class="px-1 hover:bg-gray-400">
                            <i class="material-icons translate-y-1">add_circle</i>
                        </button>
                        <button on:click={() => buyGear(g, resultGear[i].quantity)} class="px-1 hover:bg-gray-400">
                            <i class="material-icons translate-y-1">shopping_cart</i>
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

{#if showCustomGearEditModal && gear}
    <Modal bind:showModal={showCustomGearEditModal}>
        <h2 slot="header">Custom Gear</h2>
        <CustomGearForm
                {gear}
                on:finish={() => {
                    showCustomGearEditModal = false
                    gear = undefined
                }}
        />
    </Modal>
{/if}
