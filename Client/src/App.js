// filepath: /Client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Pets from "./Components/Pets/Pets";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Home
            description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home."
          />
        }
      />
      <Route path="/pets" element={<Pets />} />
    </Routes>
  </Router>
);

export default App;