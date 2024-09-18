import { useEffect, useState } from "react";
import SlotCounter from 'react-slot-counter';
import Button from "react-bootstrap/Button";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useGame } from "../../../hooks/gameContext.ts";
import { Constants, Pasture, PastureUpgrades } from "../../../types/game.ts";
import "./farm.css"
import { CowImg } from "../../../components/CowImg.tsx";


export default function Farm() {
  const { player, pastures } = useGame()

  if (!player.isRegistered) return <div>You are not registered! </div>
  // todo select pasture
  if (!pastures?.length) {
    return <div>
      You have no pastures!
    </div>
  }

  return <div>
    <PastureHTML pasture={pastures[0]}/>
  </div>
}


function PastureHTML({ pasture }: { pasture: Pasture }) {
  const { constants } = useGame()

  const pastureHelper = new PastureHelper(pasture, constants);


  return <div>
    <MilkHTML pastureHelper={pastureHelper}/>
    <hr/>
    <CowsHTML pastureHelper={pastureHelper}/>
    <hr/>
    <FoodHtml pastureHelper={pastureHelper}/>
    <hr/>
    <UpgradesHTML pastureHelper={pastureHelper}/>
  </div>
}

function MilkHTML({ pastureHelper }: { pastureHelper: PastureHelper }) {
  const { player, gameActions } = useGame()

  const [milk, setMilk] = useState(pastureHelper.milk());
  const milkCapacity = pastureHelper.milkCapacity();

  const progress = milk / milkCapacity * 100;

  useEffect(() => {
    const interval = setInterval(() => setMilk(pastureHelper.milk()), 1000);
    return () => clearInterval(interval);
  }, [pastureHelper]);

  async function claimMilk() {
    const res = await gameActions.claimMilk(pastureHelper.pasture.address)
    alert(JSON.stringify(res));
    console.log(res)
  }

  return <div>
    <div>
      <ProgressBar style={{ width: 200 }} variant={"info"} animated now={progress}/>
      <div style={{ display: "flex" }}>
        <div> Milk:</div>
        <SlotCounter value={milk.toFixed(0)}/> /
        <SlotCounter value={milkCapacity}/>
      </div>
      MilkRate: {pastureHelper.currentMilkRate()} <br/>

      Your Milk: {player.balances.milk} <br/>
    </div>
    <Button variant={'success'} onClick={claimMilk}>Claim!</Button>
  </div>
}


function CowsHTML({ pastureHelper }: { pastureHelper: PastureHelper }) {
  const { gameActions } = useGame()
  const [cowsType, setCowsType] = useState("0")
  const [cowsCount, setCowsCount] = useState("1")


  async function addCows() {
    const res = await gameActions.addCows(pastureHelper.pasture.address, Number(cowsType), Number(cowsCount))
    alert(JSON.stringify(res));
    console.log(res)
  }

  return <div>
    {
      pastureHelper.pasture.cows === 0 ?
        <>No cows!</> :
        pastureHelper.isCowsDead() ?
          <>Cows are dead :(</> :
          <>
            <CowImg id={pastureHelper.pasture.cowType}/> <br/>
            CowType: {pastureHelper.pasture.cowType} <br/>
            Count: {pastureHelper.pasture.cows} <br/>
          </>
    }
    <br/>
    CowCapacity: {pastureHelper.cowCapacity()} <br/>

    <br/>
    CowType: <input type={"number"} value={cowsType} onChange={(e) => setCowsType(e.target.value)}/> <br/>
    Count: <input type={"number"} value={cowsCount} onChange={(e) => setCowsCount(e.target.value)}/> <br/>
    <Button variant={"outline-success"} onClick={addCows}>Add Cows</Button>
  </div>
}

function FoodHtml({ pastureHelper }: { pastureHelper: PastureHelper }) {
  const { gameActions, player } = useGame()

  async function feedCows() {
    const res = await gameActions.feedCows(pastureHelper.pasture.address, 10)
    alert(JSON.stringify(res));
    console.log(res)
  }

  async function useApple() {
    const res = await gameActions.useApple(pastureHelper.pasture.address)
    alert(JSON.stringify(res));
    console.log(res)
  }

  return <div>
    Food: {pastureHelper.food()} / {pastureHelper.foodCapacity()} <br/>
    Cows will die at: {new Date(pastureHelper.pasture.deathFromHungerTime * 1000).toLocaleString()} <br/>
    Apple active: {pastureHelper.isAppleActive() ?
    `YES, until ${new Date(pastureHelper.pasture.appleTime * 1000).toLocaleString()}` :
    "NO"} <br/>

    Your Hay: {player.balances.hay} <br/>
    Your Apples: {player.balances.apple} <br/>
    <br/>
    <Button variant={"outline-warning"} onClick={feedCows}>Feed Cows Hay</Button> <br/>
    <Button variant={"outline-warning"} onClick={useApple}>Feed Cows Apple</Button>
  </div>
}


function UpgradesHTML({ pastureHelper }: { pastureHelper: PastureHelper }) {
  const [showUpgrades, setShowUpgrades] = useState(false);
  const handleClose = () => setShowUpgrades(false);
  const handleShow = () => setShowUpgrades(true);

  const pasture = pastureHelper.pasture;

  return <div>
    Current upgrades: <br/>
    Cow Capacity: {pasture.cowCapacityLevel + 1} lvl = {pastureHelper.cowCapacity()}<br/>
    Milk Capacity: {pasture.milkCapacityLevel + 1} lvl = {pastureHelper.milkCapacity()} <br/>
    Milk Rate Multiplier: {pasture.milkRateMultiplierLevel + 1} lvl = {pastureHelper.milkRateMultiplier()} <br/>
    <br/>
    <Button variant="outline-primary" onClick={handleShow}>Buy Upgrades!</Button>
    <UpgradesModal_ show={showUpgrades} handleClose={handleClose} pasture={pasture}/>
  </div>

}

type pastureUpgradesKeys = keyof PastureUpgrades

function UpgradesModal_({ show, handleClose, pasture }: { show: boolean, handleClose: () => void, pasture: Pasture }) {
  const { constants } = useGame()
  const [cowCap, setCowCap] = useState(pasture.cowCapacityLevel)
  const [milkCap, setMilkCap] = useState(pasture.milkCapacityLevel)
  const [milkMult, setMilkMult] = useState(pasture.milkRateMultiplierLevel)

  const calcUpgradePrice = (name: pastureUpgradesKeys, fromLvl: number, toLvl: number) => {
    const upgrade = constants.pastureUpgrades[name];
    return upgrade[toLvl].cumulativePrice - upgrade[fromLvl].cumulativePrice
  }


  const milkAmount =
    calcUpgradePrice('milkCapacity', pasture.milkCapacityLevel, milkCap) +
    calcUpgradePrice('milkRateMultiplier', pasture.milkRateMultiplierLevel, milkMult)
  const beefAmount = calcUpgradePrice('cowCapacity', pasture.cowCapacityLevel, cowCap)


  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Upgrades</Modal.Title>
    </Modal.Header>
    <Modal.Body>

      <Upgrade text={'Cow Capacity'} name={'cowCapacity'} lvl={cowCap} setValue={setCowCap}/>
      <Upgrade text={'Milk Capacity'} name={'milkCapacity'} lvl={milkCap} setValue={setMilkCap}/>
      <Upgrade text={'Milk Rate Multiplier'} name={'milkRateMultiplier'} lvl={milkMult} setValue={setMilkMult}/>

      <hr/>
      <strong>You will pay:</strong> <br/>
      MILK: {milkAmount} <br/>
      BEEF: {beefAmount}

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}> Cancel </Button>
      <Button variant="primary" onClick={handleClose}> Upgrade! </Button>
    </Modal.Footer>
  </Modal>
}

