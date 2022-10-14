import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { IMessage, userID} from "../components/types/data";
import { db } from "../firebaseConfig";


interface messagesState{
  loading:boolean,
  status?:string,
  error:boolean
}

interface propsStartAChat{
  userID:userID,
  companionID:userID,
}

interface propsSendMessage extends propsStartAChat{
  newMessage:IMessage,
}

interface propsEditMessage extends propsStartAChat{
  id:string,
  newText:string,
}
interface propsDeleteMessage extends propsStartAChat{
  id:string,
}
interface propsFavoriteChat extends propsStartAChat{
  isFavorite:boolean,
}
//state
const initialState:messagesState = {
  loading:false,
  status:"",
  error:false
}

export const startAChat = createAsyncThunk<any,propsStartAChat,{rejectValue:string}>(
  "chats/startAChat",
  async function({companionID,userID},{rejectWithValue}){
    try {
      await setDoc(doc(db,"chats", userID, "companion",companionID),{
        companionID:companionID,
        favorite:false,
      });
      // await setDoc(doc(db,"chats", userID, "companion",companionID,"messages"));
      await setDoc(doc(db,"chats", companionID, "companion",userID),{
        companionID:userID,
        favorite:false,
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to start a chat")
    }
  }
)

export const sendMessage = createAsyncThunk<any,propsSendMessage,{rejectValue:string}>(
  "chats/sendMessage",
  async function({companionID,newMessage,userID},{rejectWithValue}){
    try {
      await setDoc(doc(db,"chats", userID, "companion",companionID,"messages",newMessage.id),newMessage)
      await setDoc(doc(db,"chats", companionID, "companion",userID,"messages",newMessage.id),newMessage)
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to send message")
    }
  }
)

export const deleteMessage = createAsyncThunk<any,propsDeleteMessage,{rejectValue:string}>(
  "chats/deleteMessage",
  async function({companionID,userID,id},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"chats", userID, "companion",companionID,"messages",id))
      await deleteDoc(doc(db,"chats", companionID, "companion",userID,"messages",id))
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed delete message")
    }
  }
)

export const editMessage = createAsyncThunk<any,propsEditMessage,{rejectValue:string}>(
  "chats/editMessage",
  async function({companionID,userID,id,newText},{rejectWithValue}){
    try {
      await updateDoc(doc(db,"chats", userID, "companion",companionID,"messages",id),{
        text:newText
      });
      await updateDoc(doc(db,"chats", companionID, "companion",userID,"messages",id),{
        text:newText
      });;
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed edit message")
    }
  }
)

export const deleteChat = createAsyncThunk<any,propsStartAChat,{rejectValue:string}>(
  "chats/deleteChat",
  async function({companionID,userID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"chats",userID,"companion",companionID))
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed delete a chat")
    }
  }
)
export const favoriteChat = createAsyncThunk<any,propsFavoriteChat,{rejectValue:string}>(
  "chats/favoriteChat",
  async function({companionID,userID,isFavorite},{rejectWithValue}){

    try {
      await updateDoc(doc(db,"chats", userID, "companion",companionID),{
        favorite:isFavorite
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed edit message")
    }
  }
)

const ChatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(sendMessage.pending,(state)=>{
        state.loading = true
        state.status = "sandMessage loading"
        state.error = false
      })
      .addCase(sendMessage.fulfilled,(state)=>{
        state.loading = false
        state.status = "sandMessage fulfilled"
      })
      .addCase(sendMessage.rejected,(state,action)=>{
        state.error = true
        state.loading = false
        state.status = action.payload
      })
  }

})

export const {} = ChatSlice.actions

export default ChatSlice.reducer