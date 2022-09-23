import { StarIcon } from '@heroicons/react/24/outline'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import useDate from '../../hooks/useDate'
import { IFile, IMessage, userID } from '../../types/data'
import AuthorImg from '../../ui/UserImg'

interface propsChatPreviewCard{
  companionID:userID,
  profileImg:IFile,
  firstName:string,
  lastName:string,
  status:string,
  lastMessage?:IMessage,
  favorite:boolean,
}

const ChatPreviewCard:FC<propsChatPreviewCard> = memo(({
  companionID,
  firstName,
  lastName,
  profileImg,
  status,
  lastMessage,
  favorite
}) => {
  
  const lastMessageTime = useDate(lastMessage?.date)



  return (
    <li className='cursor-pointer'>
      <Link to={`/messages/${companionID}`} className='flex justify-between p-4 rounded-xl '>
      <div className="flex gap-2 cursor-pointer">
        <div className="relative h-11 flex-shrink-0">
          <AuthorImg
            width="44"
            className='h-11'
            src={profileImg.link}
          />
          <span className={status === "online" ? 'status online' : 'status offline'}></span>
        </div>
        <div className="flex flex-col gap-1">
          <h2>
            {`${firstName} ${lastName}`}
          </h2>
          <p className='text-xs dark:text-superLightGray opacity-80'>
            {lastMessage && lastMessage?.text.length > 30 
              ? lastMessage?.text.substr(0, 30) + "..." 
              : lastMessage?.text
            }
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 ">
        <p>{lastMessage && lastMessageTime.time}</p>
        {/* <span className=' text-center text-sm inline-block h-5 w-5 bg-red rounded-md'>1</span> */}
        {favorite && <StarIcon className='text-green w-4.5 cursor-pointer justify-end'/>}
      </div>
      </Link>
    </li>
  )
})

export default ChatPreviewCard