export function normalizeAlbums(albums) {
  return albums.reduce((acc, album) => {
    acc[album.id] = {
      title: album.title,
      id: album.id,
      images: album.Images
    }

    return acc;
  }, {})
};

export function normalizeAlbum(album) {
  return {
    [album.id]: {
      title: album.title,
      id: album.id,
      images: album.Images
    }
  };
};

export function normalizeImages(images) {
  return images.reduce((acc, image) => {
    acc[image.id] = image;
    return acc;
  }, {});
};
