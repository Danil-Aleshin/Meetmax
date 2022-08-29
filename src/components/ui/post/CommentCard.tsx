import { DotsHorizontalIcon, ExclamationIcon, TrashIcon, UserRemoveIcon } from '@heroicons/react/outline'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import { IComment, IUserInfo } from '../../types/data'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import OptionsMenuItem from '../optionsMenu/OptionsMenuItem'
import UserImg from '../UserImg'

interface propsCommentCard extends IComment{

  removeCommentFunc:()=>void

}
const CommentCard:FC<propsCommentCard> = memo(({
  authorID,
  date,
  text,
  removeCommentFunc,
}) => {
  const [optionsMenuActive, setOptionsMenuActive] = useState(false)

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
  const {userID} = useAppSelector(state => state.auth)

  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === authorID){
        setUserInfo(user)
      }
    })
  }, [allUsers])


  return (
    <li className='flex justify-between'>
      <div className="flex gap-4">
        <Link to={`/${userInfo.userID}`}>
          <UserImg
            src={userInfo.profileImg}
            width={"38"}
            className="h-9.5"
          />
        </Link>
        <div className="flex flex-col gap-1">
          <Link to={`/${userInfo.userID}`}>
            <p className="text-sm">{userInfo.firstName + " " + userInfo.lastName}</p>
          </Link>
          {/* <p className="text-sm">{"11:33"}</p> */}
          <p className="text-sm">{text}</p>
        </div>
      </div>
      <div className="">
      <OptionsMenu isActive={optionsMenuActive} setIsActive={setOptionsMenuActive} className='-right-2'>
        <>
          <OptionsMenuItem
            onClick={removeCommentFunc}
            title="Remove this comment"
            Icon={TrashIcon}
          />
        </>
      </OptionsMenu>
      </div>
    </li>
  )
})

export default CommentCard