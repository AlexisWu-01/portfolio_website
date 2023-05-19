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
        {children}
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
            <HomeIcon className="navbar-icon" />
            Home
          </NavbarItem>
          <NavbarItem to="/about">
            <InfoIcon className="navbar-icon" />
            CV
          </NavbarItem>
          <NavbarItem to="/projects">
            <FolderIcon className="navbar-icon" />
            Projects
          </NavbarItem>
          <NavbarItem to="/contact">
            <MailIcon className="navbar-icon" />
            Contact
          </NavbarItem>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
