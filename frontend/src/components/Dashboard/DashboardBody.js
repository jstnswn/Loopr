import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UploadPhotos from '../UploadModal';
import Photostream from './Photostream';

export default function DashboardBody() {

  return (
    <div className='dashboard-body'>
      <div className='dashboard-body-header'>
        <h2>Let's make an album</h2>
        <p>Easily organize all your photos into beautiful albums to share with friends, family, or even other Loopr members</p>
        <UploadPhotos />
      </div>
      <div className='dashboard-body-content'>








 
      </div>
    </div>
  )
}
