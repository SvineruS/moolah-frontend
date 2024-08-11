import { useGame } from "../../../hooks/gamestate.ts";
import { COW_IMG_URI } from "../../../config/config.ts";

function Cow({ cow }) {
    const { constants } = useGame();

    return <div>
        <img src={`${COW_IMG_URI}${cow.id}.png`} width="100" height="100" alt="cow"/>
        CowID: {cow.id} <br/>
        Count: {cow.count} <br/>
        MilkRate: {constants.cowStats[cow.id].milkRate} <br/>
        BeefRate: {constants.cowStats[cow.id].beefRate}
        <br/>
        <br/>
    </div>;
}

export default function Inv() {
    const { player } = useGame();


    const resultCows = []
    for (const item of player.cows)
        resultCows.push(<Cow cow={item}/>)

    return <div>
        {
            player.cows.map((cow) =>
                <Cow key={cow.id} cow={cow}/>
            )
        }
    </div>
}

