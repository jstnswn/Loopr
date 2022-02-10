import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { loginDemo } from '../../store/session';

export default function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(({ session }) => session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/dashboard/photostream' activeClassName='active-nav'>Dashboard</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div onClick={() => dispatch(loginDemo())}>Demo</div>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav className={`navbar ${sessionUser && 'logged-in'}`}>
      <NavLink exact to='/home' activeClassName='active-nav'>Home</NavLink>
      {isLoaded && sessionLinks}
    </nav>

  );
}
