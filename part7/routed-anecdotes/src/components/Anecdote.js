const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>
      <span>for more info see</span>
      <a href={anecdote.info} alt={anecdote.content}>
        {anecdote.info}
      </a>
    </div>
  </div>
)

export default Anecdote
