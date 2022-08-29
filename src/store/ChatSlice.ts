import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { IChatData, IMessage, userID} from "../components/types/data";
import { db } from "../firebaseConfig";


interface messagesState{
  chats:IChatData[],
  loading:boolean,
  status?:string,
  error:boolean
}

interface propsSendMessage{
  userID:userID,
  companionID:userID,
  message:string,
}
interface propsStartAChat{
  userID:userID,
  companionID:userID,
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
  async function({companionID,message,userID},{rejectWithValue}){
    const newMessage:IMessage = {
      id:Date.now().toString(),
      fromUserID:userID,
      message,
      date:new Date,
      state:"unread",
    }
    
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


const ChatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    getChats(state,action:PayloadAction<IChatData[]>){
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