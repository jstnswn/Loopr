import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import * as sessionActions from '../../store/session';

export default function ProfileButton({ user }) {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const imageUrl = user.imageUrl
    ? user.imageUrl
    : '/images/profile_avatar.png';

  const openDropdown = () => {
    if (showDropdown) return;
    setShowDropdown(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(window.location.href = '/');
  };

  useEffect(() => {
    if (!showDropdown) return;

    const closeDropdown = () => {
      setShowDropdown(false);
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
      {showDropdown && (
        <ul className='profile-dropdown'>
          <li>{user.username}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  )

}
