import React, { useEffect, useState } from "react";
import personService from "./services/persons.js";
import PersonForm from "./components/PersonForm.js";
import ErrorMessage from "./components/ErrorMessage.js";
import SuccessMessage from "./components/SuccessMessage.js";
import Filter from "./components/Filter.js";
import Persons from "./components/Persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((allPersons) => setPersons(allPersons));
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMessage
        message={successMessage}
        setSuccessMessage={setSuccessMessage}
        delay={5000}
      />
      <ErrorMessage
        message={errorMessage}
        setErrorMessage={setErrorMessage}
        delay={5000}
      />
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <PersonForm
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterTerm={filterTerm}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  );
};

export default App;
