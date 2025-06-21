import React, { useState } from 'react';
import Weather from './Weather';
import './App.css';

// Utility function to map condition text to background image
const getBackgroundImage = (condition) => {
  const cond = condition.toLowerCase();

  if (cond.includes('sun')) return './sunny.jpg';
  if (cond.includes('cloud')) return '/cloudy.jpg';
  if (cond.includes('rain')) return '/rainy.jpeg';

  return 'default1.jpg'; 
};

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError('');

        // Set background image
        const bgImage = getBackgroundImage(data.current.condition.text);
       document.body.style.background = `url('${bgImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = '100%';
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;