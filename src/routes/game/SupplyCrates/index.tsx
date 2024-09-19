import { useGame } from "../../../hooks/gameContext.ts";
import Button from "react-bootstrap/Button";


const DAY = 60 * 60 * 24;

export default function SupplyCrates() {
  const { player, constants, gameActions } = useGame();

  const timestampNow = Math.floor(Date.now() / 1000);

  const timeUntilCanOpen = player.supplyCrates.nextClaimTime - timestampNow;
  const stillInARow = timestampNow - player.supplyCrates.lastClaimTime < DAY;

  const nextDayIndex = stillInARow ? player.supplyCrates.claimsInARow + 1 : 0;

  return <div>
    {timeUntilCanOpen <= 0 ?
      "Can open crate now!" :
      `Can open crate in ${timeUntilCanOpen} seconds`
    }
    <br/>
    Will get rewards of day: <strong>{nextDayIndex + 1}</strong>
    <br/>
    <Button variant={"success"} onClick={async () => alert(await gameActions.supplyCratesClaim())}>Open crate</Button>
    <hr/>


    Rewards by day:
    {
      constants.supplyCrates.map((rewards, day) =>
        <div key={day}>
          Day {day + 1}: {rewards.hay} hay, {rewards.apples} apples, {rewards.mooTokens} moo tokens
        </div>
      )
    }

  </div>
}
