import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadAlbumForm from './UploadAlbumForm';

export default function AlbumModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className='album-upload modal-button add-new-album' onClick={openModal}>+ New Album</div>
      {showModal && (
        <Modal onClose={closeModal}>
          <UploadAlbumForm closeModal={closeModal}/>
        </Modal>
      )}
    </>
  )
}
