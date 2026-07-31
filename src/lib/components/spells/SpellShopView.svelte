<script lang="ts">
    import SPELL_COMPENDIUM from "../../compendium/spellCompendium"
    import {pc} from "../../model/PlayerCharacter"
    import TextInput from "../TextInput.svelte"
    import SpellView from "./SpellView.svelte"
    import {CLASSES} from "../../constants";

    let spellInput: string = ""
    let showFilters = true

    let showTier0 = true
    let showTier1 = true
    let showTier2 = true
    let showTier3 = true
    let showTier4 = true
    let showTier5 = true

    let showLawful = true
    let showNeutral = true
    let showChaotic = true
    let showAny = true

    let showPriest = $pc.hasCustomClass || $pc.class === "Priest"
    let showWizard = $pc.hasCustomClass || $pc.class === "Wizard"
    let showWitch = $pc.hasCustomClass || $pc.class === "Witch"
    let showSeer = $pc.hasCustomClass || $pc.class === "Seer"
    let showNecromancer = $pc.hasCustomClass || $pc.class === "Necromancer"
    let showGreenKnight = $pc.hasCustomClass || $pc.class === "Green Knight"
    let showBoon = true
    let showOther = $pc.hasCustomClass || !(showPriest || showWizard || showWitch || showSeer || showNecromancer || showGreenKnight)

    let showSelf = true
    let showClose = true
    let showNear = true
    let showFar = true
    let showPlane = true
    let showUnlimited = true

    let showCustom = false
    let learnAny = false

    $: spells = Object.values(SPELL_COMPENDIUM)
        .concat($pc.customSpells ?? [])
        .filter((s) => {
            if (!showTier0 && s.tier === 0) return false
            if (!showTier1 && s.tier === 1) return false
            if (!showTier2 && s.tier === 2) return false
            if (!showTier3 && s.tier === 3) return false
            if (!showTier4 && s.tier === 4) return false
            if (!showTier5 && s.tier === 5) return false

            if (!showLawful && s.alignment === "Lawful") return false
            if (!showNeutral && s.alignment === "Neutral") return false
            if (!showChaotic && s.alignment === "Chaotic") return false
            if (!showAny && s.alignment === undefined) return false

            if (!showSelf && s.range.includes("Self")) return false
            if (!showClose && s.range.includes("Close")) return false
            if (!showNear && s.range.includes("Near")) return false
            if (!showFar && s.range.includes("Far")) return false
            if (!showPlane && s.range.includes("Plane")) return false
            if (!showUnlimited && s.range.includes("Unlimited")) return false

            if (showCustom && !$pc.customSpells.find((cs) => cs.name === s.name)) return false

            const allowedClasses = []
            if (showPriest) allowedClasses.push("Priest")
            if (showWizard) allowedClasses.push("Wizard")
            if (showWitch) allowedClasses.push("Witch")
            if (showSeer) allowedClasses.push("Seer")
            if (showNecromancer) allowedClasses.push("Necromancer")
            if (showGreenKnight) allowedClasses.push("Green Knight")
            if (showBoon) allowedClasses.push("Boon")
            if (showOther) allowedClasses.push(...CLASSES.filter((c) => !["Priest", "Wizard", "Witch", "Seer", "Necromancer", "Green Knight"].includes(c)))
            if (allowedClasses.length === 0) return false

            const spellClasses = s.class.split(",").map(c => c.trim())
            if (!spellClasses.some(c => allowedClasses.includes(c))) return false

            const term = spellInput.toLowerCase()
            return (
                s.name.toLowerCase().includes(term) ||
                s.desc.toLowerCase().includes(term) ||
                s.duration.type.toLowerCase().includes(term)
            )
        })
</script>

