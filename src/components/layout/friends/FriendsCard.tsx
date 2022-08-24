import { FC } from 'react'
import { Link } from 'react-router-dom'
import { userID } from '../../types/data'

interface propsFriendsCard{
  userID:userID,
  profileImg:string,
  firstName:string,
  lastName:string,
}

const FriendsCard:FC<propsFriendsCard> = ({
  firstName,
  lastName,
  profileImg,
  userID
}) => {
  return (
    <li className='flex items-center justify-between'>
      <Link to={`/${userID}`} className="flex gap-3 items-center">
        <img src={profileImg} className="w-9 rounded-full" width={36} alt="" />
        <p>{firstName + " " + lastName}</p>
      </Link>
      <p className='text-xs text-superLightGray'>2min</p>
    </li>
  )
}

export default FriendsCard