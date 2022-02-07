import { csrfFetch } from "./csrf";

const LOAD_CAROUSEL = 'splash/LOAD_CAROUSEL';

const loadCarousel = (images) => {
  return {
    type: LOAD_CAROUSEL,
    images
  };
};

export const getSplashImages = () => async dispatch => {
  const res = await csrfFetch('/api/albums/splash');

  const images = await res.json();
  console.log('images: ', images)
  dispatch(loadCarousel(images));
  return res;
};

const initialState = {
  carouselImages: null,
};

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CAROUSEL:
      return {
        ...state,
        carouselImages: action.images
      }
    default:
      return state;
  }
};

export default splashReducer;
