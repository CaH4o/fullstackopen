require("dotenv").config();
const express = require("express");
const time = require("express-timestamp");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT;
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const morganCustom = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req["body"]),
  ].join(" ");
};

const generateId = () => {
  const ids = persons.map((p) => p.id);
  let id = 0;

  do {
    id = Math.floor(Math.random() * 1000000);
  } while (ids.some((i) => i === id));

  return id;
};

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(time.init);
app.use(morgan(morganCustom));

app.get("/", (request, response) => {
  response.send(`<div>
  <h1>Phonebook API</h1>
  <div>GET <b>./info</b> - get general information.</div>
  <div>GET <b>./api/persons</b> - get all persons.</div>
  <div>GET <b>./api/persons/{id}</b> - get a singl person by id.</div>
  <div>POST <b>./api/persons</b> - create a singl person by body.</div>
  <div>DELETE <b>./api/persons/{id}</b> - delete a singl person by id.</div>
</div>`);
});

app.get("/info", (request, response) => {
  //@ts-ignore
  const date = new Date(request.timestamp || Date.now());

  response.send(`<div>
  <div>Phonebook has info for ${persons.length} people</div>
  <div>${date.toString()}</div>
</div>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch(() => response.status(404).end());
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch(() => response.status(404).end());
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }

  /*   if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((returnedPerson) => response.json(returnedPerson));
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
