import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ICommunity, IProfile, userID } from "../components/types/data"
import { db } from "../firebaseConfig";


interface friendsState{
  currentUserFriends:IProfile[],
  currentUserFriendRequests:IProfile[],
  myFriendRequests:IProfile[],
  loading:boolean,
  error:boolean,
  status?:string,
}
interface propsAddToFriends{
  userID:userID,
  newFriendID:userID,
}

const initialState:friendsState = {
  currentUserFriends:[],
  currentUserFriendRequests:[],
  myFriendRequests:[],
  loading:false,
  error:false,
  status:"",
}
export const friendRequest = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/friendRequest",
  async function({userID,newFriendID},{rejectWithValue}){
    try {
      console.log(newFriendID,userID)
      await setDoc(doc(db,"friends", newFriendID,"friendRequests",userID),{userID});
      await setDoc(doc(db,"friends", userID,"myFriendRequests",newFriendID),{userID:newFriendID});
    } catch (error) {
      console.log(error)
      return rejectWithValue("error send friend requests")
    }
  }
)

export const addToFriends = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/addToFriends",
  async function({userID,newFriendID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"friends", newFriendID,"myFriendRequests",userID));
      await deleteDoc(doc(db,"friends", userID,"friendRequests",newFriendID));

      await setDoc(doc(db,"friends", userID,"data",newFriendID),{
        userID:newFriendID
      });
      await setDoc(doc(db,"friends", newFriendID,"data",userID),{
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
  async function({userID,newFriendID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"friends", newFriendID,"friendRequests",userID));
      await deleteDoc(doc(db,"friends", userID,"myFriendRequests",newFriendID));
    } catch (error) {
      console.log(error)
      return rejectWithValue("error remove friend requests")
    }
  }
)

export const removeFromFriends = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/removeFromFriends",
  async function({userID,newFriendID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"friends", newFriendID,"data",userID));
      await deleteDoc(doc(db,"friends", userID,"data",newFriendID));
    } catch (error) {
      console.log(error)
      return rejectWithValue("error remove from friends")
    }
  }
)

const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends(state,action:PayloadAction<IProfile[]>){
      state.currentUserFriends = action.payload
    },
    getFriendRequests(state,action:PayloadAction<IProfile[]>){
      state.currentUserFriendRequests = action.payload
    },
    getMyFriendRequests(state,action:PayloadAction<IProfile[]>){
      state.myFriendRequests = action.payload
    },
  },
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

export const {getFriends,getFriendRequests,getMyFriendRequests} = FriendsSlice.actions

export default FriendsSlice.reducer