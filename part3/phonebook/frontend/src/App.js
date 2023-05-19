import React, { useState, useEffect } from "react";

import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow = filterName.length
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(filterName.toUpperCase())
      )
    : persons;

  const personDelete = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          console.log(error);
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            type: "error",
            text: `The person '${person.name}' was already deleted from server`,
          });
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        personDelete={personDelete}
      />
    </div>
  );
};

export default App;
