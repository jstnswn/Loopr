import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../store/dashboard';

export default function ImageView({ image, closeModal }) {
  const [showDelConfirm, setShowDelConfirm] = useState(false);
  const [showEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const openDelConfirm = (e) => {
    e.stopPropagation()
    if (showDelConfirm) return;
    setShowDelConfirm(true);
  };

  const openEditForm = (e) => {
    e.stopPropagation();
    // if (openEdit) return;
    // set
  };

  const closeMenu = () => setShowDelConfirm(false);

  useEffect(() => {
    if (!showDelConfirm) return;

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu)
  }, [showDelConfirm]);


  return (
    <div className='modal-image-container'>

      <img className='modal-image' src={image.imageUrl} alt={image.title}></img>
      <div className='image-view-icons'>
        <i className='far fa-star'></i>
        <i className='far fa-edit'></i>
        <i className='fal fa-trash' onClick={openDelConfirm}></i>
      </div>
      {showDelConfirm && (
        <div className='confirm-delete'>
          <p>Delete image?</p>
          <div>
            <p onClick={closeMenu}>No</p>
            <p onClick={() => dispatch(deleteImage(image.id))}>Yes</p>
          </div>
        </div>
      )}
    </div>
    // <h2 className='test'>hi</h2>
  )
}
