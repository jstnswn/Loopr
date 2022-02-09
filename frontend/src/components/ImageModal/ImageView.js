import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './ImageView.css';
import { deleteImage } from '../../store/dashboard';
import EditImageForm from './EditImageForm';

export default function ImageView({ image, closeModal }) {
  const [showDelConfirm, setShowDelConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();


  const openDelConfirm = (e) => {
    e.stopPropagation()
    if (showDelConfirm) return;
    setShowDelConfirm(true);
  };

  const openEditForm = (e) => {
    e.stopPropagation();
    // if (openEdit) return;
    setShowEdit(true);
  };


  const closeMenu = () => {
    setShowDelConfirm(false);
  }

  useEffect(() => {
    if (!showDelConfirm) return;
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu)
  }, [showDelConfirm]);



  return (
    <div className='modal-image-container'>

      <img className='modal-image' src={image.imageUrl} alt={image.title}></img>
      <div className='image-view-footer'>
        <div className='image-info'>
          <p>{image.title}</p>
          <p>{image.Album.title}</p>

        </div>
        <p>{image.description}</p>
        <div className='image-view-icons'>
          <i className='far fa-star'></i>
          <i className='far fa-edit' onClick={openEditForm}></i>
          <i className='fal fa-trash' onClick={openDelConfirm}></i>
        </div>

      </div>
      {showDelConfirm && (
        <div className='confirm-delete'>
          <p>Delete image?</p>
          <div>
            <p onClick={closeMenu}>No</p>
            <p onClick={() => dispatch(deleteImage(image))}>Yes</p>
          </div>
        </div>
      )}
      {showEdit && <EditImageForm image={image} setShowEdit={setShowEdit} />}
    </div>
    // <h2 className='test'>hi</h2>
  )
}
