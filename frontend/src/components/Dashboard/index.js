import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Dashboard.css';
import { loadDashboard } from '../../store/dashboard';
import Photostream from './Photostream';
import Albums from './Albums';
import Favorites from './Favorites';
import { Modal } from '../../context/Modal';
import ChangeProfileForm from './ChangeProfileForm';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false)
  const history = useHistory();
  const pathname = history.location.pathname;

  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(({ session }) => session.user)

  const darkModeOn = useSelector(({ session }) => session.darkMode);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openMenu = () => setShowDropdown(true);
  const closeMenu = () => setShowDropdown(false);

  useEffect(() => {
    if (!showDropdown) return;

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [showDropdown])

  useEffect(() => {
    dispatch(loadDashboard())
      .then(() => setIsLoaded(true));
  },[dispatch])

  if (pathname.endsWith('/dashboard/') || pathname.endsWith('/dashboard')) {
    return <Redirect to='/dashboard/photostream' />
  }

  const avatarUrl = user.imageUrl
    ? user.imageUrl
    : '/images/profile_avatar.png';

  return isLoaded && (
    <div className='dashboard-container'>
      <div className='cover-container'>
        <img className='cover-image' src='/images/cover-placeholder.jpeg' alt='cover'></img>
        <div className='cover-user-container'>
          <img className='dashboard-avatar' src={avatarUrl} alt='avatar'></img>
          <div className='dashboard-user-info'>
            <div className='top'>
              <h2>{user.username}</h2>
              <i onClick={openMenu} className='fas fa-ellipsis-h cover-more-button'></i>
              {showDropdown && (
                <ul className='dashboard-user-dropdown dropdown'>
                  <li onClick={openModal}>Change Profile Picture</li>
                </ul>
              )}
            </div>

            <ul className='bottom'>
            </ul>

          </div>
        </div>
      </div>
      <nav className='dashboard-nav' id={darkModeOn ? 'dark-background' : ''}>
        <NavLink activeClassName='active-dash-nav' to='/dashboard/photostream'>Photostream</NavLink>
        <NavLink activeClassName='active-dash-nav' to='/dashboard/albums'>Albums</NavLink>
        <NavLink activeClassName='active-dash-nav' to='/dashboard/favorites'>Favorites</NavLink>
      </nav>

      {showModal && (
        <Modal onClose={closeModal}>
          <ChangeProfileForm closeModal={closeModal}/>
        </Modal>
      )}

      {/* <DashboardBody /> */}
      <div className='dashboard-body' id={darkModeOn ? 'dark-background' : ''}>
        <Switch>
          <Route path='/dashboard/photostream'>
            <Photostream />
          </Route>
          <Route path='/dashboard/albums'>
            <Albums />
          </Route>
          <Route path='/dashboard/favorites'>
            <Favorites />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
