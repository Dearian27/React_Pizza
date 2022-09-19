import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <div className='pizza-block__wrapper'>
    <ContentLoader 
      className='pizza-block'
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="524" cy="510" r="66" /> 
      <circle cx="140" cy="122" r="121" /> 
      <rect x="0" y="269" rx="10" ry="10" width="280" height="27" /> 
      <rect x="6" y="309" rx="14" ry="14" width="269" height="79" /> 
      <rect x="3" y="410" rx="8" ry="8" width="118" height="40" /> 
      <rect x="158" y="410" rx="8" ry="8" width="118" height="40" />
    </ContentLoader>
  </div>
)

export default Skeleton
