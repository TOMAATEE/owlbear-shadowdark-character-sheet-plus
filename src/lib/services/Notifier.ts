import OBR from "@owlbear-rodeo/sdk"
import {get} from "svelte/store"
import {pushNotification} from "./NotificationLogger"
import {pluginId} from "./OBRHelper"
import {Settings} from "./SettingsTracker"

export const NOTIFICATION_KEY = pluginId("notification")

export type NotifyOptions = {
    secret?: boolean
}

export async function notify(msg: string, options: NotifyOptions = {}) {
    if (!OBR.isAvailable) {
        alert(msg)
        return
    }

    const myName = await OBR.player.getName()
    const m = `${myName}: ${msg}`

    if (options.secret) {
        await showNotification(`Secret: ${m}`)
    } else {
        await OBR.broadcast.sendMessage(NOTIFICATION_KEY, m)
        await showNotification(m)
    }
}

let timeoutHandle: NodeJS.Timeout
const notificationQueue: string[] = []
let isShowing = false

async function processQueue() {
    if (isShowing || notificationQueue.length === 0) return
    isShowing = true

    const msg = notificationQueue.shift()
    try {
        const popoverId = await OBR.notification.show(msg)
        await new Promise(resolve =>
            setTimeout(resolve, (get(Settings).popoverDuration ?? 5) * 1000)
        )
        await OBR.notification.close(popoverId)
    } catch (e) {
        console.error("Notification display failed:", e)
        alert(msg)
    } finally {
        isShowing = false
        // next notification
        await processQueue()
    }
}

export async function showNotification(msg: string) {
    pushNotification(msg)
    if (timeoutHandle) {
        clearTimeout(timeoutHandle)
        timeoutHandle = null
    }
    try {
        notificationQueue.push(msg)
        await processQueue()
    } catch {
        alert(msg)
    }
}
