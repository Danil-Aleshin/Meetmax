import { collection, onSnapshot, query } from 'firebase/firestore'
import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { db } from '../../firebaseConfig'
import { getChats } from '../../store/ChatSlice'
import { getFollowers, getFollowing } from '../../store/FollowersSlice'
import { getFriendRequests, getFriends, getMyFriendRequests } from '../../store/FriendsSlice'
import { setIsLoading} from '../../store/PreloaderSlice'
import { getAllUsers, getCurrentUser } from '../../store/UsersSlice'
import { setDeactive } from '../../store/ViewPicturesSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import Friends from '../pages/friends/Friends'
import Home from '../pages/home/Home'
import Messages from '../pages/messages/Messages'
import MyCommunity from '../pages/myCommunity/MyCommunity'
import NotFoundPage from '../pages/NotFoundPage'
import Profile from '../pages/profile/Profile'
import Settings from '../pages/settings/Settings'
import { IChat, IChatData, ICommunity, IProfile, IUserInfo } from '../types/data'
import Preloader from '../ui/Preloader'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'



const Layout:FC = () => {

  const {pictures,isActive} = useAppSelector(state => state.viewPictures)
  const {isAuth,userID} = useAppSelector(state=> state.auth)
  const {allUsers} = useAppSelector(state => state.users)
  const {isLoading} = useAppSelector(state => state.preloader)
  const dispatch = useAppDispatch()



useEffect(() => {
  if (isAuth) {
    const fetchUsers = onSnapshot(
      query(collection(db, "users")),
      (querySnapshot) =>{
      const usersData:IUserInfo[] = []
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data() as IUserInfo);
    });
      usersData.map(user =>
        user.userID === userID && dispatch(getCurrentUser(user))
      )
      dispatch(getAllUsers(usersData))
      
    })

    return () => {
      fetchUsers()
    }
  }
}, [isAuth])

  useEffect(() => {
    if (isAuth) {
      const userProfile = (arr:ICommunity[]):IProfile[] =>{
        const userData:IProfile[] = []
        allUsers.map(user => {
          arr.map(item=>{
            user.userID === item.userID && userData.push({
              userInfo:user,
              userID:item.userID
            })
          })
        })
        return userData
      }
      const fetchChats = onSnapshot(query(collection(db, "chats",userID,"companion")), (querySnapshot) =>{
        const chatsData:IChatData[] = []
        querySnapshot.forEach((doc) => {
          chatsData.push(doc.data() as IChatData);
      });
      
      const userData:IChat[] = []
      allUsers.map(user => {
        chatsData.map(chat=>{
          user.userID === chat.companionID && userData.push({
            userInfo:user,
            chat
          })
        })
      })
        dispatch(getChats(userData))
      })


      const fetchFriends = onSnapshot(query(collection(db, "friends",userID,"data")), (querySnapshot) =>{
        const friendsData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          friendsData.push(doc.data() as ICommunity);
        });
        dispatch(getFriends(userProfile(friendsData)))
      })

      const fetchMyFriendRequests = onSnapshot(query(collection(db, "friends",userID,"myFriendRequests")), (querySnapshot) =>{
        const friendsData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          friendsData.push(doc.data() as ICommunity);
      });
        dispatch(getMyFriendRequests(userProfile(friendsData)))
      })

      const fetchFriendRequests = onSnapshot(query(collection(db, "friends",userID,"friendRequests")), (querySnapshot) =>{
        const friendsData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          friendsData.push(doc.data() as ICommunity);
      });
        dispatch(getFriendRequests(userProfile(friendsData)))
      })

      const fetchFollowers = onSnapshot(
        query(collection(db, "followers",userID,"data")), 
        (querySnapshot) =>{
        const followersData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          followersData.push(doc.data() as ICommunity);
      });
        dispatch(getFollowers(userProfile(followersData)))
      })

      const fetchFollowing = onSnapshot(query(collection(db, "following",userID,"data")), (querySnapshot) =>{
        const followingData:ICommunity[] = []
        querySnapshot.forEach((doc) => {
          followingData.push(doc.data() as ICommunity);
      });
        dispatch(getFollowing(userProfile(followingData)))
        dispatch(setIsLoading(false)) 
      })

      return () =>{
      fetchChats()
        fetchFriends()
        fetchMyFriendRequests()
        fetchFriendRequests()
        fetchFollowing()
        fetchFollowers()
      }
    }
  }, [allUsers])

  const closeViewPictures = (e:any) =>{
    if (e.target.id === "viewPicturesWindow") {
      dispatch(setDeactive())
    }
  }
  
  return (
    <>
    { isLoading ? <Preloader/>
      : <div className="table">
        <Sidebar/>
        <Header/>
        <main className={"mainContent"}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='friends/*' element={<Friends/>}/>
          <Route path='my-community/*' element={<MyCommunity/>}/>
          <Route path='messages/*' element={<Messages/>}/>
          <Route path='settings/*' element={<Settings/>}/>
          <Route path=':id' element={<Profile/>}/>
        </Routes>
        </main>
      </div>
    }
      {isActive && 
        <div 
          id="viewPicturesWindow"
          className='absolute top-0 left-0 w-full h-full bg-opacityBlack z-50 overflow-hidden'
          onMouseDown={(e:any)=>closeViewPictures(e)}
        >
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center bg-lightGray dark:bg-lightBlack h-5/6'>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={0}
              slidesPerView={1}
            >
              {pictures.map(img => 
                <SwiperSlide key={img.name} className='!h-auto flex justify-center items-center'>
                  <img src={img.link} alt="" className='w-full' />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      }
  </>
  )
}

export default Layout