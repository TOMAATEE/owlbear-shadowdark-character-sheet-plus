<script lang="ts">
    export let showModal: boolean = true
    export let vw: number = undefined
    export let vh: number = undefined

    let dialog: HTMLDialogElement
    let content: HTMLElement

    $: if (dialog) {
        if (showModal) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }

    function handleDialogClick(event: MouseEvent) {
        if (!content) return

        const rect = content.getBoundingClientRect()
        const x = event.clientX
        const y = event.clientY

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            showModal = false
        }
    }

    function onDialogClose() {
        showModal = false
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        class="max-w-3xl"
        style={`min-width: 10rem;` + (vw ? ` width: ${vw}vw;` : "") + (vh ? ` height: ${vh}vh;` : "")}
        bind:this={dialog}
        on:click={handleDialogClick}
        on:close={onDialogClose}
>
    <div bind:this={content} on:click|stopPropagation>
        <div class="flex items-center justify-between">
            <slot name="header" />
            <button
                    class="p-1 hover:bg-gray-200 rounded-md"
                    on:click={() => (showModal = false)}
            ><i class="material-icons">close</i>
            </button>
        </div>
        <hr/>
        <slot/>
        <hr/>
    </div>
</dialog>

<style>
    dialog {
        border: none;
        padding: 0;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3)
    }

    dialog > div {
        padding: 1em
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
    }

    @keyframes zoom {
        from {
            transform: scale(0.95)
        }
        to {
            transform: scale(1)
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out
    }

    @keyframes fade {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
</style>
