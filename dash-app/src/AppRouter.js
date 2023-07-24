// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Notice the changes
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AnalysisPage from './pages/AnalysisPage';
import CardsScreen from './pages/CardScreen';

const AppRouter = () => {
  return (
    <Router>
      <div>

        <Routes> {/* Use Routes component here */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cards" element= {<CardsScreen/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
