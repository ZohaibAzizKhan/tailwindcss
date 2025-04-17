import { useContext, useEffect, useState } from "react";
import MovieCard from "@/components/movies/MovieCard";
import ContextAPI from "@/components/contextAPI/ContextAPI";
import ShowCard from "@/components/shows/ShowCard";
import Loader from "@/components/Loader";

const News = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const { fetchMovieData, movies, shows, fetchShowData } = useContext(ContextAPI);

  useEffect(() => {
    const urlMovie = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`;
    const urlShow = `https://api.themoviedb.org/3/trending/tv/${timeWindow}?language=en-US`;

    fetchMovieData(urlMovie);
    fetchShowData(urlShow);
    window.scrollTo(0, 0);
  }, [timeWindow]);

  return (
    <div className="w-full">
      <h1 className="text-5xl text-center pt-5 font-bold underline">News</h1>

      <div className="flex justify-center gap-4 py-8">
        {["day", "week"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeWindow(range)}
            className={`px-4 py-2 text-xl font-semibold rounded-full border 
              ${timeWindow === range ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}
            `}
          >
            {range === "day" ? "Today" : "This Week"}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
         <div className="flex flex-row text-4xl gap-3 font-extrabold text-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg> 
       <h1>Trendings</h1>
       </div>
      </div>
      <div className="flex flex-col pt-10">
        <h1 className="text-center text-4xl font-bold dark:bg-gray-800 dark:text-amber-50 py-6 my-6">
          Trending Movies By {timeWindow}
        </h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 mx-5 my-5 min-h-screen sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* Trending Shows */}
      <div className="flex flex-col pt-10">
        <h1 className="text-center text-4xl font-bold dark:bg-gray-800 dark:text-amber-50 py-6 my-6">
          Trending Shows By {timeWindow}
        </h1>
        {shows.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 mx-5 my-5 min-h-screen sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {shows.map((show) => (
              <ShowCard show={show} key={show.id} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default News;
