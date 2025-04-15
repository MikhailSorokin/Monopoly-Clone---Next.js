import Image from "next/image";
import boardStyle from "../styles/game.module.css"
import Card from "./card.js"
import Player from "./player.js";
import React, {useState, useEffect, useRef} from "react";

export default function Board( { selectedCard, onCardClick, dieRolled, onDieRolled, setSpotCard}) {

    const [firstDiceRoll, setDiceRollOne] = useState(0);
    const [secondDiceRoll, setDiceRollTwo] = useState(0);

    function generateRandomDiceRoll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    const cards = ([
        // Brown
        {name: "MEDITERRANEAN AVENUE", price: 60, x: 24, y: 94, source: "/BrownCard.png", hexColor: "#955235", angle: 90,
            pricePerHouse: 50, rent: 2, rentHouse: 10, rent2Houses: 30, rent3Houses: 90, rent4Houses: 160, rentHotel: 250
        },
        // Community Chest
        {name: "CHEST", price: 0, x: 24, y: 163, source: "/Community.jpg", hexColor: "#000000", angle: 90,
            type: "income"
        },

        {name: "BALTIC AVENUE", price: 60, x: 24, y: 232, source: "/BrownCard.png", hexColor: "#955235", angle: 90,
            pricePerHouse: 50, rent: 4, rentHouse: 20, rent2Houses: 60, rent3Houses: 180, rent4Houses: 320, rentHotel: 450
        },

        // Income Tax
        {name: "INCOME TAX", price: 150, x: 24, y: 301, source: "/Income.jpg", hexColor: "#000000", angle: 90,
            type: "income"
        },
        // Railroad 1
        {name: "READING RAILROAD", price: 200, x: 24, y: 370, source: "/Train.jpg", hexColor: "#000000", angle: 90,
            type: "railroad"
        },
        
        // Cyan
        {name: "ORIENTAL AVENUE", price: 100, x: 24, y: 440, source: "/LightBlueCard.png", hexColor: "#9AD9EA", angle: 90,
            pricePerHouse: 50, rent: 6, rentHouse: 30, rent2Houses: 90, rent3Houses: 270, rent4Houses: 400, rentHotel: 550
        },
        // Chance
        {name: "CHANCE", price: 0, x: 24, y: 509, source: "/Chance.jpg", hexColor: "#000000", angle: 90,
            type: "income"
        },
        {name: "VERMONT AVENUE", price: 100, x: 24, y: 578, source: "/LightBlueCard.png", hexColor: "#9AD9EA", angle: 90,
            pricePerHouse: 50, rent: 6, rentHouse: 30, rent2Houses: 90, rent3Houses: 270, rent4Houses: 400, rentHotel: 550
        },
        {name: "CONNECTICUT AVENUE", price: 120, x: 24, y: 648, source: "/LightBlueCard.png", hexColor: "#9AD9EA", angle: 90,
            pricePerHouse: 50, rent: 8, rentHouse: 40, rent2Houses: 100, rent3Houses: 300, rent4Houses: 450, rentHotel: 600
        },

        // Pink
        {name: "ST. CHARLES PLACE", price: 140, x: 115, y: 738, source: "/PinkCard.png", hexColor: "#D93A96", angle: 180,
            pricePerHouse: 100, rent: 10, rentHouse: 50, rent2Houses: 150, rent3Houses: 450, rent4Houses: 625, rentHotel: 750
        },
        // Electric Company
        {name: "ELECTRIC COMPANY", price: 150, x: 184, y: 738, source: "/Electric.jpg", hexColor: "#000000", angle: 180,
            type: "utility"
        },
        {name: "STATES AVENUE", price: 140, x: 253, y: 738, source: "/PinkCard.png", hexColor: "#D93A96", angle: 180,
            pricePerHouse: 100, rent: 10, rentHouse: 50, rent2Houses: 150, rent3Houses: 450, rent4Houses: 625, rentHotel: 750
        },
        {name: "VIRGINIA AVENUE", price: 160, x: 322, y: 738, source: "/PinkCard.png", hexColor: "#D93A96", angle: 180,
            pricePerHouse: 100, rent: 12, rentHouse: 60, rent2Houses: 180, rent3Houses: 500, rent4Houses: 700, rentHotel: 900
        },
        // Railroad 2
        {name: "PENNSYLVANIA RAILROAD", price: 200, x: 391, y: 738, source: "/Train.jpg", hexColor: "#000000", angle: 180,
            type: "railroad"
        },

        // Orange
        {name: "ST. JAMES PLACE", price: 180, x: 460, y: 739, source: "/OrangeCard.png", hexColor: "#F7941D", angle: 180,
            pricePerHouse: 100, rent: 14, rentHouse: 70, rent2Houses: 200, rent3Houses: 550, rent4Houses: 750, rentHotel: 950
        },
        // Community Chest
        {name: "CHEST", price: 0, x: 530, y: 738, source: "/Community.jpg", hexColor: "#000000", angle: 180,
            type: "income"
        },

        {name: "TENNESSEE AVENUE", price: 180, x: 599, y: 739, source: "/OrangeCard.png", hexColor: "#F7941D", angle: 180,
            pricePerHouse: 100, rent: 14, rentHouse: 70, rent2Houses: 200, rent3Houses: 550, rent4Houses: 750, rentHotel: 950
        },
        {name: "NEW YORK AVENUE", price: 200, x: 668, y: 739, source: "/OrangeCard.png", hexColor: "#F7941D", angle: 180,
            pricePerHouse: 100, rent: 16, rentHouse: 80, rent2Houses: 220, rent3Houses: 600, rent4Houses: 800, rentHotel: 1000
        },

        {name: "NEW YORK AVENUE", price: 200, x: 668, y: 739, source: "/OrangeCard.png", hexColor: "#F7941D", angle: 180,
            pricePerHouse: 100, rent: 16, rentHouse: 80, rent2Houses: 220, rent3Houses: 600, rent4Houses: 800, rentHotel: 1000
        },

        // Red
        {name: "KENTUCKY AVENUE", price: 220, x: 760, y: 648, source: "/RedCard.png", hexColor: "#ED1B24", angle: 270,
            pricePerHouse: 150, rent: 18, rentHouse: 90, rent2Houses: 250, rent3Houses: 700, rent4Houses: 875, rentHotel: 1050
        },
        // Chance
        {name: "CHANCE", price: 0, x: 759, y: 579, source: "/Chance.jpg", hexColor: "#000000", angle: 270,
            type: "income"
        },
        {name: "INDIANA AVENUE", price: 220, x: 760, y: 509, source: "/RedCard.png", hexColor: "#ED1B24", angle: 270,
            pricePerHouse: 150, rent: 18, rentHouse: 90, rent2Houses: 250, rent3Houses: 700, rent4Houses: 875, rentHotel: 1050
        },
        {name: "ILLINOIS AVENUE", price: 240, x: 760, y: 440, source: "/RedCard.png", hexColor: "#ED1B24", angle: 270,
            pricePerHouse: 150, rent: 20, rentHouse: 100, rent2Houses: 300, rent3Houses: 750, rent4Houses: 925, rentHotel: 1100
        },
        // Railroad 3
        {name: "B. & O. RAILROAD", price: 200, x: 759, y: 371, source: "/Train.jpg", hexColor: "#000000", angle: 270,
            type: "railroad"
        },
        {name: "ATLANTIC AVENUE", price: 260, x: 760, y: 302, source: "/YellowCard.png", hexColor: "#FCEE21", angle: 270,
            pricePerHouse: 150, rent: 22, rentHouse: 110, rent2Houses: 330, rent3Houses: 800, rent4Houses: 975, rentHotel: 1150
        },
        {name: "VENTNOR AVENUE", price: 260, x: 760, y: 232, source: "/YellowCard.png", hexColor: "#FCEE21", angle: 270,
            pricePerHouse: 150, rent: 22, rentHouse: 110, rent2Houses: 330, rent3Houses: 800, rent4Houses: 975, rentHotel: 1150
        },
        // Waterworks Company
        {name: "WATERWORKS COMPANY", price: 150, x: 759, y: 163, source: "/Waterworks.jpg", hexColor: "#000000", angle: 270,
            type: "utility"
        },
        {name: "MARVIN GARDENS", price: 280, x: 760, y: 94, source: "/YellowCard.png", hexColor: "#FCEE21", angle: 270,
            pricePerHouse: 150, rent: 24, rentHouse: 120, rent2Houses: 360, rent3Houses: 850, rent4Houses: 1025, rentHotel: 1200
        },

        {name: "PACIFIC AVENUE", price: 300, x: 668, y: 4, source: "/GreenCard.png", hexColor: "#1FB25A", angle: 0,
            pricePerHouse: 200, rent: 26, rentHouse: 130, rent2Houses: 390, rent3Houses: 900, rent4Houses: 1100, rentHotel: 1275
        },
        {name: "NORTH CAROLINA AVENUE", price: 300, x: 599, y: 4, source: "/GreenCard.png", hexColor: "#1FB25A", angle: 0,
            pricePerHouse: 200, rent: 26, rentHouse: 130, rent2Houses: 390, rent3Houses: 900, rent4Houses: 1100, rentHotel: 1275
        },
        // Community Chest
        {name: "CHEST", price: 0, x: 530, y: 4, source: "/Community.jpg", hexColor: "#000000", angle: 0,
            type: "income"
        },
        {name: "PENNSYLVANIA AVENUE", price: 320, x: 461, y: 4, source: "/GreenCard.png", hexColor: "#1FB25A", angle: 0,
            pricePerHouse: 200, rent: 28, rentHouse: 150, rent2Houses: 450, rent3Houses: 1000, rent4Houses: 1200, rentHotel: 1400
        },
        // Railroad 3
        {name: "SHORT LINE", price: 200, x: 392, y: 3, source: "/Train.jpg", hexColor: "#000000", angle: 0,
            type: "railroad"
        },
        // Chance
        {name: "CHANCE", price: 0, x: 323, y: 3, source: "/Chance.jpg", hexColor: "#000000", angle: 0,
            type: "income"
        },
        {name: "PARK PLACE", price: 350, x: 253, y: 4, source: "/BlueCard.png", hexColor: "#0072BB", angle: 0,
            pricePerHouse: 200, rent: 35, rentHouse: 175, rent2Houses: 500, rent3Houses: 1100, rent4Houses: 1300, rentHotel: 1500
        },
        // Luxury Tax
        {name: "LUXURY TAX", price: 150, x: 184, y: 3, source: "/Luxury.jpg", hexColor: "#000000", angle: 0,
            type: "income"
        },
        {name: "BOARDWALK", price: 400, x: 115, y: 4, source: "/BlueCard.png", hexColor: "#0072BB", angle: 0,
            pricePerHouse: 200, rent: 50, rentHouse: 200, rent2Houses: 600, rent3Houses: 1400, rent4Houses: 1700, rentHotel: 2000
        },
    ]);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [signX, setSignX] = useState(1);
    const [signY, setSignY] = useState(-1);
    // Four quadrants that are dicatated by the maximum vertical roll of spaces 
    // and maximum horizontal roll of spaces
    const [quadrant, setQuadrant] = useState(1);

    const [aiX, setAiX] = useState(0);
    const [aiY, setAiY] = useState(0);
    const [aiSignX, setAiSignX] = useState(1);
    const [aiSignY, setAiSignY] = useState(-1);

    const animationFrameRef = useRef(null);
    const lastTimeRef = useRef(performance.now());

    const verticalDiceRollsMax = 10;
    const horizontalDiceRollsMax = 10;

    const [totalVertReached, setTotalVertReached] = useState(0);
    const [totalHozReached, setTotalHozReached] = useState(0);

    useEffect(() => {
        if (firstDiceRoll > 0 && secondDiceRoll > 0) {

            cancelAnimationFrame(animationFrameRef.current);

            lastTimeRef.current = performance.now();    

            const animate = (currentTime) => {
                const deltaTime = currentTime - lastTimeRef.current;
                lastTimeRef.current = currentTime;

                let sumRolls = firstDiceRoll + secondDiceRoll;

                const speed = 0.15;

                let increaseY = 0;
                let increaseX = 0;

                if (totalVertReached < verticalDiceRollsMax) {
                    sumRolls += totalVertReached; 
                    increaseY = -68 * Math.min(sumRolls, verticalDiceRollsMax) - 35;
                    increaseX = 80 * (sumRolls - verticalDiceRollsMax);
                } else {
                    sumRolls += totalHozReached;
                    if (totalHozReached == 0) {
                        increaseX = 80 * (sumRolls - verticalDiceRollsMax);
                    } else {
                        increaseX = 80 * sumRolls;
                    }
                }
    
                if (y >= increaseY && signY === -1) {
                    setQuadrant(1);
                    setY(prevY => prevY + signY * deltaTime * speed);
                } else if (y <= 0 && signY === 1) {
                    setQuadrant(3);
                    setSignX(-1)
                    setY(prevY => prevY + signY * deltaTime * speed);
                } else if (x > 0 && signX === -1) {
                    setQuadrant(4);
                    setX(prevX => prevX + signX * deltaTime * speed);
                } else if (x < increaseX && signX === 1) {
                    setQuadrant(2);
                    setX(prevX => prevX + signX * deltaTime * speed);
                } else if (x <= 0 && y >= 0 && signX === -1 && signY === 1) {
                    console.log("I am in increase both X, Y.");
                    setSignY(-1)
                    setSignX(1)
                    setY(0)
                    setX(0)
                } else {
                    console.log("Die roll ended");
                    onDieRolled(false);
                    setDiceRollOne(0);
                    setDiceRollTwo(0);
                    setTotalVertReached(Math.min(sumRolls, verticalDiceRollsMax));
                    setTotalHozReached(Math.max(0, (sumRolls - verticalDiceRollsMax)));
                    setSpotCard(cards[sumRolls - 1]);

                    // Let AI go

                    // TODO - Factor in if we have finished a quadrant and we are at the maximum roll 
                    /*if (quadrant == 2) {
                        setTotalVertReached(0);
                    } else if (quadrant == 3) {
                        setTotalHozReached(0);
                    } else if (quadrant == 4) {
                        setTotalHozReached(0);
                        setTotalVertReached(0);
                    }*/
                }

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrameRef.current); 
        }
    }, [x, y, firstDiceRoll, secondDiceRoll]);

    useEffect(() => {
        if (firstDiceRoll > 0 && secondDiceRoll > 0) {

            cancelAnimationFrame(animationFrameRef.current);

            lastTimeRef.current = performance.now();    

            const animate = (currentTime) => {
                const deltaTime = currentTime - lastTimeRef.current;
                lastTimeRef.current = currentTime;

                let sumRolls = firstDiceRoll + secondDiceRoll;

                const speed = 0.15;

                let increaseY = 0;
                let increaseX = 0;

                if (totalVertReached < verticalDiceRollsMax) {
                    sumRolls += totalVertReached; 
                    increaseY = -68 * Math.min(sumRolls, verticalDiceRollsMax) - 35;
                    increaseX = 80 * (sumRolls - verticalDiceRollsMax);
                } else {
                    sumRolls += totalHozReached;
                    if (totalHozReached == 0) {
                        increaseX = 80 * (sumRolls - verticalDiceRollsMax);
                    } else {
                        increaseX = 80 * sumRolls;
                    }
                }
    
                if (y >= increaseY && signY === -1) {
                    setQuadrant(1);
                    setY(prevY => prevY + signY * deltaTime * speed);
                } else if (y <= 0 && signY === 1) {
                    setQuadrant(3);
                    setSignX(-1)
                    setY(prevY => prevY + signY * deltaTime * speed);
                } else if (x > 0 && signX === -1) {
                    setQuadrant(4);
                    setX(prevX => prevX + signX * deltaTime * speed);
                } else if (x < increaseX && signX === 1) {
                    setQuadrant(2);
                    setX(prevX => prevX + signX * deltaTime * speed);
                } else if (x <= 0 && y >= 0 && signX === -1 && signY === 1) {
                    console.log("I am in increase both X, Y.");
                    setSignY(-1)
                    setSignX(1)
                    setY(0)
                    setX(0)
                } else {
                    console.log("Die roll ended");
                    onDieRolled(false);
                    setDiceRollOne(0);
                    setDiceRollTwo(0);
                    setTotalVertReached(Math.min(sumRolls, verticalDiceRollsMax));
                    setTotalHozReached(Math.max(0, (sumRolls - verticalDiceRollsMax)));
                    setSpotCost(cards[sumRolls - 1].price);

                    // Let AI go

                    // TODO - Factor in if we have finished a quadrant and we are at the maximum roll 
                    /*if (quadrant == 2) {
                        setTotalVertReached(0);
                    } else if (quadrant == 3) {
                        setTotalHozReached(0);
                    } else if (quadrant == 4) {
                        setTotalHozReached(0);
                        setTotalVertReached(0);
                    }*/
                }

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrameRef.current); 
        }
    }, [aiX, aiY, firstDiceRoll, secondDiceRoll]);

    useEffect(() => {
        if (dieRolled) {
            setDiceRollOne(generateRandomDiceRoll());
            setDiceRollTwo(generateRandomDiceRoll());
        }
    }, [dieRolled]);

    return (
        <div className={boardStyle.board}>
            { cards.map((card, index) => (
                <Card index={index} price={card.price} name={card.name} x={card.x} y={card.y} isSelected={selectedCard && selectedCard.name === card.name } 
                onSelect={() => 
                    {
                        onCardClick (card)
                        const audio = document.getElementById("card-audio")
                        audio.play().catch(error => console.log("Playback error: ", error));      
                    }
                }
                imageSource={card.source}
                angle={card.angle}
                type={card.type} />
            ))}

 
            <div className={boardStyle.board}>
                <Image className={boardStyle.rotated} alt = "board" priority src="/Board.jpg" width={850} height={850}></Image>

                <div className={boardStyle.playerContainer}>
                    <Player className={boardStyle.playerOverlay} src={"/playerCar.png"} x={x} y={y + 35}/>
                    <Player className={boardStyle.playerOverlay} src={"/playerAI.png"} x={0}y={-20}/>
                </div>

                { firstDiceRoll > 0 && secondDiceRoll > 0 && dieRolled ? 
                    <div className={boardStyle.dice}>
                        <Image className={boardStyle.die} src={`/Die_${firstDiceRoll}.jpg`} width={64} height={64} />
                        <Image className={boardStyle.die} src={`/Die_${secondDiceRoll}.jpg`} width={64} height={64}/>
                    </div> : 
                    <></>
                }
            </div>

        </div>
    )
}