import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadImageForm from './UploadImageForm';

export default function UploadModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button className='modal-button upload-image button' onClick={openModal}>Upload Image</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <UploadImageForm closeModal={closeModal}/>
        </Modal>
      )}
    </>
  )
}
