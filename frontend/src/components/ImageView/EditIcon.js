import React from 'react'
import { useSelector } from 'react-redux';

export default function EditIcon({ image }) {
  const favorites = useSelector(({ dashboard }) => dashboard.favoriteImages);

  const isFavorite = image.id in favorites;

  const activeClassName = 'fas fa-star favorite-icon active';
  const inactiveClassName = 'far fa-star favorite-icon';
  const toggleToActive = (e) => e.target.className = activeClassName;
  const toggleToInactive = (e) => e.target.className = inactiveClassName;
  let className;
  let mouseEnter;
  let mouseLeave;
  if (isFavorite) {
    className = activeClassName;
    mouseEnter = toggleToInactive
    mouseLeave = toggleToActive
  } else {
    className = inactiveClassName;
    mouseEnter = toggleToActive
    mouseLeave = toggleToInactive
  }
  return (
    <i
      className={className}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    />
  )
}
