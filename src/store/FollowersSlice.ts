import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { arrayUnion, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ICommunity, userID } from "../components/types/data"
import { db } from "../firebaseConfig";


interface followersState{
  currentUserFollowers:ICommunity[],
  currentUserFollowing:ICommunity[],
  loading:boolean,
  error:boolean,
  status?:string,
}
interface propsFollow{
  userID:userID,
  followerID:userID,
}
interface propsUnFollow{
  userID:userID,
  followerID:userID,
  docID:string,
}
const initialState:followersState = {
  currentUserFollowers:[],
  currentUserFollowing:[],
  loading:false,
  error:false,
  status:"",
}

export const follow = createAsyncThunk<any,propsFollow,{rejectValue:string}>(
  "followers/follow",
  async function({userID,followerID},{rejectWithValue}){
    const id = Date.now().toString()
    try {
      await setDoc(doc(db,"following", userID,"data",id),{
        userID:followerID,
        docID:id
      });
      await setDoc(doc(db,"followers",followerID,"data",id),{
        userID:userID,
        docID:id
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error follow")
    }
  }
)

export const unfollow = createAsyncThunk<any,propsUnFollow,{rejectValue:string}>(
  "followers/unfollow",
  async function({userID,followerID,docID},{rejectWithValue}){
    const id = Date.now().toString()
    try {
      await deleteDoc(doc(db,"following", userID,"data",docID))
      await deleteDoc(doc(db,"followers",followerID,"data",docID))

    } catch (error) {
      console.log(error)
      return rejectWithValue("error unfollow")
    }
  }
)

const FollowersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    getFollowers(state,action:PayloadAction<ICommunity[]>){
      state.currentUserFollowers = action.payload
    },
    getFollowing(state,action:PayloadAction<ICommunity[]>){
      state.currentUserFollowing = action.payload
    }
  },
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
  },

})

export const {getFollowers,getFollowing} = FollowersSlice.actions

export default FollowersSlice.reducer