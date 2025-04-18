import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import ContextAPI from '@/components/contextAPI/ContextAPI';
import Container from '@/components/layout/Container';
import Home from '@/components/layout/Home'
import News from '@/components/layout/News'
import Movies from '@/components/movie_components/Movies'
import Shows from '@/components/tv_show_components/Shows'
import MovieDetail from '@/components/movie_components/MovieDetail'
import ShowDetail from '@/components/tv_show_components/ShowDetail';
function App() {
      const [movies, setMovies] = useState([]);//state used to keep track of movies data
      const [totalPages,setTotalPages] = useState();//to keep track of total pages
      const [page, setPage] = useState(1);//state to keep track of page
      const [shows, setShows] = useState([]);//state to keep track of shows data 
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2U5YmZkMzlkODY5ZTg0MDc0ODhhNGI2ZWY3ZjRlMCIsIm5iZiI6MTc0NDI3MDQ0OC43Mjk5OTk4LCJzdWIiOiI2N2Y3NzQ3MDZjMzU4M2M5NzU5YTA3NjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ssv31mjq2LQgUbOtpZATbQhuGlTTQrgi2Gr0jIHAVAQ'
        }
      };
      //this funtion is used to fetch movies data and is used by child components to fetch show data according to their needs and it accept a url
      const fetchMovieData=(url)=>{
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
     setTotalPages(500)
      if(page>=1&& page<=json.total_pages)
    setMovies(json.results);
        })
        .catch(err => console.error(err));
      }
      //this funtion is used to fetch tv shows data and is used by child components to fetch show data according to their needs and it accept a url
      const fetchShowData=(url)=>{
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
     setTotalPages(500)
      if(page>=1&& page<=json.total_pages)
    setShows(json.results);
        })
        .catch(err => console.error(err));
      }
     //this function handle next page jump if page is greater than equal to 1 and page is less than equal to total pages (which is 500 in this case) then set the state of page to (page+1)
      const handleNextPage=()=>{
          if(page>=1 && page<=totalPages){
          setPage(page+1);
          }
        }
      //this function handle previous page jump 
        const handlePreviousPage=()=>{
          if(page>=2){
            setPage(page-1)
          }
        }
  return (
    //contextapi provider
    <>
     <ContextAPI.Provider value={{
      fetchMovieData,
      movies,
      handleNextPage,
      handlePreviousPage,
      totalPages,
      page,
      shows,
      fetchShowData,
      setPage
     }}>
      {/* routers */}
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Container/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/news' element={<News/>}></Route>
      <Route path='/movies' element={<Movies/>}></Route>
      <Route path='/shows' element={<Shows/>}></Route>
      <Route path='/movies/:movieID' element={<MovieDetail/>}/>
      <Route path='/shows/:showID' element={<ShowDetail/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
     </ContextAPI.Provider>
    </>
  )
}

export default App