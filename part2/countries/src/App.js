import React, { useEffect, useRef, useState } from "react";
import axios from "../../phonebook/node_modules/axios";
import "./App.css";

function App() {
  const [field, setField] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // used for searching
  const [countries, setCountries] = useState([]);
  const isFirstRun = useRef(true);

  const hook = () => {
    if (isFirstRun.current) {
      // skip loading the first one
      isFirstRun.current = false;
    } else {
      axios.get("http://restcountries.eu/rest/v2/all").then((resp) => {
        console.log("data loaded");
        console.log(resp);
        filterCountries(resp.data, searchTerm);
      });
    }
  };

  const filterCountries = (data, term) => {
    let arr = [];

    for (let country of data) {
      if (country.name.toLowerCase().includes(term.toLowerCase())) {
        arr.push(country);
      }
    }

    if (arr.length === 1) {
      const singleCountry = arr[0];
      setCountries(
        <div id="singleCountry">
          <h2>{singleCountry.name}</h2>
          <p>capital {singleCountry.capital}</p>
          <p>population {singleCountry.population}</p>
          <h2>languages</h2>
          <ul>
            {singleCountry.languages.map((lang) => (
              <li key={lang.iso639_2}>{lang.name}</li>
            ))}
          </ul>
          <br/>
          <img
            src={singleCountry.flag}
            alt={singleCountry.name + "flag"}
            width="100px"
            height="50px"
          />
        </div>
      );
    } else if (arr.length < 10) {
      setCountries(arr.map((country) => <p>{country.name}</p>));
    } else {
      setCountries(<p>too many countries, narrow down search term</p>);
    }
  };

  useEffect(hook, [searchTerm]);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        field={field}
        setField={setField}
      />
      <h2>Countries</h2>
      <ul>{countries}</ul>
    </div>
  );
}

const Search = ({ searchTerm, setSearchTerm, field, setField }) => {
  const handleFieldChange = (event) => {
    setField(event.target.value);
  };

  const submitTermChange = (event) => {
    event.preventDefault();
    setSearchTerm(field);
  };

  return (
    <React.Fragment>
      <form onSubmit={submitTermChange}>
        find countries
        <input value={field} onChange={handleFieldChange} />
        <button type="submit">search</button>
      </form>
    </React.Fragment>
  );
};

export default App;
