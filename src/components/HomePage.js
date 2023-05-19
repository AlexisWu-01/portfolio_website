import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatrixRain from './MatrixRain';
import './HomePage.css';

function HomePage() {
  const [quote, setQuote] = useState({});
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data);
    }

    async function fetchWeather() {
      const response = await axios.get('https://ipapi.co/json/');
      const { latitude, longitude } = response.data;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ec0f7330295d86ed6afafb545838695e`
      );
      setWeather(weatherResponse.data);
    }

    fetchQuote();
    fetchWeather();
  }, []);

  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Alexis Wu</h1>
        <p className="typewriter">
          Welcome to my portfolio website! I am a student at Olin College of
          Engineering and I am passionate about coding, design, and creating
          innovative solutions to real-world problems.
        </p>
      </div>
      {quote.content && (
        <div className="quote-container">
          <p className="quote-text">{quote.content}</p>
          <p className="quote-text">- {quote.author}</p>
        </div>
      )}
      {weather && weather.main && (
        <div className="weather-container">
          <h3 className='weather-text'>{weather.name}</h3>
          <div className="weather-info">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <div className="weather-text">
              <p>{Math.round((weather.main.temp - 273.15) * 9 / 5 + 32)}°F</p>
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
      <MatrixRain />
    </div>
  );

}

export default HomePage;
