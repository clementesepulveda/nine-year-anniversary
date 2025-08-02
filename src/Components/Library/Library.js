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

            <div className={`library-container ${showLibrary ? 'show' : 'not-show'}`}>
                {library}
            </div>
        </>
    );
}

const Library = () => {
    const [cards, setCards] = useState([]);
    const [totalCards, setTotalCards] = useState(0);

    useEffect(() => {
        const storageCards = localStorage.getItem('cards');
        const totalCards = localStorage.getItem('total-cards');

        setCards(JSON.parse(storageCards).reverse());
        setTotalCards(totalCards);
    }, []);

    return (
        <div>
            <div className="library-title">
                {cards.length} / {totalCards}
            </div>
            <div className="library-cards">
                {cards.map((card) => (
                    <TiltingLibraryCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

const TiltingLibraryCard = ({ card }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);

        if (!isClicked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    const baseUrl = process.env.PUBLIC_URL || '';
    const fullUrl = baseUrl + card.url;

    return (<>
        <Tilt
            glareEnable={isClicked}
            glareMaxOpacity={isClicked ? 0.45 : 0}
            style={{ scale: isClicked ? 1.1 : 1, zIndex: isClicked ? 1000 : 1 }}
            // resets to 0 when unclicked
            tiltMaxAngleX={isClicked ? 20 : 0}
            tiltMaxAngleY={isClicked ? 20 : 0}
        >
            <div className="library-card" onClick={handleClick}>
                <div className="library-card-image-container">
                    <img src={fullUrl} alt={card.description} />
                </div>
                <br />
                {/* <div className="library-card-date">{card.date}</div>
                <div>{card.description}</div> */}
            </div>
        </Tilt>
    </>
    );
};