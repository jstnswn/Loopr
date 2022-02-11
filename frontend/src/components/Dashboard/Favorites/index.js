import React from 'react';
import { useSelector } from 'react-redux';
import { getFavoriteImagesArray } from '../../../store/dashboard';
import FavoritesGrid from './FavoritesGrid';

import './Favorites.css';

export default function Favorites() {
  const images = useSelector(getFavoriteImagesArray);
  const imagesLoaded = images.length > 0;

  let header;
  let subHeader;
  if (!imagesLoaded) {
    header = 'Start picking your favorites. Just click on the star';
    subHeader = 'Like something you see? Let the photographer know by clicking on the star icon.';
  } else {
    header = 'Your Favorites'
    // subHeader = 'Like something you see ? Let the photographer know by clicking on the star icon.';
  }
  return (

    <div className='dashboard-body'>
      <div className='dashboard-body-header favorites'>
        <h2>{header}</h2>
        <p>{subHeader}</p>
      </div>
      <div className='dashboard-body-content'>

      {imagesLoaded && <FavoritesGrid images={images}/>}

      </div>
    </div>
  );
}
