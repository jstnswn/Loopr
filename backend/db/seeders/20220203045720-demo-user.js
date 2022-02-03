'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demomail.com',
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@usermail.com',
        username: 'User1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@usermail.com',
        username: 'User2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
