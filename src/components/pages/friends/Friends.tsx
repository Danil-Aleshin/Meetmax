import { FC } from 'react'
import { addToFriends } from '../../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useFriendReq from '../../hooks/requestsHooks/useFriendReq'
import useFriends from '../../hooks/requestsHooks/useFriends'
import { userID } from '../../types/data'
import ContentBlock from '../../ui/ContentBlock'
import './Friends.scss'
import FriendsCard from './FriendsCard'


const Friends:FC = () => {

  const {userID} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const {friends} = useFriends(userID)
  const {friendReq} = useFriendReq(userID)

  const  addToFriendFunc = (networkUserID:userID) =>{
    dispatch(addToFriends({networkUserID,userID}))
  }

  return (
    <ContentBlock className='w-full h-full overflow-y-auto'>
      <>
        <ul className='flex flex-col grow gap-4'>
          {
            friends.length 
              ? friends.map(friend =>
                  <FriendsCard
                    key={friend.userID}
                    netWorkUserID={friend.userID}
                  />
                )
              : <li className="text-center">No friend found :(</li>
          }
          {
            friendReq.map(friend =>
              <FriendsCard
                key={friend.userID}
                netWorkUserID={friend.userID}
                addToFriendFunc={addToFriendFunc}
              />
            )
          }
        </ul>
      </>
    </ContentBlock>
  )
}

export default Friends