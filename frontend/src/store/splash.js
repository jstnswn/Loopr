import { csrfFetch } from "./csrf";
import { normalizeAlbums } from "./utils";

const LOAD_Albums = 'splash/LOAD_Albums';

const loadAlbums = (albums) => {
  return {
    type: LOAD_Albums,
    albums
  };
};

export const getSplashAlbums = () => async dispatch => {
  const res = await csrfFetch('/api/albums/splash');

  const albums = await res.json();
  dispatch(loadAlbums(albums));
  return res;
};

const initialState = {
  albums: null,
};

const splashReducer = (state = initialState, action) => {
  let formatted;

  switch (action.type) {
    case LOAD_Albums:
      formatted = normalizeAlbums(action.albums);
      return {
        ...state,
        albums: formatted
      }
    default:
      return state;
  }
};

export default splashReducer;
