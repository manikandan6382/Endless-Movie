import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './Pages/HomeScreen/HomeScreen'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import SearchResults from './Pages/SearchResults/SearchResults'
import './index.css'
import MoviesPage from './Pages/MoviesPage/MoviesPage'
import SeriesPage from './Pages/SeriesPage/SeriesPage'
import ErrorBoundary from './components/Common/ErrorBoundary'

function App() {
  // const user = null
  const user = {
    user: 'jack',
    email: 'jack@example.com',
    password: '123'
  }
  return (
      <ErrorBoundary>
      <Router>
        {
          !user ? <h1>Login</h1>
            :
            <Routes>
              <Route path="/search" element={<SearchResults />} />
              <Route path='/' element={<HomeScreen />} />
              <Route path='/movie' element={<MoviesPage />} />
              <Route path='/tv' element={<SeriesPage />} />
              <Route path='/:type/:id' element={<MovieDetails />} />
            </Routes>
        }
      </Router>
    </ErrorBoundary>
  )
}

export default App
