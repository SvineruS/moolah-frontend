import { useGame } from "../../../hooks/gameContext.ts";
import Button from "react-bootstrap/Button";


export default function Exchange() {
  const { player, constants, gameActions } = useGame();

  const timeNow = Math.floor(Date.now() / 1000);

  return <div>

    Your balance: <br/>
    Milk: {player.balances.milk} <br/>
    Beef: {player.balances.beef} <br/>
    Moo: {player.balances.moo} <br/>


    <hr/>
    {constants.exchangerRecipes.map((recipe, index) => {
      const endTime = player.exchangerCrafts[index].endTime;

      return <div key={index}>
        Price: {recipe.ingredientAmount} •
        Receive $MOO: {recipe.resultMooAmount} •
        Duration: {recipe.time} seconds

        {
          endTime == 0 ?
            <Button onClick={async () => alert(await gameActions.exchangeCraft(index))}>Craft</Button> :
            endTime > timeNow ?
              <div>Crafting in progress... Remaining time: {endTime - timeNow}</div> :
              <div>Crafting is complete!</div>
        }

      </div>
    })}

    <hr/>
    <Button onClick={async () => alert(await gameActions.exchangeClaim())}>Claim</Button>


  </div>
}

