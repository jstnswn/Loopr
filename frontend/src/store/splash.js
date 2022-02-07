import { csrfFetch } from "./csrf";

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
  switch (action.type) {
    case LOAD_Albums:
      const formatted = splashAlbumFormatter(action.albums);
      return {
        ...state,
        albums: formatted
      }
    default:
      return state;
  }
};

export default splashReducer;

function splashAlbumFormatter(albums) {
  return albums.reduce((acc, album) => {
    acc[album.id] = {
      title: album.title,
      id: album.id,
      images: album.Images
    }

    return acc;
  }, {})
};
