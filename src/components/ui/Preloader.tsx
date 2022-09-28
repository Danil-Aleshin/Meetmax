import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setIsLoading } from '../../store/PreloaderSlice';
import { useAppDispatch, useAppSelector } from '../hooks/appRedux';


const Preloader:FC = () => {

  const {isLoading} = useAppSelector(state => state.preloader)
  const {theme} = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()
  const location = useLocation()

  // useEffect(() => {
  //   location.pathname === "/login" && dispatch(setIsLoading(false))
    
  // }, [])

  return (
    <>
    {isLoading &&
              <div className="absolute w-full h-full bg-white dark:bg-darkBlue flex justify-center items-center z-50">
              <div className='w-fit animate-spin'>
                <img src={theme === "light"?"/img/logos/preloader.png" : "/img/logos/preloaderDark.png"} width={100} alt="" />
              </div>
            </div>
    }
    </>
  )
}

export default Preloader