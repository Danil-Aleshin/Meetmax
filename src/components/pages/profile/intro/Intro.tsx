import { CakeIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'
import { FC, memo } from 'react'
import { IUserInfo } from '../../../types/data'
import { convertDate } from '../../../utils/convertDate'
import Loader from './Loader'


interface propsIntro{
  followers:number,
  following:number,
  friends:number,
  userInfo?:IUserInfo
}

const Intro:FC<propsIntro> = memo(({
  followers,
  following,
  friends,
  userInfo
}) => {

  const date = convertDate("dd/MM/yyyy",userInfo?.dateOfBirthday)

  return !userInfo ? <Loader/> :(
    <div className='h-fit'>
      <div className='flex flex-col gap-4'>
        <ul className='flex flex-col gap-2'>
          {userInfo.dateOfBirthday &&
            <li className='flex gap-5 items-center'>
              <CakeIcon className='w-5'/>
              <p>{date}</p>
            </li>
          }
          {userInfo.location &&
            <li className='flex gap-5 items-center'>
              <MapPinIcon className='w-5'/>
              <p>{userInfo.location}</p>
            </li>
          }
          <li className='flex gap-5 items-center'>
            <UsersIcon className='w-5'/>
            <p>{friends}</p>
          </li>
          <li className='flex gap-5 items-center'>
            <p>{followers} Followers</p>
          </li>
          <li className='flex gap-5 items-center'>
            <p>{following} Following</p>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default Intro