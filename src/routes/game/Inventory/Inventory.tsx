import { useGame } from "../../../hooks/gameContext.ts";
import { CowImg } from "../../../components/CowImg.tsx";

function Cow({ cow }) {
    const { constants } = useGame();

    const cowStats = constants.cowStats[cow.id];
    return <div>
        <CowImg id={cow.id} />
        CowID: {cow.id} <br/>
        Cow Name: {cowStats.name} <br/>
        Count: {cow.count} <br/>
        MilkRate: {cowStats.milkRate} <br/>
        BeefRate: {cowStats.beefRate} <br/>
        FoodRate: {cowStats.foodRate} <br/>
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

