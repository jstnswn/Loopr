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

module.exports = {
  getSplashAlbums,
  getAlbumsByUserId,
};


// async function getSplashAlbums() {
//   console.log('qwer')
//   return await db.Album.findAll({
//     // include: [db.Image],
//     limit: 5,
//     order: [['id', 'ASC']]
//   });
// };
