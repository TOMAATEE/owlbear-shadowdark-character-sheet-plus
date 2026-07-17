<script lang="ts">
    import {findAny} from "../../compendium"
    import {CLASSES} from "../../constants"
    import {pc} from "../../model/PlayerCharacter"
    import {sortAlphabetically} from "../../utils"
    import RollNewTalentButton from "../talents/RollNewTalentButton.svelte"
    import BonusView from "./BonusView.svelte"
    import CustomBonusButton from "./CustomBonusButton.svelte"

    $: equippableGearWithBonuses = $pc.gear
        .filter((g) => g.equipped)
        .map((g) => findAny(g.name))
        .filter((g) => g && g.canBeEquipped && g.playerBonuses?.length > 0)

    $: otherGearWithBonuses = $pc.gear
        .filter((g) => !g.equipped)
        .map((g) => findAny(g.name))
        .filter((g) => g && g.playerBonuses?.length > 0 && !g.canBeEquipped)
</script>

<h2>Bonuses</h2>
<ul class="px-1">
    {#each $pc.bonuses.filter((b) => !b.inactive).sort((a, b) => sortAlphabetically(a.desc, b.desc)) as b}
        <li class="border-b">
            <BonusView bonus={b}/>
        </li>
    {/each}
</ul>

<h2>Bonuses From Items</h2>
<ul>
    {#each otherGearWithBonuses.sort((a, b) => sortAlphabetically(a.name, b.name)) as g}
        <li class="border-b">
            <div class="font-bold bg-gray-300">{g.name}</div>
            <ul>
                {#each g.playerBonuses as b}
                    <li class="border-b ps-7 pe-1">
                        <BonusView bonus={b} bind:bonuses={g.playerBonuses}/>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
    {#each equippableGearWithBonuses.sort((a, b) => sortAlphabetically(a.name, b.name)) as g}
        <li class="border-b">
            <div class="font-bold bg-gray-300">{g.name}</div>
            <ul>
                {#each g.playerBonuses as b}
                    <li class="border-b ps-7 pe-1">
                        <BonusView bonus={b} bind:bonuses={g.playerBonuses}/>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>

<div class="flex gap-1">
    {#if $pc.level > 0 && $pc.class && !$pc.hasCustomClass && CLASSES.includes($pc.class)}
        <RollNewTalentButton/>
    {/if}
    <CustomBonusButton/>
</div>
