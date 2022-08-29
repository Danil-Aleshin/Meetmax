import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import { IMessage, IUserInfo } from '../../types/data'
import UserImg from '../../ui/UserImg'


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

  // const messageDate = useDate(date)
  

  return (
    <li 
      className={fromUserID === currentUser.userID
        ? 'test anotherUser'
        : "test"
      }
    >
      <div className={"message-card"}>
        <Link to={userInfo.userID} className="flex-shrink-0">
          <UserImg
            width="36"
            className='h-9'
            src={fromUserID === userInfo.userID 
              ? userInfo.profileImg 
              : currentUser.profileImg
            }
          />
        </Link>
        <p className='p-2 bg-lightGray dark:bg-darkBlue rounded-lg max-w-sm'>
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