import React, { useEffect, useState } from "react";

import weatherService from "../services/weather";
import Weather from "./Weather";
import Languages from "./Languages";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country[0].languages);

  useEffect(() => {
    weatherService
      .getWeather(country[0].capital)
      .then((initialWeather) => setWeather(initialWeather));
  }, [country]);

  return (
    <div>
      <h2>{`${country[0].name.common} (${country[0].name.official})`}</h2>
      <div>capital {country[0].capital}</div>
      <div>aria {country[0].area}</div>
      <h4>languages:</h4>
      <Languages languages={languages} />
      <img
        src={country[0].flags.png}
        alt={country[0].flags.alt}
        width={300}
      ></img>
      <h2>{`Weather in ${country[0].capital}`}</h2>
      <Weather weather={weather} />
    </div>
  );
};

export default SingleCountry;
