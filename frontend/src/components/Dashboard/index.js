import React from 'react';

import './Dashboard.css';

import UploadPhotos from '../UploadPhotos';

export default function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div className='cover-container'>
        <img src='images/cover-placeholder.jpeg' alt='cover'></img>
        <div className='cover-user-container'>
          <div className='dashboard-avatar'></div>
          <h2>Username</h2>
          <i className='fas fa-ellipsis-h cover-more-button'></i>
          <ul>
            <li>Follower</li>
            <li>Following</li>
          </ul>
        </div>
      </div>
      <div className='dashboard-nav'>Nav</div>
      <div className='dashboard-body'>
        Body
        <UploadPhotos />
      </div>
    </div>
  );
}
