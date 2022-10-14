import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../../firebaseConfig'
import { getHostUser } from '../../../store/AuthenticationSlice'
import { setIsLoading } from '../../../store/PreloaderSlice'
import { IUserInfo } from '../../types/data'
import { useAppDispatch, useAppSelector } from '../appRedux'

const useHostUser = () => {
  const {isAuth,userID} = useAppSelector(state=> state.auth)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (isAuth) {
      return onSnapshot(doc(db, "users", userID), (doc) => {
        const user = doc.data() as IUserInfo
        dispatch(getHostUser(user))
        dispatch(setIsLoading(false))
      });
    }
  }, [isAuth])

  return {
    
  }
}

export default useHostUser