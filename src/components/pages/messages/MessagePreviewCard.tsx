import { StarIcon } from '@heroicons/react/solid'
import { doc, onSnapshot } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { IChat, IUserData, TypeSetState } from '../../types/data'

interface propsMessagePreviewCard extends IChat{
  setShowChatID:TypeSetState<string>,
}

const MessagePreviewCard:FC<propsMessagePreviewCard> = ({
  companionID,
  setShowChatID,
}) => {
  const [cardInfo, setCardInfo] = useState<any>()
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users",companionID),(doc)=>{ // this
      const data = doc.data() as IUserData
        // setCardInfo(data)
        setCardInfo(data.profile)
    });
    return () => unsubscribe()
  }, [])

  return (
    <li onClick={()=>setShowChatID(companionID)} className='flex justify-between p-4 rounded-xl cursor-pointer'>
      <div className="flex gap-2 cursor-pointer">
        <img src={"/img/profileImg.jpg"} className='rounded-full h-11' width={44} alt="" />
        <div className="flex flex-col gap-1">
          <h2>{cardInfo?.firstName + " " + cardInfo?.lastName}</h2>
          <p className='text-xs dark:text-superLightGray opacity-80'>Thanks buddy, you to...</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5 ">
        <p>11:33 pm</p>
        {/* <span className=' text-center text-sm inline-block h-5 w-5 bg-red rounded-md'>1</span> */}
        {/* <StarIcon className='text-green w-4.5 cursor-pointer'/> */}
      </div>
    </li>
  )
}

export default MessagePreviewCard