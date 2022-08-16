import { ChatIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, ShareIcon } from '@heroicons/react/outline'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IPost, IProfile, IUserData } from '../../types/data'
import AddMessageForm from '../AddMessageForm'
import ContentBlock from '../ContentBlock'
import PostOptionsMenu from '../PostOptionsMenu'
import SoicalActivity from '../SoicalActivity'
import "./Post.scss"

interface propsPost extends IPost{
}

const Post:FC<propsPost> = memo(({
  comments,
  authorID,
  date,
  text,
  id,
  likes,
  share,
  imgs,
}) => {

  const [optionsMenu, setOptionsMenu] = useState(false)
  const [timeAgo, setTimeAgo] = useState(0)
  const [authorProfile, setAuthorProfile] = useState<IProfile>()
  const comment = useInput()

  const currUser = useAppSelector(state => state.users.currentUser)
  const posts = useAppSelector(state => state.posts.posts)

  useEffect(() => {
      const unsubscribe = onSnapshot(doc(db, "users", authorID),(doc)=>{
        const data = doc.data() as IUserData
          setAuthorProfile(data.profile)
      });
      return () => unsubscribe()
  }, [])
  
  const addComment = useCallback(()=>{
    
  },[])
  
  useEffect(() => {
    const ago = new Date(date - Date.now())
    setTimeAgo(ago.getMinutes()) // does not work
  }, [date])
  
  return (
    <ContentBlock className="post">
      <>
      {/* header post */}
        <div className="flex justify-between items-center">
          <div className="author">
            <img src={authorProfile?.profileImg} width={48} className="w-12 h-12 rounded-full" alt="" />
            <div className="flex flex-col gap-0.5">
              <p>{authorProfile?.firstName + " " + authorProfile?.lastName}</p>
              <span className='text-xs font-normal opacity-70 dark:text-superLightGray dark:opacity-100'>{timeAgo}min.</span>
            </div>
          </div>
          <DotsHorizontalIcon 
            onClick={()=>setOptionsMenu(!optionsMenu)} 
            className={optionsMenu 
              ? 'options-menu__btn options-menu--active'
              : 'options-menu__btn'
            }
            id="optionsMenuBtn"
          />
        </div>
        {/* conent */}
        <div className="post-content">
          <p className='font-normal'>{text}</p>
          {imgs?.map(img=> 
            <img src={img} alt="" className='w-full rounded-xl' />
          )}
        </div>
        <SoicalActivity comments={comments.length} likes={likes.length} share={share}/>
        <div className="add-comment">
          <img src={currUser.profileImg} alt="" width={40} className='rounded-full'/>
          <AddMessageForm
            onChange={comment.onChange}
            value={comment.value}
            onClick={addComment}
            placeHolder="Write a comment..."
          />
        </div>
        <PostOptionsMenu postAuthorID={authorID} setIsActive={setOptionsMenu} isActive={optionsMenu} postID={id} className='top-16 -right-2'/>
      </>
    </ContentBlock>
  )
})

export default Post