import React from "react";
import Entry from "./Entry";

const Persons = ({
  persons,
  filterTerm,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
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
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </React.Fragment>
  );
};
export default Persons;