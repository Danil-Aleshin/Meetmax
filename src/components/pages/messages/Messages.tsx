import { SearchIcon, StarIcon } from '@heroicons/react/solid'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IChat } from '../../types/data'
import ContentBlock from '../../ui/ContentBlock'
import InputText from '../../ui/InputText'
import Chat from './Chat'
import MessagePreviewCard from './MessagePreviewCard'
import "./Messages.scss"
const Messages:FC = () => {

  const [showingChat, setShowingChat] = useState<IChat>()
  const [showChatID, setShowChatID] = useState("")

  const search = useInput()
  
  const {chats} = useAppSelector(state => state.chats)
  const {currentUser:{userID}} = useAppSelector(state =>state.users)
  const dispatch = useAppDispatch()

  // const filtredChats = chats.filter(item => {
  //   return item.chats.toLowerCase().includes(search.value.toLowerCase())
  // })

  useEffect(() => {
    chats.map(chat=>{
      chat.companionID === showChatID && setShowingChat(chat)
    })
  }, [showChatID,chats])

  return (
    <div className='flex gap-4'>
      <ContentBlock className='w-72 flex-shrink-0'>
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
          {chats.map(chat=>
          <MessagePreviewCard
            setShowChatID={setShowChatID}
            key={chat.companionID}
            companionID={chat.companionID}
            messages={chat.messages}
          />)}
        </ul>
        </>
      </ContentBlock>
      <Chat
        fromUserID={showChatID}
        messages={showingChat?.messages}
      />
    </div>
  )
}

export default Messages