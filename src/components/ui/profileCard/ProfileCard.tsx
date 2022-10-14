import React, { FC, memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { follow, unfollow } from '../../../store/FollowersSlice'
import { useAppSelector } from '../../hooks/appRedux'
import useCommunity from '../../hooks/requestsHooks/useCommunity'
import useProfile from '../../hooks/requestsHooks/useProfile'
import { ICommunity, IFile, IUserInfo, userID } from '../../types/data'
import Button from '../Button'
import ContentBlock from '../ContentBlock'
import ProfileActions from '../ProfileActions'
import UserImg from '../UserImg'
import Loader from './Loader'

interface propsProfileCard{
  netWorkUserID:userID,
}
const ProfileCard:FC<propsProfileCard> = memo(({
  netWorkUserID,
}) => {
  
  const {userInfo} = useProfile(netWorkUserID)

  
  return (
    <ContentBlock className='w-full'>
      <div className='flex flex-col gap-4 justify-center h-full'>
      {!userInfo ? <Loader/> :
        <Link to={`/${netWorkUserID}`} className="flex items-center gap-3">
          <UserImg
            width="60"
            className='h-15'
            src={userInfo.profileImg.link}
          />
          <div className="flex flex-col gap-1">
            <h3>{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
          </div>
        </Link>
      }
      </div>
    </ContentBlock>
  )
})

export default ProfileCard