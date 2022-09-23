import { ChatBubbleOvalLeftEllipsisIcon, EnvelopeIcon, UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { startAChat } from '../../store/ChatSlice'
import { follow, unfollow } from '../../store/FollowersSlice'
import { addToFriends, friendRequest, removeFriendRequest, removeFromFriends } from '../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { ICommunity, IFile, IUserInfo, userID } from '../types/data'
import Button from './Button'
import ContentBlock from './ContentBlock'
import UserImg from './UserImg'

interface propsProfileCard{
  followerID:userID,
  profileImg:IFile,
  firstName:string,
  lastName:string,
}
const ProfileCard:FC<propsProfileCard> = memo(({
  firstName,
  lastName,
  profileImg,
  followerID,
}) => {
  
  const [isFriend, setIsFriend] = useState(false)
  const [isFollowing, setIsFollowing] = useState<ICommunity>()
  const [isFriendReq, setIsFriendReq] = useState(false)
  const [isMyFriendReq, setIsMyFriendReq] = useState(false)

  const {status,loading} = useAppSelector(state => state.followers)
  const {userID} = useAppSelector(state => state.auth)
  const {currentUserFollowing} = useAppSelector(state => state.followers)
  const {
    currentUserFriendRequests,
    currentUserFriends,
    myFriendRequests
  } = useAppSelector(state => state.friends)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    setIsFollowing(undefined)
    currentUserFollowing.map(following =>{
      following.userID === followerID && setIsFollowing(following)
    })
  }, [followerID,currentUserFollowing])

  useEffect(() => {
    setIsFriendReq(false)
    currentUserFriendRequests.map(user => 
      user.userID === followerID && setIsFriendReq(true)
    )
  }, [followerID,currentUserFriendRequests])

  useEffect(() => {
    setIsMyFriendReq(false)
    myFriendRequests.map(user => 
      user.userID === followerID && setIsMyFriendReq(true)
    )
  }, [followerID,myFriendRequests])

  useEffect(() => {
    setIsFriend(false)
    currentUserFriends.map(user =>{
      if (user.userID === followerID) {
        setIsFriend(true)
      }
    })
  }, [followerID,currentUserFriends,isFriendReq])
  
  const addToFriendsFunc = () => {
    const newFriendID = followerID
    dispatch(friendRequest({newFriendID,userID}))
  }

  const acceptFriendRequest = () =>{
    const newFriendID = followerID
    dispatch(addToFriends({newFriendID,userID}))
  }

  const removeFriendRequestFunc = () =>{
    const newFriendID = followerID
    dispatch(removeFriendRequest({newFriendID,userID}))
  }

  const removeFromFriendsFunc = () => {
    const newFriendID = followerID
    dispatch(removeFromFriends({newFriendID,userID}))
  }


  const followFunc = () =>{
    if (!loading) {
      dispatch(follow({userID,followerID}))
    }
  }

  const unFollowFunc = () =>{
    if (!loading) {
      dispatch(unfollow({followerID,userID}))
    }
  }

  const startAChatFunc = () =>{
    const companionID = userID
    dispatch(startAChat({companionID,userID}))
    navigate(`/messages/${followerID}`)
  }

  return (
    <ContentBlock className='h-37 w-full'>
      <div className='flex flex-col gap-4 justify-center h-full'>
        <Link to={`/${followerID}`} className="flex items-center gap-3">
          <UserImg
            width="60"
            className='h-15'
            src={profileImg.link}
          />
          <div className="flex flex-col gap-1">
            <h3>{`${firstName} ${lastName}`}</h3>
          </div>
        </Link>
        <div className="flex gap-3.5 items-center">
        {isFollowing 
            ? <button 
                className='rounded-lg text-center px-6.5 py-1.5 border border-superLightGray dark:border-inputBorderBlue'
                onClick={unFollowFunc}
              >
              Unfollow
              </button>
            : <Button
                onClickFunc={followFunc}
                title='Follow'
                className='border'
              />
          }
          {!isFriend && !isFriendReq && !isMyFriendReq
            ? <UserPlusIcon 
                className='icon w-6 cursor-pointer' 
                onClick={()=>addToFriendsFunc()}
              />
            : undefined
          }
          {isFriendReq 
            && <div className="flex p-1 gap-0.5 border rounded-xl" onClick={acceptFriendRequest}>
            <EnvelopeIcon className='icon w-5.5 cursor-pointer'/>
            <UserPlusIcon className='icon w-5.5 cursor-pointer'/>
          </div>
          }
          {isMyFriendReq &&
            <div className="flex p-1 gap-0.5 border rounded-xl" onClick={removeFriendRequestFunc}>
              <EnvelopeIcon className='icon w-5.5 cursor-pointer'/>
              <UserMinusIcon className='icon w-5.5 cursor-pointer'/>
            </div>
          }
          {isFriend 
            && <UserMinusIcon
                  className='icon w-6 cursor-pointer' 
                  onClick={()=>removeFromFriendsFunc()}
                />
          }
          <ChatBubbleOvalLeftEllipsisIcon className='icon w-6 cursor-pointer' onClick={()=>startAChatFunc()}/>
        </div>
      </div>
    </ContentBlock>
  )
})

export default ProfileCard