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
                    email: 'admin@admin.com',
                    password: 'root1234',
                    role: 'admin'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
