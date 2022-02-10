'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumImage = sequelize.define('AlbumImage', {
    albumId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {});
  AlbumImage.associate = function(models) {
    AlbumImage.belongsTo(models.Album, { foreignKey: 'albumId' });
    AlbumImage.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return AlbumImage;
};
