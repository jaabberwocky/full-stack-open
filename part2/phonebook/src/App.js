import React, { useEffect, useState } from "react";
import personService from "./services/persons.js";

const Entry = ({ person, persons, setPersons }) => {
  const handleClick = () => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      const idToDelete = person.id;
      personService.deletePerson(idToDelete);
      setPersons(persons.filter((person) => person.id !== idToDelete));
    }
  };
  return (
    <React.Fragment>
      <p>
        {person.name} {person.number}{" "}
        <button type="submit" onClick={handleClick}>
          delete
        </button>
      </p>
    </React.Fragment>
  );
};

const PersonForm = ({
  persons,
  setPersons,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
  setSuccessMessage,
}) => {
  const addNewEntry = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    for (const [i, el] of persons.entries()) {
      if (nameObject.name === el.name) {
        const confirmPersonUpdate = window.confirm(
          `${nameObject.name} is already added to phonebook, replace the old number with a new one?`
        );
        setNewName("");
        setNewNumber("");
        if (confirmPersonUpdate) {
          personService.updatePerson(el.id, nameObject).then(() => {
            let updatedPersons = [...persons];
            updatedPersons[i] = nameObject;
            setPersons(updatedPersons);
          });
          return;
        } else {
          return;
        }
      }
    }

    personService.createPerson(nameObject).then((person) => {
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`${person.name} added`);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={addNewEntry}>
        <div>
          <h2>Add a new entry</h2>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const SuccessMessage = ({ message, setSuccessMessage, delay }) => {
  useEffect(() => setTimeout(() => setSuccessMessage(null), delay));
  if (message === null) {
    return null;
  }
  return <div className="success">{message}</div>;
};

const Filter = ({ filterTerm, setFilterTerm }) => {
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  return (
    <React.Fragment>
      filter shown with{" "}
      <input value={filterTerm} onChange={handleFilterChange} />
    </React.Fragment>
  );
};

const Persons = ({ persons, filterTerm, setPersons }) => {
  const personsToShow =
    filterTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterTerm.toLowerCase())
        );

  return (
    <React.Fragment>
      {personsToShow.map((person) => (
        <Entry
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
    </React.Fragment>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((allPersons) => setPersons(allPersons));
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMessage message={successMessage} setSuccessMessage={setSuccessMessage} delay={5000}/>
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <PersonForm
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setSuccessMessage={setSuccessMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterTerm={filterTerm}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
