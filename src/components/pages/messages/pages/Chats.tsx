import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline'
import {FC} from 'react'
import { useAppSelector } from '../../../hooks/appRedux'
import useInput from '../../../hooks/useInput'
import { IChat, TypeSetState } from '../../../types/data'
import ContentBlock from '../../../ui/ContentBlock'
import InputText from '../../../ui/InputText'
import MessagePreviewCard from '../ChatPreviewCard'


interface propsChats{

}

const Chats:FC<propsChats> = ({}) => {

  const search = useInput("")

  const {chats} = useAppSelector(state => state.chats)

  const filtredChats = chats.filter(item => {
    return item.userInfo.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      item.userInfo.lastName.toLowerCase().includes(search.value.toLowerCase())
  }).sort((a,b) => 
  a.chat.messages[a.chat.messages.length - 1]?.date > b.chat.messages[b.chat.messages.length - 1]?.date ? -1 : 1
).sort((a, b) => a.chat.favorite === b.chat.favorite ? 0 : a.chat.favorite ? -1 : 1)


  return (
    <ContentBlock className='w-full h-full flex-shrink-0'>
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
      <ul className='flex flex-col gap-1 mt-6'>
        {filtredChats.map(item=> 
        <MessagePreviewCard
          key={item.chat.companionID}
          companionID={item.chat.companionID}
          profileImg={item.userInfo.profileImg}
          firstName={item.userInfo.firstName}
          lastName={item.userInfo.lastName}
          status={item.userInfo.status}
          favorite={item.chat.favorite}
          lastMessage={item.chat.messages[item.chat.messages.length - 1]}
        />)}
      </ul>
    </>
  </ContentBlock>
  )
}

export default Chats