import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/appRedux'

interface propsRequireAuth{
  children:JSX.Element
}

const RequireAuth:FC<propsRequireAuth> = ({children}) => {

  const {isAuth} = useAppSelector(state => state.auth)

  if (!isAuth) {
    return <Navigate to={'/login'}/>
  }

  return (
    children
  )
}

export default RequireAuth