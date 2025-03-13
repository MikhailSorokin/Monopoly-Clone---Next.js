import Image from "next/image"
import gameStyles from "../styles/game.module.css"

export default function Player({ src, x, y }) {
   return (
       <div className={gameStyles.player} style={{ transform: `translate(${x}px, ${y}px)` }}>
           <Image src={src} width={60} height={60} alt="Player" />
       </div>
   );
}