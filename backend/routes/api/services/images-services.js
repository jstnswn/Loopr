const { sequelize } = require('../../../db/models');
const db = require('../../../db/models');
const album = require('../../../db/models/album');

async function getSplashImages() {
  return await db.Image.findAll({
    where: { albumId: 1 },
    limit: 5,
    include: [
      {
        model: db.Album,
        // where: sequelize.and({ 'active': true }),
        required: false
      }
    ]
  });
};

module.exports = {
  getSplashImages,
}
