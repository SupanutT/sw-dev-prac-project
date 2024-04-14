const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' // Adjust for your database
});

module.exports = sequelize;
