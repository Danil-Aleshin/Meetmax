import React, { FC, memo } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { authValue } from '../types/data'



interface propsInputAtuh{
  Icon:any,
  register:UseFormRegister<authValue>
  name: "email"|"password"|"phoneNumber"|"firstName"|"lastName",
  placeholder:string,
  error?:FieldError,
  required:string,
  regExp:RegExp,
  regExpError:string
}
const InputAuth:FC<propsInputAtuh> = memo(({
  Icon,
  register,
  name,
  placeholder,
  error,
  required,
  regExp,
  regExpError
}) => {
  return (
    <div className="w-full">
      {error && <div className='text-red text-sm p-1'>{error.message}</div>}
      <div className="relative">
        <Icon className='w-5 absolute top-3 left-3'/>
        <input 
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