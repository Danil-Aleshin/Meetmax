import { collection, doc, limit, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { ICommunity, IUserInfo, userID } from '../../types/data'
import { useAppSelector } from '../appRedux'

const useFollowers = (userID:userID) => {
  const [followers, setFollowers] = useState<ICommunity[]>([])

  useEffect(() => {
    return onSnapshot(query(collection(db, "followers",userID,"data")), 
    (snapshotFriends) =>{
      setFollowers([])
      snapshotFriends.forEach((doc) =>{
        setFollowers(prev => [...prev,doc.data() as ICommunity])
      })
    })
  }, [userID])
  
  return {
    followers
  }
}

export default useFollowers