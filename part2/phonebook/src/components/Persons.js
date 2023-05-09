import React from "react";

const Persons = ({ persons, showPersons }) => {
  return (
    <div>
      {persons.length
        ? showPersons.length
          ? showPersons.map((perosn) => (
              <div key={perosn.id}>
                {perosn.name} {perosn.number}
              </div>
            ))
          : "No matching with persons"
        : "Please, add a person"}
    </div>
  );
};

export default Persons;
