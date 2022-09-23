import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, deleteDoc, doc, FieldValue, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { IComment, ICommunity, IPost, userID} from "../components/types/data";
import { db } from "../firebaseConfig";


interface CreatePostState{
  loading:boolean,
  status?:string,
  error:boolean,
}
interface propsFetchCreatePost{
  newPost:IPost,
  userID:userID
}
interface propsFetchRemovePost{
  userID:string,
  postID:string,

}
interface propsComment{
  newComment:IComment,
  postAuthorID:userID,
  postID:string
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
  loading:false,
  status:"",
  error:false
}

export const fetchCreatePost = createAsyncThunk<any,propsFetchCreatePost,{rejectValue:string}>(
  "posts/fetchCreatePost",
  async function({userID,newPost},{rejectWithValue}){
    
    try {
      await setDoc(doc(db,"posts", userID,"data",newPost.id),newPost);
      await setDoc(doc(db,"global","posts","data",newPost.id),newPost);

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
  async function({newComment,postAuthorID,postID},{rejectWithValue}){

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
  reducers: {},
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

export const {} = PostsSlice.actions

export default PostsSlice.reducer