import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebaseConfig'
import { follow, unfollow } from '../../../store/FollowersSlice'
import { addToFriends, friendRequest, removeFriendRequest, removeFromFriends } from '../../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { ICommunity, IPost, IUserInfo } from '../../types/data'
import Button from '../../ui/Button'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post' 
import Intro from './Intro'
import { changeProfileImg } from '../../../store/EditProfileSlice'
import { startAChat } from '../../../store/ChatSlice'
import UserImg from '../../ui/UserImg'
import { ChatBubbleOvalLeftEllipsisIcon, UserPlusIcon, UserMinusIcon, EnvelopeIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline'
import ContentBlock from '../../ui/ContentBlock'
import './Profile.scss'
import NotFoundPage from '../NotFoundPage'


const Profile:FC = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>()

  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const [userFriends, setUserFriends] = useState<ICommunity[]>([])
  const [userFollowers, setUserFollowers] = useState<ICommunity[]>([])
  const [userFollowing, setUserFollowing] = useState<ICommunity[]>([])
  const [isFollowing, setIsFollowing] = useState<ICommunity>()
  const [isFriend, setIsFriend] = useState(false)
  const [isFriendReq, setIsFriendReq] = useState(false)
  const [isMyFriendReq, setIsMyFriendReq] = useState(false)

  const {id} = useParams()
  const {userID} = useAppSelector(state => state.auth)
  const {allUsers,currentUser} = useAppSelector(state => state.users)
  const {currentUserFollowing,loading,status} = useAppSelector(state => state.followers)
  const {currentUserFriends,currentUserFriendRequests,myFriendRequests} = useAppSelector(state => state.friends)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  useEffect(() => {

    const uid = id ? id : ""
    allUsers.map(user => {
      if(user.userID === id){
        setUserInfo(user)
      }
    })
    if (userInfo) {
      const fetchPosts = onSnapshot(collection(db, "posts", uid,"data"), (querySnapshot) =>{
        let postsData:IPost[] = []
        querySnapshot.forEach((doc) => {
          postsData.push(doc.data() as IPost);
      });
        allUsers.map(user => {
          postsData = postsData.map(post=>
            user.userID === post.authorID
              ? {...post, userInfo:user}
              : post
          )
        })
        postsData.sort((a,b) => a.date > b.date ? -1 : 1)
        setUserPosts(postsData)
      })
  
      const fetchFollowers = onSnapshot(query(collection(db, "followers",uid,"data")), (querySnapshot) =>{
        const followersData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          followersData.push(doc.data() as ICommunity);
      });
        setUserFollowers(followersData)
      })
  
      const fetchFollowing = onSnapshot(query(collection(db, "following",uid,"data")), (querySnapshot) =>{
        const followingData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          followingData.push(doc.data() as ICommunity);
      });
        setUserFollowing(followingData)
      })
  
      const fetchFriends = onSnapshot(query(collection(db, "friends",uid,"data")), (querySnapshot) =>{
        const friendsData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          friendsData.push(doc.data() as ICommunity);
      });
        setUserFriends(friendsData)
      })
  
      return () => {
        fetchPosts()
        fetchFriends()
        fetchFollowers()
        fetchFollowing()
      }
    }else{
      // console.log(userInfo)
      //  navigate("/")
    }
  }, [allUsers,id])

  

  const uploadImg = (e:any) =>{
    const newImg = e.target.files[0]
    newImg.path = `profileImages/${userID}`
    newImg.link = ""
    const currentImg = currentUser.profileImg
    dispatch(changeProfileImg({newImg,userID,currentImg}))
  }

  useEffect(() => {
    setIsFollowing(undefined)
    currentUserFollowing.map(following => 
      following.userID === id && setIsFollowing(following)
    )
  }, [id,currentUserFollowing,userFollowers])


  useEffect(() => {
    setIsFriendReq(false)
    currentUserFriendRequests.map(user => 
      user.userID === id && setIsFriendReq(true)
    )
  }, [id,currentUserFriendRequests])

  useEffect(() => {
    setIsMyFriendReq(false)
    myFriendRequests.map(user => 
      user.userID === id && setIsMyFriendReq(true)
    )
  }, [id,myFriendRequests])

  useEffect(() => {
    setIsFriend(false)
    currentUserFriends.map(user =>{
      if (user.userID === id) {
        setIsFriend(true)
      }
    })
  }, [id,currentUserFriends,isFriendReq])


  //func
  const addToFriendsFunc = () => {
    const newFriendID = id ? id : ""
    dispatch(friendRequest({newFriendID,userID}))
  }

  const acceptFriendRequest = () =>{
    const newFriendID = id ? id : ""
    dispatch(addToFriends({newFriendID,userID}))
  }

  const removeFriendRequestFunc = () =>{
    const newFriendID = id ? id : ""
    dispatch(removeFriendRequest({newFriendID,userID}))
  }

  const removeFromFriendsFunc = () => {
    const newFriendID = id ? id : ""
    dispatch(removeFromFriends({newFriendID,userID}))
  }


  const followFunc = () =>{
    const followerID = id ? id : ""
    if (!loading) {
      dispatch(follow({userID,followerID}))
    }
  }

  const unFollowFunc = () =>{
    const followerID = id ? id : ""
    if (!loading) {
      dispatch(unfollow({followerID,userID}))
    }
  }

  const startAChatFunc = async () =>{
    if (userInfo) {
      const companionID = userInfo.userID
      const docSnap = await getDoc(doc(db, "chats", userID, "companion", companionID ))
      if (docSnap.exists()) {
        navigate(`/messages/${userInfo.userID}`)
      } else {
        dispatch(startAChat({companionID,userID}))
        navigate(`/messages/${userInfo.userID}`)
      }
    }
  }


  return (
    <div className='w-full'>
      <div className="shadow-xl rounded-xl p-4 flex justify-between">
        <div className="w-fit flex flex-col gap-1 items-start">
          <div className="profile__img h-37.5">
              <UserImg
                className='h-full'
                width='150'
                src={userInfo?.profileImg.link}
              />
            {id === userID &&
            <>
              <label className='new-img' htmlFor='newImgBtn'></label>
              <input 
                type={"file"}
                id="newImgBtn"
                onChange={(e:any)=>uploadImg(e)}
                className="hidden"
                accept="image/jpeg, image/png"
              />
            </>
            }
          </div>
          <h1 className='text-2xl'>
            {`${userInfo?.firstName ? userInfo.firstName : "User Not Found"} 
            ${userInfo?.lastName ? userInfo.lastName : ""}`}
          </h1>
          {userID === id && userInfo ?
          <div className="flex items-center gap-4 mt-2">
            {isFollowing
              ? <Button title='Unfollow' onClickFunc={unFollowFunc}/>
              : <Button title='Follow' onClickFunc={followFunc}/>
            }
          {!isFriend && !isFriendReq && !isMyFriendReq
            ? <UserPlusIcon 
                className='icon w-6 cursor-pointer' 
                onClick={()=>addToFriendsFunc()}
              />
            : undefined
          }
          {isFriendReq 
            && <div className="flex p-1 gap-0.5 border rounded-xl" onClick={acceptFriendRequest}>
            <EnvelopeIcon className='icon w-5.5 cursor-pointer'/>
            <UserPlusIcon className='icon w-5.5 cursor-pointer'/>
          </div>
          }
          {isMyFriendReq &&
            <div className="flex p-1 gap-0.5 border rounded-xl" onClick={removeFriendRequestFunc}>
              <EnvelopeIcon className='icon w-5.5 cursor-pointer'/>
              <UserMinusIcon className='icon w-5.5 cursor-pointer'/>
            </div>
          }
          {isFriend 
            && <UserMinusIcon 
                  className='icon w-6 cursor-pointer' 
                  onClick={()=>removeFromFriendsFunc()}
                />
          }
          <ChatBubbleOvalLeftEllipsisIcon className='icon w-6 cursor-pointer' onClick={()=>startAChatFunc()}/>
        </div>
          : null
        }
        </div>
          <Intro
            followers={userFollowers.length}
            following={userFollowing.length}
            friends={userFriends.length}
            dateOfBirthday={userInfo?.dateOfBirthday}
            location={userInfo?.location}
          />
      </div>
      <div className="mt-8">
        <div className="w-full flex flex-col gap-7">
          {
            id === userID && 
              <CreatePostForm/>
          }
          {userPosts.length > 0 
            ? userPosts.map(post => 
                <Post
                  key={post.id}
                  post={post}
                />
              )
            : <ContentBlock className="w-full">
                <div className='flex flex-col gap-2 items-center justify-center'>
                  <ArchiveBoxIcon className='w-12'/>
                  <p className=''>There are no posts on the wall yet</p>
                </div>
              </ContentBlock>
        }
        </div>
      </div>
    </div>
  )
}

export default Profile