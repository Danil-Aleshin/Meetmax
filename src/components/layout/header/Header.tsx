import { LogoutIcon, SearchIcon } from '@heroicons/react/outline'
import {FC, useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { fetchSignOut } from '../../../store/AuthenticationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import AuthorImg from '../../ui/UserImg'
import InputText from '../../ui/InputText'
import MainLogo from '../../ui/MainLogo'
import './Header.scss'
import ContentBlock from '../../ui/ContentBlock'

const Header:FC = () => {

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)

  const {currentUser} = useAppSelector(state => state.users)
  const {userID} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()


  const optionsMenuBtn = useRef<any>(null)
  

  useEffect(() => {
    document.addEventListener("click",closeOptionsMenu)
    return ()=> document.removeEventListener("click",closeOptionsMenu)
  }, [])


  const closeOptionsMenu = (e:any) =>{

    if (!optionsMenuBtn.current.contains(e.target)
    && e.target.id !== "profileBlock") {
      setOptionsMenuActive(false)
    }
  }

  const logout = () =>{
    let shure = window.confirm("Are you sure?");
    if (shure) {
      dispatch(fetchSignOut())
    }
  }
  
  const plug = () =>{

  }
  const search = useInput(plug,"")

  

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
          onKeyDown={search.onKeyDown}
        />
      </div>
      <div
        className="profile-block"
        id='profileBlock'
        onClick={()=>setOptionsMenuActive(!optionsMenuActive)}
        ref={optionsMenuBtn}
      >
        <div>
        <AuthorImg
          src={currentUser.profileImg}
          width={"40"}
          className="h-10"
        />
        </div>
        <ContentBlock className={optionsMenuActive 
          ? 'profile__menu profile__menu--active'
          : "profile__menu"
        }
        >
          <ul className='flex flex-col gap-3.5'>
            <li className='w-39'>
              <Link 
                to={`/${currentUser.userID}`} 
                className='flex gap-2 items-center'
              >
                <AuthorImg
                  src={currentUser.profileImg}
                  width={"40"}
                  className="h-10"
                />
                <p>{currentUser.firstName + " " +currentUser.lastName}</p>
              </Link>
            </li>
            <li onClick={()=>logout()} className='flex gap-2 items-center'>
              <LogoutIcon className='w-5.5 text-blue'/>
              <p>Logout</p>
            </li>
          </ul>
        </ContentBlock>
      </div>
    </header>
  )
}

export default Header