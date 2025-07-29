import React, { useEffect, useState } from "react";

export const CardCounter = ({ children }) => {
    const [hasLoadedNewCard, setHasLoadedNewCard] = useState(false);

    useEffect(() => {
        const lastDate = localStorage.getItem('last-date-open');
        let cards = localStorage.getItem('cards');
        const currentCardIndex = localStorage.getItem('current-card-index');

        if ((!cards )|| JSON.parse(cards).length === 0) {
            cards = [{ id: '0', url: '/images/000.jpg', date: '2025-01-01', description: 'DEBUG 3' }];
            localStorage.setItem('cards', JSON.stringify(cards));
        }

        if (!lastDate) {
            updateLastDate();
        }

        if (!currentCardIndex || currentCardIndex > JSON.parse(cards).length - 1) {
            const cardsLength = cards ? JSON.parse(cards).length : 0;
            localStorage.setItem('current-card-index', (cardsLength - 1)%365);
        }


        const currentDate = new Date().toLocaleDateString('en-US');

        if (currentDate !== lastDate) {
            updateLocalStorageCards();
            updateLastDate();
            updateCurrentCardIndex();
        }

        setHasLoadedNewCard(true);
    }, []);

    const updateLastDate = () => {
        const lastDate = new Date().toLocaleDateString('en-US');
        localStorage.setItem('last-date-open', lastDate);
    }

    const updateLocalStorageCards = () => {
        const cards = localStorage.getItem('cards');
        const cardsArray = JSON.parse(cards);
        cardsArray.push(obtainNewCard());
        localStorage.setItem('cards', JSON.stringify(cardsArray));
    }

    const obtainNewCard = () => {
        const cards = localStorage.getItem('cards');
        const cardsArray = JSON.parse(cards);

        const lastCard = cardsArray[cardsArray.length - 1];
        const newCard = {
            id: parseInt(lastCard.id) + 1,
            url: `/images/${String(lastCard.id + 1).padStart(3, '0')}.jpg`,
            date: '2025-01-01',
            description: 'DEBUG 3'
        };
        return newCard;
    }

    const updateCurrentCardIndex = () => {
        const currentCardIndex = localStorage.getItem('current-card-index');
        localStorage.setItem('current-card-index', parseInt(currentCardIndex) + 1);
    }

    return (
        <>
            {hasLoadedNewCard ?
                children :
                <div>
                    <h1>Loading...</h1>
                </div>
            }
        </>
    );
};