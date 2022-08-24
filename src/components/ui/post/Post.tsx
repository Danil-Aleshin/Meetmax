import { BellIcon, ExclamationIcon, TrashIcon, UserRemoveIcon } from '@heroicons/react/outline'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRemovePost, removeComment, removeLike, sendLike, writeAComment } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IPost, IUserInfo } from '../../types/data'
import AddMessageForm from '../AddMessageForm'
import ContentBlock from '../ContentBlock'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import SoicalActivity from '../SoicalActivity'
import CommentCard from './CommentCard'
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

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)
  const [timeAgo, setTimeAgo] = useState(0)
  const [authorProfile, setAuthorProfile] = useState<IUserInfo>()
  const [showComments, setShowComments] = useState(false)
  const [isLike, setIsLike] = useState(false)

  const comment = useInput()

  const {currentUser,allUsers} = useAppSelector(state => state.users)
  
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === authorID){
        setAuthorProfile(user)
      }
    })
  }, [allUsers])

  useEffect(() => {
    likes.map(like =>{
      like === currentUser.userID ? setIsLike(true) : setIsLike(false)
    })
  }, [currentUser,likes])
  
  
  useEffect(() => {
    const ago = new Date(date - Date.now())
    setTimeAgo(ago.getMinutes()) // does not work
  }, [date])
  
  const addComment = ()=>{
    const commentText = comment.value
    const commentDate = Date.now().toString()
    const commentAuthorID = currentUser.userID 
    const postAuthorID = authorID
    const postID = id

    if (commentText.length !== 0) {
      dispatch(writeAComment({
        commentAuthorID,
        commentDate,
        commentText,
        postAuthorID,
        postID,
      }))
    }
    comment.setValue("")
  }

  const likeFunc = () =>{
    const postAuthorID = authorID
    const postID = id
    const userID = currentUser.userID
    if (isLike) {
      dispatch(removeLike({likes,postAuthorID,postID,userID}))
    }else{
      dispatch(sendLike({postAuthorID,postID,userID}))
    }
  }
  const removePost = () =>{
    const postID = id
    const userID = currentUser.userID
    dispatch(fetchRemovePost({postID,userID}))
  }
  
  const removeCommentFunc = () =>{
    const commentAuthorID = currentUser.userID 
    const postAuthorID = authorID
    const postID = id
    dispatch(removeComment({
      commentAuthorID,
      comments,
      postAuthorID,
      postID,
    }))
  }
  return (
    <ContentBlock className="post">
      <>
      {/* header post */}
        <div className="flex justify-between items-center">
          <Link to={`/${authorID}`} className="author">
            <img src={authorProfile?.profileImg} width={48} className="w-12 h-12 rounded-full" alt="" />
            <div className="flex flex-col gap-0.5">
              <p>{authorProfile?.firstName + " " + authorProfile?.lastName}</p>
              <span className='text-xs font-normal opacity-70 dark:text-superLightGray dark:opacity-100'>{timeAgo}min.</span>
            </div>
          </Link>
            <OptionsMenu 
              setIsActive={setOptionsMenuActive} 
              isActive={optionsMenuActive} 
              className='top-16 -right-2'
            >
              <>
                <li className='flex items-center gap-3 cursor-pointer'>
                  <BellIcon className='w-5.5 text-blue'/>
                  <p>Turn notification for this post</p>
                </li>
                <li className='flex items-center gap-3 cursor-pointer'>
                  <ExclamationIcon className='w-5.5 text-blue'/>
                  <p>Report this post</p>
                </li>
                <li className='flex items-center gap-3 cursor-pointer'>
                  <UserRemoveIcon className='w-5.5 text-blue'/>
                  <p>Unfollow</p>
                </li>
                {authorID === currentUser.userID &&
                  <li onClick={()=>removePost()} className='flex  items-center gap-3 cursor-pointer'>
                  <TrashIcon className='w-5.5 text-blue'/>
                  <p>Remove this post</p>
                  </li>
                }
              </>
            </OptionsMenu>
        </div>
        {/* conent */}
        <div className="post-content">
          <p className='font-normal'>{text}</p>
          {imgs?.map(img=> 
            <img src={img} alt="" className='w-full rounded-xl' />
          )}
        </div>
        {/*  */}
        <SoicalActivity 
          setShowComments={setShowComments}
          showComments={showComments}
          comments={comments.length}
          likes={likes.length}
          share={share}
          likeFunc={likeFunc}
          isLike={isLike}
        />
        {showComments && 
          <ul className="comments">
            {comments.map(comment=>
              <CommentCard
                key={comment.authorID + comment.date}
                authorID={comment.authorID}
                date={comment.date}
                text={comment.text}
                removeCommentFunc={removeCommentFunc}
              />
            )}
          </ul>
        }
        <div className="add-comment">
          <img src={currentUser.profileImg} alt="" width={38} className='rounded-full'/>
          <AddMessageForm
            onChange={comment.onChange}
            value={comment.value}
            onClick={addComment}
            placeHolder="Write a comment..."
          />
        </div>
      </>
    </ContentBlock>
  )
})

export default Post