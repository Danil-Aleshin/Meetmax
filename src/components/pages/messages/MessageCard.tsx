import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FC, memo } from 'react'
import { deleteMessage } from '../../../store/ChatSlice'
import { setActive } from '../../../store/ViewPicturesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { IFile, IMessage, IUserInfo, TypeSetState, userID } from '../../types/data'
import { convertDate } from '../../utils/convertDate'


interface propsMessageCard{
  companionID:userID
  message:IMessage
  setValue:TypeSetState<string>
  setIsEditing:TypeSetState<boolean>
  setMessageEditing:TypeSetState<IMessage | undefined>,
}

const MessageCard:FC<propsMessageCard> = memo(({
  message,
  message:{date,fromUserID,text,id,state},
  setValue,
  setIsEditing,
  setMessageEditing,
  companionID
}) => {

  const {userID} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const messageDate = convertDate('hours/min',date)
  
  const deleteMessageFunc = () => {
      dispatch(deleteMessage({companionID,id,userID}))
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
              {messageDate}
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