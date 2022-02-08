import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Dashboard.css';

// import UploadPhotos from '../UploadModal';
import DashboardBody from './DashboardBody';
import { loadDashboard } from '../../store/dashboard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(({ session }) => session.user)

  useEffect(() => {
    dispatch(loadDashboard())
      .then(() => setIsLoaded(true));
  },[dispatch])

  return isLoaded && (
    <div className='dashboard-container'>
      <div className='cover-container'>
        <img className='cover-image' src='images/cover-placeholder.jpeg' alt='cover'></img>
        <div className='cover-user-container'>
          <img className='dashboard-avatar' src={user.imageUrl} alt='avatar'></img>
          <div className='dashboard-user-info'>
            <div className='top'>
              <h2>{user.username}</h2>
              <i className='fas fa-ellipsis-h cover-more-button'></i>
            </div>

            <ul className='bottom'>
              <li>Follower</li>
              <li>Following</li>
            </ul>

          </div>
        </div>
      </div>
      <div className='dashboard-nav'>
        <p>Photostream</p>
        <p>Albums</p>
        <p>Faves</p>
        <p>Loop Station</p>
      </div>
      <DashboardBody />
    </div>
  );
}
