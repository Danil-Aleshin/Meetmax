import { SearchIcon, StarIcon } from '@heroicons/react/solid'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IChat, IChatData } from '../../types/data'
import ContentBlock from '../../ui/ContentBlock'
import InputText from '../../ui/InputText'
import Chat from './Chat'
import MessagePreviewCard from './MessagePreviewCard'
import "./Messages.scss"
const Messages:FC = () => {

  const [showingChat, setShowingChat] = useState<IChatData>()
  const [showChatID, setShowChatID] = useState("")
  const [userChats, setUserChats] = useState<IChat[]>([])
  const {chats} = useAppSelector(state => state.chats)
  const {allUsers} = useAppSelector(state => state.users)


  useEffect(() => {
    chats.map(chat=>{
      chat.companionID === showChatID && setShowingChat(chat)
    })
  }, [showChatID,chats])

  useEffect(() => {
    const userChatsData:IChat[] = []
    allUsers.map(user => {
      chats.map(chat=>{
        user.userID === chat.companionID && userChatsData.push({
          user,
          chat
        })
      })
    })
    setUserChats(userChatsData)

  }, [allUsers,chats])
  
  const plug = () =>{

  }
  const search = useInput(plug,"")

  const filtredChats = userChats.filter(item => {
    return item.user.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      item.user.lastName.toLowerCase().includes(search.value.toLowerCase())
  })

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
            onKeyDown={search.onKeyDown}
          />
          <button className='w-10 rounded-lg bg-lightGray dark:bg-darkBlue flex items-center justify-center flex-shrink-0'>
            <StarIcon className='text-green w-4.5'/>
          </button>
        </div>
        <ul className='flex flex-col gap-1 mt-6'>
          {filtredChats.map(item=>
          <MessagePreviewCard
            setShowChatID={setShowChatID}
            key={item.chat.companionID}
            companionID={item.chat.companionID}
            messages={item.chat.messages}
            profileImg={item.user.profileImg}
            firstName={item.user.firstName}
            lastName={item.user.lastName}
            status={item.user.status}
            lastMessage={item.chat.messages[item.chat.messages.length - 1]}
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