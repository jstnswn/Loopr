const db = require('../../../db/models');

async function getSplashAlbums() {
  return await db.Album.findAll({
    limit: 3,
    include: [db.Image],
  })
};

async function getAlbumsByUserId(userId) {
  return await db.Album.findAll({
    where: { userId },
    include: [db.Image]
  });
};

async function createAlbum(userId, title, description) {
  const newAlbum = await db.Album.create({ userId, title, description });
  return await db.Album.findByPk(newAlbum.id, {
     include: [db.Image]
  });
};

async function deleteAlbum(albumId) {
  const album = await db.Album.findByPk(albumId);
  return await album.destroy();
};

async function patchAlbum(albumId, updates) {
  const album = await db.Album.findByPk(albumId);

  if (album) await album.update(updates);

  const updated = await db.Album.findByPk(albumId, {
    include: [db.Image]
  })

  return updated;
};

module.exports = {
  getSplashAlbums,
  getAlbumsByUserId,
  createAlbum,
  deleteAlbum,
  patchAlbum,
};


// async function getSplashAlbums() {
//   console.log('qwer')
//   return await db.Album.findAll({
//     // include: [db.Image],
//     limit: 5,
//     order: [['id', 'ASC']]
//   });
// };
