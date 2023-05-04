import React from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part
        part={props.courses[0].part}
        exercises={props.courses[0].exercises}
      />
      <Part
        part={props.courses[1].part}
        exercises={props.courses[1].exercises}
      />
      <Part
        part={props.courses[2].part}
        exercises={props.courses[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises: {props.exercisesNumber}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const courses = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];
  const exercisesNumber =
    courses[0].exercises + courses[1].exercises + courses[2].exercises;

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total exercisesNumber={exercisesNumber} />
    </div>
  );
};

export default App;
