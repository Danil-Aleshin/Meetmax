import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCreatePost } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post'
import Intro from './Intro'

const Profile:FC = () => {

  const {tagName} = useParams()
  const {userID} = useAppSelector(state => state.auth)
  const {userPosts} = useAppSelector(state => state.users)
  const currUser = useAppSelector(state => state.users.currentUser)

  const dispatch = useAppDispatch()


  const newPostInput = useInput()

  const addNewPost = () =>{
    const text = newPostInput.value
    dispatch(fetchCreatePost({text,userID}))
    newPostInput.setValue("")
  }

  return (
    <div>
      <div className="flex flex-col justify-center gap-2 w-full shadow-xl rounded-xl p-7">
        <div className="">
          <img src="/img/noProfileImg.png" width={150} className='rounded-full border-4 border-white' alt="" />
        </div>
        <h1 className='text-2xl'>Fedor Fedorov</h1>
      </div>
      <div className="mt-8 flex gap-6">
        <Intro/>
        <div className="w-129 flex flex-col gap-7">
          <CreatePostForm
            addNewPost={addNewPost}
            onChange={newPostInput.onChange}
            value={newPostInput.value}
          />
          {userPosts.map(post => 
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
      </div>
    </div>
  )
}

export default Profile