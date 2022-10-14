import { ChatBubbleOvalLeftEllipsisIcon, EnvelopeIcon, UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore'
import {FC,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { startAChat } from '../../store/ChatSlice'
import { follow, unfollow } from '../../store/FollowersSlice'
import { addToFriends, friendRequest, removeFriendRequest, removeFromFriends } from '../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { userID } from '../types/data'
import Button from './Button'

interface propsProfileActions {
  networkUserID:userID,
  isFollowing:boolean,
  isFriend:boolean,
  isFriendReq:boolean,
  isMyFriendReq:boolean,
}

const ProfileActions:FC<propsProfileActions> = ({
  networkUserID,
  isFollowing,
  isFriend,
  isFriendReq,
  isMyFriendReq
}) => {

  const dispatch = useAppDispatch()
  const {userID} = useAppSelector(state => state.auth)
  const {loading:followersLoading} = useAppSelector(state => state.followers)
  const navigate = useNavigate()

  const addToFriendsFunc = () => {
    dispatch(friendRequest({networkUserID,userID}))
  }

  const acceptFriendRequest = () =>{
    dispatch(addToFriends({networkUserID,userID}))
  }

  const removeFriendRequestFunc = () =>{
    dispatch(removeFriendRequest({networkUserID,userID}))
  }

  const removeFromFriendsFunc = () => {
    dispatch(removeFromFriends({networkUserID,userID}))
  }


  const followFunc = () =>{
    if (!followersLoading) {
      dispatch(follow({userID,networkUserID}))
    }
  }

  const unFollowFunc = () =>{
    if (!followersLoading) {
      dispatch(unfollow({networkUserID,userID}))
    }
  }

  const startAChatFunc = async (companionID:userID) =>{
      const docSnap = await getDocs(query(collection(db, "chats", userID, "companion", networkUserID,"messages" )))
      if (docSnap.docs.length > 0) {
        navigate(`/messages/${companionID}`)
      } else {
        dispatch(startAChat({companionID,userID}))
        navigate(`/messages/${companionID}`)
      }
      
  }
  return (
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
      <ChatBubbleOvalLeftEllipsisIcon className='icon w-6 cursor-pointer' onClick={()=>startAChatFunc(networkUserID)}/>
    </div>
  )
}

export default ProfileActions