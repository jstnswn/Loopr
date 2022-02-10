import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadImageForm from './UploadImageForm';

export default function UploadImageModal({ option }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  let button;
  if (option === 'icon') {
    button = (
      <i className='upload nav fas fa-cloud-upload' onClick={openModal}></i>
      )
    } else {
      button = (
      <button className='modal-button upload-image button' onClick={openModal}>Upload Image</button>
    )
  }

  return (
    <>
      {button}
      {showModal && (
        <Modal onClose={closeModal}>
          <UploadImageForm closeModal={closeModal}/>
        </Modal>
      )}
    </>
  )
}
