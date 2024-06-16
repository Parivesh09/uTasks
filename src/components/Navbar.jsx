import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar flex justify-between bg-violet-500 text-white items-center py-2 border'>
        <div className="logo mx-9">
            <span className='text-3xl font-bold'>uTasks</span>
        </div>
        <ul className='flex mx-9 items-center justify-center '> 
            <li className='w-[80px] cursor-pointer hover:font-bold transition-all duration-150'>Home</li>
            <li className='w-[80px] cursor-pointer hover:font-bold transition-all duration-150'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
