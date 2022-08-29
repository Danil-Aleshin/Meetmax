import { InformationCircleIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/outline'
import  { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { sendMessage } from '../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import useInput from '../../hooks/useInput'
import { IChatData, IMessage, IUserInfo, userID } from '../../types/data'
import AddMessageForm from '../../ui/AddMessageForm'
import ContentBlock from '../../ui/ContentBlock'
import UserImg from '../../ui/UserImg'
import MessageCard from './MessageCard'


interface propsChat {
  fromUserID?:userID,
  messages?:IMessage[]
}

const Chat:FC<propsChat> = ({
  fromUserID,
  messages
}) => {

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userID:"",
    email:"",
    firstName:"",
    gender:"",
    lastName:"",
    phoneNumber:0,
    profileImg:"",
    status:'offline',
  })

  // const date = useDate(new Date)


  const {allUsers,currentUser} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === fromUserID){
        setUserInfo(user)
      }
    })
    
  }, [allUsers,fromUserID])
  
  const messListRef =useRef<any>(null)

  const sendMess = () =>{
    const message = messageInput.value
    const userID = currentUser.userID
    const companionID = fromUserID ? fromUserID : ""
    
    dispatch(sendMessage({companionID,message,userID}))
    messageInput.setValue("")

  }

  const messageInput = useInput(sendMess,"")
  
  return (
    <ContentBlock className='w-full h-messageWindowHeight flex flex-col justify-between gap-10'>
      <>
      {fromUserID &&
        <>
        <div className="flex justify-between items-center">
          <Link to={"/" + userInfo.userID} className="flex gap-3 items-center">
            <UserImg
              width="40"
              className='h-10'
              src={userInfo.profileImg}
            />
            <div className="flex flex-col gap-1">
              <h2>{userInfo.firstName + " " + userInfo.lastName}</h2>
            </div>
          </Link>
          <div className="flex gap-3.5 items-center">
            <PhoneIcon className='w-5.5 shrink-0'/>
            <VideoCameraIcon className='w-5.5 shrink-0'/>
            <InformationCircleIcon className='w-5.5 shrink-0'/>
          </div>
        </div>
        <ul className='messages__list'ref={messListRef}>
          {messages?.map(item=>
          <MessageCard
            key={item.id}
            date={item.date}
            message={item.message}
            userInfo={userInfo}
            id={item.id}
            fromUserID={item.fromUserID}
            state={item.state}
            
          />)}
        </ul>
        <AddMessageForm
          value={messageInput.value}
          onChange={messageInput.onChange}
          onKeyDown={messageInput.onKeyDown}
          onClick={sendMess}
          className="border-t pt-5 border-t-superLightGray dark:border-t-inputBorderBlue"
          placeHolder='New message...'
          setValue={messageInput.setValue}
        />
        </>
      }
      </>
    </ContentBlock>
  )
}

export default Chat