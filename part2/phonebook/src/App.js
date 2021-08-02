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
  addNewEntry,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
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

const Filter = ({ filterTerm, setFilterTerm, handleFilterChange }) => {
  return (
    <React.Fragment>
      filter shown with{" "}
      <input value={filterTerm} onChange={handleFilterChange} />
    </React.Fragment>
  );
};

const Persons = ({ personsToShow }) => {
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

  const personsToShow =
    filterTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterTerm.toLowerCase())
        );

  const addNewEntry = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    for (let el of persons) {
      if (nameObject.name === el.name) {
        alert(`${nameObject.name} is already added to phonebook`);
      } else if (nameObject.name === "" || nameObject.number === "") {
        alert("Name or number must be non-empty");
      } else {
        setPersons(persons.concat(nameObject));
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        addNewEntry={addNewEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
