'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Users', 'isAdmin', 'role');
        await queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Users', 'role', 'isAdmin');
        await queryInterface.changeColumn('Users', 'isAdmin', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        });
    }
};
