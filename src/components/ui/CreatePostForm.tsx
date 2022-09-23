import { FaceSmileIcon, PhotoIcon, VideoCameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import { fetchCreatePost } from '../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import useInput from '../hooks/useInput'
import { IFile, IPost, TypeSetState } from '../types/data'
import Button from './Button'
import ContentBlock from './ContentBlock'
import InputText from './InputText'
import Picker from 'emoji-picker-react';
import { Link } from 'react-router-dom'
import UserImg from './UserImg'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebaseConfig'
import { deleteFile } from '../../store/UploadFileSlice'

interface propsCreatePostForm{

}

const CreatePostForm:FC<propsCreatePostForm> = () => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [filesAttachment, setFilesAttachment] = useState<IFile[]>([])


  const {userID,profileImg} = useAppSelector(state => state.users.currentUser)
  const {error,status} = useAppSelector(state => state.posts)
  const {fileLink,loading} = useAppSelector(state => state.uploadFile)
  const dispatch = useAppDispatch()
  
 
  const uploadImg = (e:any) =>{
    const file = e.target.files[0]
    file.path = `images/${userID}`
    file.link = ""
    const name = new Date().getTime().toString() + file?.name
    const storageRef = ref(storage,`${file.path}/${name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
        default:
          break;
      }
    },(error) => {
      console.log(error)
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const newFile = {
          link:downloadURL,
          name:name,
          path:file.path
        }
        setFilesAttachment(prev => [...prev,newFile])
      });
      
    })
  }

  
  const addNewPost = () =>{
    
    const newPost:IPost = {
      id:Date.now().toString(),
      authorID:userID,
      comments:[],
      text:newPostInput.value,
      date:new Date,
      likes:[],
      imgs:filesAttachment,
    }

    dispatch(fetchCreatePost({newPost,userID}))
    newPostInput.setValue("")
    setFilesAttachment([])
  }

  const delteImg = (name:string,path:string) =>{
    dispatch(deleteFile({name,path}))
    setFilesAttachment(filesAttachment.filter(item => item.name !== name))
  }

  const onEmojiClick = (event:any,emojiObject:any) =>{
    newPostInput.setValue(prev => prev + emojiObject.emoji)
  }

  const newPostInput = useInput("",addNewPost)
  return (
    <ContentBlock className='w-full'>
    <>
    {status === "error adding post" &&
     <p className='text-red pb-3'>{status}</p>
    } 
      <div className="flex gap-3 items-center">
        <Link to={`/${userID}`} className="flex-shrink-0 self-start">
          <UserImg
            src={profileImg.link}
            width="48"
            className='h-12'
          />
        </Link>
        <div className="w-full flex flex-col gap-2">
          <InputText
            value={newPostInput.value}
            onChange={newPostInput.onChange}
            placeholder="What's happening?"
            className='bg-lightGray px-3 w-full dark:bg-darkBlue'
            onKeyDown={newPostInput.onKeyDown}
          />
          {filesAttachment.length > 0 &&
            <ul className="flex flex-col gap-0.5 items-start">
              {filesAttachment.map(file => 
                <li className="relative" key={file.name}>
                  <img src={file.link} className="" alt="" />
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-opacityBlack cursor-pointer"
                    onClick={()=>delteImg(file.name,file.path)}
                  >
                    <XMarkIcon className='w-5 ml-auto bg-black'/>
                  </div>
                </li>
              )}
            </ul>
          }
        </div>
        
      </div>
    <div className='flex items-center justify-between mt-4 '> 
      <ul className="flex items-center gap-4">
        <li className='flex items-center gap-2.5'>
          <label htmlFor='attachImagePost' className='flex items-center gap-2.5 cursor-pointer'>
            <PhotoIcon className='w-6' />
            <p>Pictures</p>
          </label>
          <input 
            type="file" 
            id="attachImagePost"
            onChange={(e:any)=>uploadImg(e)}
            className='hidden'
            accept="image/jpeg, image/png"
          />
        </li>
        
        <li 
          onMouseEnter={()=>setShowEmojiPicker(true)} 
          onMouseLeave={()=> setShowEmojiPicker(false)} className='flex items-center gap-2.5 cursor-pointer relative'
        >
          <FaceSmileIcon className='w-6' />
          <p>Emoji</p>
          {
            showEmojiPicker && 
            <div className="absolute -right-30 -top-24 z-100">
              <Picker onEmojiClick={onEmojiClick} pickerStyle={{height:"250px"}}/>
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