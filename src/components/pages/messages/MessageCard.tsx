import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteMessage, editMessage } from '../../../store/ChatSlice'
import { setActive } from '../../../store/ViewPicturesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import { IFile, IMessage, IUserInfo, TypeSetState } from '../../types/data'
import UserImg from '../../ui/UserImg'


interface propsMessageCard{
  userInfo?:IUserInfo,
  message:IMessage
  messages?:IMessage[],
  setValue:TypeSetState<string>
  setIsEditing:TypeSetState<boolean>
  setMessageEditing:TypeSetState<IMessage | undefined>,
}

const MessageCard:FC<propsMessageCard> = memo(({
  message,
  userInfo,
  message:{date,fromUserID,text,id,state},
  messages,
  setValue,
  setIsEditing,
  setMessageEditing,
}) => {

  const [viewPhoto, setViewPhoto] = useState<IFile[]>([])

  // const {} = useAppSelector(state => state.viewPictures)
  const {currentUser:{userID}, currentUser} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  const messageDate = useDate(date)
  
  const deleteMessageFunc = () => {
    if (userInfo) {
      const companionID = userInfo.userID
      const messagesList = messages ? messages : []
      dispatch(deleteMessage({companionID,id,messagesList,userID}))
    }
  }

  const editMessageActivation = () =>{
    setMessageEditing(message)
    setIsEditing(true)
    setValue(text)
  }

  const viewPhotoFunc = (img:IFile) =>{
    const viewPhotoArr = message.imgs.filter(item => item.name !== img.name)
    dispatch(setActive([img,...viewPhotoArr]))
  }
  return (
    <li 
      className={fromUserID === userID
        ? 'test anotherUser'
        : "test"
      }
    >
      <div className={"message-card"}>
        <div className='overflow-hidden flex flex-col'>
        {
            message.imgs &&
            <div className="flex flex-wrap max-w-sm">
              {message.imgs.map(img =>
                <img src={img.link} key={img.name} onClick={()=>viewPhotoFunc(img)}   className="" alt="" />
              )}
          </div>
            }   
          <div className="p-2 bg-lightGray dark:bg-darkBlue rounded-lg max-w-sm flex gap-3">
            <p>{text}</p>
            <p className='text-xs self-end text-test dark:text-blue'>
              {messageDate.time}
            </p>
          </div>
          
        </div>
      </div>
      {fromUserID === userID &&
        <ul className="options-menu-message">
        <li>
          <PencilIcon 
            onClick={()=>editMessageActivation()} 
            className='w-4.5 text-blue dark:text-superLightGray'
          />
        </li>
        <li>
          <TrashIcon 
            onClick={()=>deleteMessageFunc()} 
            className='w-4.5 text-blue dark:text-superLightGray'
          />
        </li>
      </ul>
      }
    </li>
  )
})

export default MessageCard