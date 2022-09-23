import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { IFile } from "../components/types/data";
import { storage } from "../firebaseConfig";

interface UploadFile{
  fileLink?:string
  error:boolean
  loading:boolean,
  status?:string,
}

interface propsDeleteFile{
  name:string,
  path:string,
}

interface propsUploadFile{
  file:IFile
}

const initialState:UploadFile = {
  fileLink: "",
  error:false,
  loading:false,
  status:""
}

export const deleteFile = createAsyncThunk<any,propsDeleteFile,{rejectValue:string}>(
  "uploadFile/deleteFile",
  async function({name,path},{rejectWithValue}) {
    try {
      await deleteObject(ref(storage, `${path}/${name}`))
    } catch (error) {
      console.log(error)
      return rejectWithValue("failed delete file")
    }
  }
)

const UploadFileSlice = createSlice({
  name: "uloadFile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    
  },

})

export const {} = UploadFileSlice.actions

export default UploadFileSlice.reducer