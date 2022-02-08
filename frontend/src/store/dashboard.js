import { normalizeAlbums, normalizeImages } from "./utils";

const { csrfFetch } = require("./csrf");

const LOAD_IMAGE = 'dashboard/LOAD_IMAGE';
const LOAD_IMAGES = 'dashboard/LOAD_IMAGES';
const LOAD_ALBUM = 'dashboard/LOAD_ALBUM';
const LOAD_ALBUMS = 'dashboard/LOAD_ALBUMS';

const loadAlbum = (album) => {
  return {
    type: LOAD_ALBUM,
    album,
  }
}

const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums
  };
};

const loadImage = (image) => {
  return {
    type: LOAD_IMAGE,
    image
  }
};

const loadImages = (images) => {
  return {
    type: LOAD_IMAGES,
    images
  }
};

export const postAlbum = (payload) => async dispatch => {
  const { title, description } = payload;
  const res = await csrfFetch('/api/albums/users/current', {
    method: 'POST',
    body: JSON.stringify({title, description})
  });

  const { album } = await res.json();
  dispatch(loadAlbum(album))

  return album;
};

export const postImages = (payload) => async dispatch => {
  let { title, description, imageFile, albumTitle, albumId } = payload;

  if (albumTitle) {
    const newAlbum = await dispatch(postAlbum({ title: albumTitle }));
    albumId = newAlbum.id;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', imageFile);
  formData.append('albumId', albumId);


  const res = await csrfFetch('/api/images/users/current', {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const image = await res.json();
  dispatch(loadImage(image));

  return res;
};

export const getUserAlbums = () => async dispatch => {
  const res = await csrfFetch('/api/albums/users/current');
  const albums = await res.json();

  dispatch(loadAlbums(albums));
  return res;
};

export const getUserImages = () => async dispatch => {
  const res = await csrfFetch(('/api/images/users/current'));

  const images = await res.json();
  dispatch(loadImages(images));

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
    case LOAD_IMAGE:
      return {
        ...state,
        userImages: {
          ...state.userImages,
          [action.image.id]: action.image
        }
      }
    case LOAD_IMAGES:
      formatted = normalizeImages(action.images);
      return {
        ...state,
        userImages: {
          ...state.userImages,
          ...formatted
        }
      }
    case LOAD_ALBUM:
      return {
        ...state,
        userAlbums: {
          ...state.userAlbums,
          [action.album.id]: action.album
        }
      }
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
