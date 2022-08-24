import { DotsHorizontalIcon, EyeOffIcon, SearchIcon } from '@heroicons/react/outline'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IUserInfo } from '../../types/data'
import InputText from '../../ui/InputText'
import OptionsMenu from '../../ui/optionsMenu/OptionsMenu'
import './Friends.scss'
import FriendsCard from './FriendsCard'

const Friends:FC = () => {
  const [friends, setFriends] = useState<IUserInfo[]>([])
  const [optionsMenuActive, setOptionsMenuActive] = useState(false)

  const {currentUserFriends} = useAppSelector(state => state.friends)
  const {allUsers} = useAppSelector(state => state.users)

  const searchFriends = useInput()

  useEffect(() => {
    const users:IUserInfo[] = []
    allUsers.map(user =>{
      currentUserFriends.map(friend=>{
        user.userID === friend.userID && users.push(user)
      })
    })
    setFriends(users)
  }, [allUsers,currentUserFriends])

  return (
    <aside className='friends'>
      <InputText 
        onChange={searchFriends.onChange}
        value={searchFriends.value}
        Icon={SearchIcon}
        placeholder={"Search Friends!"}
        className="w-full border px-11 border-superLightGray dark:bg-lightBlack"
      />
      <ul className='flex flex-col gap-4'>
        <li className='flex justify-between items-center relative'>
          <p>Friends</p>
          <OptionsMenu isActive={optionsMenuActive} setIsActive={setOptionsMenuActive} className="right-0">
            <>
            <li className='flex items-center gap-3 cursor-pointer'>
              <EyeOffIcon className='w-5.5 text-blue'/>
              <p>Hide Post</p>
            </li>
            </>
          </OptionsMenu>
        </li>
        {
          friends.map(friend =>
            <FriendsCard
              key={friend.userID}
              firstName={friend.firstName}
              lastName={friend.lastName}
              profileImg={friend.profileImg}
              userID={friend.userID}
            />
          )
        }
      </ul>
    </aside>
  )
}

export default Friends