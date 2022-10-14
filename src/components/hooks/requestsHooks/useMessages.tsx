import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import {useState,useEffect} from 'react'
import { db } from '../../../firebaseConfig'
import { IMessage, userID } from '../../types/data'
import { useAppSelector } from '../appRedux'

const useMessages = (companionID:userID) => {

  const [messages, setMessages] = useState<IMessage[]>([])

  const {userID} = useAppSelector(state => state.auth)

  useEffect(() => {
    return onSnapshot(query(collection(db, "chats",userID,"companion",companionID,"messages"),orderBy("date","asc")), 
    (querySnapshot) =>{
      setMessages([])
      querySnapshot.forEach((doc) => {
        setMessages(prev => [...prev,doc.data() as IMessage])
      })
    })
  }, [companionID]) 
  
  return {messages}
}

export default useMessages