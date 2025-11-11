<script lang="ts">
    import {SHIELD_PROPERTIES, WEAPON_PROPERTIES} from "../../constants"
    import Labelled from "../Labelled.svelte"
    import Modal from "../Modal.svelte"

    export let showModal = false

    const descriptions = {
        "Breakable": "This weapon breaks on a natural 1 attack roll",
        "Blowgun": "Firing this weapon from hiding doesn't reveal your position",
        "Bolas": "When you hit a legged creature the size of a horse or smaller, the target's speed is reduced to close until it frees itself (DC 15 STR or DEX check)",
        "Finesse": "You can use your Strength or Dexterity when attacking with this weapon",
        "Loading": "You must forgo moving to reload this weapon",
        "Lash": "When you make a ranged attack with this weapon, it does not leave your grasp",
        "Magic": "Gear with additional benefits and/or curses, sometimes has a personality",
        "Returning": "On a missed ranged attack, this weapon returns to the thrower",
        "Sundering": "When you are hit with a melee attack, you may choose to destroy this weapon or armor to negate all damage from the attack",
        "Spear-thrower": "When used to throw a spear, increase the spear's range to far",
        "Thrown": "You may throw this weapon to make a ranged attack with it using STR or DEX",
        "OneHanded": "You can use this with one hands",
        "TwoHanded": "You must use this with two hands",
        "Versatile": "You can use this weapon with one or two hands. Use the higher damage die if you’re wielding it with two",
    } satisfies Record<(typeof SHIELD_PROPERTIES | typeof WEAPON_PROPERTIES)[number], string>
</script>

<Modal bind:showModal>
    <h2 slot="header">Properties</h2>
    {#each Object.entries(descriptions) as [property, description]}
        <div class="py-0.5">
            <Labelled label={property} text={description}/>
        </div>
    {/each}
</Modal>