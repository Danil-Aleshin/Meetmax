import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { authValue, IUserData, IUserInfo, userID } from "../components/types/data";
import { auth, db } from "../firebaseConfig";

interface stateAuthentication{
  isAuth:boolean,
  loading:boolean,
  error:boolean,
  status?:string,
  userID:userID,
}

interface propsFetchAuthentication{
  email:string,
  password:string,
}

interface propsFetchRegistration extends authValue{
  gender:string,
  dateOfBirthday?:string,
}

//state
const initialState:stateAuthentication = {
  isAuth: false,
  loading:false,
  error:false,
  status:"",
  userID:""
}

//authentication
export const fetchAuthentication = createAsyncThunk<
userID,
propsFetchAuthentication,
{rejectValue:string}>(
  "authentication/fetchAuthentication",
  async function({email,password},{rejectWithValue}) {

    try {
      const userCredential:UserCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      return user.uid
    } catch (error:any) {
      console.log(error.message)
      console.log(error.code)
      return rejectWithValue(error.code)
    }

  }
)

//registration
export const fetchRegistration = createAsyncThunk<any,propsFetchRegistration,{rejectValue:string}>(
  "authentication/fetchRegistration",
  async function({
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    gender,
    dateOfBirthday
  },{rejectWithValue}) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userID = user.uid

      setDoc(doc(db, 'users', userID),{
        userID:userID,
        email:email,
        status:"offline",
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        profileImg:"https://firebasestorage.googleapis.com/v0/b/meetmax-ada29.appspot.com/o/noProfileImg.png?alt=media&token=bf855d42-e711-4d1b-8c9e-cf0d9325bd0c",
        dateOfBirthday:dateOfBirthday,
        location:"",
        phoneNumber:phoneNumber,
      })
      setDoc(doc(db,'chats',userID,"data"),{})
      setDoc(doc(db,'followers',userID,"data"),{})
      setDoc(doc(db,'following',userID,"data"),{})
      setDoc(doc(db,'friends',userID,"data"),{})
      setDoc(doc(db,'notification',userID,"data"),{})
      setDoc(doc(db,'followers',userID,"data"),{})
      setDoc(doc(db,'posts',userID,"data"),{})
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      return rejectWithValue("Не удалось зарегестрироваться :(")
    });
  }
)

//signOut
export const fetchSignOut = createAsyncThunk<any,undefined,{rejectValue:string}>(
  "authentication/fetchSignOut",
  async function(_,{rejectWithValue}){
    try {
      await signOut(auth)
    } catch (error) {
      return rejectWithValue("Ошибка соединения с сервером :(")
    }
  }
)

const AuthenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    //auth
      .addCase(fetchAuthentication.pending,(state)=>{
        state.loading = true
        state.status = "fetchAuthentication loading"
        state.error = false
        state.isAuth = false
      })
      .addCase(fetchAuthentication.fulfilled,(state,action:PayloadAction<string>)=>{
        state.userID = action.payload
        state.isAuth = true
        state.loading = false
        state.status = "fetchAuthentication fulfield"

      })
      .addCase(fetchAuthentication.rejected,(state,action)=>{
        state.error = true
        state.loading = false
        state.isAuth = false
        state.status = action.payload
      })
    //signOut
      .addCase(fetchSignOut.pending,(state)=>{
        state.loading = true
        state.status = "fetchSignOut loading"
        state.error = false
      })
      .addCase(fetchSignOut.fulfilled,(state)=>{
        state.userID = ""
        state.isAuth = false
        state.loading = false
        state.status = "signOut fulfilled"
      })
      .addCase(fetchSignOut.rejected,(state,action)=>{
        state.error = true
        state.loading = false
        state.status = action.payload
      })
  }

})
export const {} = AuthenticationSlice.actions

export default AuthenticationSlice.reducer