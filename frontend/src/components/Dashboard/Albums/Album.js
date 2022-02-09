import React, { useEffect, useState } from 'react';

export default function Album({ album, idx }) {
  const [showDiv, setShowDiv] = useState(null);

  const showOptions = (idx) => {
    if (showDiv) return;
    console.log('hover', showDiv)
    setShowDiv(idx);
  };
  const hideOptions = (idx) => {
    if (showDiv === null) return;
    setShowDiv(null);
  };

  useEffect(() => {

    console.log('idx', showDiv)
  }, [showDiv])

  return (
    <div className='album-container'>
      <div className='album-overlay'>f</div>
      <img
        className='album-grid-image'
        alt={album.title}
        src={album.images[0].imageUrl}
        style={{
          gridColumnStart: idx % 3 + 1
        }}
        onMouseEnter={() => showOptions(idx)}
        onMouseLeave={() => hideOptions(idx)}
      />
      <div
        className='album-info'
        style={{ bottom: showDiv !== null ? '10px' : '-23px' }}
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
  )
}
