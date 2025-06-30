import React, { useEffect } from "react";

export const Frame = ({ children }) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <div style={{ width: '80%', height: '80%', backgroundColor: 'green' }}>
                <div style={{ transform: 'rotate(0deg)' }}>
                    {children}
                </div>
            </div>

        </div>
    );
}

export const Picture = ({ url }) => {
    return (
        <div style={{ width: '100px', height: '100px', backgroundColor: 'pink' }}>
            <img src={url} alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
}

export const CardCounter = ({ children }) => {
    const updateLocalStorageCards = () => {
        const cards = localStorage.getItem('cards');
        const cardsArray = JSON.parse(cards);
        cardsArray.push(obtainNewCard());
        localStorage.setItem('cards', JSON.stringify(cardsArray));

    }

    const obtainNewCard = () => {
        // TODO
        return { id: '3', url: '/images/002.jpg', date: '2025-01-01', description: 'DEBUG 3' };
    }

    const updateLastDate = () => {
        const lastDate = new Date().toLocaleDateString('en-US');
        localStorage.setItem('last-date-open', lastDate);
    }


    useEffect(() => {
        const lastDate = localStorage.getItem('last-date-open');

        if (!lastDate) {
            updateLocalStorageCards();
            updateLastDate();
        }

        const currentDate = new Date().toLocaleDateString('en-US');

        if (currentDate !== lastDate) {
            updateLocalStorageCards();
            updateLastDate();
        }
    }, []);

    return (
        <>
            {children}
        </>
    );
};