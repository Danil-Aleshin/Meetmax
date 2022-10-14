import {FC} from 'react'
import ContentLoader from 'react-content-loader'

const Loader:FC = () => {
  return (
    <ContentLoader 
      speed={2}
      width={135}
      height={40}
      viewBox="0 0 135 40"
      backgroundColor="#d6d6d6"
      foregroundColor="#a6a6a6"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
      <circle cx="20" cy="20" r="20" />
  </ContentLoader>
  )
}

export default Loader