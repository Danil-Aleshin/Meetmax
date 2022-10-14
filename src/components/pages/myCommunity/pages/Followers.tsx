import { FC } from 'react'
import { useAppSelector } from '../../../hooks/appRedux'
import useFollowers from '../../../hooks/requestsHooks/useFollowers'
import ProfileCard from '../../../ui/profileCard/ProfileCard'

interface propsFollowers{

}
const Followers:FC<propsFollowers> = ({}) => {

  const {userID} = useAppSelector(state => state.auth)
  const {followers} = useFollowers(userID)
  return (
    <>
      {followers.map(item=>
        <ProfileCard
          key={item.userID}
          netWorkUserID={item.userID}
        />
      )}
    </>
  )
}

export default Followers