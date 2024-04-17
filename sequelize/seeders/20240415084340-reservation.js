'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // const users = await queryInterface.sequelize.query('SELECT id FROM users');
        // const coworkingspaces = await queryInterface.sequelize.query('SELECT id FROM coworkingspaces');

        // const userIds = users[0];
        // const coworkingSpaceIds = coworkingspaces[0];

        await queryInterface.bulkInsert(
            'Reservations',
            [
                {
                    userId: 1,
                    coworkingSpaceId: 1,
                    reservationDate: '2024-04-10 10:00:00'
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Reservations', null, {});
    }
};
