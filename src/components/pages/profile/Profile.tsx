import { FC } from 'react'
import {useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appRedux'
import CreatePostForm from '../../ui/CreatePostForm'
import Post from '../../ui/post/Post' 
import {ArchiveBoxIcon } from '@heroicons/react/24/outline'
import ContentBlock from '../../ui/ContentBlock'
import './Profile.scss'
import HeaderProfile from './headerProfile/HeaderProfile'
import usePosts from '../../hooks/requestsHooks/usePosts'
import Intro from './intro/Intro'
import useFollowing from '../../hooks/requestsHooks/useFollowing'
import useFollowers from '../../hooks/requestsHooks/useFollowers'
import useFriends from '../../hooks/requestsHooks/useFriends'
import useProfile from '../../hooks/requestsHooks/useProfile'



const Profile:FC = () => {
  
  const {id = ""} = useParams()

  const {userID} = useAppSelector(state => state.auth)

  const {posts} = usePosts(id)
  const {userInfo} = useProfile(id)
  const {friends} = useFriends(id)
  const {followers} = useFollowers(id)
  const {following} = useFollowing(id)

  return (
    <div className='w-full'>
      <div className="shadow-lg rounded-xl p-4 flex-col flex sm:flex-row gap-5 sm:justify-between items-center sm:items-start">
        <HeaderProfile id={id} userInfo={userInfo}/>
        <Intro
          followers={followers?.length}
          following={following?.length}
          friends={friends?.length}
          userInfo={userInfo}
        />
      </div>
      <div className="mt-8">
        <div className="w-full flex flex-col gap-7">
          {
            id === userID && 
              <CreatePostForm/>
          }
          {posts.length > 0 
            ? posts.map(post => 
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