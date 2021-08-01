import React, { useEffect, useRef, useState } from "react";

const Statistics = ({ good, neutral, bad, stats }) => {
  if (stats.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table cellPadding="0">
        <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={stats.all} />
        <StatisticsLine text="average" value={stats.average} />
        <StatisticsLine text="positive" value={stats.positivePercentage} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <React.Fragment>
        <tr>
          <td>
            <p>{text}</p>
          </td>
          <td>{value}%</td>
        </tr>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <tr>
          <td>
            <p>{text}</p>
          </td>
          <td>{value}</td>
        </tr>
      </React.Fragment>
    );
  }
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const firstUpdate = useRef(true);

  const initialStats = {
    all: 0,
    average: 0,
    positivePercentage: 0,
  };

  const [stats, setStats] = useState(initialStats);

  // lift state up to app component
  useEffect(() => {
    if (firstUpdate.current) {
      // skip first render
      firstUpdate.current = false;
    } else {
      let all = good + neutral + bad;
      let average = (good - bad) / all;
      let positivePercentage = (good / all) * 100;

      setStats({
        all: all,
        average: average,
        positivePercentage: positivePercentage,
      });
    }
  }, [good, neutral, bad]);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} stats={stats} />
    </div>
  );
};

export default App;
