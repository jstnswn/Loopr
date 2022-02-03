import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(({ session }) => session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to='/'>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}
