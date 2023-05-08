import React, { useState } from "react";

/* 
//<--1-->
const App = ( { counter }) => {
  console.log("rendering...", counter);

  return (
    <div>
      <div>{counter}</div>
    </div>
  );
}  */

/* 
//<--2-->
const App = () => {
  setTimeout(() => setCounter(counter + 1), 1000);
  console.log("rendering...", counter);

  const handleClick = () => {
    console.log("clicked");
  };

  console.log(() => setCounter(counter + 1));
  //console.log(setCounter(counter + 1)); 

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button> 
      <button onClick={() => console.log('clicked')}>plus</button>
    </div>
  );
} */

/* 
//<--3-->
const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering...", counter);

  const increaseByOne = () => setCounter(counter + 1);
  
  const setToZero = () => setCounter(0);
  
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
      <button onClick={increaseByOne}>plus</button>
      <button onClick={setToZero}>zero</button>
    </div>
  );
}
 */

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

//<--4-->
const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

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
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  );
};

export default App;
