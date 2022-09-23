import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/appRedux'

const MainLogo:FC = () => {
  const {theme} = useAppSelector(state => state.theme)
  return (
    <Link to="/" className="flex-shrink-0">
      <img width={145} src={theme === "light"?"/img/logos/mainLogo.jpg" : "/img/logos/mainLogoDark.png"} alt="meetmax" />
    </Link>
  )
}

export default MainLogo