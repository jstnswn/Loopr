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
        albumId: 2,
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
        title: 'Under the bridge downtown',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51877069653_0feeb27ccb_c.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Industrial Complex',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51877484946_df2a5b399e_c.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'First Stop',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51877680327_ccd10f373d_c.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Flying',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/51878704764_0702b32bd4_c.jpeg',
        albumId: 3,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Lazy Day',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/10532612145_e92d061c9c_c.jpeg',
        albumId: 4,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Catching the Sunset',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/23908810719_958e8b647f_c.jpeg',
        albumId: 4,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bridge Street',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/26746275681_1a59d198fb_h.jpeg',
        albumId: 4,
        userId: 1,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ollie',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/3295488473_917b974d43_h.jpeg',
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
        albumId: 4,
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


      {
        title: 'Analog',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/33936570484_e0f56d0da8_c.jpeg',
        albumId: 5,
        userId: 3,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Macro Wheel',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/3447658628_e1586a880d_c.jpeg',
        albumId: 5,
        userId: 3,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Flying Melon',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/4311579519_722b0c0e71_b.jpeg',
        albumId: 5,
        userId: 3,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Spector Fig',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/51839069965_847f56e6d0_c.jpeg',
        albumId: 5,
        userId: 3,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pug Mug',
        description: null,
        imageUrl: 'https://photo-bucket-137.s3.us-east-2.amazonaws.com/image-seeds/9405022111_8e0811279a_c.jpeg',
        albumId: 5,
        userId: 3,
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
