const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, '\'{VALUE}\' is shorter than the minimum allowed length (3)'],
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minLength: [8, '\'{VALUE}\' is shorter than the minimum allowed length (8)'],
    validate: {
      validator: function (n) {
        return /(^\d{2}-\d{5,}$)|(^\d{3}-\d{4,}$)/.test(n)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Number is required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
