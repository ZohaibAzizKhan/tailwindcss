import { Link } from 'react-router-dom';
import logo from '@/assets/images/Logo.png';
const Footer=()=>{
    //footer section 
  return(
<footer className="dark:bg-black/90 w-full">
    <div className="mx-auto w-full  py-6 lg:py-8">
        <div className="md:flex px-5 sm:justify-around">
          <div className="mb-6 md:mb-0">
              <div href="#" className="flex items-center">
                  <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movies</span>
              </div>
          </div>
          <div className="grid grid-cols-2 justify-between items-baseline-last gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"></h2>
                  <ul className="text-gray-500 grid grid-cols-1 sm:grid-cols-2 dark:text-gray-400 font-medium">
                      <li className='mb-3'>
                          <Link to='/' className='hover:underline'>Home</Link>
                      </li>
                      <li className='mb-3'>
                          <Link to='/news' className='hover:underline'>News</Link>
                      </li >
                      <li className='mb-3'>
                          <Link to='/movies' className='hover:underline'>Movies</Link>
                      </li>
                      <li>
                          <Link to='/shows' className='hover:underline'>Shows</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-gray-500 grid grid-cols-1 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 w-full sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center justify-center text-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
      </div>
    </div>
</footer>

  )
}
export default Footer;