import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  // using a loop to iterate through all the
  // props given in arrays (parts, exercises)
  const allParts = [];

  props.parts.forEach((x, i) => {
    const element = (
      <Part key={i + "_key"} part={x["name"]} exercise={x["exercises"]} />
    );
    allParts.push(element);
  });

  return <div>{allParts}</div>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((acc, val) => acc + val['exercises'], 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
