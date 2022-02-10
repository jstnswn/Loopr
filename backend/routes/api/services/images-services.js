const Sequelize = require('sequelize');
const db = require('../../../db/models');
const Op = Sequelize.Op;

async function getSplashImages() {
  return await db.Image.findAll({
    where: { albumId: 1 },
    limit: 5,
    include: [db.Album]
  });
};

async function createImage(userId, title, description, albumId, imageUrl) {
  const image = await db.Image.create({
    userId, title, description, albumId, imageUrl
  });

  return await db.Image.findByPk(image.id, {
    include: [
      {model: db.Album, include: [db.Image]}
    ]
  });
};

async function createImages(imageUrls, albumId, userId) {
  const imageIds = [];

  for (let imageUrl of imageUrls) {
    const newImage = await db.Image.create({ imageUrl, userId, albumId })
    imageIds.push(newImage.id);
  }

  return await db.Image.findAll({
    where: {
      id: {
        [Op.or]: imageIds
      }
    },
    include: [db.Album]
  })
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

async function deleteImages(imageIds) {
  for (let imageId of imageIds) {
    deleteImage(imageId);
  }
  // Currently no return
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
  createImages,
  getImagesByUserId,
  deleteImage,
  patchImage,
  deleteImages,
}
