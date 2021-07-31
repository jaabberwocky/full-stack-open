import React, { useState } from "react";

const Hello = ({ name, age }) => {
  // directly assign to const
  // using destructuring

  const bornYear = () => new Date().getFullYear() - age + ageDiff;
  const [ageDiff, ageIncrement] = useState(0);

  // increases age
  // setTimeout(() => ageIncrement(ageDiff + 1), 1000);

  return (
    <div>
      <p>
        Hello {name}, you are {age + ageDiff} years old
      </p>
      <p>
        <b>So you were probably born in {bornYear()}</b>
      </p>
      <button onClick={() => ageIncrement(0)}>Reset age diff</button>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  // using a state variable
  const initialState = {
    counter: 0,
  };
  const [myState, setMyState] = useState(initialState);

  console.log("rendering...", myState.counter);
  return (
    <div>
      <h1>Greetings</h1>
      <h2>{myState.counter}</h2>
      <button
        onClick={() =>
          setMyState({
            ...myState,
            counter: myState.counter + 1,
          })
        }
      >
        Click!
      </button>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};

export default App;
