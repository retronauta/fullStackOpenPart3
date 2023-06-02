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

morgan.token("body", req => JSON.stringify(req.body));

app.use(morgan(":method :url :body"));

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  res.json({ error: error.message });
};

app.get("/api/persons", (req, res, next) => {
  Contact.find({})
    .then(contacts => res.json(contacts))
    .catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Contact.findById(id)
    .then(contact => res.json(contact))
    .catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then(savedContact => res.json(savedContact))
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updateNumber => res.json(updateNumber))
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
