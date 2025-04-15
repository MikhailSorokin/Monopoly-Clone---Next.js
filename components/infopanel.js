import panelStyles from "../styles/panel.module.css"
import gameStyles from "../styles/game.module.css";
import Image from "next/image"
import React, {useEffect, useState, useRef} from "react";

export default function InfoPanel({ selectedCard , onDieClick, completedDieRoll, currentSpot }) {

    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const [selectedIcon, setSelectedIcon] = useState("inventory");

    const [money, setMoney] = useState(1500);
    const [cardInventory, setCardInventory] = useState([]);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
                audioRef.current.muted = false
                audioRef.current.play().catch(error => console.log("Playback error: ", error));
            }
            document.removeEventListener("click", handleUserInteraction)    
        };

        document.addEventListener("click", handleUserInteraction)


        // Trigger the scaling effect when selectedCard changes
        if (selectedCard) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [volume, selectedCard]);

    useEffect(() => {
        if (!completedDieRoll && currentSpot !== null) {
            setCardInventory(prev => [...prev, currentSpot]);
            console.log(cardInventory);
            setMoney(money - currentSpot.price);
        }
    }, [completedDieRoll]);

    return (
        <div className={panelStyles.infoPanel}>
            <section className={panelStyles.sideNav} style={ { zIndex: 500 } }>
    
                <svg className={panelStyles.iconStyle} onClick={() => { setSelectedIcon("inventory") } } style={ { color : selectedIcon == "inventory" ? "blue" : "white" } }   class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd"/>
                </svg>

                <svg className={panelStyles.iconStyle} onClick={() => { setSelectedIcon("game") } } style={ { color : selectedIcon == "game" ? "blue" : "white" } }  class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
                </svg>


                <svg className={panelStyles.iconStyle} onClick={() => { setSelectedIcon("volume") } } style={ { color : selectedIcon == "volume" ? "blue" : "white" } }  class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
                </svg>

            </section>

            {selectedIcon == "game" ? (
                <div>
                    <p className={panelStyles.infoText}>Information</p>

                    {selectedCard ? (
                        selectedCard.type == "railroad" ? ( 
                        <div className={`${panelStyles.cardContainer} ${isVisible ? panelStyles.visible : ''}`}>
                            <Image src="/TrainInfo.jpg" alt="property card image" width={243} height={378} />
                        </div>
                        ) :
                        selectedCard.type == "income" ? (
                            <div className={`${panelStyles.cardContainer} ${isVisible ? panelStyles.visible : ''}`}>
                            <Image src="/Income.jpg" alt="property card image" width={243} height={378} />
                            </div>
                        ) :
                        selectedCard.type == "utility" ? (
                            <div className={`${panelStyles.cardContainer} ${isVisible ? panelStyles.visible : ''}`}>
                            <Image src="/UtilityBase.jpg" alt="property card image" width={243} height={378} />
                            </div>
                        )
                        :
                        (
                            <div className={`${panelStyles.cardContainer} ${isVisible ? panelStyles.visible : ''}`}>
                                <div className={panelStyles.cardHeader} style={{ backgroundColor: selectedCard.hexColor }}>
                                    <p className={panelStyles.infoPanelTitle}>{selectedCard.name}</p>
                                </div>

                                <div className={panelStyles.infoPanelBody}>
                                    <ul>
                                        <li className={panelStyles.infoPanelMoney}>{selectedCard.rent}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "9px" }}>{selectedCard.rent * 2}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "11px" }}>{selectedCard.rent * 2}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "9px" }}>{selectedCard.rentHouse}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "9px" }}>{selectedCard.rent2Houses}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "9px" }}>{selectedCard.rent3Houses}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "9px" }}>{selectedCard.rent4Houses}</li>
                                    </ul>

                                    <ul style={{ paddingRight: "49px" }}>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "3px" }}>{selectedCard.pricePerHouse}</li>
                                        <li className={panelStyles.infoPanelMoney} style={{ paddingTop: "8px" }}>{selectedCard.pricePerHouse}</li>
                                    </ul>
                                </div>

                                <Image src="/PropertyBase.jpg" alt="property card image" width={243} height={378} />
                            </div>
                        )
                    ) : (
                        <p className={panelStyles.infoText} style={{ color: "gray", fontSize: "20px" }}>No cards have been selected.</p>
                    )}
                </div>
            ) : null}

            
            {selectedIcon == "inventory" ? (
                <div>
                    <p className={panelStyles.infoText}>Inventory</p>

                    <div className={panelStyles.inventoryContainer}>
                        <Image src="/playerCar.png" width={64} height={64}></Image>
                        <div className={panelStyles.infoPanelPlayerContainer}>
                            <p className={panelStyles.infoPanelPlayer}>Player</p>
                        </div>

                        <div className={panelStyles.moneyContainer}>
                            <Image src="/Yuge.png" width={38} height={27}></Image>
                            <p className={panelStyles.infoPanelPlayer}>{money}</p>
                        </div>

                        <div>
                            <Image onClick = {() => {
                                onDieClick(true);
                                const audio = document.getElementById("die-roll");
                                audio.play().catch(error => console.log("Playback error: ", error));      
                             } } className={panelStyles.dieStyle} src="/Die_1.jpg" width={27} height={27}></Image>
                        </div>

                        <div className={`${panelStyles.smallCardGrid}`}>
                            {
                                cardInventory.map((card, index) => (
                                    <div key={index} className={panelStyles.smallCardGrid}>
                                        <Image src={card.source} alt="clickable board card" width={116*0.58} height={186*0.58} />
                                        <p className={panelStyles.smallCardTitle}>{card.name}</p>
                                        <p className={card.price < 100 ? panelStyles.smallCardFooter : panelStyles.smallCardFooter}>{card.price}</p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            ) : null}


            {selectedIcon == "volume" ? (
                <div className="sliders" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p className={panelStyles.infoText}>Audio Sliders</p>

                    <div className="vertical-box" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p className={panelStyles.infoText} style={{ fontSize: "15px", textAlign: "center" }}>
                            Music Slider
                        </p>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            ) : null}
        
            <audio ref={audioRef} muted loop>
                <source src="/exhibitA.mp3" type="audio/mpeg" />
            </audio>

            <audio id="card-audio">
                <source src="/flipcard.mp3" type="audio/mpeg" />
            </audio>

            <audio id="die-roll">
                <source src="/rolling-die.mp3" type="audio/mpeg" />
            </audio>

            </div>
    )
}