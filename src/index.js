import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import HomePage from './components/HomePage';
import ProjectPage from './components/ProjectPage';
import Navbar from './components/Navbar';
import ComputerVisionProject  from './projects/ComputerVisionProject';
import PortfolioOptimization from './projects/PortfolioOptimization';

import { inject }  from '@vercel/analytics'

inject();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/computer-vision/:titleParam/:readmeUrlParam" element={<ComputerVisionProject />} />
        <Route path="/projects/portfolio-optimization" element={<PortfolioOptimization />} /> 

      </Routes>
    </Router>
  </React.StrictMode>
);
