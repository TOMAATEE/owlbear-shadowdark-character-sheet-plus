import OBR from "@owlbear-rodeo/sdk";
import {get} from "svelte/store";
import {pushNotification} from "./NotificationLogger";
import {pluginId} from "./OBRHelper";
import {Settings} from "./SettingsTracker";

export const NOTIFICATION_KEY = pluginId("notification");

export type NotifyOptions = {
    secret?: boolean;
};

export async function notify(msg: string, options: NotifyOptions = {}) {
    if (!OBR.isAvailable) {
        alert(msg);
        return;
    }

    const myName = await OBR.player.getName();
    const m = `${myName}: ${msg}`;

    if (options.secret) {
        await showNotification(`Secret: ${m}`);
    } else {
        await OBR.broadcast.sendMessage(NOTIFICATION_KEY, m);
        await showNotification(m);
    }
}

let timeoutHandle: NodeJS.Timeout;

export async function showNotification(msg: string) {
    pushNotification(msg);
    if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
    }
    try {
        const popoverId = await OBR.notification.show(msg)
        timeoutHandle = setTimeout(
            () => {
                OBR.notification.close(popoverId)
            },
            (get(Settings).popoverDuration ?? 5) * 1000
        ) as unknown as NodeJS.Timeout
    } catch {
        alert(msg);
    }
}
