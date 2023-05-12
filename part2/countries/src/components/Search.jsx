import React from "react";

const Search = ({ searchCountry, setSearchCountry }) => {
  return (
    <div>
      {"find countries "}
      <input
        value={searchCountry}
        onChange={(event) => setSearchCountry(event.target.value)}
      />
    </div>
  );
};

export default Search;
