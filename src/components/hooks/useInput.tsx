import React, { useCallback, useMemo, useState } from 'react'

interface useInputReturn{
  value:string,
  onChange:(e:React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement>)=>void,
  setValue:React.Dispatch<React.SetStateAction<string>>
  onKeyDown:React.KeyboardEventHandler<HTMLInputElement>,
}

const useInput = (
  onKeyDownFunc:()=>void,
  initialState:string = ""
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



