import React, { useState, useEffect } from 'react'
import { Frame } from "../Components/Frame/Frame";
import LibraryShower from "../Components/Library/Library";
import { CardCounter } from '../Components/CardCounter';

export default function index() {
    return (
        <CardCounter>
            <div style={{
                width: '100vw',
                height: '90vh',
                // backgroundColor: 'blue',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LibraryShower />

                <Rotator>
                    <Frame />
                </Rotator>
            </div>
        </CardCounter>
    )
}

function Rotator({ children }) {
    const [angle, setAngle] = useState(0);
    const [targetAngle, setTargetAngle] = useState(0);

    useEffect(() => {
        const handleMotion = (event) => {
            let { x, y } = event.accelerationIncludingGravity || {};
            if (x == null || y == null) return;

            const radians = Math.atan2(x, y);
            const degrees = radians * (180 / Math.PI);

            setTargetAngle(degrees);
        };

        window.addEventListener('devicemotion', handleMotion, true);

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, []);

    // Smooth interpolation with easing
    useEffect(() => {
        const smoothFactor = 0.05; // Slower for smoother movement

        const interval = setInterval(() => {
            setAngle(prevAngle => {
                let diff = targetAngle - prevAngle;
                // Handle angle wrapping (e.g., 359° to 1°)
                if (diff > 180) diff -= 360;
                if (diff < -180) diff += 360;
                return prevAngle + diff * smoothFactor;
            });
        }, 16);

        return () => clearInterval(interval);
    }, [targetAngle]);

    return (
        <div style={{
            width: '80vw',
            height: 'fit-content',
            transform: `rotate(${angle}deg)`,
            // backgroundColor: 'red',
            transition: 'transform 0.05s ease-out', // CSS transition for extra smoothness

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'green',
                marginTop: '90px'
            }}>
                {children}
            </div>
        </div >
    );
}