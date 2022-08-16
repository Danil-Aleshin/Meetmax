import React, { useCallback, useMemo, useState } from 'react'

interface useInputReturn{
  value:string,
  onChange:(e:React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement>)=>void,
  setValue:React.Dispatch<React.SetStateAction<string>>
}

const useInput = (initialState:string = ""):useInputReturn => {

  const [value,setValue] = useState(initialState)

  const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLTextAreaElement>) =>{
    setValue(e.target.value)
  }, [])
  // useMemo(() => value, [value])

  return {
    value,
    onChange,
    setValue,
  }
}

export default useInput



