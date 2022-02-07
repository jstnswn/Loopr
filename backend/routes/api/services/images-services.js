const db = require('../../../db/models');

async function getSplashImages() {
  return await db.Image.findAll({
    where: { albumId: 1 },
    limit: 5
  });
};

module.exports = {
  getSplashImages,
}
