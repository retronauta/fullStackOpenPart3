const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let list = [
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
  {
    id: 5,
    name: "pepe",
    number: "44324123",
  },
];

const genId = () => {
  const id = Math.floor(Math.random() * 10000);
  return id;
};

const findDuplicate = name => {
  return list.find(person => person.name === name);
};

const totalPeople = list.length;
const date = new Date();

app.get("/api/persons", (req, res) => {
  res.json(list);
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${totalPeople} people</p> ${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  let person = list.find(person => person.id === Number(id));
  person ? res.json(person) : res.status(404).end();
});

app.post("/api/persons", (req, res) => {
  const person = {
    id: genId(),
    name: req.body.name,
    number: req.body.number,
  };

  if (!person.name || !person.number || findDuplicate(person.name)) {
    return res.status(400).json({
      error: "content missing or name must be unique",
    });
  }

  list = list.concat({ ...person, id: genId() });
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  list = list.filter(person => person.id !== Number(id));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
