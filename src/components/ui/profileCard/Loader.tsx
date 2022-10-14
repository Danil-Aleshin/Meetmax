import React from 'react'
import ContentLoader from "react-content-loader"

const Loader = () => {
  return (
    <ContentLoader
      speed={2}
      width={162}
      height={55}
      viewBox="0 0 170 55"
      backgroundColor="#d6d6d6"
      foregroundColor="#a6a6a6"
    >
      <circle cx="26" cy="26" r="26" /> 
      <rect x="65" y="21" rx="4" ry="4" width="104" height="10" />
    </ContentLoader>
  )
}

export default Loader