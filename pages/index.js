import React from "react"
import Game from "../components/game.js"
import Board from "../components/board.js"
import gameStyles from "../styles/game.module.css"; 

import { useEffect, useState } from "react";
import InfoPanel from "../components/infopanel.js";

export default function RootLayout({ }) {

    useEffect(() => {
        const enableAudio = () => {
            const audio = document.getElementById("bg-audio")
            audio.play().catch(error => console.log("Playback error: ", error));
            document.removeEventListener("click", enableAudio);
        };
        document.addEventListener("click", enableAudio);
        return () => document.removeEventListener("click", enableAudio);
    }, []);

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

            <audio id = "bg-audio" autoPlay loop>
                <source src="/exhibitA.mp3" type="audio/mpeg" />  
            </audio>  
        </Game>
        
    )
}