import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadExplore } from '../../store/dashboard';
import { getExploreMainImages } from '../../store/explore';
// import { getExploreMainImages } from '../../store/explore';
import './Explore.css';
import MainImagesModule from './MainImages';

export default function Explore() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const session = useSelector(({ session }) => session );
  const sessionUser = session?.user;
  const darkModeOn = session.darkMode

  useEffect(() => {
    if (sessionUser) {
      dispatch(loadExplore())
        .then(() => setIsLoaded(true));
    } else {
      dispatch(getExploreMainImages())
        .then(() => setIsLoaded(true));
    }
  }, [dispatch, sessionUser])

  return isLoaded && (
    <div className='explore-container' id={darkModeOn && 'dark-background'}>
      <h2>Explore public facing images from all users.</h2>
      <MainImagesModule />
    </div>
  )
}
