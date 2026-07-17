<script lang="ts">
    import {
        PlayerCharacterStore as pc,
    } from "../model/PlayerCharacter"

    function onToggleCustomLuckToken(e: Event) {
        $pc.multipleLuckTokens = (e.target as HTMLInputElement).checked
    }

    function onLuckTokenChange(e: Event) {
        const val = parseInt((e.target as HTMLSelectElement).value)
        $pc.luckToken = val > 0 ? val : 0
        $pc = $pc
    }
</script>

<div class="flex justify-between">
    <h2>LUCK TOKEN</h2>
    <input
            id="multipleLuckTokens"
            type="checkbox"
            checked={$pc.multipleLuckTokens}
            title="Multiple Tokens"
            on:input={onToggleCustomLuckToken}
    />
    <label for="multipleLuckTokens"></label>
</div>
{#if $pc.multipleLuckTokens}
    <input type="number" bind:value={$pc.luckToken} on:change={onLuckTokenChange}/>
{:else}
    <label class="flex items-center cursor-pointer relative">
        <input type="checkbox"
               class="peer h-9 mx-1 cursor-pointer appearance-none rounded-full bg-slate-100 border border-slate-300 checked:bg-slate-800 checked:border-slate-800 transition-all duration-150 big"
               id="check-custom-style"
               checked={$pc.luckToken >= 1}
               on:change={onLuckTokenChange}
        />
        <span class="coin" aria-hidden="true">
            <img src="/coin.svg" alt="Coin" class="h-10 w-10"/>
        </span>
    </label>
{/if}

<style lang="postcss">
    .big {
        @apply w-full
    }

    @keyframes coinFlip {
        0% {
            transform: translate(-50%, -50%) scale(0.6) rotateY(0deg);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.12) rotateY(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotateY(360deg);
            opacity: 1;
        }
    }

    .coin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.6);
        transform-style: preserve-3d;
        backface-visibility: hidden;
        opacity: 0;
        pointer-events: none;
    }

    input:checked + .coin {
        opacity: 1;
        animation: coinFlip 0.7s ease-out forwards;
    }
</style>