import React, { useState } from "react";

const Hello = ({ name, age, counter }) => {
  const bornYear = () => new Date().getFullYear() - age + counter;

  return (
    <div>
      <p>
        Hello {name}, you are {age + counter} years old. ageDiff:{counter}
      </p>
      <p>
        <b>So you were probably born in {bornYear()}</b>
      </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  const initialState = {
    counter: 0,
    greeting: "Greetings",
  };
  const [myState, setMyState] = useState(initialState);

  const handleMouseEnter = () => {
    console.log("Mouse enter detected...");
    setMyState({ ...myState, greeting: "MOUSEOVER" });
  };

  const handleMouseLeave = () => {
    console.log("Mouse leave detected...");
    setMyState({ ...myState, greeting: "Greetings" });
  };

  console.log("rendering...", myState.counter);
  return (
    <div>
      <h1
        id="title"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {myState.greeting}
      </h1>
      <h2>{myState.counter}</h2>
      <button
        onClick={() =>
          setMyState({
            ...myState,
            counter: myState.counter + 1,
          })
        }
      >
        Increase
      </button>
      <button onClick={() => setMyState(initialState)}>Reset</button>
      <Hello name="Maya" age={26 + 10} counter={myState.counter} />
      <Hello name={name} age={age} counter={myState.counter} />
    </div>
  );
};

export default App;
