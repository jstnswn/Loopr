import React from 'react';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';


export default function Photostream() {
  const images = useSelector(getUserImagesArray);

  return (
    <div className='photostream'>
      {/* {images.map(image => (
        <img key={image.id} src={image.imageUrl} alt={image.title}></img>
      ))} */}
    </div>
  )
}
