const { sequelize } = require('../../../db/models');
const db = require('../../../db/models');
const album = require('../../../db/models/album');

async function getSplashImages() {
  return await db.Image.findAll({
    where: { albumId: 1 },
    limit: 5,
    include: [db.Album]
  });
};

async function createImage(userId, title, description, albumId, imageUrl) {
  return await db.Image.create({
    userId, title, description, albumId, imageUrl
  });
};

async function getImagesByUserId(userId) {
  return await db.Image.findAll({ where: { userId } });
};

async function deleteImage(imageId) {
  const image = await db.Image.findByPk(imageId);

  if (image) return await image.destroy();
};


module.exports = {
  getSplashImages,
  createImage,
  getImagesByUserId,
  deleteImage,
}
