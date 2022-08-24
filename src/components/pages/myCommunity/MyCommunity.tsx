import { doc, onSnapshot } from 'firebase/firestore'
import React, { FC, useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { follow } from '../../../store/FollowersSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { IUserInfo, userID } from '../../types/data'
import Button from '../../ui/Button'
import ContentBlock from '../../ui/ContentBlock'
import ProfileCard from '../../ui/ProfileCard'
import './MyCommunity.scss'

const MyCommunity:FC = () => {

  const [itemActive, setItemActive] = useState<"followers" | "following">("followers")
  const [followers, setFollowers] = useState<IUserInfo[]>([])
  const [following, setFollowing] = useState<IUserInfo[]>([])


  const {userID} = useAppSelector(state => state.auth)


  const {
    currentUserFollowers,
    currentUserFollowing,
  } = useAppSelector(state => state.followers)
  const {allUsers} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()


  useEffect(() => {
    const followersProfiles:IUserInfo[] = []
    const followingProfiles:IUserInfo[] = []

    allUsers.map(user =>{
      currentUserFollowers.map(follower=>{
        user.userID === follower.userID && followersProfiles.push(user)
      })
    })
    allUsers.map(user =>{
      currentUserFollowing.map(follower=>{
        user.userID === follower.userID && followingProfiles.push(user)
      })
    })

    setFollowers(followersProfiles)
    setFollowing(followingProfiles)

  }, [allUsers,currentUserFollowers,currentUserFollowing])


  
  return (
    <div className='flex flex-col gap-6'>
      <ContentBlock>
        <div className='w-full flex justify-around items-center'>
          <div onClick={()=>setItemActive("followers")} className={itemActive === "followers" ? "community__item community__item--active" : "community__item"}>
            <p className='text'>{currentUserFollowers.length} Followers</p>
          </div>
          <div onClick={()=>setItemActive("following")} className={itemActive === "following" ? "community__item community__item--active" : "community__item"}>
            <p className='text'>{currentUserFollowing.length} Following</p>
          </div>
        </div>
      </ContentBlock>
      <div>
        <div className='profile-card__list'>
          {
            itemActive === "followers"
            ? followers.map(follower =>
                <ProfileCard
                  key={follower.userID}
                  firstName={follower.firstName}
                  lastName={follower.lastName}
                  profileImg={follower.profileImg}
                  followerID={follower.userID}
                />
              )
            : following.map(follower =>
              <ProfileCard
                key={follower.userID}
                firstName={follower.firstName}
                lastName={follower.lastName}
                profileImg={follower.profileImg}
                followerID={follower.userID}
              />
              )
          
          }
          
        </div>
      </div>
    </div>
  )
}

export default MyCommunity