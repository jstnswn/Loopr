'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        title: 'First Album',
        description: null,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My First Album',
        description: null,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'New Project',
        description: null,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Personal Favorites',
        description: null,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'User 3 Images',
        description: null,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
