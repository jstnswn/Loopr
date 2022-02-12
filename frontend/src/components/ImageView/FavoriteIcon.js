import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { favoriteImage, unfavoriteImage } from '../../store/dashboard';

export default function FavoriteIcon({ image, closeModal, option }) {
  const dispatch = useDispatch();
  const favorites = useSelector(({ dashboard }) => dashboard?.favoriteImages);

  let isFavorite;
  if (favorites) {
    isFavorite = image.id in favorites;
  }

  const activeClassName = 'fas fa-star favorite-icon active';
  const inactiveClassName = 'far fa-star favorite-icon';
  const favorite = (e) => {
    dispatch(favoriteImage(image));
  }
  const unfavorite = () => {
    dispatch(unfavoriteImage(image));
    if (option === 'favorites') closeModal();
  }
  const toggleToActive = (e) => e.target.className = activeClassName;
  const toggleToInactive = (e) => e.target.className = inactiveClassName;

  let className;
  let mouseEnter;
  let mouseLeave;
  let onClick;

  if (isFavorite) {
    className = activeClassName;
    mouseEnter = toggleToInactive
    mouseLeave = toggleToActive
    onClick = unfavorite;
  } else {
    className = inactiveClassName;
    mouseEnter = toggleToActive
    mouseLeave = toggleToInactive
    onClick = favorite;
  }

  return (
    <i
      className={className}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={onClick}
    />
  )
}
