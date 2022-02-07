const db = require('../../../db/models');

async function getSplashAlbums() {
  console.log('qwer')
  return await db.Album.findByPk(1);
  console.log("TWOOO")
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
