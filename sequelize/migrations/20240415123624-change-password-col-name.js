'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Users', 'hashedPassword', 'password');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Users', 'password', 'hashedPassword');
    }
};
