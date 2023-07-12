require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGODB_URI =
  NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const SALTROUNDS = process.env.SALTROUNDS
const SECRET = process.env.SECRET
const TOKENTIME = 360

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  SALTROUNDS,
  SECRET,
  TOKENTIME,
}
