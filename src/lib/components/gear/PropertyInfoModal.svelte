<script lang="ts">
    import {ARMOR_PROPERTIES, WEAPON_PROPERTIES} from "../../constants"
    import Labelled from "../Labelled.svelte"
    import Modal from "../Modal.svelte"

    export let showModal = false

    const descriptions = {
        "Breakable": "This weapon breaks on a natural 1 attack roll",
        "Caltrops": "Can be used as caltrops",
        "Charge": "You can only attack with this weapon after moving at least a near distance",
        "Devastating": "This weapon deals x4 damage on a critical hit and is then destroyed",
        "Finesse": "You can use your Strength or Dexterity when attacking with this weapon",
        "Heavy": "You cannot swim while wearing this armor",
        "Loading": "You must forgo moving to reload this weapon",
        "Loud": "You have DISADV on checks to move stealthily while wearing this armor",
        "Magic": "Gear with additional benefits and/or curses, sometimes has a personality",
        "Mounted": "This weapon can only be wielded while mounted",
        "Restrictive": "You have DISADV on checks to swim while wearing this armor",
        "Returning": "This weapon returns to the thrower",
        "Sniper": "You can stay hidden after attacking with this weapon",
        "Sundering": "When you are hit with a melee attack, you may choose to destroy this weapon or armor to negate all damage from the attack",
        "Thrown": "You may throw this weapon to make a ranged attack with it using STR or DEX",
        "Versatile": "You can use this weapon with one or two hands. Use the higher damage die if you’re wielding it with two",
        "OneHanded": "You can use this with one hand",
        "TwoHanded": "You must use this with two hands",
    } satisfies Record<(typeof ARMOR_PROPERTIES | typeof WEAPON_PROPERTIES)[number], string>
</script>

<Modal bind:showModal>
    <h2 slot="header">Properties</h2>
    {#each Object.entries(descriptions) as [property, description]}
        <div class="py-0.5">
            <Labelled label={property} text={description}/>
        </div>
    {/each}
</Modal>