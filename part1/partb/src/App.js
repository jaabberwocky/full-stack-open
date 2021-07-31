import React, { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import { Key } from "./Key.js";
import { Hello } from "./Hello.js";

const App = () => {
  const name = "Peter";
  const age = 10;

  const initialState = {
    counter: 0,
    greeting: "Greetings",
    keyHistory: [],
  };
  const [myState, setMyState] = useState(initialState);

  const handleMouseEnter = () => {
    console.log("Mouse enter detected...");
    setMyState({ ...myState, greeting: <u>{"MOUSEOVER"}</u> });
  };

  const handleMouseLeave = () => {
    console.log("Mouse leave detected...");
    setMyState({ ...myState, greeting: "Greetings" });
  };

  useEffect(
    () => {
      console.log(`Updating title to ${myState.counter}...`);
      document.title = `Current counter: ${myState.counter}`;
    },
    // only update if myState.counter changes
    [myState.counter]
  );

  useKeypress(["ArrowLeft", "ArrowRight"], (e) => {
    let arr = myState.keyHistory;
    if (e.key === "ArrowLeft") {
      arr.push("L");
      setMyState({ ...myState, keyHistory: arr });
    } else {
      arr.push("R");
      setMyState({ ...myState, keyHistory: arr });
    }
  });

  useKeypress("q", (e) => {
    // TODO: possible to do multiple key combinations??
    if (myState.keyHistory.length > 0) {
      console.log("Resetting key history...");
      setMyState({ ...myState, keyHistory: [] });
    }
  });

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
      <button
        onClick={() =>
          // retains keyHistory when "resetting"
          setMyState({ ...initialState, keyHistory: myState.keyHistory })
        }
      >
        Reset
      </button>
      <Hello name="Maya" age={26 + 10} counter={myState.counter} />
      <Hello name={name} age={age} counter={myState.counter} />
      <hr />
      <p>Press LeftArrow or RightArrow on keyboard to enter key history.</p>
      <p>Press q to reset history.</p>
      <Key keyHistory={myState.keyHistory} />
    </div>
  );
};

export default App;
