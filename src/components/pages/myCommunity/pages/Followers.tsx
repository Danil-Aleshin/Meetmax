import { FC } from 'react'
import { useAppSelector } from '../../../hooks/appRedux'
import ProfileCard from '../../../ui/ProfileCard'

interface propsFollowers{

}
const Followers:FC<propsFollowers> = ({}) => {

  const {currentUserFollowers} = useAppSelector(state => state.followers)
  return (
    <>
      {currentUserFollowers.map(item=>
        <ProfileCard
          key={item.userID}
          firstName={item.userInfo.firstName}
          followerID={item.userInfo.userID}
          lastName={item.userInfo.lastName}
          profileImg={item.userInfo.profileImg}
        />
      )}
    </>
  )
}

export default Followers