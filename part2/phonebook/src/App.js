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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "12345678" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Entry key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
