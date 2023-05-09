import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default Total;
