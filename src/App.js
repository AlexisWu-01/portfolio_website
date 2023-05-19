import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProjectPage from './components/ProjectPage';
import Navbar from './components/Navbar';
import ComputerVisionProject from './projects/ComputerVisionProject';
import { GlobalStyles } from './GlobalStyles'; // Make sure this path is correct
import { inject }  from '@vercel/analytics'

inject();
function App() {
  return (
    <Router>
      <GlobalStyles />

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/computer-vision/:titleParam/:readmeUrlParam" element={<ComputerVisionProject />} />

      </Routes>
    </Router>
  );
}

export default App;
