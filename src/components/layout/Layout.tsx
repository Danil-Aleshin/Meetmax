import {FC, useEffect} from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import'./Layout.scss'
import { useLocation } from 'react-router-dom'
import { IChat, IChatData, ICommunity, IProfile, IUserData, IUserInfo, userID } from '../types/data'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { getAllUsers, getCurrentUser } from '../../store/UsersSlice'
import { getFriendRequests, getFriends, getMyFriendRequests } from '../../store/FriendsSlice'
import { getFollowers, getFollowing } from '../../store/FollowersSlice'
import { getChats } from '../../store/ChatSlice'
import { hidePreloader, showPreloader } from '../../store/PreloaderSlide'
import Preloader from '../ui/Preloader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import ModalWindow from '../ui/modalWindow/ModalWindow'
import { setDeactive } from '../../store/ViewPicturesSlice'
import '../ui/SwiperMainStyles.scss'

interface propsLayout{
  children:JSX.Element
}


const Layout:FC<propsLayout> = ({children}) => {

  const location = useLocation()

  const {isAuth,userID} = useAppSelector(state=> state.auth)
  const {preloaderShowing} = useAppSelector(state => state.preloader)
  const {theme} = useAppSelector(state => state.theme)
  const {allUsers} = useAppSelector(state => state.users)
  const {pictures,isActive} = useAppSelector(state => state.viewPictures)
  const dispatch = useAppDispatch()

  
  useEffect(() => {
   const root = window.document.documentElement
   root.className = ""
   root.classList.add(theme)

  }, [theme])

  useEffect(() => {
    dispatch(hidePreloader())
    if(isAuth){
        dispatch(showPreloader())
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
          dispatch(hidePreloader())
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
  }, [isAuth,allUsers])
  
  const closeViewPictures = (e:any) =>{
    if (e.target.id === "viewPicturesWindow") {
      dispatch(setDeactive())
    }
  }
  return (
    <>
    {preloaderShowing
      ? <Preloader/>
      : <div className="container">
          {location.pathname === "/login"
          || location.pathname === "/registration"
          ? children
          : <div className="table">
              <Sidebar/>
              <Header/>
              <main className={"mainContent"}>
                {children}
              </main>
              {/* <Friends/> */}
            </div>
          }
        </div>
    }
      {isActive && <div 
        id="viewPicturesWindow"
        className='absolute top-0 left-0 w-full h-full bg-opacityBlack z-50'
        onMouseDown={(e:any)=>closeViewPictures(e)}
      >
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 flex items-center justify-center bg-lightGray dark:bg-lightBlack h-5/6'>
          <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={0}
              slidesPerView={1}

            >
              {pictures.map(img => 
                <SwiperSlide key={img.name} className='!h-auto flex justify-center items-center'>
                  <img src={img.link} alt="" className='max-w-full max-h-full' />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>}
    </>
  )
}

export default Layout