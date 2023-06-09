const mongoose = require('mongoose')

const argvl = process.argv.length

if (argvl !== 3 && argvl !== 5) {
  if (argvl < 3) console.log('give password as argument')
  if (argvl > 3 && argvl < 5) console.log('give name and number as arguments')
  if (argvl > 5) console.log('too much arguments')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.bqsahnp.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

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
        return /^\d{2,3}-\d{5,}$/.test(n)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Number is required'],
  },
})

const Person = mongoose.model('Person', personSchema)

if (argvl === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person.save().then((result) => {
    const logRaw = `added ${result?.name} ${result?.number} to phonebook`
    console.log(logRaw)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })

    mongoose.connection.close()
  })
}
