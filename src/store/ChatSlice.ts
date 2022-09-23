import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { IChat, IChatData, IMessage, userID} from "../components/types/data";
import { db } from "../firebaseConfig";


interface messagesState{
  chats:IChat[],
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
  messagesList:IMessage[],
  newText:string,
}
interface propsDeleteMessage extends propsStartAChat{
  id:string,
  messagesList:IMessage[],
}
interface propsFavoriteChat extends propsStartAChat{
  isFavorite:boolean,
}
//state
const initialState:messagesState = {
  chats:[],
  loading:false,
  status:"",
  error:false
}

export const sendMessage = createAsyncThunk<any,propsSendMessage,{rejectValue:string}>(
  "chats/sendMessage",
  async function({companionID,newMessage,userID},{rejectWithValue}){    
    try {
      await setDoc(doc(db,"chats", userID, "companion",companionID),{
        companionID:companionID,
        messages:arrayUnion(newMessage)
      },{merge:true});
      await setDoc(doc(db,"chats", companionID, "companion",userID),{
        companionID:userID,
        messages:arrayUnion(newMessage)
      },{merge:true});
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to send message")
    }
  }
)

export const deleteMessage = createAsyncThunk<any,propsDeleteMessage,{rejectValue:string}>(
  "chats/deleteMessage",
  async function({companionID,userID,id,messagesList},{rejectWithValue}){
    try {
      await updateDoc(doc(db,"chats", userID, "companion",companionID),{
        messages:messagesList.filter(item => item.id !== id)
      });
      await updateDoc(doc(db,"chats", companionID, "companion",userID),{
        messages:messagesList.filter(item => item.id !== id)
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed delete message")
    }
  }
)

export const editMessage = createAsyncThunk<any,propsEditMessage,{rejectValue:string}>(
  "chats/editMessage",
  async function({companionID,userID,id,messagesList,newText},{rejectWithValue}){

    const newMessList:IMessage[] = messagesList.map(item =>
      item.id === id 
      ? { ...item, text: newText } 
      : item
    )

    try {
      await updateDoc(doc(db,"chats", userID, "companion",companionID),{
        messages:newMessList
      });
      await updateDoc(doc(db,"chats", companionID, "companion",userID),{
        messages:newMessList
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed edit message")
    }
  }
)

export const startAChat = createAsyncThunk<any,propsStartAChat,{rejectValue:string}>(
  "chats/startAChat",
  async function({companionID,userID},{rejectWithValue}){
    try {
      await setDoc(doc(db,"chats", userID, "companion",companionID),{
        companionID:companionID,
        messages:[],
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to start a chat")
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
  reducers: {
    getChats(state,action:PayloadAction<IChat[]>){
      state.chats = action.payload
    }
  },
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

export const {getChats} = ChatSlice.actions

export default ChatSlice.reducer