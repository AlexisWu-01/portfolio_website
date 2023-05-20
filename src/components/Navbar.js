// Navbar.js
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import './Navbar.css';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import MailIcon from '@mui/icons-material/MailOutline';
import FolderIcon from '@mui/icons-material/FolderOpenOutlined';

function NavbarItem({ to, children }) {
  const match = useMatch(to);
  return (
    <li className="navbar-item">
      <Link to={to} className={`navbar-link ${match ? 'active' : ''}`}>
        <div className="navbar-link-content">
          {children}
        </div>
      </Link>
    </li>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-name">
        &lt;/&gt; Alexis Wu
        </Link>
        <ul className="navbar-menu">
          <NavbarItem to="/">
            <div className="navbar-link-item">
              <HomeIcon className="navbar-icon" />
              Home
            </div>
          </NavbarItem>
          <NavbarItem to="/about">
            <div className="navbar-link-item">
              <InfoIcon className="navbar-icon" />
              CV
            </div>
          </NavbarItem>
          <NavbarItem to="/projects">
            <div className="navbar-link-item">
              <FolderIcon className="navbar-icon" />
              Projects
            </div>
          </NavbarItem>
          <NavbarItem to="/contact">
            <div className="navbar-link-item">
              <MailIcon className="navbar-icon" />
              Contact
            </div>
          </NavbarItem>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
