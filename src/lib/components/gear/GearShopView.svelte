<script lang="ts">
    import ARMOR_COMPENDIUM from "../../compendium/armorCompendium"
    import GEAR_COMPENDIUM from "../../compendium/basicGearCompendium"
    import WEAPON_COMPENDIUM from "../../compendium/weaponCompendium"
    import TREASURE_COMPENDIUM from "../../compendium/treasureCompendium"
    import { canPlayerAffordGear, pc } from "../../model/PlayerCharacter"
    import type { GearInfo } from "../../types"
    import {
        sortAlphabetically, sortCost, sortSlots, gearCostToTotal, playerMoneyToTotal, totalToPlayerMoney,
        isWeaponInfo, isArmorInfo, coinToTotal, totalToCost, isTreasureInfo
    } from "../../utils"
    import Modal from "../Modal.svelte"
    import CustomGearForm from "./CustomGearForm.svelte"
    import TextInput from "../TextInput.svelte"
    import Labelled from "../Labelled.svelte"

    let gear: GearInfo = undefined
    let showCustomGearEditModal = false

    let ascending = true
    let sortMode: "name" | "cost" | "slots"

    let treasureTax = 1.01

    let showOnlyWhatICanAfford = false
    let showWeapon = true
    let showArmor = true
    let showBasic = true
    let showTreasure = false
    let showCustom = false
    let showModal = false

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
        let m = quantity * (g.type === "Treasure" ? treasureTax : 1)
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

    function getCostForGear(g: GearInfo, multiplier = 1): string {
        const { gp, sp, cp } = totalToCost(coinToTotal(g.cost) * multiplier)
        return [gp && `${gp}gp`, sp && `${sp}sp`, cp && `${cp}cp`].filter(Boolean).join(" ")
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
            <thead class="text-center sticky top-0 bg-white cursor-pointer">
                <tr>
                    <th class="text-start hover:bg-gray-200" on:click={() => sort("name")}>Name</th>
                    <th class="hover:bg-gray-200" on:click={() => sort("cost")}>Cost</th>
                    <th class="hover:bg-gray-200" on:click={() => sort("slots")}>Slots</th>
                    <th class="hover:bg-gray-200 cursor-auto">Amount</th>
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
                                            showModal = true
                            }}>
                                <i class="material-icons">info</i>
                            </button>
                            </div>
                        </td>
                        <td class="justify-end flex mr-2">{getCostForGear(g, g.type === "Treasure" ? treasureTax : 1)}</td>
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
                        <td class="flex justify-end gap-1">
                            {#if g.editable}
                                <button
                                        class="bg-black rounded-md text-white px-1 text-xs hover:bg-gray-600"
                                        on:click={() => deleteCustomGear(g)}><i class="material-icons">delete</i>
                                </button>
                                <button
                                        class="bg-black rounded-md text-white px-1 text-xs hover:bg-gray-600"
                                        on:click={() => {
                                            gear = g
                                            showCustomGearEditModal = true
                                        }}><i class="material-icons">edit</i>
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

{#if showModal}
    <Modal bind:showModal>
        <h2 slot="header">{gear.name}</h2>
        <Labelled label="Type" text={gear.type}/>
        {#if gear.desc}
            <Labelled label="Description" text={gear.desc}/>
        {/if}
        <Labelled label="Cost" text={getCostForGear(gear).includes("p") ? getCostForGear(gear) : "Free"}/>
        {#if gear.properties?.length > 0}
            <Labelled label="Properties" text={gear.properties.join(", ")}/>
        {/if}
        {#if isWeaponInfo(gear)}
            <Labelled label="Range" text={Object.values(gear.range).join(", ")}/>
            <Labelled
                    label="Damage"
                    subLabels={["One Handed", "Two Handed"]}
                    subTexts={[
                        gear.damage.oneHanded ? `${gear.damage.oneHanded.numDice}${gear.damage.oneHanded.diceType}` : "",
                        gear.damage.twoHanded ? `${gear.damage.twoHanded.numDice}${gear.damage.twoHanded.diceType}` : ""
                        ].filter(Boolean)
                    }
            />
        {:else if isArmorInfo(gear)}
            <Labelled label="Armor Value"
                      text={gear.ac.base
                            ? `${gear.ac.base}${gear.ac.stat ? ` + ${gear.ac.stat} Modifier` : ""}`
                            : `+${gear.ac.modifier}`}
            />
        {:else if isTreasureInfo(gear)}
            <Labelled label="Treasure Info" text={`${Math.floor((treasureTax - 1) * 100)}%`}/>
        {/if}
        {#if gear.playerBonuses?.length > 0}
            <Labelled
                    label="Bonuses"
                    subLabels={gear.playerBonuses.map(b => b.name)}
                    subTexts={gear.playerBonuses.map(b => b.desc)}
            />
        {/if}
    </Modal>
{/if}
