require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGODB_URI =
  NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = {
  NODE_ENV,
  MONGODB_URI,
  PORT,
}
