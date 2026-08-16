<script lang="ts">
    import Modal from "../Modal.svelte"
    import {addBonusToPlayer, pc} from "../../model/PlayerCharacter"
    import {CLASS_TALENTS} from "../../compendium/talentCompendium"
    import {rollDice} from "../../utils"
    import {CLASSES, STATS} from "../../constants"
    import type {
        Bonus,
        ModifyBonus,
        SpellBonusMetaData,
        Stat,
    } from "../../types"
    import {BOONS} from "../../compendium/boonCompendium";
    import {BLACK_LOTUS} from "../../compendium/blackLotusCompendium";

    let showModal = false

    const ranges: {
        min: number
        max: number
    }[] = [
        {min: 2, max: 2},
        {min: 3, max: 7},
        {min: 8, max: 9},
        {min: 10, max: 11},
        {min: 12, max: 12},
    ]

    let rolled = false
    let highlight = -1
    let lotus1_1 = -1
    let lotus1_2 = -1

    function rollTalent() {
        if (rolled) reset()
        rolled = true

        if (table === "Black Lotus") {
            highlight = rollDice("d12", 1)
            if (highlight === 1) {
                let notDone = true
                while (notDone) {
                    lotus1_1 = rollDice("d12", 1)
                    notDone = (lotus1_1 === 1
                        || ([3, 6].includes(lotus1_1) && $pc.bonuses.includes(BLACK_LOTUS[lotus1_1 - 1] as Bonus)) //impossible duplicates
                    )
                }
                notDone = true
                while (notDone) {
                    lotus1_2 = rollDice("d12", 1)
                    notDone = (lotus1_2 === 1
                        || ([3, 6].includes(lotus1_2) && (lotus1_1 === lotus1_2 || $pc.bonuses.includes(BLACK_LOTUS[lotus1_2 - 1] as Bonus))) //impossible duplicates
                    )
                }
            }
        } else {
            const result = rollDice("d6", 2)

            for (let i = 0; i < ranges.length; i++) {
                const r = ranges[i]
                if (result >= r.min && result <= r.max) {
                    highlight = i
                    break
                }
            }
            if (table === "Bard") {
                if (highlight === 2) talentChoiceOrStatsChoice = "stats"
                if (highlight === 4) talentChoiceOrStatsChoice = "talent"
            } else if (table === "Warlock" && highlight === 1) talentChoiceOrStatsChoice = "stats"
        }
    }

    let options: (Bonus | Bonus[])[] = []
    let selectedOption: Bonus | Bonus[]
    let updateAction = () => {}

    function setOptionsForHighlight(highlight: number) {
        if (table === "Black Lotus" && highlight === 1) { //2 Black Lotus Talents
            updateAction = () => {
                [BLACK_LOTUS[lotus1_1 - 1], BLACK_LOTUS[lotus1_2 - 1]].forEach(talent => {
                    switch (talent.type) {
                        case "generic":
                            addBonusToPlayer($pc, {
                                name: talent.name,
                                desc: talent.name,
                                bonusSource: "Black Lotus",
                                type: "generic",
                                editable: true,
                            })
                            break
                        case "bonus":
                            for (const b of talent.bonuses) {
                                addBonusToPlayer($pc, b)
                            }
                    }
                })
            }
        } else {
            const highlightedTalent = table === "Black Lotus" ? BLACK_LOTUS[highlight - 1] : (table === $pc.class ? CLASS_TALENTS : BOONS)[table][highlight]

            switch (highlightedTalent?.type) {
                case "generic":
                    updateAction = () => {
                        $pc = addBonusToPlayer($pc, {
                            name: highlightedTalent.name,
                            desc: highlightedTalent.name,
                            bonusSource: "Talent",
                            type: "generic",
                            editable: true,
                        })
                    }
                    break
                case "bonus":
                    updateAction = () => {
                        for (const b of highlightedTalent.bonuses) {
                            $pc = addBonusToPlayer($pc, b)
                        }
                    }
                    break
                case "chooseBonus":
                    const firstChoice = highlightedTalent.choices[0]
                    // hacky solution to filter out known spells
                    if (!Array.isArray(firstChoice) && firstChoice.metadata && firstChoice.metadata.type === "spell") {
                        options = (highlightedTalent.choices as ModifyBonus[]).filter((b) =>
                            $pc.spells.find(
                                (s) => s.name === (b.metadata as SpellBonusMetaData)?.spell,
                            ),
                        )
                    } else {
                        options = highlightedTalent.choices
                    }
                    break
            }
        }
    }

    function stringForOption(o: Bonus | Bonus[]): string {
        if (Array.isArray(o)) {
            return o.map((o) => o.name).join(" & ")
        } else {
            return o.name
        }
    }

    $: if (highlight > -1) {
        setOptionsForHighlight(highlight)
    }

    function reset() {
        rolled = false
        highlight = -1
        lotus1_1 = -1
        lotus1_2 = -1
        options = []
        selectedOption = undefined
        talentChoiceOrStatsChoice = undefined
        statDistributionRemaining = 2
        newStats = {
            STR: $pc.stats.STR,
            DEX: $pc.stats.DEX,
            CON: $pc.stats.CON,
            INT: $pc.stats.INT,
            WIS: $pc.stats.WIS,
            CHA: $pc.stats.CHA,
            LVL: $pc.stats.LVL,
            None: $pc.stats.None,
        }
    }

    $: newStats = {
        STR: $pc.stats.STR,
        DEX: $pc.stats.DEX,
        CON: $pc.stats.CON,
        INT: $pc.stats.INT,
        WIS: $pc.stats.WIS,
        CHA: $pc.stats.CHA,
        LVL: $pc.stats.LVL,
        None: $pc.stats.None,
    }

    function updateSheet() {
        if (talentChoiceOrStatsChoice === "stats") {
            $pc.stats = newStats
        } else if (selectedOption) {
            if (Array.isArray(selectedOption)) {
                for (const b of selectedOption) {
                    $pc = addBonusToPlayer($pc, b)
                }
            } else {
                $pc = addBonusToPlayer($pc, selectedOption)
            }
        } else {
            updateAction()
        }
        $pc = $pc
        showModal = false
    }

    let talentChoiceOrStatsChoice: "talent" | "stats"
    let statDistributionRemaining = 2

    function onTalentSelectChange(e: Event) {
        setOptionsForHighlight(parseInt((e.target as HTMLSelectElement).value))
    }

    function onStatAdd(s: Stat) {
        if (statDistributionRemaining < 1) return
        newStats[s] += 1
        statDistributionRemaining -= 1
    }

    function onStatSubtract(s: Stat) {
        if (statDistributionRemaining === 2 || newStats[s] - 1 < $pc.stats[s])
            return
        newStats[s] = Math.max($pc.stats[s], newStats[s] - 1)
        statDistributionRemaining += 1
    }

    let table: string = $pc.class
    function setTable(e: Event) {
        table = (e.target as HTMLSelectElement).value
    }
