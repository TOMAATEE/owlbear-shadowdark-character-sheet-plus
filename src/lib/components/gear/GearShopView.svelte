<script lang="ts">
    import ARMOR_COMPENDIUM from "../../compendium/armorCompendium"
    import GEAR_COMPENDIUM from "../../compendium/basicGearCompendium"
    import WEAPON_COMPENDIUM from "../../compendium/weaponCompendium"
    import TREASURE_COMPENDIUM from "../../compendium/treasureCompendium"
    import { canPlayerAffordGear, pc } from "../../model/PlayerCharacter"
    import type { GearInfo } from "../../types"
    import {
        sortAlphabetically, sortCost, sortSlots, gearCostToTotal, playerMoneyToTotal, totalToPlayerMoney, getCostForGear
    } from "../../utils"
    import Modal from "../Modal.svelte"
    import CustomGearForm from "./CustomGearForm.svelte"
    import TextInput from "../TextInput.svelte"
    import PropertyInfoModal from "./PropertyInfoModal.svelte"
    import {TREASURE_TAX} from "../../constants"
    import GearInfoModal from "./GearInfoModal.svelte"

    let gear: GearInfo = undefined

    let showCustomGearEditModal = false
    let showGearInfoModal = false
    let showPropertyModal = false

    let ascending = true
    let sortMode: "name" | "cost" | "slots"

    let showOnlyWhatICanAfford = false
    let showWeapon = true
    let showArmor = true
    let showBasic = true
    let showTreasure = false
    let showCustom = false

    let gearInput: string = ""

    let allResults: GearInfo[]
    $: {
        allResults = Object.values(GEAR_COMPENDIUM)
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
            })

        if (sortMode) {
            let f: Function
            if (sortMode === "name") f = sortAlphabetically
            else if (sortMode === "cost") f = sortCost
            else f = sortSlots
            allResults = [...allResults].sort((a, b) => f(a[sortMode], b[sortMode], ascending))
        }
    }

    let resultGear: { name: string; type: string; quantity: number }[] = []
    $: {
        resultGear = resultGear.filter(r => allResults.some(g => g.name === r.name && g.type === r.type))
        for (const g of allResults) {
            if (!resultGear.find(r => r.name === g.name && r.type === g.type)) {
                resultGear.push({ name: g.name, type: g.type, quantity: 1 })
            }
        }
    }

    function updateQuantity(g: GearInfo, value: number) {
        const entry = resultGear.find(r => r.name === g.name && r.type === g.type)
        if (entry) entry.quantity = value
    }

    function addGear(g: GearInfo, quantity: number) {
        const existingGear = $pc.gear.find((existingG) => existingG.name === g.name)
        if (existingGear) existingGear.quantity += quantity
        else $pc.gear.push({ name: g.name, quantity })
        $pc = $pc
    }

    function buyGear(g: GearInfo, quantity: number) {
        let m = quantity * (g.type === "Treasure" ? TREASURE_TAX : 1)
        if (canPlayerAffordGear($pc, g, m)) {
            let pcTotal = playerMoneyToTotal($pc)
            let costTotal = gearCostToTotal(g, m)
            pcTotal -= costTotal
            totalToPlayerMoney($pc, pcTotal)
            addGear(g, quantity)
        }
    }

    function sort(mode: "name" | "cost" | "slots") {
        if (sortMode === mode) {
            ascending = !ascending
        } else {
            sortMode = mode
            ascending = true
        }
        allResults = [...allResults]
    }

    function getSlotsForGear(g: GearInfo) {
        return g.slots.freeCarry || g.slots.slotsUsed === 0
            ? "Free"
            : (g.slots.perSlot > g.slots.slotsUsed)
                ? `${g.slots.slotsUsed}/${g.slots.perSlot}`
                : `${g.slots.slotsUsed}`
    }

    function deleteCustomGear(gear: GearInfo) {
        $pc.gear = $pc.gear.filter((g) => g.name !== gear.name)
        $pc.customGear = $pc.customGear.filter((g) => g.name !== gear.name)
        $pc = $pc
    }
</script>

<div class="border-b flex flex-col gap-1">
    <div class="sticky top-0 bg-white z-20 py-2">
        <div class="flex items-center gap-2">
            <div class="flex-grow">
                <TextInput
                        bind:value={gearInput}
                        placeholder="search e.g. Torch"
                        class="w-full flex-grow"
                />
            </div>
            <button class="flex-shrink-0" on:click={() => {showPropertyModal = true}}>
                <i class="material-icons">info</i>
            </button>
        </div>
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
    </div>
    <table class="w-full">
        <thead class="text-center cursor-pointer sticky top-[4rem] bg-white z-20">
            <tr>
                <th class="text-start hover:bg-gray-200" on:click={() => sort("name")}>Name</th>
                <th class="hover:bg-gray-200" on:click={() => sort("cost")}>Cost</th>
                <th class="hover:bg-gray-200" on:click={() => sort("slots")}>Slots</th>
                <th class="hover:bg-gray-200 cursor-auto">Amount</th>
                <th/>
            </tr>
        </thead>
        <tbody>
        {#each allResults as g, i (g.name + g.type)}
            {#key g.name + g.type}
                <tr class="border-b" class:bg-gray-100={i % 2 === 0}>
                    <td class="pl-3">
                        <div class="flex items-center justify-between w-full">
                        {g.name}
                        <button on:click={() => {
                                        gear = g
                                        showGearInfoModal = true
                        }}>
                            <i class="material-icons">info</i>
                        </button>
                        </div>
                    </td>
                    <td class="pr-3 text-right">{getCostForGear(g, g.type === "Treasure" ? TREASURE_TAX : 1)}</td>
                    <td class="pr-3">{getSlotsForGear(g)}</td>
                    <td>
                        <input
                                type="number"
                                class="w-14"
                                min="0"
                                value={resultGear.find(r => r.name === g.name && r.type === g.type)?.quantity ?? 1}
                                on:input={(e) => updateQuantity(g, +e.currentTarget.value)}
                        />
                    </td>
                    <td class="flex justify-end">
                        {#if g.editable}
                            <button
                                    class="px-1 hover:bg-gray-400"
                                    on:click={() => deleteCustomGear(g)}
                            ><i class="material-icons translate-y-1">delete</i>
                            </button>
                            <button
                                    class="px-1 hover:bg-gray-400"
                                    on:click={() => {
                                        gear = g
                                        showCustomGearEditModal = true
                                    }}><i class="material-icons translate-y-1">edit</i>
                            </button>
                        {/if}
                        <button class="px-1 hover:bg-gray-400"
                                on:click={() => addGear(g, resultGear.find(r => r.name === g.name && r.type === g.type)?.quantity ?? 1)}
                        ><i class="material-icons translate-y-1">add_circle</i>
                        </button>
                        <button class="px-1 hover:bg-gray-400"
                                on:click={() => buyGear(g, resultGear.find(r => r.name === g.name && r.type === g.type)?.quantity ?? 1)}
                        ><i class="material-icons translate-y-1">shopping_cart</i>
                        </button>
                    </td>
                </tr>
            {/key}
        {/each}
        </tbody>
    </table>
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

{#if showGearInfoModal && gear}
    <GearInfoModal bind:showModal={showGearInfoModal} {gear}/>
{/if}

<PropertyInfoModal bind:showModal={showPropertyModal}/>
