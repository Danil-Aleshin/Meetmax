import { collection, doc, getDocs, onSnapshot, query } from 'firebase/firestore'
import {FC, useEffect, useMemo, useState} from 'react'
import { db } from '../../../firebaseConfig'
import { fetchCreatePost, getPosts } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IPost } from '../../types/data'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post'

const Home:FC = () => {
  
  const newPostInput = useInput()


  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)
  const {userID} = useAppSelector(state => state.auth)

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

  const addNewPost = () =>{
    const text = newPostInput.value
    dispatch(fetchCreatePost({text,userID}))
    newPostInput.setValue("")
  }

  return (
    <div className='w-129 flex flex-col gap-7'>
      <CreatePostForm
        addNewPost={addNewPost} 
        onChange={newPostInput.onChange}
        value={newPostInput.value}
      />
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