</script>

<button
        class="bg-black text-white w-full p-2"
        on:click={() => {
            showModal = true
            reset()
        }}>Roll New Talent
</button>

<Modal bind:showModal>
    <h2 slot="header" class="text-lg">Roll New Talent</h2>
    <select on:change={setTable}>
        <option>{$pc.class}</option>
        <option>Black Lotus</option>
        {#each Object.keys(BOONS) as boon}
            <option>{boon}</option>
        {/each}
    </select>
    <table>
        <tr class="text-left border-b border-black">
            <th class="w-20">{table === "Black Lotus" ? "1d12" : "2d6"}</th>
            <th>Effect</th>
        </tr>
        {#if table === "Black Lotus"}
            {#each BLACK_LOTUS as bl, i}
                <tr class="border-b border-black" class:bg-yellow-300={highlight === i + 1} class:bg-green-300={(lotus1_1 === i + 1) !== (lotus1_2 === i + 1)} class:bg-green-500={(lotus1_1 === i + 1) && (lotus1_2 === i + 1)}>
                    <td>{i + 1}</td>
                    <td>{bl.name}</td>
                </tr>
            {/each}
        {:else}
            {#each ranges as r, i}
                <tr class="border-b border-black" class:bg-yellow-300={highlight === i}>
                    <td>{r.min === r.max ? r.min : `${r.min} - ${r.max}`}</td>
                    <td>{(CLASSES.includes(table) ? CLASS_TALENTS : BOONS)[table][i]?.name}</td>
                </tr>
            {/each}
        {/if}
    </table>
    <button class="w-full bg-black text-white p-1" on:click={rollTalent}>
        {rolled ? "REROLL" : "ROLL"}
    </button>
    <div class="flex flex-col gap-1">
        {#if highlight === 4 && table !== "Black Lotus"}
            <div class="flex gap-5 items-center justify-center p-2">
                <label for="chooseTalentCheckBox">Choose Talent</label>
                <input
                        id="chooseTalentCheckBox"
                        type="radio"
                        bind:group={talentChoiceOrStatsChoice}
                        value="talent"
                />
                <label for="distributeStatsCheckBox">Distribute Stats</label>
                <input
                        id="distributeStatsCheckBox"
                        type="radio"
                        bind:group={talentChoiceOrStatsChoice}
                        value="stats"
                />
            </div>
        {:else if options.length}
            <select bind:value={selectedOption}>
                {#each options as o}
                    <option value={o}>{stringForOption(o)}</option>
                {/each}
            </select>
        {/if}
        {#if talentChoiceOrStatsChoice === "talent"}
            <select on:change={onTalentSelectChange} value={highlight} class="w-full">
                {#each (table === $pc.class ? CLASS_TALENTS : BOONS)[table].map((t) => t.name) as talent, i}
                    {#if i < 4 && !"+2 points to distribute to stats".includes(talent)}
                        <option value={i}>{talent}</option>
                    {/if}
                {/each}
            </select>
            {#if options.length && !Array.isArray(options[0]) && !(options[0]?.name === "Choose a talent")}
                <select on:change={onTalentSelectChange} bind:value={selectedOption} class="w-full">
                    {#each options as option}
                        {#if !Array.isArray(option)}
                            <option value={option}>{stringForOption(option)}</option>
                        {/if}
                    {/each}
                </select>
            {/if}
        {:else if talentChoiceOrStatsChoice === "stats"}
            <div class="self-center">
                Stats Points remaining: {statDistributionRemaining}
            </div>
            <div class="flex flex-col gap-1 items-center">
                {#each STATS as s}
                    {#if !(s === "LVL" || s === "None")}
                        <div class="flex items-center">
                            <div class="w-12">{s}</div>
                            <div
                                    class="p-1 bg-gray-200 rounded-md"
                                    class:text-green-600={newStats[s] > $pc.stats[s]}
                            >
                                {newStats[s]}
                            </div>
                            <button on:click={() => onStatSubtract(s)}>
                                <i class="material-icons">remove</i>
                            </button>
                            <button on:click={() => onStatAdd(s)}>
                                <i class="material-icons">add</i>
                            </button>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
        {#if rolled}
            <button class="w-full bg-black text-white p-1" on:click={updateSheet}>
                Update Sheet
            </button>
        {/if}
    </div>
</Modal>

<style lang="postcss">
    select {
        @apply my-1
    }
</style>
