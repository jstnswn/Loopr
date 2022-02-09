import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAlbumsArray } from '../../../store/dashboard';
import AlbumsGrid from './AlbumsGrid';

export default function Albums() {
  const [showIdx, setShowIdx] = useState(null);
  const albums = useSelector(getUserAlbumsArray);
  const hasAlbums = albums.length > 0;

  return (

    <div className='dashboard-body'>
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
                {/* <i className='fa-solid fa-plus'></i> */}
                <div className='add-new-album'>+ New album</div>
              </div>
            </div>
            <AlbumsGrid albums={albums} />
          </>
        )}

      </div>
    </div>
  );
}
