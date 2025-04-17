import { useNavigate } from "react-router";

const ShowCard=({show})=>{
    const navigate=useNavigate();
    const imageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
    const handleShowDetail=()=>{
       navigate(`/shows/${show.id}`)
    }
  return(
<div className="max-w-1xl max-h-lg flex flex-col bg-white rounded-lg shadow-sm  dark:bg-gray-800 relative hover:scale-105 transition-transform duration-300 hover:cursor-pointer" onClick={()=>handleShowDetail()}>
        <img className="rounded-t-lg object-cover aspect-square" src={imageUrl} alt="" />
    <div className=" flex flex-row justify-evenly items-baseline-last py-3">
        <div className="inline-flex flex-col">
        <a>
            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{show.name}</h5>
        </a>
        <p className="dark:text-amber-50"><strong>First Air Date: </strong>{show.first_air_date&&show.first_air_date.split('-').reverse().join('-')}</p>
        </div>
        <div className="inline-flex items-center">
        <a className="dark:text-amber-50 hover:underline hover:cursor-pointer hover:bg-gray-400 hover:text-black p-1 rounded-sm">
            Read more
        </a>
        </div>
    </div>
</div>

  )
}
export default ShowCard;