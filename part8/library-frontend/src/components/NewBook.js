import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  ALL_BOOKS_BY_GENER,
} from '../queries'

const NewBook = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors
        ? error.graphQLErrors[0].message
        : error
      console.log(messages)
    },
    update: (cache, { data: { addBook } }) => {
      cache.updateQuery(
        { query: ALL_BOOKS_BY_GENER, variables: { genre: user.favoriteGenre } },
        ({ allBooks }) => {
          return {
            allBooks: addBook.genres.some((g) => g === user.favoriteGenre)
              ? allBooks.concat(addBook)
              : allBooks,
          }
        }
      )
    },
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      navigate('/books')
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: Number(published), genres },
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
