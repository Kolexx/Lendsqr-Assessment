const express = require('express');
const cors = require('cors');
const knex = require('./config/db.config');

const bank = require('./routes/bank.route');

const app = express();
app.use(cors());
// require('dotenv').config();
const PORT = 4001;

app.use('/bank', express.json(), bank);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
