import {FC} from 'react'
import { changeProfileImg } from '../../../../store/EditProfileSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/appRedux'
import useCommunity from '../../../hooks/requestsHooks/useCommunity'
import useFollowers from '../../../hooks/requestsHooks/useFollowers'
import useFollowing from '../../../hooks/requestsHooks/useFollowing'
import useFriends from '../../../hooks/requestsHooks/useFriends'
import useProfile from '../../../hooks/requestsHooks/useProfile'
import { IUserInfo, userID } from '../../../types/data'
import ProfileActions from '../../../ui/ProfileActions'
import UserImg from '../../../ui/UserImg'
import Intro from '../intro/Intro'
import Loader from './Loader'

interface propsHeaderProfile{
  id:userID,
  userInfo?:IUserInfo
}

const HeaderProfile:FC<propsHeaderProfile> = ({
  id,
  userInfo
}) => {

  const {userID} = useAppSelector(state => state.auth)
  const {hostUser:{
    profileImg
  }} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const isFollowing = useCommunity('following',userID,id)
  const isFriend = useCommunity('friends',userID,id)
  const isFriendReq = useCommunity('friendRequests',userID,id)
  const isMyFriendReq = useCommunity('myFriendRequests',userID,id)


  const uploadImg = (e:any) =>{
    const newImg = e.target.files[0]
    newImg.path = `profileImages/${userID}`
    newImg.link = ""
    dispatch(changeProfileImg({newImg,userID,currentImg:profileImg}))
  }

  return !userInfo ? <Loader/> :(
    <div className="w-fit flex flex-col gap-4 items-start">
      <div className='flex flex-col items-center'>
        <div className="profile__img h-37.5">
          <UserImg
            className='h-full'
            width='150'
            src={userInfo?.profileImg.link}
          />
          {id === userID &&
            <>
              <label className='new-img' htmlFor='newImgBtn'></label>
              <input 
                type={"file"}
                id="newImgBtn"
                onChange={(e:any)=>uploadImg(e)}
                className="hidden"
                accept="image/jpeg, image/png"
              />
            </>
          }
        </div>
      
      <h1 className='text-2xl'>
        {`${userInfo?.firstName ? userInfo.firstName : ""} 
        ${userInfo?.lastName ? userInfo.lastName : ""}`}
      </h1>
      </div>
      {userID !== id && userInfo ?
        <ProfileActions
          isFollowing={isFollowing}
          isFriend={isFriend}
          isMyFriendReq={isMyFriendReq}
          isFriendReq={isFriendReq}
          networkUserID={userInfo.userID}
        />
      : null
    }
    </div>
  )
}

export default HeaderProfile