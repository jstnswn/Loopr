import React, { useState } from 'react'
import { Modal } from '../../context/Modal';
import EditIcon from '../ImageView/EditIcon';
import ImageView from '../ImageView/ImageView';

export default function ExploreGridItem({ image }) {
  const [showModal, setShowModal] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const viewImage = () => setShowModal(true);
  const closeViewImage = () => setShowModal(false);

  return (
    <>
      <img
        className='explore-grid-item'
        src={image.imageUrl}
        alt={image.title}
        onMouseEnter={() => setHovered1(true)}
        onMouseLeave={() => setHovered1(false)}
        onClick={viewImage}
      />


      <div className={`explore-item-overlay ${hovered1 || hovered2 ? 'active' : ''}`}></div>
      <div className={`explore-item-options ${hovered1 || hovered2 ? 'active' : ''}`}
        onMouseEnter={() => setHovered2(true)}
        onMouseLeave={() => setHovered2(false)}
      >
        <div className='explore-item-info'>
          <p className='title'>{image.title}</p>
          <p className='user'>{`from: @${image.User.username}`}</p>
        </div>
        <div className='icons'>
          <EditIcon image={image} />
        </div>
      </div>

      {showModal && (
        <Modal onClose={closeViewImage}>
          <ImageView image={image} closeModal={closeViewImage} option='explore'/>
        </Modal>
      )}

    </>
  )
}
