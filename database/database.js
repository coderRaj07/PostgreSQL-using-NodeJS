const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
// Initialize Sequelize with your database configuration
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // added for self-signed certificates
    }
  }
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
