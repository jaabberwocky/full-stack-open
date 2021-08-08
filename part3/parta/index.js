const { response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
  resp.send("<h1>Hello there!</h1>");
});

app.get("/api/notes", (req, resp) => {
  resp.json(notes);
});

app.get("/api/notes/:id", (req, resp) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    resp.json(note);
  } else {
    resp.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, resp) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  resp.status(204).end();
});

app.post("/api/notes", (req, resp) => {
  const body = req.body;
  if (!body.content || !body.important) {
    return resp.status(400).json({
      error: "missing content or importance",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };
  notes = notes.concat(note);
  resp.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
