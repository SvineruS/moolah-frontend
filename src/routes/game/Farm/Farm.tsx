import { useEffect, useState } from "react";
import SlotCounter from 'react-slot-counter';
import Button from "react-bootstrap/Button";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useGame } from "../../../hooks/gamestate.ts";
import { Pasture, pastureUpgradesKeys } from "../../../types/game.ts";
import "./farm.css"


export default function Farm() {
    const { player } = useGame()

    // todo select pasture

    return <div>
        <PastureHTML pasture={player.pastures[0]}/>
    </div>
}


function PastureHTML({pasture}: { pasture: Pasture }) {
    const { constants } = useGame()

    const milkCapacity = constants.pastureUpgrades.milkCapacity[pasture.milkCapacityLevel].value
    const [showUpgrades, setShowUpgrades] = useState(false);
    const [milk, setMilk] = useState(calcMilk());


    useEffect(() => {
        const interval = setInterval(() => setMilk(calcMilk()), 1000);

        return () => clearInterval(interval);
    }, []);

    const handleClose = () => setShowUpgrades(false);
    const handleShow = () => setShowUpgrades(true);



    function calcMilk() {
        const timeNow = Date.now() / 1000
        const milk_ = pasture.milkNotClaimed + (timeNow - pasture.milkLastUpdate) * pasture.milkRate
        return Math.floor(Math.min(milk_, milkCapacity))
    }

    const progress = milk / milkCapacity * 100;

    return <div>
        <div className={"milkProgress"}>
            <div style={{flex: 1}}>
                <ProgressBar variant={"info"} animated now={progress}/>
                <div style={{display: "flex"}}>
                    <div> Milk progress bar: </div>
                    <SlotCounter value={milk}/> /
                    <SlotCounter value={milkCapacity}/>
                </div>
                MilkRate: {pasture.milkRate}
            </div>
            <Button variant={'success'}>Claim!</Button>
        </div>

        Cows <br/>
        Havka <br/>

        <Button variant="primary" onClick={handleShow}>Upgrades</Button>
        <UpgradesModal show={showUpgrades} handleClose={handleClose} pasture={pasture}/>
    </div>
}




function UpgradesModal({show, handleClose, pasture}: { show: boolean, handleClose: () => void, pasture: Pasture }) {
    const { constants } = useGame()
    const [cowCap, setCowCap] = useState(pasture.cowCapacityLevel)
    const [milkCap, setMilkCap] = useState(pasture.milkCapacityLevel)
    const [milkMult, setMilkMult] = useState(pasture.milkRateMultiplierLevel)


    function Upgrade({text, lvl, setValue, name}: {
        text: string,
        lvl: number,
        setValue: (a: number) => any,
        name: pastureUpgradesKeys
    }) {
        const upgrade = (constants.pastureUpgrades)[name];

        return <div>
            {text}: {upgrade[lvl].value} <br/>
            Level: {lvl + 1} / {upgrade.length} <br/>
            {lvl + 1 < upgrade.length &&
                <Button variant="success" onClick={() => setValue(lvl + 1)}>
                    Up: {upgrade[lvl + 1].upgradePrice}
                </Button>}
        </div>
    }



    const calcUpgradePrice = (name: pastureUpgradesKeys, fromLvl: number, toLvl: number) =>
        (constants.pastureUpgrades)[name][toLvl].cumulativePrice-(constants.pastureUpgrades)[name][fromLvl].cumulativePrice


    const milkAmount =
        calcUpgradePrice('milkCapacity', pasture.milkCapacityLevel, milkCap) +
        calcUpgradePrice('milkRateMultiplier', pasture.milkRateMultiplierLevel, milkMult)
    const beedAmount = calcUpgradePrice('cowCapacity', pasture.cowCapacityLevel, cowCap)


    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Upgrades</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Upgrade text={'Cow Capacity'} name={'cowCapacity'} lvl={cowCap} setValue={setCowCap}/>
            <br/>
            <Upgrade text={'Milk Capacity'} name={'milkCapacity'} lvl={milkCap} setValue={setMilkCap}/>
            <br/>
            <Upgrade text={'Milk Rate Multiplier'} name={'milkRateMultiplier'} lvl={milkMult} setValue={setMilkMult}/>

            <hr/>

            MILK: {milkAmount} <br/>
            BEEF: {beedAmount}

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}> Cancel </Button>
            <Button variant="primary" onClick={handleClose}> Upgrade! </Button>
        </Modal.Footer>
    </Modal>
}
