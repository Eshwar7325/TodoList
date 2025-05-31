import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-700 text-white py-2'>
        <div className="logo flex justify-center">
            <img className='w-7 h-7' src="/itask.svg" alt="itask" />
            <span className='font-bold text-xl mx-4'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
