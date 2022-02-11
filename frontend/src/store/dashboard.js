import { normalizeAlbum, normalizeAlbums, normalizeImages, normalizeFavImages } from "./utils";

const { csrfFetch } = require("./csrf");

const LOAD_IMAGE = 'dashboard/LOAD_IMAGE';
const LOAD_IMAGES = 'dashboard/LOAD_IMAGES';
const REMOVE_IMAGE = 'dashboard/REMOVE_IMAGE';

const LOAD_ALBUM = 'dashboard/LOAD_ALBUM';
const LOAD_ALBUMS = 'dashboard/LOAD_ALBUMS';
const REMOVE_ALBUM = 'dashboard/REMOVE_ALBUM';
const ADD_IMAGES_TO_ALBUM = 'dashboard/ADD_IMAGES_TO_ALBUM';

const LOAD_FAVORITE_IMAGES = 'dashboard/LOAD_FAVORITE_IMAGES';
const ADD_FAVORITE_IMAGE = 'dashboard/ADD_FAVORITE_IMAGE';
const REMOVE_FAVORITE_IMAGE = 'dashboard/REMOVE_FAVORITE_IMAGE';

const CLEAR_DASHBOARD = 'dashboard/CLEAR_DASHBOARD';

const loadImage = (image) => {
  return {
    type: LOAD_IMAGE,
    image
  };
};

const loadImages = (images) => {
  return {
    type: LOAD_IMAGES,
    images
  };
};

const removeImage = (imageId, albumId) => {
  return {
    type: REMOVE_IMAGE,
    imageId,
    albumId
  };
};

const loadAlbum = (album) => {
  return {
    type: LOAD_ALBUM,
    album,
  };
};

const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums
  };
};

const addImagesToAlbum = (images, albumId) => {
  return {
    type: ADD_IMAGES_TO_ALBUM,
    images,
    albumId
  };
};

const removeAlbum = (albumId) => {
  return {
    type: REMOVE_ALBUM,
    albumId
  };
};

const loadFavoriteImages = (favorites) => {
  return {
    type: LOAD_FAVORITE_IMAGES,
    favorites
  };
};

const addFavoriteImage = (image) => {
  return {
    type: ADD_FAVORITE_IMAGE,
    image
  };
};

const removeFavoriteImage = (image) => {
  return {
    type: REMOVE_FAVORITE_IMAGE,
    image
  }
};

export const clearDashboard = () => {
  return {
    type: CLEAR_DASHBOARD
  };
};


// Thunks

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

export const postImage = (payload) => async dispatch => {
  let { title, description, imageFile, albumTitle, albumId } = payload;

  // let album;
  if (albumTitle) {
    const newAlbum = await dispatch(postAlbum({ title: albumTitle }));

    albumId = newAlbum.id;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', imageFile);
  formData.append('albumId', albumId);


  const res = await csrfFetch('/api/images/users/current/single-upload', {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const { image } = await res.json();

  dispatch(loadImage(image));
  return res;
};

export const postImages = (images, albumId) => async dispatch => {
  const formData = new FormData();

  if (images) {
    for (let image of images) {
      formData.append('images', image);
    }
  }
  // if (images && images.length === 1) formData.append('image', images[0]);
  if (!images.length) images = [images];

  formData.append('albumId', albumId);

  const res = await csrfFetch('/api/images/users/current/multi-upload', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(loadImages(data.images));
  dispatch(addImagesToAlbum(data.images, albumId));

  return res;
};

export const createAlbumWithImages = (payload) => async dispatch => {
  const { title, description, images } = payload;

  const newAlbum = await dispatch(postAlbum({ title, description }));
  // dispatch(postAlbum({ title, description })),
  return dispatch(postImages(images, newAlbum.id));
};

export const deleteAlbum = (albumId) => async dispatch => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeAlbum(albumId))
  }
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

export const updateImage = (payload) => async dispatch => {
  let { imageId, title, description, albumTitle, albumId, originalImage } = payload;

  if (albumTitle) {
    const newAlbum = await dispatch(postAlbum({ title: albumTitle }));
    albumId = newAlbum.id;
  }

  const body = {title, description, albumId};

  const res = await csrfFetch(`/api/images/${imageId}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });

  const { image } = await res.json();

  if (res.ok) {
    await Promise.all([
      dispatch(removeImage(originalImage.id, originalImage.albumId)),
      dispatch(loadImage(image))
    ]);
  }
  return res;
};

export const deleteImage = (image) => async dispatch => {
  const res = await csrfFetch(`/api/images/${image.id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeImage(image.id, image.albumId));
  }
  return res;
};

export const deleteImages = (imageIds, albumId) => async dispatch => {
  const res = await csrfFetch(`/api/images/multi-delete/`, {
    method: 'DELETE',
    body: JSON.stringify({ imageIds })
  });

  if (res.ok) {
    for (let imageId of imageIds) {
      dispatch(removeImage(imageId, albumId));
    }
  }
  return res;
};

export const patchAlbum = (payload) => async dispatch => {
  const { title, description, albumId } = payload;
  const body = { title, description };

  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });


  if (res.ok) {
    const { album } = await res.json();
    dispatch(loadAlbum(album));
  }

  return res;
};

