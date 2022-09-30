import { AtSymbolIcon, LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import  { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegistration, resetError } from '../../../store/AuthenticationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux';
import { authValue } from '../../types/data';
import AuthPageContainer from '../../ui/AuthPageContainer';
import Button from '../../ui/Button';
import InputAuth from '../../ui/InputAuth';
import RadioBtn from '../../ui/radioBtn/RadioBtn';




const Registration:FC = () => {

  const [gender, setGender] = useState("male")
  const {isAuth} = useAppSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<authValue>({
    mode:'onBlur'
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetError())
  }, [])

  
  useEffect(() => {
    if (isAuth) {
      navigate("/")
    }
  }, [isAuth])
  
  const registration:SubmitHandler<authValue> = (data) =>{
    const email = data.email
    const password = data.password
    const firstName = data.firstName
    const lastName = data.lastName
    const phoneNumber = data.phoneNumber

    dispatch(fetchRegistration({email,firstName,gender,lastName,password,phoneNumber}))
    reset()
    navigate("/login")
  }

  return (
    <AuthPageContainer subtitle='Create an account to continue and connect with people.' title='Getting Started'>
      <form className='flex flex-col items-center gap-4' onSubmit={handleSubmit(registration)}>
        <InputAuth 
          Icon={AtSymbolIcon} 
          placeholder='Your Email'
          name='email'
          register={register}
          error={errors.email}
          required="Email is require field!"
          regExp={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
          regExpError={"Enter valid email"}
        />
        <InputAuth 
          Icon={UserIcon} 
          placeholder='Your First Name'
          name='firstName'
          register={register}
          error={errors.firstName}
          required="First Name is require field!"
          regExp={/(?=.*[a-z])(?=.*[A-Z])/g}
          regExpError={"[A-z]"}
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
        />
        <InputAuth 
          Icon={PhoneIcon} 
          placeholder='Your Phone Number'
          name='phoneNumber'
          register={register}
          error={errors.phoneNumber}
          required="Phone Number is require field!"
          regExp={/(?=^.{11,}$)^[0-9\s]*$/}
          regExpError={"[0-9] 11 characters"}
        />
        <InputAuth 
          Icon={LockClosedIcon} 
          placeholder='Your password'
          name='password'
          register={register}
          error={errors.password}
          required="Password is require field!"
          regExp={/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g}
          regExpError={"The password must contain [0-9]-[a-z]-[A-Z]-[!@#$%^&*], > 6 characters "}
         />
        <div className="h-11 px-10 border-2 border-superLightGray dark:border-inputBorderBlue rounded-lg w-fit flex gap-10 items-center">
          <RadioBtn defCheck={true} setValue={setGender} id='genderMale' name='gender' title='Male' value='male'/>
          <RadioBtn defCheck={false} setValue={setGender} id='genderFemale' name='gender' title='Female' value='female'/>
        </div>
        <Button title='Sign up' className='w-full'/>
        <div className="flex gap-4">
          <p>Already have an account?</p>
          <Link to="/login" className='text-lightBlue dark:text-lightBlue'>Sign in</Link>
        </div>

      </form>
    </AuthPageContainer>
  )
}

export default Registration