import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface stateTheme{
  theme:"light" | "dark",
}

const initialState:stateTheme = {
  theme:"light",
}

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state,action:PayloadAction<"dark" | "light">){
      state.theme = action.payload
    },
  },


})

export const {switchTheme} = ThemeSlice.actions

export default ThemeSlice.reducer