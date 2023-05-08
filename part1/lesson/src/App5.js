import React, { useState } from "react";

const Display = (props) => <div>{props.value}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export default function App() {
  const [value, setValue] = useState(0);

  const functions = [
    () => console.log(0),
    () => console.log("1 is one"),
    () => console.log("2 = 1+1"),
    () => console.log("3 ole kolme"),
    () => console.log("4 * true"),
    () => console.log("5V"),
  ];

  const setToValue = (newValue) => () => {
    let updatedValue = newValue;
    if (newValue >= functions.length) updatedValue = 0;
    if (newValue < 0) updatedValue = functions.length - 1;
    setValue(updatedValue);
  };

  const handleClick = (index) => functions[index];

  return (
    <div>
      <Button handleClick={setToValue(value + 1)} text="plus" />{" "}
      <Button handleClick={setToValue(value - 1)} text="minus" />
      <Display value={value} />
      <Button handleClick={handleClick(value)} text="click" />
    </div>
  );
}
