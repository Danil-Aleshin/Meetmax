import { FieldValue } from "firebase/firestore";
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
  dateOfBirthday?:string,
  profileImg:string,
  phoneNumber:number,
}
export interface IChatData{
  companionID:userID
  messages:IMessage[]
}
export interface IChat{
  user:IUserInfo,
  chat:IChatData
}

export interface IMessage{
  id:string,
  fromUserID:userID,
  date:Date,
  message:string,
  state:"read" | "unread"
}

export interface IPost{
  id:string,
  authorID:userID,
  text:string,
  date:Date,
  imgs?:userID[],
  likes:userID[],
  comments:IComment[],
  share:number,
}

export interface IComment{
  date:Date,
  authorID:userID,
  text:string,
}

export interface ICommunity{
  userID:userID,
  docID:string,
}

export interface authValue {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber:number,
  password:string,
}


