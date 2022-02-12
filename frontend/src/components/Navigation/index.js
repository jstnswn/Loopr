import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { loginDemo } from '../../store/session';
import UploadImageModal from '../UploadImageModal';

export default function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(({ session }) => session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/dashboard/photostream' activeClassName='active-nav'>Dashboard</NavLink>
        <UploadImageModal option={'icon'}/>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className='nav-link' onClick={() => dispatch(loginDemo())}>Demo</div>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav className={`navbar ${sessionUser && 'logged-in'}`}>
      <NavLink exact to='/explore' activeClassName='active-nav'>Explore</NavLink>
      {isLoaded && sessionLinks}
    </nav>

  );
}
