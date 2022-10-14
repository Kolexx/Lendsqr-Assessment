require('dotenv').config();

const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  pool: { min: 0, max: 7 },
});

// checking if connected

knex.raw('SELECT VERSION()').then(() => {
  try {
    console.log('Connected to server');
  } catch (error) {
    console.log(error);
  }
});

module.exports = knex;
