import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import Loader from '@/components/layout/Loader';

export default function ShowDetail() {
  const {showID}=useParams();
  const [showDetail,setShowDetail]=useState([]);
  const url=`https://api.themoviedb.org/3/tv/${showID}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2U5YmZkMzlkODY5ZTg0MDc0ODhhNGI2ZWY3ZjRlMCIsIm5iZiI6MTc0NDI3MDQ0OC43Mjk5OTk4LCJzdWIiOiI2N2Y3NzQ3MDZjMzU4M2M5NzU5YTA3NjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ssv31mjq2LQgUbOtpZATbQhuGlTTQrgi2Gr0jIHAVAQ'
    }
  };
   useEffect(()=>{
    fetch(url, options)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    setShowDetail(json)
  })
  .catch(err => console.error(err));
   },[]);

   const backgroundImageUrl=`https://image.tmdb.org/t/p/original${showDetail.backdrop_path}`
     const imageUrl=`https://image.tmdb.org/t/p/w500${showDetail.poster_path}`;
  return (
    <>
    {
      showDetail.original_name?(
        <div className="w-full ">
        <div
          className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat relative text-1xl py-0  px-0 sm:py-10 sm:px-10 text-white md:text-2xl"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
    
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-start justify-center  p-4 sm:p-8 gap-4">
            <img
              src={imageUrl}
              alt=""
              className="w-[250px] h-auto sm:w-[300px] sm:h-[500px] rounded-3xl object-cover"
            />
            <div className='flex flex-col gap-4'>
            <div className='flex flex-row'>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-50">
            {showDetail.original_name}
            </h1>
            </div>
            <div className='flex flex-col sm:flex-row  gap-2'>
            <ul className='flex flex-row'>
              {showDetail.genres && showDetail.genres.map((genre) => (
                <li key={genre.id} className=' text-1xl ml-2'>{genre.name}</li>
              ))}
            </ul>
            </div>
            <div className='flex flex-row gap-3 items-center'>
            <div className="relative">

  <div className="size-25 radial-progress bg-primary text-primary-content border-primary border-4" 
       style={{ "--value": 100 }} 
       aria-valuenow={100} 
       role="progressbar">
  </div>
  
  {/* Circle representing the actual value */}
  <div className="size-25 radial-progress text-success-content border-primary border-4 absolute top-0 left-0 scale-x-[-1]"
       style={{ "--value": `${(showDetail.vote_average / 10) * 100}` }}
       aria-valuenow={`${(showDetail.vote_average / 10) * 100}`}
       role="progressbar">
    <p className='sm:text-lg font-bold  scale-x-[-1]'>{((showDetail.vote_average / 10) * 100).toFixed(2)}%</p>
  </div>
</div>

            <p className='text-1xl sm:text-2xl'>User Score</p>
            </div>
            <p>{showDetail.tagline}</p>
            <h1 className='text-2xl sm:text-3xl font-bold'>Overview</h1>
            <p>{showDetail.overview}</p>
            {
              showDetail.production_companies&&showDetail.production_companies.length!=0&&<>
              <h1 className='text-2xl sm:text-3xl font-bold'>Production Companies</h1>
            <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3'>
              {showDetail.production_companies&&showDetail.production_companies.map((company)=>
              <>
              <li key={company.id} className='text-lg'><i>{company.name} </i>{company.origin_country? <strong>({company.origin_country})</strong>:' '}</li>
              </>
              )}
            </ul>
              </>
            }
            <div className='flex flex-col sm:flex-row md:gap-20 lg:gap-40'>

              {
                showDetail.created_by&&(showDetail.created_by.length!=0&&showDetail.created_by.map(
                  (creator)=>(
                  <div key={creator.id} className='text-lg flex flex-col'>
                    <strong>{creator.name}</strong>
                    <i>Creator</i>
                    </div>
                  )
                ))
              }
            </div>
            </div>
          </div>
        </div>
      </div>
      ):<Loader/>
    }
    </>
  )
}
