const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
// middleware
app.use(express.json());
morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return null;
  }
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("build"));

// helper functions
const generateId = () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  return getRandomInt(0, Number.MAX_VALUE);
};

// routes
app.get("/api/persons", (req, resp) => {
  resp.json(persons);
});

app.get("/info", (req, resp) => {
  const date = new Date();
  resp.send(`Phonebook has info for ${persons.length} people.<br><br>${date}`);
});

app.get("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    resp.json(person);
  } else {
    resp.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  resp.status(204).end();
});

app.post("/api/persons", (req, resp) => {
  const body = req.body;
  const candidate = persons.find((person) => person.name === body.name);
  if (!body.name || !body.number) {
    return resp.status(400).json({
      error: "bad request due to missing name or number",
    });
  } else if (candidate) {
    return resp.status(400).json({
      error: "name must be unique",
    });
  }
  const personObject = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(personObject);
  resp.json(personObject);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
