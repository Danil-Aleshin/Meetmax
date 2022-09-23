import React, { useCallback, useMemo, useState } from 'react'
import { useInputReturn } from '../types/data'


const useInput = (
  initialState:string = "",
  onKeyDownFunc:()=>void = () => {},
  ):useInputReturn => {

  const [value,setValue] = useState(initialState)

  const onKeyDown:React.KeyboardEventHandler<HTMLInputElement> = 
  (e)=>{
    e.key === "Enter" && onKeyDownFunc()
  }

  const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement>) =>{
    setValue(e.target.value)
  }, [])
  // useMemo(() => value, [value])

  return {
    value,
    onChange,
    setValue,
    onKeyDown,
  }
}

export default useInput



