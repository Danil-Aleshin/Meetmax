import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { IComment, IPost, userID} from "../components/types/data";
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
  
}
interface propsComment{
  postID:string,
  postAuthorID:userID,
  commentAuthorID:userID,
  commentText:string,
  commentDate:string,
}
interface propsSendLike{
  postID:string,
  userID:userID,
  postAuthorID:userID,
}
interface propsRemoveLike{
  postID:string,
  userID:userID,
  postAuthorID:userID,
  likes:userID[],
}

interface propsRemoveComment{
  postAuthorID:userID,
  commentAuthorID:userID,
  postID:string,
  comments:IComment[],
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
    const postID = Date.now().toString()
    try {
      await setDoc(doc(db,"posts", userID,"data",postID),{
        id:postID,
        authorID:userID,
        comments:[],
        text:text,
        date:Date.now(),
        likes:[],
        share:0,
        imgs:[]
      });
      await setDoc(doc(db,"global","posts","data",postID),{
        id:postID,
        authorID:userID,
        comments:[],
        text:text,
        date:Date.now(),
        likes:[],
        share:0,
        imgs:[]
      });
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding post")
    }
  }
)

export const fetchRemovePost = createAsyncThunk<any,propsFetchRemovePost,{rejectValue:string}>(
  "posts/fetchRemovePost",
  async function({userID,postID},{rejectWithValue}){
    try {
      await deleteDoc(doc(db,"posts", userID,"data",postID))
      await deleteDoc(doc(db,"global","posts","data",postID))
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed to delete post")
    }
  }
)

export const writeAComment = createAsyncThunk<any,propsComment,{rejectValue:string}>(
  "posts/writeAComment",
  async function({postAuthorID,commentAuthorID,commentDate,commentText,postID},{rejectWithValue}){

    const newComment:IComment = {
      authorID:commentAuthorID,
      date:commentDate,
      text:commentText,
    }

    try {
      await updateDoc(doc(db,"posts", postAuthorID,"data",postID),{
        comments:arrayUnion(newComment)
      })
      await updateDoc(doc(db,"global","posts","data",postID),{
        comments:arrayUnion(newComment)
      })
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding comment")
    }
  }
)

export const removeComment = createAsyncThunk<any,propsRemoveComment,{rejectValue:string}>(
  "posts/removeComment",
  async function({postAuthorID,commentAuthorID,postID,comments},{rejectWithValue}){

    try {
      await updateDoc(doc(db,"posts", postAuthorID,"data",postID),{
        comments:comments.filter(comment => comment.authorID !== commentAuthorID)
      })
      await updateDoc(doc(db,"global","posts","data",postID),{
        comments:comments.filter(comment => comment.authorID !== commentAuthorID)
      })
    } catch (error) {
      console.log(error)
      return rejectWithValue("error remove comment")
    }
  }
)

export const sendLike = createAsyncThunk<any,propsSendLike,{rejectValue:string}>(
  "posts/sendLike",
  async function({postID,userID,postAuthorID},{rejectWithValue}){

    try {
      await updateDoc(doc(db,"posts", postAuthorID,"data",postID),{
        likes:arrayUnion(userID)
      })
      await updateDoc(doc(db,"global","posts","data",postID),{
        likes:arrayUnion(userID)
      })
    } catch (error) {
      console.log(error)
      return rejectWithValue("error send like")
    }
  }
)

export const removeLike = createAsyncThunk<any,propsRemoveLike,{rejectValue:string}>(
  "posts/removeLike",
  async function({postID,userID,postAuthorID,likes},{rejectWithValue}){

    try {
      await updateDoc(doc(db,"posts", postAuthorID,"data",postID),{
        likes:likes.filter(like => like !== userID)
      })
      await updateDoc(doc(db,"global","posts","data",postID),{
        likes:likes.filter(like => like !== userID)
      })
    } catch (error) {
      console.log(error)
      return rejectWithValue("error remove like")
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