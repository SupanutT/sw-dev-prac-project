'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'Users',
            {
                // id: {
                //     type: Sequelize.UUID,
                //     defaultValue: Sequelize.literal('(UUID())'),
                //     allowNull: false,
                //     primaryKey: true
                // },
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                firstName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                lastName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                phoneNumber: {
                    type: Sequelize.STRING(10),
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true
                    }
                },
                hashedPassword: {
                    type: Sequelize.STRING,
                    validate: {
                        is: /^[0-9a-f]{64}$/i
                    }
                },
                isAdmin: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                isActive: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                activateAccountExpire: {
                    type: Sequelize.STRING
                },
                activateAccountToken: {
                    type: Sequelize.STRING
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
            }
            // { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' }
        );
        // await queryInterface.sequelize.query('ALTER TABLE users ALTER COLUMN id SET DEFAULT (UUID())');
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};
