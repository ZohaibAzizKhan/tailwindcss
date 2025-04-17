import { useContext, useEffect, useState } from 'react';
import Logo from '@/assets/images/Logo.png';
import {Link, NavLink, useNavigate } from 'react-router-dom';
import ContextAPI from '@/components/contextAPI/ContextAPI';

const Header = () => {
  const navigation=useNavigate();
  const {setPage}=useContext(ContextAPI);
const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => { 
  setIsOpen(!isOpen);
  setPage(1);
 }
  return (
    <nav className={`flex flex-row z-10 w-full p-4 dark:bg-black/90 text-white sm:justify-around justify-between fixed top-0 left-0 right-0`}>
      <button className='border border-amber-50 rounded-b-sm sm:hidden cursor-pointer' onClick={()=>toggleMenu()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"  >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
</button>
        <div className='flex flex-row items-center gap-1 hover:cursor-pointer' onClick={()=>navigation('/')}>
          <img src={Logo} className="h-8 me-3" alt="FlowBite Logo" />
          <div className='font-2xl font-bold'>Movies</div>
        </div>
        <div className='hidden sm:flex flex-row items-center gap-3'>
         <NavLink to="/" className='hover:underline hover:decoration-amber-400 p-3'>Home</NavLink>
          {/* <NavLink to="/explore" className='hover:underline hover:decoration-amber-400 p-3'>Explore</NavLink> */}
          <NavLink to="/news" className='hover:underline hover:decoration-amber-400 p-3'>News</NavLink>
          <NavLink to='/movies' className='hover:underline hover:decoration-amber-400 p-3' onClick={()=>setPage(1)}>Movies</NavLink>
          <NavLink to="/shows" className='hover:underline hover:decoration-amber-400 p-3' onClick={()=>setPage(1)}>TV Shows</NavLink>
          
        </div>
        {isOpen && (
          <div className='absolute top-16 left-0 right-0 bg-black text-white  flex flex-col p-3 sm:hidden'>
            <Link to='/' className='block p-3 w-full hover:bg-blue-500 hover:rounded-sm' onClick={()=>toggleMenu()}>Home</Link>
            <Link to="/news" className='block p-3 w-full hover:bg-blue-500 hover:rounded-sm' onClick={()=>toggleMenu()}>News</Link>
            <Link to='/movies' className='block p-3 w-full hover:bg-blue-500 hover:rounded-sm' onClick={()=>toggleMenu()}>Movies</Link>
            <Link to="/shows" className='block p-3 w-full hover:bg-blue-500 hover:rounded-sm' onClick={()=>toggleMenu()}>TV Shows</Link>
          </div>
        )}
    </nav>
  );
};

export default Header;