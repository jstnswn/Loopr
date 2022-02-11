const db = require('../../../db/models');

async function getFavImagesByUserId(userId) {
  return await db.ImageFavorite.findAll({
    where: { userId },
    include: [
      {model: db.Image, include: [db.Album]}
    ]
  });
};

module.exports = {
  getFavImagesByUserId,
};
