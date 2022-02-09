import React, { useState } from 'react';
import './AlbumGrid.css';

export default function AlbumsGrid({ albums }) {
  const [showIdx, setShowIdx] = useState(null);
  const [showDiv, setShowDiv] = useState(false);

  const albums2 = albums.reverse();

  const openModal = (idx) => setShowIdx(idx);
  const closeModal = () => setShowIdx(null);

  const showOptions = (e) => {
    if (showDiv) return;
    setShowDiv(true);
  };

  const hideOptions = (e) => {
    if (!showDiv) return;
    setShowDiv(false);
  };


  return (
    <div className='album-grid'>
      {albums2.map((album, idx) => (
        <div className='album-container' key={idx}>
          <img
            className='album-grid-image'
            alt={album.title}
            src={album.images[0].imageUrl}
            style={{
              gridColumnStart: idx % 3 + 1
            }}
            onMouseEnter={showOptions}
            onMouseLeave={hideOptions}
          />
          <div
            className='album-info'
            style={{bottom: showDiv ? '10px' : '-23px'}}
          >
            <h4>{album.title}</h4>
            <p>{`${album.images.length} images`}</p>
            <div
              className='album-actions'

            >
              <i className='fal fa-trash'></i>
              <i className='far fa-edit'></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
