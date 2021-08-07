import React from "react";
import personService from "../services/persons.js";

const Entry = ({
  person,
  persons,
  setPersons,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const handleClick = () => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      const idToDelete = person.id;
      personService
        .deletePerson(idToDelete)
        .then(() => setSuccessMessage(`Deleted ${person.name}`))
        .catch((e) =>
          setErrorMessage(
            `Information of ${person.name} cannot be deleted as it is not found on server`
          )
        );
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

export default Entry;
