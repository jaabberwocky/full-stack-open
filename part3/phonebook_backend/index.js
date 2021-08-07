const e = require("express");
const express = require("express");
const app = express();

const persons = [
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
app.use(express.json());

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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