<div class="flex flex-col gap-1">
    <div class="sticky top-0 flex flex-col bg-white p-3">
        <TextInput
                bind:value={spellInput}
                placeholder="search e.g. Burning Hands"
                class="w-full"
        />
        <button class="blk-btn" on:click={() => (showFilters = !showFilters)}
        >{showFilters ? "Hide" : "Show"} Filters
        </button
        >
        {#if showFilters}
            <div class="flex gap-1 items-center">
                <div class="font-bold">Tier:</div>
                <input id="showTier0" type="checkbox" bind:checked={showTier0}/>
                <label for="showTier0">Class</label>
                <input id="showTier1" type="checkbox" bind:checked={showTier1}/>
                <label for="showTier1">1</label>
                <input id="showTier2" type="checkbox" bind:checked={showTier2}/>
                <label for="showTier2">2</label>
                <input id="showTier3" type="checkbox" bind:checked={showTier3}/>
                <label for="showTier3">3</label>
                <input id="showTier4" type="checkbox" bind:checked={showTier4}/>
                <label for="showTier4">4</label>
                <input id="showTier5" type="checkbox" bind:checked={showTier5}/>
                <label for="showTier5">5</label>
            </div>
            <div class="flex gap-1 items-center">
                <div class="font-bold">Alignment:</div>
                <input id="showLawful" type="checkbox" bind:checked={showLawful}/>
                <label for="showLawful">Lawful</label>
                <input id="showNeutral" type="checkbox" bind:checked={showNeutral}/>
                <label for="showNeutral">Neutral</label>
                <input id="showChaotic" type="checkbox" bind:checked={showChaotic}/>
                <label for="showChaotic">Chaotic</label>
                <input id="showAny" type="checkbox" bind:checked={showAny}/>
                <label for="showAny">Any</label>
            </div>
            <div class="flex gap-1 items-center">
                <div class="font-bold">Class:</div>
                <input id="showPriest" type="checkbox" bind:checked={showPriest}/>
                <label for="showPriest">Priest</label>
                <input id="showWizard" type="checkbox" bind:checked={showWizard}/>
                <label for="showWizard">Wizard</label>
                <input id="showWitch" type="checkbox" bind:checked={showWitch}/>
                <label for="showWitch">Witch</label>
                <input id="showSeer" type="checkbox" bind:checked={showSeer}/>
                <label for="showSeer">Seer</label>
                <input id="showNecromancer" type="checkbox" bind:checked={showNecromancer}/>
                <label for="showNecromancer">Necromancer</label>
                <input id="showGreenKnight" type="checkbox" bind:checked={showGreenKnight}/>
                <label for="showGreenKnight">Green Knight</label>
                <input id="showBoon" type="checkbox" bind:checked={showBoon}/>
                <label for="showBoon">Boon</label>
                <input id="showOther" type="checkbox" bind:checked={showOther}/>
                <label for="showOther">Other</label>
            </div>
            <div class="flex gap-1 items-center">
                <div class="font-bold">Range:</div>
                <input id="showSelf" type="checkbox" bind:checked={showSelf}/>
                <label for="showSelf">Self</label>
                <input id="showClose" type="checkbox" bind:checked={showClose}/>
                <label for="showClose">Close</label>
                <input id="showNear" type="checkbox" bind:checked={showNear}/>
                <label for="showNear">Near</label>
                <input id="showFar" type="checkbox" bind:checked={showFar}/>
                <label for="showFar">Far</label>
                <input id="showPlane" type="checkbox" bind:checked={showPlane}/>
                <label for="showPlane">Plane</label>
                <input id="showUnlimited" type="checkbox" bind:checked={showUnlimited}/>
                <label for="showUnlimited">Unlimited</label>
            </div>
            <div class="flex justify-between">
                <div>
                    <label for="showCustom" class="font-bold">Custom</label>
                    <input id="showCustom" type="checkbox" bind:checked={showCustom}/>
                </div>
                <div>
                    <label for="learnAny" class="font-bold">Learn any spell</label>
                    <input id="learnAny" type="checkbox" bind:checked={learnAny}/>
                </div>
            </div>
        {/if}
    </div>
    <div>
        <ol>
            {#each spells as s}
                <li>
                    <div class="shadow-md border border-gray-200 mb-3 p-2">
                        <SpellView {s} canLearnOverride={learnAny}/>
                    </div>
                </li>
            {/each}
        </ol>
    </div>
</div>

<style lang="postcss">
    input[type="checkbox"] {
        @apply w-4 h-4
    }
</style>
