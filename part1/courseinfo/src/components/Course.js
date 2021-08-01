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
  const total = props.parts.reduce((acc, val) => acc + val["exercises"], 0);
  return <b>total of {total} exercises</b>;
};

const Course = ({ course, parts }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
