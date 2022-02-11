'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImageFavorite = sequelize.define('ImageFavorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  ImageFavorite.associate = function(models) {
    ImageFavorite.belongsTo(models.User, { foreignKey: 'userId' });
    ImageFavorite.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return ImageFavorite;
};
