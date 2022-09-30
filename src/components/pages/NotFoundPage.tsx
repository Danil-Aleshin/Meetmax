import { FC } from "react"

const NotFoundPage:FC = () => {
  return (
    <div className="flex justify-center items-center">
      <h1 className="text-lightBlue text-9xl text-center">
        404 
        <p style={{fontSize:"33px"}}>Not Found Page</p>
      </h1>
    </div>
  )
}

export default NotFoundPage