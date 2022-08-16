import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authValue, IProfile, IUserData, IUserInfo, userID } from "../components/types/data";
import { auth, db } from "../firebaseConfig";

interface stateAuthentication{
  user:IUserData,
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
  user:{} as IUserData,
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

      // const newUser:IUserData ={
      //   userInfo:{
      //     userID:userID,
      //     email:email,
      //     password:password,
      //     status:"offline",
      //   },
      //   profile:{
      //     firstName:firstName,
      //     lastName:lastName,
      //     gender:gender,
      //     profileImg:"/img/noProfileImg.png",
      //     dateOfBirthday:dateOfBirthday,
      //     location:"",
      //     phoneNumber:phoneNumber,
      //   },
      //   chats:[],
      //   followers:[],
      //   following:[],
      //   friends:[],
      //   notification:[],
      //   posts:[],
      // } 


      // setDoc(doc(db, 'users', userID), {
      //   userInfo: newUser.userInfo,
      //   profile:newUser.profile,
      //   chats:newUser.chats,
      //   followers:newUser.followers,
      //   following:newUser.following,
      //   friends:newUser.friends,
      //   notification:newUser.notification,
      //   posts:newUser.posts,
      // }, { merge: true })

      setDoc(doc(db, 'users', userID,"userInfo","data"),{
        userID:userID,
        email:email,
        password:password,
        status:"offline",
      })
      setDoc(doc(db, 'users', userID,"profile","data"),{
        tagName:"",
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        profileImg:"/img/noProfileImg.png",
        dateOfBirthday:dateOfBirthday,
        location:"",
        phoneNumber:phoneNumber,
      })
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
  reducers: {
    getUserInfo(state,action:PayloadAction<IUserInfo>){
      state.user.userInfo = action.payload
    },
    getProfile(state,action:PayloadAction<IProfile>){
      state.user.profile = action.payload
    }
  },
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
        state.user = {} as IUserData
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
export const {getUserInfo,getProfile} = AuthenticationSlice.actions

export default AuthenticationSlice.reducer