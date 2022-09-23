import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface propsSettingsItem{
  Icon?:any,
  title:string,
  to:string,
}

const SettingsItem:FC<propsSettingsItem> = ({
  Icon,
  title,
  to,
}) => {
  const setActiveSettingsLink = ({ isActive }:any):string => isActive ?
  'nav-settings__link active--link' : 'nav-settings__link'

  
  return (
    <NavLink to={to} className={setActiveSettingsLink}>
      {Icon && <Icon className="settings__icon"/>}
      <p className='settings__title'>{title}</p>
    </NavLink>
  )
}

export default SettingsItem