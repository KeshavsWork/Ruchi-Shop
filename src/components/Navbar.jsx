import React from 'react'

import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbg p-1 text-white h-32 flex justify-between'>
      <Link to="/" className='flex flex-col px-2 gap-2 text-xl items-center justify-center'>
      <div className='flex flex-col px-2 gap-2 text-xl items-center justify-center'>
      <h1>R U C H I</h1> 
      <h1>T R A D E R S</h1>
      </div>
      </Link>
      <div className='flex gap-5 items-center'>
        <div className="cart flex justify-end ">
            <Link to="/cart">
            <button>
                <img src="/src/assets/cart.png" alt="" className='invert'/>
            </button>
            </Link>
        </div>
        <Link to="/login">
        <button>
            <img src="/src/assets/login.png" alt="" className='invert w-16' />
        </button>
        </Link>
      </div>
    
    </div>
  )
}

export default Navbar
