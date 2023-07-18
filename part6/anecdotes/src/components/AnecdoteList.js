import { useSelector, useDispatch } from 'react-redux'

import { voting } from '../reducers/anecdoteReducer'

const sortByVoteDesc = (a, b) => b.votes - a.votes

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state).sort(sortByVoteDesc)

  const vote = (id) => {
    dispatch(voting(id))
    console.log('vote', id)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
