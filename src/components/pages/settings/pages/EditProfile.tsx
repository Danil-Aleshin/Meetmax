import { CakeIcon, MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { editProfile, changeProfileImg } from '../../../../store/EditProfileSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/appRedux'
import { authValue } from '../../../types/data'
import Button from '../../../ui/Button'
import InputAuth from '../../../ui/InputAuth'
import UserImg from '../../../ui/UserImg'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const EditProfile = () => {

  const {currentUser,currentUser:{
    userID,
    dateOfBirthday
  },
  } = useAppSelector(state => state.users)
  const [startDate, setStartDate] = useState<Date | undefined>(dateOfBirthday?.toDate())
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<authValue>({
    mode:'onBlur'
  })


  const uploadImg = (e:any) =>{
    const newImg = e.target.files[0]
    newImg.path = `profileImages/${userID}`
    newImg.link = ""
    const currentImg = currentUser.profileImg
    dispatch(changeProfileImg({newImg,userID,currentImg}))
  }
  console.log()
  const editProfileFunc:SubmitHandler<authValue> = (data) => {

    const newLocation = data.location === currentUser.location 
    ? undefined 
    : data.location

    const newFirstName = data.firstName === currentUser.firstName 
    ? undefined 
    : data.firstName

    const newLastName = data.lastName === currentUser.lastName 
    ? undefined 
    : data.lastName

    const newPhoneNumber = data.phoneNumber === currentUser.phoneNumber 
    ? undefined 
    : data.phoneNumber

    const newDateOfBirthday = startDate === dateOfBirthday 
    ? undefined 
    : startDate !== null ? startDate : null

    dispatch(editProfile({
      newFirstName,
      newLastName,
      newPhoneNumber,
      newDateOfBirthday,
      userID,
      newLocation
    }))

  }
  const cancle = () =>{
    navigate("/")
  }
  return (
    <>
      <div className="">
        <h2 className='text-xl font-bold'>Edit Profile</h2>
        <div className="profile__img h-32 mt-7 w-32">
            <UserImg
              className='h-full'
              width='128'
              src={currentUser.profileImg.link}
            />
            <label className='new-img' htmlFor='newImgBtn'></label>
            <input 
              type={"file"}
              id="newImgBtn"
              onChange={(e:any)=>uploadImg(e)}
              className="hidden"
              accept="image/jpeg, image/png"
            />
          </div>
      </div>
      <div className="mt-9">
      <form className='flex flex-col flex-wrap items-center gap-4' onSubmit={handleSubmit(editProfileFunc)}>
        <InputAuth
          Icon={UserIcon}
          placeholder='Your First Name'
          name='firstName'
          register={register}
          error={errors.firstName}
          required="First Name is require field!"
          regExp={/(?=.*[a-z])(?=.*[A-Z])/g}
          regExpError={"[A-z]"}
          defaultValue={currentUser.firstName}
          className="w-72"
        />
        <InputAuth
          Icon={UserIcon}
          placeholder='Your Last Name'
          name='lastName'
          register={register}
          error={errors.lastName}
          required="Last Name is require field!"
          regExp={/(?=.*[a-z])(?=.*[A-Z])/g}
          regExpError={"[A-z]"}
          defaultValue={currentUser.lastName}
          className="w-72"

        />
        <InputAuth
          Icon={PhoneIcon}
          placeholder='Your P]hone Number'
          name='phoneNumber'
          register={register}
          error={errors.phoneNumber}
          required="Phone Number is require field!"
          regExp={/(?=^.{11,}$)^[0-9\s]*$/}
          regExpError={"[0-9] 11 characters"}
          defaultValue={currentUser.phoneNumber}
          className="w-72"
        />
        <InputAuth
          Icon={MapPinIcon}
          placeholder='Your City'
          name='location'
          register={register}
          error={errors.location}
          required=""
          regExp={/(?=.*[a-z])(?=.*[A-Z])/g}
          regExpError={"123"}
          defaultValue={currentUser.location}
          className="w-72"
        />
        <div className="relative w-72">
          <DatePicker 
            className='w-full px-10 h-11 border-2 border-superLightGray dark:border-inputBorderBlue outline-none rounded-lg'
            calendarStartDay={2} 
            selected={startDate} 
            onChange={(date:Date) => setStartDate(date)}
            dateFormat={"dd/MM/yyy"}
            scrollableYearDropdown
            showYearDropdown
          >
          </DatePicker>
          <CakeIcon className='w-5 absolute top-3.3 left-3'/>
        </div>
        <div className="flex gap-1.5">
          <Button title='Cancle' onClickFunc={cancle} className=''/>
          <Button title='Save' className=''/>
        </div>
      </form>
      </div>
    </>
  )
}

export default EditProfile