const knex = require('../config/db.config');

const createNewAccount = ({ acID, acNm, balance }, onCreate = undefined) => {
  knex.raw(
    `Insert into account values ($1 , $2 , $3)`,
    [acID, acNm, balance],
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
  knex.raw(
    `select balance from account where acID = $1`,
    [acID],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const balance = parseFloat(res.row[0].balance);

        const newBalance = balance - amount;

        knex.raw(
          `update account set balance = $1 where  acID = $2`,
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
  knex.raw(
    `select balance from account where ac_id = $1`,
    [acID],
    (err, res) => {
      if (err) {
        console.log(`\n Problem In Deposit`);
      } else {
        const balance = parseFloat(res.row[0].balance);
        const newBalance = balance + amount;

        knex.raw(
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
  knex.raw(
    `Select balance from account where ac_id = $1`,
    [acID],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const balance = parseFloat(res.rows[0].balance);
        if (onBalance) {
          onBalance(balance);
        }
      }
    },
  );
};

module.exports = { createNewAccount, withDraw, deposit, transfer, balance };
