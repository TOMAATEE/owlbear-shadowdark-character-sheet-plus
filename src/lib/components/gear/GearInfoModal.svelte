<script lang="ts">
    import Modal from "../Modal.svelte"
    import Labelled from "../Labelled.svelte"
    import {addSign, getCostForGear, isArmorInfo, isTreasureInfo, isWeaponInfo} from "../../utils"
    import PropertyInfoModal from "./PropertyInfoModal.svelte"
    import type {GearInfo} from "../../types"
    import {TREASURE_TAX_PERCENT} from "../../constants"

    export let showModal = false
    export let gear: GearInfo = undefined

    let showPropertyModal = false

    let cost = getCostForGear(gear)
</script>

<Modal bind:showModal>
        <h2 slot="header">{gear.name}</h2>
        <Labelled label="Type" text={gear.type}/>
        {#if gear.desc}
            <Labelled label="Description" text={gear.desc}/>
        {/if}
        <Labelled label="Cost" text={cost.includes("p") ? cost : "Free"}/>
        {#if gear.properties?.length > 0 && gear.type !== "Treasure"}
            <div class="flex items-center justify-between">
                <Labelled label="Properties" text={gear.properties.join(", ")}/>
                <button on:click={() => {showPropertyModal = true}}>
                    <i class="material-icons">info</i>
                </button>
            </div>
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
            <Labelled label="Treasure Tax" text={`${addSign(TREASURE_TAX_PERCENT)}% when buying (${getCostForGear(gear, TREASURE_TAX_PERCENT / 100)})`}/>
        {/if}
        {#if gear.playerBonuses?.length > 0}
            <Labelled
                    label="Bonuses"
                    subLabels={gear.playerBonuses.map(b => b.name)}
                    subTexts={gear.playerBonuses.map(b => b.desc)}
            />
        {/if}
</Modal>

<PropertyInfoModal bind:showModal={showPropertyModal}/>
