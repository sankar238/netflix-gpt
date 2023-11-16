import { useEffect } from "react"
import { API_OPTIONS, TOP_RATED_MOVIES_API } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addTopRatedMovies } from "../utils/moviesSlice"

const useTopRatedMovies = () => {
    // fetch the data from TMDB api and update the store
    const dispatch = useDispatch();
    const topRatedMovies=useSelector(store=>store.movies.topRatedMovies)
    const getTopRatedMovies = async () => {
        const data = await fetch(TOP_RATED_MOVIES_API, API_OPTIONS)
        const json = await data.json()
        dispatch(addTopRatedMovies(json.results))
    }
    useEffect(() => {
        !topRatedMovies && getTopRatedMovies()
    }, [])
 
}
export default useTopRatedMovies;