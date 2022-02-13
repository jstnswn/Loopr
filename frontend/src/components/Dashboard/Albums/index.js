import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { getUserAlbumsArray } from '../../../store/dashboard';
import UploadAlbumForm from '../../AlbumUpload/UploadAlbumForm';
import AlbumsGrid from './AlbumsGrid';

export default function Albums() {
  const [showModal, setShowModal] = useState(false);
  const albums = useSelector(getUserAlbumsArray);
  const hasAlbums = albums.length > 0;

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false);

  return (
    <>
      {!hasAlbums && (
        <div className='dashboard-body-header'>
          <h2>Let's make an album.</h2>
          <p>Easily organize all your photos into beautiful albums to share with friends, or family.</p>
          <button>Upload album</button>
        </div>
      )}
      <div className='dashboard-body-content'>

        {hasAlbums && (
          <>
            <div className='album-options'>
              <div>
                <div className='album-upload modal-button add-new-album' onClick={openModal}>+ New Album</div>
                {showModal && (
                  <Modal onClose={closeModal}>
                    <UploadAlbumForm closeModal={closeModal} />
                  </Modal>
                )}
              </div>
            </div>
            <AlbumsGrid albums={albums} />
          </>
        )}

      </div>
    </>
  );
}
