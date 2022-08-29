import { EmojiHappyIcon, PaperClipIcon } from '@heroicons/react/outline'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import AddMessageBtn from './AddMessageBtn/AddMessageBtn'
import InputText from './InputText'
import Picker from 'emoji-picker-react';
import { TypeSetState } from '../types/data';

interface propsAddMessageForm{
  value:string,
  setValue:TypeSetState<string>
  onChange:(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  onClick:()=>void,
  className?:string,
  placeHolder:string,
  onKeyDown:React.KeyboardEventHandler<HTMLInputElement>,
}

const AddMessageForm:FC<propsAddMessageForm> = memo(({
  value,
  onChange,
  onClick,
  className,
  placeHolder,
  onKeyDown,
  setValue
}) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const onEmojiClick = (event:any,emojiObject:any) => {
    setValue(prev => prev + emojiObject.emoji)
  };

  return (
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
          <PaperClipIcon className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'/>
          <div className="" onMouseLeave={()=>setShowEmojiPicker(false)}>
            <EmojiHappyIcon
              onMouseEnter={()=>setShowEmojiPicker(true)} 
              className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'
            />
            {
            showEmojiPicker && 
            <div className="absolute right-0 -top-80">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
            }
          </div>
        </div>
      </div>
      <AddMessageBtn 
        onClick={onClick}
      />
    </div>
  )
})

export default AddMessageForm
//