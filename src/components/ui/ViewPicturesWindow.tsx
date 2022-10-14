import React, { FC } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { setDeactive } from '../../store/ViewPicturesSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'


const ViewPicturesWindow:FC = ({}) => {

  const {pictures,isActive} = useAppSelector(state => state.viewPictures)
  const dispatch = useAppDispatch()

  const closeViewPictures = (e:any) =>{
    if (e.target.id === "viewPicturesWindow") {
      dispatch(setDeactive())
    }
  }

  return !isActive ? null :(
    <div 
      id="viewPicturesWindow"
      className='absolute top-0 left-0 w-full h-full bg-opacityBlack z-50 overflow-hidden'
      onMouseDown={(e:any)=>closeViewPictures(e)}
    >
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2   flex items-center justify-center bg-lightGray dark:bg-lightBlack h-5/6'>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={0}
          slidesPerView={1}
        >
          {pictures.map(img => 
            <SwiperSlide key={img.name} className='!h-auto flex justify-center  items-center'>
              <img src={img.link} alt="" className='w-full' />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default ViewPicturesWindow