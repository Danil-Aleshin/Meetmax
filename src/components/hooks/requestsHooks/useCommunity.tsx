import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { userID } from '../../types/data'

const useCommunity = (
  collection:"friends" | "followers" | "following" | "friendRequests" | "myFriendRequests",
  forUserID:userID,
  serchedUserID:userID
) => {

  const [state, setState] = useState(false)

  useEffect(() => {
    return onSnapshot(doc(db, collection, forUserID, "data",serchedUserID), (doc) => {
      doc.data() ? setState(true) : setState(false)
    });
  }, [serchedUserID,forUserID,collection])
  

  return state
}

export default useCommunity