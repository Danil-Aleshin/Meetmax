import React, { FC } from 'react'
import { TypeSetState } from '../../types/data'
import './SwitchBtn.scss'

interface propsSwitchBtn{
  state:boolean,
  setState:TypeSetState<boolean>
}

const SwitchBtn:FC<propsSwitchBtn> = ({state,setState}) => {

  return (
    <div 
      onClick={()=>setState(!state)} 
      className={state ? 'switch-btn active' : "switch-btn"}
    >
    </div>
  )
}

export default SwitchBtn