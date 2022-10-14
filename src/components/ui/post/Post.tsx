import { TrashIcon} from '@heroicons/react/24/outline'
import { Timestamp } from 'firebase/firestore'
import { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchRemovePost, removeComment, removeLike, sendLike, writeAComment } from '../../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import useInput from '../../hooks/useInput'
import { IComment, IFile, IPost } from '../../types/data'
import AddMessageForm from '../AddMessageForm'
import ContentBlock from '../ContentBlock'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import OptionsMenuItem from '../optionsMenu/OptionsMenuItem'
import SoicalActivity from '../SoicalActivity'
import UserImg from '../UserImg'
import CommentCard from './CommentCard'
import { Navigation } from 'swiper';
import "./Post.scss"
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination'
import { setActive } from '../../../store/ViewPicturesSlice';
import useProfile from '../../hooks/requestsHooks/useProfile';
import { timeToTimeAgo } from '../../utils/convertDate';
import UserInfo from '../userInfo/UserInfo';



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
  },
  post,
}) => {

  const [optionsMenuActive, setOptionsMenuActive] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [filesAttachment, setFilesAttachment] = useState<IFile[]>([])
  
  const {hostUser:{
    userID,
    profileImg
  }} = useAppSelector(state => state.auth)
  
  const dispatch = useAppDispatch()

  const {userInfo} = useProfile(authorID)
  const postDate = timeToTimeAgo(date)

  useEffect(() => {
    setIsLike(false)
    likes.map(like =>{
      like === userID && setIsLike(true)
    })
  }, [likes])
  
  const addComment = ()=>{
    const commentText = comment.value
    const commentAuthorID = userID
    const postAuthorID = authorID
    const postID = id

    if (commentText.length !== 0 || filesAttachment) {
      const newComment:IComment = {
        authorID:commentAuthorID,
        date:Timestamp.fromDate(new Date),
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
          <UserInfo date={date} userInfo={userInfo}/>
          {authorID === userID 
            && <OptionsMenu 
                  setIsActive={setOptionsMenuActive} 
                  isActive={optionsMenuActive} 
                  className='top-7 -right-2'
                >
            <>
              {authorID === userID &&
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
        <Link to={`/${userID}`} className="self-start">
          <UserImg
            src={profileImg.link}
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