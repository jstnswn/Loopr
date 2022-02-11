import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getExploreMainImages } from '../../store/explore';
import './Explore.css';

export default function Explore() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getExploreMainImages())
      .then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <div className='explore-container'>
      <h2>Explore</h2>
    </div>
  )
}
