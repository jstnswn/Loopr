import React, { useState } from 'react';
import './Photostream.css';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';


export default function Photostream() {
  const images = useSelector(getUserImagesArray);
  const images2 = [...images, ...images, ...images].reverse();

  const onHover = (e) => {
    // e.target.style.height = '12rem';
    // e.target.style.width = '12rem';
    // e.target.style.padding = '2px'
  };

  const onExit = (e) => {
    // e.target.style.height = '11rem';
    // e.target.style.width = '11rem';
    // e.target.style.padding = '5px'
  };

  return (
    <div className='photostream'>
      {images2.map((image, idx) => {

        return (
          <img
            className='stream-image'
            key={idx}
            src={image.imageUrl}
            alt={image.title}
            onMouseEnter={onHover}
            onMouseLeave={onExit}
            style={{
              gridColumnStart: idx % 4 + 1,
            }}
          >
          </img>
       )
})}
    </div>
  )
}
