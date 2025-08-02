import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export const CardCounter = ({ children }) => {
    const [hasLoadedNewCard, setHasLoadedNewCard] = useState(false);

    useEffect(() => {
        const updatedGlobalVars = async () => {
            let lastDate = localStorage.getItem('last-date-open');
            let cards = localStorage.getItem('cards');
            let totalCards = localStorage.getItem('total-cards');
            const currentCardIndex = localStorage.getItem('current-card-index');

            if (!totalCards) {
                totalCards = await updateTotalCards();
                localStorage.setItem('total-cards', totalCards);
            }

            if ((!cards) || JSON.parse(cards).length === 0) {
                cards = JSON.stringify(
                    [{ id: 0, url: '/images/000.jpg', date: '2025-01-01', description: 'DEBUG 3' }]
                );
                localStorage.setItem('cards', cards);
            }

            if (!lastDate) {
                lastDate = new Date().toLocaleDateString('en-US');
                localStorage.setItem('last-date-open', lastDate);
            }

            if (!currentCardIndex || currentCardIndex > JSON.parse(cards).length - 1) {
                const cardsLength = cards ? JSON.parse(cards).length : 0;
                localStorage.setItem('current-card-index', (cardsLength - 1) % totalCards);
            }


            const currentDate = new Date().toLocaleDateString('en-US');

            if (currentDate !== lastDate) {
                updateLocalStorageCards();
                updateLastDate();
                updateCurrentCardIndex();
            }

            setHasLoadedNewCard(true);
        }
        updatedGlobalVars();
    }, []);

    const updateTotalCards = async () => {
        // manually doing it
        // dynamic way was too slow
        return 224;
        // let current = 0;
        // let found = 0;

        // const checkNext = async () => {
        //     if (current > 500) {
        //         return found;
        //     }

        //     const fileName = `${String(current).padStart(3, '0')}`;
        //     const url = `/nine-year-anniversary/images/${fileName}.jpg`;

        //     try {
        //         const res = await fetch(url, { method: 'HEAD' }); // faster than GET
        //         const contentType = res.headers.get('content-type');
        //         if (contentType === 'image/jpeg') {
        //             found++;
        //             current++;
        //             return await checkNext();
        //         } else {
        //             return found;
        //         }
        //     } catch {
        //         return found;
        //     }
        // };

        // const total = await checkNext();
        // return total;
    }

    const updateLastDate = () => {
        const lastDate = new Date().toLocaleDateString('en-US');
        localStorage.setItem('last-date-open', lastDate);
    }

    const updateLocalStorageCards = () => {
        const cards = localStorage.getItem('cards');
        const cardsArray = JSON.parse(cards);
        const totalCards = localStorage.getItem('total-cards');

        if (cardsArray.length === parseInt(totalCards)) {
            return;
        }

        cardsArray.push(obtainNewCard());
        localStorage.setItem('cards', JSON.stringify(cardsArray));
    }

    const obtainNewCard = () => {
        const cards = localStorage.getItem('cards');
        const cardsArray = JSON.parse(cards);
        const totalCards = localStorage.getItem('total-cards');

        if (cardsArray.length === parseInt(totalCards)) {
            return cardsArray[0];
        }

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
        const totalCards = localStorage.getItem('total-cards');

        localStorage.setItem(
            'current-card-index', 
            (parseInt(currentCardIndex) + 1) % totalCards
        );
    }

    return (
        <>
            {hasLoadedNewCard ?
                children :
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader />
                </div>
            }
        </>
    );
};