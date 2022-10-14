import { collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import {FC, useEffect, useState} from 'react'
import { db } from '../../../firebaseConfig'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { IPost } from '../../types/data'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post'


const Home:FC = () => {
  
  const [posts, setPosts] = useState<IPost[]>([])
  

  useEffect(() => {
    onSnapshot(query(collection(db, "global", "posts","data"),orderBy("date",'desc')),
    (querySnapshot) =>{
      let postsData:IPost[] = []
      querySnapshot.forEach((doc
        ) => {
        postsData.push(doc.data() as IPost)
      });
      setPosts(postsData)
    })

  }, [])

  
  return (
    <div className='w-full flex flex-col gap-7'>
      <CreatePostForm/>
      {posts.map(post => 
        <Post
          key={post.id}
          post={post}
        />
      )}
    </div>
  )
}

export default Home