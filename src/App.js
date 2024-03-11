import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import TeamStats from './pages/TeamStats';
import SchedulePage from './pages/SchedulePage';
import ResultsPage from './pages/ResultsPage';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/teamstats" element={<TeamStats />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
