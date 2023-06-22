const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const config = require('../utils/config')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, ' is missing'],
    unique: true, //index: { unique: true },
    minLength: [3, "'{VALUE}' is shorter than the minimum allowed length (3)"],
  },
  name: {
    type: String,
    required: [true, ' is missing'],
  },
  passwordHash: String,
  password: {
    type: String,
    required: [true, ' is missing'],
    minLength: [3, "'{VALUE}' is shorter than the minimum allowed length (3)"],
    validate: {
      validator: (n) => /^[a-zA-Z]\w+$/.test(n),
      message: () => 'The password must start with a character',
    },
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', async function (next) {
  const saltRounds = parseInt(config.SALTROUNDS)
  this.passwordHash = await bcrypt.hash(this.password, saltRounds)
  this.password = undefined
  next()
})

userSchema.pre('update', async function (next) {
  if (this.password !== undefined) {
    const saltRounds = parseInt(config.SALTROUNDS)
    this.passwordHash = await bcrypt.hash(this.password, saltRounds)
    this.password = undefined
  }
  next()
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
