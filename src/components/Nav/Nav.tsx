import { useEffect, useState } from 'react'
import './Nav.css'
// import { LucideSearch } from 'lucide-react'
import SearchBar from './SearchBar'

import { Link , useLocation} from 'react-router-dom'
const Nav = () => {
    const [bgScroll, setBgScroll] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setBgScroll(true)
            } else {
                setBgScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path: string) => {
        return location.pathname === path
    }
    return (
    <nav className={`z-10 w-full transition-[backdrop-filter] duration-800 backdrop-blur-md shadow-sm ${bgScroll ? 'backdrop-blur-md shadow-sm' : 'backdrop-blur-[2px] '}`}>
            <div className="flex gap-25 text-white px-6 py-4 text-xl items-center">
                <Link to='/' className="">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="Netflix Logo"
                        className='h-15'
                    />
                </Link>
                <div className="flex gap-20 text-[16px]">
                      <Link 
                        to='/' 
                        className={`hover:text-netflix-red transition-colors font-semibold ${
                            isActive('/') ? 'text-white' : 'text-white/60'
                        }`}
                    >
                        Home
                    </Link>
                    <Link 
                        to='/movie' 
                        className={`hover:text-netflix-red transition-colors font-semibold ${
                            isActive('/movie') ? 'text-white' : 'text-white/60'
                        }`}
                    >
                        Movies
                    </Link>
                    <Link 
                        to='/tv' 
                        className={`hover:text-netflix-red transition-colors font-semibold ${
                            isActive('/tv') ? 'text-white' : 'text-white/60'
                        }`}
                    >
                        Series
                    </Link>
                </div>
                <div className="flex items-center gap-3 ml-auto w-full justify-end">
                    <SearchBar bgScroll={bgScroll} />

                    <Link to='/' className=''>
                        <img
                            src="https://imgs.search.brave.com/9Sif716P2JZdFr0lCg1qTRpKQlUFl42lAG606LJ3eL0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzE5Lzc3LzAz/LzM2MF9GXzEyMTk3/NzAzNzZfSlhEWEla/OFZqb1VWNUNQR3RJ/NDZMeGMyRkQ4UUc5/aDUuanBn"
                            alt="Profile"
                            className='object-cover rounded-full w-10 h-10 '
                        />
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Nav