'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        title: 'Blur',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/30828267453_47de3ddac0_o.jpeg',
        albumId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Switchboard',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/47973825907_d5b330ffaf_o.jpeg',
        albumId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Meow Spectrum',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51819764685_0326502e86_o.jpeg',
        albumId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hiking on Mars',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51860299804_f030250fef_o.jpeg',
        albumId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
