import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    votingAnecdote(state, action) {
      const id = action.payload
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { votingAnecdote, createAnecdote, setAnecdotes } =
  anecdotesSlice.actions
export default anecdotesSlice.reducer
