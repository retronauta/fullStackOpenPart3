const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const list = [
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
  let note = list.find(person => person.id === Number(id));
  note ? res.json(note) : res.status(404).end();
});

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
