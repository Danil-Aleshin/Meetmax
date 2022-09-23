import { ChevronLeftIcon, InformationCircleIcon, PencilIcon, PhoneIcon, VideoCameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import  { FC, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { editMessage, sendMessage } from '../../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/appRedux'
import useDate from '../../../hooks/useDate'
import useInput from '../../../hooks/useInput'
import { IChat, IChatData, IFile, IMessage, IUserInfo, TypeSetState, userID } from '../../../types/data'
import AddMessageForm from '../../../ui/AddMessageForm'
import ContentBlock from '../../../ui/ContentBlock'
import ModalWindow from '../../../ui/modalWindow/ModalWindow'
import UserImg from '../../../ui/UserImg'
import AboutUserMenu from '../AboutUserMenu'
import MessageCard from '../MessageCard'


interface propsChat {

}

const Chat:FC<propsChat> = ({

}) => {
  const [aboutUserMenu, setAboutUserMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [messageEditing, setMessageEditing] = useState<IMessage>()
  const [chat, setChat] = useState<IChatData>()
  const [userInfo, setUserInfo] = useState<IUserInfo>()
  const [filesAttachment, setFilesAttachment] = useState<any[]>([])
  const {companionID = ""} = useParams()


  const {allUsers,currentUser:{userID}} = useAppSelector(state => state.users)
  const {status,chats} = useAppSelector(state => state.chats)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // messListRef.current.scrollTop = 999999
    allUsers.map(user => {
      if(user.userID === companionID){
        
        setUserInfo(user)
      }
    })
    
  }, [allUsers,companionID])

  const messListRef = useRef<any>(null)

  useEffect(() => {
    chats.map(chat=>{
      chat.chat.companionID === companionID && setChat(chat.chat)
    })
    
  }, [chats])
  
  useEffect(() => {
    messListRef.current.scrollTop = messListRef.current.scrollHeight
  },[chat])
  

  const sendMess = () =>{

    const newMessage:IMessage = {
      id:Date.now().toString(),
      fromUserID:userID,
      text:messageInput.value.trim(),
      date:new Date,
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
      const messagesList = chat?.messages ? chat.messages : []
  
      if (newText.length > 0 && companionID) {
        dispatch(editMessage({companionID,id,messagesList,userID,newText}))
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
          <Link to={`/${userInfo?.userID}`} className="flex gap-3 items-center">
            <UserImg
              width="40"
              className='h-10'
              src={userInfo?.profileImg.link}
            />
            <div className="flex flex-col gap-1">
              <h2>{`${userInfo?.firstName} ${userInfo?.lastName}`}</h2>
            </div>
          </Link>
          <div className="flex gap-3.5 items-center">
            <InformationCircleIcon
              onClick={()=>setAboutUserMenu(true)}
              className='icon w-5.5 cursor-pointer'
            />
          </div>
        </div>
        <ul className='messages__list' ref={messListRef}>
          {chat?.messages.map(message=>
          <MessageCard
            key={message.id}
            message={message}
            userInfo={userInfo}
            messages={chat?.messages}
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
          chatCompanionID={chat?.companionID}
          favorite={chat?.favorite}
          userInfo={userInfo}
          state={aboutUserMenu}
          setState={setAboutUserMenu}
        />
      </>
    </ContentBlock>
  )
}

export default Chat