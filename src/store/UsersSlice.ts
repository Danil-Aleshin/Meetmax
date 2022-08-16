import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPost, IProfile } from "../components/types/data"


interface usersState{
  currentUser:IProfile,
  allUsers:IProfile[],
  userPosts:IPost[],
}
const initialState:usersState = {
  currentUser:{} as IProfile,
  userPosts:[],
  allUsers:[],
}

const UsersSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    getCurrentUser(state,action:PayloadAction<IProfile>){
      state.currentUser = action.payload
    },
    getAllUsers(state,action:PayloadAction<IProfile[]>){
      state.allUsers = action.payload
    },
    getUserPosts(state,action:PayloadAction<IPost[]>){
      state.userPosts = action.payload
    },
  },


})

export const {getAllUsers,getCurrentUser,getUserPosts} = UsersSlice.actions

export default UsersSlice.reducer