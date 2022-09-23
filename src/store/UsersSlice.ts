import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserInfo, userID } from "../components/types/data"

interface usersState{
  currentUser:IUserInfo,
  currentUserFriends:userID[],
  allUsers:IUserInfo[],
}

const initialState:usersState = {
  currentUser:{} as IUserInfo,
  currentUserFriends:[],
  allUsers:[],
}

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getCurrentUser(state,action:PayloadAction<IUserInfo>){
      state.currentUser = action.payload
    },
    getAllUsers(state,action:PayloadAction<IUserInfo[]>){
      state.allUsers = action.payload
    },
  },


})

export const {getAllUsers,getCurrentUser} = UsersSlice.actions

export default UsersSlice.reducer