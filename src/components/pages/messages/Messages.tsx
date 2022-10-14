import { FC, useEffect,useState} from 'react'
import Chat from './pages/Chat'
import "./Messages.scss"
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/Chats'
import { IChat, IChatOptions, IUserInfo } from '../../types/data'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'

interface propsMessages{
  chatsOptions:IChatOptions[]
}

const Messages:FC<propsMessages> = ({chatsOptions}) => {

  return (
    <>
      <Routes>
        <Route path='/' element={
          <Chats chatsOptions={chatsOptions}/>}
        />
        <Route path='/:companionID' element={<Chat chatsOptions={chatsOptions}/>}/>
      </Routes>
    </>
  )
}

export default Messages