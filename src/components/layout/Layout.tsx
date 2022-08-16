import {FC, useEffect} from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import'./Layout.scss'
import { useLocation } from 'react-router-dom'
import { IGlobalContentData, IPost, IProfile, IUserData, IUserInfo } from '../types/data'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { doc, onSnapshot, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { getPosts } from '../../store/PostsSlice'
import { getChats } from '../../store/ChatSlice'
import { getProfile, getUserInfo } from '../../store/AuthenticationSlice'
import { getCurrentUser, getUserPosts } from '../../store/UsersSlice'


interface propsLayout{
  children:JSX.Element
}


const Layout:FC<propsLayout> = ({children}) => {

  const location = useLocation()
  const {isAuth,userID} = useAppSelector(state=> state.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(isAuth){
      const unsubscribe = onSnapshot(doc(db, "users", userID,"profile","data"),(doc)=>{
        const data = doc.data() as IProfile
        dispatch(getCurrentUser(data))
        
      });
      return () => unsubscribe()
    }
  }, [isAuth])

  useEffect(() => {
    if(isAuth){
      const unsubscribe = onSnapshot(doc(db, "users",userID,"posts","data"),(doc)=>{
        const data = doc.data() as any
        dispatch(getUserPosts(data.posts))
        
      });
      return () => unsubscribe()
    }
  }, [isAuth])

  useEffect(() => {
    if(isAuth){
      const unsubscribe = onSnapshot(doc(db, "users", userID,"userInfo","data"),(doc)=>{
        const data = doc.data() as IUserInfo
        dispatch(getUserInfo(data))
        
      });
      return () => unsubscribe()
    }
  }, [isAuth])

  useEffect(() => {
    if(isAuth){
      const unsubscribe = onSnapshot(doc(db, "global", "posts"),(doc)=>{
        const data = doc.data() as IGlobalContentData
        dispatch(getPosts(data.posts))
      
      });
      return () => unsubscribe()
    }
  }, [isAuth])

  return (

        <div className="container">
          {location.pathname === "/login" || location.pathname === "/registration"
            ? children
            :<div className="table">
              <Sidebar/>
              <Header/>
              <main className={"mainContent"}>
                {children}
              </main>
            </div>
          }
        </div>
  )
}

export default Layout