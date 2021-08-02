import React, { useState } from "react";

const Entry = ({ person }) => {
  return (
    <React.Fragment>
      <p>
        {person.name} {person.number}
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
}) => {
  const addNewEntry = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    for (let el of persons) {
      if (nameObject.name === el.name) {
        alert(`${nameObject.name} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
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

const Persons = ({ persons, filterTerm }) => {
  // case-insensitive search
  const personsToShow =
    filterTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterTerm.toLowerCase())
        );

  return (
    <React.Fragment>
      {personsToShow.map((person) => (
        <Entry key={person.name} person={person} />
      ))}
    </React.Fragment>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "12345678" },
    { name: "Jane Kelly", number: "90712370" },
    { name: "Arthur John", number: "9001133" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <PersonForm
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterTerm={filterTerm} />
    </div>
  );
};

export default App;
