require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Entry = require("./models/entry.js");
const app = express();

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
const generateId = async () => {
  const query = await Entry.find({}).sort({ id: -1 }).limit(1);
  const maxIdObj = query[0];
  console.log("Max id currently is ", maxIdObj["id"]);
  return maxIdObj["id"] + 1;
};

// routes
app.get("/api/persons", (req, resp) => {
  Entry.find({}).then((response) => resp.json(response));
});

app.get("/info", (req, resp) => {
  const date = new Date();
  Entry.find({}).then((r) => {
    const persons = r;
    resp.send(
      `Phonebook has info for ${persons.length} people.<br><br>${date}`
    );
  });
});

app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  Entry.find({ id: id }).then((entry) => {
    resp.json(entry);
  });
});

app.delete("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  resp.status(204).end();
});

app.post("/api/persons", (req, resp) => {
  const body = req.body;
  generateId().then((res) => {
    const personObject = new Entry({
      id: res,
      name: body.name,
      number: body.number,
    });
    personObject
      .save()
      .then((savedEntry) => {
        resp.json(savedEntry);
      })
      .catch((e) => console.log(e));
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
