import React, { useState } from "react";

const Entry = ({ person }) => {
  return (
    <React.Fragment>
      <p>{person.name}</p>
    </React.Fragment>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };

    for (let el of persons) {
      if (nameObject.name === el.name) {
        alert(`${nameObject.name} is already added to phonebook`);
      } else {
        setPersons(persons.concat(nameObject));
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
