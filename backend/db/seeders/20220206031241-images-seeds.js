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

      {
        title: 'Space Travel',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/47264397312_d991cc6ef6_k.jpeg',
        albumId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Strawberry Milky Way',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/47264397422_b3ed6b1c0b_o.jpeg',
        albumId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Wish',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/34119722743_d6f061775d_k.jpeg',
        albumId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
