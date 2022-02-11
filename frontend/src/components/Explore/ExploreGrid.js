import React from 'react'

import './ExploreGrid.css';
import ExploreGridItem from './ExploreGridItem';

export default function ExploreGrid({ images }) {
  const images2 = images.reverse();

  return (
    <div className='explore-grid'>
      {images2.map((image, idx) => (
        <div className='grid-item-container' key={idx}>
          <ExploreGridItem image={image} />
        </div>
      ))}
    </div>
  )
}
