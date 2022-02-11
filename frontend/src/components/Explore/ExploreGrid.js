import React from 'react'

import './ExploreGrid.css';

export default function ExploreGrid({ images }) {
  const images2 = images.reverse();

  return (
    <div className='explore-grid'>
      {images2.map((image, idx) => (
        <div className='grid-item-container' key={idx}>
          <img
            className='explore-grid-item'
            src={image.imageUrl}
            alt={image.title}
          />
        </div>
      ))}
    </div>
  )
}
