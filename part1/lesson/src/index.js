import React from "react";
import ReactDOM from "react-dom/client";

//import App from "./App1";
//import App from "./App2";
//import App from "./App3";
//import App from "./App4";
import App from "./App5";

//<<--1./App2-->>
/* let counter = 1;

const refresh = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App counter={counter} />
  );
};

setInterval(() => {
  refresh();
  counter += 1;
}, 1000); */

//<<--2+-->>
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
