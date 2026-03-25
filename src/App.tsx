import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import { Analytics } from '@vercel/analytics/react'
import HomeScreen from './Pages/HomeScreen/HomeScreen'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import SearchResults from './Pages/SearchResults/SearchResults'
import './index.css'
import MoviesPage from './Pages/MoviesPage/MoviesPage'
import SeriesPage from './Pages/SeriesPage/SeriesPage'
import Profile from './Pages/Profile/Profile'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ErrorBoundary from './components/Common/ErrorBoundary'
import AuthTest from './components/AuthTest/AuthTest'
import { AuthProvider } from './contexts/AuthProvider'
import Subscription from './Pages/Subscription/Subscription'
import SubscriptionSuccess from './Pages/Subscription/SubscriptionSuccess'

const AppRoutes = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {!currentUser ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/search" element={<SearchResults />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/movie' element={<MoviesPage />} />
          <Route path='/tv' element={<SeriesPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/:type/:id' element={<MovieDetails />} />
          <Route path='/auth-test' element={<AuthTest />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/subscription/success' element={<SubscriptionSuccess />} />
          <Route path='/login' element={<HomeScreen />} />
          <Route path='/signup' element={<HomeScreen />} />
          <Route path='/forgot-password' element={<HomeScreen />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
      <Analytics />
    </ErrorBoundary>
  )
}

export default App
