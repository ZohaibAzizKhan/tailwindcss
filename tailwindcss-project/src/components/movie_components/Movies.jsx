import { useContext, useEffect, useState } from "react";
import MovieCard from "@/components/movie_components/MovieCard";
import Pagination from "@/components/layout/Pagination";
import Loader from "@/components/layout/Loader";
import ContextAPI from "@/contextAPI/ContextAPI";
const Movies=()=>{
  const {fetchMovieData,movies,totalPages,page}=useContext(ContextAPI);
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  
useEffect(()=>{
  fetchMovieData(url);
  window.scrollTo(0,0)
},[page])

  return(
     <>
     {
      movies.length > 0  ? (
        <>
        <div className="text-3xl font-bold w-full text-center py-5">Page {page}</div>
          <div className="grid grid-cols-1 gap-8 mx-5 my-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            {movies.map((movie) => (<MovieCard movie={movie} key={movie.id}></MovieCard>))}
            <div className="w-full col-start-1 col-end-2 sm:col-end-3 md:col-end-4 lg:col-end-5 flex justify-center pb-4">
            <Pagination/>
          </div>
          </div>
        </>
      ) : (
        <Loader></Loader>
      )
     }
      </>
  )
 }
 export default Movies; 