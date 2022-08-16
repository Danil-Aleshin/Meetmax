import { EmojiHappyIcon, PaperClipIcon } from '@heroicons/react/outline'
import React, { FC, memo } from 'react'
import AddMessageBtn from './AddMessageBtn/AddMessageBtn'
import InputText from './InputText'

interface propsAddMessageForm{
  value:string,
  onChange:(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  onClick:()=>void,
  className?:string,
  placeHolder:string
}

const AddMessageForm:FC<propsAddMessageForm> = 
memo(({value,onChange,onClick,className,placeHolder}) => {
  return (
    <div className={'flex gap-3 w-full ' + className}>
      <div className="relative w-full">
        <InputText 
          onChange={onChange} 
          value={value} 
          className={"font-normal h-10 bg-lightGray dark:bg-darkBlue pl-3 pr-20 w-full"}
          placeholder={placeHolder}
        />
        <div className="absolute flex items-center gap-2 top-2.5 right-4">
          <PaperClipIcon className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'/>
          <EmojiHappyIcon className='w-5.5 text-blue dark:text-superLightGray cursor-pointer'/>
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