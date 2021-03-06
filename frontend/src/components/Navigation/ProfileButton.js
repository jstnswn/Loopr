import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { clearDashboard } from '../../store/dashboard';
import * as sessionActions from '../../store/session';
import NavDropdown from './NavDropdown';

export default function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const imageUrl = user.imageUrl
    ? user.imageUrl
    : '/images/profile_avatar.png';

  const openDropdown = () => {
    if (showDropdown) return;
    setShowDropdown(true);
  };

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout())
      .then(() => dispatch(clearDashboard()))
      .then(() => history.push('/'));
  };

  useEffect(() => {
    if (!showDropdown) return;

    const closeDropdown = (e) => {
      // e.stopPropagation();
      // e.preventDefault();
      if (!e.target.classList.contains('dd')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => document.removeEventListener('click', closeDropdown);
  }, [showDropdown]);


  return (
    <>
      <img
        className='fas fa-user-circle profile-button'
        onClick={openDropdown}
        src={imageUrl}
        alt='profile'
      ></img>
      {showDropdown && <NavDropdown user={user} logout={logout}/>}
    </>
  )

}
