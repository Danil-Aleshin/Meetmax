import {FC} from 'react'
import ContentLoader from 'react-content-loader'

const Loader:FC = () => {
  return (
    <ContentLoader
    speed={2}
    width={120}
    height={155}
    viewBox="0 0 120 155"
    backgroundColor="#d6d6d6"
    foregroundColor="#a6a6a6"

  >
    <rect x="0" y="134" rx="4" ry="4" width="120" height="18" /> 
    <rect x="0" y="108" rx="4" ry="4" width="120" height="18" /> 
    <rect x="0" y="57" rx="4" ry="4" width="120" height="18" /> 
    <rect x="0" y="82" rx="4" ry="4" width="120" height="18" /> 
    <rect x="0" y="30" rx="4" ry="4" width="120" height="18" /> 
    <rect x="0" y="4" rx="4" ry="4" width="120" height="18" />
  </ContentLoader>
  )
}

export default Loader