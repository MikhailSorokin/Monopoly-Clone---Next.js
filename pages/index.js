import React from "react"
import Game from "../components/game.js"
import Board from "../components/board.js"
import gameStyles from "../styles/game.module.css"; 

import { useEffect, useState } from "react";
import InfoPanel from "../components/infopanel.js";

export default function RootLayout({ }) {

    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <Game>
            <div className={gameStyles.container}>
                <section>
                    <InfoPanel selectedCard={selectedCard} />
                </section>
                <section>
                    <Board selectedCard={selectedCard} onCardClick={setSelectedCard} />
                </section>
            </div>

        </Game>
        
    )
}