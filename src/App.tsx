import { BrowserRouter as Router , Routes , Route  } from 'react-router-dom'
import HomeScreen from './Pages/HomeScreen/HomeScreen'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import './index.css'
function App() {
  // const user = null
  const user = {
    user:'jack',
    email:'jack@example.com',
    password:'123'
  }
  return (
    <div>
      <Router>
        {
          !user ?<h1>Login</h1>
          :
          <Routes>

            <Route path='/' element={<HomeScreen />}/>
            <Route path='/movie/:id' element={<MovieDetails type='movie'/>}/>
            <Route path='/tv/:id' element={<MovieDetails type='tv'/>}/>
          </Routes>
        }
      </Router>
    </div>
  )
}

export default App
