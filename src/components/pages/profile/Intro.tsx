import { CakeIcon, GlobeIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import ContentBlock from '../../ui/ContentBlock'

const Intro:FC = () => {
  return (
    <ContentBlock>
      <div className='flex flex-col gap-4'>
        <h3 className='uppercase'>intro</h3>
        <ul className='flex flex-col gap-2'>
          <li className='flex gap-5 items-center'>
            <CakeIcon className='w-5'/>
            <p>June 18,2001</p>
          </li>
          <li className='flex gap-5 items-center'>
            <CakeIcon className='w-5'/>
            <p>June 18,2001</p>
          </li>
          <li className='flex gap-5 items-center'>
            <CakeIcon className='w-5'/>
            <p>June 18,2001</p>
          </li>
          <li className='flex gap-5 items-center'>
            <CakeIcon className='w-5'/>
            <p>June 18,2001</p>
          </li>
          <li className='flex gap-5 items-center'>
            <p>51231 Followers</p>
          </li>
          <li className='flex gap-5 items-center'>
            <p>5231 Following</p>
          </li>
        </ul>
        <Link to="/" className='py-2 px-12 bg-lightGray dark:bg-darkBlue rounded-lg text-center'>
          Edit Details
        </Link>
      </div>
    </ContentBlock>
  )
}

export default Intro