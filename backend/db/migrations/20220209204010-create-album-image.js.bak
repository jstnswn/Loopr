'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AlbumImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      albumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Albums' }
      },
      imageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Images' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AlbumImages');
  }
};
