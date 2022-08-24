import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/appRedux'
import { IChat, IUserInfo, TypeSetState } from '../../types/data'

interface propsMessagePreviewCard extends IChat{
  setShowChatID:TypeSetState<string>,
}

const MessagePreviewCard:FC<propsMessagePreviewCard> = ({
  companionID,
  setShowChatID,
}) => {
  
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userID:"",
    email:"",
    firstName:"",
    gender:"",
    lastName:"",
    phoneNumber:0,
    profileImg:"",
    status:'offline',
  })

  const {allUsers} = useAppSelector(state => state.users)

  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === companionID){
        setUserInfo(user)
      }
    })
  }, [allUsers])

  return (
    <li onClick={()=>setShowChatID(companionID)} className='flex justify-between p-4 rounded-xl cursor-pointer'>
      <div className="flex gap-2 cursor-pointer">
        <img src={userInfo.profileImg} className='rounded-full h-11' width={44} alt="" />
        <div className="flex flex-col gap-1">
          <h2>{userInfo.firstName + " " + userInfo.lastName}</h2>
          <p className='text-xs dark:text-superLightGray opacity-80'>Thanks buddy, you to...</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5 ">
        <p>11:33</p>
        {/* <span className=' text-center text-sm inline-block h-5 w-5 bg-red rounded-md'>1</span> */}
        {/* <StarIcon className='text-green w-4.5 cursor-pointer'/> */}
      </div>
    </li>
  )
}

export default MessagePreviewCard