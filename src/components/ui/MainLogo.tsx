import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const MainLogo:FC = () => {
  return (
    <Link to="/" className="">
      <img width={150} src="/img/logo.png" alt="meetmax" />
    </Link>
  )
}

export default MainLogo