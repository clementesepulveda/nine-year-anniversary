import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import All from "./Pages/All";
import Index from "./Pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/all" element={<All />} /> */}
        <Route path="/nine-year-anniversary" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}