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

    return (
        <Game>
            <div className={gameStyles.container}>
                <section>
                    <InfoPanel selectedCard={selectedCard} onDieClick={setRollDie} />
                </section>
                <section>
                    <Board selectedCard={selectedCard} onCardClick={setSelectedCard} dieRolled={rollDie} />
                </section>

                <section>
                    <AIPanel />
                </section>
            </div>

        </Game>
        
    )
}