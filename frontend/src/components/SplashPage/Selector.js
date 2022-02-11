import React from 'react';


export default function Selector({ albums, setKey }) {
  return (
    <div className='splash-selector-container'>
      {albums.map((album, idx) => (
        <div
          key={idx}
          className='splash-album-selector'
          onClick={() => setKey(idx + 1)}
        >
          {/* {album.title} */}
          <i className='fas fa-circle notch'></i>
        </div>
      ))}

    </div>
  )
}
