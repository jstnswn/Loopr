const db = require('../../../db/models');

async function getFavImagesByUserId(userId) {
  return await db.ImageFavorite.findAll({
    where: { userId },
    include: [
      {model: db.Image, include: [db.Album]}
    ]
  });
};

async function favoriteImage(imageId, userId) {
  return await db.ImageFavorite.create({ imageId, userId });
};

async function unfavoriteImage(imageId, userId) {
  const favorite = await db.ImageFavorite.findOne({ where: { imageId, userId }});
  return await favorite.destroy();
};

module.exports = {
  getFavImagesByUserId,
  favoriteImage,
  unfavoriteImage
};
