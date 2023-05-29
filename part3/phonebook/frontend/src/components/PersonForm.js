import React, { useState } from "react";

import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, setMessage }) => {
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
            console.log(error);

            if ("response" in error) {
              setMessage({
                type: "error",
                text: `'${changedPerson.name}' - ${error.response.data.error}`,
              });
            } else {
              setPersons(
                persons.filter((person) => person.id !== changedPerson.id)
              );
              setMessage({
                type: "error",
                text: `The person '${changedPerson.name}' was already deleted from server`,
              });
            }

            setTimeout(() => setMessage(null), 5000);
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
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setMessage({ type: "create", text: `Added '${createdPerson.name}'` });
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setMessage({
            type: "error",
            text: error.response.data.error,
          });
          setTimeout(() => setMessage(null), 5000);
          console.log(error.response.data.error);
        });
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
