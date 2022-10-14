import React, { FC, memo } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { authValue } from '../types/data'



interface propsInputAtuh{
  Icon?:any,
  register:UseFormRegister<authValue>
  name: "email"|"password"|"phoneNumber"|"firstName"|"lastName" | "location" ,
  placeholder:string,
  error?:FieldError,
  required?:string,
  regExp:RegExp,
  regExpError?:string,
  defaultValue?:string | number,
  className?:string,
  disabled?:boolean,
}
const InputAuth:FC<propsInputAtuh> = memo(({
  Icon,
  register,
  name,
  placeholder,
  error,
  required = "",
  regExp,
  regExpError = "",
  defaultValue,
  className,
  disabled
}) => {
  return (
    <div className={"w-full " + className}>
      {error && <div className='text-red text-sm p-1 dark:text-red'>{error.message}</div>}
      <div className="relative">
        {Icon && <Icon className='w-5 absolute top-3.3 left-3'/>}
        <input
          disabled={disabled}
          defaultValue={defaultValue}
          className='h-11 px-10 border-2 border-superLightGray dark:border-inputBorderBlue outline-none rounded-lg w-full'
          placeholder={placeholder}
          {...register(name,
            {
              required:required,
              pattern:{
                value:regExp,
                message:regExpError
              }
            })} 
        />
      </div>
    </div>
  )
})

export default InputAuth