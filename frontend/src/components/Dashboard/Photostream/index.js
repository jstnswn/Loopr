import React, { useState } from 'react';
import './Photostream.css';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';
import { Modal } from '../../../context/Modal';
import ImageView from '../../ImageView/ImageView';
import UploadPhotos from '../../UploadImageModal';
import PhotostreamGrid from './PhotostreamGrid';


export default function Photostream() {
  const images = useSelector(getUserImagesArray);
  const imagesLoaded = images.length > 0;
  let header;
  if (!imagesLoaded) header = 'You don\'t have any images';
  else header = 'Your Images';

  let subHeader;
  if (!images.length) subHeader = 'Your photostream is your public-facing portfolio. Start by uploading your first image!';
  else subHeader = 'Your photostream is your public-facing portfolio. Set your photos to public using the Camera Roll to populate your photostream.';

  return (

    <div className='dashboard-body'>
      <div className='dashboard-body-header'>
        <h2>{header}</h2>
        <p>{subHeader}</p>
        <UploadPhotos />
      </div>
      <div className='dashboard-body-content'>

        {imagesLoaded && <PhotostreamGrid images={images} />}


      </div>
    </div>
  );
}
