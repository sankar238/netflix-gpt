import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt",
    initialState : {
        showGptSearch : false,
        movieNames:null,
        movieResluts : null
    },
    reducers :{
        toggleGptSearchView : (state)=>{
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovieResult : (state,action)=>{
            const {movieNames,movieResluts}=action.payload
            state.movieNames=movieNames;
            state.movieResluts=movieResluts;
        }
    }
})

export const {toggleGptSearchView ,addGptMovieResult} = gptSlice.actions
export default gptSlice.reducer