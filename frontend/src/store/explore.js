import { csrfFetch } from "./csrf";
import { normalizeImages } from "./utils";


const LOAD_MAIN_IMAGES = 'explore/LOAD_MAIN_IMAGES';
const LOAD_IMAGE = 'explore/LOAD_IMAGE';
const REMOVE_IMAGE = 'explore/REMOVE_IMAGE';

const loadMainImages = (images) => {
  return {
    type: LOAD_MAIN_IMAGES,
    images
  };
};

export const loadExploreImage = (image) => {
  return {
    type: LOAD_IMAGE,
    image
  };
};

export const removeExploreImage = (imageId) => {
  return {
    type: REMOVE_IMAGE,
    imageId
  };
};

export const getExploreMainImages = () => async dispatch => {
  const res = await csrfFetch('/api/images/public');

  if (res.ok) {
    const images = await res.json();
    dispatch(loadMainImages(images));
  }

  return res;
};

export const getExploreMainImagesArray = (state) => Object.values(state.explore.mainImages);

const initialState = {
  mainImages: null
};

let stateCopy;
let formatted;
const exploreReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_MAIN_IMAGES:
      formatted = normalizeImages(action.images);
      return {
        ...state,
        mainImages: {
          ...state.mainImages,
          ...formatted
        }
      }

    case LOAD_IMAGE:
      stateCopy = {...state};

      if (stateCopy.mainImages) stateCopy.mainImages[action.image.id] = action.iamge;

      return stateCopy;

    case REMOVE_IMAGE:
      stateCopy= {...state};
      delete stateCopy.mainImages?.[action.imageId];
      return stateCopy;

    default:
      return state;
  }
};

export default exploreReducer;
