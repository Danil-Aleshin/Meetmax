import { ChatIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline'
import React, { FC, memo } from 'react'

interface propsSoicalActivity{
  likes:number,
  comments:number,
  share:number,
}

const SoicalActivity:FC<propsSoicalActivity> = memo(({comments,likes,share}) => {
  return (
    <div className="my-3 py-1.5 flex justify-between border-t border-b border-y-superLightGray dark:border-y-inputBorderBlue">
      <div className="flex gap-1 cursor-pointer">
        <HeartIcon className='w-5.5 text-blue'/>
        <p>{likes}</p>
      </div>
      <div className="flex gap-1 cursor-pointer">
        <ChatIcon className='w-5.5 text-blue'/>
        <p>{comments}</p>
      </div>
      <div className="flex gap-1 cursor-pointer">
        <ShareIcon className='w-5.5 text-blue'/>
        <p>{share}</p>
      </div>
  </div>
  )
})

export default SoicalActivity