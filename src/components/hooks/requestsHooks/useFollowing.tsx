import { collection, doc, limit, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { ICommunity, IUserInfo, userID } from '../../types/data'

const useFollowing = (userID:userID) => {

  const [following, setFollowing] = useState<ICommunity[]>([])

  useEffect(() => {
    return onSnapshot(query(collection(db, "following",userID,"data")), 
    (snapshotFriends) =>{
        setFollowing([])
        snapshotFriends.forEach((doc) =>{
          setFollowing(prev => [...prev,doc.data() as ICommunity])
        })
      })
  }, [userID])
  
  return {
    following
  }
}

export default useFollowing