import { useContext, useEffect, useRef, useState } from "react";
import ContextAPI from "@/contextAPI/ContextAPI";
import { useNavigate } from "react-router";
import Loader from "@/components/layout/Loader";

const Home = () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  const { fetchMovieData, movies } = useContext(ContextAPI);
  const navigation=useNavigate();
  const indexRef = useRef(0);
  const [render, setRender] = useState(0); // trigger only 1 render after initial fetch
   //useEffect is used to fetch movies data at initial rendering
  useEffect(() => {
    if (movies.length === 0) {
      fetchMovieData(url);
    } else {
      setRender((r) => r + 1); 
    }
  }, [movies]);
  const slides = movies.slice(0, 10).map((movie) => ({
    image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    title: movie.title,
    subtitle: movie.overview,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % slides.length;

      // manually force a class-based background/image update using a fake render
      setRender((r) => r + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[indexRef.current] || {};
  const handleNavigation=()=>{
    navigation('/news')
  }

  return (
     <>
     {
      // of the current title data is available then show movie component otherwise show loader untile title for currentSlide object is not available
      currentSlide.title?(<div className="w-full min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-pulse duration-500 ease-in"
          style={{ backgroundImage: `url(${currentSlide.image})`,backgroundSize:'cover' }}
        >
          <div className="absolute inset-0 bg-black/60" /></div>
        <div className="w-full min-h-screen justify-center items-center flex flex-col lg:flex-row gap-20 p-4 ">
        
        <div className="relative flex flex-col text-white">
    <h1 className="text-xl sm:text-3xl md:text-6xl font-bold overflow-hidden whitespace-nowrap animate-[typing_4s_steps(30)_forwards] w-fit">
      FIND MOVIES,
    </h1>
    <h1 className="text-xl sm:text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 overflow-hidden whitespace-nowrap animate-[typing_4s_steps(30)_4s_forwards] w-fit">
      TV shows and more
    </h1>
    <div className="w-full pl-10 pr-10">
    <button type="button" className="flex justify-center items-center dark:bg-gray-400/30 w-full text-2xl rounded-2xl mt-7 py-1 hover:dark:bg-gray-500 hover:text-white hover:font-bold hover:cursor-pointer"
    onClick={()=>handleNavigation()}
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
  </svg>
  WATCH NEWS</button>
    </div>
  </div>
  
  <div className="relative max-w-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-600/30 dark:border-gray-700 bg-white text-white">
      <a href="#">
          <img className="rounded-t-lg aspect-9/10" src={currentSlide.image} alt="" />
      </a>
      <div className="p-5">
          <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{currentSlide.title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-white">{currentSlide.subtitle}</p>
          </div>
    </div>
        </div>
      </div>):<Loader/>
     }
     </>
  );
};

export default Home;
