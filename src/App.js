import React from "react";
import LibraryShower from "./Library/Library";
import { CardCounter, Frame, Picture } from "./Frame/Frame";


export default function App() {
  return (
    <CardCounter>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'ble' }}>
        <LibraryShower />

        <Frame>
          <Picture url="/images/000.jpg" />
        </Frame>
      </div>
    </CardCounter>
  );
}