import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react'
import type { RootState } from './store/store'
import './index.css'
import ErrorBoundary from './components/Common/ErrorBoundary'
import { AuthProvider } from './contexts/AuthProvider'

const HomeScreen = lazy(() => import('./Pages/HomeScreen/HomeScreen'))
const MovieDetails = lazy(() => import('./Pages/MovieDetails/MovieDetails'))
const SearchResults = lazy(() => import('./Pages/SearchResults/SearchResults'))
const MoviesPage = lazy(() => import('./Pages/MoviesPage/MoviesPage'))
const SeriesPage = lazy(() => import('./Pages/SeriesPage/SeriesPage'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))
const Login = lazy(() => import('./Pages/Auth/Login'))
const Signup = lazy(() => import('./Pages/Auth/Signup'))
const ForgotPassword = lazy(() => import('./Pages/Auth/ForgotPassword'))
const Subscription = lazy(() => import('./Pages/Subscription/Subscription'))
const SubscriptionSuccess = lazy(() => import('./Pages/Subscription/SubscriptionSuccess'))

const AppRoutes = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  return (
    <Suspense fallback={<div className="min-h-screen bg-netflix-dark-gray" />}>
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
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/subscription/success' element={<SubscriptionSuccess />} />
            <Route path='/login' element={<HomeScreen />} />
            <Route path='/signup' element={<HomeScreen />} />
            <Route path='/forgot-password' element={<HomeScreen />} />
          </>
        )}
      </Routes>
    </Suspense>
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
    </ErrorBoundary>
  )
}

export default App
