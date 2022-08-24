import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'

import { IMessage, IUserInfo } from '../../types/data'


interface propsMessageCard extends IMessage{
  userInfo:IUserInfo,
}

const MessageCard:FC<propsMessageCard> = memo(({
  date,
  message,
  userInfo,
  fromUserID,
}) => {

  const {currentUser} = useAppSelector(state => state.users)

  // {fromUserID === userInfo.userID ? "":""}

  return (
    <li 
      className={fromUserID === currentUser.userID
        ? 'test anotherUser'
        : "test"
      }
    >
      <div className={"message-card"}>
        <Link to={userInfo.userID}>
          <img 
            src={fromUserID === userInfo.userID 
              ? userInfo.profileImg 
              : currentUser.profileImg
            }
            alt="" width={36} className="rounded-full" 
          />
        </Link>
        <p className='p-2 bg-lightGray dark:bg-darkBlue rounded-lg'>
          {message}
        </p>
      </div>
      {fromUserID === currentUser.userID &&
        <ul className="options-menu-message">
        <li>
          <PencilIcon className='w-4.5 text-blue'/>
        </li>
        <li>
          <TrashIcon className='w-4.5 text-blue'/>
        </li>
      </ul>
      }
    </li>
  )
})

export default MessageCard