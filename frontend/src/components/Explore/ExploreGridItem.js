import React, { useState } from 'react'

export default function ExploreGridItem({ image }) {
  const [showOptions, setShowOptions] = useState(false);

  const showIcons = () => setShowOptions(true);
  const hidIcons = () => setShowOptions(false);

  return (
    <>
      <img
        className='explore-grid-item'
        src={image.imageUrl}
        alt={image.title}
        onMouseEnter={showIcons}
        onMouseLeave={hidIcons}
      />
    </>
  )
}
