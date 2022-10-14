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

knex
  .raw('SELECT VERSION()')
  .then(() => {
    console.log('Connected to server');
  })
  .catch((err) => {
    console.log('Not connected to server');
  })
  .finally(() => {
    knex.destroy();
  });
// knex.schema
//   .createTable('account', (table) => {
//     table.increments('acID');
//     table.string('acNm');
//     table.integer('balance ');
//   })
//   .then(() => console.log('table created'))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
// .finally(() => {
//   knex.destroy();
// });

module.exports = knex;
