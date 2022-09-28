import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { setIsLoading } from '../../../store/PreloaderSlice'
import { useAppDispatch } from '../../hooks/appRedux'
import MainLogo from '../../ui/MainLogo'
import Login from './Login'
import Registration from './Registration'

const Auth = () => {
  
  return (
    <div>
      <header className='p-3 flex items-center justify-between'> 
        <MainLogo/>
        <select className="py-1.5 px-5 rounded-md cursor-pointer outline-none bg-lightGray dark:bg-darkBlue">
          <option value="English(US)">English(US)</option>
        </select>
      </header>
      <div className="block mx-auto w-fit mt-20 flex flex-col gap-3 items-center">
        <h1 className='text-3xl text-center'>REg</h1>
        <p className='text-center'>REg</p>
      </div>
      <div className="p-8 bg-lightGray max-w-2xl dark:bg-darkBlue mx-auto mt-9 rounded-2xl">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Auth

// title='Authorization' 
// subtitle='Log in to your account to continue.'

// title="Getting Started" 
// subtitle="Create an account to continue and connect with people."