const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TravelTales API',
            version: '1.0.0',
            description: 'API documentation for the TravelTales platform',
        },
        servers: [
            {
                url: 'http://localhost:8000', // replace with your deployed URL when needed
            },
        ],
    },
    apis: ['./routes/*.js'], // path to your route files where you'll write annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
