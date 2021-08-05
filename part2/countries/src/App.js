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
        setCountries(filterCountries(resp.data, searchTerm));
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
      return <CountryDetail singleCountry={singleCountry} />;
    } else if (arr.length === 0) {
      return <p>No countries found</p>;
    } else if (arr.length < 10) {
      // render of multiple countries
      return arr.map((country) => <Country country={country} />);
    } else {
      return <p>too many countries, narrow down search term</p>;
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

const CountryDetail = ({ singleCountry }) => {
  const [weather, setWeather] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [windDirection, setWindDirection] = useState("");

  const hook = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${singleCountry.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((resp) => {
        setWeather(resp.data.weather[0].main);
        setWeatherDescription(resp.data.weather[0].description);
        setTemp(resp.data.main.temp);
        setWind(resp.data.wind.speed);
        setWindDirection(resp.data.wind.deg);
      })
      .catch((err) => console.log(err));
  };
  useEffect(hook);

  return (
    <div id={singleCountry + "_singleCountry"}>
      <h2>{singleCountry.name}</h2>
      <p>capital {singleCountry.capital}</p>
      <p>population {singleCountry.population}</p>
      <h2>languages</h2>
      <ul>
        {singleCountry.languages.map((lang) => (
          <li key={lang.iso639_2}>{lang.name}</li>
        ))}
      </ul>
      <br />
      <img
        src={singleCountry.flag}
        alt={singleCountry.name + "flag"}
        width="100px"
        height="50px"
      />
      <h2>Weather in {singleCountry.capital}</h2>
      <p>{weather} ({weatherDescription})</p>
      <p><b>temperature: </b>{temp}</p>
      <p><b>wind: </b>{wind} m/s at {windDirection} degrees</p>
    </div>
  );
};

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleClick = (event) => {
    setShow(!show);
  };

  return (
    <div id={country.name}>
      <p class="country">{country.name} </p>
      <button onClick={handleClick}>{show ? "hide" : "show"}</button>
      {show ? <CountryDetail singleCountry={country} /> : ""}
    </div>
  );
};
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
