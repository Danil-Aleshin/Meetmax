import {FC, useEffect} from 'react'
import Preloader from './components/ui/Preloader'
import './components/ui/SwiperMainStyles.scss'
import Auth from './components/pages/auth/Auth'
import Layout from './components/layout/Layout'
import { useAppSelector } from './components/hooks/appRedux'
import'./App.scss'

const App:FC = () => {
  
  const {isAuth} = useAppSelector(state=> state.auth)
  const {isLoading} = useAppSelector(state => state.preloader)
  const {theme} = useAppSelector(state => state.theme)

  
  useEffect(() => {
   const root = window.document.documentElement
   root.className = ""
   root.classList.add(theme)

  }, [theme])
  
  console.log(isAuth)
  console.log(isLoading)
  return (
    <>
      <div className="container">
          {isAuth 
            ? isLoading ? <Preloader/> : <Layout/>
            : <Auth/>
          }
        </div>
    </>
  )
}

export default App