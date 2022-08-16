import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { IChat, IMessage} from "../components/types/data";
import { db } from "../firebaseConfig";


interface messagesState{
  chats:IChat[],
  loading:boolean,
  status?:string,
  error:boolean
}

interface propsSendMessage{
  forUserID:string,
  messageObj:IMessage,
}

//state
const initialState:messagesState = {
  chats:[],
  loading:false,
  status:"",
  error:false
}

export const sendMessage = createAsyncThunk<any,propsSendMessage,{rejectValue:string,state:{chats: IChat[]}}>(
  "chats/sendMessage",
  async function({forUserID,messageObj},{rejectWithValue,getState}){
    const newChats = getState().chats.map(item=>{
      if (item.companionID === forUserID ) {
        item.messages.push(messageObj)
      }
    })
    try {
      await updateDoc(doc(db,"users", forUserID),{
        message: newChats
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to send message")
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