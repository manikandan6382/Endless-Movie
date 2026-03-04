import React, { useEffect, useState } from 'react'
import './Nav.css'
import { LucideSearch } from 'lucide-react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const [bgScroll, setBgScroll] = useState(false)
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

    return (
        <nav className={` w-full transition-[backdrop-filter] duration-800 backdrop-blur-md shadow-sm ${bgScroll? 'backdrop-blur-md shadow-sm':'backdrop-blur-[2px] '}`}>
            <div className="flex gap-25 text-white px-6 py-4 text-xl items-center">
                <div className="">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="Netflix Logo"
                        className='h-15'
                    />
                </div>
                <div className="flex gap-20">
                    <Link to='/' className='hover:text-netflix-red transition-colors font-semibold text-white'>Home</Link>
                    <Link to='/' className='hover:text-netflix-red transition-colors font-semibold text-white/60'>Movies</Link>
                    <Link to='/' className='hover:text-netflix-red transition-colors font-semibold text-white/60'>Series</Link>
                </div>
                <div className="flex items-center gap-3 ml-auto w-full justify-end">
                    <div className="relative max-w-xl w-full">
                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 border-r h-5 border-gray-500 flex">
                            <LucideSearch className='mr-2 -mt-0.5 text-white/60' />
                        </div>
                        <input type="text" className={`placeholder:text-white/60 focus:ring outline-0 w-full border-unset pl-15 py-3 rounded-[50rem] placeholder:text-[16px] transition-colors duration-800 ${bgScroll? 'bg-black/80':'bg-black/50'}`} placeholder='Search...' />
                    </div>
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