export const patchAlbumWithImageDel = (payload) => async dispatch => {
  const { imageIds, albumId } = payload;

  await dispatch(deleteImages(imageIds, albumId));

  return dispatch(patchAlbum(payload))
};

export const getFavoriteImages = () => async dispatch => {
  const res = await csrfFetch('/api/favorites/images/users/current');

  if (res.ok) {
    const favorites = await res.json();
    dispatch(loadFavoriteImages(favorites));
  }

  return res;
};

export const favoriteImage = (image) => async dispatch => {
  const res = await csrfFetch('/api/favorites/images/users/current', {
    method: 'POST',
    body: JSON.stringify({imageId: image.id})
  });

  if (res.ok) {
    dispatch(addFavoriteImage(image));
  }

  return res;
};

export const unfavoriteImage = (image) => async dispatch => {
  const res = await csrfFetch(`/api/favorites/images/${image.id}/users/current`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeFavoriteImage(image))
  }

  return res;
};

// Bulk dispatch
export const loadDashboard = () => async dispatch => {
  await Promise.all([
    dispatch(getUserAlbums()),
    dispatch(getUserImages()),
    dispatch(getFavoriteImages())
  ]);
};


// Helper Functions
export const getUserAlbumsArray = (state) => Object.values(state.dashboard.userAlbums);
export const getUserImagesArray = (state) => Object.values(state.dashboard.userImages);
export const getFavoriteImagesArray = (state) => Object.values(state.dashboard.favoriteImages)

const initialState = {
  userAlbums: null,
  userImages: null,
  favoriteImages: null
};

const dashboardReducer = (state = initialState, action) => {
  let stateCopy;
  let formatted;
  let images;
  let idx;

  switch(action.type) {
    case LOAD_IMAGE:
      stateCopy = {...state};

      stateCopy.userImages[action.image.id] = action.image;
      stateCopy.userAlbums[action.image.albumId].images.push(action.image);

      return stateCopy;
    case LOAD_IMAGES:
      formatted = normalizeImages(action.images);
      // stateCopy.userAlbums[]
      return {
        ...state,
        userImages: {
          ...state.userImages,
          ...formatted
        }
      }

    case REMOVE_IMAGE:
      stateCopy = {...state};
      const imagesCopy = stateCopy.userAlbums[action.albumId].images;
      // images = stateCopy.userAlbums[action.albumId].images;
      idx = imagesCopy.findIndex(image => image.id === action.imageId);

      imagesCopy.splice(idx, 1);
      delete stateCopy.userImages[action.imageId];
      return stateCopy;
    case LOAD_ALBUM:
      formatted = normalizeAlbum(action.album);
      return {
        ...state,
        userAlbums: {
          ...state.userAlbums,
          ...formatted
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
    case ADD_IMAGES_TO_ALBUM:
      stateCopy = {...state};
      formatted = normalizeImages(action.images);

      const images = stateCopy.userAlbums[action.albumId].images;
      stateCopy.userAlbums[action.albumId].images = [...images, ...action.images];

      return stateCopy;

    case REMOVE_ALBUM:
      stateCopy = {...state};

      // Del idv images
      delete stateCopy.userAlbums[action.albumId];

      // Del from albums
      for (let key in stateCopy.userImages) {
        let image = stateCopy.userImages[key];

        if (image.albumId === action.albumId) {
          delete stateCopy.userImages[key];
        }
      }
      return stateCopy;

      case LOAD_FAVORITE_IMAGES:
        formatted = normalizeFavImages(action.favorites);
        return {
          ...state,
          favoriteImages: {
            ...state.favoriteImages,
            ...formatted
          }
        }

      case ADD_FAVORITE_IMAGE:
        return {
          ...state,
          favoriteImages: {
            ...state.favoriteImages,
            [action.image.id]: action.image
          }
        }

      case REMOVE_FAVORITE_IMAGE:
        stateCopy = {...state};
        delete stateCopy.favoriteImages[action.image.id];
        return stateCopy;

    case CLEAR_DASHBOARD:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
