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

