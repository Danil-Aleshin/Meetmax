import { FC } from 'react'
import { useAppSelector } from '../../../hooks/appRedux'
import useFollowing from '../../../hooks/requestsHooks/useFollowing'
import ProfileCard from '../../../ui/profileCard/ProfileCard'

interface propsFollowing{

}
const Following:FC<propsFollowing> = ({}) => {

  const {userID} = useAppSelector(state => state.auth)
  const {following} = useFollowing(userID)

  return (
    <>
      {following.map(item=>
        <ProfileCard
          key={item.userID}
          netWorkUserID={item.userID}
        />  
      )}
    </>
  )
}

export default Following