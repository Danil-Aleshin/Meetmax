import { SearchIcon } from '@heroicons/react/outline'
import {FC} from 'react'
import { Link } from 'react-router-dom'
import { fetchSignOut } from '../../../store/AuthenticationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import InputText from '../../ui/InputText'
import MainLogo from '../../ui/MainLogo'
import './Header.scss'

const Header:FC = () => {

  const search = useInput()

  const {currentUser} = useAppSelector(state => state.users)
  const {userID} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const logout = () =>{
    let shure = window.confirm("Are you sure?");
    if (shure) {
      dispatch(fetchSignOut())
    }
  }
  return (
    <header className='header'>
      <div className="flex gap-16 items-center">
        <MainLogo/>
        <InputText 
          Icon={SearchIcon}
          placeholder='Search for something here...'
          className='w-150 border px-11 border-superLightGray dark:bg-lightBlack'
          value={search.value}
          onChange={search.onChange}
        />
      </div>
      <button onClick={()=>logout()}>Выйти</button>
      <div className="profile-block">
        <div className="profile__name">{currentUser.firstName + " " + currentUser.lastName}</div>
        <Link to={`/${userID}`}>
          <img className='rounded-xl h-10' width={40} height={40} src={currentUser.profileImg} alt="profile" />
        </Link>
      </div>
    </header>
  )
}

export default Header