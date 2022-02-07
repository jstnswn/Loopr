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
      <button className='nav-login' onClick={openModal}>Upload Image</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <UploadForm />
        </Modal>
      )}
    </>
  )
}
