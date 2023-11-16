import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    // takes movie id and update the triler to store
    const dispatch = useDispatch();
    const trailerVideo=useSelector(store=>store.movies.trailerVideo)
    const getMovieVideos = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US',
            API_OPTIONS)
        const json = await data.json()
        const filteredData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filteredData.length ? filteredData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer))
    }
    useEffect(() => {
       !trailerVideo && getMovieVideos()
    }, [])
}
export default useMovieTrailer;