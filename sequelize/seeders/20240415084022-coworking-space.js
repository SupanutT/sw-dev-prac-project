'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'CoworkingSpaces',
            [
                {
                    name: 'Co-op',
                    address: 'Samyan Mitrtown',
                    phoneNumber: '021234567',
                    openTime: '10:00',
                    closeTime: '05:00'
                },
                {
                    name: 'Chula Library',
                    address: 'Hor Klang',
                    phoneNumber: '021234567',
                    openTime: '06:00',
                    closeTime: '21:00'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('CoworkingSpaces', null, {});
    }
};
