import React, { useState, useEffect } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Dashboard.css';

// import UploadPhotos from '../UploadModal';
import DashboardBody from './DashboardBody';
import { loadDashboard } from '../../store/dashboard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(({ session }) => session.user)

  console.log('history: ', history)
  if (history.location.pathname.endsWith('/dashboard')) {
    history.push('/dashboard/photostream');
  }
  // history.push('/dashboard');

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
      <nav className='dashboard-nav'>
        <NavLink to='/dashboard/photostream'>Photostream</NavLink>
        {/* <NavLink>Albums</NavLink>
        <NavLink>Faves</NavLink>
        <NavLink>Loop Station</NavLink> */}
      </nav>

      <DashboardBody />
    </div>
  );
}
