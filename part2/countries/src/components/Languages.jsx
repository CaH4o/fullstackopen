import React from "react";

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language, i) => (
        <li key={i}>{language}</li>
      ))}
    </ul>
  );
};
export default Languages;
