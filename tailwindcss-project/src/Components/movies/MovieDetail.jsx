import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../Loader';
const MovieDetail=()=> {
  const {movieID}=useParams();
  const url=`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;
     const [movieDetail,setMovieDetail]=useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2U5YmZkMzlkODY5ZTg0MDc0ODhhNGI2ZWY3ZjRlMCIsIm5iZiI6MTc0NDI3MDQ0OC43Mjk5OTk4LCJzdWIiOiI2N2Y3NzQ3MDZjMzU4M2M5NzU5YTA3NjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ssv31mjq2LQgUbOtpZATbQhuGlTTQrgi2Gr0jIHAVAQ'
    }
  };
   useEffect(()=>{
          fetch(url,options).then(res=>res.json())
          .then(json=>
          {
            setMovieDetail(json)
          }
          )
   },[])
     const backgroundImageUrl=`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`
     const imageUrl=`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`;
   return(
    <>
    <div className="w-full">
        <div
          className="w-full  min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat relative text-1xl px-0 sm:px-10 py-0 sm:py-10 text-white md:text-2xl"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
    
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-start justify-center  p-4 sm:p-8 gap-4">
            <img
              src={imageUrl}
              alt=""
              className="w-[200px] h-auto sm:w-[300px] sm:h-[500px] rounded-3xl object-cover"
            />
            <div className='flex flex-col gap-4'>
            <div className='flex flex-row'>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-50">
              {movieDetail.original_title}
            </h1>
            <p className="text-amber-50 text-lg sm:text-3xl md:text-4xl ml-4">
              ({movieDetail.release_date&&movieDetail.release_date.split('-')[0]})</p>
            </div>
            <div className='flex flex-col sm:flex-row  gap-2'>
            <p >{movieDetail.release_date && movieDetail.release_date.split('-').reverse().join('/') } </p>
            <p >({movieDetail.origin_country})</p>
            <ul className='flex flex-row'>
              {movieDetail.genres && movieDetail.genres.map((genre) => (
                <li key={genre.id} className=' text-1xl ml-2'>{genre.name}</li>
              ))}
            </ul>
            <p>{  Math.floor(movieDetail.runtime/60)}h {movieDetail.runtime%60}m</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
<div className="relative ">
  {/* Full circle representing 100% */}
  <div className="size-25 radial-progress bg-primary text-primary-content border-primary border-4" 
       style={{ "--value": 100 }} 
       aria-valuenow={100} 
       role="progressbar">
  </div>
  
  {/* Circle representing the actual value */}
  <div className="size-25 radial-progress text-success-content border-primary border-4 absolute top-0 left-0  scale-x-[-1]"
       style={{ "--value": `${(movieDetail.vote_average / 10) * 100}` }}
       aria-valuenow={`${(movieDetail.vote_average / 10) * 100}`}
       role="progressbar">
    <p className='sm:text-lg font-bold scale-x-[-1]'>{((movieDetail.vote_average / 10) * 100).toFixed(2)}%</p>
  </div>
</div>
            <p className='text-1xl sm:text-2xl'>User Score</p>
            </div>
            <p>{movieDetail.tagline}</p>
            <h1 className='text-2xl sm:text-3xl font-bold'>Overview</h1>
            <p>{movieDetail.overview}</p>
            <h1 className='text-2xl sm:text-3xl font-bold'>Production Companies</h1>
            <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3'>
              {movieDetail.production_companies&&movieDetail.production_companies.map((company)=>
              <>
              <li key={company.id} className='text-lg'><strong>{company.name} </strong>{company.origin_country? <>({company.origin_country})</>:' '}</li>
              </>
              )}
            </ul>
            {
              (movieDetail.budget && movieDetail.revenue)?<div className='flex flex-col sm:flex-row md:gap-20 lg:gap-40'>
              <div>
              <h1 className='text-2xl sm:text-3xl font-bold'>Budget</h1>
              <p className='text-1xl sm:text-2xl'>{(movieDetail.budget)/1000000} millions</p>
              </div>
              <div>
              <h1 className='text-2xl sm:text-3xl font-bold'>Revenue</h1>
              <p className='text-1xl sm:text-2xl'>{(movieDetail.revenue)/1000000} million</p>
              </div>
            </div>:<></>
            }
            </div>
          </div>
        </div>
      </div>
    </>
   )
}
export default MovieDetail