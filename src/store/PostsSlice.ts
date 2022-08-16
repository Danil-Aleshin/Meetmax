import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { IPost} from "../components/types/data";
import { db } from "../firebaseConfig";


interface CreatePostState{
  posts:IPost[],
  loading:boolean,
  status?:string,
  error:boolean,
}
interface propsFetchCreatePost{
  userID:string,
  text:string,
}
interface propsFetchRemovePost{
  userID:string,
  postID:string,
  posts:IPost[]
}
//state
const initialState:CreatePostState = {
  posts:[],
  loading:false,
  status:"",
  error:false
}

export const fetchCreatePost = createAsyncThunk<any,propsFetchCreatePost,{rejectValue:string}>(
  "posts/fetchCreatePost",
  async function({userID,text},{rejectWithValue}){
    const newPost:IPost = {
      id:Date.now().toString(),
      authorID:userID,
      comments:[],
      text:text,
      date:Date.now(),
      likes:[],
      share:0,
      imgs:[]
    }
    try {
      await updateDoc(doc(db,"users", userID,"posts","data"),{
        posts: arrayUnion(newPost)
      });
      await updateDoc(doc(db,"global","posts"),{
        posts: arrayUnion(newPost)
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding post")
    }
  }
)

export const fetchRemovePost = createAsyncThunk<any,propsFetchRemovePost,{rejectValue:string}>(
  "posts/fetchRemovePost",
  async function({userID,postID,posts},{rejectWithValue}){
    const newPostsList =  posts.filter(item=> item.id !== postID)
    try {
      await updateDoc(doc(db,"users", userID,"posts","data"),{
        posts: newPostsList
      });
      await updateDoc(doc(db,"global","posts"),{
        posts: newPostsList
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to delete post")
    }
  }
)

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts(state,action:PayloadAction<IPost[]>){
      state.posts = action.payload.reverse()
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchCreatePost.pending,(state)=>{
        state.loading = true
        state.status = "fetchCreatePost loading"
        state.error = false
      })
      .addCase(fetchCreatePost.fulfilled,(state)=>{
        state.loading = false
        state.status = "fetchCreatePost fulfilled"
      })
      .addCase(fetchCreatePost.rejected,(state,action)=>{
        state.error = true
        state.loading = false
        state.status = action.payload
      })
//removePost
      .addCase(fetchRemovePost.pending,(state)=>{
        state.loading = true
        state.status = "fetchRemovePost loading"
        state.error = false
      })
      .addCase(fetchRemovePost.fulfilled,(state)=>{
        state.loading = false
        state.status = "fetchRemovePost fulfilled"
      })
      .addCase(fetchRemovePost.rejected,(state,action)=>{
        state.error = true
        state.loading = false
        state.status = action.payload
      })
  }

})

export const {getPosts} = PostsSlice.actions

export default PostsSlice.reducer