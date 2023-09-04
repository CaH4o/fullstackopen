import { Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/*' element={<Navigate replace to='/authors' />} />
      </Routes>
    </div>
  )
}

export default App
