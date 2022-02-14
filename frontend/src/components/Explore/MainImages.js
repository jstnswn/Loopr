import React from 'react'
import { useSelector } from 'react-redux';
import { getExploreMainImagesArray } from '../../store/explore';
import ExploreGrid from './ExploreGrid';

export default function MainImagesModule() {
  const mainImages = useSelector(getExploreMainImagesArray);
  return (
    <ExploreGrid images={mainImages} />
  )
}
