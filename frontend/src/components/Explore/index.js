import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadExplore } from '../../store/dashboard';
// import { getExploreMainImages } from '../../store/explore';
import './Explore.css';
import MainImagesModule from './MainImages';

export default function Explore() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    dispatch(loadExplore())
      .then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <div className='explore-container'>
      <h2>Explore public facing images from all users.</h2>
      <MainImagesModule />
    </div>
  )
}
