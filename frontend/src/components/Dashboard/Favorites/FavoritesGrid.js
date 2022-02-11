import React, { useState } from 'react'
import { Modal } from '../../../context/Modal';
import ImageView from '../../ImageView/ImageView';

export default function FavoritesGrid({ images }) {
  const [showIdx, setShowIdx] = useState(null);

  const images2 = images.reverse();

  const viewImage = (idx) => setShowIdx(idx);
  const closeViewImage = () => setShowIdx(null);

  return (
    (
      <div className='image-grid'>
        {images2.map((image, idx) => (
          <div key={idx}>
            <img
              className='image-grid-item'
              key={idx}
              src={image.imageUrl}
              alt={image.title}
              onClick={() => viewImage(idx)}
              style={{
                gridColumnStart: idx % 4 + 1,
              }}
            />

            {showIdx === idx && (
              <Modal onClose={closeViewImage}>
                <ImageView image={image} closeModal={closeViewImage} option='favorites'/>
              </Modal>
            )}
          </div>
        ))}
      </div>
    )
  )
}
