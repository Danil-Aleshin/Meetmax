import { StarIcon } from '@heroicons/react/24/outline'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import useProfile from '../../../hooks/requestsHooks/useProfile'
import { userID } from '../../../types/data'
import AuthorImg from '../../../ui/UserImg'
import { timeToTimeAgo } from '../../../utils/convertDate'
import Loader from './Loader'

interface propsChatPreviewCard{
  companionID:userID,
  // lastMessage?:IMessage,
  favorite:boolean,
}

const ChatPreviewCard:FC<propsChatPreviewCard> = memo(({
  companionID,
  // lastMessage = {
  //   date: Timestamp.fromDate(new Date),
  //   fromUserID:"",
  //   id:0,
  //   imgs:[],
  //   state:'read',
  //   text:""
  // },
  favorite,
}) => {
  const {userInfo} = useProfile(companionID)
  // const lastMessageTime = timeToTimeAgo(lastMessage.date)


  return !userInfo ? <Loader/> : (
    <li className='cursor-pointer'>
      <Link to={`/messages/${companionID}`} className='flex justify-between p-4 rounded-xl '>
      <div className="flex gap-2 cursor-pointer">
        <div className="relative h-11 flex-shrink-0">
          <AuthorImg
            width="44"
            className='h-11'
            src={userInfo?.profileImg?.link}
          />
          <span className={userInfo?.status === "online" ? 'status online' : 'status offline'}></span>
        </div>
        <div className="flex flex-col gap-1">
          <h2>
            {`${userInfo?.firstName} ${userInfo?.lastName}`}
          </h2>
          {/* <p className='text-xs dark:text-superLightGray opacity-80'>
            {lastMessage && lastMessage?.text.length > 30 
              ? lastMessage?.text.substr(0, 30) + "..." 
              : lastMessage?.text
            }
          </p> */}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 ">
        {/* <p>{lastMessageTime}</p> */}
        {/* <span className=' text-center text-sm inline-block h-5 w-5 bg-red rounded-md'>1</span> */}
        {favorite && <StarIcon className='text-green w-4.5 cursor-pointer justify-end'/>}
      </div>
      </Link>
    </li>
  )
})

export default ChatPreviewCard