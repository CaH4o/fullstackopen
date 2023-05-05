import React, { useState } from "react";

const Hello = (/* props */ { name, age }) => {
  /*  const name = props.name;
  const age = props.age; */

  /* const { name, age } = props; */

  /*   const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  }; */

  const bornYear = () => new Date().getFullYear() - age;

  //console.log(props);
  return (
    <div>
      <p>
        {/* Hello {props.name}, you are {props.age} years old */}
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export default function App(/* { counter } */) {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);
  const name = "Peter";
  const age = 10;
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];
  const strArr = ["Peter", "Maya"];

  /* setTimeout(() => setCounter(counter + 1), 1000); */
  //console.log("rendering...", counter);

  /* const handleClick = () => {
    console.log("clicked");
  }; */

  /*  console.log(() => setCounter(counter + 1));
  //console.log(setCounter(counter + 1)); */

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };
  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };
  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };

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
      {/* <div>{counter}</div> */}
      <Display counter={counter} />
      {/* <button onClick={handleClick}>plus</button> */}
      {/* <button onClick={() => console.log('clicked')}>plus</button> */}
      {/* <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button> */}
      {/* <button onClick={increaseByOne}>plus</button>
      <button onClick={setToZero}>zero</button> */}
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  );
}
