import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'

import { IMessage } from '../../types/data'

interface propsMessageCard extends IMessage{
}

const MessageCard:FC<propsMessageCard> = memo(({
  date,fromUserID,message,
}) => {

  const {userInfo:{
    userID
  },
  profile:{
    profileImg
  }} = useAppSelector(state=>state.auth.user)

  return (
    <li className={userID === fromUserID ? 'flex gap-2.5 items-center self-end':'flex gap-2.5 items-center'}>
      <Link to={"/"}>
        <img src={userID === fromUserID ? profileImg : profileImg} alt="" width={36} className="rounded-full" />
      </Link>
      <p className='p-2 bg-lightGray dark:bg-darkBlue rounded-lg'>{message}</p>
    </li>
  )
})

export default MessageCard