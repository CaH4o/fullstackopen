require("dotenv").config();
const express = require("express");
const time = require("express-timestamp");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT;
const app = express();

const unknownEndpoint = (request, response, next) => {
  next({ name: "UnknownEndpoint" });
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

const errorHandler = (error, request, response, next) => {
  console.error(error.name);

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "SyntaxError":
      return response.status(400).send({ error: "malformatted JSON" });
    case "InvalidName":
      return response.status(400).send({ error: "The name is missing" });
    case "InvalidNumber":
      return response.status(400).send({ error: "The number is missing" });
    case "ExistName":
      return response
        .status(400)
        .send({ error: "The name already exists in the phonebook" });
    case "ValidationError":
      return response.status(400).send({ error: error.message });
    case "UnknownEndpoint":
      return response.status(404).send({ error: "unknown endpoint" });
    default:
      console.error(error.message);
      next(error);
  }
};

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(time.init);
app.use(morgan(morganCustom));

app.get("/api", (request, response) => {
  response.send(`<div>
  <h1>Phonebook API</h1>
  <div>GET <b>./info</b> - get general information.</div>
  <div>GET <b>./api/persons</b> - get all persons.</div>
  <div>GET <b>./api/persons/{id}</b> - get a singl person by id.</div>
  <div>POST <b>./api/persons</b> - create a singl person by body.</div>
  <div>PUT <b>./api/persons/{id}</b> - update a singl person by id.</div>
  <div>DELETE <b>./api/persons/{id}</b> - delete a singl person by id.</div>
</div>`);
});

app.get("/info", (request, response, next) => {
  //@ts-ignore
  const date = new Date(request.timestamp || Date.now());
  Person.aggregate([{ $count: "Person" }])
    .then(([result]) => {
      response.send(`<div>
    <div>Phonebook has info for ${result["Person"]} people</div>
    <div>${date.toString()}</div>
  </div>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  Person.find({ name })
    .then((result) => {
      if (result.length) {
        return next({ name: "ExistName" });
      } else {
        const person = new Person({
          name,
          number,
        });

        person
          .save()
          .then((returnedPerson) => response.json(returnedPerson))
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
