const express = require('express');
require('dotenv').config({ path: '../.env' });
const bank = require('./routes/bank.route');

const app = express();

const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/bank', bank);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
1;
