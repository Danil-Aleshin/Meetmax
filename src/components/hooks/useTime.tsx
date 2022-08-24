import { } from 'react'

const useTime = (d:Date) => {

  const time = () =>{

  }

  const date = () =>{
    const date = d.getDate().toString().padStart(2,"0")
    const month = (d.getMonth() + 1).toString().padStart(2,"0")
    const year = d.getFullYear()
  }

  return (
    <></>
  )
}

export default useTime