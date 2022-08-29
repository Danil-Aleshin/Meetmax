import { collection, onSnapshot, query } from 'firebase/firestore'
import {FC, useEffect} from 'react'
import { db } from '../../../firebaseConfig'
import { getPosts } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { IPost } from '../../types/data'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post'

const Home:FC = () => {
  
  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)

  useEffect(() => {
    const q = query(collection(db, "global", "posts","data"));

    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      const postsData:IPost[] = []
      querySnapshot.forEach((doc) => {
        postsData.push(doc.data() as IPost);
    });
      dispatch(getPosts(postsData))
    })
    
    return () => unsubscribe()
}, [])


  return (
    <div className='w-129 flex flex-col gap-7'>
      <CreatePostForm/>
      {posts.map(post =>
        <Post
          key={post.id}
          authorID={post.authorID}
          comments={post.comments}
          date={post.date}
          id={post.id}
          likes={post.likes}
          share={post.share}
          text={post.text}
          imgs={post.imgs}
      />
      )}
    </div>
  )
}

export default Home