import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface statePreloader{
  isLoading:boolean
}

const initialState:statePreloader = {
  isLoading:false
}

const PreloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setIsLoading(state,action:PayloadAction<boolean>){
      state.isLoading = action.payload
    },
  },


})

export const {setIsLoading} = PreloaderSlice.actions

export default PreloaderSlice.reducer