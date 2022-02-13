import React, { useState } from 'react'

import './AlbumView.css';

export default function AlbumView({ album, closeAlumView }) {
  const [selectedImage, setSelectedImage] = useState(album?.images[0])
  // console.log('album: ', album)

  // if (!album) return <h2>You don't have any images</h2>

  return (
    <div className='album-view-container'>
      <div className='album-view album-container'>
        <img
          className='album-view album-image'
          alt={selectedImage.title}
          src={selectedImage.imageUrl}
        />
      </div>
      <div className='album-view footer'>
        <div className='album-view image-selector'>
          {album?.images.map((image, idx) => (
            // <div key={idx} className='album-view image-container'>
              <img
                key={idx}
                className='album-view image'
                onClick={() => setSelectedImage(image)}
                alt={image.title}
                src={image.imageUrl}
              />
            // </div>
          ))}
        </div>
      </div>

    </div>
  )
}
