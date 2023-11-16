import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const GptSearchBar = () => {
  const dispatch= useDispatch();
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
      movie
      + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    return json.results;
  }
  const handleGptSearchClick = async () => {

    const gptQuery =
      "Act as movie recommendation system and suggest some movies for the query " +
      searchText.current.value
      + "only give me names of 5 movies,comma separated like the exmple result given ahead. example result : don,luci,stranger things,jawan,game of thrones"
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    if (!gptResults.choices) {
      console.log("error from the gpt search api")
    }

    // "don , jawan, koi mil gaya, game of thrones,stranger things"
    const gptMovies = gptResults?.choices[0]?.message?.content?.split(",");
    // ["don","jawan","koi mil gaya","game of thrones","stranger things"]
    // for each movie , search TMDB api
    const promiseArray =  gptMovies.map(movie=>searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray)
    dispatch(addGptMovieResult({movieNames :gptMovies,movieResults:tmdbResults}));

  }
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}>
        <input
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchBarPlaceholder}
          ref={searchText}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar