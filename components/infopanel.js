import gameStyles from "../styles/game.module.css"
import Image from "next/image"
import React, {useEffect, useState, useRef} from "react";

export default function InfoPanel({ selectedCard }) {

    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.05);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = false;
        } else {
            const audio = document.getElementById("bg-audio")
            audio.play().catch(error => console.log("Playback error: ", error));
        }

        // Trigger the scaling effect when selectedCard changes
        if (selectedCard) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [volume, selectedCard]);

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className={gameStyles.infoPanel}>

            <p className={gameStyles.infoText}>Information</p>

            {
                selectedCard ?
                (  <div
                    className={`${gameStyles.cardContainer} ${isVisible ? gameStyles.visible : ''}`}>
                    <div className={gameStyles.cardHeader} style={ { backgroundColor: selectedCard.hexColor } }>
                        <p className={gameStyles.infoPanelTitle} >{selectedCard.name}</p>
                    </div>

                    <div className={gameStyles.infoPanelBody}>
                        <ul>
                            <p className={gameStyles.infoPanelMoney} >{selectedCard.rent}</p>
                            <p className={gameStyles.infoPanelMoney} style={ {paddingTop: "1px"}} >{selectedCard.rent * 2}</p>
                            <p className={gameStyles.infoPanelMoney} style={ {paddingTop: "2px"}} >{selectedCard.rent * 2}</p>
                            <p className={gameStyles.infoPanelMoney} style={ {paddingTop: "0px"}} >{selectedCard.rentHouse}</p>
                            <p className={gameStyles.infoPanelMoney} style={ {paddingTop: "2px"}}>{selectedCard.rent2Houses}</p>
                            <p className={gameStyles.infoPanelMoney} style={ {paddingTop: "1.5px"}}>{selectedCard.rent3Houses}</p>
                            <p className={gameStyles.infoPanelMoney} style={ {paddingTop: "1px"}}>{selectedCard.rent4Houses}</p>
                        </ul>

                        <ul style = {{paddingRight: "43px"}}>
                            <p className={gameStyles.infoPanelMoney} style= { { paddingTop: "2px"} }>{selectedCard.pricePerHouse}</p>
                            <p className={gameStyles.infoPanelMoney} style = { { paddingTop: "3px"} }>{selectedCard.pricePerHouse}</p>
                        </ul>
                    </div>

                    <Image src="/PropertyBase.png" width={157} height={244} ></Image>
                </div>)
                :
                (<p className={gameStyles.infoText} style={{color:"gray", fontSize: "20px"}}>No cards have been selected.</p> )
            }

            <p className={gameStyles.infoText}>Audio Sliders</p>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />


            <audio audio ref={audioRef} autoPlay loop muted defaultValue={volume}>
                <source src="/exhibitA.mp3" type="audio/mpeg" />  
            </audio>  
            
            <audio id = "card-audio">
                <source src="/flipcard.mp3" type="audio/mpeg" />  
            </audio>  
        </div>
    )
}