import React, { useState, useEffect } from "react";

import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");

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
          alert(`the person '${person.name}' was already deleted from server`);
          console.log(error);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
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
