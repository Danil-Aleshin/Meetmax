import { TrashIcon } from '@heroicons/react/24/outline'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setActive } from '../../../store/ViewPicturesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useProfile from '../../hooks/requestsHooks/useProfile'

import { IComment, IFile, IUserInfo } from '../../types/data'
import { timeToTimeAgo } from '../../utils/convertDate'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import OptionsMenuItem from '../optionsMenu/OptionsMenuItem'
import UserImg from '../UserImg'
import UserInfo from '../userInfo/UserInfo'

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

  const {userID} = useAppSelector(state => state.auth)
  const dispatch =  useAppDispatch()

  const {userInfo} = useProfile(authorID)

  const viewPictures = (img:IFile) =>{
    const viewPhotoArr = imgs.filter(item => item.name !== img.name)
    dispatch(setActive([img,...viewPhotoArr]))
  }

  return (
    <li className='flex justify-between'>
      <div className="flex flex-col gap-1">
        <UserInfo date={date} userInfo={userInfo}/>
        <div className="flex flex-col gap-0.5 ml-12.5">
          {imgs.length > 0 &&
            <div className="mt-2 max-w-sm">
              {imgs.map(img => 
                <img src={img.link} alt="" onClick={()=>viewPictures(img)} className='cursor-pointer'/>
              )}
            </div>
          }
          <p className="text-sm  mt-0.3">{text}</p>
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