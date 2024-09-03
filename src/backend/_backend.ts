import { backendHttpUrl } from "../config/config.ts";

export async function _backend(url: string, data: any = {}) {
    const init: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // "X-Auth": authString,
        }

    }
    const res = await fetch(backendHttpUrl + url, init)

    if (res.status >= 400)
        throw new Error(res.statusText + ": " + await res.text())

    return await res.json()


}
