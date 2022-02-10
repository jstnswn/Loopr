import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

export default function Album({ album, idx }) {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [showConfirmDel, setShowConfirmDel] = useState(false);

  const showConfirm = (e) => {
    setShowConfirmDel(true);
  };

  const closeConfirm = () => {
    console.log('click');
    setShowConfirmDel(false);
  }

  return (
    <div className='album-container'>
      <div className='album-overlay'></div>
      <div className='icon-cover'></div>
      <img
        className='album-grid-image'
        alt={album.title}
        src={album.images[0]?.imageUrl}
        style={{
          gridColumnStart: idx % 3 + 1
        }}
        onMouseEnter={() => setHovered1(true)}
        onMouseLeave={(e) => {
          setHovered1(false);
        }}
      />
      <div
        className='album-info'
        style={{ bottom: hovered1 || hovered2 ? '10px' : '-23px' }}
        onMouseEnter={() => setHovered2(true)}
        onMouseLeave={(e) => {
          setHovered2(false);
        }}
      >
        <h4>{album.title}</h4>
        <p>{`${album.images.length} images`}</p>
        <div
          className='album-actions'
        >
          <i onClick={showConfirm} className='fal fa-trash'></i>
          <i className='far fa-edit'></i>
        </div>
      </div>
      {showConfirmDel && (
        <Modal onClose={closeConfirm}>
          <div className='confirm-delete-album'>
            <p>Delete album and all of it's images?</p>
            <div>
              <p className='test'>No</p>
              <p>Yes</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
