import { useState } from "react";

const Title = ({ text }) => <h2>{text}</h2>;

const Anecdote = ({ text }) => <div>{text}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Vote = ({ point }) => (
  <div>
    has {point} vote{point !== 1 && "s"}
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
    "Programming can be fun, so can cryptography; however they should not be combined.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Object.assign({}, anecdotes.map(Number.prototype.valueOf, 0))
  );

  const pointsArray = Object.values(points);
  const indexMaxPoint = pointsArray.indexOf(Math.max(...pointsArray));

  const handleClick = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = () =>
    setPoints({ ...points, [selected]: points[selected] + 1 });

  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <Anecdote text={anecdotes[selected]} />
      <Vote point={points[selected]} />
      <Button handleClick={handleVote} text={"vote"} />
      <Button handleClick={handleClick} text={"next anecdote"} />
      <Title text={"Anecdote with most votes"} />
      <Anecdote text={anecdotes[indexMaxPoint]} />
      <Vote point={points[indexMaxPoint]} />
    </div>
  );
};

export default App;
