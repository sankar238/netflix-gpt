import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const SecondaryContainer = () => {
    const movies=useSelector((store)=>store.movies);
  return (
    <div className='bg-black '>
      <div className="-mt-40 pl-10 relative z-20 ">
        <MovieList title={"Now Palying "} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Popular"} movies={movies?.popularMovies}/>
        <MovieList title={"TopRated Movies"} movies={movies?.topRatedMovies}/>
        <MovieList title={"Other"} movies={movies?.nowPlayingMovies}/>
        </div> 
    </div>
  )
}

export default SecondaryContainer