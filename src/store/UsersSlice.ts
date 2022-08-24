import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { doc, updateDoc } from "firebase/firestore";
import { IUserInfo, userID } from "../components/types/data"
import { db } from "../firebaseConfig";


interface usersState{
  currentUser:IUserInfo,
  currentUserFriends:userID[],
  allUsers:IUserInfo[],
}
interface propsUploadImg{
  userID:userID,
  downloadURL:string,
}
const initialState:usersState = {
  currentUser:{} as IUserInfo,
  currentUserFriends:[],
  allUsers:[],
}

export const uploadImg = createAsyncThunk<any,propsUploadImg,{rejectValue:string}>(
  "users/uploadImg",
  async function({userID,downloadURL},{rejectWithValue}){
  
    try {
      await updateDoc(doc(db,"users", userID),{
        profileImg:downloadURL
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding to friends")
    }
  }
)

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