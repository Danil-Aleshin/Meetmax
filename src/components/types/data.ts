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
export interface IChat{
  companionID:userID
  messages:IMessage[]
}
export interface IMessage{
  fromUserID:userID,
  date:string,
  message:string,
}

export interface IPost{
  id:string,
  authorID:userID,
  text:string,
  date:number,
  imgs?:userID[],
  likes:userID[],
  comments:IComment[],
  share:number,
}

export interface IComment{
  date:string,
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


