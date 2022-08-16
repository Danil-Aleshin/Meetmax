import { SearchIcon, StarIcon } from '@heroicons/react/solid'
import { doc, onSnapshot } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IChat } from '../../types/data'
import ContentBlock from '../../ui/ContentBlock'
import InputText from '../../ui/InputText'
import Chat from './Chat'
import MessagePreviewCard from './MessagePreviewCard'

const Messages:FC = () => {

  const [showingChat, setShowingChat] = useState<IChat>()
  const [showChatID, setShowChatID] = useState("")

  const search = useInput()
  
  const {chats} = useAppSelector(state => state.chats)
  const {userID} = useAppSelector(state => state.auth)

  // useEffect(() => {
  //   chats.map(chat => {
  //     if (chat.companionID === showChatID) {
  //       setShowingChat(chat)
  //     }
  //   })
  // }, [showChatID])

  


  // const filtredChats = chats.filter(item => {
  //   return item.chats.toLowerCase().includes(search.value.toLowerCase())
  // })

  return (
    <div className='flex gap-4'>
      <ContentBlock className='w-85 flex-shrink-0'>
        <>
        <div className="flex gap-4">
          <InputText
            Icon={SearchIcon}
            placeholder='Search'
            className='border px-11 border-superLightGray dark:bg-lightBlack w-full'
            value={search.value}
            onChange={search.onChange}
          />
          <button className='w-10 rounded-lg bg-lightGray dark:bg-darkBlue flex items-center justify-center flex-shrink-0'>
            <StarIcon className='text-green w-4.5'/>
          </button>
        </div>
        <ul className='flex flex-col gap-1 mt-6'>
          {/* {chats.map(chat=>
          <MessagePreviewCard
            setShowChatID={setShowChatID}
            key={chat.companionID}
            companionID={chat.companionID}
            lastMessageTime={chat.lastMessageTime}
            messages={chat.messages}
          />)} */}
        </ul>
        </>
      </ContentBlock>
      <Chat
        companionID={showingChat?.companionID}
        lastMessageTime={showingChat?.lastMessageTime}
        messages={showingChat?.messages}
      />
    </div>
  )
}

export default Messages