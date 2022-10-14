import { ArrowLeftOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {FC, useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { fetchSignOut } from '../../../store/AuthenticationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import InputText from '../../ui/InputText'
import MainLogo from '../../ui/MainLogo'
import './Header.scss'
import ContentBlock from '../../ui/ContentBlock'
import UserImg from '../../ui/UserImg'

const Header:FC = () => {

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)

  const {hostUser} = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()


  const optionsMenuBtn = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    document.addEventListener("click",closeOptionsMenu)
    return ()=> document.removeEventListener("click",closeOptionsMenu)
  }, [])


  const closeOptionsMenu = (e:any) =>{

    if (!optionsMenuBtn.current?.contains(e.target)
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
  
  const search = useInput("")

  

  return (
    <header className='header'>
      <div className="flex gap-16 items-center w-full">
        <MainLogo/>
        {
          window.screen.width > 600 &&
          <InputText 
            Icon={MagnifyingGlassIcon}
            placeholder='Search for something here... (DntWrk)'
            className='global-search'
            value={search.value}
            onChange={search.onChange}
            onKeyDown={search.onKeyDown}
          />
        }
      </div>
      <div
        className="profile-block"
        id='profileBlock'
        onClick={()=>setOptionsMenuActive(!optionsMenuActive)}
        ref={optionsMenuBtn}
      >
        <div>
        <UserImg
          src={hostUser.profileImg.link}
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
                to={`/${hostUser.userID}`} 
                className='flex gap-2 items-center'
              >
                <UserImg
                  src={hostUser.profileImg.link}
                  width={"40"}
                  className="h-10"
                />
                <p>{`${hostUser.firstName} ${hostUser.lastName}`}</p>
              </Link>
            </li>
            <li onClick={()=>logout()} className='flex gap-2 items-center'>
              <ArrowLeftOnRectangleIcon className='w-5.5 text-blue'/>
              <p>Logout</p>
            </li>
          </ul>
        </ContentBlock>
      </div>
    </header>
  )
}

export default Header