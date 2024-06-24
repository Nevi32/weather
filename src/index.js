import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faDroplet, faGauge, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Accessing the API key from environment variable

  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`);
      setWeather(response.data);
      setError(false);
    } catch (err) {
      setError(true);
      setWeather({});
    }
    setQuery('');
  };

  return (
    <main className={error ? 'error' : ''}>
      <form onSubmit={search}>
        <input 
          type="text" 
          id="name" 
          autoComplete="off" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {weather.main && (
        <section className="result">
          <figure className="name">
            <figcaption>{weather.name}, {weather.sys.country}</figcaption> 
            <img src={`https://flagsapi.com/${weather.sys.country}/shiny/32.png`} alt="Country Flag" />
          </figure>
          <figure className="temperature">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Weather Icon" />
            <figcaption>
              <span>{Math.round(weather.main.temp)}</span>
              <sup>o</sup>
            </figcaption> 
          </figure>
          <p className="description">{weather.weather[0].description}</p>
          <ul>
            <li>
              <span>clouds</span>
              <FontAwesomeIcon icon={faCloud} />
              <span id="clouds">{weather.clouds.all}</span>%
            </li>
            <li>
              <span>humidity</span>
              <FontAwesomeIcon icon={faDroplet} />
              <span id="humidity">{weather.main.humidity}</span>%
            </li>
            <li>
              <span>pressure</span>
              <FontAwesomeIcon icon={faGauge} />
              <span id="pressure">{weather.main.pressure}</span>hPa
            </li>
          </ul>
        </section>
      )}
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));


