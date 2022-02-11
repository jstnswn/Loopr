import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageView.css';
import { deleteImage } from '../../store/dashboard';
import EditImageForm from './EditImageForm';

export default function ImageView({ image, closeModal, option }) {
  const dispatch = useDispatch();
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const favorites = useSelector(({ dashboard }) => dashboard.favoriteImages);

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

  const isFavorite = image.id in favorites;

  // Favorites icon
  const activeClassName = 'fas fa-star favorite-icon active';
  const inactiveClassName = 'far fa-star favorite-icon';
  const toggleToActive = (e) => e.target.className = activeClassName;
  const toggleToInactive = (e) => e.target.className = inactiveClassName;
  let className;
  let mouseEnter;
  let mouseLeave;
  if (isFavorite) {
    className = activeClassName;
    mouseEnter = toggleToInactive
    mouseLeave = toggleToActive
  } else {
    className = inactiveClassName;
    mouseEnter = toggleToActive 
    mouseLeave = toggleToInactive
  }

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
          <i
            className={className}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          />
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
            <p onClick={() => dispatch(deleteImage(image))}>Yes</p>
          </div>
        </div>
      )}
      {showEdit && <EditImageForm image={image} setShowEdit={setShowEdit} />}
    </div>
  );
};
