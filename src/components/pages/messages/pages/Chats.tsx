import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {FC} from 'react'
import useInput from '../../../hooks/useInput'
import { IChat, IChatOptions } from '../../../types/data'
import ContentBlock from '../../../ui/ContentBlock'
import InputText from '../../../ui/InputText'
import MessagePreviewCard from '../chatPreviewCard/ChatPreviewCard'


interface propsChats{
  chatsOptions:IChatOptions[]
}

const Chats:FC<propsChats> = ({chatsOptions}) => {

  const search = useInput("")


  // const filtredChats = chats.filter(item => {
  //   return item.userInfo?.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
  //     item.userInfo?.lastName.toLowerCase().includes(search.value.toLowerCase())
  // }).sort((a,b) => 
  //       a.messages[a.messages.length - 1]?.date > 
  //       b.messages[b.messages.length - 1]?.date 
  //         ? -1 : 1
  //     ).sort((a, b) => a.options.favorite === b.options.favorite ? 0 : a.options.favorite ? -1 : 1)


  return (
    <ContentBlock className='w-full h-full flex-shrink-0 overflow-hidden'>
    <>
      <div className="flex gap-4">
        <InputText
          Icon={MagnifyingGlassIcon}
          placeholder='Search'
          className='border px-11 border-superLightGray dark:bg-lightBlack w-full'
          value={search.value}
          onChange={search.onChange}
          onKeyDown={search.onKeyDown}
        />
      </div>
      <ul className='flex flex-col h-full overflow-y-auto pb-12 gap-1 mt-6'>
        {chatsOptions.map(item=> 
        <MessagePreviewCard
          key={item.companionID}
          companionID={item.companionID}
          favorite={item.favorite}
          // lastMessage={item.messages[item.messages.length - 1]}
          // userInfo={item.userInfo}
        />)}
      </ul>
    </>
  </ContentBlock>
  )
}

export default Chats