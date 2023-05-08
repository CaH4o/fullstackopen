import { useState } from "react";

const Header = ({ name }) => <h1>{name}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = total ? (good * 1 + neutral * 0 + bad * -1) / total : 0; //(good: 1, neutral: 0, bad: -1)
  const positive = (good * 100) / total;

  return (
    <div>
      <h2>Statistics</h2>
      {total ? (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={total} />
            <StatisticLine text={"average"} value={avg} />
            <StatisticLine text={"positive"} value={positive + " %"} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (handleSetValue, value) => () => handleSetValue(value);

  return (
    <div>
      <Header name={"give feedback"} />
      <Button handleClick={handleClick(setGood, good + 1)} text={"good"} />
      <Button
        handleClick={handleClick(setNeutral, neutral + 1)}
        text={"neutral"}
      />
      <Button handleClick={handleClick(setBad, bad + 1)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
