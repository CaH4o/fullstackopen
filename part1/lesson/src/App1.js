import React, { useState } from "react";

/* 
//<<--1-->>
const Hello = (props) => {
  console.log(props);

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
}; */

/* 
//<<--2-->>
const Hello = (props) => {
  //const name = props.name;
  //const age = props.age; 
  const { name, age } = props;

  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};
*/

// <<--3-->>
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

export default function App() {
  const name = "Peter";
  const age = 10;
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];
  const strArr = ["Peter", "Maya"];

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <div>
        <p>
          {friends[0].name} {friends[0].age}
        </p>
        <p>
          {friends[1].name} {friends[1].age}
        </p>
      </div>
      <div>
        <p>{strArr}</p>
      </div>
    </div>
  );
}
