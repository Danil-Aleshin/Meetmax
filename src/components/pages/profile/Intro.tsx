import { CakeIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'
import { FC, memo } from 'react'
import useDate from '../../hooks/useDate'

interface propsIntro{
  dateOfBirthday?:Timestamp,
  followers:number,
  following:number,
  location?:string,
  friends:number,
}

const Intro:FC<propsIntro> = memo(({
  dateOfBirthday,
  followers,
  following,
  location,
  friends
}) => {

  const date = useDate(dateOfBirthday)

  return (
    <div className='h-fit'>
      <div className='flex flex-col gap-4'>
        <ul className='flex flex-col gap-2'>
          {dateOfBirthday &&
            <li className='flex gap-5 items-center'>
              <CakeIcon className='w-5'/>
              <p>{date.date}</p>
            </li>
          }
          {location &&
            <li className='flex gap-5 items-center'>
              <MapPinIcon className='w-5'/>
              <p>{location}</p>
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
        {/* <Link to="/settings/edit-profile" className='py-2 px-12 bg-lightGray dark:bg-darkBlue rounded-lg text-center'>
          Edit Details
        </Link> */}
      </div>
    </div>
  )
})

export default Intro