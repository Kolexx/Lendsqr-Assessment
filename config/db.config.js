require('dotenv').config({ path: '../.env' });

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

const createNewAccount = ({ acID, acNm, bal }) => {
  knex.query(
    `Insert into account values ($1 , $2 , $3)`,
    [acID, acNm, bal],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Account Created Successfully');
      }
    },
  );
};

const withDraw = ({ acID, amount }) => {
  // knex.query(
  //   `select balance from account where ac_id = $1`,
  //   [acID],
  //   (err, res) => {
  //     const { bal } = res.row[0];
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Account Created Successfully');
  //     }
  //   },
  // );
};

const deposit = ({ acID, acNm, bal }) => {};

const transfer = ({ acID, acNm, bal }) => {};

module.exports = { createNewAccount, withDraw, deposit, transfer };
