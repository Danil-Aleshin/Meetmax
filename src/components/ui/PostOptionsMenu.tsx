import { BellIcon, ExclamationIcon, EyeOffIcon, TrashIcon, UserRemoveIcon } from '@heroicons/react/outline'
import { FC, useEffect, useRef } from 'react'
import { fetchRemovePost } from '../../store/PostsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/appRedux'
import { IPost, TypeSetState } from '../types/data'

interface propsPostOptionsMenu{
  className?:string,
  isActive:boolean,
  setIsActive:TypeSetState<boolean>,
  postAuthorID:string,
  postID:string,
}
const PostOptionsMenu:FC<propsPostOptionsMenu> = ({className,isActive,setIsActive,postAuthorID,postID}) => {

  const optionsMenuRef = useRef<any>(null)

  const userInfo = useAppSelector(state=> state.auth.user.userInfo)
  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)

  
  useEffect(() => {
    document.addEventListener("click",closeMenu)

    return ()=> document.removeEventListener("click",closeMenu)
  }, [])
  
  const closeMenu = (e:any) =>{
    if (!optionsMenuRef.current.contains(e.target) 
    && e.target.id !== "optionsMenuBtn") {
      setIsActive(false)
    }
  }
  const removePost = () =>{
    const userID = userInfo.userID
    dispatch(fetchRemovePost({postID,posts,userID}))
  }
  
  return (
    <div className={isActive 
      ? "transition-opacity duration-200 opacity-100" 
      : " transition-opacity duration-200 opacity-0 pointer-events-none"
    }>
      <ul ref={optionsMenuRef} id="optionsMenu" className={'w-fit p-3.5 flex flex-col gap-4 shadow-2xl absolute bg-white dark:bg-lightBlack rounded-xl z-20 ' + className}>
        <li className='flex items-center gap-3 cursor-pointer'>
          <EyeOffIcon className='w-5.5 text-blue'/>
          <p>Hide Post</p>
        </li>
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
        {postAuthorID === userInfo.userID &&
          <li onClick={()=>removePost()} className='flex items-center gap-3 cursor-pointer'>
            <TrashIcon className='w-5.5 text-blue'/>
            <p>Remove this post</p>
          </li>
        }
      </ul>
    </div>
  )
}

export default PostOptionsMenu