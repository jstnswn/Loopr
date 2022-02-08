const db = require('../../../db/models');

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
  return await db.Image.findAll({
    where: { userId },
    include: [db.Album]
  });
};

async function deleteImage(imageId) {
  const image = await db.Image.findByPk(imageId);

  if (image) return await image.destroy();
};

async function patchImage(imageId, updates) {
  const image = await db.Image.findByPk(imageId);

  if (image) await image.update(updates)

  const updated = await db.Image.findByPk(imageId, {
    include: [db.Album]
  });

  return updated;
}


module.exports = {
  getSplashImages,
  createImage,
  getImagesByUserId,
  deleteImage,
  patchImage,
}
