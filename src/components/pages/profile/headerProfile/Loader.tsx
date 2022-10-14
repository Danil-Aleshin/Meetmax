import {FC} from 'react'
import ContentLoader from 'react-content-loader'

const Loader:FC = () => {
  return (
    <ContentLoader 
    speed={2}
    width={150}
    height={182}
    viewBox="0 0 150 182"
    backgroundColor="#d6d6d6"
    foregroundColor="#a6a6a6"
  >
    <rect x="0" y="156" rx="4" ry="4" width="150" height="21" /> 
    <circle cx="74" cy="74" r="71" />
  </ContentLoader>
  )
}

export default Loader