import React from 'react';

function Weather({ data }) {
  const { location, current } = data;

  return (
    <div className="weather">
      <h2>{location.name}, {location.country}</h2>
      <p>{current.condition.text}</p>
      <p>Temperature: {current.temp_c} °C</p>
      <img src={current.condition.icon} alt={current.condition.text} />
    </div>
  );
}

export default Weather;