import { collection, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import {useEffect,useState} from 'react'
import { db } from '../../../firebaseConfig'
import { IChat, IChatOptions, IMessage } from '../../types/data'
import { useAppSelector } from '../appRedux'

const useChats = () => {
  const [chatsOptions, setChatsOptions] = useState<IChatOptions[]>([])

  const {userID} = useAppSelector(state => state.auth)

  useEffect(() => {
    return onSnapshot(query(collection(db, "chats",userID,"companion")), 
    (querySnapshot) =>{
      setChatsOptions([])
      querySnapshot.forEach((doc) => {
        setChatsOptions(prev => [...prev,doc.data() as IChatOptions])
      })
    })
  }, [])

  return {chatsOptions}
}

export default useChats
