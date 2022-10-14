import { doc, onSnapshot } from 'firebase/firestore'
import {useState,useEffect} from 'react'
import { db } from '../../../firebaseConfig'
import { IUserInfo, userID } from '../../types/data'

const 
useProfile = (userID:userID) => {

  const [userInfo, setUserInfo] = useState<IUserInfo>()

  useEffect(() => {
    return onSnapshot(doc(db, "users", userID), (doc:any) => {
    const userData = doc.data() as IUserInfo
    setUserInfo(userData)
  })
  }, [userID])
  
  return {
    userInfo
  }
}

export default useProfile