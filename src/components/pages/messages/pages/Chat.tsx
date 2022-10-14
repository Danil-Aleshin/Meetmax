import { ChevronLeftIcon, InformationCircleIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'
import  { FC, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { editMessage, sendMessage } from '../../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/appRedux'
import useMessages from '../../../hooks/requestsHooks/useMessages'
import useProfile from '../../../hooks/requestsHooks/useProfile'
import useInput from '../../../hooks/useInput'
import {IChat, IChatOptions, IMessage, IUserInfo } from '../../../types/data'
import AddMessageForm from '../../../ui/AddMessageForm'
import ContentBlock from '../../../ui/ContentBlock'
import UserImg from '../../../ui/UserImg'
import AboutUserMenu from '../AboutUserMenu'
import MessageCard from '../MessageCard'


interface propsChat {
  chatsOptions:IChatOptions[]
}

const Chat:FC<propsChat> = ({
  chatsOptions
}) => {
  const [aboutUserMenu, setAboutUserMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [messageEditing, setMessageEditing] = useState<IMessage>()
  const [filesAttachment, setFilesAttachment] = useState<any[]>([])
  const [chatOptions, setChatOptions] = useState<IChatOptions>()

  const {companionID = ""} = useParams()

  const {userID} = useAppSelector(state => state.auth)


  const dispatch = useAppDispatch()

  const {messages} = useMessages(companionID)
  const {userInfo} = useProfile(companionID)

  const messListRef = useRef<HTMLUListElement>(null)
  
  useEffect(() => {
    if (messListRef.current) {
      messListRef.current.scrollBy({
        behavior:"smooth",
        top:messListRef.current.scrollHeight
      })
    }
  },[messages])

  useEffect(() => {
    setChatOptions(undefined)
    chatsOptions.map(chat => chat.companionID === companionID && setChatOptions(chat))
  }, [companionID,chatsOptions])
  
  const sendMess = () =>{

    const newMessage:IMessage = {
      id:Date.now().toString(),
      fromUserID:userID,
      text:messageInput.value.trim(),
      date:Timestamp.fromDate(new Date),
      state:"unread",
      imgs:filesAttachment
    }
    if (newMessage.text.length !== 0 || newMessage.imgs.length !== 0) {
        dispatch(sendMessage({companionID,newMessage,userID}))
        messageInput.setValue("")
        setFilesAttachment([])
    }
  }
  
  const editMessageFunc = () =>{
      const newText = messageInput.value.trim()
      const id = messageEditing?.id ? messageEditing?.id : ""

      if (newText.length > 0) {
        dispatch(editMessage({companionID,id,userID,newText}))
      }

    messageInput.setValue("")
    setIsEditing(false)
    setMessageEditing(undefined)
  }
  
  const closeEditing = () =>{
    setIsEditing(false)
    setMessageEditing(undefined)
    messageInput.setValue("")
  }


 
  const messageInput = useInput("",sendMess)

  return (
    <ContentBlock className='w-full h-full flex flex-col justify-between gap-10 '>
      <>
        <div className="flex justify-between items-center">
          <Link to={"/messages"} className="flex transition-transform items-center gap-1 hover:-translate-x-1">
            <ChevronLeftIcon className='icon w-5.5'/>
            <p>Back</p>
          </Link>
          {userInfo && 
            <Link to={`/${userInfo?.userID}`} className="flex gap-3 items-center">
              { window.screen.width > 400 && 
                <UserImg
                  width="40"
                  className='h-10'
                  src={userInfo?.profileImg.link}
                />
              }
              <div className="flex flex-col gap-1">
                <h2>{`${userInfo?.firstName} ${userInfo?.lastName}`}</h2>
              </div>
            </Link>
          }
          <div className="flex gap-3.5 items-center">
            <InformationCircleIcon
              onClick={()=>setAboutUserMenu(true)}
              className='icon w-5.5 cursor-pointer'
            />
          </div>
        </div>
        <ul className='messages__list' ref={messListRef}>
          {messages?.map(message=>
          <MessageCard
            companionID={companionID}
            key={message.id}
            message={message}
            setValue={messageInput.setValue}
            setIsEditing={setIsEditing}
            setMessageEditing={setMessageEditing}
          />)}
        </ul>
        <div className="relative">
          {
            isEditing &&
            <div className="flex gap-4 pb-2 items-center">
              <div className="flex items-center gap-1">
                <PencilIcon className='w-4 text-blue dark:text-superLightGray'/>
                <p>Editing: {messageEditing?.text}</p>
              </div>
              <XMarkIcon 
                onClick={()=>closeEditing()}
                className='w-4 text-blue dark:text-superLightGray cursor-pointer'
              />
            </div>
          }
          <AddMessageForm
            value={messageInput.value}
            onChange={messageInput.onChange}
            onKeyDown={messageInput.onKeyDown}
            onClick={isEditing ? editMessageFunc : sendMess}
            className="border-t pt-5 border-t-superLightGray dark:border-t-inputBorderBlue"
            placeHolder='New message...'
            setValue={messageInput.setValue}
            filesAttachment={filesAttachment}
            setFilesAttachment={setFilesAttachment}
          />
        </div>
        <AboutUserMenu
          chatCompanionID={companionID}
          favorite={chatOptions?.favorite}
          userInfo={userInfo}
          state={aboutUserMenu}
          setState={setAboutUserMenu}
        />
      </>
    </ContentBlock>
  )
}

export default Chat