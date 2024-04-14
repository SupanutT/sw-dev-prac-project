/* Initialize packages */
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const sequelize = require('./config/database.config');

dotenv.config({ path: './config/config.env' });

app.use(express.json());

app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message || 'There is an unknown errors',
        errors: err.errors || 'Unknown'
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});

sequelize
    .sync()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));
