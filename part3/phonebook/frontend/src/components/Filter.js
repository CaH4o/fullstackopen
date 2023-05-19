import React from "react";

const Filter = ({ filterName, setFilterName }) => {
  return (
    <div>
      filter show with:{" "}
      <input
        value={filterName}
        onChange={(event) => setFilterName(event.target.value)}
      />
    </div>
  );
};

export default Filter;
