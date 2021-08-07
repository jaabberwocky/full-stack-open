import personService from '../services/persons.js'

const PersonForm = ({
    persons,
    setPersons,
    setNewName,
    setNewNumber,
    newName,
    newNumber,
    setSuccessMessage,
    setErrorMessage,
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
            personService
              .updatePerson(el.id, nameObject)
              .then(() => {
                let updatedPersons = [...persons];
                updatedPersons[i] = nameObject;
                setPersons(updatedPersons);
              })
              .catch((e) => {
                setErrorMessage(
                  `Information of ${nameObject.name} cannot be updated as it is not found on server`
                );
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

export default PersonForm;