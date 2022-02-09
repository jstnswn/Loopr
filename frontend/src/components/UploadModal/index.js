import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadForm from './UploadForm';

export default function UploadModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button className='modal-button' onClick={openModal}>Upload Image</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <UploadForm closeModal={closeModal}/>
        </Modal>
      )}
    </>
  )
}
