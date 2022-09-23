import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState,useRef } from 'react'
import { favoriteChat } from '../../../store/ChatSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IChat, IChatData } from '../../types/data'
import Chat from './pages/Chat'
import MessagePreviewCard from './ChatPreviewCard'
import "./Messages.scss"
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/Chats'
const Messages:FC = () => {
  const [aboutUserMenu, setAboutUserMenu] = useState(false)

  const {chats} = useAppSelector(state => state.chats)
  const {allUsers,currentUser:{userID}} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()


  return (
    <>
      <Routes>
        <Route path='/' element={
          <Chats/>}
        />
        <Route path='/:companionID' element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default Messages