const db = require('../../../db/models');

async function getSplashAlbums() {
  // return await db.Album.findByPk(1);
  // return await db.Image.findAll({ limit: 5 });
  return await db.Album.findAll({
    limit: 3,
    include: [db.Image],
  })
};

module.exports = {
  getSplashAlbums
};


// async function getSplashAlbums() {
//   console.log('qwer')
//   return await db.Album.findAll({
//     // include: [db.Image],
//     limit: 5,
//     order: [['id', 'ASC']]
//   });
// };
