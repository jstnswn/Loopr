import React, { useState } from 'react';
import './Photostream.css';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';
import { Modal } from '../../../context/Modal';
import ImageView from '../../ImageModal/ImageView';
import UploadPhotos from '../../UploadModal';


export default function Photostream() {
  const [showIdx, setShowIdx] = useState(null);
  const images = useSelector(getUserImagesArray);
  const images2 = [...images, ...images, ...images].reverse();

  const openModal = (idx) => setShowIdx(idx);
  const closeModal = () => setShowIdx(null);

  let header;
  if (!images.length) header = 'You don\'t have any images';
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

        <div className='photostream'>
          {images2.map((image, idx) => {

            return (
              <div key={idx}>
                <img
                  className='stream-image'
                  key={idx}
                  src={image.imageUrl}
                  alt={image.title}
                  onClick={() => openModal(idx)}
                  style={{
                    gridColumnStart: idx % 4 + 1,
                  }}
                >
                </img>
                {showIdx === idx && (
                  <Modal onClose={closeModal}>
                    <ImageView image={image} closeModal={closeModal} />
                  </Modal>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
