import { useEffect } from "react"
import { API_OPTIONS, NOW_PLAYING_MOVIES_API } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addNowPlayingMovies } from "../utils/moviesSlice"

const useNowPlayingMovies = () => {
    // fetch the data from TMDB api and update the store
    const dispatch = useDispatch()
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)
    const getNowPlayingMovies = async () => {
        const data = await fetch(NOW_PLAYING_MOVIES_API, API_OPTIONS)
        const json = await data.json()
        dispatch(addNowPlayingMovies(json.results))
    }
    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies()
    }, [])
}
export default useNowPlayingMovies;