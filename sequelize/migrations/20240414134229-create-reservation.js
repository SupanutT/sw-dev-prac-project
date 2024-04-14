'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'Reservations',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    allowNull: false
                },
                coworkingSpaceId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'coworkingspaces',
                        key: 'id'
                    }
                },
                reservationDate: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                deletedAt: {
                    allowNull: true,
                    type: Sequelize.DATE
                }
            },
            { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Reservations');
    }
};
