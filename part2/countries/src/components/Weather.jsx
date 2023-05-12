import React from "react";

const Weather = ({ weather }) => {
  if (weather) {
    return (
      <div>
        <div>temperature {weather.main.temp} Celsius</div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].main}
        />
        <div>{weather.weather[0].description}</div>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    );
  } else {
    return null;
  }
};

export default Weather;
