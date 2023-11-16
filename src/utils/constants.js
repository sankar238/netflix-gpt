export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
export const USER_AVATAR =
  "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png"
export const BG_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+process.env.REACT_APP_TMDB_KEY
  }
};
export const NOW_PLAYING_MOVIES_API =
  'https://api.themoviedb.org/3/movie/now_playing?page=1'
export const POPULAR_MOVIES_API =
  'https://api.themoviedb.org/3/movie/popular?page=1'
export const TOP_RATED_MOVIES_API =
  'https://api.themoviedb.org/3/movie/top_rated?page=1'
export const IMG_CDN_URL =
  "https://image.tmdb.org/t/p/w500"

export const SUPPORTED_LANGUAGES = [
      { identifier: "en", name: "English" },
      { identifier: "hindi", name: "Hindi" },
      { identifier: "spanish", name: "Spanish" }];
      
// export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
export const OPENAI_KEY = "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"