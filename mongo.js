const mongoose = require("mongoose");

const arguments = process.argv.length;

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://lino:${password}@cluster0.10tl4ju.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const contact = new Contact({
  name: name,
  number: number,
});

if (arguments < 3) {
  console.log("Give password as argument");
  process.exit(1);
} else if (arguments === 5) {
  contact.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (arguments === 3) {
  Contact.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(contact => {
      console.log(contact.name, contact.number);
    });
    mongoose.connection.close();
  });
}
