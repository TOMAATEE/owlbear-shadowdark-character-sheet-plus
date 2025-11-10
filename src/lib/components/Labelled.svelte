<script lang="ts">
    export let label = ""
    export let text = ""
    export let subLabels: string[] = []
    export let subTexts: string[] = []

    $: entries = Array.from(
        { length: Math.min(subLabels.length, subTexts.length) },
        (_, i) => ({ label: subLabels[i], text: subTexts[i] })
    )
</script>

<div>
    {#if label}
        <strong>{label}:</strong>
    {/if}
    {text}
</div>

{#each entries as { label, text }}
    <div>
        <strong>• {label ? `${label}:` : ''}</strong> {text}
    </div>
{/each}
