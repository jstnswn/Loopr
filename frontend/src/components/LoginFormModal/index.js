import { useState } from 'react';

import LoginForm from './LoginForm';
import { Modal } from '../../context/Modal';


export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button onClick={openModal}>Log In</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}
