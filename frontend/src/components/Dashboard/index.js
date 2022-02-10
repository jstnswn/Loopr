import React, { useState, useEffect } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Dashboard.css';
import { loadDashboard } from '../../store/dashboard';
import Photostream from './Photostream';
import Albums from './Albums';
import Favorites from './Favorites';

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(({ session }) => session.user)

  if (history.location.pathname.endsWith('/dashboard')) {
    // history.push('/dashboard/photostream');
  }
  // history.push('/dashboard');

  useEffect(() => {
    dispatch(loadDashboard())
      .then(() => setIsLoaded(true));
  },[dispatch])

  const avatarUrl = user.imageUrl
    ? user.imageUrl
    : '/images/profile_avatar.png';

  return isLoaded && (
    <div className='dashboard-container'>
      <div className='cover-container'>
        <img className='cover-image' src='/images/cover-placeholder.jpeg' alt='cover'></img>
        <div className='cover-user-container'>
          <img className='dashboard-avatar' src={avatarUrl} alt='avatar'></img>
          <div className='dashboard-user-info'>
            <div className='top'>
              <h2>{user.username}</h2>
              <i className='fas fa-ellipsis-h cover-more-button'></i>
            </div>

            <ul className='bottom'>
              {/* <li>Follower</li>
              <li>Following</li> */}
            </ul>

          </div>
        </div>
      </div>
      <nav className='dashboard-nav'>
        <NavLink activeClassName='active-dash-nav' to='/dashboard/photostream'>Photostream</NavLink>
        <NavLink activeClassName='active-dash-nav' to='/dashboard/albums'>Albums</NavLink>
        <NavLink activeClassName='active-dash-nav' to='/dashboard/favorites'>Favorites</NavLink>
        {/* <NavLink activeClassName='active-dash-nav' to=''>Loop Station</NavLink> */}
      </nav>

      {/* <DashboardBody /> */}
      <Switch>
        <Route path='/dashboard/photostream'>
          <Photostream />
        </Route>
        <Route path='/dashboard/albums'>
          <Albums />
        </Route>
        <Route path='/dashboard/favorites'>
          <Favorites />
        </Route>
      </Switch>
    </div>
  );
}
