import React from 'react';
import { useSelector } from 'react-redux';

import './Dashboard.css';

import UploadPhotos from '../UploadPhotos';
import DashboardBody from './DashboardBody';

export default function Dashboard() {

  const user = useSelector(({ session }) => session.user)
  console.log(user)

  return (
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
