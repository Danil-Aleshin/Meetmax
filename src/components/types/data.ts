import { FieldValue, Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export type userID = string

export interface IUserData{
  allUsers:IUserInfo[],
}
export interface IUserInfo{
  userID:userID
  email:string,
  status:"online" | "offline",
  firstName:string,
  lastName:string,
  location?:string,
  gender: string,
  dateOfBirthday?:Timestamp,
  profileImg:IFile,
  phoneNumber:number,
}
export interface IChatData{
  favorite:false,
  companionID:userID
  messages:IMessage[]
}

export interface IChat{
  userInfo:IUserInfo,
  chat:IChatData
}

export interface IMessage{
  id:string,
  fromUserID:userID,
  date:Date,
  text:string,
  state:"read" | "unread",
  imgs:IFile[]
}

export interface IPost{
  userInfo?:IUserInfo
  id:string,
  authorID:userID,
  text:string,
  date:Date,
  imgs:IFile[],
  likes:userID[],
  comments:IComment[],
  // reports:[],
}

export interface IComment{
  date:Date,
  authorID:userID,
  text:string,
  imgs:IFile[]
}

export interface ICommunity{
  userID:userID,
}
export interface IProfile{
  userInfo:IUserInfo,
  userID:userID,
}
export interface authValue {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber:number,
  password:string,
  location?:string,
}
export interface IRoute{
  path: string,
  component: React.FC,
  auth: boolean,
}
export interface useInputReturn{
  value:string,
  onChange:(e:React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement>)=>void,
  setValue:React.Dispatch<React.SetStateAction<string>>
  onKeyDown?:React.KeyboardEventHandler<HTMLInputElement>,
}

export interface IFile{
  name:string,
  path:string,
  link:string,
}



