import React from "react";

const data = `mark johansson, waffle iron, 80, 2
mark johansson, blender, 200, 1
mark johansson, knife, 10, 4
Nikita Smith, waffle iron, 80, 1
Nikita Smith, knife, 10, 2
Nikita Smith, post, 20, 3
`;

function App() {
  const output = data
    .trim()
    .split("\n")
    .map((line) => line.split(", "))
    .reduce((customers, line) => {
      customers[line[0]] = customers[line[0]] || [];
      customers[line[0]].push({
        name: line[1],
        price: line[2],
        quantity: line[3],
      });
      return customers;
    }, {});

  console.log(JSON.stringify(output, null, 2));
  return <div>{JSON.stringify(output, null, 4)}</div>;
}

export default App;
