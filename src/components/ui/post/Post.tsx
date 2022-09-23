import { TrashIcon, UserMinusIcon} from '@heroicons/react/24/outline'
import { serverTimestamp } from 'firebase/firestore'
import React, { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { unfollow } from '../../../store/FollowersSlice'
import { fetchCreatePost, fetchRemovePost, removeComment, removeLike, sendLike, writeAComment } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useDate from '../../hooks/useDate'
import useInput from '../../hooks/useInput'
import { IComment, IFile, IPost, IUserInfo, userID } from '../../types/data'
import AddMessageForm from '../AddMessageForm'
import ContentBlock from '../ContentBlock'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import OptionsMenuItem from '../optionsMenu/OptionsMenuItem'
import SoicalActivity from '../SoicalActivity'
import UserImg from '../UserImg'
import CommentCard from './CommentCard'
import { Navigation,Pagination } from 'swiper';
import "./Post.scss"
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination'
import { setActive } from '../../../store/ViewPicturesSlice';



interface propsPost{
  post:IPost
}

const Post:FC<propsPost> = memo(({
  post:{
    comments,
    authorID,
    date,
    text,
    id,
    likes,
    imgs,
    userInfo,
  },
  post,
}) => {

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [filesAttachment, setFilesAttachment] = useState<IFile[]>([])
  
  const {currentUser,currentUser:{userID},allUsers} = useAppSelector(state => state.users)
  
  const dispatch = useAppDispatch()
  
  const postDate = useDate(date)


  useEffect(() => {
    setIsLike(false)
    likes.map(like =>{
      like === userID && setIsLike(true)
    })
  }, [currentUser,likes])
  
  const addComment = ()=>{
    const commentText = comment.value
    const commentAuthorID = userID
    const postAuthorID = authorID
    const postID = id

    if (commentText.length !== 0 || filesAttachment) {
      const newComment:IComment = {
        authorID:commentAuthorID,
        date:new Date,
        text:commentText,
        imgs:filesAttachment
      }  
      dispatch(writeAComment({newComment,postAuthorID,postID}))
      setShowComments(true)
      comment.setValue("")
      setFilesAttachment([])
    }
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
 
  const viewPictures = (img:IFile) =>{
    const viewPhotoArr = post.imgs.filter(item => item.name !== img.name)
    dispatch(setActive([img,...viewPhotoArr]))
  }

  const comment = useInput("",addComment)
  return (
    <ContentBlock className="post">
      <>
      {/* header post */}
        <div className="flex justify-between items-center">
          <Link to={`/${authorID}`} className="author">
            <UserImg
                src={userInfo?.profileImg.link}
                width={"48"}
                className="h-12"
              />
            <div className="flex flex-col gap-0.5">
              <p>{`${userInfo?.firstName} ${userInfo?.lastName}`}</p>
              <span className='text-xs font-normal opacity-80 '>{`${postDate.time} ${postDate.day}.${postDate.month}.${postDate.year}`}</span>
            </div>
          </Link>
          {authorID === userID 
            && <OptionsMenu 
                  setIsActive={setOptionsMenuActive} 
                  isActive={optionsMenuActive} 
                  className='top-7 -right-2'
                >
            <>
              {authorID === currentUser.userID &&
                <OptionsMenuItem
                  title='Delete post'
                  Icon={TrashIcon}
                  onClick={removePost}
                />
              }
            </>
          </OptionsMenu>
          }
        </div>

        {/* conent */}
        <div className="post-content">
          <p className='font-normal'>{text}</p>
          <div className="w-full">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={0}
              slidesPerView={1}
            >
              {imgs.map(img => 
                <SwiperSlide key={img.name} className='!h-auto flex justify-center items-center'>
                  <img 
                    src={img.link} 
                    alt="" 
                    className='max-h-96 cursor-pointer' 
                    onClick={()=>viewPictures(img)} 
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
        {/*  */}
        <SoicalActivity 
          setShowComments={setShowComments}
          showComments={showComments}
          comments={comments.length}
          likes={likes.length}
          likeFunc={likeFunc}
          isLike={isLike}
        />
        {showComments && 
          <ul className="comments">
            {comments.length > 0 
              ? comments.map(comment=>
                <CommentCard
                  key={comment.authorID + comment.date}
                  authorID={comment.authorID}
                  date={comment.date}
                  text={comment.text}
                  imgs={comment.imgs}
                  removeCommentFunc={removeCommentFunc}
                />
                )
              : <div className="">
                  <p className='text-center'>No Commnets yet</p>
                </div>
          }
          </ul>
        }
        <div className="add-comment">
        <Link to={`/${userID}`}>
          <UserImg
            src={currentUser.profileImg.link}
            width="38"
            className='h-9.5'
          />
        </Link>
          <AddMessageForm
            onChange={comment.onChange}
            value={comment.value}
            onClick={addComment}
            placeHolder="Write a comment..."
            onKeyDown={comment.onKeyDown}
            setValue={comment.setValue}
            filesAttachment={filesAttachment}
            setFilesAttachment={setFilesAttachment}
          />
        </div>
      </>
    </ContentBlock>
  )
})

export default Post