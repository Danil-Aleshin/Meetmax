import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/appRedux'
import useChats from '../hooks/requestsHooks/useChats'
import useHostUser from '../hooks/requestsHooks/useHostUser'
import Friends from '../pages/friends/Friends'
import Home from '../pages/home/Home'
import Messages from '../pages/messages/Messages'
import MyCommunity from '../pages/myCommunity/MyCommunity'
import Profile from '../pages/profile/Profile'
import Settings from '../pages/settings/Settings'
import Preloader from '../ui/Preloader'
import ViewPicturesWindow from '../ui/ViewPicturesWindow'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'



const Layout:FC = () => {

  const {isLoading} = useAppSelector(state => state.preloader)
  
  const user = useHostUser()
  const {chatsOptions} = useChats()
  

  return isLoading ? <Preloader/> : (
    <>
      <div className="table">
        <Sidebar/>
          <Header/>
          <main className={"mainContent"}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='friends' element={<Friends/>}/>
            <Route path='my-community/*' element={<MyCommunity/>}/>
            <Route path='messages/*' element={<Messages chatsOptions={chatsOptions}/>}/>
            <Route path='settings/*' element={<Settings/>}/>
            <Route path=':id' element={<Profile/>}/>
          </Routes>
        </main>
      </div>
    <ViewPicturesWindow/>
  </>
  )
}

export default Layout