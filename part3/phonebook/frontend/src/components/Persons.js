import React from "react";

const Persons = ({ persons, personsToShow, personDelete }) => {
  return (
    <div>
      {persons.length
        ? personsToShow.length
          ? personsToShow.map((perosn) => (
              <div key={perosn.id}>
                {perosn.name} {perosn.number}{" "}
                <button onClick={() => personDelete(perosn.id)}>delete</button>
              </div>
            ))
          : "No matching with persons"
        : "Please, add a person"}
    </div>
  );
};

export default Persons;
