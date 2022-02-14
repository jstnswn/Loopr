import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageView.css';
import { deleteImage } from '../../store/dashboard';
import EditImageForm from './EditImageForm';
import FavoriteIcon from './FavoriteIcon';

export default function ImageView({ image, closeModal, option }) {
  const dispatch = useDispatch();
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const sessionUser = useSelector(({ session }) => session.user);

  const openDelConfirm = (e) => {
    e.stopPropagation()
    if (showConfirmDel) return;
    setShowConfirmDel(true);
  };

  const openEditForm = (e) => {
    e.stopPropagation();
    setShowEdit(true);
  };

  const closeMenu = () => {
    setShowConfirmDel(false);
  }

  useEffect(() => {
    if (!showConfirmDel) return;
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu)
  }, [showConfirmDel]);


  return (
    <div className='modal-image-container'>
      <img className='modal-image' src={image.imageUrl} alt={image.title}></img>
      <div className='image-view-footer'>
        <div className='image-info'>
          <p className='title'>{image.title}</p>
          <p className='album'>{image.Album.title}</p>
          {option === 'explore' && <p className='user'>{`from @ ${image.User.username}`}</p>}
        </div>
        <p>{image.description}</p>
        <div className='image-view-icons'>
          {sessionUser && <FavoriteIcon image={image} closeModal={closeModal} option={option} />}

          {option === 'user' && (
            <>
              <i className='far fa-edit edit-icon' onClick={openEditForm}></i>
              <i className='fal fa-trash trash-icon' onClick={openDelConfirm}></i>
            </>
          )}
        </div>

      </div>
      {showConfirmDel && (
        <div className='confirm-delete-image'>
          <p>Delete image?</p>
          <div>
            <p onClick={closeMenu}>No</p>
            <p onClick={() => {
              dispatch(deleteImage(image));
              closeModal();
            }}>Yes</p>
          </div>
        </div>
      )}
      {showEdit && <EditImageForm image={image} setShowEdit={setShowEdit} />}
    </div>
  );
};
