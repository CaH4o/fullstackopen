require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!,
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (
      author: String 
      genre: String
    ): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!,
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, agrs) => {
      const { author, genre } = agrs
      const filterBy = {}

      if (genre) filterBy.genres = genre
      if (author) {
        const authorInDb = await Author.findOne({ name: author })
        if (authorInDb) filterBy.author = authorInDb.id
      }

      return Book.find(filterBy).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (author) => Book.count({ author: author.id }),
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find((b) => b.title === args.title)) {
        throw new GraphQLError('Name must be unique', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title },
        })
      }

      const author = authors.find((a) => a.name === args.author)

      if (!author) {
        authors = authors.concat({ name: args.author, id: uuid() })
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)

      if (!author) {
        throw new GraphQLError('Name not found', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name },
        })
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) =>
        a.id === updatedAuthor.id ? updatedAuthor : a
      )
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
