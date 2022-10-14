import { Timestamp } from 'firebase/firestore'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {IUserInfo} from '../../types/data'
import { timeToTimeAgo } from '../../utils/convertDate'
import UserImg from '../UserImg'
import Loader from './Loader'


interface propsUserInfo{
  userInfo?:IUserInfo,
  date:Timestamp,
}

const UserInfo:FC<propsUserInfo> = ({
  userInfo,
  date
}) => {
  const convDate = timeToTimeAgo(date)

  return !userInfo ? <Loader/> :(
    <div className='flex gap-3'>
      <Link to={`/${userInfo.userID}`} className="flex-shrink-0">
        <UserImg
          src={userInfo.profileImg.link}
          width={"40"}
          className="h-10"
        />
      </Link>
      <div className="flex flex-col gap-0.3">
        <Link to={`/${userInfo.userID}`}>
          <p className="text-sm">{`${userInfo.firstName} ${userInfo?.lastName}`}</p>
        </Link>
        <p className="text-xs opacity-80 font-normal">{convDate}</p>
      </div>
    </div>
  )
}

export default UserInfo