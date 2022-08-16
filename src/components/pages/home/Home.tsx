import { doc, onSnapshot } from 'firebase/firestore'
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

  const userInfo = useAppSelector(state => state.auth.user.userInfo)
  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)
  const {userID} = useAppSelector(state => state.auth)
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(doc(db, "global", "posts"), (doc) => {
  //     const data = doc.data() as postData
  //     console.log(data)
  //     dispatch(getPosts(data.posts))
  //   });
  //   return () => unsubscribe()
  // }, [])
  
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