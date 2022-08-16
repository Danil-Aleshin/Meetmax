import { InformationCircleIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/outline'
import  { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sendMessage } from '../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IMessage } from '../../types/data'
import AddMessageForm from '../../ui/AddMessageForm'
import ContentBlock from '../../ui/ContentBlock'
import MessageCard from './MessageCard'


interface propsChat{
  companionID?:string,
  firstNameAnotherUser?:string,
  lastNameAnotherUser?:string,
  lastMessageTime?:string,
  messages?:IMessage[],
  profileImg?:string,
  status?:"offline" | "online",
}

const Chat:FC<propsChat> = ({
  companionID,
  firstNameAnotherUser,
  lastMessageTime,
  lastNameAnotherUser,
  messages,
  profileImg,
  status,
}) => {

  const message = useInput()

  const {chats} = useAppSelector(state => state.chats)
  const {userInfo:{userID},profile:{firstName,lastName}} = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()


  const sendMess = () =>{
    const messageObj:IMessage = {
      date:Date().toString(),
      message:message.value,
      fromUserID:userID,
    }
    const forUserID = ""
    // dispatch(sendMessage({forUserID,messageObj}))
    message.setValue("")
  }


  return (
    <ContentBlock className='w-full h-messageWindowHeight flex flex-col justify-between gap-10'>
      <>
      {companionID &&
        <>
        <div className="flex justify-between items-center">
          <Link to={"/"} className="flex gap-3 items-center">
            <img src={profileImg} alt="" width={40} className="rounded-full" />
            <div className="flex flex-col gap-1">
              <h2>{firstNameAnotherUser + " " + lastNameAnotherUser}</h2>
            </div>
          </Link>
          <div className="flex gap-3.5 items-center">
            <PhoneIcon className='w-5.5 shrink-0'/>
            <VideoCameraIcon className='w-5.5 shrink-0'/>
            <InformationCircleIcon className='w-5.5 shrink-0'/>
          </div>
        </div>
        <ul className='flex flex-col h-full justify-end overflow-auto gap-8'>
          {messages?.map(item=>
          <MessageCard
            key={item.date}
            date={item.date}
            fromUserID={item.fromUserID}
            message={item.message}
          />)}
        </ul>
        <AddMessageForm
          value={message.value}
          onChange={message.onChange}
          onClick={sendMess}
          className="border-t pt-5 border-t-inputBorderBlue"
          placeHolder='New message...'
        />
        </>
      }
      </>
    </ContentBlock>
  )
}

export default Chat