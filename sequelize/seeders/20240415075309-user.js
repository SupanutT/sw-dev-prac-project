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
                    password: 'root1234'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
