import { EmojiHappyIcon, PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useAppSelector } from '../hooks/appRedux'
import Button from './Button'
import ContentBlock from './ContentBlock'
import InputText from './InputText'

interface propsCreatePostForm{
  addNewPost:()=>void
  value:string,
  onChange:(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const CreatePostForm:FC<propsCreatePostForm> = ({addNewPost,onChange,value}) => {


  const currUser = useAppSelector(state => state.users.currentUser)
  const {error,status} = useAppSelector(state => state.posts)

  return (
    <ContentBlock className='w-full'>
    <>
    {error && <p className='text-red pb-3'>{status}</p>}
      <div className="flex gap-3 items-center">
        <img src={currUser.profileImg} alt="" width={48} className='rounded-full' />
        <div className="w-full">
          <InputText
            value={value}
            onChange={onChange}
            placeholder="What's happening?"
            className='bg-lightGray px-3 w-full dark:bg-darkBlue'
          
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
        <li className='flex items-center gap-4 cursor-pointer'>
          <EmojiHappyIcon className='w-6' />
          <p>Emoji</p>
        </li>
      </ul>
      <Button title='Post' onClickFunc={addNewPost} />
    </div>
    </>
  </ContentBlock>
  )
}

export default CreatePostForm