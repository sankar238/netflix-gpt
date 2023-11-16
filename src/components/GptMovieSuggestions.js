import { useSelector } from "react-redux"
import MovieList from "./MovieList"
const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt)
  const { movieNames, movieResluts } = gpt;
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      {movieNames.map((movieName, index) => (
        <MovieList key={movieName} title={movieName} movies={movieResluts[index]} />))}

    </div>
  )
}

export default GptMovieSuggestions