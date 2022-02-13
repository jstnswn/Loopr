import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavDropdown.css';
import { toggleTheme } from '../../store/session';

export default function NavDropdown({ user, logout }) {
  const dispatch = useDispatch();

  const darkModeOn = useSelector(({ session }) => session.darkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());

    if (darkModeOn) {
      document.body.classList.remove('dark-scroll');
      // const 
    }
    else document.body.classList.add('dark-scroll');
  };

  const toggleThemeClass = darkModeOn
  ? 'fa-solid fa-brightness icon dd'
  : 'fa-solid fa-circle-half-stroke icon dd';
  const text = darkModeOn ? 'Light Mode' : 'Dark Mode';

  return (
    <ul className='profile-dropdown'>
      <div className='profile-dropdown-select dd'>
        <li className='fa-solid fa-square-user icon dd'></li>
        <li className='title dd'>{user.username}</li>
      </div>
      <li>
        <div className='profile-dropdown-select dd'>
          <i className='fa-solid fa-arrow-right-from-bracket icon dd'></i>
          <div className='logout title' onClick={logout}>Log Out</div>
        </div>
      </li>
      <li>
        <div className='profile-dropdown-select dd'>
          <i className={toggleThemeClass}></i>
          <div
            className='dark-mode title dd'
            onClick={handleToggleTheme}
          >
            {text}
          </div>
        </div>
      </li>
    </ul>
  )
}
