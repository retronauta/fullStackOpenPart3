const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log('Connected to database'))
  .catch(error => console.log('Error connecting to database', error.message))

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-/.test(v) || /\d{2}-/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
