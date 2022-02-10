import { normalizeAlbum, normalizeAlbums, normalizeImages } from "./utils";

const { csrfFetch } = require("./csrf");

const LOAD_IMAGE = 'dashboard/LOAD_IMAGE';
const LOAD_IMAGES = 'dashboard/LOAD_IMAGES';
const REMOVE_IMAGE = 'dashboard/REMOVE_IMAGE';

const LOAD_ALBUM = 'dashboard/LOAD_ALBUM';
const LOAD_ALBUMS = 'dashboard/LOAD_ALBUMS';
const REMOVE_ALBUM = 'dashboard/REMOVE_ALBUM';

const CLEAR_DASHBOARD = 'dashboard/CLEAR_DASHBOARD';

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

const removeImage = (imageId, albumId) => {
  console.log('remove: ', imageId, albumId)
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

const removeAlbum = (albumId) => {
  return {
    type: REMOVE_ALBUM,
    albumId
  }
}

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

export const postImages = (images) => async dispatch => {
  const formData = new FormData();

  if (images && images.length > 0) {
    for (let image of images) {
      formData.append('images', image);
    }
  }
  if (images && images.length === 1) formData.append('image', images[0]);

  const res = await csrfFetch('/api/images/users/current/multi-upload', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();;
  dispatch(loadImages(data.images));

  return res;
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

export const deleteImage = (image) => async dispatch => {
  const res = await csrfFetch(`/api/images/${image.id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeImage(image.id, image.albumId));
    return res;
  }
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

  await Promise.all([
    dispatch(removeImage(originalImage.id, originalImage.albumId)),
    dispatch(loadImage(image))
  ]);
  return res;
};

// Bulk dispatch
export const loadDashboard = () => async dispatch => {
  await Promise.all([
    dispatch(getUserAlbums()),
    dispatch(getUserImages())
  ]);
};

export const createAlbumWithImages = (payload) => async dispatch => {
  const { title, description, images } = payload;

  await Promise.all([
    dispatch(postAlbum({title, description})),
    dispatch(postImages(images))
  ]);
};

// Helper Functions
export const getUserAlbumsArray = (state) => Object.values(state.dashboard.userAlbums);
export const getUserImagesArray = (state) => Object.values(state.dashboard.userImages);

const initialState = {
  userAlbums: null,
  userImages: null
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
      return {
        ...state,
        userImages: {
          ...state.userImages,
          ...formatted
        }
      }
    case REMOVE_IMAGE:
      stateCopy = {...state};
      images = stateCopy.userAlbums[action.albumId].images;
      idx = images.findIndex(image => image.id === action.imageId);

      images.splice(idx, 1);
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

    case CLEAR_DASHBOARD:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
