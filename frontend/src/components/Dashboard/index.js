import React from 'react';
import { useSelector } from 'react-redux';

import './Dashboard.css';

import UploadPhotos from '../UploadPhotos';

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
              <div className='test'>
                <i className='fas fa-ellipsis-h cover-more-button'></i>

              </div>
            </div>

            <ul className='bottom'>
              <li>Follower</li>
              <li>Following</li>
            </ul>

          </div>
        </div>
      </div>
      <div className='dashboard-nav'>
        <p>link</p>
        <p>link</p>
        <p>link</p>
      </div>
      <div className='dashboard-body'>
        Body
        <UploadPhotos />
      </div>
    </div>
  );
}
