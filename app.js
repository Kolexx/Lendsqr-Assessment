const express = require('express');

const {
  createNewAccount,
  withDraw,
  deposit,
  transfer,
} = require('./config/db.config');
// require('dotenv').config();
const app = express();

const PORT = process.env.DB_PORT || 4001;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
