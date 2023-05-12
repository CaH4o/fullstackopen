import React from "react";

const Countries = ({ countries, setSearchCountry }) => {
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.name.official}>
            {`${country.name.common} (${country.name.official}) `}
            <button onClick={() => setSearchCountry(country.name.official)}>
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
