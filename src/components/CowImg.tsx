export function CowImg({id}: {id: number}) {
    return <img src={`/cows/${id}.png`} width="100" height="100" alt={`cow ${id}`}/>
}
