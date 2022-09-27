import { FaceSmileIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { FC, memo, useState } from 'react'
import AddMessageBtn from './addMessageBtn/AddMessageBtn'
import InputText from './InputText'
import Picker from 'emoji-picker-react';
import { IFile, TypeSetState } from '../types/data';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import { useAppDispatch, useAppSelector } from '../hooks/appRedux';
import { deleteImgRequest } from '../reusableFunctions/reusableFunctions';

interface propsAddMessageForm{
  value:string,
  setValue:TypeSetState<string>
  onChange:(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  onClick:()=>void,
  className?:string,
  placeHolder:string,
  onKeyDown?:React.KeyboardEventHandler<HTMLInputElement>,
  setFilesAttachment:TypeSetState<IFile[]>,
  filesAttachment:IFile[],
}

const AddMessageForm:FC<propsAddMessageForm> = memo(({
  value,
  onChange,
  onClick,
  className,
  placeHolder,
  onKeyDown,
  setValue,
  filesAttachment,
  setFilesAttachment
}) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const {currentUser:{userID}} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  const onEmojiClick = (event:any,emojiObject:any) => {
    setValue(prev => prev + emojiObject.emoji)
  };

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

  const deleteImg = (name:string,path:string) =>{
    const files = deleteImgRequest(name,path,filesAttachment)
    setFilesAttachment(files)
  }

  return (
    <div className='w-full'>
    <div className={'flex gap-3 w-full ' + className}>
      <div className="w-full relative">
        <InputText 
          onChange={onChange} 
          value={value} 
          className={"font-normal h-10 bg-lightGray dark:bg-darkBlue pl-3 pr-20 w-full"}
          placeholder={placeHolder}
          onKeyDown={onKeyDown}
        />

        <div className="absolute flex items-center gap-2 top-2.5 right-4">
          <label htmlFor='attachImage'>
            <PaperClipIcon className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'/>
          </label>
          <input 
            type="file" 
            id="attachImage"
            onChange={(e:any)=>uploadImg(e)}
            className='hidden'
            accept="image/jpeg, image/png"
          />
          <div className="" onMouseLeave={()=>setShowEmojiPicker(false)}>
            <FaceSmileIcon
              onMouseEnter={()=>setShowEmojiPicker(true)} 
              className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'
            />
            {
            showEmojiPicker && 
            <div className="absolute right-0 -top-80">
              <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
            </div>
            }
          </div>
        </div>
      </div>
      <AddMessageBtn 
        onClick={onClick}
      />
    </div>
      {filesAttachment.length > 0 &&
            <ul className="mt-1 flex flex-wrap gap-0.5 items-center">
              {filesAttachment.map(file => 
                <li className="relative" key={file.name}>
                  <img src={file.link} className="max-w-full" width={"100"} alt="" />
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-opacityBlack cursor-pointer"
                    onClick={()=>deleteImg(file.name,file.path)}
                  >
                    <XMarkIcon className='w-5 ml-auto bg-black'/>
                  </div>
                </li>
              )}
            </ul>
          }
    </div>
  )
})

export default AddMessageForm
//