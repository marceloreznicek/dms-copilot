const { Pool } = require("pg")

// Load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pool = new Pool(
  process.env.NODE_ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
      }
);

module.exports = pool