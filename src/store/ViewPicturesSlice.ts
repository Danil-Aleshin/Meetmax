import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFile } from "../components/types/data"

interface stateTheme{
  pictures:IFile[],
  isActive:boolean
}

const initialState:stateTheme = {
  pictures:[],
  isActive:false
}

const ViewPicturesSlice = createSlice({
  name: "viewPictures",
  initialState,
  reducers: {
    setActive(state,action:PayloadAction<IFile[]>){
      state.pictures = action.payload
      state.isActive = true
    },
    setDeactive(state){
      state.pictures = []
      state.isActive = false
    }
  },


})

export const {setActive,setDeactive} = ViewPicturesSlice.actions

export default ViewPicturesSlice.reducer