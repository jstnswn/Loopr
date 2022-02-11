import React, { useState } from 'react';
import Album from './Album';
import './AlbumGrid.css';

export default function AlbumsGrid({ albums }) {
  // const [showIdx, setShowIdx] = useState(null);


  // const albums2 = [...albums].reverse();

  // const openModal = (idx) => setShowIdx(idx);
  // const closeModal = () => setShowIdx(null);



  return (
    <div className='album-grid'>
      {albums.map((album, idx) => (
        <Album key={idx} album={album} idx={idx}/>
      ))}
    </div>
  );
};
