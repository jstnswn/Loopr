import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { deleteAlbum } from '../../../store/dashboard';
import EditAlbumForm from './EditAlbumForm';

export default function Album({ album, idx }) {
  const dispatch = useDispatch();
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const showConfirm = () => setShowConfirmDel(true);
  const closeConfirm = () => setShowConfirmDel(false);
  const showEdit = () => setShowEditForm(true);
  const closeEdit = () => setShowEditForm(false);



  const handleDelete = async () => {
    dispatch(deleteAlbum(album.id))
      .then(() => setShowConfirmDel(false));
  };

  let message;
  if (album.images.length) {
    message = 'Delete album and all of it\'s images ?'
  } else {
    message = 'Delete Album?'
  }

  return (
    <div className='album-container'>
      <div className='album-overlay'></div>
      <div className='icon-cover'></div>
      <img
        className='album-grid-image'
        alt={album.title}
        src={album.images[0]?.imageUrl}
        style={{
          gridColumnStart: idx % 3 + 1
        }}
        onMouseEnter={() => setHovered1(true)}
        onMouseLeave={() => setHovered1(false)}
      />
      <div
        className='album-info'
        style={{ bottom: hovered1 || hovered2 ? '10px' : '-23px' }}
        onMouseEnter={() => setHovered2(true)}
        onMouseLeave={() => setHovered2(false)}
      >
        <h4>{album.title}</h4>
        <p>{`${album.images.length} images`}</p>
        <div
          className='album-actions'
        >
          <i onClick={showConfirm} className='fal fa-trash'></i>
          <i onClick={showEdit} className='far fa-edit'></i>
          <i className='far fa-layer-plus'></i>
        </div>
      </div>
      {showConfirmDel && (
        <Modal onClose={closeConfirm}>
          <div className='confirm-delete-album'>
            <p>{message}</p>
            <div>
              <p onClick={closeConfirm}>No</p>
              <p onClick={handleDelete}>Yes</p>
            </div>
          </div>
        </Modal>
      )}
      {showEditForm && (
        <Modal onClose={closeEdit}>
          <EditAlbumForm album={album}/>
        </Modal>
      )}
    </div>
  );
};
