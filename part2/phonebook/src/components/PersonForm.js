import React, { useState } from "react";

import personService from "../services/persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const existPerson = persons.find((person) => person.name === newName);

    if (existPerson) {
      const isConfirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );

      if (isConfirmUpdate) {
        const changedPerson = { ...existPerson, number: newNumber };

        personService
          .update(changedPerson.id, changedPerson)
          .then((updatedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            )
          )
          .catch((error) => {
            alert(
              `the person '${changedPerson.name}' was already deleted from server`
            );
            console.log(error);
            setPersons(
              persons.filter((person) => person.id !== changedPerson.id)
            );
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService
        .create(newPerson)
        .then((createdPerson) => setPersons(persons.concat(createdPerson)));
    }
    setNewNumber("");
    setNewName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
