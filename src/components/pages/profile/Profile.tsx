import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db,storage } from '../../../firebaseConfig'
import { follow, unfollow } from '../../../store/FollowersSlice'
import { addToFriends } from '../../../store/FriendsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { ICommunity, IPost, IUserInfo, userID } from '../../types/data'
import Button from '../../ui/Button'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post' 
import Intro from './Intro'
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import './Profile.scss'
import { uploadImg } from '../../../store/UsersSlice'
import { startAChat } from '../../../store/ChatSlice'
import UserImg from '../../ui/UserImg'


const Profile:FC = () => {
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

  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const [userFriends, setUserFriends] = useState<ICommunity[]>([])
  const [userFollowers, setUserFollowers] = useState<ICommunity[]>([])
  const [userFollowing, setUserFollowing] = useState<ICommunity[]>([])
  const [newImg, setNewImg] = useState<any>()
  const [isFollowing, setIsFollowing] = useState<any>()

  const {id} = useParams()
  console.log(isFollowing)
  const {userID} = useAppSelector(state => state.auth)
  const {allUsers} = useAppSelector(state => state.users)
  const {currentUserFollowing} = useAppSelector(state => state.followers)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  useEffect(() => {

    const uid = id ? id : ""
    allUsers.map(user => {
      if(user.userID === id){
        setUserInfo(user)
      }
    })

    const q = query(collection(db, "posts", uid,"data"));
    const fetchPosts = onSnapshot(q, (querySnapshot) =>{
      const postsData:IPost[] = []
      querySnapshot.forEach((doc) => {
        postsData.push(doc.data() as IPost);
    });
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
  }, [allUsers,id])

  useEffect(() => {
    const uploadImgFunc = () =>{
      const name = new Date().getTime().toString() + newImg?.name
      const storageRef = ref(storage,name)

      const uploadTask = uploadBytesResumable(storageRef, newImg);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
        default:
          break;
      }
    }, 
    (error) => {
      console.log(error)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        dispatch(uploadImg({userID,downloadURL}))
      });
    }
    );
    }
    newImg && uploadImgFunc()
    setNewImg(null)
  }, [newImg])  

  useEffect(() => {
    currentUserFollowing.map(following =>following.userID === id ?setIsFollowing(following) : setIsFollowing(""))
  },[userFollowers,userFollowing])


  const addToFriendsFunc = () => {
    const newFriendID = id ? id : ""
    // dispatch(addToFriends({userID,newFriendID}))
  }

  const followFunc = () =>{
    const followerID = id ? id : ""
    dispatch(follow({userID,followerID}))
  }
  const unFollowFunc = () =>{
    const followerID = id ? id : ""
    const docID = isFollowing?.docID ? isFollowing.docID : ""

    dispatch(unfollow({followerID,userID,docID}))
  }

  const startAChatFunc = () =>{
    const companionID = userInfo.userID
    dispatch(startAChat({companionID,userID}))
    navigate("/messages")
  }

  return (
    <div>
      <div className="w-full shadow-xl rounded-xl p-7 flex justify-between">
        <div className="w-fit flex flex-col gap-1 items-center">
          <div className="profile__img h-37.5">
            <UserImg
              className='border-4 border-white h-full'
              width='150'
              src={userInfo.profileImg}
            />
            {id === userID &&
              <>
                <label className='new-img' htmlFor='newImgBtn'></label>
                <input 
                  type={"file"}
                  id="newImgBtn"
                  onChange={(e:any)=>setNewImg(e.target.files[0])}
                  className="hidden" 
                />
              </>
            }
          </div>
          <h1 className='text-2xl'>{userInfo.firstName + " " + userInfo.  lastName}</h1>
        </div>
        {userID === id ||
          <div className="">
          <Button title='Add to friends' onClickFunc={addToFriendsFunc}/>
          <Button title='Send Message' onClickFunc={startAChatFunc}/>
          {isFollowing
            ? <Button title='Unfollow' onClickFunc={unFollowFunc}/>
            : <Button title='Follow' onClickFunc={followFunc}/>
          }
        </div>
        }
      </div>
      <div className="mt-8 flex gap-6">
        <Intro
          followers={userFollowers.length}
          following={userFollowing.length}
          friends={userFriends.length}
          dateOfBirthday={userInfo.dateOfBirthday}
          location={userInfo.location}
          phoneNumber={userInfo.phoneNumber}
        />
        <div className="w-129 flex flex-col gap-7">
          {
            id === userID && 
              <CreatePostForm/>
          }
          {userPosts.map(post => 
            <Post
              key={post.id}
              authorID={post.authorID}
              comments={post.comments}
              date={post.date}
              id={post.id}
              likes={post.likes}
              share={post.share}
              text={post.text}
              imgs={post.imgs}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile