import { useNavigate } from "react-router"

const MovieCard=({movie})=>{
    const navigate=useNavigate();
    const imageUrl=`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const handleMovieDetail=()=>{
       navigate(`/movies/${movie.id}`)
    }
  return(
<div className="max-w-1xl max-h-lg flex flex-col bg-white rounded-lg  dark:bg-gray-800 relative hover:scale-105 tranansform duration-300 hover:cursor-pointer" onClick={()=>handleMovieDetail()}>
        <img className="rounded-t-lg object-cover aspect-square" src={imageUrl} alt="" />
    <div className="flex flex-row justify-evenly items-baseline py-3">
        <div className="inline-flex flex-col ">
        <a>
            <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
        </a>
        <p className="dark:text-amber-50"><strong>Release Date:  </strong>{movie.release_date&&movie.release_date.split('-').reverse().join('-')}</p>
        </div>
        <div className="inline-flex items-center">
        <a className="dark:text-amber-50 hover:underline p-1 hover:bg-amber-900 hover:cursor-pointer rounded-sm">
            Read more
        </a>
        </div>
    </div>
</div>

  )
}
export default MovieCard;