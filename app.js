const express = require('express');
const knex = require('./config/db.config');

const bank = require('./routes/bank.route');

const app = express();
require('dotenv').config({ path: './.env' });
const PORT = 4001;

app.use(express.json());

app.use('/bank', bank);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
