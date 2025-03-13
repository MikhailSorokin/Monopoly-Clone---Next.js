import panelStyles from "../styles/panel.module.css"
import Image from "next/image"
import React, {useEffect, useState, useRef} from "react";

export default function AIPanel({ }) {

    return (
        <div className={panelStyles.aiPanel}>
            <div>
                <p className={panelStyles.infoText}>Inventory</p>

                <div className={panelStyles.inventoryContainer}>
                    <Image src="/playerAI.png" width={64} height={64}></Image>
                    <div className={panelStyles.infoPanelPlayerContainer}  style={ {backgroundColor: "red"} }>
                        <p className={panelStyles.infoPanelPlayer}>Bot</p>
                    </div>

                    <div className={panelStyles.moneyContainer}>
                        <Image src="/Yuge.png" width={38} height={27}></Image>
                        <p className={panelStyles.infoPanelPlayer}>1500</p>
                    </div>

                </div>
            </div>
        
        </div>
    )
}