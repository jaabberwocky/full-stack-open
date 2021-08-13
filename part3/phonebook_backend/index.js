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
app.get("/api/persons", (req, resp, next) => {
  Entry.find({})
    .then((response) => resp.json(response))
    .catch((e) => next(e));
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

app.get("/api/persons/:id", (req, resp, next) => {
  const id = req.params.id;
  Entry.findOne({ id: id })
    .then((entry) => {
      if (entry) {
        resp.json(entry);
      } else {
        resp.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, resp, next) => {
  const id = Number(req.params.id);
  Entry.deleteOne({ id: id })
    .then((entry) => {
      if (entry.deletedCount === 1) {
        resp.status(204).end();
      } else {
        resp.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, resp, next) => {
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
      .catch((e) => next(e));
  });
});

app.put("/api/persons/:id", (req, resp, next) => {
  const id = Number(req.params.id);
  const body = req.body;
  if (!body.name || !body.number) {
    return resp.status(400).send({ error: "no name or number provided" });
  }
  const personObject = {
    id: id,
    name: body.name,
    number: body.number,
  };

  Entry.findOneAndUpdate({ id: id }, personObject)
    .then((entry) => {
      resp.json(entry);
    })
    .catch((e) => next(e));
});

// error-handling middleware
// error handler must be at the end of stack
const errorHandler = (error, request, response, next) => {
  console.log("ERROR HANDLER: ", error.message);
  if (error.name === "CastError") {
    // CastError: invalid object Id for Mongo
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
