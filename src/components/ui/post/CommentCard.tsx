import { TrashIcon } from '@heroicons/react/24/outline'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setActive } from '../../../store/ViewPicturesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import { IComment, IFile, IUserInfo } from '../../types/data'
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
  imgs,
}) => {

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)
  const [userInfo, setUserInfo] = useState<IUserInfo>()

  const {allUsers} = useAppSelector(state => state.users)
  const {userID} = useAppSelector(state => state.auth)
  const dispatch =  useAppDispatch()

  const commentDate = useDate(date)

  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === authorID){
        setUserInfo(user)
      }
    })
  }, [allUsers])

  const viewPictures = (img:IFile) =>{
    const viewPhotoArr = imgs.filter(item => item.name !== img.name)
    dispatch(setActive([img,...viewPhotoArr]))
  }

  return (
    <li className='flex justify-between'>
      <div className="flex gap-4">
        <Link to={`/${userInfo?.userID}`} className="flex-shrink-0">
          <UserImg
            src={userInfo?.profileImg.link}
            width={"38"}
            className="h-9.5"
          />
        </Link>
        <div className="flex flex-col gap-0.5">
          <Link to={`/${userInfo?.userID}`}>
            <p className="text-sm">{`${userInfo?.firstName} ${userInfo?.lastName}`}</p>
          </Link>
          <p className="text-xs opacity-80 font-normal">{`${commentDate.time} ${commentDate.day}.${commentDate.month}.${commentDate.year}`}</p>
          {imgs &&
            <div className="mt-2 max-w-sm">
              {imgs.map(img => 
                <img src={img.link} alt="" onClick={()=>viewPictures(img)} className='cursor-pointer'/>
              )}
            </div>
          }
          <p className="text-sm  mt-1.5">{text}</p>
        </div>
      </div>
      <div className="">
        {authorID === userID &&
          <OptionsMenu isActive={optionsMenuActive} setIsActive={setOptionsMenuActive} className='-right-2'>
            <>
            {authorID === userID
              && <OptionsMenuItem
                    onClick={removeCommentFunc}
                    title="Delete comment"
                    Icon={TrashIcon}
                  />
            }
            </>
          </OptionsMenu>
        }
      </div>
    </li>
  )
})

export default CommentCard