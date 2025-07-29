import React from 'react'
import {Frame } from "../Components/Frame/Frame";
import LibraryShower from "../Components/Library/Library";
import { CardCounter } from '../Components/CardCounter';

export default function index() {

    // const [currentImage, setCurrentImage] = useState(0);

    return (
        <CardCounter>
            <div style={{ width: '100vw', height: '100vh', backgroundColor: 'ble' }}>
                <LibraryShower />

                <Frame />
            </div>
        </CardCounter>
    )
}
