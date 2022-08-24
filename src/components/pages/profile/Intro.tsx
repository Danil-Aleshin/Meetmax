import { CakeIcon, DeviceMobileIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/outline'
import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import ContentBlock from '../../ui/ContentBlock'

interface propsIntro{
  dateOfBirthday?:string,
  followers:number,
  following:number,
  location?:string,
  phoneNumber?:number,
  friends:number,
}

const Intro:FC<propsIntro> = memo(({
  dateOfBirthday,
  followers,
  following,
  location,
  phoneNumber,
  friends
}) => {
  return (
    <ContentBlock className='h-fit'>
      <div className='flex flex-col gap-4'>
        <h3 className='uppercase'>intro</h3>
        <ul className='flex flex-col gap-2'>
          {dateOfBirthday &&
            <li className='flex gap-5 items-center'>
              <CakeIcon className='w-5'/>
              <p>{dateOfBirthday}</p>
            </li>
          }
          {phoneNumber &&
            <li className='flex gap-5 items-center'>
              <DeviceMobileIcon className='w-5'/>
              <p>{phoneNumber}</p>
            </li>
          }
          {location &&
            <li className='flex gap-5 items-center'>
              <LocationMarkerIcon className='w-5'/>
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
        <Link to="/" className='py-2 px-12 bg-lightGray dark:bg-darkBlue rounded-lg text-center'>
          Edit Details
        </Link>
      </div>
    </ContentBlock>
  )
})

export default Intro