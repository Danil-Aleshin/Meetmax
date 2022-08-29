import { serverTimestamp } from 'firebase/firestore'
import { FC, memo, useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import { IMessage, TypeSetState, userID } from '../../types/data'
import AuthorImg from '../../ui/UserImg'

interface propsMessagePreviewCard{
  companionID:userID,
  messages:IMessage[],
  setShowChatID:TypeSetState<string>,
  profileImg:string,
  firstName:string,
  lastName:string,
  status:string,
  lastMessage?:IMessage,
}

const MessagePreviewCard:FC<propsMessagePreviewCard> = memo(({
  companionID,
  setShowChatID,
  messages,
  firstName,
  lastName,
  profileImg,
  status,
  lastMessage
}) => {
  
  const lastMessageTime = useDate(lastMessage?.date)



  return (
    <li onClick={()=>setShowChatID(companionID)} className='flex justify-between p-4 rounded-xl cursor-pointer'>
      <div className="flex gap-2 cursor-pointer">
        <div className="relative h-11 flex-shrink-0">
          <AuthorImg
            width="44"
            className='h-11'
            src={profileImg}
          />
          <span className={status === "online" ? 'status online' : 'status offline'}></span>
        </div>
        <div className="flex flex-col gap-1">
          <h2>{firstName + " " + lastName}</h2>
          <p className='text-xs dark:text-superLightGray opacity-80'>
            {lastMessage && lastMessage?.message.length > 20 ? lastMessage?.message.substr(0, 20) + "..." : lastMessage?.message}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5 ">
        <p>{lastMessage && lastMessageTime.time}</p>
        {/* <span className=' text-center text-sm inline-block h-5 w-5 bg-red rounded-md'>1</span> */}
        {/* <StarIcon className='text-green w-4.5 cursor-pointer'/> */}
      </div>
    </li>
  )
})

export default MessagePreviewCard