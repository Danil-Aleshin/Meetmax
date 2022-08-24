import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { doc, updateDoc } from "firebase/firestore";
import { ICommunity, userID } from "../components/types/data"
import { db } from "../firebaseConfig";


interface friendsState{
  currentUserFriends:ICommunity[],
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
  loading:false,
  error:false,
  status:"",
}

export const addToFriends = createAsyncThunk<any,propsAddToFriends,{rejectValue:string}>(
  "friends/addToFriends",
  async function({userID,newFriendID},{rejectWithValue}){
    const id = Date.now().toString()

    try {
      await updateDoc(doc(db,"friends", userID,"data",id),{
        userID: newFriendID,
        docID:id
      });
      await updateDoc(doc(db,"friends",newFriendID,"data",id),{
        userID: userID,
        docID:id,
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding to friends")
    }
  }
)

const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    getFriends(state,action:PayloadAction<ICommunity[]>){
      state.currentUserFriends = action.payload
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

export const {getFriends} = FriendsSlice.actions

export default FriendsSlice.reducer