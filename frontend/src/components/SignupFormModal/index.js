import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

export default function SignupFormModal({ option }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  let button;
  if (option === 'splash') {
    button = (
      <button className='splash-signup-button' onClick={openModal}>Start for free</button>
    )
  } else {
    button = (
      <button className='nav-signup-button' onClick={openModal}>Sign Up</button>
    )
  }

  return (
    <>
      {button}
      {showModal && (
        <Modal onClose={closeModal}>
          <SignupForm />
        </Modal>
      )}
    </>
  )
}
