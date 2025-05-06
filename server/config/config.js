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
dotenv.config({ path: envFile });

console.log('🔍 Sequelize CLI using DB:', process.env.DATABASE_PATH);

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    logging: console.log,
  },
  test: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    logging: false,
  },
};
