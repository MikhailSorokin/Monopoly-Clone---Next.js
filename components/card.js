import Image from "next/image"
import gameStyles from "../styles/game.module.css"

export default function Card({ index, name, price, x, y, isSelected, onSelect, imageSource, angle}) {

    return (
        
        <div className={`${gameStyles.card} ${isSelected ? gameStyles.selectedCard : ""}`} style={{ left: `${x}px`, bottom: `${y}px`, 
            transform:`rotate(${angle}deg)`}}
            onClick={onSelect}
        >
             <div className={gameStyles.imageContainer}>
                <Image src={imageSource} width={116*0.58} height={186*0.58}></Image>
                <p className={gameStyles.cardTitle}>{name}</p>
                <p className={price < 100 ? gameStyles.moneyFooterOneDigit : gameStyles.moneyFooterTwoDigits}>{price}</p>
            </div>
        </div>
    )
}