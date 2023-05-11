import React from "react";
import ReactDOM from "react-dom/client";
//import axios from "axios";

//import App from "./App1";
//import App from "./App2";
//import App from "./App3";
//import App from "./App4";
//import App from "./App5";
import App from "./App6";

// --1--
/* const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
]; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notes} />
);
*/

// --2--
/* const promise = axios.get("http://localhost:3001/notes");
promise.then((response) => {
  console.log(response);
}); */

/* axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data;
  console.log(notes);
});

 */
/* const promise2 = axios.get("http://localhost:3001/foobar");
console.log(promise2); */

/* axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data;
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />
  );
});
 */

// --3--
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
