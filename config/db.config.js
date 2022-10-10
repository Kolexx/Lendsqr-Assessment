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

const createNewAccount = ({ acID, acNm, bal }, onCreate = undefined) => {
  knex.query(
    `Insert into account values ($1 , $2 , $3)`,
    [acID, acNm, bal],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Account Created Successfully');
        if (onCreate) {
          onCreate(`New Customer Created successfully`);
        }
      }
    },
  );
};

const withDraw = ({ acID, amount }, onWithdraw = undefined) => {
  knex.query(
    `select balance from account where ac_id = $1`,
    [acID],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const balance = parseFloat(res.row[0].balance);

        const newBalance = balance - amount;

        knex.query(
          `update account set balance = $1 where ac_id = $2`,
          [newBalance, acID],
          (err, res) => {
            if (err) {
              console.log(`\n Problem in Withdrawing`);
            } else {
              console.log(`\n Amount ${amount} Withdraw Successfully`);
              if (onWithdraw) {
                onWithdraw(`Amount ${amount} Withdraw Successfully`);
              }
            }
          },
        );
      }
    },
  );
};

const deposit = ({ acID, amount }, onDeposit = undefined) => {
  knex.query(
    `select balance from account where ac_id = $1`,
    [acID],
    (err, res) => {
      if (err) {
        console.log(`\n Problem In Deposit`);
      } else {
        const balance = parseFloat(res.row[0].balance);
        const newBalance = balance + amount;

        knex.query(
          `update account set balance = $1 where ac_id = $2`,
          [newBalance, acID],
          (err, res) => {
            if (err) {
              console.log(`\n Problem in Depositing `);
            } else {
              console.log(`\n Amount ${amount} deposited Successfully`);
              if (onDeposit) {
                onDeposit(`Amount ${amount} Deposit Successfully`);
              }
            }
          },
        );
      }
    },
  );
};

const transfer = ({ srcID, destID, amount }, onTransfer = undefined) => {
  withDraw({ acID: srcID, amount }, (msgWd) => {
    deposit({ acID: destID, amount }, (msgDp) => {
      if (onTransfer) {
        onTransfer(`Amount ${amount} Transferred Successfully`);
      }
    });
  });
};

const balance = ({ acID, onBalance = undefined }) => {
  console.log(acID);
  knex.query(
    `Select balancce from account where ac_id = $1`,
    [acID],
    (err, res) => {
      if (err) {
        console.log(`\n problem in getting balance from account`);
        console.log(err);
      } else {
        const balance = parseFloat(res.rows[0].balance);
        console.log(`/n Your Balnce is : ${balance}`);
        if (balance) {
          onBalance(balance);
        }
      }
    },
  );
};

module.exports = { createNewAccount, withDraw, deposit, transfer, balance };
