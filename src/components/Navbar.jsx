import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className='flex space-x-8 border items-center text-xl text-blue-500 font-bold p-2'>
      <img className='w-10' src="./src/components//MovieLogo.jpg" ></img>
      <Link to='/'>Movies</Link>
      <Link to='/watchlist'>WatchList</Link>
    </div>
    </nav>
    
  )
}

export default Navbar
