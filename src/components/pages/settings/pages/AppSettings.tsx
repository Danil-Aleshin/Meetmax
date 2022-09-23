import { SunIcon,MoonIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import { switchTheme } from '../../../../store/ThemeSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/appRedux'
import SwitchBtn from '../../../ui/switchBtn/SwitchBtn'

const AppSettings:FC = () => {


  const {theme} = useAppSelector(state => state.theme)
  const [themeState, setThemeState] = useState(theme === "dark" ? true : false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    themeState ? dispatch(switchTheme("dark")) : dispatch(switchTheme("light"))
  }, [themeState])
  
  return (
    <>
      <div className="mb-8">
        <h1 className='text-xl font-bold'>Application settings</h1>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className='text-lg ml-5'>Theme</h2>
        <div className="flex gap-1.5 items-center">
          <SunIcon className='w-7 text-yellow transition-colors dark:text-blue'/>
          <SwitchBtn state={themeState} setState={setThemeState}/>
          <MoonIcon className='w-6 text-blue transition-colors dark:text-white'/>
        </div>
      </div>
    </>
  )
}

export default AppSettings