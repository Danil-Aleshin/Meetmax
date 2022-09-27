import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/appRedux'

const MainLogo:FC = () => {
  const {theme} = useAppSelector(state => state.theme)
  
  const generateLink = ():string =>{
    if (window.screen.width > 768 && theme === "light") {
      return "/img/logos/mainLogo.jpg"
    }else if (window.screen.width > 768 && theme === "dark") {
      return "/img/logos/mainLogoDark.png"
    }else if (window.screen.width < 768 && theme === "light") {
      return "/img/logos/preloader.png"
    }else if (window.screen.width < 768 && theme === "dark") {
      return "/img/logos/mainLogoMobileDark.png"
    }else{
      return ""
    }
  }

  return (
    <Link to="/" className="flex-shrink-0">
      <img width={window.screen.width > 768 ? 150 : 45} src={generateLink()} alt="meetmax" />
    </Link>
  )
}

export default MainLogo