const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for 6cosc022w-w1810569-20191250',
      version: '1.0.0',
      description: 'This is the API documentation for the 6cosc022w-w1810569-20191250 project.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // Ensure this matches your server's base URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./docs/v1/*.yaml'], // Path to your YAML files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
