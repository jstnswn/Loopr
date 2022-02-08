import React from 'react';
import './Photostream.css';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';


export default function Photostream() {
  const images = useSelector(getUserImagesArray);

  return (
    <div className='photostream'>
      {images.map(image => (
        <div className='stream-image-container'>
          <img className='stream-image' key={image.id} src={image.imageUrl} alt={image.title}></img>
        </div>
      ))}
    </div>
  )
}
