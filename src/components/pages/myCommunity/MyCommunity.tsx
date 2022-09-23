import { FC } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import ContentBlock from '../../ui/ContentBlock'
import './MyCommunity.scss'
import Followers from './pages/Followers'
import Following from './pages/Following'

const MyCommunity:FC = () => {

  const {
    currentUserFollowers,
    currentUserFollowing,
  } = useAppSelector(state => state.followers)

  const setActiveLink = ({ isActive }:any):string => {
   return isActive ?'community__item community__item--active' : 'community__item'
  }

  return (
    <div className='flex flex-col gap-6 h-full'>
      <ContentBlock>
        <div className='w-full flex justify-around items-center'>
          <NavLink to={"/my-community/followers"} className={setActiveLink}>
            <p className='text'>{currentUserFollowers.length} Followers</p>
          </NavLink>
          <NavLink to={"/my-community/following"} className={setActiveLink}>
            <p className='text'>{currentUserFollowing.length} Following</p>
          </NavLink>
        </div>
      </ContentBlock>
      <div className='h-full w-full'>
        <ul className='profile-card__list'>
          <Routes>
            <Route path='/followers' element={<Followers/>}/>
            <Route path='/following' element={<Following/>}/>
          </Routes>
        </ul>
      </div>
    </div>
  )
}

export default MyCommunity