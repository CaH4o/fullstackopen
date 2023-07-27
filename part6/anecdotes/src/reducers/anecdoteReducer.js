import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    },
  },
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const votingAnecdote = (anecdote) => {
  return async (dispatch) => {
    const sendAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const newAnecdote = await anecdoteService.update(sendAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdotesSlice.reducer
