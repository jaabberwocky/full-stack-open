import React, { useEffect, useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const generateInitialVotes = () => {
    let votes = {};
    for (let i = 0; i < anecdotes.length; i++) {
      votes[i] = 0;
    }
    return votes;
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(generateInitialVotes());
  const [totalVotes, setTotalVotes] = useState(0);
  const [mostVotes, setMostVotes] = useState(null);

  const handleNext = () => {
    while (true) {
      let candidate = Math.floor(Math.random() * anecdotes.length);
      if (candidate !== selected) {
        setSelected(candidate);
        break;
      } else {
        console.log("Same candidate, repicking!");
      }
    }
  };

  const handleVote = () => {
    setTotalVotes(totalVotes + 1);
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  useEffect(() => {
    const getHighestVotes = () => {
      let highestCount = 0;
      let highest = null;

      for (let el in votes) {
        if (votes[el] > highestCount) {
          highestCount = votes[el];
          highest = el;
        }
      }

      return highest;
    };
    if (totalVotes !== 0) {
      setMostVotes(getHighestVotes());
    }
  }, [votes, totalVotes]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        selected={selected}
        anecdote={anecdotes[selected]}
        vote={votes[selected]}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        selected={mostVotes}
        anecdote={anecdotes[mostVotes]}
        vote={votes[mostVotes]}
      />
    </div>
  );
};

const Anecdote = ({ selected, anecdote, vote }) => {
  return (
    <React.Fragment>
      Anecdote #{selected}: {anecdote}
      <br />
      has {vote} votes
      <br />
    </React.Fragment>
  );
};

export default App;
