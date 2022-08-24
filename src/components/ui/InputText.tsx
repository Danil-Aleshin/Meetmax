import React, { FC, memo } from 'react'

interface IInputForm{
  Icon?:any
  className?:string,
  placeholder?:string,
  value:string,
  onChange:(e:React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement>)=>void,
}

const InputText:FC<IInputForm> = memo(({Icon,placeholder,className,value,onChange}) => {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="w-5 absolute left-4 top-2.5"/>}
      <input
        value={value}
        onChange={onChange}
        type="text"
        className={"rounded-xl outline-none font-normal h-10 " + className}
        placeholder={placeholder}
      />
  </div>
  )
})

export default InputText