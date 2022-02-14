'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ImageFavorites', [
      {
        userId: 1,
        imageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        userId: 1,
        imageId: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
