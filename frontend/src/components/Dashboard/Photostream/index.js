import React, { useState } from 'react';
import './Photostream.css';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';
import { Modal } from '../../../context/Modal';
import ImageView from '../../ImageView/ImageView';
import PhotostreamGrid from './PhotostreamGrid';
import UploadImageModal from '../../UploadImageModal';


export default function Photostream() {

  const darkModeOn = useSelector(({ session }) => session.darkMode);

  const images = useSelector(getUserImagesArray);
  const imagesLoaded = images.length > 0;

  let header;
  let subHeader;
  if (!imagesLoaded) {
    header = 'You don\'t have any images.';
    subHeader = 'Your photostream is your public-facing image collection. Start by uploading your first image!';
  } else {
    header = 'Your Images.';
    subHeader = 'Your photostream is your public-facing image collection.';
  }



  return (
    <>
      <div className='dashboard-body-header' id={darkModeOn ? 'dark-background' : ''}>
        <h2>{header}</h2>
        <p>{subHeader}</p>
        {/* <UploadPhotos /> */}
        <UploadImageModal />
      </div>
      <div className='dashboard-body-content'>

        {imagesLoaded && <PhotostreamGrid images={images} />}

      </div>
    </>
  );
}
