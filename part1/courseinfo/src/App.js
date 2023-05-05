import React from "react";

const Header = (props) => {
  const name = props.courseName;

  return <h1>{name}</h1>;
};

const Part = (props) => {
  const { name, exercises } = { ...props };

  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.courseParts;

  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  const exercisesNumber = props.courseParts.reduce(
    (priv, curr) => priv + curr.exercises,
    0
  );

  return (
    <p>
      Number of exercises: <b>{exercisesNumber}</b>
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  );
};

export default App;
