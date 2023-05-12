import React, { useState, useEffect } from "react";

import countryService from "./services/countries";
import Countries from "./components/Countries";
import Search from "./components/Search";
import SingleCountry from "./components/SingleCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  const countriesToShow = searchCountry.length
    ? countries.filter((country) =>
        (country.name.common + "|" + country.name.official)
          .toUpperCase()
          .includes(searchCountry.toUpperCase().trim())
      )
    : countries;

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

  return (
    <div>
      <Search
        searchCountry={searchCountry}
        setSearchCountry={setSearchCountry}
      />
      {countries.length ? (
        <>
          {!countriesToShow.length && (
            <div>No matches, specify another filter</div>
          )}
          {countriesToShow.length === 1 && (
            <SingleCountry country={countriesToShow} />
          )}
          {countriesToShow.length > 1 && countriesToShow.length <= 10 && (
            <Countries
              countries={countriesToShow}
              setSearchCountry={setSearchCountry}
            />
          )}
          {countriesToShow.length > 10 && (
            <div>Too many matches, specify another filter</div>
          )}
        </>
      ) : (
        <div>Loadimg...</div>
      )}
    </div>
  );
};

export default App;
