import { collection, doc, limit, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { ICommunity, IUserInfo, userID } from '../../types/data'

const useFriendReq = (
  userID:userID,
) => {
  
  const [friendReq, setFriendReq] = useState<ICommunity[]>([])

  useEffect(() => {
    return onSnapshot(query(collection(db, "friendRequests",userID,"data")), (snapshotFriends) =>{
      setFriendReq([])
      snapshotFriends.forEach((doc) =>{
        setFriendReq(prev => [...prev,doc.data() as ICommunity])
      })
      
    })
  }, [userID])
  
  return {friendReq}
}

export default useFriendReq