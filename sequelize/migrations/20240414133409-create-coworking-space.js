'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'CoworkingSpaces',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                address: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                phoneNumber: {
                    type: Sequelize.STRING(10),
                    allowNull: false
                },
                openTime: {
                    type: Sequelize.TIME,
                    allowNull: false
                },
                closeTime: {
                    type: Sequelize.TIME,
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
        await queryInterface.dropTable('CoworkingSpaces');
    }
};
