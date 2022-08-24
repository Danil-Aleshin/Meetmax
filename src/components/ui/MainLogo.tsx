import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const MainLogo:FC = () => {
  return (
    <Link to="/" className="flex-shrink-0">
      <img width={145} src="/img/lg.jpg" alt="meetmax" />
    </Link>
  )
}

export default MainLogo