import { COW_IMG_URI } from "../game/config.ts";

export function CowImg({id}: {id: number}) {
    return <img src={`${COW_IMG_URI}${id}.png`} width="100" height="100" alt={`cow ${id}`}/>
}
