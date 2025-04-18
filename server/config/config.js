require('dotenv').config(); // Load from .env

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: process.env.DB_NAME || './database/dev_database.db',
        logging: console.log,
    },
    test: {
        dialect: 'sqlite',
        storage: process.env.DB_NAME || './database/test_database.db',
        logging: false,
    },
    production: {
        dialect: 'sqlite',
        storage: process.env.DB_NAME || './database/prod_database.db',
        logging: false,
    },
};
