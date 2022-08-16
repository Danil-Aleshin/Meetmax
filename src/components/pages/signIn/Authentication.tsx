import { AtSymbolIcon, KeyIcon } from '@heroicons/react/outline'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAuthentication } from '../../../store/AuthenticationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { authValue } from '../../types/data'
import AuthPageContainer from '../../ui/AuthPageContainer'
import Button from '../../ui/Button'
import InputAuth from '../../ui/InputAuth'


const Authentication:FC = () => {

  const {isAuth} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const {
    register,
    formState:{errors},
    reset,
    handleSubmit,
  } = useForm<authValue>({
    mode:'onBlur'
  })

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuth) {
      navigate("/")
    }
  }, [isAuth])
  

  const authentication:SubmitHandler<authValue> = (data) =>{
    const password = data.password
    const email = data.email
    dispatch(fetchAuthentication({password,email}))
    reset()
  }
  return (
    <AuthPageContainer 
      title='Authorization' 
      subtitle='Log in to your account to continue.'
    >
      <form
        className='flex flex-col items-center gap-4' 
        onSubmit={handleSubmit(authentication)}
      >
        
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
          Icon={KeyIcon} 
          placeholder='Your Password'
          name='password'
          register={register}
          error={errors.password}
          required="Password is require field!"
          regExp={/(?=^.{1,}$)/}
          regExpError={"Enter valid password"}
        />
        
        <Button title='Sign in' className='w-full'/>
        <div className="flex gap-4">
          <p>No account?</p>
          <Link to="/registration" className='text-lightBlue'>Sign up</Link>
        </div>
      </form>
    </AuthPageContainer>
  )
}

export default Authentication
