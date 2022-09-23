import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentBlock from '../../ui/ContentBlock'
import FriendsRequests from './pages/FriendsRequests'
import MyFriendsList from './pages/MyFriendsList'

const Friends:FC = () => {


  return (
    <ContentBlock className='w-full h-full'>
      <>
        <Routes>
          <Route path='/' element={<MyFriendsList/>}/>
          <Route path='/friends-requests' element={<FriendsRequests/>}/>
        </Routes>
      </>
    </ContentBlock>
  )
}

export default Friends