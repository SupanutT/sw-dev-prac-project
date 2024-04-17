/* Initialize packages */
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

dotenv.config({ path: './config/config.env' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// app.use(xss());
const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000, //10mins
    max: 1000
});
app.use(limiter);
app.use(hpp());
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Coworking Space API'
        },
        servers: [
            {
                url: `${process.env.BACKEND_URL}api/v1`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* Import routes */
const auth = require('./routes/auth');
const coworkingspaces = require('./routes/coworkingspaces');
const reservations = require('./routes/reservations');

app.use('/api/v1/auth', auth);
app.use('/api/v1/coworkingspaces', coworkingspaces);
app.use('/api/v1/reservations', reservations);

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
