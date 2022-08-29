import React, { FC } from 'react'

interface propsUserImg{
  width:string,
  className?:string,
  src?:string,
  alt?:string,
}

const UserImg:FC<propsUserImg> = ({
  className,
  src,
  width,
  alt
}) => {
  return (
    <img 
      src={src}
      width={width}
      className={"rounded-full " + className} alt={alt}
    />
  )
}

export default UserImg