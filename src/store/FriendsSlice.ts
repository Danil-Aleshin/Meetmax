import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ICommunity, IProfile, userID } from "../components/types/data"
import { db } from "../firebaseConfig";


interface friendsState{
  loading:boolean,
  error:boolean,
  status?:string,
}
interface propsAddToFriends{
  userID:userID,
  networkUserID:userID,
}

const initialState:friendsState = {
  loading:false,
  error:false,
  status:"",
}
export const friendRequest = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/friendRequest",
  async function({userID,networkUserID},{rejectWithValue}){
    try {
      await setDoc(doc(db,"friendRequests", networkUserID,"data",userID),{userID});
      await setDoc(doc(db,"myFriendRequests", userID,"data",networkUserID),{userID:networkUserID});
    } catch (error) {
      console.log(error)
      return rejectWithValue("error send friend requests")
    }
  }
)

export const addToFriends = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/addToFriends",
  async function({userID,networkUserID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"myFriendRequests", networkUserID,"data",userID));
      await deleteDoc(doc(db,"friendRequests", userID,"data",networkUserID));
      await setDoc(doc(db,"friends", userID,"data",networkUserID),{
        userID:networkUserID
      });
      await setDoc(doc(db,"friends", networkUserID,"data",userID),{
        userID
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding to friends")
    }
  }
)

export const removeFriendRequest = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/removeFriendRequest",
  async function({userID,networkUserID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"friendRequests", networkUserID,"data",userID));
      await deleteDoc(doc(db,"myFriendRequests", userID,"data",networkUserID));
    } catch (error) {
      console.log(error)
      return rejectWithValue("error remove friend requests")
    }
  }
)

export const removeFromFriends = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/removeFromFriends",
  async function({userID,networkUserID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"friends", networkUserID,"data",userID));
      await deleteDoc(doc(db,"friends", userID,"data",networkUserID));
    } catch (error) {
      console.log(error)
      return rejectWithValue("error remove from friends")
    }
  }
)

const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
    builder
      .addCase(addToFriends.pending,(state)=>{
        state.loading = true
        state.status = "addToFriends loading"
        state.error = false
      })
      .addCase(addToFriends.fulfilled,(state)=>{
        state.loading = false
        state.status = "addToFriends fulfilled"
        state.error = false
      })
      .addCase(addToFriends.rejected,(state,action)=>{
        state.loading = true
        state.status = action.payload
        state.error = true
      })
  },

})

export const {} = FriendsSlice.actions

export default FriendsSlice.reducer