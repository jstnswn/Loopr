import { useState } from 'react';

import LoginForm from './LoginForm';
import { Modal } from '../../context/Modal';


export default function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className='nav-login' onClick={openModal}>Log In</div>
      {showModal && (
        <Modal onClose={closeModal}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}
