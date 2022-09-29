import React, { FC } from 'react'
import MainLogo from './MainLogo'

interface propsAuthPageContainer{
  children:JSX.Element,
  title:string,
  subtitle:string
}
const AuthPageContainer:FC<propsAuthPageContainer> = ({children,subtitle,title}) => {
  return (
    <div>
      <header className='p-3 flex items-center justify-between'> 
        <MainLogo/>
        <select className="py-1.5 px-5 rounded-md cursor-pointer outline-none bg-lightGray dark:bg-darkBlue">
          <option value="English(US)">English(US)</option>
        </select>
      </header>
      <div className="block mx-auto w-fit mt-20 flex flex-col gap-3 items-center">
        <h1 className='text-3xl text-center'>{title}</h1>
        <p className='text-center'>{subtitle}</p>
      </div>
      <div className="p-8 bg-lightGray max-w-2xl dark:bg-darkBlue mx-auto mt-9 rounded-2xl">
        {children}
      </div>
    </div>
  )
}

export default AuthPageContainer