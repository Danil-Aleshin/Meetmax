import {FC, useEffect} from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import'./Layout.scss'
import { useLocation } from 'react-router-dom'
import { IChatData, ICommunity, IUserData, IUserInfo, userID } from '../types/data'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { getAllUsers, getCurrentUser } from '../../store/UsersSlice'
import Friends from '../layout/friends/Friends'
import { getFriends } from '../../store/FriendsSlice'
import { getFollowers, getFollowing } from '../../store/FollowersSlice'
import { getChats } from '../../store/ChatSlice'
import { hidePreloader, showPreloader } from '../../store/PreloaderSlide'
import Preloader from '../ui/Preloader'


interface propsLayout{
  children:JSX.Element
}


const Layout:FC<propsLayout> = ({children}) => {

  const location = useLocation()

  const {isAuth,userID} = useAppSelector(state=> state.auth)
  const {preloaderShowing} = useAppSelector(state => state.preloader)
  const dispatch = useAppDispatch()

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
    
        const fetchFollowers = onSnapshot(
          query(collection(db, "followers",userID,"data")), 
          (querySnapshot) =>{
          const followersData:ICommunity[] = []
          querySnapshot.forEach((doc) => {
            followersData.push(doc.data() as ICommunity);
        });
          dispatch(getFollowers(followersData))
        })
  
        const fetchFollowing = onSnapshot(query(collection(db, "following",userID,"data")), (querySnapshot) =>{
          const followingData:ICommunity[] = []
          querySnapshot.forEach((doc) => {
            followingData.push(doc.data() as ICommunity);
        });
          dispatch(getFollowing(followingData))
        })
  
        const fetchFriends = onSnapshot(query(collection(db, "friends",userID,"data")), (querySnapshot) =>{
          const friendsData:ICommunity[] = []
          querySnapshot.forEach((doc) => {
            friendsData.push(doc.data() as ICommunity);
        });
          dispatch(getFriends(friendsData))
        })
  
        const fetchChats = onSnapshot(query(collection(db, "chats",userID,"companion")), (querySnapshot) =>{
          const chatsData:IChatData[] = []
          querySnapshot.forEach((doc) => {
            chatsData.push(doc.data() as IChatData);
        });
          dispatch(getChats(chatsData))
          
        })
        
        return () => {
          fetchFollowing()
          fetchFollowers()
          fetchUsers()
          fetchFriends()
          fetchChats()
        }
    }
  }, [isAuth])

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
              <Friends/>
            </div>
          }
        </div>
    }
    </>
  )
}

export default Layout