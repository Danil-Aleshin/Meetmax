import React, { FC, memo } from 'react'

interface propsButton{
  title:string,
  onClickFunc?:()=>void,
  className?:string,
}
const Button:FC<propsButton> = memo(({title,onClickFunc,className}) => {
  return (
    <button onClick={onClickFunc} className={'bg-lightBlue text-white rounded-lg text-center px-6.5 py-1.5 border-2 border-lightBlue transition-colors duration-200 hover:text-lightBlue hover:bg-opacity-0 ' + className}>
      {title}
    </button>
  )
})

export default Button