import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface statePreloader{
  preloaderShowing:boolean
}

const initialState:statePreloader = {
  preloaderShowing:true
}

const PreloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    showPreloader(state){
      state.preloaderShowing = true
    },
    hidePreloader(state){
      state.preloaderShowing = false
    },
  },


})

export const {showPreloader,hidePreloader} = PreloaderSlice.actions

export default PreloaderSlice.reducer