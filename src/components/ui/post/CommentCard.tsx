import { DotsHorizontalIcon, ExclamationIcon, TrashIcon, UserRemoveIcon } from '@heroicons/react/outline'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import { IComment, IUserInfo } from '../../types/data'
import OptionsMenu from '../optionsMenu/OptionsMenu'

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
          <img width={38} className="rounded-full" src={userInfo. profileImg} alt="" />
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
          <li className='flex items-center gap-3 cursor-pointer'>
            <ExclamationIcon className='shrink-0 w-5.5 text-blue'/>
            <p>Report this comment</p>
          </li>
          {authorID === userID &&
            <li onClick={removeCommentFunc} className='flex items-center gap-3 cursor-pointer'>
              <TrashIcon className='shrink-0 w-5.5 text-blue'/>
              <p>Remove this comment</p>
            </li>
          }
        </>
      </OptionsMenu>
      </div>
    </li>
  )
})

export default CommentCard