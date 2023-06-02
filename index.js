require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const Contact = require("./models/contacts");
const cors = require("cors");

app.use(express.static("build"));

app.use(cors());

app.use(express.json());

morgan.token("body", req => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  res.end();
};

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

app.get("/api/persons", (req, res, next) => {
  Contact.find({})
    .then(contacts => res.json(contacts))
    .catch(error => next(error));
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
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then(savedContact => {
    res.json(savedContact);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
