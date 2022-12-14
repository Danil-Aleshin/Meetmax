import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { arrayUnion, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ICommunity, IProfile, userID } from "../components/types/data"
import { db } from "../firebaseConfig";


interface followersState{
  loading:boolean,
  error:boolean,
  status?:string,
}
interface propsFollow{
  userID:userID,
  networkUserID:userID,
}
interface propsUnFollow{
  userID:userID,
  networkUserID:userID,
}
const initialState:followersState = {
  loading:false,
  error:false,
  status:"",
}

export const follow = createAsyncThunk<any,propsFollow,{rejectValue:string}>(
  "followers/follow",
  async function({userID,networkUserID},{rejectWithValue}){

    try {
      await setDoc(doc(db,"following", userID,"data",networkUserID),{
        userID:networkUserID,
      });
      await setDoc(doc(db,"followers",networkUserID,"data",userID),{
        userID:userID,
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error follow")
    }
  }
)

export const unfollow = createAsyncThunk<any,propsUnFollow,{rejectValue:string}>(
  "followers/unfollow",
  async function({userID,networkUserID},{rejectWithValue}){
    const id = Date.now().toString()
    try {
      await deleteDoc(doc(db,"following", userID,"data",networkUserID))
      await deleteDoc(doc(db,"followers",networkUserID,"data",userID))

    } catch (error) {
      console.log(error)
      return rejectWithValue("error unfollow")
    }
  }
)

const FollowersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
    builder
      .addCase(follow.pending,(state)=>{
        state.loading = true
        state.status = "follow loading"
        state.error = false
      })
      .addCase(follow.fulfilled,(state)=>{
        state.loading = false
        state.status = "follow fulfilled"
        state.error = false
      })
      .addCase(follow.rejected,(state,action)=>{
        state.loading = true
        state.status = action.payload
        state.error = true
      })
      //unfollow
      .addCase(unfollow.pending,(state)=>{
        state.loading = true
        state.status = "unfollow loading"
        state.error = false
      })
      .addCase(unfollow.fulfilled,(state)=>{
        state.loading = false
        state.status = "unfollow fulfilled"
        state.error = false
      })
      .addCase(unfollow.rejected,(state,action)=>{
        state.loading = true
        state.status = action.payload
        state.error = true
      })
  },

})

export const {} = FollowersSlice.actions

export default FollowersSlice.reducer