import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const openDropdown = () => {
    if (showDropdown) return;
    setShowDropdown(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
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
      <i
        className='fas fa-user-circle profile-button'
        onClick={openDropdown}
      ></i>
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
