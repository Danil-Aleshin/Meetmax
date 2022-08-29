import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { FC, useEffect, useRef } from 'react'
import { TypeSetState } from '../../types/data'
import './OptionsMenu.scss'

interface propsPostOptionsMenu{
  className?:string,
  isActive:boolean,
  setIsActive:TypeSetState<boolean>,
  children:JSX.Element,
}

const OptionsMenu:FC<propsPostOptionsMenu> = ({className,isActive,setIsActive,children}) => {

  const optionsMenuRef = useRef<any>(null)

  useEffect(() => {
    document.addEventListener("click",closeMenu)

    return ()=> document.removeEventListener("click",closeMenu)
  }, [])

  const closeMenu = (e:any) =>{
    // console.log(e.target)
    if (!optionsMenuRef.current.contains(e.target)
    && e.target.id !== "optionsMenuBtn") {
      setIsActive(false)
    }
  }

  return (
    <div className="">
      <DotsHorizontalIcon
        onClick={()=>setIsActive(!isActive)} 
        className={isActive
          ? 'options-menu__btn options-menu--active'
          : 'options-menu__btn'
        }
        id="optionsMenuBtn"
      />
      <div className={isActive 
        ? "options-menu options-menu--active"
        : "options-menu"
      }>
        <ul ref={optionsMenuRef} id="optionsMenu" className={'w-fit p-3.5 flex flex-col gap-4 shadow-2xl absolute bg-white dark:bg-lightBlack rounded-xl z-40 ' + className}>
        {children}
        </ul>
      </div>
    </div>
  )
}

export default OptionsMenu