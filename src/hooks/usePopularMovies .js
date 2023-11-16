import { useEffect } from "react"
import { API_OPTIONS, POPULAR_MOVIES_API } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addPopularMovies } from "../utils/moviesSlice"

const usePopularMovies = () => {
    // fetch the data from TMDB api and update the store
    const dispatch = useDispatch()
    const popularMovies = useSelector(store=> store.movies.popularMovies)
    const getPopularMovies = async () => {
        const data = await fetch(POPULAR_MOVIES_API, API_OPTIONS)
        const json = await data.json()
        dispatch(addPopularMovies(json.results))
    }
    useEffect(() => {
      !popularMovies &&  getPopularMovies()
    }, [])
  
}
export default usePopularMovies;