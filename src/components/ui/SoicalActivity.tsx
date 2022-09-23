import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from '@heroicons/react/24/outline'
import { FC, memo } from 'react'
import { TypeSetState } from '../types/data'

interface propsSoicalActivity{
  likes:number,
  comments:number,
  setShowComments:TypeSetState<boolean>,
  showComments:boolean,
  likeFunc:() => void,
  isLike:boolean,
}
const SoicalActivity:FC<propsSoicalActivity> = memo(({
  comments,
  likes,
  setShowComments,
  showComments,
  likeFunc,
  isLike,
}) => {

  return (
    <div className="my-3 py-1.5 flex gap-6 border-t border-b border-y-superLightGray dark:border-y-inputBorderBlue">
      <div className="flex gap-1 cursor-pointer" onClick={likeFunc} >
        <HeartIcon className={isLike ? 'w-5.5 text-pink' : 'w-5.5 text-blue'}/>
        <p>{likes}</p>
      </div>
      <div className="flex gap-1 cursor-pointer" onClick={()=>setShowComments(!showComments)}>
        <ChatBubbleOvalLeftEllipsisIcon className='w-5.5 text-blue'/>
        <p>{comments}</p>
      </div>
  </div>
  )
})

export default SoicalActivity