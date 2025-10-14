<script lang="ts">
    import type {DiceType, SpellInfo} from "../types";
    import {addSign, rollDiceA, sum} from "../utils";
    import Menu from "./Menu/Menu.svelte";
    import MenuOption from "./Menu/MenuOption.svelte";
    import {notifiy} from "../services/Notifier";
    import {createEventDispatcher} from "svelte";

    export let modifier: number = 0;
    export let numDice: number = 1;
    export let diceType: DiceType = "d20"; // default to d20
    export let disabled = false;
    export let display = "modifier";
    export let spell: SpellInfo = null;
    export let advantage: boolean = false;
    export let disadvantage: boolean = false;

    const dispatch = createEventDispatcher()

    let showMenu = false;
    let pos = {x: 0, y: 0};
    let touchTimer: ReturnType<typeof setTimeout>;

    function touchStart(e: TouchEvent) {
        touchTimer = setTimeout(() => {
            onRightClick(e as any);
            touchTimer = null;
        }, 500);
    }

    function touchEnd() {
        if (touchTimer) {
            clearTimeout(touchTimer);
            touchTimer = null;
        }
    }

    function toPlusString(numbers: number[], brackets: boolean = null): string {
        if (brackets === null) brackets = numbers.length > 1
        const diceS = numbers.reduce((prev, current) => prev += current + " + ", brackets ? "(" : "")
        return diceS.substring(0, diceS.length - 3) + (brackets ? ")" : "");
    }

    function rolled() {
        if (advantage) {
            rollWithAdvantage()
            return
        } else if (disadvantage) {
            rollWithDisadvantage()
            return
        }
        let msg: string;
        let result: number;
        if (numDice >= 1) {
            const n = rollDiceA(diceType, numDice)
            result = sum(n) + modifier
            msg = `rolled ${numDice}${diceType}: ${toPlusString(n)} + ${modifier} = ${result}`;
        } else {
            msg = "not rollable, no dice defined"
        }
        if (result && spell && spell.tier > 0) {
            const required = spell.tier + 10
            if (result >= required) {
                msg += "\nSUCCESS!"
                if (spell.duration.roll) {
                    const duration = rollDiceA(spell.duration.roll.diceType, spell.duration.roll.numDice)
                    msg += "\nDuration: " + toPlusString(duration, false) + " = " + spell.duration.type + (sum(duration) > 1) ? "s" : ""
                }
                if (spell.damage) {
                    const dmg = rollDiceA(spell.damage.diceType, spell.damage.numDice)
                    msg += "\nDamage: " + toPlusString(dmg, false) + " = " + sum(dmg)
                }
                if (spell.heal) {
                    const heal = rollDiceA(spell.heal.diceType, spell.heal.numDice)
                    msg += "\nHeal: " + toPlusString(heal, false) + " = " + sum(heal)
                }
            } else if (result > 1) {
                msg += "\nFAILED! Required: " + required
            } else {
                msg += "\nCRITICAL FAILURE!"
                spell.disabled = true
            }
        }
        notifiy(msg);
        dispatch("rolled", { result });
    }

    function rollWithAdvantage() {
        const outcome1 = rollDiceA(diceType, numDice);
        const outcome2 = rollDiceA(diceType, numDice);
        const result = Math.max(sum(outcome1), sum(outcome2));
        const msg = `rolled ${numDice}${diceType}: ${toPlusString(outcome1)} vs. ${toPlusString(outcome2)};\n ${result} + ${modifier} = ${result + modifier}`;
        notifiy(msg);
        dispatch("rolled", { result });
    }

    function rollWithDisadvantage() {
        const outcome1 = rollDiceA(diceType, numDice);
        const outcome2 = rollDiceA(diceType, numDice);
        const result = Math.min(sum(outcome1), sum(outcome2));
        const msg = `rolled ${numDice}${diceType}: ${toPlusString(outcome1)} vs. ${toPlusString(outcome2)};\n ${result} + ${modifier} = ${result + modifier}`;
        notifiy(msg);
        dispatch("rolled", { result });
    }

    function rollSecretly() {
        const outcome = rollDiceA(diceType, numDice);
        const msg = `rolled ${numDice}${diceType}: ${toPlusString(outcome)} + ${modifier} = ${sum(outcome) + modifier}`;
        notifiy(msg, {secret: true});
    }

    async function onRightClick(e: MouseEvent) {
        if (!disabled) {
            if (showMenu) {
                showMenu = false;
                await new Promise((res) => setTimeout(res, 100));
            }
            pos = {x: e.clientX, y: e.clientY};
            showMenu = true;
        }
    }

    function closeMenu() {
        showMenu = false;
    }
</script>

<div>
    <button
            on:click={rolled}
            {disabled}
            on:contextmenu|preventDefault={onRightClick}
            on:touchstart={touchStart}
            on:touchend={touchEnd}
            class="bg-black text-white pt-1 px-1 rounded-md"
            class:opacity-50={disabled}
            class:cursor-not-allowed={disabled}
    >
        <slot>
            <div class="rounded-md bg-black text-white p-1">
                {#if display === "modifier"}
                    {addSign(modifier)}
                {:else if display === "dice"}
                    {numDice}{diceType}
                {/if}
            </div>
        </slot>
    </button>

    {#if showMenu}
        <Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
            <MenuOption on:click={rolled} text="Roll"/>
            <MenuOption on:click={rollSecretly}>
                <div class="text-black">Roll Secretly</div>
            </MenuOption>
            <MenuOption on:click={rollWithAdvantage}>
                <div class="text-green-700">Roll With Advantage</div>
            </MenuOption>
            <MenuOption on:click={rollWithDisadvantage}>
                <div class="text-red-700">Roll With Disadvantage</div>
            </MenuOption>
        </Menu>
    {/if}
</div>
