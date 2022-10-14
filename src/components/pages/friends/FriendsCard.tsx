import { UserPlusIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import useProfile from '../../hooks/requestsHooks/useProfile'
import { userID } from '../../types/data'
import UserImg from '../../ui/UserImg'

interface propsFriendsCard{
  netWorkUserID:userID,
  addToFriendFunc?:(networkUserID:userID)=>void
}

const FriendsCard:FC<propsFriendsCard> = ({
  netWorkUserID,
  addToFriendFunc
}) => {
  const {userInfo} = useProfile(netWorkUserID)

  return !userInfo ? null :(
    <li className='flex items-center justify-between'>
      <Link to={`/${netWorkUserID}`} className="flex gap-3 items-center">
        <UserImg
          width='36'
          className='h-9'
          src={userInfo?.profileImg.link}
        />
        <p>{`${userInfo?.firstName} ${userInfo?.lastName}`}</p>
      </Link>
      {
        addToFriendFunc 
          ? <UserPlusIcon 
            className='icon w-5.5 cursor-pointer' 
            onClick={()=>addToFriendFunc(netWorkUserID)}
          /> 
          : <p className='text-xs text-superLightGray'>2min</p>
      }
    </li>
  )
}

export default FriendsCard