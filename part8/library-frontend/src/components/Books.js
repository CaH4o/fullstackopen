import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGanre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = books
    .map((b) => b.genres)
    .flat()
    .filter((v, i, a) => a.indexOf(v) === i)
    .concat('all genres')

  const booksShow =
    genre === 'all genres'
      ? books
      : books.filter((b) => b.genres.some((g) => g === genre))

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{genre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setGanre(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
