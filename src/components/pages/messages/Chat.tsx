import { InformationCircleIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/outline'
import  { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sendMessage } from '../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IChat, IMessage, IUserInfo, userID } from '../../types/data'
import AddMessageForm from '../../ui/AddMessageForm'
import ContentBlock from '../../ui/ContentBlock'
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
  const messageInput = useInput()

  const {allUsers,currentUser} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()


  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === fromUserID){
        setUserInfo(user)
      }
    })
  }, [allUsers,fromUserID])
  

  const sendMess = () =>{
    const message = messageInput.value
    const userID = currentUser.userID
    const companionID = fromUserID ? fromUserID : ""
    
    dispatch(sendMessage({companionID,message,userID}))
    messageInput.setValue("")
  }
  // console.log(messages)
  return (
    <ContentBlock className='w-full h-messageWindowHeight flex flex-col justify-between gap-10'>
      <>
      {fromUserID &&
        <>
        <div className="flex justify-between items-center">
          <Link to={"/" + userInfo.userID} className="flex gap-3 items-center">
            <img src={userInfo.profileImg} alt="" width={40} className="rounded-full" />
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
        <ul className='flex flex-col h-full justify-end overflow-auto gap-3'>
          {messages?.map(item=>
          <MessageCard
            key={item.date}
            date={item.date}
            message={item.message}
            userInfo={userInfo}
            fromUserID={item.fromUserID}
          />)}
        </ul>
        <AddMessageForm
          value={messageInput.value}
          onChange={messageInput.onChange}
          onClick={sendMess}
          className="border-t pt-5 border-t-superLightGray dark:border-t-inputBorderBlue"
          placeHolder='New message...'
        />
        </>
      }
      </>
    </ContentBlock>
  )
}

export default Chat