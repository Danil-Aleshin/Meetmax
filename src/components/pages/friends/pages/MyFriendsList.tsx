import { EyeSlashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../hooks/appRedux'
import useInput from '../../../hooks/useInput'
import { IUserInfo } from '../../../types/data'
import InputText from '../../../ui/InputText'
import OptionsMenu from '../../../ui/optionsMenu/OptionsMenu'
import UserImg from '../../../ui/UserImg'
import FriendsCard from '../FriendsCard'

const MyFriendsList = () => {
  const [optionsMenuActive, setOptionsMenuActive] = useState(false)
  const [friends, setFriends] = useState<IUserInfo[]>([])
  const [recomendFriends, setRecomendFriends] = useState<IUserInfo[]>([])

  const {currentUserFriends} = useAppSelector(state => state.friends)
  const {currentUser:{userID}} = useAppSelector(state => state.users)
  const {allUsers} = useAppSelector(state => state.users)

  useEffect(() => {
    const friendProfile:IUserInfo[] = []

    allUsers.map(user =>{
      currentUserFriends.map(friend=>{
        user.userID === friend.userID && friendProfile.push(user)
      })
    })
    setFriends(friendProfile)



  }, [allUsers,currentUserFriends])

  useEffect(() => {
    const recFriends = allUsers.filter(user =>
      user.userID !== userID 
      && !friends.includes(user)

    )
    setRecomendFriends(recFriends)

  }, [friends])

  const searchFriends = useInput("")

  const filtredFriendList = friends.filter(friend=>{
    return friend.firstName.toLowerCase().includes(searchFriends.value.toLowerCase()) ||
    friend.lastName.toLowerCase().includes(searchFriends.value.toLowerCase())
  })

  return (
    <div className="flex flex-col gap-3">
      <InputText
        onChange={searchFriends.onChange}
        value={searchFriends.value}
        Icon={MagnifyingGlassIcon}
        placeholder={"Search Friends..."}
        className="w-full border px-11 border-superLightGray dark:bg-lightBlack"
        onKeyDown={searchFriends.onKeyDown}
      />
      <div className='flex flex-col gap-4'>
        <div className="">Possible Friends</div>
      <div>
        <div className='flex items-center overflow-x-auto gap-5'>
        <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={0}
            slidesPerView={window.screen.width > 500 ? 8 : 4}
            className="w-full"
          >
          {recomendFriends.map(user => 
            <SwiperSlide key={user.userID}>
              <div key={user.userID} className='flex-shrink-0'>
                <Link to={"/" + user.userID} className="flex flex-col items-center gap-1  justify-center">
                <UserImg
                  width='48'
                  className='h-12 border-2 border-lightBlue'
                  src={user.profileImg.link}
                />
                <p>{user.firstName}</p>
              </Link>
            </div>
            </SwiperSlide>
          )}
          </Swiper>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className="flex gap-2">
          <NavLink className='hover:text-lightBlue transition-colors' to ="/friends">Friends</NavLink>
          <NavLink className='hover:text-lightBlue transition-colors' to ="/friends/friends-requests">Friends Requests</NavLink>
        </div>
      {
        filtredFriendList.length 
        ? <ul className='flex flex-col grow gap-4 overflow-y-auto'>
          {filtredFriendList.map(friend =>
            <FriendsCard
              key={friend.userID}
              firstName={friend.firstName}
              lastName={friend.lastName}
              profileImg={friend.profileImg.link}
              userID={friend.userID}
            />
        )}
        </ul>
        : <div className="text-center">No friend found :(</div>
      }
      </div>

    </div>
  </div>
  )
}

export default MyFriendsList