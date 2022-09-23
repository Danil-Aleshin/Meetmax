import { collection, onSnapshot, query } from 'firebase/firestore'
import {FC, useEffect, useState} from 'react'
import { auth, db } from '../../../firebaseConfig'
import { deleteFile } from '../../../store/UploadFileSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'
import { IPost } from '../../types/data'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post'


const Home:FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const dispatch = useAppDispatch()
  
  const {currentUserFollowing} = useAppSelector(state => state.followers)
  const {allUsers,currentUser} = useAppSelector(state => state.users)


  useEffect(() => {
    onSnapshot(query(collection(db, "global", "posts","data")),
    (querySnapshot) =>{
      let postsData:IPost[] = []
      querySnapshot.forEach((doc
        ) => {
        postsData.push(doc.data() as IPost)
      });
      allUsers.map(user => {
        postsData = postsData.map(post=>
          user.userID === post.authorID
            ? {...post, userInfo:user}
            : post
        )
      })
      postsData.sort((a,b) => a.date > b.date ? -1 : 1)
      setPosts(postsData)
    })

  }, [allUsers,currentUserFollowing])


  return (
    <div className='w-full flex flex-col gap-7'>
      <CreatePostForm/>
      {posts.map(post => 
        <Post
          key={post.id}
          post={post}
        />
      )}
    </div>
  )
}

export default Home