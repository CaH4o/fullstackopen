import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField({ name: 'content' })
  const author = useField({ name: 'author' })
  const info = useField({ name: 'info' })

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...[content].map(({ reset, ...rest }) => rest)[0]} />
        </div>
        <div>
          author
          <input {...[author].map(({ reset, ...rest }) => rest)[0]} />
        </div>
        <div>
          url for more info
          <input {...[info].map(({ reset, ...rest }) => rest)[0]} />
        </div>
        <button>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
