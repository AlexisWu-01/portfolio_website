import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="navbar-container"></div>
      <div className="content-container">
      <a href="https://drive.google.com/file/d/1iYjqvY28E45dF0QQp1gZZkoOK3VyIrbj/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="download-button">
          CLICK to Download my resume
        </a>
        <object data="./resume.html" width="100%" height="100%" style={{flexGrow: 1}}>
          <param name="allowFullScreen" value="true"/>
        </object>
       
      </div>
    </div>
  );
};

export default AboutPage;