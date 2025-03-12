import Image from "next/image"
import gameStyles from "../styles/game.module.css"

export default function Player({ x, y }) {
   return (
       <div className={gameStyles.player} style={{ transform: `translate(${x}px, ${y}px)` }}>
           <Image src="/playerCar.png" width={60} height={60} alt="Player" />
       </div>
   );
}