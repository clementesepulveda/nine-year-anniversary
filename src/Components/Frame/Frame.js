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
        <div style={{
            height: '100%',
            width: '100%',
            position: 'relative', // Required for absolute positioning of pseudo-elements
        }}>
            <img src={fullUrl} alt={card.url} style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: -30,
                right: 0,
                // maxWidth: '200px',
                width: '90%',
                margin: 'auto',
                background: '#fff',
                padding: '30px',
                borderStyle: 'solid',
                borderWidth: '15px',
                borderTopColor: '#333333',
                borderRightColor: '#000000',
                borderBottomColor: '#333333',
                borderLeftColor: '#000000',
                boxShadow: '2px 2px 4px rgba(0,0,0,.6)',
                '::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-15px',
                    left: '-15px',
                    width: '50%',
                    height: '2px',
                    background: '#333',
                    transform: 'rotate(45deg)',
                    transformOrigin: 'top left'
                },
                '::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '50%',
                    height: '2px',
                    background: '#333',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'top right'
                }
            }} />
        </div>
    );
}