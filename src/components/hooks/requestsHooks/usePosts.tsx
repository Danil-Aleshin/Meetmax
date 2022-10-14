import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {useEffect, useState} from 'react'
import { db } from '../../../firebaseConfig';
import { IPost } from '../../types/data';

const usePosts = (userID:string) => {

  const [posts, setPosts] = useState<IPost[]>([])
  
  useEffect(() => {

    return onSnapshot(query(collection(db, "posts", userID,"data"),orderBy("date",'desc')), (querySnapshot) =>{
      setPosts([])
      querySnapshot.forEach((doc) => {
        setPosts(prev => [...prev,doc.data() as IPost])
      });
    })
  }, [userID])
  
  return {posts}
}

export default usePosts