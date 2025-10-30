import {writable} from "svelte/store"
import {PlayerCharacterStore} from "../model/PlayerCharacter"
import {defaultPC} from "../model/PlayerCharacter"
import {debounce} from "../utils"
import {CurrentSaveSlot, NUM_SLOTS} from "./SaveSlotTracker"
import {maintainBackwardsCompat as maintainBackwardsCompatPlayer} from "./JSONImporter"
import type {PlayerCharacter} from "../types"

export const isSaveInProgress = writable(false)

export async function clearLocalStorage() {
    for (let i = 0; i < NUM_SLOTS; i++) {
        await asyncLocalStorage.removeItem(getStorageKey(i + 1))
    }
}

export async function init() {
    const slot = await getSaveSlot()
    CurrentSaveSlot.set(slot)

    await setupPlayerCharacterStore(slot)

    CurrentSaveSlot.subscribe(async (newSlot) => {
        const pc = await loadPlayerFromLocalStorage(newSlot)
        PlayerCharacterStore.set(pc)
        saveSaveSlot(newSlot)
    })
}

export async function setupPlayerCharacterStore(saveSlot: number) {
    const pc = await loadPlayerFromLocalStorage(saveSlot)

    PlayerCharacterStore.set(pc)

    PlayerCharacterStore.subscribe(
        debounce((pc) => {
            if (!pc || typeof pc !== "object") return
            savePlayerToLocalStorage(pc, saveSlot)
        }, 1000)
    )
}

export async function savePlayerToLocalStorage(pc: PlayerCharacter, saveSlot: number) {
    if (!pc || typeof pc !== "object") return
    try {
        asyncLocalStorage.setItem(getStorageKey(saveSlot), JSON.stringify(pc))
    } catch (err) {
        console.error("LocalStorage write failed", err)
    }
}

function getStorageKey(saveSlot: number) {
    return `sd-character-sheet-slot-${saveSlot}`
}

export async function getSaveSlot(): Promise<number> {
    return parseInt(
        (await asyncLocalStorage.getItem("sd-character-sheet-chosen-slot")) ?? "1",
    )
}

export async function saveSaveSlot(slot: number) {
    asyncLocalStorage.setItem("sd-character-sheet-chosen-slot", `${slot}`)
}

export async function loadPlayerFromLocalStorage(saveSlot: number): Promise<PlayerCharacter> {
    await maintainBackwardsCompatSlot(saveSlot)
    const pcJson = await asyncLocalStorage.getItem(getStorageKey(saveSlot))
    if (!pcJson || pcJson === "undefined") return defaultPC()
    try {
        const pc = JSON.parse(pcJson) as PlayerCharacter
        maintainBackwardsCompatPlayer(pc)
        return pc
    } catch (err) {
        console.error("Failed to parse localStorage entry:", pcJson, err)
        return null
    }
}

async function maintainBackwardsCompatSlot(saveSlot: number) {
    const oldStorageKey = "sd-character-sheet"
    const oldPcJson = await asyncLocalStorage.getItem(oldStorageKey)
    if (!oldPcJson) return
    await asyncLocalStorage.setItem(getStorageKey(saveSlot), oldPcJson)
    await asyncLocalStorage.removeItem(oldStorageKey)
}

export const asyncLocalStorage = {
    setItem: async function (key: string, value: string) {
        return Promise.resolve().then(function () {
            window.localStorage.setItem(key, value)
        })
    },
    getItem: async function (key: string) {
        return Promise.resolve().then(function () {
            return window.localStorage.getItem(key)
        })
    },
    removeItem: async function (key: string) {
        return Promise.resolve().then(function () {
            return window.localStorage.removeItem(key)
        })
    },
}
