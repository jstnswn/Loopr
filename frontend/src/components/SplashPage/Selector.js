import React from 'react';

import './Selector.css'

export default function Selector({ albums, setKey }) {
  return (
    <div className='splash-selector-container'>
      {albums.map((album, idx) => (
        <div
          key={idx}
          className='splash-album-selector'
          onClick={() => setKey(idx + 1)}
        >
          {album.title}
        </div>
      ))}

    </div>
  )
}
