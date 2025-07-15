'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        userName: 'saumya.20191250@iit.ac.lk',
        mobile: '0771234567',
        email: 'saumya.20191250@iit.ac.lk@example.com',
        password: '$2b$12$99UE8eiRzjAcPI/v7A6mUeVv1A5VG2N6hDqq9Y3pK9txNZhoIQSIa',
        lastActivateAt: new Date(),
        status: true,
        is_subscribed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'saumya.20191250@iit.ac.lk@example.com' });
  },
};
