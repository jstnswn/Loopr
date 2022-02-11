import { csrfFetch } from "./csrf";
import { normalizeImages } from "./utils";


const LOAD_MAIN_IMAGES = 'explore/LOAD_MAIN_IMAGES';

const loadMainImages = (images) => {
  return {
    type: LOAD_MAIN_IMAGES,
    images
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

    default:
      return state;
  }
};

export default exploreReducer;
