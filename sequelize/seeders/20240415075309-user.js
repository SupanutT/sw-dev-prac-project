'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    firstName: 'Supanut',
                    lastName: 'Tangsinmankong',
                    phoneNumber: '0801234567',
                    email: 'test@test.com',
                    hashedPassword: '$2y$10$JErKhLlgJEJeYjQe0CYkt.WptaZ5nKrdWqLC.yKSdluPAWsDghxN.'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
