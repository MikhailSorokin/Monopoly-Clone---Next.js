import gameStyles from "../styles/game.module.css"
import Image from "next/image"

export default function InfoPanel({ selectedCard }) {

    return (
        <div className={gameStyles.infoPanel}>

            <p className={gameStyles.infoText}>Information</p>

            {
                selectedCard ?
                (<div className={gameStyles.cardContainer}>
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

                    <Image src="/PropertyBase.png" width={157} height={244} style={ {transform: "scale(1)"} }></Image>
                </div>)
                :
                (<p className={gameStyles.infoText} style={{color:"gray", fontSize: "20px"}}>No cards have been selected.</p> )
            }
        </div>
    )
}