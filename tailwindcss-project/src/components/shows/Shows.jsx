import { useContext, useEffect, useState } from "react";
import Pagination from '@/components/Pagination'
import ShowCard from "@/components/shows/ShowCard";
import Loader from "@/components/Loader";
import ContextAPI from "@/components/contextAPI/ContextAPI";

const Shows=()=>{
  const {fetchShowData,shows,page}
  =useContext(ContextAPI);
  const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
   useEffect(()=>{
    fetchShowData(url);
    window.scrollTo(0,0)
   }
   ,[page])
  return(
    <>{
      shows.length>0?
      (
      <>
      <div className="text-3xl font-bold w-full text-center py-5">Page {page}</div>
      <div className="grid grid-cols-1 gap-8 mx-5 my-5  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shows.map((show) => (<ShowCard show={show} key={show.id}></ShowCard>))}
      </div>
      <div className="w-full flex justify-center pb-4">
          <Pagination/>
        </div>
        </>
        ):
        (
          <Loader></Loader>
        )
    }
    </>
     )
 }
 export default Shows; 