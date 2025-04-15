import React from "react"
import Game from "../components/game.js"
import Board from "../components/board.js"
import gameStyles from "../styles/game.module.css"; 

import { useEffect, useState } from "react";
import InfoPanel from "../components/infopanel.js";
import AIPanel from "../components/aipanel.js";

export default function RootLayout({ }) {

    const [selectedCard, setSelectedCard] = useState(null);
    const [rollDie, setRollDie] = useState(false);
    const [currentSpot, setSpotCard] = useState(null);

    return (
        <Game>
            <div className={gameStyles.container}>
                <section>
                    <InfoPanel selectedCard={selectedCard} onDieClick={setRollDie} completedDieRoll={rollDie} currentSpot={currentSpot} />
                </section>
                <section>
                    <Board selectedCard={selectedCard} onCardClick={setSelectedCard} dieRolled={rollDie} onDieRolled={setRollDie} setSpotCard={setSpotCard} />
                </section>

                <section>
                    <AIPanel />
                </section>
            </div>
        </Game>
    )
}