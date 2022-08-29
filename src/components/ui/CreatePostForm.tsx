import { EmojiHappyIcon, PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { fetchCreatePost } from '../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import useInput from '../hooks/useInput'
import { TypeSetState } from '../types/data'
import Button from './Button'
import ContentBlock from './ContentBlock'
import InputText from './InputText'
import Picker from 'emoji-picker-react';

interface propsCreatePostForm{

}

const CreatePostForm:FC<propsCreatePostForm> = () => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const {userID,profileImg} = useAppSelector(state => state.users.currentUser)
  const {error,status} = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()
  
  const addNewPost = () =>{
    const text = newPostInput.value
    dispatch(fetchCreatePost({text,userID}))
    newPostInput.setValue("")
  }

  const onEmojiClick = (event:any,emojiObject:any) =>{
    newPostInput.setValue(prev => prev + emojiObject.emoji)
  }

  const newPostInput = useInput(addNewPost,"")
  return (
    <ContentBlock className='w-full'>
    <>
    {status === "error adding post" &&
     <p className='text-red pb-3'>{status}</p>
    } 
      <div className="flex gap-3 items-center">
        <img src={profileImg} alt="" width={48} className='rounded-full h-12' />
        <div className="w-full">
          <InputText
            value={newPostInput.value}
            onChange={newPostInput.onChange}
            placeholder="What's happening?"
            className='bg-lightGray px-3 w-full dark:bg-darkBlue'
            onKeyDown={newPostInput.onKeyDown}
          />
        </div>
      </div>
    <div className='flex items-center justify-between mt-4 '> 
      <ul className="flex items-center gap-4">
        <li className='flex items-center gap-4 cursor-pointer'>
          <VideoCameraIcon className='w-6' />
          <p>Live video</p>
        </li>
        <li className='flex items-center gap-4 cursor-pointer'>
          <PhotographIcon className='w-6' />
          <p>Photo/Video</p>
        </li>
        <li onMouseLeave={()=> setShowEmojiPicker(false)} className='flex items-center gap-4 cursor-pointer relative'>
          <EmojiHappyIcon className='w-6' onMouseEnter={()=>setShowEmojiPicker(true)} />
          <p>Emoji</p>
          {
            showEmojiPicker && 
            <div className="absolute -right-24 -bottom-12 z-100">
              <Picker pickerStyle={{height:"245px"}} onEmojiClick={onEmojiClick}/>
            </div>
          }
        </li>
      </ul>
      <Button title='Post' onClickFunc={addNewPost} />
    </div>
    </>
  </ContentBlock>
  )
}

export default CreatePostForm