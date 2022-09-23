import { FC } from 'react';
import { useAppSelector } from '../hooks/appRedux';


const Preloader:FC = () => {

  const {preloaderShowing} = useAppSelector(state => state.preloader)
  const {theme} = useAppSelector(state => state.theme)

  return (
      <div className="absolute w-full h-full bg-white dark:bg-darkBlue flex justify-center items-center z-50">
        <div className='w-fit animate-spin'>
          <img src={theme === "light"?"/img/logos/preloader.png" : "/img/logos/preloaderDark.png"} width={100} alt="" />
        </div>
      </div>
  )
}

export default Preloader