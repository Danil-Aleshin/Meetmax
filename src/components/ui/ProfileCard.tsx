import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { follow } from '../../store/FollowersSlice'
import { addToFriends } from '../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { userID } from '../types/data'
import Button from './Button'
import ContentBlock from './ContentBlock'

interface propsProfileCard{
  followerID:userID,
  profileImg:string,
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
  const [isFollower, setIsFollower] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)


  const {userID} = useAppSelector(state =>state.auth)
  const {currentUserFriends} = useAppSelector(state => state.friends)
  const {currentUserFollowers,currentUserFollowing} = useAppSelector(state => state.followers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsFriend(currentUserFriends.some(friend => friend.userID === followerID))
    setIsFollowing(currentUserFollowing.some(friend => friend.userID === followerID))
  }, [currentUserFriends])
  
  const followFunc = () =>{
    dispatch(follow({userID,followerID}))
  }
  const addToFriendsFunc = () => {
    const newFriendID = followerID
    dispatch(addToFriends({userID,newFriendID}))
  }
  return (
    <ContentBlock className='h-37'>
      <div className='flex flex-col gap-4 justify-center h-full'>
        <Link to={`/${followerID}`} className="flex items-center gap-3">
          <img className='rounded-full' src={profileImg} width={60} alt="" />
          <div className="flex flex-col gap-1">
            <h3>{firstName + " " + lastName}</h3>
          </div>
        </Link>
        <div className="flex gap-3.5 justify-center">
          {isFollowing ?<button className='rounded-lg text-center px-6.5 py-1.5 border border-superLightGray dark:border-inputBorderBlue'>Unfollow</button> : <button onClick={()=>followFunc()} className=" rounded-lg text-center px-6.5 py-1.5 border border-superLightGray dark:border-inputBorderBlue">Follow</button>}
          {isFriend ?<Button title='Unfriend'/> : <Button title='Friend' onClickFunc={addToFriendsFunc}/>}
        </div>
      </div>
    </ContentBlock>
  )
})

export default ProfileCard