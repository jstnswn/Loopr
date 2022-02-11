'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'Untitled',
      validate: {
        len: [1, 30]
      }
    },
    description: {
      type: DataTypes.STRING(300),
      validate: {
        len: [0, 300]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    albumId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Album, { foreignKey: 'albumId' });
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.hasMany(models.ImageFavorite, { foreignKey: 'imageId', onDelete: 'CASCADE', hooks: true  });
  };
  return Image;
};
