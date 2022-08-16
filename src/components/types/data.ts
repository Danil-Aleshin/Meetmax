import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export type userID = string

export interface IUserData{
  followers:userID[],
  following:userID[],
  posts:IPost[],
  notification:any[],
  userInfo:IUserInfo,
  profile:IProfile,
  friends:userID[],
  chats:IChat[]
}
export interface IGlobalContentData{
  posts:IPost[]
}
export interface IChat{
  companionID:userID
  lastMessageTime:string,
  messages:IMessage[]
}
export interface IUserInfo{
  userID:userID,
  email:string,
  password:string,
  status:"online" | "offline"
}
export interface IProfile{
  tagName:string,
  firstName:string,
  lastName:string,
  location?:string,
  gender: string,
  dateOfBirthday?:string,
  profileImg:string,
  phoneNumber:number,
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

export interface authValue {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber:number,
  password:string,
}


