import React, { FC } from 'react'
import { userID } from '../../types/data'

interface propsOptionsMenuItem{
  Icon?:any,
  title:string,
  onClick:() => void
}

const OptionsMenuItem:FC<propsOptionsMenuItem> = ({
  title,
  Icon,
  onClick
}) => {
  return (
    <li onClick={onClick} className='options-menu__item'>
      {Icon && <Icon className='w-5.5 text-blue flex-shrink-0' />}
      <p className='whitespace-nowrap'>{title}</p>
    </li>
  )
}

export default OptionsMenuItem