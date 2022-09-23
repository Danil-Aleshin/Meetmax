import {FC,useEffect} from 'react'
import { TypeSetState } from '../../types/data'
import "./ModalWindow.scss"

interface propsModalWindow{
  state:boolean,
  setState:TypeSetState<boolean>
  children:JSX.Element
}
const ModalWindow:FC<propsModalWindow> = ({setState,state,children}) => {

  useEffect(() => {
    const closeaMenu = (e:any) =>{
      if (e.target.id === "modalWindowBg") {
        setState(false)
      }
    }
    document.addEventListener("click",closeaMenu)
    return () => document.removeEventListener("click",closeaMenu)
  }, [])

  return (
    <div 
      className={state 
        ? "modal-window-bg modal-window-bg--active" 
        : "modal-window-bg"
      }
      id="modalWindowBg"
    >
      {children}
    </div>
  )
}

export default ModalWindow