function Upgrade({ text, lvl, setValue, name }: {
  text: string,
  lvl: number,
  setValue: (a: number) => any,
  name: pastureUpgradesKeys
}) {
  const { constants } = useGame()
  const upgrade = constants.pastureUpgrades[name];

  return <div>
    {text}: {upgrade[lvl].value} <br/>
    Level: {lvl + 1} / {upgrade.length} <br/>

    {lvl + 1 < upgrade.length &&
      <Button variant="success" onClick={() => setValue(lvl + 1)}>
        Up: {upgrade[lvl + 1].upgradePrice}
      </Button>
    }
  </div>
}


class PastureHelper {
  public milkRate: number

  constructor(public pasture: Pasture, public constants: Constants) {
  }

  milkCapacity() {
    return this.constants.pastureUpgrades.milkCapacity[this.pasture.milkCapacityLevel].value
  }

  cowCapacity() {
    return this.constants.pastureUpgrades.cowCapacity[this.pasture.cowCapacityLevel].value
  }

  milkRateMultiplier() {
    return this.constants.pastureUpgrades.milkRateMultiplier[this.pasture.milkRateMultiplierLevel].value / 10_000
  }

  foodCapacity() {
    return 1_000_000;  // todo?
  }

  defaultMilkRate() {
    return this.pasture.cows * this.milkRateMultiplier() *
      this.constants.cowStats[this.pasture.cowType].milkRate;
  }

  currentMilkRate() {
    const defaultMilkRate = this.defaultMilkRate();
    return this.isAppleActive() ? defaultMilkRate * 2 : defaultMilkRate;
  }

  milk() {
    let milk = this.pasture.milkNotClaimed;

    const startTime = this.pasture.milkLastUpdate;
    const appleTime = this.pasture.appleTime;
    const finishTime = this.lastTimeWhenCowsAlive();

    if (startTime < finishTime) {
      const defaultMilkRate = this.defaultMilkRate();
      milk += defaultMilkRate * (finishTime - startTime);

      if (startTime < appleTime) {
        const appleFinishTime = Math.min(appleTime, finishTime);
        milk += defaultMilkRate * (appleFinishTime - startTime);
      }

    }

    return Math.min(milk, this.milkCapacity());
  }

  food() {
    const foodRate = this.constants.cowStats[this.pasture.cowType].foodRate * this.pasture.cows;
    const eatenFood = foodRate * (this.lastTimeWhenCowsAlive() - this.pasture.foodLastUpdate);
    return Math.max(this.pasture.foodAtLastUpdate - eatenFood, 0);
  }


  isAppleActive() {
    return this.pasture.appleTime > this.timeNow();
  }

  isCowsDead() {
    return this.pasture.deathFromHungerTime < this.timeNow();
  }

  private lastTimeWhenCowsAlive() {
    return Math.min(this.timeNow(), this.pasture.deathFromHungerTime);
  }

  timeNow() {
    return Date.now() / 1000;
  }

}
