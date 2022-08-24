import React, { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

interface propsNavOption{
  Icon:any,
  path:string,
  title:string,
}
const setActiveLink = ({ isActive }:any):string => isActive ?
  'nav__link active--link' : 'nav__link'

const NavOption:FC<propsNavOption> = memo(({Icon,path,title}) => {
  return (
    <li className='nav__item'>
      <NavLink to={path} className={setActiveLink}>
        <Icon className="nav__icon"/>
        <span className='nav__title'>{title}</span>
      </NavLink>
    </li>
  )
})

export default NavOption