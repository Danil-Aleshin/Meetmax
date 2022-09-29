import {FC, useEffect} from 'react'
import Preloader from './components/ui/Preloader'
import './components/ui/SwiperMainStyles.scss'
import Auth from './components/pages/auth/Auth'
import Layout from './components/layout/Layout'
import { useAppSelector } from './components/hooks/appRedux'
import'./App.scss'

const App:FC = () => {
  
  const {isAuth} = useAppSelector(state=> state.auth)
  const {theme} = useAppSelector(state => state.theme)

  
  useEffect(() => {
   const root = window.document.documentElement
   root.className = ""
   root.classList.add(theme)

  }, [theme])

  return (
    <>
      <div className="container">
          {isAuth 
            ? <Layout/>
            : <Auth/>
          }
        </div>
    </>
  )
}

export default App