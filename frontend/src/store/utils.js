

export function normalizeAlbum(album) {
  return {
    [album.id]: {
      title: album.title,
      id: album.id,
      images: album.Images,
      description: album.description,
    }
  };
};

export function normalizeAlbums(albums) {
  return albums.reduce((acc, album) => {
    acc = { ...acc, ...normalizeAlbum(album) }
    return acc;
  }, {})
};

export function normalizeImages(images) {
  return images.reduce((acc, image) => {
    acc[image.id] = image;
    return acc;
  }, {});
};


export function normalizeFavImages(favorites) {
  return favorites.reduce((acc, favorite) => {
    acc[favorite.Image.id] = favorite.Image;
    return acc;
  }, {});
};
