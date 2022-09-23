import { EyeSlashIcon, MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addToFriends } from '../../../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/appRedux'
import useInput from '../../../hooks/useInput'
import { IUserInfo, userID } from '../../../types/data'
import InputText from '../../../ui/InputText'
import OptionsMenu from '../../../ui/optionsMenu/OptionsMenu'
import UserImg from '../../../ui/UserImg'

const FriendsRequests:FC = () => {
  const [friendRequests, setFriendRequests] = useState<IUserInfo[]>([])
  const [optionsMenuActive, setOptionsMenuActive] = useState(false)


  const {currentUserFriendRequests} = useAppSelector(state => state.friends)
  const {allUsers,currentUser:{userID}} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {

    const friendRequestsProfile:IUserInfo[] = []
    allUsers.map(user =>{
      currentUserFriendRequests.map(friend=>{
        user.userID === friend.userID && friendRequestsProfile.push(user)
      })
    })
    setFriendRequests(friendRequestsProfile)

  }, [currentUserFriendRequests,allUsers])

  const addToFriendsFunc = (newFriendID:userID) =>{
    dispatch(addToFriends({newFriendID,userID}))
  }

  const searchFriendsReq = useInput("")

  const filtredFriendList = friendRequests.filter(friend=>{
    return friend.firstName.toLowerCase().includes(searchFriendsReq.value.toLowerCase()) ||
    friend.lastName.toLowerCase().includes(searchFriendsReq.value.toLowerCase())
  })

  return (
    <div className='flex flex-col gap-6'>
      <InputText
        onChange={searchFriendsReq.onChange}
        value={searchFriendsReq.value}
        Icon={MagnifyingGlassIcon}
        placeholder={"Search Friends Requests..."}
        className="w-full border px-11 border-superLightGray dark:bg-lightBlack"
        onKeyDown={searchFriendsReq.onKeyDown}
      />
        <ul className='flex flex-col gap-4'>
          <li className="flex gap-2">
          <Link className='hover:text-lightBlue transition-colors' to ="/friends">Friends</Link>
          <Link className='hover:text-lightBlue transition-colors' to ="/friends/friends-requests">Friends Requests</Link>
          </li>
          <li>
            {filtredFriendList.length > 0 
              ? <ul className="flex flex-col gap-4">
                  {filtredFriendList.map(friend =>
                    <li key={friend.userID} className='flex items-center justify-between'>
                      <Link 
                        to={`/${friend.userID}`} 
                        className="flex gap-3 items-center"
                      >
                        <UserImg
                          width='36'
                          className='h-9'
                          src={friend.profileImg.link}
                        />
                        <p>{friend.firstName + " " + friend.lastName}</p>
                        </Link>
                      <UserPlusIcon 
                        className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'
                        onClick={()=>addToFriendsFunc(friend.userID)}
                      />
                    </li>
                  )}
                </ul>
              : <div className="">No friends found</div>
            }
          </li>
        </ul>
    </div>
  )
}

export default FriendsRequests



{/* <li key={friend.userID} className='flex items-center justify-between'>
<Link to={`/${friend.userID}`} className="flex gap-3 items-center">
  <UserImg
    width='36'
    className='h-9'
    src={friend.profileImg.link}
  />
  <p>{friend.firstName + " " + friend.lastName}</p>
</Link>
<UserPlusIcon 
  className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'
  onClick={()=>addToFriendsFunc(friend.userID)}
/>
</li> */}