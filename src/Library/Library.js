import React, { useEffect, useMemo, useState } from "react";
import './Library.css';
import Tilt from 'react-parallax-tilt';

export default function LibraryShower() {
    const [showLibrary, setShowLibrary] = useState(false);
    const library = useMemo(() => <Library />, []);

    return (
        <>
            <div className={`library-button`}>
                <div className={`library-button-icon ${showLibrary ? 'library-down' : ''}`}>
                    <svg
                        onClick={() => setShowLibrary(!showLibrary)} width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {/* <button onClick={() => setShowLibrary(!showLibrary)}>
                    {showLibrary ? 'Hide Library' : 'Show Library'}
                </button> */}
            </div>

            {/* {showLibrary && (
                <div
                    className={`library-container ${showLibrary ? 'show' : ''}`}
                >
                    {library}
                </div>
            )} */}

            <div className={`library-container ${showLibrary ? 'show' : ''}`}>
                {library}
            </div>
        </>
    );
}

const Library = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const storageCards = localStorage.getItem('cards');
        if (!storageCards) {
            localStorage.setItem('cards', JSON.stringify([]));
        }

        setCards(JSON.parse(storageCards));
    }, []);

    return (
        <div>
            <div className="library-title">
                {cards.length} / 365
            </div>
            <div className="library-cards">
                {cards.map((card) => (
                    <LibraryCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

const LibraryCard = ({ card }) => {
    return (
        <Tilt glareEnable={true} glareMaxOpacity={0.45} scale={1.05}>
            <div className="library-card">
                <div className="library-card-image-container">
                    <img src={card.url} alt={card.description} />
                </div>
                <div className="library-card-date">{card.date}</div>
                <div>{card.description}</div>
            </div>
        </Tilt>
    );
};