import React, { useEffect, useState } from "react";

export const Frame = () => {

    const [currentCard, setCurrentCard] = useState(null);

    useEffect(() => {
        const currentCardIndex = localStorage.getItem('current-card-index');
        const cards = localStorage.getItem('cards');
        const cardsArray = JSON.parse(cards);

        setCurrentCard(cardsArray[currentCardIndex]);
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            // backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <div style={{
                width: '80%',
                height: '80%',
                // backgroundColor: 'green'
            }}>
                <div style={{ transform: 'rotate(0deg)' }}>
                    {currentCard &&
                        <Picture card={currentCard} />
                    }
                </div>
            </div>

        </div>
    );
}

export const Picture = ({ card }) => {
    const baseUrl = process.env.PUBLIC_URL || '';
    const fullUrl = baseUrl + card.url;

    return (
        <div style={{ width: '100px', height: '100px', backgroundColor: 'pink' }}>
            <img src={fullUrl} alt={card.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
}