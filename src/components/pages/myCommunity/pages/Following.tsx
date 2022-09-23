import { FC } from 'react'
import { useAppSelector } from '../../../hooks/appRedux'
import ProfileCard from '../../../ui/ProfileCard'

interface propsFollowing{

}
const Following:FC<propsFollowing> = ({}) => {

  const {currentUserFollowing} = useAppSelector(state => state.followers)

  return (
    <>
      {currentUserFollowing.map(item=>
        <ProfileCard
          key={item.userInfo.userID}
          firstName={item.userInfo.firstName}
          followerID={item.userID}
          lastName={item.userInfo.lastName}
          profileImg={item.userInfo.profileImg}
        />  
      )}
    </>
  )
}

export default Following