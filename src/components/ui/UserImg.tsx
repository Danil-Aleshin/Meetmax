import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { userID } from '../types/data'

interface propsUserImg{
  width:string,
  className?:string,
  src?:string,
  alt?:string,
}

const UserImg:FC<propsUserImg> = memo(({
  className,
  src,
  width,
  alt,
}) => {
  return (
      <img 
        src={src}
        width={width}
        className={"rounded-full " + className} alt={alt}
      />
  )
})

export default UserImg