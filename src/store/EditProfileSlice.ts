import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateEmail, updateProfile } from "firebase/auth";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { IFile, userID } from "../components/types/data";
import { auth, db, storage } from "../firebaseConfig";

interface propsChangeProfileImg{
  userID:userID,
  newImg:File,
  currentImg:IFile,
}
interface propsEditProfile{
  newFirstName?:string,
  newLastName?:string,
  newPhoneNumber?:number,
  userID:userID,
  newDateOfBirthday?:Date | null,
  newEmail?:string,
  newLocation?:string,
}


const initialState = {

}

export const changeProfileImg = createAsyncThunk<any,propsChangeProfileImg,{rejectValue:string}>(
  "users/changeProfileImg",
  async function({userID,newImg,currentImg},{rejectWithValue}){

    try {
      const name = new Date().getTime().toString() + newImg?.name
      const storageRef = ref(storage,`profileImages/${userID}/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, newImg);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
        default:
          break;
      }
    }, (error) => {
      console.log(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateDoc(doc(db,"users", userID),{
          profileImg:{
            link:downloadURL,
            path:`profileImg/${userID}/${name}`,
            name:name
          }
        });
        if (auth.currentUser) {
          updateProfile(auth.currentUser,{
            photoURL:downloadURL
          })
        }
        if (currentImg.name !== "noProfileImg.png") {
          deleteObject(ref(storage, `${currentImg.path}/${currentImg.name}`))
        }
      });
    })
      
    } catch (error) {
      console.log(error)
      return rejectWithValue("error adding to friends")
    }
  }
)

export const editProfile = createAsyncThunk<any,propsEditProfile,{rejectValue:string}>(
  "users/editProfile",
  async function({
    newFirstName,
    newLastName,
    newPhoneNumber,
    newDateOfBirthday,
    userID,
    newEmail,
    newLocation,
  },{rejectWithValue}){
    try {
      if (newLocation) {
        await updateDoc(doc(db,"users",userID),{
          location:newLocation
        })
      }else if (newFirstName) {
        await updateDoc(doc(db,"users",userID),{
          firstName:newFirstName
        })
      }else if(newLastName){
        await updateDoc(doc(db,"users",userID),{
          lastName:newLastName
        })
      }
      else if(newPhoneNumber){
        await updateDoc(doc(db,"users",userID),{
          phoneNumber:newPhoneNumber
        })
      }else if(newDateOfBirthday){
        await updateDoc(doc(db,"users",userID),{
          dateOfBirthday:newDateOfBirthday
        })
      }
      else if(newDateOfBirthday === null){
        await updateDoc(doc(db,"users",userID),{
          dateOfBirthday:deleteField()
        })
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue("error")
    }
  }
)


const EditProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {}
})

export const {} = EditProfileSlice.actions

export default EditProfileSlice.reducer