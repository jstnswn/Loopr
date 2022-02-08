import React from 'react';

export default function ImageView({ image }) {
  console.log('image', image)
  return (
    <div className='modal-image-container'>

    <img className='modal-image' src={image.imageUrl} alt={image.title}></img>
    </div>
    // <h2 className='test'>hi</h2>
  )
}
