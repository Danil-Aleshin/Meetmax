import { FC } from 'react';
import { useAppSelector } from '../hooks/appRedux';


const Preloader:FC = () => {

  const {preloaderShowing} = useAppSelector(state => state.preloader)

  return (
      <div className="absolute w-full h-full bg-white dark:bg-darkBlue flex justify-center items-center z-50">
        <div className='w-fit animate-spin'>
          <img src="/img/prelogo.png" width={100} alt="" />
        </div>
      </div>
  )
}

export default Preloader