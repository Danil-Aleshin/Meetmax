import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/appRedux'

interface propsRequireAuth{
  children:JSX.Element
}
const RequireAuth:React.FC<propsRequireAuth> = ({children}) => {

  const location = useLocation()

  const {isAuth} = useAppSelector(state => state.auth)


  if (!isAuth) {

    return <Navigate to="/login"/>
  }

  return children
}

export default RequireAuth