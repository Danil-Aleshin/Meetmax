import { deleteObject, ref } from "firebase/storage"
import { storage } from "../../firebaseConfig"
import { IFile } from "../types/data"

export const deleteImgRequest = (name:string,path:string,arrFiles:IFile[] = []) =>{
  deleteObject(ref(storage, `${path}/${name}`))
  const newArrFiles = arrFiles.filter(item => item.name !== name)

  return newArrFiles
}