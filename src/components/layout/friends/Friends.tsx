import { DotsHorizontalIcon, EyeOffIcon, SearchIcon } from '@heroicons/react/outline'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IUserInfo } from '../../types/data'
import AuthorImg from '../../ui/UserImg'
import InputText from '../../ui/InputText'
import OptionsMenu from '../../ui/optionsMenu/OptionsMenu'
import './Friends.scss'
import FriendsCard from './FriendsCard'
import UserImg from '../../ui/UserImg'

const Friends:FC = () => {
  
  const [friends, setFriends] = useState<IUserInfo[]>([])
  const [recomendFriends, setRecomendFriends] = useState<IUserInfo[]>([])

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)

  const {currentUserFriends} = useAppSelector(state => state.friends)
  const {currentUser} = useAppSelector(state => state.users)

  
  const {allUsers} = useAppSelector(state => state.users)

  useEffect(() => {
    const users:IUserInfo[] = []
    allUsers.map(user =>{
      currentUserFriends.map(friend=>{
        user.userID === friend.userID && users.push(user)
      })
    })
    setFriends(users)

    const recFriends = allUsers.filter(user =>
      user.userID !== currentUser.userID
      && !friends.includes(user)
    )
    setRecomendFriends(recFriends)

  }, [allUsers,currentUserFriends])


  const plug = () =>{

  }



  
  const searchFriends = useInput(plug,"")
  return (
    <aside className='friends'>
      <InputText 
        onChange={searchFriends.onChange}
        value={searchFriends.value}
        Icon={SearchIcon}
        placeholder={"Search Friends!"}
        className="w-full border px-11 border-superLightGray dark:bg-lightBlack"
        onKeyDown={searchFriends.onKeyDown}
      />
      <ul className='flex flex-col gap-4'>
        <li>
          <ul className='flex items-center overflow-x-auto gap-5'>
            {recomendFriends.map(user => 
              <li key={user.userID} className='flex-shrink-0'>
                <Link to={"/" + user.userID} className="flex flex-col items-center gap-1 justify-center">
                  <UserImg
                    width='48'
                    className='h-12 border-2 border-lightBlue'
                    src={user.profileImg}
                  />
                  <p>{user.firstName}</p>
                </Link>
              </li>  
            )}
          </ul>
        </li>
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
          friends.length 
          ? friends.map(friend =>
              <FriendsCard
                key={friend.userID}
                firstName={friend.firstName}
                lastName={friend.lastName}
                profileImg={friend.profileImg}
                userID={friend.userID}
              />
          )
          : <div className="mx-auto">Друзей нет (</div>
        }
      </ul>
    </aside>
  )
}

export default Friends