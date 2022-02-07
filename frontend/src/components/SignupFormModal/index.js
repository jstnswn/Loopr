import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

export default function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);


  return (
    <>
      <button className='nav-signup' onClick={openModal}>Sign Up</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <SignupForm />
        </Modal>
      )}
    </>
  )
}
