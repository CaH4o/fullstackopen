import { useQuery } from '@apollo/client'

import { ALL_BOOKS_BY_GENER } from '../queries'

const RecommendedBook = ({ user }) => {
  const genre = user.favoriteGenre
  const result = useQuery(ALL_BOOKS_BY_GENER, { variables: { genre } })

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <b>{genre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBook
