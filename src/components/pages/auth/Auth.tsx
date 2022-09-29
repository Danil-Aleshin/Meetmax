import { FC, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import AuthPageContainer from '../../ui/AuthPageContainer'
import NotFoundPage from '../NotFoundPage'
import Login from './Login'
import Registration from './Registration'

const Auth:FC = () => {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    location.pathname === "/" && navigate("/login")
  }, [location])
  
  const title = () =>{
    if (location.pathname === "/login") {
      return 'Authorization'
    }else if(location.pathname === "/registration"){
      return 'Getting Started'
    }else{
      return ""
    }
  }
  const subtitle = () =>{
    if (location.pathname === "/login") {
      return 'Log in to your account to continue.'
    }else if(location.pathname === "/registration"){
      return 'Create an account to continue and connect with people.'
    }else{
      return ""
    }
  }

  return (
    <AuthPageContainer
      title={title()}
      subtitle={subtitle()}
    >
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
    </AuthPageContainer>

  )
}

export default Auth
