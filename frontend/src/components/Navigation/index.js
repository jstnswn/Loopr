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
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <Link onClick={() => dispatch(loginDemo())}>Demo</Link>
        <SignupFormModal />
      </>
    );
  }

  return (
   <nav className='navbar'>
     <NavLink exact to='/'>Home</NavLink>
     {isLoaded && sessionLinks}
   </nav>

  );
}
