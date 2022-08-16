import { PaperAirplaneIcon } from '@heroicons/react/outline'
import React, { FC, memo } from 'react'
import './AddMessageBtn.scss'
interface propsAddMessageBtn{
  onClick:()=> void
}
const AddMessageBtn:FC<propsAddMessageBtn> = memo(({onClick}) => {

  return (
    <button onClick={()=>onClick()} className='add-message__btn'>
      <PaperAirplaneIcon className='paper-icon'/>
    </button>
  )
})

export default AddMessageBtn