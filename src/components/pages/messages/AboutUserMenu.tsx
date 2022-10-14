import { StarIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteChat, favoriteChat } from '../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { IUserInfo, TypeSetState, userID } from '../../types/data'
import ContentBlock from '../../ui/ContentBlock'
import ModalWindow from '../../ui/modalWindow/ModalWindow'
import UserImg from '../../ui/UserImg'

interface propsAboutUserMenu{
  userInfo?:IUserInfo,
  state:boolean,
  setState:TypeSetState<boolean>
  favorite?:boolean,
  chatCompanionID?:userID,
}

const AboutUserMenu:FC<propsAboutUserMenu> = ({
  userInfo,
  setState,
  state,
  favorite,
  chatCompanionID
}) => {

  
  const {userID} = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const changeFavoriteStatus = () =>{
    const isFavorite = favorite ? false : true
    const companionID = chatCompanionID ? chatCompanionID : ""
    dispatch(favoriteChat({companionID,isFavorite,userID}))
  }

  const deleteChatFunc = () =>{
    const companionID = chatCompanionID ? chatCompanionID : ""
    dispatch(deleteChat({userID,companionID}))
    navigate('/messages')
  }

  return (
    <ModalWindow setState={setState} state={state}>
      <div className={state ?'about-user-menu about-user-menu--active' : "about-user-menu"}>
        <div className="flex flex-col items-center gap-4 p-3 mt-7">
          <div className=" flex flex-col gap-1.5 items-center">
            <UserImg
              width='56'
              className='h-14'
              src={userInfo?.profileImg.link}
            />
            <p>{`${userInfo?.firstName} ${userInfo?.lastName}`}</p>
          </div>
          <button onClick={()=>changeFavoriteStatus()} className='w-10 h-10 rounded-lg bg-lightGray dark:bg-lightBlack flex items-center justify-center flex-shrink-0'>
            <StarIcon className={favorite ?'text-green w-4.5' : 'text-blue w-4.5 dark:text-superLightGray'}/>
          </button>
          <ContentBlock>
            <ul className='flex flex-col gap-2'>
              <li className='flex gap-1.5 items-center cursor-pointer' onClick={()=>deleteChatFunc()}>
                <TrashIcon className='icon w-5.5'/>
                <p className=''>Delete chat</p>
              </li>
            </ul>
          </ContentBlock>
        </div>
      </div>
    </ModalWindow>
  )
}

export default AboutUserMenu