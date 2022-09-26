import { FC} from 'react'
import Chat from './pages/Chat'
import "./Messages.scss"
import { Route, Routes } from 'react-router-dom'
import Chats from './pages/Chats'
const Messages:FC = () => {

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