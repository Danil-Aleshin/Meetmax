import { collection, doc, getDoc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { setIsLoading } from '../../../store/PreloaderSlice'
import { ICommunity, userID } from '../../types/data'

const useFriends = (
  userID:userID,
) => {
  const [friends, setFriends] = useState<ICommunity[]>([])

  useEffect(() => {
    return onSnapshot(query(collection(db, "friends",userID,"data")), 
    (snapshotFriends) =>{
      setFriends([])
      snapshotFriends.forEach((doc) =>{
        setFriends(prev => [...prev,doc.data() as ICommunity])
      })
    })
  }, [userID])
  
  return {friends}
}

export default useFriends