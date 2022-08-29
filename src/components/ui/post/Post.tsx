import { BellIcon, ExclamationIcon, TrashIcon, UserRemoveIcon } from '@heroicons/react/outline'
import { serverTimestamp } from 'firebase/firestore'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { unfollow } from '../../../store/FollowersSlice'
import { fetchRemovePost, removeComment, removeLike, sendLike, writeAComment } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import useInput from '../../hooks/useInput'
import { IPost, IUserInfo, userID } from '../../types/data'
import AddMessageForm from '../AddMessageForm'
import ContentBlock from '../ContentBlock'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import OptionsMenuItem from '../optionsMenu/OptionsMenuItem'
import SoicalActivity from '../SoicalActivity'
import UserImg from '../UserImg'
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

  
  const {currentUser,currentUser:{userID},allUsers} = useAppSelector(state => state.users)
  
  const dispatch = useAppDispatch()
  
  const postDate = useDate(date)



  useEffect(() => {
    allUsers.map(user => {
      if(user.userID === authorID){
        setAuthorProfile(user)
      }
    })
  }, [allUsers])

  useEffect(() => {
    likes.map(like =>{
      like === userID ? setIsLike(true) : setIsLike(false)
    })
  }, [currentUser,likes])
  
  
  const addComment = ()=>{
    const commentText = comment.value
    const commentAuthorID = userID
    const postAuthorID = authorID
    const postID = id

    if (commentText.length !== 0) {
      dispatch(writeAComment({
        commentAuthorID,
        commentText,
        postAuthorID,
        postID,
      }))
      setShowComments(true)
    }
    comment.setValue("")
  }

  const likeFunc = () =>{
    const postAuthorID = authorID
    const postID = id

    if (isLike) {
      dispatch(removeLike({likes,postAuthorID,postID,userID}))
    }else{
      dispatch(sendLike({postAuthorID,postID,userID}))
    }
  }
  const removePost = () =>{
    const postID = id

    dispatch(fetchRemovePost({postID,userID}))
  }
  
  const removeCommentFunc = () =>{
    const postAuthorID = authorID
    const commentAuthorID = userID
    const postID = id
    dispatch(removeComment({
      commentAuthorID,
      comments,
      postAuthorID,
      postID,
    }))
  }
 
  const unFollowFunc = () =>{
    const followerID = id ? id : ""
    // const docID = isFollowing?.docID ? isFollowing.docID : ""

    // dispatch(unfollow({followerID,userID,docID}))
  }
  
  const turnNotification = () =>{

  }

  const comment = useInput(addComment,"")

  return (
    <ContentBlock className="post">
      <>
      {/* header post */}
        <div className="flex justify-between items-center">
          <Link to={`/${authorID}`} className="author">
            <UserImg
                src={authorProfile?.profileImg}
                width={"48"}
                className="h-12"
              />
            <div className="flex flex-col gap-0.5">
              <p>{authorProfile?.firstName + " " + authorProfile?.lastName}</p>
              <span className='text-xs font-normal opacity-70 dark:text-superLightGray dark:opacity-100'>{postDate.time}</span>
            </div>
          </Link>
            <OptionsMenu 
              setIsActive={setOptionsMenuActive} 
              isActive={optionsMenuActive} 
              className='top-16 -right-2'
            >
              <>
                <OptionsMenuItem 
                  title='Turn notification for this post'
                  Icon={BellIcon}
                  onClick={turnNotification}
                />
                <OptionsMenuItem
                  title='Unfollow'
                  Icon={UserRemoveIcon}
                  onClick={unFollowFunc}
                />
                {authorID === currentUser.userID &&
                  <OptionsMenuItem
                    title='Remove this post'
                    Icon={TrashIcon}
                    onClick={removePost}
                  />
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
          <UserImg 
            src={currentUser.profileImg}
            width={"38"}
            className="h-9.5"
          />
          <AddMessageForm
            onChange={comment.onChange}
            value={comment.value}
            onClick={addComment}
            placeHolder="Write a comment..."
            onKeyDown={comment.onKeyDown}
            setValue={comment.setValue}
          />
        </div>
      </>
    </ContentBlock>
  )
})

export default Post