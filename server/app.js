// Dynamically load the correct .env file based on NODE_ENV
const dotenv = require('dotenv');
const envFile = (() => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return '.env.prod';
        case 'test':
            return '.env.test';
        default:
            return '.env.dev';
    }
})();
dotenv.config({ path: envFile }); // Load the correct .env file
console.log(`🌱 Loading environment variables from: ${envFile}`);

const express = require('express');
const cors = require('cors');
const routesV1 = require('./routes/v1');
const common = require('./routes/common.routes');
const bodyParser = require('body-parser');
const db = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger.docs');

const app = express();
const PORT = process.env.PORT || 8000; // Default to port 8000 if PORT is not set

// Enable CORS for development
app.use(
    cors({
        origin:
            process.env.NODE_ENV === 'production'
                ? 'your-production-domain'
                : ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
    })
);

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}

// Configure routes
app.use('/api/', common);
app.use('/api/v1', routesV1);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🧩 Swagger docs available at http://localhost:${PORT}/api-docs`);
    }
});
