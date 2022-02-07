import { normalizeAlbums } from "./utils";

const { csrfFetch } = require("./csrf");

const LOAD_ALBUMS = 'dashboard/LOAD_ALBUMS';

const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums
  };
};


export const postAlbum = (payload) => async dispatch => {

};

export const postImages = (formData) => async dispatch => {
  console.log('formData: ')
};

export const getUserAlbums = () => async dispatch => {
  const res = await csrfFetch('/api/albums/users/current');
  const albums = await res.json();

  dispatch(loadAlbums(albums));
  return res;
};

export const getUserAlbumsArray = (state) => Object.values(state.dashboard.userAlbums);


const initialState = {
  userAlbums: null,
  userImages: null
};

const dashboardReducer = (state = initialState, action) => {
  let formatted;

  switch(action.type) {
    case LOAD_ALBUMS:
      formatted = normalizeAlbums(action.albums);
      return {
        ...state,
        userAlbums: {
          ...state.userAlbums,
          ...formatted
        }
      }
    default:
      return state;
  }
};

export default dashboardReducer;
