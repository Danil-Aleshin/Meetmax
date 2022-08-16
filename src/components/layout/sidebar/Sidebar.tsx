import React, { FC } from 'react'
import NavOption from './navOption/NavOption'
import { navOptions } from './navOption/NavOptionsData'
import'./Sidebar.scss'

const Sidebar:FC = () => {
  return (
    <aside className="sidebar">
      <ul className='nav__list'>
        {navOptions.map((item,index)=>
        <NavOption
          key={index}
          Icon={item.icon} 
          path={item.path} 
          title={item.title}
        />)}
      </ul>
    </aside>
  )
}

export default Sidebar