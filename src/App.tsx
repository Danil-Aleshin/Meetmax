import {FC, useEffect} from 'react'
import './components/ui/SwiperMainStyles.scss'
import Layout from './components/layout/Layout'
import { useAppSelector } from './components/hooks/appRedux'
import'./App.scss'
import { Route, Routes } from 'react-router-dom'
import Registration from './components/pages/auth/Registration'
import Login from './components/pages/auth/Login'
import RequireAuth from './components/hoc/RequierAuth'

const App:FC = () => {
  
  const {isAuth} = useAppSelector(state=> state.auth)
  const {theme} = useAppSelector(state => state.theme)

  
  useEffect(() => {
   const root = window.document.documentElement
   root.className = ""
   root.classList.add(theme)

  }, [theme])

  useEffect(() => {
    if (!isAuth) {
      document.body.style.overflow = "auto"
    }else{
      document.body.style.overflow = "hidden"
    }
  }, [isAuth])
  
  return (
    <>
      <div className="container">
        <Routes>
          <Route path='/*' element={
          <RequireAuth>
            <Layout/>
          </RequireAuth>
        }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
        </div>
    </>
  )
}

export default App