/* Initialize packages */
const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './config/config.env' });

app.use(express.json());

/* Import routes */
const auth = require('./routes/auth');

app.use('/api/v1/auth', auth);

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
