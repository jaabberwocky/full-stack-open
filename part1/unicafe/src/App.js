import React, { useEffect, useState } from "react";

const Statistics = ({ good, neutral, bad, stats }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {stats.total}</p>
      <p>average: {stats.average}</p>
      <p>positive: {stats.positivePercentage}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const initialStats = {
    all: 0,
    average: 0,
    positivePercentage: 0,
  };

  const [stats, setStats] = useState(initialStats);

  // lift state up to app component
  useEffect(() => {
    let total = good + neutral + bad;
    let average = (good - bad) / total;
    let positivePercentage = good / total;

    setStats({
      total: total,
      average: average,
      positivePercentage: positivePercentage,
    });
  }, [good, neutral, bad]);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} stats={stats} />
    </div>
  );
};

export default App;
