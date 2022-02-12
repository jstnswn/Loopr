'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [

      {
        title: 'Hiking on Mars',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51860299804_f030250fef_o.jpeg',
        albumId: 1,
        userId: 2,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fast Nights',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/24567976694_9e77e1dd48_o.jpeg',
        albumId: 1,
        userId: 2,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Strawberry Milky Way',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/47264397422_b3ed6b1c0b_o.jpeg',
        albumId: 1,
        userId: 2,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        title: 'Switchboard',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/47973825907_d5b330ffaf_o.jpeg',
        albumId: 2,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        title: 'Neon Path',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/50308012142_08fbce710d_c.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Space Travel',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/47264397312_d991cc6ef6_k.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Meow Spectrum',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51819764685_0326502e86_o.jpeg',
        albumId: 2,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Blur',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/30828267453_47de3ddac0_o.jpeg',
        albumId: 2,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Rusted Wheels',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/2421911331_c02e4d9e96_c.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ultra Orchids',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/3212387285_f9c536e561_o.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Face',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/5119634826_bac89f136e_o.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        title: 'Blood Moon',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/33441048278_52e8b58374_o.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
