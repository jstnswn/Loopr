import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserImagesArray } from '../../../store/dashboard';
import { Modal } from '../../../context/Modal';
import ImageView from '../../ImageModal/ImageView';

export default function PhotostreamGrid({ images }) {
  const [showIdx, setShowIdx] = useState(null);
  // const images = useSelector(getUserImagesArray);
  const images2 = [...images, ...images, ...images].reverse();

  const openModal = (idx) => setShowIdx(idx);
  const closeModal = () => setShowIdx(null);

  return (
    <div className='photostream-grid'>
      {images2.map((image, idx) => (
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
          />
          {showIdx === idx && (
            <Modal onClose={closeModal}>
              <ImageView image={image} closeModal={closeModal} />
            </Modal>
          )}
        </div>
      ))}
    </div>
  )
};
