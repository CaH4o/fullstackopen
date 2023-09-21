// ======================== 6 ======================== //
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
// ======================== 7 ======================== //
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
// ======================== 6 ======================== //
const Person = require('./models/person')
const User = require('./models/user')

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args, context) => {
      console.log('Person.find')
      if (!args.phone) {
        //return Person.find({})
        // ======================== 9 ======================== //
        return Person.find({}).populate('friendOf')
        // ======================== 6 ======================== //
      }

      ///return Person.find({ phone: { $exists: args.phone === 'YES' } })
      // ======================== 9 ======================== //
      return Person.find({ phone: { $exists: args.phone === 'YES' } }).populate(
        'friendOf'
      )
      // ======================== 6 ======================== //
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city,
      }
    },
    // ======================== 8 ======================== //
    friendOf: async (root) => {
      const friends = await User.find({ friends: { $in: [root._id] } })
      console.log('User.find')
      return friends
    },
    // ======================== 6 ======================== //
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      // ======================== 7 ======================== //
      pubsub.publish('PERSON_ADDED', { personAdded: person })
      // ======================== 6 ======================== //
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Editing number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString())

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    },
  },
  // ======================== 7 ======================== //
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
    },
  },
  // ======================== 6 ======================== //
}

module.exports = resolvers
