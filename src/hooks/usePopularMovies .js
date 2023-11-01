import { useEffect } from "react"
import { API_OPTIONS, POPULAR_MOVIES_API } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addPopularMovies } from "../utils/moviesSlice"

const usePopularMovies = () => {
    // fetch the data from TMDB api and update the store
    const dispatch = useDispatch()
    useEffect(() => {
        getPopularMovies()
    }, [])
    const getPopularMovies = async () => {
        const data = await fetch(POPULAR_MOVIES_API, API_OPTIONS)
        const json = await data.json()
        dispatch(addPopularMovies(json.results))
    }
}
export default usePopularMovies;